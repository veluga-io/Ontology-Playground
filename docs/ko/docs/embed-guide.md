# 엔터프리징 오노톨로지 위젯

단일 스크립트 태그로 모든 웹 페이지에 대화형 온톨로지적 시각화를 추가하세요.

## 빠른 시작

`YOUR_SITE_URL`을 Ontology Playground 앱이 배포된 URL로 대체하세요.

```html
<div class="ontology-embed"
     data-catalogue-id="official/cosmic-coffee"
     data-catalogue-base-url="YOUR_SITE_URL/"
     data-theme="dark"
     data-height="500px">
</div>
<script src="YOUR_SITE_URL/embed/ontology-embed.js"></script>
```

그게 다야! 이 위젯은 카탈로그에서 오노토지를 로드하고 대화형 그래프를 렌더링합니다.

## 사용 가능한 엔톨로지

| 카탈로그 ID | 이름 | 엔터티 | 관계 |
|---|---|---|---|
| `official/cosmic-coffee` | Fourth Coffee | 6 | 7 |
| `official/ecommerce` | 전자상거래 플랫폼 | 5 | 6 |
| `official/finance` | 은행 및 금융 | 5 | 6 |
| `official/healthcare` | 의료 시스템 | 5 | 6 |
| `official/manufacturing` | 스마트 제조 | 5 | 5 |
| `official/university` | 대학 시스템 | 5 | 6 |

## 예시들

### 전자상거래(다크 테마)

```html
<div class="ontology-embed"
     data-catalogue-id="official/ecommerce"
     data-catalogue-base-url="YOUR_SITE_URL/"
     data-theme="dark"
     data-height="500px">
</div>
<script src="YOUR_SITE_URL/embed/ontology-embed.js"></script>
```

### 의료 서비스 (경량 테마)

```html
<div class="ontology-embed"
     data-catalogue-id="official/healthcare"
     data-catalogue-base-url="YOUR_SITE_URL/"
     data-theme="light"
     data-height="500px">
</div>
<script src="YOUR_SITE_URL/embed/ontology-embed.js"></script>
```

### 한 페이지에 여러 개의 포함 콘텐츠

스크립트를 **한 번** 하단에 포함시킨 다음 원하는 만큼의 인포그램밍 디비를 추가하세요:

```html
<div class="ontology-embed"
     data-catalogue-id="official/finance"
     data-catalogue-base-url="YOUR_SITE_URL/"
     data-theme="dark"
     data-height="400px">
</div>

<div class="ontology-embed"
     data-catalogue-id="official/manufacturing"
     data-catalogue-base-url="YOUR_SITE_URL/"
     data-theme="dark"
     data-height="400px">
</div>

<!-- Load the script once -->
<script src="YOUR_SITE_URL/embed/ontology-embed.js"></script>
```

## 로드 방법

### 카탈로그에서 (추천)

```html
<div class="ontology-embed"
     data-catalogue-id="official/university"
     data-catalogue-base-url="YOUR_SITE_URL/"
     data-theme="dark"
     data-height="500px">
</div>
```

### URL(RDF/XML 또는 JSON)에서

```html
<div class="ontology-embed"
     data-ontology-url="https://example.com/my-ontology.rdf"
     data-theme="dark"
     data-height="500px">
</div>
```

### 인라인(base64-encode JSON)

당신의 논리형 JSON base64로 인코딩하고 그것을 직접 전달하세요:

```html
<div class="ontology-embed"
     data-ontology-inline="eyJuYW1lIjoiTXkgT250b2xvZ3kiLC4uLn0="
     data-theme="light"
     data-height="400px">
</div>
```

## 구성 옵션

| 속성 | 필수 | 기본값 | 설명 |
|---|---|---|---|
| `data-catalogue-id` | 세 가지 출처 중 하나 | — | 카탈로그에서 온톨로지 ID |
| `data-ontology-url` | 세 가지 소스의 하나 | — | RDF/XML 또는 JSON 오노토미 파일의 URL |
| `data-ontology-inline` | 세 가지 소스의 하나 | — | Base64 인코딩된 오노토미 JSON |
| `data-catalogue-base-url` | 아니오 | 현재 페이지 기원 | `catalogue.json`이 호스팅되는 기본 URL |
| `data-theme` | 아니오 | `dark` | 색상 테마: `dark` 또는 `light` |
| `data-height` | 아니오 | `500px` | 위젯 높이(모든 CSS 값) |

## 동적 마운팅

페이지 로드 후 인포베이더 컨테이너를 추가하는 경우(예: SPA에서) 다음을 호출하십시오.

```js
window.OntologyEmbed.init();
```

이것은 DOM에서 새로운 `.ontology-embed` 요소를 스캔하고 아직 초기화되지 않은 모든 위젯에 위젯을 마운트합니다.

## 기능

- **상호작용 그래프** - 팬, 확대, 노드 및 경계를 클릭하세요.
- **인스펙터 오버레이** - 어떤 엔터티나 관계를 클릭하면 그 속성을 볼 수 있습니다.
- **RDF 소스 탭** - 복사 버튼을 사용하여 생성된 RDF/XML을 보십시오.
- **어두운 & 밝은 테마** - 사이트의 디자인을 일치시키세요.
- **셀프 컨테이너** - 단일 JS 파일, 외부 CSS 필요 없음

## 라이브 데모

작동 예시는 배포된 사이트의 [샘플 포함 페이지](../../embed/samples.html)를 참조하십시오.
