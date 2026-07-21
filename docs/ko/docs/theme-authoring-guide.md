# 테마 작성 가이드

새로운 색상 테마를 Ontology Playground 어떻게 연결합니까?

테마는 **CSS 변수에 기반**합니다. 테마는 기본값을 대체하는 이름 지정된 CSS 사용자 정의 속성 값 세트이며 Zustand 스토어에 약간의 등록이 추가되어 테마가 피커에 표시되고 세션 간에 기억됩니다. 테마를 추가하려면 그래프, 디자이너 또는 학습 컴포넌트를 만지지 **. 이들은 런타임에서 CSS 변수에서 색상을 읽습니다.

---

## 개요적인 아키텍처

네 가지 구성 요소가 있습니다. 처음 세 개는 [`src/store/appStore.ts`](../../../src/store/appStore.ts)에 있고, 네 번째는 [`src/styles/app.css`](../../../src/styles/app.css)에 있습니다.

| 부품 | 그것이 하는 일 |
| --- | --- |
| `ThemeId` 연합 | 유효한 테마 아이디 집합. |
| `THEME_OPTIONS` | 헤더 테마 선택기를 실행합니다(id, 레이블, 샘플). |
| `themeClass(theme)` | 테마 ID를 테마 루트의 CSS 클래스로 매핑합니다. |
| CSS 토큰 블록 | 해당 클래스에 키가 지정된 실제 색상 값. |

두 명의 조력자가 그것을 하나로 묶는다:

- `isDarkTheme(theme)` / `DARK_BASED_THEMES` - 테마가 어두운 기본 팔레트를 사용하는지 여부를 선언합니다. 이는 스토어의 파생된 `darkMode` 플래그를 설정하여 그래프 렌더링 페일백, 노드 레이블 백플래트 및 PNG 내보내기 배경을 제어합니다.
- `setTheme(theme)` - `localStorage['theme']`에 대한 선택을 유지하고 `{ theme, darkMode }`을 업데이트합니다.

### 테마 수업이 적용되는 곳

`themeClass(theme)`은 각 상위 수준 서피스의 루트 요소에 부착됩니다. **`<body>`**에는 부착되지 않습니다.

- [`src/App.tsx`](../../../src/App.tsx) → `app-container ${themeClass(theme)}`
- [`src/components/OntologyDesigner.tsx`](../../../src/components/OntologyDesigner.tsx) → `designer-page ${themeClass(theme)}`
- [`src/components/LearnPage.tsx`](../../../src/components/LearnPage.tsx) → `learn-page ${themeClass(theme)}`

`:root`(그리고 따라서 `<body>`)는 항상 **다크** 기본값을 가지고 있습니다. 그것이 왜 중요한지 [Gotcha 1](#gotcha-1-the-body-stays-dark)을 참조하십시오.

### `themeClass` 레이어 클래스 분류 방법

```ts
export function themeClass(theme: ThemeId): string {
  switch (theme) {
    case 'light':   return 'light-theme';
    case 'aurora':  return 'theme-aurora';
    case 'crimson': return 'light-theme theme-crimson'; // layered
    default:        return ''; // dark = :root defaults
  }
}
```

`crimson`은 **두** 클래스를 반환합니다. `.light-theme`은 전체 밝은 값 세트를 제공합니다; `.theme-crimson` 단지 그것을 진홍색으로 만드는 몇 개의 토큰을 덮어쓰는 것입니다. 밝은 기반 테마도 똑같이 해야 하므로 모든 토큰을 다시 지정하지 않아도 됩니다. 어두운 기반 테마는 `:root`이 이미 어두운 기본이기 때문에 단일 클래스를 반환할 수 있습니다.

---

## 토큰 계약

[`src/styles/app.css`](../../../src/styles/app.css)의 `:root`는 모든 토큰을 정의합니다. 테마 블록은 변경해야 하는 하위 집합을 대체합니다. 생략한 모든 항목은 `:root`(다크 테마용) 또는 `.light-theme`(그 위에 레이어링된 테마용)으로 대체됩니다.

| 그룹 | 토큰 | 메모 |
| --- | --- | --- |
| 악센트 | `--ms-blue`, `--ms-blue-dark`, `--ms-blue-light`, `--info` | 버튼, 링크, 강조 표시에 걸쳐 사용되는 기본 악센트. 악센트 색상을 다시 브랜드하려면 이를 대체하십시오. |
| 강조점 앞면 | `--on-accent` | 텍스트/아이콘 색상이 강조색 채우기(예: `.btn-primary`) **위에** 배치됩니다. `--ms-blue`에 대해 4.5:1을 지워야 합니다. 흰색은 어두운 강조점에 적합합니다; **밝은** 강조점(예: Aurora의 민트)은 **어두운** 값이 필요합니다. 대체되지 않는 한 `:root`(흰색)에서 상속됩니다. |
| 통계 타일 | `--stat-blue`, `--stat-green`, `--stat-purple` | Ontology-Insights 지표 타일에 대한 아이콘 + 값 색상이 있으며, `--bg-secondary` 위에 투명한 색조를 적용합니다. 각 타일은 합성 타일에 대해 **3:1**을 깨끗이 해야 합니다. 어두운 테마는 **밝은** `:root` 세트를 상속하며; 밝은 테마는 **더 어두운** `.light-theme` 세트를 상속합니다. 사이드바에 특이한 배경을 사용하는 경우에만 대체합니다. |
| 옐로우 프론트그라운드 | `--ms-yellow-fg` | 옐로우 **텍스트 + 아이콘**의 색상 - 머리글 포인트/배지, 퀘스트 포인트, 패스파인더 경고, 활성 디자이너 ID 스위치. 텍스트로서는 **4.5:1**을 충족해야 합니다. 어두운 테마는 밝은 `:root` `#FFB900`을 상속받습니다. 밝은 옐로우는 흰색에서 실패하기 때문에(~1.7:1) 밝은 테마는 어두운 `.light-theme` 골드(`#8A6A00`를 상속받습니다. 브랜드 **필드** `--ms-yellow`(검은색 텍스트와 짝을 이룹니다)과 다릅니다. 둘을 혼동하지 마세요. |
| 진행 채우기 | `--progress-from`, `--progress-to` | `.progress-fill`,의 두 가지 그라데이션 스톱은 `--bg-tertiary` 트랙 위에 페인팅됩니다. **둘 다** 해당 트랙에 대해 **3:1**을 깨끗이 해야 합니다(SC 1.4.11). 어두운 기반 테마에서는 밝게; `.light-theme`의 강조/보라색 쌍; 오로라와 크롬브리는 그들의 독특한 색조를 유지하기 위해 `--progress-from`을 대체합니다. |
| 서피스 | `--bg-primary`, `--bg-secondary`, `--bg-tertiary`, `--bg-elevated` | 페이지 및 패널 배경, 가장 밝음 → 가장 높음. |
| 텍스트 | `--text-primary`, `--text-secondary`, `--text-tertiary` | 앞쪽 텍스트, 기본 → 음소거. |
| 경계 | `--border-color`, `--border-subtle` | 패널/컨트롤 경계를. |
| 그림자 | `--shadow-glow` | 강조 표시 효과; 강조 표시 효과와 일치하도록 색상을 조정하세요. |
| 그래프 | `--graph-bg`, `--graph-node-text`, `--graph-edge-color`, `--graph-edge-text`, `--graph-edge-label-bg` | 그래프 + 디자이너 미리보기에서 런타임에 읽습니다. `--graph-edge-label-bg`은 경계 레이블 뒤에 있는 **투명한** 칩입니다; 경계 텍스트는 그걸에 대해 4.5:1로 깨끗해야 합니다. **이러한 모든 것을 대비로 조정하세요** - [액세스ibilidade](#accessibility-wcag-21-aa-contrast)를 참조하세요. |
| 캔버스 체커 | `--chess-square-dark`, `--chess-square-light` | 그래프 캔버스 배경 패턴. `--chess-square-light`은 **단색 기본**입니다 - [Gotcha 1](#gotcha-1-the-body-stays-dark)을 참조하십시오. |
| 링크에 관하여 | `--about-link-color`, `--about-link-hover-color` | 소개 화면의 링크. |

> 악센트 토큰은 역사적으로 `--ms-*`로 이름이 지정되었습니다. 그것들을 일반 악센트로 취급하세요.
> 변수 - 이름은 우연적인 이름입니다.

---

## 6단계로 테마 추가하기

실행되는 예시는 **인디고**라는 어두운 테마입니다. 밝은 테마와 다른 점은 인라인에서 명시되어 있습니다.

### 1. `ThemeId` 연합을 확장하세요 - `appStore.ts`

```ts
export type ThemeId = 'dark' | 'light' | 'aurora' | 'crimson' | 'indigo';
```

### 2. `THEME_OPTIONS` - `appStore.ts`에 등록하세요.

```ts
export const THEME_OPTIONS: { id: ThemeId; label: string; swatch: string }[] = [
  { id: 'dark',    label: 'Dark',    swatch: '#1B1B1B' },
  { id: 'light',   label: 'Light',   swatch: '#F5F5F5' },
  { id: 'aurora',  label: 'Aurora',  swatch: '#2AAA92' },
  { id: 'crimson', label: 'Crimson', swatch: '#D6002A' },
  { id: 'indigo',  label: 'Indigo',  swatch: '#4F46E5' }, // swatch = the dot in the picker
];
```

`swatch`는 피커 메뉴의 레이블 옆에 표시되는 색상 점입니다. 테마의 독특한 강조점을 사용하세요.

### 3. 다크 모드 vs 라이트 모드 선언 - `appStore.ts`

다크 기반 테마는 `DARK_BASED_THEMES`에 들어갑니다:

```ts
const DARK_BASED_THEMES: ThemeId[] = ['dark', 'aurora', 'indigo'];
```

**빛 기반** 테마는 이 목록에서 제외되었습니다(따라서 `darkMode`는 `false`가 됩니다).

### 4. id를 CSS 클래스로 매핑하세요 - `appStore.ts`

```ts
export function themeClass(theme: ThemeId): string {
  switch (theme) {
    case 'light':   return 'light-theme';
    case 'aurora':  return 'theme-aurora';
    case 'crimson': return 'light-theme theme-crimson';
    case 'indigo':  return 'theme-indigo';                  // dark-based: single class
    // a light-based theme would return 'light-theme theme-<id>'
    default:        return '';
  }
}
```

### 5. CSS 토큰 블록을 추가하세요 - `app.css`

가장 가까운 기존 블록을 복사하고(어두운 경우 `.theme-aurora`, 밝은 경우 `.theme-crimson`) 다시 조정합니다. 기존 테마 블록 뒤에 배치합니다.

```css
/* Indigo theme — deep indigo base with violet accents (dark) */
.theme-indigo {
  --ms-blue: #4F46E5;
  --ms-blue-dark: #4338CA;
  --ms-blue-light: #6366F1;
  --info: #4F46E5;
  --on-accent: #FFFFFF;       /* white clears 4.5:1 on this indigo accent */
  --ms-yellow-fg: #FFB900;    /* amber text/icons; a light theme needs ~#8A6A00 */
  --progress-from: #818CF8;   /* both progress stops need 3:1 on --bg-tertiary */
  --progress-to: #C4B5FD;

  --bg-primary: #15172B;
  --bg-secondary: #1C1F3A;
  --bg-tertiary: #262A4D;
  --bg-elevated: #20233F;
  --text-primary: #EEF0FF;
  --text-secondary: #B9BEE6;
  --text-tertiary: #8489B8;
  --border-color: #343A66;
  --border-subtle: #262A4D;

  --shadow-glow: 0 0 20px rgba(99, 102, 241, 0.35);

  --graph-bg: #14162A;
  --graph-node-text: #CDD2FF;
  --graph-edge-color: #686DAE;
  --graph-edge-text: #9AA0D6;
  --graph-edge-label-bg: #181A2E;   /* opaque chip behind edge labels */

  --chess-square-dark: rgba(40, 44, 90, 0.85);
  --chess-square-light: rgba(30, 33, 70, 0.65);
  --about-link-color: #A5B4FC;
  --about-link-hover-color: #C7D2FE;
}
```

**라이트 기반** 테마의 경우, `.theme-<id>`를 `.light-theme`, 위에 레이어링하기 위해 우선적으로 적용하고, `--chess-square-light`를 **투명하지 않은** 라이트 색상으로 설정하세요(Gotcha 1 참조).

### 6. 증명하다

[테스트 체크리스트](#testing-checklist)을 실행합니다.

그게 다야 - 그래프, 디자이너 미리보기, 학습 페이지가 새로운 `--graph-*`와 서피스 토큰을 자동으로 가져온다.

---

## 함정들

### 알았어 1: `<body>`가 어두워진다

테마 클래스는 `.app-container` / `.designer-page` / `.learn-page`에 적용되며 `<body>`에는 적용되지 않습니다. `<body>`는 `:root`의 어두운 배경(`#1B1B1B`)을 유지합니다. **투명하거나 반투명 배경**이 있는 모든 요소에서는 어두운 본문 배경이 드러날 수 있습니다.

이것은 **그래프 캔버스를** 찔러요. 그 배경은 `.graph-container`,의 체스 패턴이며, 그 단단한 기본은 `--chess-square-light`.

```css
.graph-container {
  background-image: /* squares painted with var(--chess-square-dark) */;
  background-color: var(--chess-square-light); /* the solid base */
}
```

`--chess-square-light`이 밝은 테마에서 투과성이 있다면, 어두운 바디가 새어나와 캔버스가 어두워져 어두운 노드 레이블이 읽을 수 없게 됩니다. (이것은 Crimson의 실제 버그였습니다.)

**규칙:** 밝은 테마의 경우, `--chess-square-light`은 **투명하지 않은** 밝은 색이어야 합니다. 비교:

```css
/* WRONG — translucent base, dark body shows through */
--chess-square-light: rgba(214, 0, 42, 0.03);

/* RIGHT — opaque light base */
--chess-square-light: #FBF7F8;
```

어두운 기반의 테마는 그 뒤에 있는 바디가 이미 어두워서 투명한 값을 사용할 수 있습니다.

### Gotcha 2: 그래프 색상은 프로프가 아니라 CSS 옵니다.

`OntologyGraph`과 디자이너의 `GraphPreview` `getComputedStyle`에서 `--graph-node-text`, `--graph-edge-color`, `--graph-edge-text`, `--graph-edge-label-bg`을 읽고 활성화된 `theme`이 변경될 때 다시 읽습니다. 따라서 **테마 블록에서 `--graph-*` 토큰을 정의하는 것이 전부입니다** - 컴포넌트나 TypeScript 편집이 필요 없습니다. `--graph-bg`(및 `--graph-edge-label-bg`에 대한 에지 텍스트)와의 대비를 위해 조정하십시오. [액세시비티](#accessibility-wcag-21-aa-contrast)를 참조하십시오.

### Gotcha 3: `DARK_BASED_THEMES`에 다크 기반 테마를 등록하세요.

`isDarkTheme()`는 스토어의 `darkMode` 플래그를 공급하여 초기 그래프 페일백 색상, 노드 레이블 백플래트(`text-background-color` 및 PNG 내보내기 배경을 설정합니다. `DARK_BASED_THEMES`,에 어두운 테마가 없으면 그래프는 잠시 밝은 기본값으로 페일백되고 레이블은 밝은 백플래트를 얻을 수 있습니다.

### Gotcha 4: `.light-theme` 위에 레이어 라이트 테마 적용하기

`themeClass`에서 `'light-theme theme-<id>'`을 반환하면 블록이 모든 라이트 토큰을 상속하고 고유한 것만 덮어쓸 수 있습니다. 단일 클래스를 반환하면 전체 토큰 세트를 다시 지정해야 하거나 실수로 다크 기본값을 상속해야 합니다.

---

## 접근성(WCAG 2.1 AA 대비)

모든 테마는 **WCAG 2.1 레벨 AA** 대비율을 충족해야 합니다. 이는 마이크로소프트의 접근성 인사이트 표준이 확인하는 기준입니다. 결정론적 테스트는 **모든** 테마에 이를 강제하므로 새로운 테마나 토큰 튜닝은 실패하는 색상을 조용히 배포할 수 없습니다.

- **본문 텍스트**(`--text-primary`, `--text-secondary`)와 **목소리 없는 텍스트**(`--text-tertiary`)는 그들이 앉는 표면(`--bg-primary`, `--bg-secondary`, `--bg-elevated`)에 대해 **4.5:1**이 필요합니다.
- **언티악스 버튼 레이블**(`--on-accent`)는 `--ms-blue`에 대해 **4.5:1**이 필요합니다.
- **그래프 레이블**은 **4.5:1**이 필요합니다. - 노드 텍스트는 `--graph-bg`에 대립하고, 에지 텍스트는 불투명한 `--graph-edge-label-bg` 칩에 대립합니다.
- **그래프 에지 라인**(`--graph-edge-color`)은 그래픽 객체이며 `--graph-bg`(SC 1.4.11 비문자 대비)에 대해 **3:1**이 필요합니다.
- **상태 카드 타일** - 측정값 아이콘과 대문자 값(`--stat-blue`, `--stat-green`, `--stat-purple`)은 그래픽 객체/대문자 텍스트이며 `--bg-secondary`에 합성된 투과성 타일에 대해 **3:1**이 필요합니다. 아이콘을 완전한 투명도로 유지하십시오(`0.7` 페이드는 이를 바닥 아래로 떨어뜨립니다).
- **앰버 텍스트 + 아이콘** (`--ms-yellow-fg`) — 머리글 포인트/배지, 퀘스트 포인트, 패스파인더 경고, 활성 디자이너 ID 스위치 —은 정상적인 텍스트이며 그 표면과 **4.5:1**이 필요합니다. 밝은 앰버는 어두운 배경에서만 이 효과를 제거하므로, 라이트 기반 테마는 이를 더 어두운 금색으로 낮춥니다.
- **진행률 표시줄 채우기**(`--progress-from`, `--progress-to`) - 두 가지 그라데이션 스톱 모두 그래픽 객체이며 `--bg-tertiary` 트랙(SC 1.4.11)에 대해 **3:1**이 필요합니다.

한계값은 바닥입니다 - `4.49:1`이 실패합니다.

### 실행하세요

```bash
npm run test:a11y
```

테스트 파일([`src/a11y/themeContrast.test.ts`](../../../src/a11y/themeContrast.test.ts))은 [`src/styles/app.css`](../../../src/styles/app.css)를 파싱하고, 각 테마의 토큰을 해석하며, 모든 텍스트/비텍스트 쌍이 임계값을 지키는지 확인합니다. CI(**"접근성 - WCAG 2.1 AA 대비"** 단계)와 `npm test`에서 실행되므로 회귀가 있으면 빌드가 실패합니다. 실패 시 정확한 비율과 두 토큰이 출력됩니다. 예: `--text-tertiary (#808080) on --bg-secondary (#2D2D2D) = 3.49:1, needs >= 4.5:1`. 실패한 토큰을 임계값을 충족할 만큼 밝거나 어둡게 조정한 뒤 다시 실행하세요.

> **가벼운 악센트는 어두운 레이블 텍스트가 필요합니다.** 밝은 악센트에 흰색은 AA를 통과하지 못합니다.
> (오로라의 민트 `#2AAA92` + 흰색 = 2.89:1). 그것이 `--on-accent`의 용도입니다:
> 밝은 강조를 위해 어두워지고 어두운 강조를 위해 흰색으로 설정하세요(오로라에서는 `#08221D`를 사용합니다).
> 악센트. 악센트가 풍부한 컨트롤은 `color: var(--on-accent)`을 사용합니다.

---

## 테스트 체크리스트

```bash
npm run dev          # then switch to the new theme in the header picker
```

새로운 테마에서 확인하세요:

- [ ] **주요 그래프** (홈, 온톨로지 loaded): 노드 레이블, 에지 레이블 및 에지는 `--graph-bg`에 대해 읽을 수 있습니다; 캔버스 배경은 테마와 일치합니다 (방치된 어두운/검은색 패널이 아닙니다 - Gotcha 1).
- [ ] **디자이너** (`#/designer`, 템플릿 로드, 그래프 탭): 미리보기가 읽을 수 있습니다.
- [ ] **학습 페이지** (`#/learn`): 표면과 텍스트가 올바르게 읽힌다.
- [ ] **픽커**: 새로운 스샷 + 레이블이 나타나고 체크 표시가 선택 항목을 추적합니다.
- [ ] **지속성**: 페이지를 다시 로드하세요 - 테마가 기억됩니다.
- [ ] **회귀 없음**: 다크, 라이트, 오로라, 그리고 크롬브린은 여전히 올바르게 보입니다.
- [ ] **대조**: `npm run test:a11y`는 새로운 테마(WCAG 2.1 AA)에 대해 녹색입니다.

그러면:

```bash
npm run test:a11y    # WCAG 2.1 AA contrast for every theme (also runs in CI)
npx tsc --noEmit     # type-check (the ThemeId union change is covered here)
npm run build        # full production build
```

> `npm run build`은 새 타임 스탬프로 `public/learn.json`을 재생성합니다. 만약 그렇다면
>는 유일한 변경 사항입니다. 제출하기 전에 되돌려주세요:
> `git checkout -- public/learn.json`.

---

## 당신이 만지는 파일들

| 파일 | 변경 |
| --- | --- |
| [`src/store/appStore.ts`](../../../src/store/appStore.ts) | `ThemeId`, `THEME_OPTIONS`, `DARK_BASED_THEMES`, `themeClass()` |
| [`src/styles/app.css`](../../../src/styles/app.css) | 하나의 `.theme-<id>` 토큰 블록 |

다른 모든 것(그래프, 디자이너, 학습, 픽커 UI)은 자동으로 적응합니다.
