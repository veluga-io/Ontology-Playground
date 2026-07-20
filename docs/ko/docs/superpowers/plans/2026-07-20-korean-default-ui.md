# 한국어 기본 UI 구현 계획

> **목표:** 한국어를 애플리케이션 기본 언어로 설정하고, 상태가 유지되는 영어 전환 기능을 제공하며, 온톨로지 데이터나 식별자를 번역하지 않고 언어별 학습 콘텐츠를 제공합니다.

## 작업 1: 타입이 지정된 로케일 상태와 번역 추가

**파일:**
- 생성: `src/i18n/messages.ts`
- 생성: `src/i18n/useI18n.ts`
- 생성: `src/store/appStore.locale.test.ts`
- 수정: `src/store/appStore.ts`

1. 모듈을 초기화하고 스토어의 기본값이 `ko`인지, 저장된 `en`을 복원하는지, 잘못된 저장 값을 거부하는지, `setLocale` 변경을 저장하는지 검증하는 테스트를 작성합니다.
2. `npm test -- src/store/appStore.locale.test.ts`를 실행하고 새 테스트가 실패하는지 확인합니다.
3. Zustand 스토어에 `Locale = 'ko' | 'en'`, 안전한 로컬 스토리지 초기화, `locale`, `setLocale`을 추가합니다.
4. 평면 구조의 타입이 지정된 영어/한국어 메시지 사전과 최소한의 보간 헬퍼/훅을 추가합니다.
5. 집중 테스트와 TypeScript 검사를 다시 실행합니다.

## 작업 2: 헤더 언어 선택기 추가 및 셸 지역화

**파일:**
- 생성: `src/components/Header.test.tsx`
- 수정: `src/components/Header.tsx`
- 수정: `src/App.tsx`
- 수정: `src/components/CommandPalette.tsx`
- 수정: `src/components/AppFooter.tsx`
- 수정: `src/styles/app.css`

1. 기본적으로 한국어 헤더 레이블이 나타나고, 현재 온톨로지 이름은 변경되지 않으며, 영어 선택 시 상태가 저장되고 레이블이 전환되는지 확인하는 컴포넌트 테스트를 작성합니다.
2. 집중 테스트를 실행하고 실패하는지 확인합니다.
3. 공유 로케일 상태를 사용하는 간결한 데스크톱 선택기와 모바일 선택기를 추가합니다.
4. 셸 탐색, 동작, 상태, 툴팁, 명령 팔레트 및 푸터의 리터럴을 타입이 지정된 메시지로 교체합니다.
5. 헤더 및 기존 컴포넌트 테스트를 실행합니다.

## 작업 3: 언어별 학습 콘텐츠 컴파일 및 로드

**파일:**
- 수정: `scripts/compile-learn.ts`
- 생성: `scripts/compile-learn.test.ts`
- 수정: `src/components/LearnPage.test.tsx`
- 수정: `src/components/LearnPage.tsx`
- 수정: `src/components/QuizSlide.tsx`
- 수정: `src/components/QuizCompile.test.ts`

1. `learn.ko.json`/`learn.en.json` 이중 출력과 한국어 우선 매니페스트 로드 및 영어 폴백에 대한 실패 테스트를 추가합니다.
2. 기존 단일 디렉터리 컴파일 루틴을 재사용 가능한 로케일 컴파일 함수로 리팩터링하고 호환성을 위해 `learn.json`을 유지합니다.
3. 로케일 변경 시 `LearnPage`가 다시 가져오고 지역화 요청이 실패한 경우에만 영어로 폴백하도록 합니다.
4. 학습 탐색, 과정 유형 레이블, 로딩/오류 상태, 문서 탐색, 프레젠테이션 컨트롤 및 퀴즈 피드백을 지역화합니다.
5. 컴파일러, 학습 페이지 및 퀴즈 테스트를 실행합니다. 관련 없는 콘텐츠를 예기치 않게 덮어쓰지 않았는지 생성 파일을 검사합니다.

## 작업 4: 주요 애플리케이션 작업 흐름 지역화

**파일:**
- 수정: `src/components/GalleryModal.tsx`
- 수정: `src/components/WelcomeModal.tsx`
- 수정: `src/components/GuidedTour.tsx`
- 수정: `src/components/HelpModal.tsx`
- 수정: `src/components/AboutModal.tsx`
- 수정: `src/components/InspectorPanel.tsx`
- 수정: `src/components/QuestPanel.tsx`
- 수정: `src/components/QueryPlayground.tsx`
- 수정: `src/components/PathFinderPanel.tsx`
- 수정: `src/components/ImportExportModal.tsx`
- 수정: `src/components/DataSourcesModal.tsx`
- 수정: `src/components/OntologyDesigner.tsx`
- 수정: `src/components/designer/DesignerActions.tsx`
- 수정: `src/components/designer/EntityForm.tsx`
- 수정: `src/components/designer/RelationshipForm.tsx`
- 수정: `src/components/designer/TemplatePicker.tsx`
- 수정: `src/components/designer/SubmitCatalogueModal.tsx`
- 필요에 따라 이 컴포넌트들과 인접한 기존 테스트 수정

1. 기존 테스트에 한국어 UI 요소와 변경되지 않은 온톨로지 기반 레이블에 대한 대표 실패 검증을 추가합니다.
2. 사용자용 리터럴만 타입이 지정된 사전으로 이동하고, 엔터티 이름, 속성 이름, 샘플 데이터, 쿼리 구문, RDF/JSON 및 파일 형식 식별자는 그대로 둡니다.
3. 보간되는 온톨로지 용어를 유지하면서 생성된 퀘스트 안내를 로케일 인식 템플릿으로 지역화합니다.
4. 작은 변경 그룹마다 영향받는 모든 컴포넌트와 퀘스트 테스트를 실행합니다.

## 작업 5: 문서화 및 검증

**파일:**
- 수정: `README.md`
- 수정: `TODO.md`
- 생성됨: `public/learn.ko.json`
- 생성됨: `public/learn.en.json`
- 생성됨/호환성: `public/learn.json`

1. 한국어 기본값, 헤더 언어 전환, 상태 유지 동작 및 학습 콘텐츠 원본/출력 매핑을 문서화합니다.
2. 관련 없는 로드맵 항목을 변경하지 않고 적용 가능한 지역화 TODO를 완료로 표시합니다.
3. `npm test`를 실행합니다.
4. `npm run build`를 실행합니다.
5. 번역 검증기와 `git diff --check`를 실행합니다.
6. `git status --short`와 최종 diff를 검토하여 기존 `.tool-versions`, 번역 문서 및 생성된 변경 사항이 보존됐는지 확인합니다.
