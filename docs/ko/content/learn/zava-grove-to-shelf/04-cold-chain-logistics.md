---
title: 냉장체인 물류
slug: cold-chain-logistics
description: 유통기한이 짧은 물류 계층을 모델링하고 Zava의 가장 중요한 경보 규칙을 주도하는 실시간 온도 텔레메트리 센서를 추가하세요.
order: 4
embed: official/zava-grove-to-shelf-step-3
---

## Zava의 하루 중 가장 비싼 분량

HarvestLot이 포장 창고에서 떠날 때마다 시계가 시작됩니다. 과일은 유통기한이 짧습니다. 특정 품종의 안전 온도를 15분 이상 초과하면 냉동 컨테이너 전체를 폐기할 수 있으며, 이는 쉽게 수만 달러의 수익을 의미합니다. 냉동체인 레이어는 Zava가 의미론에 투자한 것이 가장 큰 성과를 거둔 부분입니다.

두 개의 새로운 엔터티가 이 도메인을 표현합니다:

- **배송** - 한 개 이상의 HarvestLots를 소매 DC로 이동하는 냉동 컨테이너 또는 트럭입니다.
- **ColdChainSensor** - 배송물에 부착된 센서로서 온도 및 습도 텔레메트리 스트리밍을 전송합니다.

## 엔터티들

### 배송

| 재산 | 유형 | 식별자? |
|---|---|---|
| `shipmentId` | 문자열 | ✓ |
| `departureDate` | datetime | |
| `etaDate` | datetime | |
| `modality` | 문자열 | |
| `containerId` | 문자열 | |

### 콜드체인 센서

| 재산 | 유형 | 식별자? |
|---|---|---|
| `sensorId` | 문자열 | ✓ |
| `sensorModel` | 문자열 | |
| `temperatureC` | 소수점(°C) | |
| `humidityPct` | 소수점 (%) | |

Microsoft Fabric IQ, `ColdChainSensor`은 **타임시리즈 엔터티**의 표준 예입니다. 그 읽기는 Lakehouse 테이블이 아니라 Eventhouse에 연결됩니다. 이 논리 체계는 그 분리를 숨깁니다. 쿼리는 기본 엔진을 알지 않고 `Sensor → Shipment`을 순회합니다.

## 새로운 관계들

|에서 | 동사 |까지 | 개수 |
|---|---|---|---|
| 배송 | 운반 | HarvestLot | 일대다 |
| 배송 | 모니터링됨 | ColdChainSensor | 일대다 |

`Shipment`이 **허브**로서 어떻게 작용하는지 주목하세요. 그것은 정적 호수 하우스 세계(HarvestLot 계통)를 스트리밍 이벤트 하우스 세계(센서 텔레메트리)로 연결합니다.

## 냉장체인 침해 조회

플래그십 Zava 데모 질문:

> *"발송물 SH-2026-04812이 방금 9°C를 넘겼습니다. 어떤 소매업체의 주문이 노출되었습니까?"*

오늘은 이 것은 5개 시스템 매뉴얼 추적이야. 온톨로지으로 말하자면, 그것은 단일 탐색이야:

```
ColdChainSensor[temperatureC > FruitVariety.maxStorageTempC + 2]
   → Shipment
   → HarvestLot
   → (later) Order → Store → Retailer
```

다음 단계에서 소매 측을 연결하겠습니다.

## 지금까지 그래프

<ontology-embed id="official/zava-grove-to-shelf-step-3" diff="official/zava-grove-to-shelf-step-2" height="450px"></ontology-embed>

*8개의 엔터티. 오른쪽 분기(센서 → 배송)는 실시간 텔레메트리 측면이며, 왼쪽 분기(HarvestLot → Plot → Farm → Grower)는 계통 측면입니다. 오노토미는 이를 통합합니다.*

```quiz
Q: `Shipment`이 "허브" 엔터티로 설명된다는 것은 무엇을 의미합니까?
- 그것은 그래프의 가장 큰 엔터티입니다.
- 그것은 다른 두 개의 별도의 도메인인 혈통(수확 배열)과 텔레메트리(센서)를 단일 공유 개념을 통해 연결합니다 [correct]
- 모든 다른 엔터티는 이를 통해 연결해야 합니다.
- RDF 준수에는 허브가 필요합니다.
> 허브 엔터티는 그렇지 않으면 다른 시스템에 존재할 도메인을 연결합니다. 배송은 HarvestLot(Lakehouse 계통)과 ColdChainSensor(Eventhouse 텔레메트리)를 연결하므로 단일 그래프 탐색은 둘 다를 포괄합니다.
```

다음으로 우리는 소매업에 대한 루프를 닫을 것입니다 - DC, 매장 및 위험에 처한 주문들.
