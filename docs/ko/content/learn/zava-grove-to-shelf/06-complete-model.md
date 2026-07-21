---
title: 완성 모델
slug: complete-model
description: SustainabilityProgram을 추가하여 숲에서 장으로의 모델을 닫습니다. 12개의 엔터티, 13개의 관계, 데모를 위한 준비가 완료되었습니다.
order: 6
embed: official/zava-grove-to-shelf-step-5
---

## 마지막 엔터티: 지속 가능성

Zava는 협력 농장이 참여할 수 있는 **Dreams**라는 내부 코드명으로 불리는 재배자 개발 프로그램을 운영하고 있습니다. 이 프로그램은 물 효율성, 공정 임금 및 생물 다양성 이니셔티브를 지원합니다. 오늘날 이 데이터는 공급망과 연결되지 않은 마케팅 시스템에 저장되어 있습니다.

한 엔터티와 한 관계로 그것을 모델에 끌어들입니다.

### 지속가능성 프로그램

| 재산 | 유형 | 식별자? |
|---|---|---|
| `programId` | 문자열 | ✓ |
| `name` | 문자열 | |
| `focusArea` | 문자열 | |
| `startYear` | 정수 | |

### 새로운 관계

|에서 | 동사 |까지 | 개수 |
|---|---|---|---|
| 농장 | 참여 | 지속가능성 프로그램 | 다중-다중 |

하나의 농장은 여러 프로그램(예: *Dreams Water* 및 *Dreams Biodiversity*)에 속할 수 있고, 하나의 프로그램은 많은 농장을 등록할 수 있기 때문에 다중-다중입니다.

## 전체 그래프

<ontology-embed id="official/zava-grove-to-shelf-step-5" diff="official/zava-grove-to-shelf-step-4" height="520px"></ontology-embed>

*12개의 엔터티, 13개의 관계. Zava가 신경 쓰는 모든 비즈니스 도메인은 이제 명명된 에지를 통해 연결된 일류 개념이 되었습니다.*

## 이 모델이 무대에서 무엇을 잠금 해제합니까?

이전에는 각각 다중 시스템, 다중 일정으로 진행되었던 다섯 가지 질문은 이제 하나의 오노토미에서 모두 답변할 수 있습니다.

| 질문 | 경로 |
|---|---|
| *"매장 체인과 원산지별로 분류된 지난 분기의 감귤류 매출을 보여줘."* | `Order forVariety FruitVariety[category=citrus]`, `Store.retailerName` 및 `HarvestLot → Plot → Farm.country`로 그룹화 |
| *"지난 30일 동안 블루베리에 대한 품질 검사 실패가 있었던 재배자는 누구입니까?"* | `QualityCheck[passed=false] → HarvestLot[ofVariety.category=berry] → Plot → Farm ← owns ← Grower` |
| *"운송 중인 어떤 화물이 그 품종의 안전 임계값보다 높은 온도를 가지고 있습니까?"* | `Shipment monitoredBy ColdChainSensor[temperatureC > carries.harvestLot.ofVariety.maxStorageTempC]` |
| *"배송 SH-2026-04812의 콜드체인 위반으로 어떤 소매업체 주문이 위험하며 수익 노출액은 얼마입니까?"* | `Shipment[id=SH-2026-04812] → RetailDC supplies Store places Order[forVariety = breached variety, status=open]`을 추적한 다음 `kilograms × unitPriceEur` 합계를 계산합니다. |
| *"이번 시즌 우리 베리 양 중Dreams-프로그램 농장에서 생산한 양은 몇 퍼센트입니까?"* | `HarvestLot[ofVariety.category=berry, harvestDate∈season]`, `fromPlot → Farm participatesIn SustainabilityProgram[name~"Dreams"]` 따라 그룹화 |

## 우리가 만든 것

| 단계 | 추가된 엔터티 | 누적 | 핵심 개념 |
|---|---|---|---|
| 1 | 재배자, 농장, 묘지, 과일 품종 | 4 | 다원적 원산지 조달, 추적 가능성 앵커 |
| 2 | HarvestLot, 품질 검사 | 6 | 계통 이벤트, 4단계 품질 검사 체제 |
| 3 | 배송, ColdChainSensor | 8 | 허브 엔터티, 시간 시리즈 결합 |
| 4 | RetailDC, 매장, 주문 | 11 | 수익을 위한 루프를 닫다 |
| 5 | 지속가능성 프로그램 | 12 | 다중-다중 CSR 오버레이 |

## 주요 내용 요약

1. **한 어휘는 5개의 시스템에 걸쳐 있습니다.** 농업 경영 시스템 ERP, 포장소 품질 관리 앱, IoT 이벤트 하우스, 소매 EDI 피드 및 CSR 기록은 모두 동일한 12개 엔터티 모델에 대한 바인딩이 됩니다.
2. **허브 엔터티가 중요합니다.** `HarvestLot`은 계통 허브입니다. `Shipment`은 레이크하우스↔이벤트하우스 허브입니다. `FruitVariety`는 공급↔수요 허브입니다.
3. **시간 시리즈 텔레메트리 는 최고급입니다.** `ColdChainSensor`은 오노토미에서 다른 어떤 엔터티와도 똑같이 보입니다. 즉, 기본 저장소 선택(Eventhouse)은 질문자에게 보이지 않습니다.
4. **지속 가능성은 보조 스프레드시트가 아닙니다.** `SustainabilityProgram`을 추가하면 CSR 질문이 수익 질문과 동일한 그래프에 따라 움직일 수 있습니다.
5. **온톨로지은 계약이 됩니다.** GQL 쿼리, Fabric 데이터 에이전트 프롬프트, 그리고 액티베이터 규칙은 모두 동일한 엔터티 및 관계 이름을 참조합니다.

```quiz
Q: Zava의 완전한 모델에서, 질문 *"이번 시즌 우리 베리 볼륨의 몇 퍼센트가 Dreams 프로그램 농장에서 나왔습니까?"*는 어떤 경로를 요구합니까?
- 주문 → 매장 → RetailDC → 농장
- 수확장 → 토지 → 농장 → 지속가능성 프로그램 [correct]
- ColdChainSensor → 배송 → 농장 → 지속가능성 프로그램
- 과일 다양성 → 지속 가능성 프로그램
> 양량은 HarvestLot에 기록됩니다. 해당 품목이 Dreams 프로그램 농장에서 온 것인지 확인하려면 HarvestLot → fromPlot → Plot → (contained by) Farm → participatesIn → SustainabilityProgram로 이동한 다음 프로그램 이름으로 필터를 적용합니다.
```

Zava Grove-to-Shelf 실험실을 완료했습니다. 놀이터에서 [단계 5 온톨로지](#/catalogue/official/zava-grove-to-shelf-step-5)을 열고 조회, 확장 또는 내보낼 수 있습니다.
