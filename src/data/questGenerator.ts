// Dynamic Quest Generator - Creates quests based on the loaded ontology

import type { Ontology } from './ontology';
import type { Quest, QuestStep } from './quests';
import type { Locale } from '../store/appStore';

/**
 * Generates a set of quests dynamically based on the current ontology structure.
 * Quests adapt to entity types, relationships, and properties in the loaded ontology.
 */
export function generateQuestsForOntology(ontology: Ontology, locale: Locale = 'en'): Quest[] {
  const quests: Quest[] = [];
  const entities = ontology.entityTypes;
  const relationships = ontology.relationships;
  const isKorean = locale === 'ko';

  // Quest 1: Meet the Entities (always generated)
  if (entities.length >= 2) {
    const explorationSteps: QuestStep[] = entities.slice(0, Math.min(4, entities.length)).map((entity, index) => ({
      id: `step-1-${index + 1}`,
      instruction: isKorean
        ? `${entity.name} 엔터티를 클릭해 속성을 살펴보세요`
        : `Click on the ${entity.name} entity to learn about its properties`,
      targetType: 'entity' as const,
      targetId: entity.id,
      hint: isKorean ? `그래프에서 ${entity.icon} 아이콘을 찾으세요` : `Look for the ${entity.icon} icon in the graph`
    }));

    quests.push({
      id: "quest-1",
      title: isKorean ? "엔터티 만나기" : "Meet the Entities",
      description: isKorean
        ? `${ontology.name} 온톨로지의 핵심 엔터티 형식을 알아보세요.`
        : `Discover the core entity types in the ${ontology.name} ontology.`,
      difficulty: "beginner",
      category: "exploration",
      steps: explorationSteps,
      reward: {
        badge: isKorean ? "엔터티 탐험가" : "Entity Explorer",
        badgeIcon: "🎖️",
        points: 100
      }
    });
  }

  // Quest 2: Relationship Navigator
  if (relationships.length >= 2) {
    const relSteps: QuestStep[] = [];
    const usedEntities = new Set<string>();

    // Try to find a chain of relationships
    for (const rel of relationships.slice(0, 3)) {
      const sourceEntity = entities.find(e => e.id === rel.from);
      const targetEntity = entities.find(e => e.id === rel.to);

      if (sourceEntity && !usedEntities.has(sourceEntity.id)) {
        relSteps.push({
          id: `step-2-${relSteps.length + 1}`,
          instruction: isKorean ? `${sourceEntity.name} 엔터티에서 시작하세요` : `Start at the ${sourceEntity.name} entity`,
          targetType: 'entity',
          targetId: sourceEntity.id,
          hint: isKorean ? `${sourceEntity.icon} 아이콘을 찾으세요` : `Find the ${sourceEntity.icon} icon`
        });
        usedEntities.add(sourceEntity.id);
      }

      relSteps.push({
        id: `step-2-${relSteps.length + 1}`,
        instruction: isKorean
          ? `'${rel.name}' 관계를 따라${targetEntity ? ` ${targetEntity.name}(으)로` : ''} 이동하세요`
          : `Follow the '${rel.name}' relationship${targetEntity ? ` to ${targetEntity.name}` : ''}`,
        targetType: 'relationship',
        targetId: rel.id,
        hint: isKorean ? `"${rel.name}" 레이블이 있는 선을 클릭하세요` : `Click the line labeled "${rel.name}"`
      });
    }

    if (relSteps.length >= 2) {
      quests.push({
        id: "quest-2",
        title: isKorean ? "관계 탐색가" : "Relationship Navigator",
        description: isKorean
          ? `${ontology.name}의 엔터티 사이 연결을 따라가 보세요.`
          : `Trace the connections between entities in ${ontology.name}.`,
        difficulty: "intermediate",
        category: "traversal",
        steps: relSteps,
        reward: {
          badge: isKorean ? "연결 마스터" : "Connection Master",
          badgeIcon: "🔗",
          points: 200
        }
      });
    }
  }

  // Quest 3: Find the Hub - identify the most connected entity
  const connectionCount: Record<string, number> = {};
  for (const entity of entities) {
    connectionCount[entity.id] = relationships.filter(
      r => r.from === entity.id || r.to === entity.id
    ).length;
  }
  
  const sortedByConnections = entities
    .map(e => ({ entity: e, connections: connectionCount[e.id] || 0 }))
    .sort((a, b) => b.connections - a.connections);

  if (sortedByConnections.length >= 2 && sortedByConnections[0].connections >= 2) {
    const hub = sortedByConnections[0].entity;
    const connectedRels = relationships.filter(
      r => r.from === hub.id || r.to === hub.id
    ).slice(0, 3);

    const hubSteps: QuestStep[] = [
      {
        id: "step-3-1",
        instruction: isKorean
          ? `${hub.name} 엔터티를 찾으세요. 이 온톨로지에서 가장 많이 연결되어 있습니다!`
          : `Find the ${hub.name} entity - it's the most connected in this ontology!`,
        targetType: 'entity',
        targetId: hub.id,
        hint: isKorean
          ? `${hub.name}에는 ${connectionCount[hub.id]}개의 연결이 있습니다`
          : `${hub.name} has ${connectionCount[hub.id]} connections`
      }
    ];

    connectedRels.forEach((rel, i) => {
      hubSteps.push({
        id: `step-3-${i + 2}`,
        instruction: isKorean ? `'${rel.name}' 관계를 살펴보세요` : `Explore the '${rel.name}' relationship`,
        targetType: 'relationship',
        targetId: rel.id,
        hint: isKorean
          ? `이 관계는 ${hub.name}${rel.from === hub.id ? '에서 시작합니다' : '에 연결됩니다'}`
          : `This ${rel.from === hub.id ? 'originates from' : 'connects to'} ${hub.name}`
      });
    });

    quests.push({
      id: "quest-3",
      title: isKorean ? "허브 찾기" : "Find the Hub",
      description: isKorean
        ? `${ontology.name}에서 가장 많이 연결된 엔터티를 찾아보세요.`
        : `Discover which entity is the most connected in ${ontology.name}.`,
      difficulty: "intermediate",
      category: "exploration",
      steps: hubSteps,
      reward: {
        badge: isKorean ? "허브 탐정" : "Hub Detective",
        badgeIcon: "🔍",
        points: 200
      }
    });
  }

  // Quest 4: Property Detective - explore entity properties
  const entitiesWithManyProps = entities
    .filter(e => e.properties.length >= 3)
    .slice(0, 2);

  if (entitiesWithManyProps.length >= 1) {
    const propSteps: QuestStep[] = [];
    
    for (const entity of entitiesWithManyProps) {
      propSteps.push({
        id: `step-4-${propSteps.length + 1}`,
        instruction: isKorean
          ? `${entity.name} 엔터티를 선택하고 ${entity.properties.length}개의 속성을 살펴보세요`
          : `Select the ${entity.name} entity and examine its ${entity.properties.length} properties`,
        targetType: 'entity',
        targetId: entity.id,
        hint: isKorean ? `검사기 패널에서 속성 세부 정보를 확인하세요` : `Check the Inspector panel for property details`
      });

      const identifierProp = entity.properties.find(p => p.isIdentifier);
      if (identifierProp) {
        propSteps.push({
          id: `step-4-${propSteps.length + 1}`,
          instruction: isKorean
            ? `${entity.name}에서 식별자 속성 '${identifierProp.name}'을 찾으세요`
            : `Find the identifier property '${identifierProp.name}' in ${entity.name}`,
          targetType: 'property',
          targetId: identifierProp.name,
          hint: isKorean ? `식별자를 표시하는 열쇠 아이콘 🔑을 찾으세요` : `Look for the key icon 🔑 marking the identifier`
        });
      }
    }

    quests.push({
      id: "quest-4",
      title: isKorean ? "속성 탐정" : "Property Detective",
      description: isKorean ? `각 엔터티 형식을 정의하는 속성을 알아보세요.` : `Learn about the properties that define each entity type.`,
      difficulty: "intermediate",
      category: "exploration",
      steps: propSteps,
      reward: {
        badge: isKorean ? "데이터 학자" : "Data Scholar",
        badgeIcon: "📊",
        points: 250
      }
    });
  }

  // Quest 5: Query Explorer (always available)
  const sampleEntities = entities.slice(0, 2);
  const querySteps: QuestStep[] = [
    {
      id: "step-5-1",
      instruction: isKorean
        ? `질문해 보세요: "${sampleEntities[0]?.name || '엔터티'}란 무엇인가요?"`
        : `Try asking: "What is ${sampleEntities[0]?.name || 'an entity'}?"`,
      targetType: 'query',
      hint: isKorean ? "자연어 쿼리 플레이그라운드에 입력하세요" : "Type in the Natural Language Query playground"
    }
  ];

  if (sampleEntities.length >= 2) {
    querySteps.push({
      id: "step-5-2",
      instruction: isKorean
        ? `이제 질문해 보세요: "${sampleEntities[0].name}와(과) ${sampleEntities[1].name}는 어떻게 연결되나요?"`
        : `Now ask: "How does ${sampleEntities[0].name} relate to ${sampleEntities[1].name}?"`,
      targetType: 'query',
      hint: isKorean ? "엔터티 사이의 관계를 살펴보세요" : "Explore the relationships between entities"
    });
  }

  if (relationships.length > 0) {
    const rel = relationships[0];
    const fromEntity = entities.find(e => e.id === rel.from);
    const toEntity = entities.find(e => e.id === rel.to);
    querySteps.push({
      id: "step-5-3",
      instruction: fromEntity && toEntity
        ? (isKorean
          ? `탐색 쿼리를 시도해 보세요: "${fromEntity.name}와(과) ${toEntity.name}는 어떻게 연결되나요?"`
          : `Try a traversal query: "How does ${fromEntity.name} connect to ${toEntity.name}?"`)
        : (isKorean
          ? `"${rel.name}" 관계에 대한 탐색 쿼리를 시도해 보세요`
          : `Try a traversal query about the "${rel.name}" relationship`),
      targetType: 'query',
      hint: isKorean ? `"${rel.name}" 관계 경로를 따라갑니다` : `This follows the "${rel.name}" relationship path`
    });
  }

  quests.push({
    id: "quest-5",
    title: isKorean ? "쿼리 탐험가" : "Query Explorer",
    description: isKorean ? "자연어 쿼리로 질문하는 방법을 익혀보세요." : "Learn to ask questions using natural language queries.",
    difficulty: "advanced",
    category: "query",
    steps: querySteps,
    reward: {
      badge: isKorean ? "쿼리 마법사" : "Query Wizard",
      badgeIcon: "🧙",
      points: 300
    }
  });

  // Quest 6: Full Traversal - go through a chain of entities
  if (relationships.length >= 3) {
    // Try to find a chain: A -> B -> C
    let chain: { entities: typeof entities[0][], rels: typeof relationships[0][] } | null = null;

    for (const startRel of relationships) {
      const midEntity = entities.find(e => e.id === startRel.to);
      if (!midEntity) continue;

      const nextRel = relationships.find(r => r.from === midEntity.id && r.id !== startRel.id);
      if (!nextRel) continue;

      const endEntity = entities.find(e => e.id === nextRel.to);
      if (!endEntity) continue;

      const startEntity = entities.find(e => e.id === startRel.from);
      if (!startEntity) continue;

      chain = {
        entities: [startEntity, midEntity, endEntity],
        rels: [startRel, nextRel]
      };
      break;
    }

    if (chain) {
      const chainSteps: QuestStep[] = [
        {
          id: "step-6-1",
          instruction: isKorean ? `${chain.entities[0].name}에서 여정을 시작하세요` : `Start your journey at ${chain.entities[0].name}`,
          targetType: 'entity',
          targetId: chain.entities[0].id,
          hint: isKorean ? `${chain.entities[0].icon} 아이콘을 찾으세요` : `Find the ${chain.entities[0].icon} icon`
        },
        {
          id: "step-6-2",
          instruction: isKorean
            ? `'${chain.rels[0].name}'을 따라 ${chain.entities[1].name}에 도달하세요`
            : `Follow '${chain.rels[0].name}' to reach ${chain.entities[1].name}`,
          targetType: 'relationship',
          targetId: chain.rels[0].id,
          hint: isKorean ? "연결 간선을 클릭하세요" : "Click the connecting edge"
        },
        {
          id: "step-6-3",
          instruction: isKorean ? `${chain.entities[1].name} 엔터티를 살펴보세요` : `Explore the ${chain.entities[1].name} entity`,
          targetType: 'entity',
          targetId: chain.entities[1].id,
          hint: isKorean ? `여정의 중간 지점입니다` : `This is the middle of your journey`
        },
        {
          id: "step-6-4",
          instruction: isKorean
            ? `'${chain.rels[1].name}'을 따라 ${chain.entities[2].name}까지 계속 이동하세요`
            : `Continue via '${chain.rels[1].name}' to reach ${chain.entities[2].name}`,
          targetType: 'relationship',
          targetId: chain.rels[1].id,
          hint: isKorean ? "연결 하나만 더 지나면 됩니다!" : "One more connection to go!"
        },
        {
          id: "step-6-5",
          instruction: isKorean ? `도착했습니다! ${chain.entities[2].name}을(를) 살펴보세요` : `You made it! Explore ${chain.entities[2].name}`,
          targetType: 'entity',
          targetId: chain.entities[2].id,
          hint: isKorean ? `여정 완료! ${chain.entities[2].icon}` : `Journey complete! ${chain.entities[2].icon}`
        }
      ];

      quests.push({
        id: "quest-6",
        title: isKorean ? "전체 여정" : "The Full Journey",
        description: isKorean
          ? `${chain.entities[0].name}에서 ${chain.entities[2].name}까지 탐색하세요.`
          : `Traverse from ${chain.entities[0].name} all the way to ${chain.entities[2].name}.`,
        difficulty: "advanced",
        category: "traversal",
        steps: chainSteps,
        reward: {
          badge: isKorean ? "경로 개척자" : "Path Pioneer",
          badgeIcon: "🗺️",
          points: 350
        }
      });
    }
  }

  return quests;
}

/**
 * Get a domain-specific badge icon based on ontology category/name
 */
export function getOntologyThemeIcon(ontologyName: string): string {
  const name = ontologyName.toLowerCase();
  if (name.includes('health') || name.includes('medical') || name.includes('patient')) return '🏥';
  if (name.includes('commerce') || name.includes('retail') || name.includes('shop')) return '🛒';
  if (name.includes('bank') || name.includes('financ')) return '🏦';
  if (name.includes('manufactur') || name.includes('factory') || name.includes('production')) return '🏭';
  if (name.includes('university') || name.includes('education') || name.includes('school')) return '🎓';
  if (name.includes('coffee') || name.includes('cosmic')) return '☕';
  return '🔷';
}
