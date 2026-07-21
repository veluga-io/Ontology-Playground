# TODO: 학습 경로 및 실험실

Learn 섹션은 기사 목록에서 IQ Retail Supply Chain 실험실부터 시작하는 과정(학습 경로 및 실습 실험실) 카탈로그로 변환합니다.

## 1단계 - 기초

- [x] **유형 및 라우터** — `LearnManifest`/`LearnArticle`을 `LearnCourse` 래퍼(`type: 'path' | 'lab'`)로 확장합니다. 학습 경로를 `/#/learn`, `/#/learn/<course>`, `/#/learn/<course>/<article>`의 세 단계로 확장합니다.
- [x] **라우터 테스트** - 과정 + 기사 슬러그를 사용한 새로운 학습 경로에 대한 테스트를 추가합니다.

## 2단계 - 진보적인 범주론

- [x] **카탈로그 항목** - `catalogue/official/iq-lab-retail/` 아래에 6개의 증가하는 하위ontology를 생성하세요:

| 단계 | 카탈로그 ID | 새로운 엔터티 | 누적 |
  |------|-------------|-------------|-----------|
| 1 | `official/iq-lab-retail/step-1` | 고객, 주문, 제품 | 3 |
| 2 | `official/iq-lab-retail/step-2` | + 주문 라인, 제품 카테고리 | 5 |
| 3 | `official/iq-lab-retail/step-3` | + 지역, 매장 | 7 |
| 4 | `official/iq-lab-retail/step-4` | + 배송, 운송업체, 창고 | 10 |
| 5 | `official/iq-lab-retail/step-5` | + 재고, 예측, 수요 신호 | 13 |
| 6 | `official/iq-lab-retail/step-6` | + 프로모션, 반품 | 15 (완료) |

- [x] **sampleOntologies.ts** - 새로운 `"iq-lab"` 카테고리에 있는 sampleOntologies 아래에 6단계 ontologies를 추가합니다.

## 3단계 - 콘텐츠 구조 재구성

- [x] **기존 기사 이동** - `content/learn/*.md` `content/learn/ontology-fundamentals/` 하위 디렉토리로 이동합니다.
- [x] **`_meta.md` 추가** - `ontology-fundamentals`에 대한 과정 수준의 메타데이터 파일을 생성합니다(유형: 경로).
- [x] **실험실 콘텐츠** - `_meta.md`(유형: 실험실)와 7단계 마크다운 파일을 사용하여 `content/learn/iq-lab-retail-supply-chain/` 생성합니다.
1. 시나리오 개요 - 소매 공급망이 왜 필요한가, 우리가 모델링할 내용
2. Core Commerce(Core 커머스) - 고객, 주문, 제품(단계 1 포함)
3. 주문 세부 정보 및 카테고리 - OrderLine, ProductCategory(단계 2 포함)
4. 지리 - 지역, Store(3단계 포함)
5. 배송 및 물류 - 배송, 운송업체, 창고(단계 4를 포함)
6. 재고 및 수요 - 재고, 예측, 수요 신호(단계 5 포함)
7. 모델 완성 - 프로모션, 반품, 전체 그래프 검토(6단계 포함)

## 4단계 - 파이프라인 구축

- [x] **compile-learn.ts** — 하위 디렉토리를 스캔하고, 강의 메타데이터를 위한 `_meta.md` 파싱하고, 평평한 `articles[]` 대신 `courses[]`를 발행하도록 업데이트합니다.

## 5단계 - UI

- [x] **LearnPage.tsx** - 세 가지 보기:
1. **과정 카탈로그** - 유형 배지(경로/실험실)가 있는 각 과정의 카드
2. **과정 세부 정보** - 과정 내의 기사 목록, 실험실 진행 상황
3. **기사 보기** - 기존 렌더러(이미 `<ontology-embed>`를 지원함)

## 단계 6 - 확인하기

- [x] 모든 테스트 통과(`npm test`)
- [x] 빌드가 성공합니다(`npm run build`)
- [x] 카탈로그 렌더링을 올바르게 학습하세요
- [x] 실험 단계에는 점진적인 온톨로지적 통합이 표시됩니다.
- [x] 기존 "온톨로지적 원리" 기사들은 여전히 작동합니다.
