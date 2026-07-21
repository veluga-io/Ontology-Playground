# Veluga GitHub Pages 배포 설계

## 목표

한국어 기본 Ontology Playground를 public `veluga-io/Ontology-Playground` 조직 fork에서 게시하고, `main` 브랜치를 GitHub Pages로 배포합니다.

## 저장소 모델

관련 없는 새 저장소 대신 public 조직 fork를 만듭니다. 이를 통해 `microsoft/Ontology-Playground`와의 업스트림 관계, 커밋 기록 및 MIT 라이선스 출처를 보존합니다. 로컬에서는 Microsoft 저장소를 `upstream` remote로 유지하고 Veluga fork를 `origin`으로 사용합니다.

## 브랜치 및 릴리스 흐름

완료된 `feature/korean-default-ui` 브랜치를 merge commit으로 로컬 `main`에 병합합니다. 업데이트된 `main`을 Veluga fork로 푸시합니다. 기존 미추적 `.tool-versions` 파일은 로컬에 그대로 두고 스테이징하지 않습니다.

## Pages 워크플로

`.github/workflows/deploy-ghpages.yml`의 두 작업이 Microsoft 저장소 대신 `veluga-io/Ontology-Playground`를 대상으로 하도록 수정합니다. 로컬에서 검증한 런타임과 일치하도록 Node.js `22.22.1`을 사용합니다. 저장소 이름에서 계산하는 `VITE_BASE_PATH`, SPA `404.html` 폴백, Pages 아티팩트 업로드 및 `actions/deploy-pages` 릴리스 작업은 유지합니다.

## 검증

게시 전에 전체 테스트와 프로덕션 빌드를 실행합니다. 푸시 후 저장소 Pages 원본을 GitHub Actions로 설정하고 Pages 워크플로 완료를 기다린 다음, 배포 URL `https://veluga-io.github.io/Ontology-Playground/`이 자산 오류 없이 한국어 기본 애플리케이션을 반환하는지 확인합니다.

## 롤백

배포에 실패하면 조직 fork를 유지하고 실패한 Actions 작업을 조사합니다. 기록을 다시 쓰거나 force-push하지 않습니다. 새 브랜치에서 워크플로를 수정하거나 `main`의 배포 전용 커밋을 되돌립니다.
