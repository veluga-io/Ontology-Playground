---
title: 위험과 분류기
slug: risk-and-classifiers
description: underwriting 및 담보 위험 분석을 지원하기 위해 FIBO 소유권 및 채권추심 분류기를 추가합니다.
order: 5
embed: official/fibo-loans-step-4
reviewStatus: under-human-review
---

## 분류 레이어

FIBO는 주된 역할이 다른 엔터티를 분류하는 것이기 때문에 명시적인 분류기에 크게 의존합니다. 이 마지막 단계에서, 우리는 모기지 및 담보 대출 위험 분석에 중요한 두 가지 개념을 추가합니다.

- **소유권이익** - 담보의 법적 소유권 유형을 분류합니다([LOAN/LoansGeneral/Loans](https://github.com/edmcouncil/fibo/tree/master/LOAN/LoansGeneral/Loans)의 `fibo-loan-ln-ln:OwnershipInterest`에서 가져온 것으로, `fibo-fnd-oac-own:Ownership`에 기반합니다)
- **LenderLienPosition** - 담보 자산에 대한 대출 기관 청구 우선순위를 분류합니다([LOAN/LoansGeneral/Loans](https://github.com/edmcouncil/fibo/tree/master/LOAN/LoansGeneral/Loans)의 `fibo-loan-ln-ln:LenderLienPosition`에서 수정됨)

## 분류기가 중요한 이유

FIBO 모기지 모듈([LOAN/RealEstateLoans/Mortgages](https://github.com/edmcouncil/fibo/tree/master/LOAN/RealEstateLoans/Mortgages))에서 담보권 위치는 압류 시 회복 우선순위를 결정합니다. 우선 담보권 모기지에는 하위 담보권보다 더 강력한 회복 기대치가 있으며, 이는 다음과 같이 직접적으로 영향을 미칩니다.

- 신용 위험 모델링
- 손실-기존-예약 추정
- 포트폴리오 위험 집계
- 규제 자본 계산

> **FIBO 참조**: FIBO 모기지 오노토미는 `owl:Restriction` 블록을 사용하여 부동산 담보와 계약 의미론을 제한합니다. LOAN 오노토미에서 `SecurityAgreement`과 `Loan`은 `LenderLienPosition` 및 `OwnershipInterest`과 같은 분류기 사용으로 인해 더욱 제한됩니다. [LOAN/RealEstateLoans/Mortgages.rdf](https://github.com/edmcouncil/fibo/blob/master/LOAN/RealEstateLoans/Mortgages.rdf) 및 [LOAN/LoansGeneral/Loans.rdf](https://github.com/edmcouncil/fibo/blob/master/LOAN/LoansGeneral/Loans.rdf)을 참조하십시오.

## 새로운 관계들

- **collateralOwnership 분류**: `OwnershipInterest` → `Collateral` (`one-to-many`)
- **hasLienPosition**: `Collateral` → `LenderLienPosition` (`many-to-one`)

## 단계 4 그래프 (단계 3과 차이점)

<ontology-embed id="official/fibo-loans-step-4" diff="official/fibo-loans-step-3" height="460px"></ontology-embed>

*두 개의 분류기 엔터티(OwnershipInterest 및 LenderLienPosition)는 위험과 인수 보증 의미론으로 모델을 완성합니다.*

## 완성된 적응형 모델

당신은 또한 동일한 FIBO 소스 개념에서 구축된 전체 외부 하위 집합을 검사할 수 있습니다:

<ontology-embed id="external/fibo/loans-general" height="420px"></ontology-embed>

## 당신이 만든 것

이제 다음과 같은 내용을 다루는 진보적이고 FIBO에서 영감을 받은 대출 논리가 있습니다.

| 레이어 | 엔터티 | FIBO 소스 모듈 |
|---|---|---|
| 계약 배우 | 대출, 대출자, 대출 기관 | [대출/대출일반/대출](https://github.com/edmcouncil/fibo/tree/master/LOAN/LoansGeneral/Loans) |
| 보안 및 일정 | 담보, 대출 지불 일정 | [FBC/부채 및 주식/부채](https://github.com/edmcouncil/fibo/tree/master/FBC/DebtAndEquities/Debt) |
| 서비스 운영 | 서비스 제공자, 결제 기록, 결제 거래 | [대출/대출 일반/대출](https://github.com/edmcouncil/fibo/tree/master/LOAN/LoansGeneral/Loans) + [FBC/제품 및 서비스/고객 및 계정](https://github.com/edmcouncil/fibo/tree/master/FBC/ProductsAndServices/ClientsAndAccounts) |
| 위험 분류기 | 소유권 이익, 대출 기관 담보 위치 | [대출/대출 일반/대출](https://github.com/edmcouncil/fibo/tree/master/LOAN/LoansGeneral/Loans) + [FND/소유권 및 통제/소유권](https://github.com/edmcouncil/fibo/tree/master/FND/OwnershipAndControl) |

이것은 도메인별 모듈로 확장하는 데 대한 강력한 기반입니다 - 모기지 유형, HELOC 제품, 자동차 대출 또는 중소기업 대출.

## 추가 읽기

- **FIBO GitHub**: [github.com/edmcouncil/fibo](https://github.com/edmcouncil/fibo)
- **FIBO 사양**: [spec.edmcouncil.org/fibo](https://spec.edmcouncil.org/fibo/)
- **EDM 위원회**: [edmcouncil.org](https://edmcouncil.org/)
- **FIBO 대출 모듈**: [대출/대출일반/대출 소스](https://github.com/edmcouncil/fibo/tree/master/LOAN/LoansGeneral/Loans)
- **FIBO 모기지 모듈**: [대출/부동산대출/모기지 소스](https://github.com/edmcouncil/fibo/tree/master/LOAN/RealEstateLoans/Mortgages)
- **FIBO 부채 모듈**: [FBC/DebtAndEquities/Debt source](https://github.com/edmcouncil/fibo/tree/master/FBC/DebtAndEquities/Debt)
- **FIBO 클라이언트와 계정 모듈**: [FBC/ProductsAndServices/ClientsAndAccounts 소스](https://github.com/edmcouncil/fibo/tree/master/FBC/ProductsAndServices/ClientsAndAccounts)

## 라이센싱

이 실험실에서 참조되는 모든 FIBO 온톨로지 내용은 다음과 같습니다:

- **저작권** EDM Council, Inc. 및 Object Management Group, Inc. (정확한 연도 범위는 모듈 머리글 참조)
- [MIT 라이센스](https://opensource.org/licenses/MIT)에 따라 **면허가 부여됨**

MIT 라이센스는 저작권 공지를 보존하는 한 상업적 목적도 포함하되, 오노토미 파일의 사용, 수정 및 재분배가 허용됩니다. 이 실험실의 오노토미 파일은 교육적 목적으로 만들어진 변형된 하위 집합입니다.

```quiz
Q: 담보 모델에 LenderLienPosition을 추가하는 주요 가치는 무엇입니까?
- 그것은 대출 신청자의 정보 필요성을 대체합니다.
- 그것은 대출 기관의 청구서의 경력을 포착하는데, 이는 신용 위험과 손실 모델링에 있어 핵심적인 요소입니다 [correct]
- 결제 시간대를 저장합니다.
- 그것은 대출 금리를 자동으로 결정합니다.
> 채권추심 위치는 청구 우선순위를 포착합니다(예: 우선채권 대 하위채권), 이는 압류 시 회복 기대에 직접적인 영향을 미칩니다. 이는 인수평가, 포트폴리오 위험 모델 및 규제 자본 계산에 중요합니다. 이는 FIBO의 채무 및 주식 모듈의 핵심 개념입니다.
```
