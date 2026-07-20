# 카탈로그 제출을 위한 GitHub OAuth 설정

엔트로지에이터 디자이너의 **카탈로그 제출** 버튼을 사용하면 사용자가 브라우저에서 직접 푸시 요청을 생성할 수 있습니다. [GitHub Device Flow](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#device-flow)을 사용하여 서버 측 비밀이 필요하지 않습니다. **클라이언트 ID**만 필요합니다.

> **클라이언트 ID 없음**에도 이 기능은 여전히 작동합니다: 사용자는 "RDF 다운로드"를 볼 수 있습니다.
> 버튼을 클릭하고 수동으로 PR 제출할 수 있습니다.

## 1. GitHub OAuth 앱을 생성하세요.

1. **GitHub → 설정 → 개발자 설정 → OAuth 앱 → 새 OAuth 앱**으로 이동하거나 https://github.com/settings/applications/new 방문하세요.
2. 양식을 작성하세요:

| 필드 | 값 |
   |-------|-------|
| **응용 프로그램 이름** | Ontology Playground(또는 원하는 무엇이든) |
| **홈페이지 URL** | 배포된 사이트 URL, 예를 들어 `https://yoursite.example.com` |
| **인증 회신 URL** | `https://github.com/login/device` |

3. **신청 등록**을 클릭합니다.
4. 다음 페이지에서 **클라이언트 ID**를 복사합니다(기기 흐름에 대한 클라이언트 비밀은 필요하지 않습니다).

## 2. 장치 흐름 활성화하기

기본적으로 새 OAuth 앱에는 기기 흐름이 비활성화되어 있습니다.

1. OAuth 앱 설정 페이지에서 **기기 흐름**으로 스크롤합니다.
2. **기기 흐름 활성화**를 선택합니다.
3. 저장.

## 3. 환경 변수 설정하기

`.env` 파일에 클라이언트 ID를 추가하세요:

```env
VITE_GITHUB_CLIENT_ID=Iv1.abc123def456
```

또는 CI/CD 환경(예: GitHub Actions 비밀, Azure SWA 앱 설정)에 설정하세요.

`.env`을 변경한 후 개발 서버를 다시 시작하세요:

```bash
npm run dev
```

## 작동 방식

1. 사용자가 디자이너에서 **카탈로그에 제출**을 클릭합니다.
2. 앱은 GitHub 디바이스 플로우를 시작합니다: 사용자에게 일회성 코드와 https://github.com/login/device에 대한 링크가 표시됩니다.
3. 사용자는 GitHub 코드를 입력하고 앱을 승인합니다(범위: `public_repo`).
4. 앱은 액세스 토큰을 받습니다(`localStorage`에 저장됨).
5. 앱은 상류 저장소를 분할하고, 브랜치를 생성하고, RDF + 메타데이터 파일을 커밋하고, 푸시 요청을 열며, 모두 GitHub REST API를 통해 수행합니다.

## 범위

앱은 `public_repo` 범위를 요청하여 다음과 같은 작업을 수행할 수 있습니다.

- 상류 저장소를 분할
- 포크에서 브랜치와 커밋을 생성하세요.
- 상류 저장소에 대한 푸시 요청을 열기

그것은 **접근**을 요청하지 않습니다. 개인 저장소나 다른 어떤 권한도요.

## 접근 권한 취소

사용자는 **GitHub → 설정 → 응용 프로그램 → 승인된 OAuth 응용 프로그램**에서 언제든지 앱에 대한 액세스를 취소할 수 있습니다.

## 문제 해결

| 문제 | 해결 |
|---------|-----|
| "GitHub 로그인" 대신 "RDF 다운로드"가 표시됨 | `VITE_GITHUB_CLIENT_ID`이 비어 있거나 설정되지 않았습니다. `.env` 파일을 확인하고 개발 서버를 다시 시작하십시오. |
| 기기 흐름이 404 또는 오류를 반환합니다 | OAuth 앱 설정에서 **기기 흐름 활성화**를 체크한지 확인하세요. |
| PR 생성 시 "통합으로 접근할 수 없는 자원" | 사용자의 토큰이 만료되었을 수 있습니다. 로그아웃하고 다시 권한을 부여하십시오. |
| `github.com/login/device/code`에 있는 CORS 오류 | 장치 흐름 엔드포인트는 `Accept: application/json`이 필요합니다. 이것은 앱에서 자동으로 처리됩니다. |
