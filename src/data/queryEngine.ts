import type { Ontology } from './ontology';
import { nlQueryResponses } from './quests';
import type { Locale } from '../store/appStore';

export interface QueryResponse {
  query: string;
  result: string;
  highlightEntities: string[];
  highlightRelationships: string[];
  interpretation?: string;
}

function stripLeadingArticle(text: string): string {
  return text.replace(/^(a|an|the)\s+/, '').trim();
}

function singularize(text: string): string {
  return text.endsWith('s') ? text.slice(0, -1) : text;
}

function matchesDemoQuery(normalizedQuery: string, demoQuery: string, matches: string[]): boolean {
  return normalizedQuery === demoQuery || matches.some(match => normalizedQuery.includes(match));
}

function normalizeKoreanDemoQuery(query: string): string {
  if (query.includes('gold') && (query.includes('고객') || query.includes('customer'))) {
    return 'show me all gold tier customers';
  }
  if (query.includes('ethiopia') && (query.includes('제품') || query.includes('product'))) {
    return 'which products come from ethiopia';
  }
  if (query.includes('arif ramadhan') && (query.includes('주문') || query.includes('order'))) {
    return 'what orders did arif ramadhan place';
  }
  return query;
}

const koreanDemoResults: Record<string, string> = {
  'show me all gold tier customers': 'Gold 등급 고객 1명을 찾았습니다:\n• Arif Ramadhan (CUST-001) - 2024년부터 Gold 등급',
  'which products come from ethiopia': 'Ethiopia산 제품 1개를 찾았습니다:\n• Ethiopian Single Origin (☕ Brewed) - $4.50\n  공급업체: Ethiopia Highlands Farm',
  'what orders did arif ramadhan place': 'Arif Ramadhan의 주문:\n• ORD-2025-001 - $12.50 (완료)\n  항목: Ethiopian Single Origin x2, Colombian Latte x1\n  매장: Downtown Seattle',
};

// Generate dynamic query suggestions based on the current ontology
export function generateQuerySuggestions(ontology: Ontology, locale: Locale = 'en'): string[] {
  const suggestions: string[] = [];
  const entities = ontology.entityTypes;
  const relationships = ontology.relationships;
  const isKorean = locale === 'ko';

  // Entity-based queries
  if (entities.length > 0) {
    const firstEntity = entities[0];
    suggestions.push(isKorean ? `${firstEntity.name} 엔터티를 모두 보여줘` : `Show me all ${firstEntity.name.toLowerCase()}s`);
    
    if (entities.length > 1) {
      const secondEntity = entities[1];
      suggestions.push(isKorean ? `${secondEntity.name} 엔터티 목록을 보여줘` : `List all ${secondEntity.name.toLowerCase()}s`);
    }
  }

  // Property-based queries
  entities.forEach(entity => {
    entity.properties.forEach(prop => {
      if (prop.type === 'string' && !prop.isIdentifier && prop.name !== 'name') {
        suggestions.push(isKorean ? `${prop.name}별 ${entity.name}을(를) 보여줘` : `Show ${entity.name.toLowerCase()}s by ${prop.name}`);
      }
    });
  });

  // Relationship-based queries
  if (relationships.length > 0) {
    const rel = relationships[0];
    const fromEntity = entities.find(e => e.id === rel.from);
    const toEntity = entities.find(e => e.id === rel.to);
    if (fromEntity && toEntity) {
      suggestions.push(isKorean
        ? `${fromEntity.name}와(과) ${toEntity.name}는 어떻게 연결되나요?`
        : `How does ${fromEntity.name} connect to ${toEntity.name}?`);
    }
  }

  // Conceptual queries always available
  suggestions.push(isKorean ? "엔터티 형식이란 무엇인가요?" : "What is an entity type?");
  suggestions.push(isKorean ? "관계란 무엇인가요?" : "What is a relationship?");
  suggestions.push(isKorean ? "온톨로지는 어떻게 작동하나요?" : "How does ontology work?");

  // Return unique suggestions (max 6)
  return [...new Set(suggestions)].slice(0, 6);
}

// Process a natural language query against the ontology
export function processQuery(query: string, ontology: Ontology, locale: Locale = 'en'): QueryResponse {
  const normalizedQuery = query.toLowerCase().trim();
  const normalizedNoPunctuation = normalizedQuery.replace(/[?!.:,;]+/g, '').trim();
  const entities = ontology.entityTypes;
  const relationships = ontology.relationships;
  const isKorean = locale === 'ko';
  const demoQuery = isKorean ? normalizeKoreanDemoQuery(normalizedNoPunctuation) : normalizedNoPunctuation;

  if (ontology.name === 'Fourth Coffee') {
    const demoResponse = nlQueryResponses.find(response =>
      matchesDemoQuery(demoQuery, response.query, response.matches)
    );

    if (demoResponse) {
      return {
        query,
        result: isKorean ? koreanDemoResults[demoResponse.query] ?? demoResponse.result : demoResponse.result,
        highlightEntities: demoResponse.highlightEntities,
        highlightRelationships: demoResponse.highlightRelationships,
        interpretation: isKorean ? '감지됨: Fourth Coffee 샘플 쿼리' : 'Detected: Fourth Coffee sample query'
      };
    }
  }

  // Conceptual queries (work for any ontology)
  if (
    (normalizedQuery.includes('what is') && (normalizedQuery.includes('entity') || normalizedQuery.includes('ontology'))) ||
    (normalizedQuery.includes('무엇') && (normalizedQuery.includes('엔터티') || normalizedQuery.includes('온톨로지')))
  ) {
    return {
      query,
      result: isKorean
        ? "**엔터티 형식**은 Customer, Product, Order 같은 현실 세계 개념을 나타내는 재사용 가능한 논리 모델입니다. Fabric IQ 온톨로지에서 엔터티 형식은 다음을 표준화합니다.\n\n• **이름 및 설명** - 공통 용어\n• **속성** - 형식과 단위가 있는 특성\n• **식별자** - 각 인스턴스의 고유 키\n\n엔터티 형식을 사용하면 조직 전체가 일관된 정의를 사용할 수 있습니다."
        : "An **Entity Type** is a reusable logical model of a real-world concept (like Customer, Product, or Order). In the Fabric IQ Ontology, entity types standardize:\n\n• **Name & Description** - Common terminology\n• **Properties** - Attributes with types and units\n• **Identifier** - Unique key for each instance\n\nEntity types ensure everyone in your organization uses consistent definitions.",
      highlightEntities: entities.slice(0, 2).map(e => e.id),
      highlightRelationships: [],
      interpretation: isKorean ? "감지됨: 엔터티 형식에 대한 개념 질문" : "Detected: conceptual question about entity types"
    };
  }

  if ((normalizedQuery.includes('what is') && normalizedQuery.includes('relationship')) || (normalizedQuery.includes('무엇') && normalizedQuery.includes('관계'))) {
    return {
      query,
      result: isKorean
        ? "**관계**는 엔터티 형식 사이의 방향이 있는 타입 연결입니다. 관계는 다음을 정의합니다.\n\n• **이름** - 동작 동사(예: 'places', 'contains')\n• **방향** - 한 엔터티에서 다른 엔터티로\n• **카디널리티** - 일대일, 일대다 등\n• **특성** - 연결에 포함되는 선택적 속성\n\n관계를 따라 온톨로지를 탐색하면 복잡한 질문에 답할 수 있습니다."
        : "A **Relationship** is a typed, directional link between entity types. Relationships define:\n\n• **Name** - Action verb (e.g., 'places', 'contains')\n• **Direction** - From one entity to another\n• **Cardinality** - One-to-one, one-to-many, etc.\n• **Attributes** - Optional properties on the connection\n\nRelationships let you traverse the ontology to answer complex questions.",
      highlightEntities: [],
      highlightRelationships: relationships.slice(0, 2).map(r => r.id),
      interpretation: isKorean ? "감지됨: 관계에 대한 개념 질문" : "Detected: conceptual question about relationships"
    };
  }

  if ((normalizedQuery.includes('how') && (normalizedQuery.includes('ontology') || normalizedQuery.includes('work'))) || (normalizedQuery.includes('온톨로지') && (normalizedQuery.includes('어떻게') || normalizedQuery.includes('구조')))) {
    return {
      query,
      result: isKorean
        ? `**${ontology.name}** 온톨로지 구성:\n\n• **엔터티 형식 ${entities.length}개** - ${entities.map(e => e.name).join(', ')}\n• **관계 ${relationships.length}개** - 엔터티를 서로 연결\n\n온톨로지는 데이터 플랫폼 원본에 연결되는 의미 계층으로 작동하여 비즈니스 개념을 이해하는 자연어 쿼리를 지원합니다.`
        : `The **${ontology.name}** ontology has:\n\n• **${entities.length} Entity Types** - ${entities.map(e => e.name).join(', ')}\n• **${relationships.length} Relationships** - Connecting entities together\n\nThe ontology acts as a semantic layer that binds to your data platform sources, enabling natural language queries that understand your business concepts.`,
      highlightEntities: entities.map(e => e.id),
      highlightRelationships: [],
      interpretation: isKorean ? "감지됨: 온톨로지 구조에 대한 질문" : "Detected: question about ontology structure"
    };
  }

  // Entity definition queries: "What is a Customer?"
  if (normalizedNoPunctuation.startsWith('what is ') || (isKorean && normalizedNoPunctuation.includes('무엇'))) {
    const subjectRaw = normalizedNoPunctuation.startsWith('what is ')
      ? normalizedNoPunctuation.slice('what is '.length).trim()
      : normalizedNoPunctuation;
    const subject = stripLeadingArticle(subjectRaw);

    for (const entity of entities) {
      const entityNameLower = entity.name.toLowerCase();
      const entityNameSingular = entityNameLower.endsWith('s') ? entityNameLower.slice(0, -1) : entityNameLower;

      if (
        subject === entityNameLower ||
        subject === entityNameSingular ||
        singularize(subject) === entityNameSingular ||
        (isKorean && normalizedNoPunctuation.includes(entityNameLower))
      ) {
        const propList = entity.properties
          .slice(0, 4)
          .map(p => `• **${p.name}** (${p.type})${p.isIdentifier ? ' 🔑' : ''}`)
          .join('\n');

        return {
          query,
          result: `**${entity.name}** ${entity.icon}\n${entity.description}\n\n**${isKorean ? '속성' : 'Properties'}:**\n${propList}`,
          highlightEntities: [entity.id],
          highlightRelationships: [],
          interpretation: isKorean ? `감지됨: ${entity.name} 정의 쿼리` : `Detected: definition query for ${entity.name}`
        };
      }
    }
  }

  // Entity listing queries
  for (const entity of entities) {
    const entityNameLower = entity.name.toLowerCase();
    const entityNamePlural = entityNameLower + 's';
    
    if (
      normalizedQuery.includes(`show me all ${entityNameLower}`) ||
      normalizedQuery.includes(`show me all ${entityNamePlural}`) ||
      normalizedQuery.includes(`list all ${entityNameLower}`) ||
      normalizedQuery.includes(`list all ${entityNamePlural}`) ||
      normalizedQuery.includes(`show ${entityNamePlural}`) ||
      normalizedQuery.includes(`list ${entityNamePlural}`)
      || (isKorean && normalizedQuery.includes(entityNameLower) && (normalizedQuery.includes('모두') || normalizedQuery.includes('목록') || normalizedQuery.includes('보여')))
    ) {
      const propList = entity.properties
        .slice(0, 4)
        .map(p => `• **${p.name}** (${p.type})${p.isIdentifier ? ' 🔑' : ''}`)
        .join('\n');
      
      return {
        query,
        result: isKorean
          ? `**${entity.name}** ${entity.icon}\n${entity.description}\n\n**속성:**\n${propList}\n\n_실제 배포 환경에서는 데이터 플랫폼에서 ${entity.name} 레코드를 조회합니다._`
          : `**${entity.name}** ${entity.icon}\n${entity.description}\n\n**Properties:**\n${propList}\n\n_In a real deployment, this would query the data platform for actual ${entityNameLower} records._`,
        highlightEntities: [entity.id],
        highlightRelationships: [],
        interpretation: isKorean ? `감지됨: ${entity.name} 엔터티 쿼리` : `Detected: query for ${entity.name} entities`
      };
    }
  }

  // Relationship/connection queries
  for (const rel of relationships) {
    const relationNameNormalized = rel.name.toLowerCase().trim().replace(/\s+/g, ' ');
    const fromEntity = entities.find(e => e.id === rel.from);
    const toEntity = entities.find(e => e.id === rel.to);

    if (
      normalizedNoPunctuation.includes(relationNameNormalized) &&
      (normalizedNoPunctuation.includes('connection') || normalizedNoPunctuation.includes('connections') || normalizedNoPunctuation.includes('relationship'))
    ) {
      return {
        query,
        result: `**${rel.name}** connects **${fromEntity?.name ?? rel.from}** to **${toEntity?.name ?? rel.to}** (${rel.cardinality}).${rel.description ? `\n\n${rel.description}` : ''}`,
        highlightEntities: [rel.from, rel.to],
        highlightRelationships: [rel.id],
        interpretation: isKorean ? `감지됨: ${rel.name} 관계 이름 쿼리` : `Detected: relationship-name query for ${rel.name}`
      };
    }
  }

  for (const entity of entities) {
    const entityNameLower = entity.name.toLowerCase();
    
    if (normalizedQuery.includes(`how does ${entityNameLower}`) || 
        normalizedQuery.includes(`${entityNameLower} connect`) ||
        normalizedQuery.includes(`${entityNameLower} relate`) ||
        (isKorean && normalizedQuery.includes(entityNameLower) && (normalizedQuery.includes('연결') || normalizedQuery.includes('관계')))) {
      
      const relatedRels = relationships.filter(r => r.from === entity.id || r.to === entity.id);
      
      if (relatedRels.length > 0) {
        const relList = relatedRels.map(rel => {
          const isOutgoing = rel.from === entity.id;
          const otherEntityId = isOutgoing ? rel.to : rel.from;
          const otherEntity = entities.find(e => e.id === otherEntityId);
          const direction = isOutgoing ? '→' : '←';
          return `• **${rel.name}** ${direction} ${otherEntity?.icon} ${otherEntity?.name} (${rel.cardinality})`;
        }).join('\n');

        return {
          query,
          result: isKorean
            ? `**${entity.name}** ${entity.icon}에는 ${relatedRels.length}개의 연결이 있습니다:\n\n${relList}`
            : `**${entity.name}** ${entity.icon} has ${relatedRels.length} connection(s):\n\n${relList}`,
          highlightEntities: [entity.id, ...relatedRels.map(r => r.from === entity.id ? r.to : r.from)],
          highlightRelationships: relatedRels.map(r => r.id),
          interpretation: isKorean ? `감지됨: ${entity.name} 관계 쿼리` : `Detected: relationship query for ${entity.name}`
        };
      }
    }
  }

  // Property-based queries
  for (const entity of entities) {
    for (const prop of entity.properties) {
      if (normalizedQuery.includes(prop.name.toLowerCase()) && normalizedQuery.includes(entity.name.toLowerCase())) {
        return {
          query,
          result: isKorean
            ? `**${entity.name}.${prop.name}**\n\n• 형식: ${prop.type}\n${prop.unit ? `• 단위: ${prop.unit}` : ''}\n${prop.isIdentifier ? '• 식별자 속성입니다 🔑' : ''}\n${prop.description ? `• ${prop.description}` : ''}\n\n_프로덕션에서는 이 속성으로 ${entity.name}을(를) 필터링할 수 있습니다._`
            : `**${entity.name}.${prop.name}**\n\n• Type: ${prop.type}\n${prop.unit ? `• Unit: ${prop.unit}` : ''}\n${prop.isIdentifier ? '• This is the identifier property 🔑' : ''}\n${prop.description ? `• ${prop.description}` : ''}\n\n_In production, you could filter ${entity.name.toLowerCase()}s by this property._`,
          highlightEntities: [entity.id],
          highlightRelationships: [],
          interpretation: isKorean ? `감지됨: ${entity.name}.${prop.name} 속성 쿼리` : `Detected: property query for ${entity.name}.${prop.name}`
        };
      }
    }
  }

  // Counting queries
  if (normalizedQuery.includes('how many') || (isKorean && (normalizedQuery.includes('몇') || normalizedQuery.includes('개수')))) {
    for (const entity of entities) {
      if (normalizedQuery.includes(entity.name.toLowerCase())) {
        return {
          query,
          result: isKorean
            ? `온톨로지는 **${entity.name}** 엔터티 형식을 정의합니다.\n\n_프로덕션에서는 데이터 플랫폼의 실제 ${entity.name} 레코드 수를 계산합니다._\n\n예: "SELECT COUNT(*) FROM ${entity.name.toLowerCase()}s"`
            : `The ontology defines the **${entity.name}** entity type.\n\n_In production, this query would count actual ${entity.name.toLowerCase()} records from the data platform._\n\nExample: "SELECT COUNT(*) FROM ${entity.name.toLowerCase()}s"`,
          highlightEntities: [entity.id],
          highlightRelationships: [],
          interpretation: isKorean ? `감지됨: ${entity.name} 개수 쿼리` : `Detected: count query for ${entity.name}`
        };
      }
    }
  }

  // Schema overview query
  if (normalizedQuery.includes('entities') || normalizedQuery.includes('schema') || normalizedQuery.includes('overview') || (isKorean && (normalizedQuery.includes('엔터티') || normalizedQuery.includes('스키마') || normalizedQuery.includes('개요')))) {
    const entityList = entities.map(e => `• ${e.icon} **${e.name}** - ${e.description.slice(0, 50)}...`).join('\n');
    return {
      query,
      result: isKorean
        ? `**${ontology.name}** 스키마 개요\n\n${entityList}\n\n**합계:** 엔터티 ${entities.length}개, 관계 ${relationships.length}개`
        : `**${ontology.name}** Schema Overview\n\n${entityList}\n\n**Total:** ${entities.length} entities, ${relationships.length} relationships`,
      highlightEntities: entities.map(e => e.id),
      highlightRelationships: [],
      interpretation: isKorean ? "감지됨: 스키마 개요 요청" : "Detected: schema overview request"
    };
  }

  // No match found - provide helpful suggestions
  const suggestions = generateQuerySuggestions(ontology, locale).slice(0, 3);
  return {
    query,
    result: isKorean
      ? `**${ontology.name}**에서 "${query}"을(를) 해석하지 못했습니다.\n\n다음과 같이 질문해 보세요:\n${suggestions.map(s => `• "${s}"`).join('\n')}\n\n또는 그래프 요소를 클릭하여 온톨로지를 시각적으로 탐색하세요.`
      : `I couldn't interpret "${query}" for **${ontology.name}**.\n\nTry asking:\n${suggestions.map(s => `• "${s}"`).join('\n')}\n\nOr click on graph elements to explore the ontology visually.`,
    highlightEntities: [],
    highlightRelationships: [],
    interpretation: undefined
  };
}
