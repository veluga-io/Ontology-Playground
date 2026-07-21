---
title: "완전한 HR 모델"
slug: complete-model
description: "PerformanceReview를 추가하고 실제 인력 분석 질문에 전체 HR 온톨로지를 적용하세요."
order: 4
embed: community/ravi-chandu/hr-system
---

## 인력 분석 레이어 완성

최종 엔터티는 **PerformanceReview**입니다. 검토 주기에 걸쳐 평가 결과를 직원에게 연결합니다.

관계:

- `Employee` -> `PerformanceReview` (일대다)

### PerformanceReview 속성

| 부동산 | 유형 | 식별자? |
|---|---|---|
| `reviewId` | 문자열 | `reviewPeriod` |
| `rating` | 문자열 | |
| `reviewDate` | 열거형 | |
| ✓ | 날짜 | |

이제 온톨로지는 하나의 그래프에서 운영 및 전략적 HR 질문을 지원합니다.

## 전체 그래프

<ontology-embed id="community/ravi-chandu/hr-system" height="460px"></ontology-embed>

*5개 엔터티(직원, 부서, 직책, 할당, 성과 검토)가 있는 HR 시스템 온톨로지.*

## 그래프 질문 예시

| 질문 | 그래프 경로 |
|---|---|
| 고위 직원이 가장 많은 부서는 어디입니까? | 부서 <- 할당 <- 사원(`jobLevel=senior`) |
| 작년에 역할을 바꾼 직원은 누구입니까? | 직원 -> 발령(일자별 복수 기록) -> 직위 |
| 뛰어난 리뷰가 많은 팀은 어디인가요? | 부서 <- 배정 <- 직원 -> PerformanceReview (`rating=outstanding`) |
| 어떤 과제가 더 이상 활성화되지 않습니까? | 할당(`endDate` 세트 또는 `isPrimary=false`) |

## 주요 내용

1. **사람**, **조직 단위**, **역할**을 별개의 엔터티로 분리합니다.
2. 시간 인식 인력 배치 기록을 위한 연결 엔터티로 **할당**을 사용합니다.
3. **PerformanceReview**를 사용하여 측정 가능한 결과를 인력 엔터티에 첨부합니다.
4. 식별자를 안정적으로 유지하고 열거형 값을 통해 상태를 제어합니다.

```quiz
Q: 시간 경과에 따른 역할 및 부서 변경 내역 분석을 지원하는 엔터티는 무엇입니까?
- 직원
- 부서
- 할당 [correct]
- 실적리뷰
> 특정 직원-부서-직위 링크에 대한 할당 기록 시작 및 종료 날짜입니다. 그렇지 않으면 인력 배치 내역을 깔끔하게 추적할 수 없습니다.
```

HR 시스템 경로를 완료했습니다. [카탈로그](#/catalogue/community/ravi-chandu/hr-system)에서 모델을 열거나 [디자이너](#/designer/community/ravi-chandu/hr-system)에서 계속 반복합니다.
