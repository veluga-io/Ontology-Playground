---
title: 서비스 및 결제 내역
slug: servicing-and-payment-history
description: FIBO 서비스 조직과 감사 가능한 결제 이벤트를 통해 모델을 확장합니다.
order: 4
embed: official/fibo-loans-step-3
reviewStatus: under-human-review
---

## 운영 수명주기

발생 후 대출은 서비스 운영에 들어갑니다. FIBO는 이 전환을 두 모듈로 모델링합니다.

- **서비스 제공자** - 결제를 수집하고 처리하는 조직([LOAN/LoansGeneral/Loans](https://github.com/edmcouncil/fibo/tree/master/LOAN/LoansGeneral/Loans)의 `fibo-loan-ln-ln:Servicer`에서 수정됨)
- **지불기록** - [LOAN/LoansGeneral/Loans](https://github.com/edmcouncil/fibo/tree/master/LOAN/LoansGeneral/Loans)의 `fibo-loan-ln-ln:PaymentHistory`에서 가져온 총 결제 기록으로, [FBC/ProductsAndServices/ClientsAndAccounts](https://github.com/edmcouncil/fibo/tree/master/FBC/ProductsAndServices/ClientsAndAccounts)의 거래 기록 패턴을 확장한 것입니다.
- **결제거래** - 원자급 결제 이벤트(`fibo-loan-ln-ln:IndividualPaymentTransaction`, 자체적으로 `fibo-fbc-pas-caa:IndividualTransaction`에 기반)에서 변형된 것

이것은 실제 대출 플랫폼이 계약 의도를 실행 로그에서 분리하는 방식을 반영합니다.

## 새로운 속성들

### 서비스 제공자

| 재산 | 유형 | 메모 |
|---|---|---|
| `servicerId` | 문자열 | 식별자 |
| `organizationName` | 문자열 | 서비스 기관 이름 |

### 결제내역

| 재산 | 유형 | 메모 |
|---|---|---|
| `paymentHistoryId` | 문자열 | 식별자 |

### 결제거래

| 재산 | 유형 | 메모 |
|---|---|---|
| `paymentTransactionId` | 문자열 | 식별자 |
| `amount` | 소수점(USD) | 결제 금액 |
| `postedAt` | datetime | 결제가 기록된 시간 |

## 새로운 관계들

- **서비스 제공자**: `Loan` → `Servicer`(`many-to-one`) - 여러 대출은 한 조직에 의해 서비스될 수 있다.
- **hasPaymentHistory**: `LoanPaymentSchedule` → `PaymentHistory` (`one-to-one`) - 예약된 기대치를 실제 기록과 연결합니다.
- **hasIndividualPayment**: `PaymentHistory` → `PaymentTransaction` (`one-to-many`) — 각 기록에는 여러 거래 이벤트가 포함되어 있습니다.

## 감사 기록

이러한 링크를 통해, 당신은 모델을 통해 명확한 경로를 추적할 수 있습니다:

`Loan` → `LoanPaymentSchedule` → `PaymentHistory` → `PaymentTransaction`

이 경로는 감사 쿼리, 미납 분석 및 서비스 품질 지표 지원을 지원합니다. 이는 바로 온톨로지론 기반 데이터 통합을 가치 있게 만드는 그래프 탐색 유형입니다.

> **FIBO 참조**: 프로덕션 FIBO에서 대출 서비스 및 결제 이력 패턴은 대출 및 FBC 모듈을 연결합니다. `Loan`은 대출 전용 계정과 관련이 , 결제 이력은 거래 기록으로 모델링되며, 개별 결제 거래는 이벤트 수준 사실들을 포착합니다. 우리의 단순화된 모델은 이 핵심 패턴을 포착합니다. [LOAN/LoansGeneral/Loans](https://github.com/edmcouncil/fibo/tree/master/LOAN/LoansGeneral/Loans) 및 [FBC/ProductsAndServices/ClientsAndAccounts](https://github.com/edmcouncil/fibo/tree/master/FBC/ProductsAndServices/ClientsAndAccounts)를 참조하세요.

## 단계 3 그래프 (단계 2과 차이점)

<ontology-embed id="official/fibo-loans-step-3" diff="official/fibo-loans-step-2" height="420px"></ontology-embed>

*세 가지 새로운 엔터티(서비스 제공자, 결제 기록, 결제 거래)는 대출 수명주기 이벤트를 추적하기 위한 운영 계층을 생성합니다.*

```quiz
Q: 금액과 postedAt와 같은 원자급 결제 이벤트를 포함해야 하는 엔터티는 무엇입니까?
- 대출
- 서비스 제공자
- 결제 이력
- 결제거래 [correct]
> PaymentHistory는 집계 컨테이너입니다. 원자 이벤트는 결제 트랜잭션에 속하며, 결제 트랜잭션은 조정 및 감사 기록에 사용되는 이벤트 수준 세부 정보를 저장합니다. 이러한 분리 작업은 FIBO의 집계 기록을 개별 거래와 구별하는 모델링 패턴을 따릅니다.
```
