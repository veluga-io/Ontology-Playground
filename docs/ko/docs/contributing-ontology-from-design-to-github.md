#ontology에 기여하기: 디자인에서 GitHub

이 가이드는 디자이너에서 시작하여 GitHub 푸시 요청으로 끝나는 Ontology Playground 새로운 논리에 기여하는 실용적이고 데모 친화적인 경로입니다.

---

## 당신이 할 일

1. 플레이그라운드 디자이너에서 당신의 온톨로지론을 설계하거나 개선하세요.
2. 앱에서 RDF 내보냅니다.
3. RDF 또는 OWL 메타데이터를 포함한 카탈로그 항목 폴더를 생성합니다.
4. 로컬에서 유효성을 검증합니다.
5. 푸시 요청을 열다.

커뮤니티 제출물은 카탈로그에 재사용 가능한 가치를 추가해야 합니다. 좋은 제출물은 다른 사람들이 검사, 재사용 또는 배울 수 있는 실제 도메인, 워크플로우 또는 교육 시나리오를 모델링해야 합니다. 허영심에 기인한 항목, 중복 제출물, 대체 예제 또는 명확한 도메인 모델 없이 사람, 프로필 또는 조직을 나열하기 위해 존재하는 엔톨로지나 오류를 피해야 합니다.

---

## 전제 조건

- GitHub 계정
- 리포의 로컬 클론
- Node.js 20+ 및 npm

부속품을 한 번 설치하세요:

```bash
npm ci --ignore-scripts
```

---

## 단계 1: Ontology Playground 디자인하기

1. 앱을 열고 Designer로 이동합니다.
2. 온톨로지체를 생성하거나 편집합니다.
3. 각 엔터티가 다음과 같은 것을 갖추었는지 확인합니다.
- 명확한 이름
- 설명
- 적어도 하나의 식별자 프로퍼티
4. 의미 있는 관계 이름과 Cardinalities를 추가합니다.
5. 내보내기 전에 Designer에서 검증 피드백을 사용합니다.

데모 팁: 카탈로그의 기존 온톨로지에서 시작하고 Designer의 편집을 클릭하여 설명을 빠르게 진행하세요.

---

## 단계 2: RDF 내보내기

1. 앱에서 '수입/내보내기'를 엽니다.
2. RDF/XML 내보내기.
3. 파일을 다음과 같이 저장하세요:

```text
ontology.rdf
```

소스 파일이 OWL 경우 `ontology.owl`을 사용하십시오. 컴파일러는 항목 폴더에 있는 모든 `.rdf` 또는 `.owl` 파일을 받아들입니다, 하지만 `ontology.rdf`와 `ontology.owl`은 저장소 규범입니다.

---

## 단계 3: 기여 유형 선택하기

하나 선택하세요:

- 커뮤니티 기여:

```text
catalogue/community/<github-username>/<ontology-slug>/
```

이것은 원래 기여자 제출에 사용하십시오. 두 개의 경로 세그먼트 모두 필요합니다: GitHub 사용자 이름 폴더와 오노토미 슬러그 폴더입니다.

- 외부 출처 기여:

```text
catalogue/external/<source-name>/<ontology-slug>/
```

이것을 적절한 라이센스와 명확한 출처로 외부 소스에서 가져온 엔톨로지에만 사용하십시오.

폴더를 만들고 두 개의 파일을 추가합니다.

1. `ontology.rdf` 또는 `ontology.owl`
2. `metadata.json`

---

## 단계 4: metadata.json 생성합니다.

이 시작 템플릿을 사용하세요:

```json
{
  "name": "My Ontology",
  "description": "Short business-focused description",
  "category": "general",
  "icon": "🧭",
  "tags": ["demo", "ontology"],
  "author": "<github-username>"
}
```

필수 필드는 `name`, `description`, `category`. 카탈로그 ID는 폴더 경로에서 파생되므로 `id` 필드를 추가하지 마십시오. 스키마에 처음 추가되지 않는 한 추가 메타데이터 필드는 허용되지 않습니다.

지원되는 범주는 다음과 같습니다.

```text
retail, healthcare, finance, manufacturing, education, food, media, events, technology, general, school, fibo
```

---

## 단계 5: 로컬로 검증하기

달리다:

```bash
npm run catalogue:build
npm run validate
```

선택 사항인 전체 확인:

```bash
npm test
npm run build
```

성공 기준:

- 카탈로그 컴파일 성공.
- 검증/빌드에는 오류가 없습니다.
- 항목이 생성된 카탈로그 출력에 나타납니다.
- 푸시 요청의 경우, 오노토미 미리보기 워크플로는 PR 토론에 그래프 PNG를 렌더링해야 합니다.

---

## 단계 6: 커밋하고 푸시 요청을 열기

1. 지점을 생성합니다.

```bash
git checkout -b feature/add-ontology-<ontology-slug>
```

2. 파일을 체크인합니다.
3. 브랜치를 당신의 포크에 밀어 넣으십시오.
4. `main`에 대한 PR 열기.

제안된 PR 제목:

```text
feat: add community ontology <ontology-slug>
```

PR 설명에 포함:

- 도메인/사용 사례
- 엔터티 및 관계 수
- 이 논리가 다른 사람들에게 왜 유용할까요?
- 그것이 새거나 기존 카탈로그 항목과 실질적으로 다른지 확인하기

---

## 라이브 데모 스크립트(5-7분)

1. 카탈로그에서 온톨로지론을 열기.
2. Designer에서 편집을 클릭합니다.
3. 하나의 속성과 하나의 관계를 추가합니다.
4. RDF/XML 내보내기.
5. 레포에서 대상 폴더 구조를 표시합니다.
6. 메타데이터.json 추가합니다.
7. 컴파일 명령을 실행합니다.
8. GitHub PR 흐름을 보여주고 생성된 온톨로지 사전 미리보기 이미지를 지적하세요.

---

## 관련 문서 및 기술

- 주요 기여 규칙: [CONTRIBUTING.md](../CONTRIBUTING.md)
- 작성 참조: [docs/authoring-guide.md](authoring-guide.md)
- 메타데이터 스키마: [카탈로그/메타데이터-스키마.json](../../../catalogue/metadata-schema.json)
- 카탈로그 컴파일러: [스크립트/컴파일-카탈로그.ts](../../../scripts/compile-catalogue.ts)
- 기술: [ontology-catalog-import](../.github/skills/ontology-catalog-import/SKILL.md)
- 기술: [커뮤니티-ontology-contribution](../.github/skills/community-ontology-contribution/SKILL.md)
- RDF 섭취 지침: [.github/instructions/rdf-intake.instructions.md](../.github/instructions/rdf-intake.instructions.md)

---

## 문제 해결

- 카탈로그에서 항목이 보이지 않음:
- 폴더 경로가 정확히 `catalogue/community/<github-username>/<ontology-slug>/` 또는 `catalogue/external/<source-name>/<ontology-slug>/`인지 확인하세요.
- 카탈로그 컴파일 다시 실행.
- 검증 오류:
- 스키마에 대한 메타데이터를 확인합니다.
- `id`와 같은 지원되지 않는 메타데이터 필드를 제거합니다.
- RDF/OWL 파일명 및 경로 규약을 확인하세요.
- 누락된 PR 미리보기 이미지:
- PR 카탈로그 RDF, OWL 또는 메타데이터 파일을 변경했는지 확인합니다.
- 미리보기 워크플로우 로그에서 카탈로그 컴파일 또는 렌더링 실패 여부를 확인합니다.
- PR 체크 실패:
- 다시 푸시하기 전에 로컬 빌드 및 테스트를 다시 실행하세요.
