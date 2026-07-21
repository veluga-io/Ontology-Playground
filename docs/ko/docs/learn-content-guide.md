# 학습 콘텐츠 작성 가이드


**Ontology School** 섹션의 과정과 기사를 만드는 방법 Ontology Playground. 이것은 디렉토리 구조, 프론트매터 형식, 마크다운 기능(퀴즈 포함), 컴파일 파이프라인 및 프레젠테이션 모드를 다룹니다.


---

## 디렉토리 레이아웃


모든 학습 콘텐츠는 아래에서 실행됩니다. `content/learn/`. 각 과정은 다음을 포함하는 하위 디렉토리로 구성됩니다. `_meta.md` 파일 및 하나 이상의 번호가 매겨진 마크다운 기사:


```
content/learn/
  ontology-fundamentals/          ← course directory
    _meta.md                      ← course metadata
    01-what-is-an-ontology.md     ← article (order 1)
    02-understanding-rdf.md       ← article (order 2)
    ...
  iq-lab-retail-supply-chain/     ← another course
    _meta.md
    01-scenario-overview.md
    02-core-commerce.md
    ...
```

파일 이름을 숫자로 접두사 붙입니다(`01-`, `02-`)를 통해 파일 시스템에서 정렬된 상태로 유지합니다. 실제 표시 순서는 다음에서 따릅니다. `order` 전면 매터 필드.


---

## 과정 메타데이터(`_meta.md`)


각 과정 디렉토리는 다음을 포함해야 합니다. `_meta.md` 으로 YAML-스타일 프론트마터:


```markdown
---
title: Ontology Fundamentals
slug: ontology-fundamentals
description: From first principles to hands-on design — everything you need to understand and build ontologies.
type: path
icon: 📚
---
```

| 필드 | 필요한 | 설명서 |
|-------|----------|-------------|
| `title` | 네 | 코스 카드 및 머리글에 표시되는 디스플레이 이름 |
| `slug` | 네 | URL 슬러그 - 다음과 같은 경로에서 사용됩니다. `/#/learn/<slug>` |
| `description` | 네 | 코스 카드에 대한 1문장 요약 |
| `type` | 네 | `path` (개념적 학습 트랙) 또는 `lab` (실습 단계별) |
| `icon` | 네 | 코스 카드에 표시된 이모티콘 |


의 몸 `_meta.md` (전서문 이후)는 현재 무시되지만 향후 사용(예: 강의 소개 페이지)을 위해 예약되어 있습니다.


---

## 기사 앞부분


각 기사는 앞부분으로 시작됩니다:


```markdown
---
title: "Step 1: Core Commerce"
slug: core-commerce
description: Define Customer, Order, and Product — the three foundational entities.
order: 2
embed: official/iq-lab-retail-step-1
---
```

| 필드 | 필요한 | 설명서 |
|-------|----------|-------------|
| `title` | 네 | 기사 제목 |
| `slug` | 네 | URL 슬러그 - 사용됨 `/#/learn/<course>/<slug>` |
| `description` | 네 | 과정 목차에 표시된 1줄 설명 |
| `order` | 네 | 코스 내의 디스플레이 순서를 제어하는 정수 |
| `embed` | 아니요 | 실시간 대화형 그래프로 표시할 카탈로그 오노토미 ID |


---

## 기사 내용 작성하기


기사들은 [마크드](https://marked.js.org/). 제목, 단락, 목록, 표, 코드 블록, 굵은 글씨, 기울임말, 링크 및 이미지를 포함한 일반적인 구문을 모두 사용할 수 있습니다.


### 신뢰 모델 및 소독


아래의 학습 콘텐츠 `content/learn/` **신뢰받는, 검토된 저장소 콘텐츠**로 처리됩니다(사용자 생성된 런타임 입력은 아닙니다). 그럼에도 불구하고, 빌드 파이프라인은 컴파일된 콘텐츠를 소독합니다. HTML 쓰기 전에 `public/learn.json`.


- 허용되지 않는 태그/속성(예: `<script>`, 인라인 이벤트 처리기, 그리고 `javascript:` 링크)는 컴파일 시 제거됩니다.
-의 안전한 하위 집합 HTML 보존됩니다(제목, 목록, 표, 코드 블록, 링크, 이미지, 퀴즈 블록, 그리고 `<ontology-embed>` 태그).
- CI는 실행하여 이 경로를 검증합니다. `npm run learn:build` 주요 워크플로우에서.


### 제목 및 프레젠테이션 슬라이드


**프레젠테이션 모드**에서는, 기사는 매번 슬라이드로 나뉩니다. `<h2>` 경계. 한 `<hr>` (`---`) 섹션 내에서 슬라이드 브레이크를 생성합니다. 콘텐츠를 구성할 때 이것을 염두에 두십시오.


- `## Section Title` → 새로운 슬라이드를 시작합니다
- `---` → 현재 섹션을 두 개의 슬라이드로 나눕니다.
- 첫 번째 이전의 콘텐츠 `<h2>` **제목 슬라이드로** 바뀌다


### 오노톨로지 통합


카탈로그에서 라이브 상호 작용형 논리 그래프를 렌더링하려면, 사용하십시오. `<ontology-embed>` 사용자 정의 요소:


```html
<ontology-embed id="official/cosmic-coffee" height="400px"></ontology-embed>
```

차이 강조 표시(이전 단계에 비해 어떤 엔터티/관계가 새로운지 표시함):


```html
<ontology-embed id="official/iq-lab-retail-step-2" diff="official/iq-lab-retail-step-1" height="400px"></ontology-embed>
```

**중요:** 항상 적절한 닫는 태그를 사용하십시오(`</ontology-embed>`). **사용하지 마십시오** 자기 닫히는 구문 (`<ontology-embed ... />`). HTML 사용자 정의 요소를 자동으로 닫지 않으므로 자체 닫히는 양식은 브라우저가 후속 모든 콘텐츠를 포함물의 하위 항목으로 처리하여 숨깁니다.


---

## 퀴즈


사용하는 테두리 코드 블록을 사용하여 대화형 다중 선택 퀴즈를 추가합니다. `quiz` 언어 태그. 퀴즈는 기사 보기 및 프레젠테이션 모드에서 모두 대화형 카드 형태로 표시됩니다.


### 구문


````markdown
```quiz
질문: Shipment 엔터티는 오노토지에 어떤 역할을 하나요?
- 그것은 주문 엔터티를 대체합니다.
- 그것은 물류 계층과 상업 계층을 연결하는 허브 역할을 한다. [correct]
- 고객 주소를 저장합니다.
- 그것은 창고와 운송업체 사이의 개수 집합을 정의한다.
> 배송은 여러 도메인을 연결하는 허브 엔터티입니다. 주문과 물류 인프라스트럭처(운송사, 창고)를 연결하여 기존 엔터티를 수정하지 않고도 도메인 간 쿼리를 가능하게 합니다.

```
````

### 형식 규칙


| 라인 접두사 | 의미 |
|-------------|---------|
| `Q:` | 질문 텍스트(필수, 정확히 하나) |
| `- ` | 답변 옵션(최소 2개 필수) |
| `[correct]` | 올바른 옵션에 첨부됨(최소 하나 필수) |
| `>` | 사용자가 답변한 후에 표시되는 설명 텍스트(선택 사항, 여러 줄에 걸쳐 표시 가능) |


### 퀴즈가 어떻게 렌더링되는지


- **기사 보기:** 퀴즈는 클릭 가능한 옵션 버튼이 있는 대화형 카드로서 콘텐츠 섹션 사이에 인라인으로 나타납니다.
- **발표 모드:** 퀴즈는 전용 슬라이드를 사용합니다. 발표자는 옵션을 클릭하여 정답/틀린 피드백과 설명을 표시합니다.
- **JS가 로드되기 전에:** 백업 라인("❓ 문자 질문")가 표시되어 있으므로 내용이 비어 있지 않습니다.


### 좋은 퀴즈를 위한 팁


- 퀴즈를 **섹션의 끝** 또는 **기사의 끝**, 테스트되는 개념을 가르치는 내용이 끝난 후에 배치합니다.
- 좋은 균형을 위해 **4가지 옵션**을 적어라 - 2개는 너무 쉬워, 6개는 압도적이다.
- 질문을 **특정하고 검증 가능**하게 유지하세요 - 의견 기반의 질문을 피하세요.
- 학습 요점을 강화하는 간략한 **설명**을 작성하세요.
- **잘못된 옵션을 그럴듯하게 만드세요** - 그들은 분명히 어리석은 것이 아니라 학습자가 합리적으로 혼란스러울 수 있는 것이어야 합니다.


---

## 컴파일


기사들은 빌드 시에 다음과 같이 컴파일됩니다. `public/learn.json` 대본에 의해 `scripts/compile-learn.ts`. 다음과 같이 실행하세요:


```bash
npx tsx scripts/compile-learn.ts
```

이것은 또한 자동으로 실행됩니다. `npm run build`. 출력은 JSON 모든 과정과 미리 렌더링된 기사들이 포함된 매니페스트 HTML.


### 컴파일러가 확인하는 내용


- 모든 과정 디렉토리에는 다음이 있습니다. `_meta.md` 모든 필수 필드를 포함합니다.
- 모든 기사는 필요한 모든 프론트매터 필드를 가지고 있습니다.
- `order` 유효한 번호입니다
- `type` 아니면 `path` 또는 `lab`
- 퀴즈 블록에는 `Q:` 줄, 적어도 2개의 옵션, 그리고 적어도 하나 `[correct]` 옵션


검사가 실패하면 컴파일러는 오류를 출력하고 코드 1로 종료됩니다.


---

## 로컬 개발 워크플로우


```bash
# 1. Create or edit markdown files under content/learn/<course>/

# 2. Compile the content
npx tsx scripts/compile-learn.ts

# 3. Start the dev server
npm run dev

# 4. Navigate to /#/learn to see your changes

# 5. Run tests to verify quiz compilation
npm test
```

개발 서버는 서비스를 제공합니다. `public/learn.json` 직접적으로, 따라서 당신은 콘텐츠를 편집한 후에 브라우저를 다시 컴파일하고 새로 고침만 하면 됩니다.


---

## 새로운 과정 만들기


1. 아래에 디렉토리를 생성합니다. `content/learn/` 케밥 케이스 이름으로
2. 하나를 추가하세요 `_meta.md` 코스 프론트마터(제목, 슬러그, 설명, 유형, 아이콘)와 함께
3. 번호가 매겨진 기사 마크다운 파일을 추가합니다(`01-intro.md`, `02-details.md`, 등.)
4. 문서가 다음을 통해 항목 참조 카탈로그 오노톨로지 참조를 한다면 `<ontology-embed>`, 그 엔톨로지들이 존재하는지 확인하세요. `catalogue/`
5. 달리다 `npx tsx scripts/compile-learn.ts` 컴파일하기 위해
6. 브라우저에서 확인하세요. `/#/learn`


---

## 새로운 기사용 체크리스트


- [ ] 프론트마터에는 필요한 모든 필드가 있습니다(제목, 슬러그, 설명, 순서)
- [ ] 콘텐츠 사용 `##` 논리적인 섹션(및 슬라이드 브레이크)의 제목
- [ ] `<ontology-embed>` 태그는 자체 닫는 태그가 아니라 적절한 닫는 태그를 사용합니다.
- [ ] 각 기사당 최소한 하나의 퀴즈 블록
- [ ] 퀴즈는 가지고 있다 `Q:`, 2개 이상의 옵션, 하나 `[correct]`, 그리고 설명
- [ ] `npx tsx scripts/compile-learn.ts` 오류 없이 성공합니다
- [ ] `npm test` 통과합니다 (컴파일 통합 테스트는 퀴즈를 검증합니다. JSON)
- [ ] 콘텐츠는 기사 보기 모드와 프레젠테이션 모드에서 모두 잘 읽힙니다.
