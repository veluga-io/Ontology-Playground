---
title: "4단계: 규제 상황"
slug: regulatory-context
description: 은행 규정, 집중 제한 및 도메인 간 연결을 통해 모델을 완성합니다.
order: 5
embed: official/fibo-risk-step-4
reviewStatus: under-human-review
---

## 루프 닫기

처음 세 단계에서는 산업, 지역, 대출 분류 등 참조 데이터를 구축했습니다. 이 마지막 단계에서는 포트폴리오 집중을 제한하는 규정 및 양적 제한인 **규제 집행 계층**을 추가합니다.

이것이 바로 온톨로지가 운영상 강력해지는 곳입니다. 이제 특정 대출부터 해당 집중 범주, 적용되는 규제 한도까지 추적하고 각 한도를 요구하는 규제가 무엇인지 알 수 있습니다.

## 새로운 항목 유형

### 규제

은행 당국이 발행한 규제 프레임워크입니다.

| 부동산 | 유형 | 메모 |
|---|---|---|
| `regulationCode` | 문자열 | 식별자(예: "OCC_CRE_2006") |
| `name` | 문자열 | 규정명 |
| `issuingAuthority` | 문자열 | 발행자(OCC, FDIC, 바젤 위원회) |
| `effectiveDate` | 날짜 | 발효 시기 |
| `scope` | 문자열 | 다루는 내용 |
| `description` | 문자열 | 전체 설명 |

### 규제 한도

규정의 특정 양적 임계값입니다.

| 부동산 | 유형 | 메모 |
|---|---|---|
| `limitId` | 문자열 | 식별자 |
| `limitName` | 문자열 | 표시 이름 |
| `category` | 문자열 | 어떤 차원을 제한하는가 |
| `thresholdPct` | 소수점(%) | 한계값 |
| `severity` | 문자열 | 위반 결과(예: "경고", "조치 필요", "감독 개입") |
| `description` | 문자열 | 이 한도의 의미 |

주요 예:

| 한도 | 임계값 | 규제 |
|---|---|---|
| CRE 농도 | 자본금 300% | OCC 지침 2006-46 |
| 기후 + 허리케인 | 포트폴리오의 15% | 내부 리스크 정책 |
| 지리적 집중 | 포트폴리오의 20% | OCC 게시판 2011-12 |
| 산업 집중 | 포트폴리오의 25% | FDIC 위험 관리 |

## 새로운 관계

- **mandatedBy**: `RegulatoryLimit` → `Regulation` (`many-to-one`) — 각 제한은 특정 규정에 의해 의무화됩니다.
- **limitAppliesToCategory**: `RegulatoryLimit` → `ConcentrationCategory` (`many-to-one`) — 한계가 제한하는 농도 범주에 연결됩니다.

## 디자인 패턴: 크로스 도메인 브리지

`limitAppliesToCategory`를 사용하면 규제 계층이 ConcentrationCategory를 통해 대출 분류 계층에 연결됩니다. 이렇게 하면 **교차 도메인 쿼리 경로**가 완성됩니다.

```
Jurisdiction (hurricaneZone=true)
  → [geographic dimension]
    → ConcentrationCategory
      → [regulatory dimension]
        → RegulatoryLimit (thresholdPct)
          → Regulation (issuingAuthority)
```

업계 측면에서는 다음과 같습니다.

```
IndustryGroup (climateSensitivity="high")
  → [industry dimension]
    → Subsector → Sector
```

## 완전한 모델

최종 온톨로지는 4개의 도메인과 **10개의 관계**에 걸쳐 **11개의 엔터티 유형**을 갖습니다.

| 도메인 | 엔터티 | 관계 |
|---|---|---|
| 산업 | 부문, 하위 부문, 산업 그룹 | partOfSector, 속하는ToSubsector |
| 지리 | 지역, 국가, 관할권 | inCountry, inRegion |
| 대출분류 | 집중범주, 대출유형, 담보유형 | LoanClassifiedAs, 담보ClassifiedAs, 일반적으로SecuredBy |
| 규제 | 규제, RegulatoryLimit | mandatedBy,limitAppliesToCategory |

## 4단계 그래프(3단계와 다름)

<ontology-embed id="official/fibo-risk-step-4" diff="official/fibo-risk-step-3" height="480px"></ontology-embed>

*두 개의 새로운 엔터티(Regulation 및 RegulatoryLimit)가 모델을 완성합니다. LimitAppliesToCategory 관계는 규제 시행과 대출 분류를 연결합니다.*

## 전체 외부 참조 온톨로지

외부 카탈로그에서 각 도메인을 개별적으로 탐색할 수도 있습니다.

- [FIBO 산업분류](/#/catalogue/external/fibo/industry-classification)
- [FIBO 지리적 계층 구조](/#/catalogue/external/fibo/geographic-hierarchy)
- [FIBO 대출분류](/#/catalogue/external/fibo/loan-classification)
- [FIBO 규제 상황](/#/catalogue/external/fibo/regulatory-context)

## 당신이 만든 것

이제 다음을 가능하게 하는 포괄적인 FIBO 기반 위험 관리 온톨로지를 갖게 되었습니다.

- **산업 집중 분석** — 부문, 하위 부문, 산업 그룹별 노출 롤업
- **지리적 위험 평가** — 재해 지역 플래그로 필터링하고 포트폴리오 데이터와의 상호 참조
- **바젤 III 자본 계산** — 대출 유형에 표준화된 위험 가중치 적용
- **규정 준수 모니터링** — 필수 한도에 대한 포트폴리오 집중도 확인

이 모델은 기존 데이터 웨어하우스에서는 복잡한 다중 테이블 JOIN이 필요하지만 온톨로지 기반 시스템에서는 간단한 그래프 탐색으로 표현될 수 있는 일종의 도메인 간 위험 쿼리를 지원합니다.

## 라이선스

이 실습에서 참조되는 모든 FIBO 온톨로지 콘텐츠는 다음과 같습니다.

- **저작권** (c) 2016-2025 EDM Council, Inc. 및 Object Management Group, Inc.
- [MIT 라이선스](https://opensource.org/licenses/MIT)에 따라 **라이센스가 부여됨**

```quiz
Q: ConcentrationCategory는 전체 모델에서 어떤 역할을 합니까?
- 지리적 좌표를 저장합니다.
- 도메인 전반에 걸쳐 대출 분류, 담보 유형 및 규제 한도를 연결하는 허브 개체 역할을 합니다. [correct]
- 각 대출에 대한 바젤 위험 가중치를 정의합니다.
- 규정 준수 추적을 위해 규제 엔터티를 대체합니다.
> ConcentrationCategory는 대출 분류 영역과 규제 영역을 연결하는 중앙 허브입니다. LoanType과 ColtralType이 모두 분류되며 RegulatoryLimit이 이를 제한합니다. 이는 도메인 간 집중 위험 쿼리의 핵심 노드가 됩니다.
```
