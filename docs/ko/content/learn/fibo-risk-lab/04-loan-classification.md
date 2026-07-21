---
title: "3단계: 대출 분류"
slug: loan-classification
description: 바젤 위험 가중치, 담보 범주 및 OCC/FDIC 집중 버킷을 사용하여 대출 유형을 추가합니다.
order: 4
embed: official/fibo-risk-step-3
reviewStatus: under-human-review
---

## 제품 규격

우리는 위험이 *어디*에 살고 있는지(지리)와 *어떤 부문*이 노출되어 있는지(산업)를 모델링했습니다. 이제 **대출 상품 차원**, 즉 유형별 대출 분류, 담보, 규제 집중 버킷을 추가합니다.

이것이 바젤 III 위험 가중치가 등장하는 곳입니다.

## 새로운 항목 유형

### 농도 카테고리

OCC/FDIC 지침에 정의된 규제 버킷입니다. 은행은 카테고리별로 노출을 모니터링해야 합니다.

| 부동산 | 유형 | 메모 |
|---|---|---|
| `categoryId` | 문자열 | 식별자(예: "CRE", "C&I", "CONSUMER") |
| `name` | 문자열 | 표시 이름 |
| `description` | 문자열 | 이 범주에 속하는 것 |
| `occGuidance` | 문자열 | 관련 OCC/FDIC 지침 참조 |

예시 카테고리: **CRE**(상업용 부동산), **C&I**(상업 및 산업), **소비자**, **농업**.

### 대출 유형

Basel III 자본 요건이 있는 특정 대출 상품입니다.

| 부동산 | 유형 | 메모 |
|---|---|---|
| `loanTypeCode` | 문자열 | 식별자(예: "residential_mortgage") |
| `name` | 문자열 | 표시 이름 |
| `baselRiskWeight` | 소수점(%) | 바젤 III 표준화 위험 가중치 |
| `regulatoryTreatment` | 문자열 | 규제 기관이 이 제품을 분류하는 방법 |
| `capitalTier` | 문자열 | 자본 처리 계층 |
| `description` | 문자열 | 상품 설명 |

주요 예:

| 대출 종류 | 바젤 위험 가중치 |
|---|---|
| 주거용 모기지 | 35% |
| 자동차 대출 | 75% |
| SBA 대출 | 0% (정부보장) |
| 건설대출 | 150% |
| CRE 모기지 | 100% |

### 담보 유형

회복 기대와 함께 대출을 확보하는 자산 카테고리입니다.

| 부동산 | 유형 | 메모 |
|---|---|---|
| `collateralTypeCode` | 문자열 | 식별자 |
| `name` | 문자열 | 표시 이름 |
| `recoveryExpectation` | 문자열 | 예상 회복률(예: "높음", "보통", "낮음") |
| `description` | 문자열 | 자산 분류 설명 |

## 새로운 관계

- **loanClassifiedAs**: `LoanType` → `ConcentrationCategory` (`many-to-one`) — 각 대출 유형은 집중 버킷에 매핑됩니다.
- **담보분류형**: `CollateralType` → `ConcentrationCategory` (`many-to-one`) — 담보 유형도 집중 버킷에 매핑됩니다.
- **일반적으로 SecuredBy**: `CollateralType` → `LoanType` (`many-to-many`) — 일반적으로 어떤 담보 유형이 어떤 대출 유형을 뒷받침하는지 링크

## 디자인 패턴: 허브 엔터티

**ConcentrationCategory**는 *허브 엔터티*입니다. 이는 대출 분류 하위 그래프를 모델의 나머지 부분에 연결합니다. LoanType과 ColtralType은 모두 이를 가리키며 규제 분석을 위한 공유 참조 지점을 생성합니다.

4단계에서는 RegulatoryLimit도 ConcentrationCategory에 연결하여 규정 준수 쿼리의 중앙 노드로 만듭니다.

## 바젤 III 위험 가중치: 그것이 중요한 이유

Basel III는 은행이 각 대출 유형에 대해 얼마나 많은 자본을 보유해야 하는지를 결정하는 위험 가중치를 할당합니다. 주택담보대출에 대한 위험 가중치가 35%는 은행이 대출한 달러당 더 적은 자본이 필요하다는 것을 의미하고, 건설 대출에 대한 150% 가중치는 훨씬 더 많은 자본이 필요하다는 것을 의미합니다.

이는 다음에 직접적인 영향을 미칩니다.

- **수익성**: 낮은 위험 가중치 = 묶인 자본 감소 = 높은 자기자본수익률
- **포트폴리오 전략**: 은행은 위험 가중치를 염두에 두고 대출 구성을 최적화합니다.
- **규제 준수**: 위험 가중 자산 한도를 초과하면 감독 조치가 실행됩니다.

## 3단계 그래프(2단계와 다름)

<ontology-embed id="official/fibo-risk-step-3" diff="official/fibo-risk-step-2" height="440px"></ontology-embed>

*3개의 새로운 법인이 대출 분류 클러스터를 구성합니다. ConcentrationCategory는 대출 유형과 담보 유형을 연결하는 허브입니다.*

```quiz
Q: 건설 대출의 바젤 위험 가중치는 150%인 반면 SBA 대출의 위험 가중치는 0%인 이유는 무엇입니까?
- 건설 대출 처리에 더 오랜 시간이 소요됨
- SBA대출은 정부보증이라 은행의 신용리스크가 없는 반면, 건설대출은 부도 및 완료리스크가 높음 [correct]
- 건설사는 수익성이 낮다.
- SBA는 안전한 은행 자산을 의미합니다.
> 바젤 III 위험 가중치는 은행이 부담하는 신용 위험을 반영합니다. SBA(중소기업청) 대출은 미국 정부의 지원을 받아 은행의 신용위험이 전혀 없습니다. 건설대출은 완료 위험, 시장 위험, 높은 부도율에 직면해 있어 은행은 위험 가중 자본을 150% 보유해야 합니다.
```
