---
title: 핵심 대출 트라이어드
slug: core-loan-triad
description: 속성과 관계를 사용하여 기본 FIBO 대출 삼각형(대출, 차용자, 대출 기관)을 모델링합니다.
order: 2
embed: official/fibo-loans-step-1
reviewStatus: under-human-review
---

## 계약의 핵심

모든 대출 시스템은 FIBO 대출 및 부채 모듈의 세 가지 핵심 개념으로 시작됩니다.

- **대출** — 채무 증서 및 계약 봉투(`LOAN/LoansGeneral/Loans`)
- **차용자** — 의무 상환 당사자 역할(`FBC/DebtAndEquities/Debt`)
- **대출 기관** — 원래 자금 조달 당사자 역할(`FBC/DebtAndEquities/Debt`)

FIBO의 `fibo-loan-ln-ln:Loan` 온톨로지에서는 `fibo-fbc-dae-dbt:Borrower`, `fibo-fbc-dae-dbt:Lender` 및 OWL로 모델링됩니다. LOAN 모듈은 대출 관련 사용을 위해 이러한 당사자 역할 개념을 가져오고 제한합니다. 클래스 계층 구조를 단순화하지만 핵심 의미는 유지합니다.

## 주요 속성

### 대출

| 부동산 | 유형 | 메모 |
|---|---|---|
| `loanId` | 문자열 | 식별자 |
| `principalAmount` | 십진수(USD) | 원래 계약된 금액 |
| `isInterestOnly` | 부울 | 차입자가 최초기간 동안 이자만 지급하는지 여부 |

### 차용자

| 부동산 | 유형 | 메모 |
|---|---|---|
| `borrowerId` | 문자열 | 식별자 |
| `name` | 문자열 | 정당명 |
| `creditScore` | 정수 | Underwriting 지표(예: FICO 점수) |

### 대출 기관

| 부동산 | 유형 | 메모 |
|---|---|---|
| `lenderId` | 문자열 | 식별자 |
| `name` | 문자열 | 조직명 |
| `lenderType` | 문자열 | 분류(예: "은행", "신용협동조합", "모기지 회사") |

## 관계

FIBO는 대출 당사자 역할을 계약 대상에서 당사자까지의 관계로 모델링합니다.

- **owedBy**: `Loan` → `Borrower` (`many-to-one`) — 대출금은 정확히 한 명의 차용인이 빚지고 있지만 차용인은 여러 대출을 보유할 수 있습니다.
- **originatedBy**: `Loan` → `Lender` (`many-to-one`) — 대출은 한 명의 대출 기관에서 시작되지만 대출 기관은 여러 대출을 시작할 수 있습니다.

> **FIBO 참조**: 전체 FIBO 모델에서 차용자와 대출자는 부채 및 대출 온톨로지를 통해 사용되는 계약 당사자 역할 개념이며, 당사자 및 계약 패턴에 기반한 역할 의미를 갖습니다. 명확성을 위해 단순화된 직접 엔터티 모델을 사용합니다. [FBC 부채](https://github.com/edmcouncil/fibo/tree/master/FBC/DebtAndEquities/Debt), [대출 일반](https://github.com/edmcouncil/fibo/tree/master/LOAN/LoansGeneral/Loans) 및 [FND 당사자](https://github.com/edmcouncil/fibo/tree/master/FND/Parties)를 참조하세요.

## 1단계 그래프

<ontology-embed id="official/fibo-loans-step-1" height="340px"></ontology-embed>

*두 가지 관계를 가진 세 개의 엔터티가 모든 FIBO 대출 모델의 기초인 핵심 대출 삼각형을 형성합니다.*

```quiz
Q: 대출 상환 책임을 가장 잘 나타내는 관계는 무엇입니까?
- 차용자 → 대출(originatedBy)
- 대출 → 차용자(owedBy) `owedBy` [correct]
- 대출기관 → 대출(owedBy)
- 대출 → 대출기관(담보 있음)
> 이 모델에서 대출은 `owedBy`를 통해 차용자를 가리키며 계약 개체에서 상환 의무를 명시적으로 지정합니다. 이는 증권에서 당사자까지 방향에 따라 의무를 모델링하는 FIBO의 패턴을 따릅니다.
```
