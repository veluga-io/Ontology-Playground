---
title: 소매 배송
slug: retail-fulfillment
description: RetailDC, Store 및 Order를 추가하여 Zava의 공급망을 소매 파트너와 수익에 연결합니다.
order: 5
embed: official/zava-grove-to-shelf-step-4
---

## 공급망이 계산대에 만나는 곳

이전 단계는 운송 중 배송으로 끝났습니다. 이 단계는 수취자에게 얼굴을 보여줍니다. 어떤 소매 체인, 어떤 DC, 어떤 매장, 어떤 주문입니까.

세 개의 새로운 엔터티가 Zava의 상업적 측면을 완성합니다:

- **RetailDC** - Zava 배송물을 받는 소매업체의 유통 센터입니다.
- **스토어** - 소매업체의 매장, 한 DC에서 공급합니다.
- **주문** - 특정 과일 품종에 대해 매장에서 발급한 구매 주문입니다.

## 엔터티들

### 리테일DC

| 재산 | 유형 | 식별자? |
|---|---|---|
| `dcId` | 문자열 | ✓ |
| `name` | 문자열 | |
| `country` | 문자열 | |
| `city` | 문자열 | |
| `retailerCode` | 문자열 | |

### 매장

| 재산 | 유형 | 식별자? |
|---|---|---|
| `storeId` | 문자열 | ✓ |
| `name` | 문자열 | |
| `retailerName` | 문자열 | |
| `country` | 문자열 | |
| `city` | 문자열 | |

### 주문

| 재산 | 유형 | 식별자? |
|---|---|---|
| `orderId` | 문자열 | ✓ |
| `kilograms` | 소수점 (kg) | |
| `orderDate` | 날짜 | |
| `deliveryDate` | 날짜 | |
| `status` | 문자열 | |
| `unitPriceEur` | 소수점(유로) | |

## 새로운 관계들

|에서 | 동사 |까지 | 개수 |
|---|---|---|---|
| 배송 | 전달된 곳 | RetailDC | 다수-일대 |
| RetailDC | 공급품 | 매장 | 일대다 |
| 매장 | 장소 | 주문 | 일대다 |
| 주문 | 다양성용 | 과일다양성 | 일대다 |

## 이제 냉체인 침해 쿼리가 루프를 닫습니다.

3단계에서 언급한 침해 질문을 상기하십시오. 소매가 구축되면 전체 탐색은 다음과 같습니다.

```
ColdChainSensor[breach]
   → Shipment
   → HarvestLot ─ ofVariety → FruitVariety
   → Shipment
   → RetailDC
   → Store
   → Order[forVariety = same variety, status = open]
```

Fabric IQ 데이터 에이전트는 이제 비즈니스 영어로 고객에게 미치는 영향에 대한 질문에 답변할 수 있습니다.

> *"배송 SH-2026-04812에 대한 냉장체인 위반에 대해, 어떤 소매업체가 주문이 위험하고 수익 노출은 얼마입니까(kg × unitPriceEur)?"*

## 지금까지 그래프

<ontology-embed id="official/zava-grove-to-shelf-step-4" diff="official/zava-grove-to-shelf-step-3" height="480px"></ontology-embed>

*열여섯 개의 엔터티. 소매 지점(RetailDC → Store → Order)은 `Order forVariety FruitVariety`, 통해 FruitVariety 허브에 직접 연결되어, 과일밭에서 선반까지의 경로를 닫습니다.*

```quiz
Q: 위반 조회에서, 왜 우리는 `Order forVariety FruitVariety` *와* `Shipment carries HarvestLot ofVariety FruitVariety`를 추가로 필요로 합니까?
- 복제는 Fabric IQ 요구됩니다.
- 주문은 특정 lô에 대해 아니라 품종에 대해 이루어지기 때문에, 위험 요소 lô를 *동일한 품종의 오픈 주문*과 일치시킬 수 있게 해줍니다 [correct]
- 그것은 단지 시각화를 위한 것이다.
- 그것 없이는 그래프가 연결되지 않습니다.
> 소매업자들은 lô별로 아니라 종류별로 주문을 합니다. 특정 lô에 대한 위반으로 인해 *어떤 주문이 노출되었는지* 알기 위해서는 그 종류를 `Order.forVariety`와 교차 참조합니다. 그 링크가 없으면 그래프는 배송이 위험하다는 것을 알려줄 수 있지만, 어떤 오픈 주문이 위험하는지 알려주지는 않습니다.
```

마지막으로 추가해야 할 엔터티는 Zava의 CSR 스토리에서 모델을 노래하게 만드는 프로그램입니다.
