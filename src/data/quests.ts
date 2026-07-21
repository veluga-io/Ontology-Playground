// Quest system for Ontology Playground demo
import type { Locale } from '../store/appStore';

export interface Quest {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'exploration' | 'traversal' | 'query';
  steps: QuestStep[];
  reward: {
    badge: string;
    badgeIcon: string;
    points: number;
  };
}

export interface QuestStep {
  id: string;
  instruction: string;
  targetType: 'entity' | 'relationship' | 'property' | 'query';
  targetId?: string;
  hint?: string;
}

export const quests: Quest[] = [
  {
    id: "quest-1",
    title: "Meet the Entities",
    description: "Discover the core building blocks of the Fourth Coffee ontology by exploring entity types.",
    difficulty: "beginner",
    category: "exploration",
    steps: [
      {
        id: "step-1-1",
        instruction: "Click on the Customer entity to learn about customers",
        targetType: "entity",
        targetId: "customer",
        hint: "Look for the 👤 icon in the graph"
      },
      {
        id: "step-1-2",
        instruction: "Now explore the Product entity",
        targetType: "entity",
        targetId: "product",
        hint: "Find the ☕ coffee cup icon"
      },
      {
        id: "step-1-3",
        instruction: "Finally, check out the Store entity",
        targetType: "entity",
        targetId: "store",
        hint: "Locate the 🏪 store icon"
      }
    ],
    reward: {
      badge: "Entity Explorer",
      badgeIcon: "🎖️",
      points: 100
    }
  },
  {
    id: "quest-2",
    title: "The Bean Trail",
    description: "Trace the journey of a coffee bean from supplier to customer by following relationships.",
    difficulty: "intermediate",
    category: "traversal",
    steps: [
      {
        id: "step-2-1",
        instruction: "Start at the Supplier entity - this is where beans originate",
        targetType: "entity",
        targetId: "supplier",
        hint: "Find the 🚚 truck icon"
      },
      {
        id: "step-2-2",
        instruction: "Follow the 'sourcedFrom' relationship to Product",
        targetType: "relationship",
        targetId: "product_sourced_from_supplier",
        hint: "Click the line connecting Supplier to Product"
      },
      {
        id: "step-2-3",
        instruction: "Explore the 'contains' relationship to see how products appear in orders",
        targetType: "relationship",
        targetId: "order_contains_product",
        hint: "Look at the connection between Order and Product"
      },
      {
        id: "step-2-4",
        instruction: "Finally, see the 'places' relationship showing who placed the order",
        targetType: "relationship",
        targetId: "customer_places_order",
        hint: "Find the relationship from Customer to Order"
      }
    ],
    reward: {
      badge: "Bean Detective",
      badgeIcon: "🔍",
      points: 250
    }
  },
  {
    id: "quest-3",
    title: "Supply Chain Navigator",
    description: "Understand how shipments connect suppliers to stores.",
    difficulty: "intermediate",
    category: "traversal",
    steps: [
      {
        id: "step-3-1",
        instruction: "Click on the Shipment entity",
        targetType: "entity",
        targetId: "shipment",
        hint: "Find the 📦 package icon"
      },
      {
        id: "step-3-2",
        instruction: "Explore the 'sentBy' relationship to Supplier",
        targetType: "relationship",
        targetId: "shipment_from_supplier",
        hint: "See where shipments come from"
      },
      {
        id: "step-3-3",
        instruction: "Follow the 'deliveredTo' relationship to Store",
        targetType: "relationship",
        targetId: "shipment_to_store",
        hint: "See where shipments go"
      }
    ],
    reward: {
      badge: "Supply Chain Master",
      badgeIcon: "🌐",
      points: 200
    }
  },
  {
    id: "quest-4",
    title: "Query Explorer",
    description: "Learn to ask questions using natural language queries.",
    difficulty: "advanced",
    category: "query",
    steps: [
      {
        id: "step-4-1",
        instruction: "Try asking: 'Show me all Gold tier customers'",
        targetType: "query",
        hint: "Type in the query playground"
      },
      {
        id: "step-4-2",
        instruction: "Now ask: 'Which products come from Ethiopia?'",
        targetType: "query",
        hint: "Use natural language to filter by origin"
      },
      {
        id: "step-4-3",
        instruction: "Try a traversal query: 'What orders did Arif Ramadhan place?'",
        targetType: "query",
        hint: "This follows the Customer → Order relationship"
      }
    ],
    reward: {
      badge: "Query Wizard",
      badgeIcon: "🧙",
      points: 300
    }
  },
  {
    id: "quest-5",
    title: "Data Binding Discovery",
    description: "Learn how ontology concepts connect to real data platform sources.",
    difficulty: "advanced",
    category: "exploration",
    steps: [
      {
        id: "step-5-1",
        instruction: "Select the Customer entity and view its data bindings",
        targetType: "entity",
        targetId: "customer",
        hint: "Look for the 'Data Bindings' section in the inspector"
      },
      {
        id: "step-5-2",
        instruction: "Examine how Customer properties map to source columns",
        targetType: "property",
        targetId: "name",
        hint: "Notice how 'name' maps to 'full_name' in the source"
      },
      {
        id: "step-5-3",
        instruction: "Check the Product entity's binding and note the source and table",
        targetType: "entity",
        targetId: "product",
        hint: "Look at the Data Bindings card under Product"
      }
    ],
    reward: {
      badge: "Binding Expert",
      badgeIcon: "🔗",
      points: 350
    }
  }
];

const koreanQuestCopy: Record<string, {
  title: string;
  description: string;
  badge: string;
  steps: Record<string, { instruction: string; hint?: string }>;
}> = {
  'quest-1': {
    title: '엔터티 만나기',
    description: '엔터티 형식을 탐색하며 Fourth Coffee 온톨로지의 핵심 구성 요소를 알아보세요.',
    badge: '엔터티 탐험가',
    steps: {
      'step-1-1': { instruction: 'Customer 엔터티를 클릭해 고객 정보를 살펴보세요', hint: '그래프에서 👤 아이콘을 찾으세요' },
      'step-1-2': { instruction: '이제 Product 엔터티를 살펴보세요', hint: '☕ 커피잔 아이콘을 찾으세요' },
      'step-1-3': { instruction: '마지막으로 Store 엔터티를 확인하세요', hint: '🏪 매장 아이콘을 찾으세요' },
    },
  },
  'quest-2': {
    title: '원두의 여정',
    description: '관계를 따라 공급업체에서 고객까지 커피 원두의 여정을 추적하세요.',
    badge: '원두 탐정',
    steps: {
      'step-2-1': { instruction: '원두가 출발하는 Supplier 엔터티에서 시작하세요', hint: '🚚 트럭 아이콘을 찾으세요' },
      'step-2-2': { instruction: "'sourcedFrom' 관계를 따라 Product로 이동하세요", hint: 'Supplier와 Product를 연결하는 선을 클릭하세요' },
      'step-2-3': { instruction: "'contains' 관계를 살펴보고 제품이 주문에 포함되는 방식을 확인하세요", hint: 'Order와 Product 사이의 연결을 살펴보세요' },
      'step-2-4': { instruction: "마지막으로 주문자를 나타내는 'places' 관계를 확인하세요", hint: 'Customer에서 Order로 이어지는 관계를 찾으세요' },
    },
  },
  'quest-3': {
    title: '공급망 탐색가',
    description: '배송이 공급업체와 매장을 연결하는 방식을 이해하세요.',
    badge: '공급망 마스터',
    steps: {
      'step-3-1': { instruction: 'Shipment 엔터티를 클릭하세요', hint: '📦 상자 아이콘을 찾으세요' },
      'step-3-2': { instruction: "Supplier로 이어지는 'sentBy' 관계를 살펴보세요", hint: '배송이 어디에서 시작되는지 확인하세요' },
      'step-3-3': { instruction: "Store로 이어지는 'deliveredTo' 관계를 따라가세요", hint: '배송이 어디로 향하는지 확인하세요' },
    },
  },
  'quest-4': {
    title: '쿼리 탐험가',
    description: '자연어 쿼리로 질문하는 방법을 익혀보세요.',
    badge: '쿼리 마법사',
    steps: {
      'step-4-1': { instruction: "질문해 보세요: 'Gold 등급 고객을 모두 보여줘'", hint: '쿼리 플레이그라운드에 입력하세요' },
      'step-4-2': { instruction: "이제 질문해 보세요: 'Ethiopia에서 온 제품은 무엇인가요?'", hint: '자연어로 원산지를 필터링하세요' },
      'step-4-3': { instruction: "탐색 쿼리를 시도하세요: 'Arif Ramadhan이 주문한 항목은 무엇인가요?'", hint: 'Customer → Order 관계를 따라갑니다' },
    },
  },
  'quest-5': {
    title: '데이터 바인딩 발견',
    description: '온톨로지 개념이 실제 데이터 플랫폼 원본에 연결되는 방식을 알아보세요.',
    badge: '바인딩 전문가',
    steps: {
      'step-5-1': { instruction: 'Customer 엔터티를 선택하고 데이터 바인딩을 확인하세요', hint: '검사기에서 데이터 바인딩 섹션을 찾으세요' },
      'step-5-2': { instruction: 'Customer 속성이 원본 열에 매핑되는 방식을 살펴보세요', hint: "'name'이 원본의 'full_name'에 매핑되는 방식을 확인하세요" },
      'step-5-3': { instruction: 'Product 엔터티의 바인딩에서 원본과 테이블을 확인하세요', hint: 'Product 아래의 데이터 바인딩 카드를 살펴보세요' },
    },
  },
};

export function getDefaultQuests(locale: Locale): Quest[] {
  if (locale === 'en') return quests;

  return quests.map((quest) => {
    const copy = koreanQuestCopy[quest.id];
    if (!copy) return quest;
    return {
      ...quest,
      title: copy.title,
      description: copy.description,
      steps: quest.steps.map((step) => ({ ...step, ...copy.steps[step.id] })),
      reward: { ...quest.reward, badge: copy.badge },
    };
  });
}

// Pre-defined NL query responses for demo
export interface QueryResponse {
  query: string;
  matches: string[];
  result: string;
  highlightEntities: string[];
  highlightRelationships: string[];
}

export const nlQueryResponses: QueryResponse[] = [
  {
    query: "show me all gold tier customers",
    matches: ["gold tier", "gold customers", "customers gold"],
    result: "Found 1 Gold tier customer:\n• Arif Ramadhan (CUST-001) - Gold tier since 2024",
    highlightEntities: ["customer"],
    highlightRelationships: []
  },
  {
    query: "which products come from ethiopia",
    matches: ["products ethiopia", "ethiopian", "from ethiopia"],
    result: "Found 1 product from Ethiopia:\n• Ethiopian Single Origin (☕ Brewed) - $4.50\n  Sourced from: Ethiopia Highlands Farm",
    highlightEntities: ["product", "supplier"],
    highlightRelationships: ["product_sourced_from_supplier"]
  },
  {
    query: "what orders did arif ramadhan place",
    matches: ["orders arif", "arif ramadhan orders", "arif placed"],
    result: "Arif Ramadhan's orders:\n• ORD-2025-001 - $12.50 (Completed)\n  Items: Ethiopian Single Origin x2, Colombian Latte x1\n  Store: Downtown Seattle",
    highlightEntities: ["customer", "order", "store"],
    highlightRelationships: ["customer_places_order", "order_processed_at_store"]
  },
  {
    query: "how many stores are in seattle",
    matches: ["stores seattle", "seattle stores", "how many stores"],
    result: "Found 2 stores in Seattle:\n• Fourth Coffee - Downtown Seattle (45 seats)\n• Fourth Coffee - Capitol Hill (32 seats)",
    highlightEntities: ["store"],
    highlightRelationships: []
  },
  {
    query: "show supply chain for colombian latte",
    matches: ["supply chain", "colombian latte", "where does colombian latte come from"],
    result: "Supply chain for Colombian Latte:\n• Bean Origin: Colombia 🇨🇴\n• Supplier: Colombian Mountain Roasters\n• Certification: Rainforest Alliance 🌿\n• Latest Shipment: SHIP-001 (Delivered Jan 27)",
    highlightEntities: ["product", "supplier", "shipment"],
    highlightRelationships: ["product_sourced_from_supplier", "shipment_from_supplier"]
  },
  {
    query: "what is an entity type",
    matches: ["what is entity", "entity type", "define entity"],
    result: "An Entity Type is a reusable logical model of a real-world concept (like Customer, Product, or Order). It standardizes the name, description, identifiers, and properties so every team means the same thing when using a term.",
    highlightEntities: [],
    highlightRelationships: []
  },
  {
    query: "what is a relationship",
    matches: ["what is relationship", "define relationship", "relationships"],
    result: "A Relationship is a typed, directional link between entity types. For example, 'Customer places Order' defines how customers connect to their orders. Relationships can have attributes like quantity or confidence.",
    highlightEntities: [],
    highlightRelationships: []
  },
  {
    query: "show me platinum customers",
    matches: ["platinum", "platinum customers", "customers platinum"],
    result: "Found 1 Platinum tier customer:\n• Jaroslav Cerny (CUST-002) - Platinum tier\n  Total spend: $3,420.00\n  Member since: Jan 2023",
    highlightEntities: ["customer"],
    highlightRelationships: []
  },
  {
    query: "list all organic products",
    matches: ["organic", "organic products", "is organic"],
    result: "Found 2 organic products:\n• Ethiopian Single Origin (Brewed) - $4.50 🌱\n• Nebula Cold Brew (Cold Brew) - $5.25 🌱",
    highlightEntities: ["product"],
    highlightRelationships: []
  }
];
