#Ontology 학교 인간 검토 워크플로우

이 워크플로에서는 레슨을 인간 검토 대기 상태로 표시하고 문제 기반 승인 후에 그 표시를 제거합니다.

## 1) 레슨을 검토 중으로 태그합니다.

레슨 프론트마터(예: `content/learn/<course>/<lesson>.md`에 다음과 같이 추가합니다.

```md
reviewStatus: under-human-review
```

예:

```md
---
title: Collateral and Schedules
slug: collateral-and-schedules
description: Add security agreements and repayment cadence using collateral and payment schedule entities.
order: 3
embed: official/fibo-loans-step-2
reviewStatus: under-human-review
---
```

## 2) 검토 문제를 열기

문제 템플릿을 사용합니다.

- `.github/ISSUE_TEMPLATE/ontology-school-review.yml`

필수 필드:

- `Lesson Path`(`content/learn/` 아래에 있어야 함)
- `Source Pull Request`
- `Reviewer Notes`

템플릿은 레이블 `ontology-school-review`을 적용합니다.

## 3) 승인하고 자동화를 트리거합니다.

레슨을 승인하는 방법은 두 가지가 있습니다.

### 옵션 A - 댓글 트리거 검토 이슈에 `#approved` 포함하는 댓글을 게시합니다. 워크플로에서 자동으로 `ontology-school-approved` 레이블을 추가, 이슈를 닫고 승인 PR를 생성합니다.

### 옵션 B - 수동 레이블 + 닫기
1. 문제 레이블 `ontology-school-approved` 추가
2. 문제를 닫습니다.

두 옵션 중 어느 것도 워크플로우를 트리거합니다.

- `.github/workflows/ontology-school-review-approval.yml`

워크플로에는 다음과 같은 내용이 포함됩니다.

- 문제 본문에서 `Lesson Path`를 파싱합니다.
- 해당 수업에서 `reviewStatus: under-human-review` 제거합니다.
- `public/learn.json`을 다시 컴파일하다
- 변경 사항에 대한 자동화된 PR 개설합니다.

## 4) 병합 승인 PR

봇이 생성한 PR 일반 브랜치 + PR 흐름을 통해 병합합니다.

## 필요한 저장소 레이블

GitHub 이 레이블을 하나만 생성하세요:

- `ontology-school-review`
- `ontology-school-approved`

## 메모들

- 자동화는 문제가 **폐기**되고 `ontology-school-approved` 레이블이 지정된 경우에만 실행됩니다.
- 수업 경로가 유효하지 않거나 누락된 경우, 파일 변경 없이 워크플로우가 실패합니다.
- 마커 제거는 일회성입니다. 이미 제거된 경우 PR 비어 있을 수 있습니다.
