---
title: 시나리오 개요
slug: scenario-overview
description: FIBO는 무엇이고, 어디에서 왔으며, 이 실습에서 무엇을 구축할 것입니까?
order: 1
reviewStatus: under-human-review
---

## FIBO란 무엇인가요?

**금융 산업 비즈니스 온톨로지**(FIBO)는 [EDM Council](https://edmcouncil.org/) 및 [Object Management Group](https://www.omg.org/)(OMG)에서 개발한 업계 표준 온톨로지 제품군입니다. 이는 금융 상품, 당사자, 계약 및 규제 개념에 대한 공식적이고 기계가 읽을 수 있는 어휘를 제공합니다.

FIBO는 다음과 같습니다.

- [MIT 라이선스](https://opensource.org/licenses/MIT)에 따른 **오픈 소스**
- **GitHub에서 호스팅**: [edmcouncil/fibo](https://github.com/edmcouncil/fibo)
- **OWL 온톨로지로 게시됨**: [spec.edmcouncil.org/fibo](https://spec.edmcouncil.org/fibo/)
- **2012년 이후** 주요 금융 기관, 규제 기관, 표준 기관의 기여로 개발됨

> **출처**: 이 실습의 개념은 주로 `LOAN/LoansGeneral/Loans`에서 채택되었으며 `FBC/DebtAndEquities/Debt`, `FBC/ProductsAndServices/ClientsAndAccounts` 및 `FND/OwnershipAndControl/Ownership`의 지원 개념이 포함되어 있습니다. 전체 소스 모듈은 [FIBO GitHub 저장소](https://github.com/edmcouncil/fibo)를 참조하세요.

## 이 실습이 필요한 이유

FIBO는 규모가 큽니다. 증권, 파생상품, 기업 활동, 지수 등을 다루는 수백 개의 온톨로지 모듈입니다. `LOAN` 도메인만으로도 여러 하위 모듈에 걸쳐 있습니다.

| FIBO 모듈 | 다루는 내용 |
|---|---|
| `LOAN/LoansGeneral/Loans` | 대출 수명주기 개념(대출, 서비스, 지불 내역, 유치권 및 소유권 분류 기준) |
| `FBC/DebtAndEquities/Debt` | 차용자/대출자 역할, 담보, 담보 계약, 부채 조건 |
| `FBC/ProductsAndServices/ClientsAndAccounts` | 결제내역에 활용되는 거래기록 및 개별거래 |
| `LOAN/RealEstateLoans/Mortgages` | 부동산 관련 제약(부동산 담보 및 모기지 구성) |
| `FND/OwnershipAndControl/Ownership` | 대출 소유권 분류자가 재사용하는 소유권 의미 |

*(출처: [FIBO 온톨로지 구조](https://github.com/edmcouncil/fibo/tree/master/LOAN))*

이 랩에서는 전체 모듈 계층 구조를 탐색하지 않고도 FIBO 모델링 패턴을 배울 수 있도록 대출 계약 및 지불 흐름에 초점을 맞춘 교육 가능한 하위 집합을 추출합니다.

## 우리가 만들 것

4가지 점진적인 단계를 통해 우리는 10가지 엔터티 유형과 10가지 관계로 **대출 온톨로지**를 모델링합니다.

1. **핵심 대출 트라이어드** — `Loan`, `Borrower`, `Lender`
2. **담보 및 일정** — `Collateral`, `LoanPaymentSchedule`
3. **서비스 및 결제 내역** — `Servicer`, `PaymentHistory`, `PaymentTransaction`
4. **위험 분류자** — `OwnershipInterest`, `LenderLienPosition`

## 이 모델이 지원하는 실제 질문

- 어떤 담보대출에 후순위 유치권이 있나요?
- 원금 한도를 초과하는 이자 전용 대출을 받은 차용인은 누구입니까?
- 서비스 제공자에 따라 결제 거래 패턴이 어떻게 다른가요?
- 어떤 소유권 구조가 상환 문제와 관련이 있습니까?

## 라이선스 및 귀속

이 랩은 EDM Council FIBO 온톨로지를 채택했습니다.

- **저작권**: EDM Council, Inc. 및 Object Management Group, Inc.(정확한 연도 범위는 모듈 헤더 참조)
- **라이센스**: [MIT 라이센스](https://opensource.org/licenses/MIT)
- **소스 저장소**: [github.com/edmcouncil/fibo](https://github.com/edmcouncil/fibo)
- **사양**: [spec.edmcouncil.org/fibo](https://spec.edmcouncil.org/fibo/)

이 랩의 온톨로지 파일은 단순화되고 교실 친화적으로 적용되었습니다. 단계별 지침의 복잡성을 줄이면서 핵심 FIBO 의미를 보존합니다.

```quiz
Q: FIBO를 개발하고 유지하는 조직은 무엇입니까?
- 세계은행
- EDM 위원회 및 객체 관리 그룹(OMG) [correct]
- 유럽중앙은행
- W3C 웹 온톨로지 워킹 그룹
> FIBO는 EDM Council(Enterprise Data Management Council)이 Object Management Group과 협력하여 개발했습니다. MIT 라이센스에 따른 오픈 소스이며 edmcouncil/fibo의 GitHub에서 호스팅됩니다.
```
