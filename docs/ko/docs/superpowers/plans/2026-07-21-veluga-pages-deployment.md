# Veluga GitHub Pages 배포 구현 계획

> **에이전트 작업자용:** 필수 하위 스킬로 superpowers:subagent-driven-development(권장) 또는 superpowers:executing-plans를 사용하여 이 계획을 작업별로 실행합니다. 단계는 체크박스(`- [ ]`) 구문으로 추적합니다.

**목표:** `veluga-io/Ontology-Playground`에서 한국어 기본 애플리케이션을 게시하고 GitHub Pages 배포를 검증합니다.

**아키텍처:** Microsoft 저장소는 `upstream`으로 유지하고 public Veluga 조직 fork를 `origin`으로 사용하며, 검증된 기능을 `main`을 통해 게시합니다. GitHub Actions는 저장소 이름 기반 경로로 빌드하고 공식 Pages action을 통해 `build` 아티팩트를 배포합니다.

**기술 스택:** Git, GitHub CLI, GitHub Actions, Node.js 22.22.1, Vite 8, GitHub Pages

## 전역 제약 조건

- `microsoft/Ontology-Playground`와의 public fork 관계를 보존합니다.
- 기존 미추적 `.tool-versions` 파일을 스테이징하거나 삭제하지 않습니다.
- force-push하거나 기록을 다시 쓰지 않습니다.
- 배포 URL은 `https://veluga-io.github.io/Ontology-Playground/`이어야 합니다.

---

### 작업 1: Pages 워크플로의 Veluga 대상 설정

**파일:**
- 수정: `.github/workflows/deploy-ghpages.yml`

**인터페이스:**
- 입력: 기존 Vite `VITE_BASE_PATH` 빌드 계약
- 출력: `veluga-io/Ontology-Playground`에서만 Node.js 22.22.1로 실행되는 Pages 워크플로

- [ ] **1단계: 현재 워크플로 조건과 Node 버전 확인**

```bash
rg -n "github.repository|node-version" .github/workflows/deploy-ghpages.yml
```

예상 결과: `microsoft/Ontology-Playground` 조건 2개와 `node-version: 20`

- [ ] **2단계: 워크플로 업데이트**

두 작업 조건을 다음과 같이 변경합니다.

```yaml
if: github.repository == 'veluga-io/Ontology-Playground'
```

setup-node 입력을 다음과 같이 변경합니다.

```yaml
node-version: 22.22.1
```

- [ ] **3단계: 워크플로와 애플리케이션 검증**

```bash
rg -n "veluga-io/Ontology-Playground|node-version: 22.22.1" .github/workflows/deploy-ghpages.yml
npm test
npm run build
git diff --check
```

예상 결과: Veluga 조건 2개, Node.js 22.22.1, 전체 테스트 통과 및 두 애플리케이션 빌드 성공

- [ ] **4단계: 워크플로와 계획 커밋**

```bash
git add .github/workflows/deploy-ghpages.yml docs/superpowers/plans/2026-07-21-veluga-pages-deployment.md docs/ko/docs/superpowers/plans/2026-07-21-veluga-pages-deployment.md
git commit -m "ci: deploy Veluga fork to GitHub Pages"
```

### 작업 2: 조직 fork 생성 및 main 게시

**파일:**
- 소스 파일 변경 없음

**인터페이스:**
- 입력: 검증된 `feature/korean-default-ui` 브랜치
- 출력: 한국어 기본 릴리스가 `main`에 있는 `veluga-io/Ontology-Playground`

- [ ] **1단계: public 조직 fork 생성**

```bash
gh repo fork microsoft/Ontology-Playground --org veluga-io --clone=false
```

예상 결과: `https://github.com/veluga-io/Ontology-Playground`가 public fork로 존재

- [ ] **2단계: upstream과 게시 remote 분리**

```bash
git remote rename origin upstream
git remote add origin https://github.com/veluga-io/Ontology-Playground.git
git remote -v
```

예상 결과: `origin`은 Veluga, `upstream`은 Microsoft를 가리킴

- [ ] **3단계: 기능을 main에 병합**

```bash
git switch main
git merge --no-ff feature/korean-default-ui -m "feat: add Korean default experience"
```

예상 결과: 충돌 없이 병합되고 `.tool-versions`는 미추적 상태 유지

- [ ] **4단계: 병합 결과 검증 및 푸시**

```bash
npm test
npm run build
git status --short
git push -u origin main
```

예상 결과: 테스트와 빌드 통과, `.tool-versions`만 미추적, `main`이 `origin/main` 추적

### 작업 3: GitHub Pages 활성화 및 검증

**파일:**
- 소스 파일 변경 없음

**인터페이스:**
- 입력: 푸시된 `main` 브랜치와 Pages 워크플로
- 출력: 정상 동작하는 public Pages 배포

- [ ] **1단계: GitHub Actions를 Pages 원본으로 구성**

```bash
gh api --method POST repos/veluga-io/Ontology-Playground/pages -f build_type=workflow
```

예상 결과: Pages가 `build_type: workflow`를 반환합니다. 이미 활성화된 응답은 현재 설정을 확인한 후 허용합니다.

- [ ] **2단계: Pages 워크플로 대기**

```bash
gh run list --repo veluga-io/Ontology-Playground --workflow deploy-ghpages.yml --limit 1
gh run watch --repo veluga-io/Ontology-Playground --exit-status
```

예상 결과: 빌드 및 배포 작업이 `success`로 완료

- [ ] **3단계: 저장소와 배포 상태 확인**

```bash
gh api repos/veluga-io/Ontology-Playground/pages
curl --fail --location https://veluga-io.github.io/Ontology-Playground/
```

예상 결과: Pages가 예상 URL을 반환하고 배포된 HTML이 정상적으로 로드됨
