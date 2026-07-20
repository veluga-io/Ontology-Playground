---
title: 카탈로그에 기여
slug: contributing-to-the-catalogue
description: 온톨로지를 커뮤니티와 공유하는 방법 - 포크하고, RDF 및 메타데이터를 추가하고, PR를 제출하고, 카탈로그에 게시된 내용을 확인하세요.
order: 6
embed: official/university
---

## 커뮤니티 카탈로그

Ontology Playground에는 온톨로지 [카탈로그](#/catalogue)가 있습니다. 일부는 프로젝트 팀("공식")에서 유지 관리하고 다른 일부는 커뮤니티에서 기여합니다. 누구나 풀 리퀘스트를 열어 온톨로지를 제출할 수 있습니다.

## 기여하는 두 가지 방법

### 옵션 A: 디자이너에서 PR를 한 번 클릭하세요.

가장 빠른 기여 방법:

1. [디자이너](#/designer)를 열고 온톨로지를 구축합니다(또는 기존 온톨로지를 로드합니다).
2. 툴바에서 **카탈로그에 제출**을 클릭하세요.
3. 이름, 설명, 카테고리, 태그 등 메타데이터를 입력합니다.
4. GitHub로 로그인합니다(장치 흐름 - 비밀번호가 저장되지 않음)
5. 도구는 자동으로 저장소를 포크하고, 분기를 생성하고, RDF 및 메타데이터를 커밋하고, 끌어오기 요청을 엽니다.

그게 다야. CI 파이프라인은 RDF의 유효성을 검사하고, 메타데이터 스키마를 확인하고, 테스트를 실행합니다. 관리자가 검토하고 병합합니다.

### 옵션 B: 수동 PR

Git으로 직접 작업하는 것을 선호하는 경우:

1. `catalogue/community/<your-github-username>/<ontology-slug>/`의 저장소를 **포크**합니다.
2. `ontology.rdf` 아래에 디렉터리를 생성합니다.
3. 두 개의 파일을 추가합니다:
   - `metadata.json` — GitHub 파일
   - RDF/OWL — 온톨로지를 설명합니다.

## 메타데이터 형식

```json
{
  "name": "Library System",
  "description": "A public library with books, authors, members, and loans.",
  "icon": "📚",
  "category": "education",
  "tags": ["library", "books", "lending"],
  "author": "your-github-username"
}
```

| 필드 | 필수 | 설명 |
|-------|----------|------------|
| `name` | 예 | 카탈로그의 표시 이름 |
| `description` | 예 | 한 문장 요약 |
| `category` | 예 | 다음 중 하나: `retail`, `healthcare`, `finance`, `manufacturing`, `education`, `technology`, `general` |
| `icon` | 아니요 | 카드용 단일 이모티콘 |
| `tags` | 아니요 | 검색용 소문자 키워드 배열 |
| `author` | 아니요 | GitHub 사용자 이름(원클릭 흐름으로 자동 입력) |

## 유효성 검사 규칙

귀하의 PR는 다음 규칙에 따라 자동으로 검증됩니다.

- **유효한 `parse(serialize(ontology))`** — 오류 없이 구문 분석해야 합니다.
- **왕복 충실도** — RDF/OWL는 동등한 출력을 생성해야 합니다.
- **메타데이터 스키마** — 모든 필수 필드가 있으며 카테고리가 유효합니다.
- **디렉터리 이름 지정** — 소문자 영숫자, 하이픈, 밑줄만 사용 가능
- **심볼릭 링크 없음** — 보안을 위해 카탈로그의 심볼릭 링크가 거부됩니다.

## 병합 후에는 어떻게 되나요?

병합되면 빌드 파이프라인은 다음과 같습니다.

1. `npm run catalogue:build` 실행 — 모든 `catalogue.json` 파일을 #/catalogue로 컴파일합니다.
2. 업데이트된 사이트를 배포합니다. 온톨로지가 [갤러리](#/catalogue)에 나타납니다.
3. 플레이그라운드에서 임베딩, 딥링킹, 로딩이 즉시 가능합니다.

<ontology-embed id="official/university" height="400px"></ontology-embed>

*대학 시스템 온톨로지는 공식 카탈로그 항목 중 하나입니다. 커뮤니티 기여는 동일한 형식을 따릅니다. 온톨로지는 갤러리에서 다음과 같이 표시됩니다.*

## 원활한 검토를 위한 팁

- **좋은 설명 작성** — 온톨로지 모델이 어떤 도메인이고 누구를 위한 것인지 설명하세요.
- **의미 있는 태그 추가** — 사용자가 검색에서 온톨로지를 찾는 데 도움이 됩니다.
- **로컬에서 테스트** — 푸시하기 전에 `npm run validate -- catalogue/community/<you>/<slug>/ontology.rdf`를 실행하세요.
- **집중을 유지하세요** — 3~8개의 엔터티 유형으로 구성된 범위가 넓은 온톨로지가 30개 이상의 엔터티 유형으로 확장된 온톨로지보다 더 유용합니다.

## 주요 내용

- 누구나 원클릭 `metadata.json` 흐름이나 수동 풀 요청을 통해 온톨로지에 기여할 수 있습니다.
- 각 제출에는 RDF 파일과 RDF가 필요합니다.
- CI는 PR를 자동으로 검증합니다. 검토 전에 오류를 수정하세요.
- 병합된 온톨로지는 배포 후 즉시 라이브 카탈로그에 나타납니다.

```quiz
Q: 모든 카탈로그 기여에는 어떤 두 가지 파일이 포함되어야 합니까?
- 온톨로지.RDF/OWL 및 README.md
-schema.rdf 및 config.rdf
- 온톨로지.rdf 및 메타데이터.json
- index.json 및 스타일.json [correct]
> 각 카탈로그 항목에는 온톨로지.yaml 파일(html 온톨로지)과 메타데이터.css 파일(카탈로그 목록의 이름, 설명, 카테고리 및 태그)이 필요합니다.
```
