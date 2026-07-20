---
title: 보증금 및 일정표
slug: collateral-and-schedules
description: FIBO의 담보 및 지불 일정 개념을 사용하여 보안 계약 및 상환 빈도를 추가합니다.
order: 3
embed: official/fibo-loans-step-2
reviewStatus: under-human-review
---

## 계약에서 구조로

당신이 FIBO에서 두 가지 개념을 추가하면 대출은 운영적으로 의미 있게 됩니다:

- **보증** - 상환을 보장하는 것([FBC/DebtAndEquities/Debt](https://github.com/edmcouncil/fibo/tree/master/FBC/DebtAndEquities/Debt)의 `fibo-fbc-dae-dbt:Collateral`에서 발췌)
- **대출상환일정** - 시간이 지남에 따라 상환이 어떻게 예상되는지([LOAN/LoansGeneral/Loans](https://github.com/edmcouncil/fibo/tree/master/LOAN/LoansGeneral/Loans)의 `fibo-loan-ln-ln:LoanPaymentSchedule`에서 수정됨)

이러한 추가 사항은 **보안 계약**과 **시간적 의무**라는 두 가지 핵심 FIBO 우려 사항을 포착합니다.

## 새로운 속성들

### 담보

| 재산 | 유형 | 메모 |
|---|---|---|
| `assetType` | 문자열 | 식별자 - 속성 유형(예: "재산", "차량", "증권") |
| `appraisedValue` | 소수점(USD) | 평가 시 시장 가치 |

> **FIBO 참조**: 전체 온톨로지에서 부채 담보물은 물리적 및 비물리적 담보 자산을 나타낼 수 있는 `fibo-fbc-dae-dbt:Collateral`로 모델링됩니다. FIBO 모기지 모듈([LOAN/RealEstateLoans/Mortgages](https://github.com/edmcouncil/fibo/tree/master/LOAN/RealEstateLoans/Mortgages))에서 `LoanSecuredByRealEstate`는 담보를 `fibo-fnd-plc-rp:RealProperty`로 제한하고 `owl:Restriction` 블록을 통해 `SecurityAgreement`에 연결합니다.

### 대출상환일정

| 재산 | 유형 | 메모 |
|---|---|---|
| `scheduleId` | 문자열 | 식별자 |
| `expectedPayments` | 정수 | 예상되는 지불 기간 수 |

## 새로운 관계들

- **securedBy**: `Loan` → `Collateral` (`one-to-many`) - 대출은 여러 자산으로 담보할 수 있다.
- **repaidBySchedule**: `Loan` → `LoanPaymentSchedule` (`one-to-one`) — 각 대출에는 하나의 주요 상환 일정표가 있습니다.

## 단계 2 그래프 (단계 1과 차이점)

<ontology-embed id="official/fibo-loans-step-2" diff="official/fibo-loans-step-1" height="380px"></ontology-embed>

*새로 강조 표시된 엔터티: 담보 및 대출 지불 일정표는 담보와 시간적 구조를 통해 대출 모델을 확장합니다.*

```quiz
Q: FIBO에서 담보 개념은 어디에서 유래되었나요?
- 대출/대출 일반/대출
- FBC/채무 및 주식/채무 [correct]
- FND/계약/계약서
- FND/장소/부동산
> 담보물은 FIBO의 FBC(Financial Business and Commerce) 도메인에서 DebtAndEquities/Debt 아래에 정의되어 있습니다. 이는 상환 의무에 대한 보증을 위해 담보로 제공되는 자산을 나타냅니다. 이는 모기지뿐만 아니라 모든 담보 대출 유형에서 공유되는 개념입니다.
```
