# Ontology Playground에 기여

Ontology Playground에 기여하는 데 관심을 가져주셔서 감사합니다! 이 프로젝트는 기여와 제안을 환영합니다.

## 기여자 라이선스 계약

대부분의 기여에는 귀하가 귀하의 기여를 사용할 권리가 있고 실제로 그렇게 할 권리가 있음을 선언하는 기여자 라이센스 계약(CLA)에 동의해야 합니다. 자세한 내용은 다음을 방문하세요.
<https://cla.opensource.microsoft.com>.

끌어오기 요청을 제출하면 CLA 봇이 자동으로 CLA를 제공해야 하는지 여부를 결정하고 PR를 적절하게 장식합니다(예: 상태 확인, 댓글). 봇이 제공하는 지침을 따르기만 하면 됩니다. CLA를 사용하여 모든 저장소에서 이 작업을 한 번만 수행하면 됩니다.

## 행동 강령

본 프로젝트는 [Microsoft 오픈소스 행동강령](https://opensource.microsoft.com/codeofconduct/)을 채택했습니다. 자세한 내용은 [행동 강령 FAQ](https://opensource.microsoft.com/codeofconduct/faq/)를 참조하거나 추가 질문이나 의견이 있는 경우 [opencode@microsoft.com](mailto:opencode@microsoft.com)에 문의하세요.

---

## 기여 방법

### 문제 보고

- GitHub 문제를 사용하여 버그를 보고하거나 기능을 요청하세요.
- 버그 재현 단계 포함
- 새 이슈를 만들기 전에 기존 이슈를 검색하세요.

### 카탈로그에 온톨로지 기여

기여하는 가장 쉬운 방법은 커뮤니티 카탈로그에 온톨로지를 추가하는 것입니다.

1. 이 저장소를 **포크**합니다.
2. 온톨로지를 위한 디렉터리를 생성합니다:
   ```
   catalogue/community/<your-github-username>/<ontology-slug>/
   ```
3. 두 개의 파일을 추가합니다:
   - **`<ontology-slug>.rdf`** — `metadata.json` 형식의 온톨로지(Ontology Playground UI에서 내보낼 수 있음)
   - **RDF/OWL** — 온톨로지를 설명하는 메타데이터:
     ```json
     {
       "id": "<ontology-slug>",
       "name": "My Ontology",
       "description": "A short description of what this ontology models",
       "icon": "🔧",
       "category": "general",
       "tags": ["example", "tutorial"],
       "author": "<your-github-username>"
     }
     ```
4. 로컬에서 유효성을 검사합니다.
   ```bash
   npm ci
   npm run catalogue:build   # must succeed
   npm test                  # all tests must pass
   ```
5. `main` 브랜치에 대한 **풀 요청 열기**
   - CI는 RDF 및 메타데이터를 자동으로 검증합니다.
   - 관리자가 검토하고 병합합니다.

#### 메타데이터 스키마

`metadata.json` 파일은 [`catalogue/metadata-schema.json`](../../catalogue/metadata-schema.json)의 스키마를 준수해야 합니다.

| 필드 | 필수 | 설명 |
|---------------|----------|--------------------------------|
| `id` | 예 | URL 안전 슬러그(`lowercase-with-hyphens`) |
| `name` | 예 | 사람이 읽을 수 있는 이름 |
| `description` | 예 | 간단한 설명 |
| `category` | 예 | 다음 중 하나: `retail`, `healthcare`, `finance`, `manufacturing`, `education`, `general` |
| `icon` | 아니요 | 디스플레이용 이모티콘 아이콘 |
| `tags` | 아니요 | 필터링용 태그 배열 |
| `author` | 아니요 | 귀하의 GitHub 사용자 이름 또는 이름 |

### 코드 기여

1. 기능 분기를 포크하고 생성합니다: `feature/<feature-name>`
2. [AGENTS.md](AGENTS.md)의 코딩 규칙을 따릅니다.
3. 새로운 기능에 대한 테스트 작성
4. 빌드가 통과되었는지 확인합니다.
   ```bash
   npm run build    # includes catalogue compilation + TypeScript + Vite
   npm test         # all tests must pass
   ```
5. 변경 사항에 대한 명확한 설명이 포함된 Pull Request를 엽니다.

### 개발 설정

```bash
git clone https://github.com/<your-fork>/Ontology-Playground.git
cd Ontology-Playground
npm install
npm run dev       # start development server
npm test          # run tests
npm run build     # full production build
```

## 라이선스

기여함으로써 귀하는 귀하의 기여가 [MIT 라이선스](../../LICENSE)에 따라 라이선스가 부여된다는 데 동의하게 됩니다.
