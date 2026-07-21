---
title: "핵심 엔터티 및 속성"
slug: core-entities
description: "공급업체와 구성 요소부터 위험 평가 및 완화 조치까지 공급망 중단에 , 대한 모델을 만드는 7가지 엔터티 유형과 40가지 속성을 배우십시오."
order: 2
---

## 7가지 엔터티 유형

당신의 개론은 트리거 이벤트부터 감지, 평가, 대응에 이르기까지 공급망 중단 전체의 전체 수명주기를 포착합니다.

### Tier 1: 네트워크

**공급업체**
- 원재료나 구성 요소를 제공하는 외부 회사를 나타냅니다.
- 주요 속성: `supplierId`(독점), `name`, `country`, `tier`(티어 1/2/3), `reliabilityScore`(0-100), `singleSourced`(부울)
- 사용 사례: 위험 증폭기인 중요한 단일 공급업체 식별하기

**구성요소**
- 한 또는 여러 공급업체에서 조달한 부품, 재료 또는 하위 어셈블리
- 주요 속성: `componentId`, `name`, `category` (전자/기계/화학/포장/원재료), `daysOfSupplyOnHand`, `criticalityLevel` (중요성 수준) (중요/높음/중간/낮음)
- 사용 사례: 안전 재고에 따라 공급업체 중단에도 살아남을 수 있는 구성 요소를 추적합니다.

**제품 라인**
- 공통 구성 요소를 공유하는 완성품의 그룹
- 주요 속성: `productLineId`, `name`, `annualRevenue`, `marketSegment`, `productionStatus` (활성/위험/정지/중단)
- 사용 사례: 수익 노출과 생산 일정 영향 계산하기

### Tier 2: 중단

**중단 이벤트**
- 한 명 이상의 공급업체로부터의 정상적인 공급을 방해하거나 위협하는 사건
- 주요 특성: `eventId`, `type` (자연재해/지정학적/재정적/물류/품질 회수/전염병/사이버 공격), `severity` (중요/높음/중간/낮음), `startDate`, `estimatedDurationDays`, `region`
- 사용 사례: 분류 및 심각도는 에스컬레이션 수준과 응답 타임라인을 결정합니다.

### Tier 3: 분석

**위험평가**
- 중단으로 인해 공급망이 영향을 받을 때의 비즈니스 영향 분석
- 주요 속성: `assessmentId`, `assessedDate` (날짜 및 시간), `revenueAtRisk` (USD), `timeToImpactDays`, `confidenceLevel` (높음/중간/낮음), `recommendedAction`
- 사용 사례: 비즈니스 용어로 영향(돈과 시간)을 수치화하여 대응을 우선순위 지정하기

**대응 조치**
- 중단 영향력을 줄이거나 제거하기 위한 구체적인 단계
- 주요 속성: `actionId`, `type` (대체 공급업체 활성화/안전 재고 증가/구성 요소 재설계/생산 감소/발송 속도 향상/고객 커뮤니케이션), `status` (제안됨/승인됨/진행 중/완료됨/취소됨), `estimatedCost` (USD), `leadTimeSavedDays`
- 사용 사례: 어떤 행동이 취해졌는지 추적하고 그 실제 효과와 추정 효과 비교하기

### Tier 4: 백업

**대체 공급업체**
- 주요 공급업체 대신할 수 있는 자격이 있는 백업 공급업체
- 주요 속성: `altSupplierId`, `name`, `country`, `qualificationStatus` (사전 자격이 있는/승인된/감사 중/자격이 없는), `capacityAvailable` (단위/월), `pricePremiumPercent` (%))
- 사용 사례: 알려진 용량과 비용 영향으로 백업을 신속하게 활성화하기

## 속성 유형 및 검증

각 속성에는 AI 에이전트와 대시보드가 그것과 어떻게 상호 작용하는지를 형성하는 유형이 있습니다:

| 유형 | 예시 | 에이전트에서 사용 |
|------|---------|---------------|
| `string` | 공급업체 이름, 구성 요소 카테고리 | 검색, 필터링, 보고 |
| `integer` | 공급일, 용량, 단위 | 임계값 기반 알림 |
| `decimal` | 수익, 가격 프리미엄, 신뢰성 점수 | 비용-효과 계산 |
| `date` | 중단 시작일 | 타임라인 비교 |
| `datetime` | 위험 평가 타임쿼터 | 감사 기록, 추세 |
| `enum` | 공급업체 계층, 중단 유형, 심각도 | 분류, 의사 결정 트리 |
| `boolean` | 단일 소스 플래그 | 위험 플래그 |

## 식별자 속성

각 엔터티에는 고유한 식별자가 있습니다:

```
Supplier → supplierId (e.g., "SUPP-00456")
Component → componentId (e.g., "COMP-SEM-0821")
ProductLine → productLineId (e.g., "PL-LAP-2024")
DisruptionEvent → eventId (e.g., "DISR-202405-TAIWAN-001")
RiskAssessment → assessmentId (e.g., "RA-20240501-SEM-001")
MitigationAction → actionId (e.g., "MA-20240501-ALT-SUPP")
AlternativeSupplier → altSupplierId (e.g., "ALTSUPP-00789")
```

이러한 ID는 귀하와 귀하의 에이전트이 쿼리 및 보고서에서 특정 인스턴스를 참조하는 방법입니다.

## 개수 및 관계

개체는 정의된 개수 집합과 관계로 연결됩니다.

- **일대다**: 공급업체가 많은 구성요소를 제공합니다; 중단으로 인해 많은 공급업체가 영향을 받습니다.
- **다대다**: 구성요소가 여러 제품 라인에서 사용되며; 완화 조치는 여러 대체 공급업체를 활성화합니다.
- **여러개에서 하나로**: 대체 공급업체가 하나의 주요 공급업체를 대체할 수 있다

다음으로 전체 관계 지도를 살펴보겠습니다.
