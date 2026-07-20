# Ontology Playground(미리보기) ☕

> 참고: 이 프로젝트는 AI 지원 코딩으로 개발되었습니다.

**[실시간으로 사용해 보세요 → microsoft.github.io/Ontology-Playground](https://microsoft.github.io/Ontology-Playground/)**

[![Ontology Playground 스크린샷](../../public/og-image.png)](https://microsoft.github.io/Ontology-Playground/)

온톨로지 및 **Microsoft Fabric IQ**에 대해 학습하기 위한 무료 오픈 소스 웹 애플리케이션입니다. 사전 구축된 온톨로지를 탐색하고, 시각적 편집기에서 직접 디자인하고, RDF/XML로 내보내고, 대화형 다이어그램을 공유하세요. 이 모든 것이 백엔드 종속성이 전혀 없는 완전히 정적 사이트에서 이루어집니다.

![Microsoft Fabric](https://img.shields.io/badge/Microsoft-Fabric-0078D4?style=flat-square&logo=microsoft)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 기능

### 대화형 그래프 탐색

모든 온톨로지를 대화형 노드 및 에지 다이어그램으로 렌더링하는 Cytoscape.js 기반 그래프입니다. 이동, 확대/축소, 노드 클릭을 통해 속성을 검사하고 실시간 검색 창을 사용하여 엔터티 및 관계를 필터링할 수 있습니다.

### 온톨로지 카탈로그

6개 영역(소매, 전자 상거래, 의료, 금융, 제조, 교육)에 걸쳐 공식 및 커뮤니티 기여 온톨로지로 구성된 엄선된 라이브러리입니다. 카테고리별로 탐색하고, 이름이나 태그로 검색하고, 한 번의 클릭으로 온톨로지를 로드하고, RDF 소스를 확인하세요. 모든 온톨로지는 공유 가능한 딥 링크(`/#/catalogue/official/cosmic-coffee`)를 가지고 있습니다.

### 시각적 온톨로지 디자이너

온톨로지를 처음부터 생성하거나 기존 온톨로지를 편집하기 위한 전체 화면 분할 창 편집기입니다. 아이콘, 색상, 입력된 속성이 포함된 엔터티 유형을 추가합니다. 카디널리티와의 관계를 정의합니다. 작업하면서 업데이트되는 실시간 그래프 미리보기를 확인하세요. 실행 취소/다시 실행(50개 레벨), 실시간 검증, RDF/XML 또는 JSON로 내보내기가 포함됩니다.

### RDF 가져오기 및 내보내기

RDF/XML(OWL 클래스, 데이터 유형 속성, 카디널리티가 있는 객체 속성)에 대한 전체 왕복 지원. `.rdf` / `.owl` 파일을 가져오고, Microsoft Fabric IQ가 예상하는 정확한 형식으로 내보내고, 자동화된 왕복 테스트를 통해 충실도를 확인하세요.

### 원클릭 카탈로그 PR

GitHub(장치 흐름)로 로그인하고 디자이너에서 직접 커뮤니티 카탈로그에 온톨로지를 제출합니다. 앱은 리포지토리를 포크하고 분기를 생성하고 RDF + 메타데이터를 커밋하고 풀 요청을 자동으로 엽니다.

### 삽입 가능한 위젯

단일 `<script>` 태그가 있는 모든 웹 페이지에서 대화형 온톨로지 뷰어를 렌더링하는 자체 포함 JavaScript 파일(`ontology-embed.js`)입니다. 어두운/밝은 테마, 다양한 로딩 방법(카탈로그 ID, URL, 인라인 base64) 및 클릭하여 검사를 지원합니다. 참조
자세한 내용은 [임베딩 가이드](docs/embed-guide.md)를 참조하세요.

### 온톨로지 학교

개념 학습 경로와 실습 랩을 포괄하는 **9개 과정**을 갖춘 구조화된 학습 허브(`/#/learn`):

- **온톨로지 기초** — 핵심 개념을 다루는 6개의 기사(온톨로지란 무엇입니까? → RDF/OWL → Fabric IQ → 첫 번째 구축 → 디자인 패턴 → 기여)
- **7가지 도메인 학습 경로** — Fourth Coffee, 전자상거래, 금융, 의료, 제조, 대학 및 HR 시스템. 각 경로에는 온톨로지를 단계별로 구축하는 4개의 진보적인 기사가 있으며, 각 단계의 새로운 엔터티를 보여주는 라이브 내장 그래프가 있습니다.
- **IQ 랩: 소매 공급망** — 처음부터 15개 엔터티 온톨로지를 구축하는 7단계 실습 랩입니다(6개의 점진적 카탈로그 항목에 걸쳐 3 → 15개 엔터티).

모든 기사는 **프레젠테이션 모드**(`##` 제목으로 분할된 슬라이드)를 지원하며 즉각적인 피드백이 가능한 **대화형 퀴즈**를 포함합니다. 온톨로지는 선택적인 차이점 강조 표시를 통해 카탈로그의 실시간 그래프 로드를 포함합니다.

### 퀘스트 시스템

다단계 지침, 힌트, 진행률 표시줄 및 성과 배지를 통해 사용자에게 온톨로지 개념을 안내하는 5가지 점진적인 퀘스트입니다.

### 자연어 쿼리 플레이그라운드

자연어 질문("어떤 고객이 주문했습니까?")을 입력하고 온톨로지 엔터티 및 관계에 어떻게 매핑되는지 확인하세요. Fabric IQ의 NL2Ontology 기능에 대한 미리보기입니다.

### 명령 팔레트 및 키보드 단축키

어디에서나 `⌘K` / `Ctrl+K`를 눌러 검색 가능한 명령 팔레트를 엽니다. 키보드를 떠나지 않고도 카탈로그, 디자이너, 온톨로지 학교, 가져오기/내보내기, 도움말 등으로 이동할 수 있습니다. 빠른 도움말에 액세스하려면 `?`를 누르세요. 팔레트를 탐색하려면 화살표 키 + Enter를 누르세요.

### 스타터 템플릿

디자이너는 5가지 도메인 템플릿(소매, 의료, 금융, IoT, 교육)을 제공하므로 신규 사용자는 빈 페이지를 접하지 않습니다. 각 템플릿은 사용자 지정할 수 있는 속성과 관계 2개를 포함하는 엔터티 3개를 생성합니다.

### 대화형 온보딩 투어

처음 방문자는 헤더, 그래프, 퀘스트, 검사기, 디자이너를 순서대로 강조하는 스포트라이트 오버레이가 포함된 5단계 가이드 투어를 받게 됩니다. `localStorage`에 지속되는 "다시 표시 안 함" 옵션을 사용하여 닫을 수 있습니다.

### 딥링킹 및 URL 라우팅

모든 페이지에 대해 공유 가능한 URL을 사용한 클라이언트 측 해시 라우팅:

| 경로 | 페이지 |
|-------|------|
| `/#/` | 홈(기본 온톨로지) |
| `/#/catalogue` | 온톨로지 갤러리 |
| `/#/catalogue/<source>/<slug>` | 특정 온톨로지(예: `/#/catalogue/official/cosmic-coffee`) |
| `/#/designer` | 시각 디자이너 |
| `/#/designer/<source>/<slug>` | 카탈로그 온톨로지를 갖춘 디자이너(예: `/#/designer/official/cosmic-coffee`) |
| `/#/learn` | 온톨로지 스쿨 - 코스 카탈로그 |
| `/#/learn/<course>` | 강좌 세부정보 — 기사 목록 |
| `/#/learn/<course>/<article>` | 기사 보기(프레젠테이션 모드 포함) |

## 공식 온톨로지

| 도메인 | 온톨로지 | 엔터티 | 관계 |
|---------|------------|----------|---------------|
| 소매 | Fourth Coffee | 6 | 7 |
| 전자상거래 | 온라인 소매 | 5 | 6 |
| 헬스케어 | 임상시스템 | 5 | 6 |
| 금융 | 은행 및 금융 | 5 | 6 |
| 제조 | 인더스트리 4.0 | 5 | 5 |
| 교육 | 대학 시스템 | 5 | 6 |

## 시작하기

### 전제 조건

- Node.js 18+
- npm 9+

### 설치

```bash
cd Ontology-Playground
npm install
```

### 개발

```bash
npm run dev
```

http://localhost:5173 방문

### 프로덕션 빌드

```bash
npm run build
```

빌드 파이프라인은 카탈로그를 컴파일하고, 학습 콘텐츠 마크다운을 컴파일하고, 유형을 확인하고, 앱을 번들로 묶고, 포함 위젯을 빌드합니다. 출력은 `build/`에 있습니다.

### 테스트 실행

```bash
npm test            # single run
npm run test:watch  # watch mode
```

## 배포

### Azure Static Web Apps(기본)

리포지토리는 `main`에 푸시할 때마다 Azure SWA에 배포하는 GitHub Actions 워크플로와 함께 제공됩니다.

1. Azure 포털에서 정적 웹 앱 생성
2. GitHub 저장소에 연결
3. 배포 토큰을 복사하여 GitHub 비밀 `AZURE_STATIC_WEB_APPS_API_TOKEN_GREEN_PLANT_0BB1D2910`로 추가합니다.
4. `main`로 푸시 - `.github/workflows/azure-static-web-apps-green-plant-0bb1d2910.yml`의 워크플로가 나머지를 처리합니다.
5. 풀 요청에 대해 PR 미리보기 환경이 자동으로 생성됩니다.

### GitHub Pages(포크용)

별도의 워크플로우가 포크에 이상적인 GitHub Pages에 배포됩니다.

1. 이 저장소를 포크하세요.
2. **설정 → 페이지 → 소스**로 이동하여 **GitHub Actions**를 선택합니다.
3. `main`로 푸시 - `.github/workflows/deploy-ghpages.yml`의 워크플로가 `https://<username>.github.io/<repo-name>/`에 빌드 및 배포됩니다.

`VITE_BASE_PATH` 환경 변수는 GitHub Pages 빌드 중에 자동으로 `/<repo-name>/`로 설정되므로 자산 경로가 올바르게 확인됩니다.

### 환경 변수

| 변수 | 기본값 | 설명 |
|------------|---------|-------------|
| `VITE_ENABLE_AI_BUILDER` | `false` | Azure OpenAI 온톨로지 빌더 활성화 |
| `VITE_ENABLE_LEGACY_FORMATS` | `false` | JSON/YAML/CSV 가져오기/내보내기 형식 활성화 |
| `VITE_BASE_PATH` | `/` | 앱의 기본 경로(GitHub Pages에 대해 자동으로 설정됨) |
| `VITE_GITHUB_CLIENT_ID` | *(비어 있음)* | GitHub 원클릭 카탈로그 PRs용 OAuth 앱 클라이언트 ID([설정 가이드](docs/github-oauth-setup.md)) |
| `VITE_GITHUB_OAUTH_BASE` | *(비어 있음)* | GitHub Pages 배포를 위한 외부 OAuth 프록시 URL(예: Cloudflare Worker URL) |

## 프로젝트 구조

```
Ontology-Playground/
├── src/
│   ├── components/       # React components (graph, designer, modals, learn page)
│   ├── data/             # Ontology model, query engine, quest definitions
│   ├── lib/              # Router, RDF parser/serializer, catalogue helpers
│   ├── store/            # Zustand stores (app state, designer state)
│   ├── styles/           # CSS (Microsoft Fluent-inspired dark/light themes)
│   └── types/            # TypeScript type definitions
├── catalogue/            # Official + community ontology RDF files
├── content/learn/        # Course directories with markdown articles, quizzes, and metadata
├── scripts/              # Build-time compilers (catalogue, learning content)
├── api/                  # Azure Functions backend (optional, for AI builder)
├── docs/                 # Guides and documentation
├── public/               # Static assets (compiled catalogue.json, learn.json)
└── .github/workflows/    # CI/CD (Azure SWA + GitHub Pages)
```

## 문서

아래 표에는 주요 최종 사용자 및 기여자 가이드가 나열되어 있습니다. 내부 계획 참고 사항(예: `docs/TODO-*.md`)은 의도적으로 게시된 설명서 세트의 일부가 아닙니다.

| 가이드 | 설명 |
|-------|-------------|
| [온톨로지 저작 가이드](docs/authoring-guide.md) | 플레이그라운드에서 잘 작동하는 온톨로지를 만드는 방법 — 필드별 참조, 모범 사례 및 단계별 연습 |
| [온톨로지 기여: 설계에서 GitHub까지](docs/contributing-ontology-from-design-to-github.md) | 엔드투엔드 기여자 워크플로우: 디자인, RDF 내보내기, 메타데이터, 로컬 검증 및 끌어오기 요청 |
| [플레이그라운드 기능 데모 가이드](docs/playground-features-demo-guide.md) | 주요 Playground 기능을 소개하고 이를 Fabric IQ 및 Real-Time Intelligence에 연결하는 단계별 데모 스크립트 |
| [온톨로지 스쿨 데모 가이드](docs/ontology-school-demo-guide.md) | 강좌, 삽입, 퀴즈, 프레젠테이션 모드 및 학습 워크플로에 대한 단계별 라이브 데모 계획 |
| [삽입 가이드](docs/embed-guide.md) | 웹페이지에 대화형 온톨로지 위젯을 삽입하는 방법 |
| [GitHub OAuth 설정](docs/github-oauth-setup.md) | 원클릭 카탈로그 PRs에 대해 GitHub OAuth를 구성하는 방법 |
| [보안 내장](docs/embed-security.md) | 내장형 위젯의 보안 모델 |
| [학습 콘텐츠 가이드](docs/learn-content-guide.md) | 온톨로지 학교를 위한 강좌, 기사, 퀴즈 및 온톨로지 삽입물을 작성하는 방법 |
| [온톨로지 스쿨 검토 워크플로우](docs/ontology-school-review-workflow.md) | 학교 수업 콘텐츠에 대한 사람의 검토 및 승인 흐름 |
| [테마 제작 가이드](docs/theme-authoring-guide.md) | 새로운 색상 테마를 Playground에 연결하는 방법 - 토큰 계약, appStore + CSS 단계 및 대비 문제 |

## AI 에이전트 빠른 시작

이 저장소에는 상담원이 안정적으로 다음을 수행할 수 있도록 Copilot 사용자 정의 파일이 포함되어 있습니다.

- 고객 RDF/OWL를 카탈로그용 형식으로 가져오기
- 진보적인 온톨로지 학교 모듈 생성
- 인적 검토 워크플로우를 통해 강의 콘텐츠 라우팅

포함된 자산:

- 스킬:
   - `.github/skills/ontology-catalog-import/` — 외부/고객 RDF/OWL를 카탈로그 형식으로 가져옵니다.
   - `.github/skills/ontology-school-path-generator/` — 진보적인 온톨로지 학교 모듈 생성
   - `.github/skills/community-ontology-contribution/` — 올바른 디렉터리 구조, 메타데이터 및 유효성 검사를 사용하여 `catalogue/community/` 아래에 기여자 온톨로지를 추가합니다.
   - `.github/skills/name-generator/` — 승인된 CSV 고정 장치에서 예제, 데모, 퀘스트, 테스트 및 샘플 데이터에 대한 사람 이름을 생성합니다.
- RDF 섭취 지침:
   - `.github/instructions/rdf-intake.instructions.md`
- 재사용 가능한 프롬프트:
   - `.github/prompts/import-rdf-to-catalog.prompt.md`
   - `.github/prompts/generate-ontology-school-module.prompt.md`

병합 전 권장 검증:

```bash
npm run qa:tutorial-content
npm run build
```

## 기술

- **React 19** + TypeScript 5
- **Cytoscape.js** — 그래프 시각화(fcose 레이아웃)
- **Zustand** — 상태 관리
- **Vite** — 빌드 도구
- **프레이머 모션** — 애니메이션
- **Lucide 아이콘** — 아이콘 라이브러리
- **표시됨** — 마크다운 컴파일(빌드 타임)

## 자세히 알아보기

- [Microsoft Fabric IQ 온톨로지 문서](https://learn.microsoft.com/en-us/fabric/iq/ontology/overview)
- [Azure Static Web Apps](https://docs.microsoft.com/azure/static-web-apps/)

## 라이선스

MIT

## 상표권 고지

상표 이 프로젝트에는 프로젝트, 제품 또는 서비스에 대한 상표나 로고가 포함될 수 있습니다. Microsoft 상표 또는 로고의 승인된 사용에는 Microsoft의 상표 및 브랜드 지침이 적용되며 이를 따라야 합니다. 이 프로젝트의 수정된 버전에 Microsoft 상표 또는 로고를 사용하더라도 혼동을 일으키거나 Microsoft 후원을 암시해서는 안 됩니다. 제3자 상표 또는 로고의 사용에는 해당 제3자의 정책이 적용됩니다.