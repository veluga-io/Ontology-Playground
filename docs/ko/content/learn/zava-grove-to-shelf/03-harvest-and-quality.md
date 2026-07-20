---
title: 수확 및 품질
slug: harvest-and-quality
description: HarvestLot과 QualityCheck를 추가하여 모든 추적 가능한 수확 이벤트를 캡처하고 Zava의 네 단계 품질 체계를 구현하세요.
order: 3
embed: official/zava-grove-to-shelf-step-2
---

## 모든 상자에 많은 것이 있습니다.

플롯이 선택되면 그 플롯에서 나오는 킬로그램은 **HarvestLot**이 됩니다. 이는 공급망의 나머지 부분을 통과하는 추적 가능성의 단위입니다. 모든 후속 이벤트(온도 위반, 소매점 반품, 고객 청구)는 궁극적으로 HarvestLot으로 다시 연결됩니다.

Zava는 또한 **"사중 품질 검사"** 수행합니다. 동일한 lô는 현장, 포장소, 목적지 DC 및 마지막으로 매장에서 네 가지 다른 단계에서 검사됩니다. 각 검사는 고유한 스테이지 번호가 있는 별도의 `QualityCheck` 이벤트입니다.

## 엔터티들

### 수확장

| 재산 | 유형 | 식별자? |
|---|---|---|
| `lotId` | 문자열 | ✓ |
| `harvestDate` | 날짜 | |
| `kilograms` | 소수점 (kg) | |
| `qcGrade` | 문자열 | |

### 품질 검사

| 재산 | 유형 | 식별자? |
|---|---|---|
| `checkId` | 문자열 | ✓ |
| `stage` | 정수 (1–4) | |
| `passed` | 논리형 | |
| `defectRate` | 소수점 (%) | |
| `checkedAt` | datetime | |

`stage` 필드는 의미 층에서 네 단계 체제를 명확하게 만드는 요소입니다: *"어떤 재배자들이 일관되게 단계 3 검사를 실패합니까?"*와 같은 단일 비즈니스 질문은 이제 직접적인 속성 필터가 되었습니다.

## 새로운 관계들

|에서 | 동사 |까지 | 개수 |
|---|---|---|---|
| 수확장 | fromPlot | 플롯 | 다중-일대 |
| 수확장 | 다양성 | 과일 다양성 | 다수-일대 |
| 품질검증 | 검사 | 수확량 | 일대다 |

`fromPlot → grows → FruitVariety`를 감안할 때 `ofVariety`는 중복된 것처럼 보일 수 있지만, 그것은 배송에 대한 품종 혼합에 대한 쿼리를 건너뛰게 하고, 무엇보다도 그것은 재배 주기 후 묘지의 명목상 품종과 다를 수 있는 *수확 후*의 품종을 포착합니다.

## 지금까지 그래프

<ontology-embed id="official/zava-grove-to-shelf-step-2" diff="official/zava-grove-to-shelf-step-1" height="420px"></ontology-embed>

*6개의 엔터티. 두 개의 새로운 허브를 주목하세요: HarvestLot은 계통 안착점이며 QualityCheck는 그 옆으로 부착됩니다.*

## 이 기능을 잠금 해제하는 비즈니스 질문

- *"지난 30일 동안 블루베리에 대한 품질 검사 실패가 있었던 재배자는 누구입니까?"* → `QualityCheck[passed=false] → HarvestLot → Plot → Farm → Grower` `ofVariety.category = "berry"`에서 필터링됩니다.
- *"각 단계와 원산지 국가별로 QC 통과율은 얼마입니까?"* → `QualityCheck.stage` 및 `HarvestLot → Plot → Farm.country`로 그룹화합니다.

```quiz
Q: Zava는 왜 `HarvestLot`에 있는 네 개의 논리식 열(예: `qc1Passed`, `qc2Passed`, ...) 대신 `QualityCheck`를 별도의 엔터티로 모델링합니까?
- RDF 논리 값을 지원하지 않습니다.
- 이를 엔터티로 모델링하면 각 체크가 자체의 `inspector`, `defectRate`, `checkedAt`, 가지고 있으며, 우리는 `stage`에 따라 체크를 세거나 필터링할 수 있습니다 [correct]
- 그래프 렌더링 성능을 향상시킨다
- 보olean 열은 Fabric IQ 지원되지 않습니다.
> 논리 값은 검사자, 타임스탬프 및 결함률을 플랫하게 만듭니다. 엔터티로서 QualityCheck는 우리가 집계, 필터링 및 결합할 수 있는 일류 이벤트가 됩니다. 이는 정확히 "어떤 재배자가 3단계에서 가장 자주 실패하는지"를 답하기 위해 필요한 것입니다.
```

다음으로 우리는 수확량을 사업의 냉체인 측에 연결할 것입니다.
