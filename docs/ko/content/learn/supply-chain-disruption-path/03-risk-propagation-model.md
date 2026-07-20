---
title: "위험 전파 모델"
slug: risk-propagation-model
description: "중단이 어떻게 병렬적으로 발생하는지 이해하세요 - 공급업체 영향 → 구성 요소 위험 → 제품 노출 → 완화 조치 모델을 만드는 7가지 관계."
order: 3
---

## 캐스케이드: 7개의 관계

당신의 오노토미의 힘은 그 관계에 있습니다. 그들은 영향이 공급망 전반에 어떻게 흐르는지를 암호화합니다. 데이터 에이전트는 이러한 경로를 따라 "이 공급업체 결함에 노출된 제품 라인은 몇 개입니까?"와 같은 질문에 답합니다.

### 1. **공급업체에서 구성요소 공급**(일대다)

```
Supplier "ChipX Corp"
  supplies→ Component "GPU Module"
         → Component "Memory Board"
         → Component "Power Supply"
```

- **왜 중요한가**: 한 공급업체의 중단은 그 공급업체의 모든 의존하는 구성요소에 영향을 미친다.
- **질문 예시**: "대만 공급업체에서 모든 구성요소를 보여줘"

### 2. **ProductLine에서 사용되는 구성요소**(여러개에서 여러개로)

```
Component "GPU Module"
  usedIn→ ProductLine "Gaming Laptop 2024"
       → ProductLine "Workstation Pro"
       → ProductLine "Tablet Plus"
```

- **왜 중요한가**: 단일 구성 요소의 고장이 여러 제품 라인을 중단시킬 수 있습니다.
- **질문 예시**: "이 구성요인에 의존하는 제품 라인은 몇 개입니까?"

### 3. **DisruptionEvent(중단 이벤트)이 공급업체에 영향을 미칩니다**(여러 대 여러)

```
DisruptionEvent "Taiwan Power Outage 2024-05-01"
  affects→ Supplier "ChipX Corp"
        → Supplier "Memory Inc"
```

- **왜 중요한가**: 하나의 재해가 동시에 여러 공급업체에 영향을 미칠 수 있습니다.
- **질문 예시**: "어떤 공급업체가 홍수 구역에 있습니까?"

### 4. **중단 이벤트**는 **위험 평가**를 트리거합니다(일대다)

```
DisruptionEvent "Taiwan Power Outage"
  triggers→ RiskAssessment "Gaming Laptop - Impact Analysis"
         → RiskAssessment "Workstation - Impact Analysis"
```

- **왜 중요한가**: 각 중단은 영향을 받는 제품 라인의 자세한 영향 분석을 트리거합니다.
- **질문 예시**: "이 중단으로 인해 위험에 처한 총 수익은 얼마입니까?"

### 5. **리스크 평가는 완화 조치를 권장합니다** (일대다수)

```
RiskAssessment "Gaming Laptop - Impact Analysis"
  recommends→ MitigationAction "Activate Alt Supplier X"
           → MitigationAction "Increase Safety Stock"
           → MitigationAction "Redesign Component"
```

- **왜 중요한가**: 각 영향 분석은 우선순위별 조치 목록을 생성합니다.
- **질문 예시**: "중단 영향의 영향을 최소화하기 위해 가장 좋은 조치는 무엇입니까?"

### 6. **대응 조치**는 대체 공급자를 활성화합니다(다대다)

```
MitigationAction "Activate Alt Supplier X"
  activates→ AlternativeSupplier "ChipX Europe"
          → AlternativeSupplier "SemiCorp Japan"
```

- **왜 중요한가**: 하나의 작업으로 여러 백업을 동시에 온라인으로 가져올 수 있습니다.
- **질문 예시**: "어떤 사전 자격이 있는 공급업체가 인수할 수 있습니까?"

### 7. **대체공급업체는 공급업체를 대체할 수 있음** (여러개에서 하나로)

```
AlternativeSupplier "ChipX Europe"
  canReplace→ Supplier "ChipX Corp"

AlternativeSupplier "SemiCorp Japan"
  canReplace→ Supplier "ChipX Corp"
```

- **왜 중요한가**: 중요한 공급업체에 대해 여러 개의 승인된 백업이 존재합니다.
- **질문 예시**: "이 공급업체에 대한 승인된 백업이 있습니까?"

## 완전한 캐스케이드 예제

실제 시나리오를 통해 영향을 추적해 보겠습니다.

```
DISRUPTION
│
├─ Taiwan Power Outage (2024-05-01, Critical severity)
│
├─ AFFECTS
│  └─ Supplier "ChipX Corp" (singleSourced=true)
│     ├─ SUPPLIES
│     │  ├─ Component "GPU Module" (daysOfSupplyOnHand=3)
│     │  │  ├─ USED IN
│     │  │  │  ├─ ProductLine "Gaming Laptop 2024" ($50M annual revenue)
│     │  │  │  ├─ ProductLine "Workstation Pro" ($30M annual revenue)
│     │  │  │
│     │  │  └─ TRIGGERS RiskAssessment
│     │  │     ├─ revenueAtRisk=$80M
│     │  │     ├─ timeToImpactDays=3
│     │  │     │
│     │  │     └─ RECOMMENDS
│     │  │        ├─ MitigationAction "Activate ChipX Europe"
│     │  │        │  ├─ estimatedCost=$2M
│     │  │        │  ├─ leadTimeSavedDays=2
│     │  │        │  │
│     │  │        │  └─ ACTIVATES
│     │  │        │     ├─ AlternativeSupplier "ChipX Europe"
│     │  │        │     │  ├─ qualificationStatus=Approved
│     │  │        │     │  ├─ capacityAvailable=50,000 units/month
│     │  │        │     │  ├─ pricePremiumPercent=12%
│     │  │        │     │  │
│     │  │        │     │  └─ CAN REPLACE
│     │  │        │     │     └─ Supplier "ChipX Corp"
│     │  │        │     │
│     │  │        │     └─ AlternativeSupplier "SemiCorp Japan"
│     │  │        │        └─ (secondary option)
│     │  │        │
│     │  │        └─ MitigationAction "Increase Safety Stock"
│     │  │           └─ estimatedCost=$500K
│     │  │
│     │  └─ Component "Memory Board"
│     │     └─ (similar cascade...)
```

## 이 구조가 자동화를 가능하게 하는 이유

당신의 데이터 에이전트는 이제 다음과 같은 작업을 수행할 수 있습니다:

1. **탐지** - "이 공급업체와 이 지역을 모니터링합니다."
2. **트래스** - "ChipX Corp에 문제가 발생하면 자동으로 영향을 받는 14개 제품 라인을 모두 추적합니다."
3. **정량화** - "위험이 있는 총 수익 ($80M)과 영향 발생 시간(3일)을 계산합니다."
4. **추천** - "2일 절약하고 8천만 달러 손실보다 2천만 달러 비용으로 드는 사전 자격이 있는 대안을 활성화하세요"
5. **행동** - "구매 알림을 보내고, 생산 일정을 업데이트하고, 이해 관계자에게 알린다"
6. **학습** - "실제로 효과가 있었던 행동과 그 실제 영향과 추정 영향이 무엇인지 추적하기"

## 개수 규칙

| 관계 | 개수 | 왜 |
|---|---|---|
| 공급업체 → 구성요소 | 1:N | 한 공급업체는 여러 구성요소를 제공할 수 있음 |
| 구성요소 → 제품 라인 | M:N | 재사용된 구성요소; 제품들이 구성요소를 공유한다 |
| 중단 → 공급업체 | M:N | 하나의 재해가 여러 공급업체에 영향을 미칩니다. 공급업체는 여러 가지 위협에 직면합니다|
| 중단 → 평가 | 1:N | 각 중단은 영향을 받는 각 제품 라인에 대한 평가를 생성합니다 |
| 평가 → 조치 | 1:N | 각 평가에는 여러 조치가 권장됩니다 |
| 액션 → 대안 | M:N | 하나의 액션은 여러 백업을 활성화합니다; 백업은 여러 상황을 처리합니다 |
| 대안 → 공급업체 | M:1 | 하나의 주요 공급업체에 대해 여러 개의 사전 자격이 있는 백업이 존재합니다 |

다음으로, 우리는 이 모델을 사용하여 실제에서 완화 워크플로를 실행하는 방법을 살펴보겠습니다.
