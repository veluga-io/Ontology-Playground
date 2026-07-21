# Korean-Default UI Implementation Plan

> **Goal:** Make Korean the default application language, retain a persisted English switch, and serve locale-specific learning content without translating ontology data or identifiers.

## Task 1: Add typed locale state and translations

**Files:**
- Create: `src/i18n/messages.ts`
- Create: `src/i18n/useI18n.ts`
- Create: `src/store/appStore.locale.test.ts`
- Modify: `src/store/appStore.ts`

1. Write tests that reset modules and assert the store defaults to `ko`, restores persisted `en`, rejects invalid stored values, and persists `setLocale` changes.
2. Run `npm test -- src/store/appStore.locale.test.ts` and confirm the new tests fail.
3. Add `Locale = 'ko' | 'en'`, safe local-storage initialization, `locale`, and `setLocale` to the Zustand store.
4. Add flat, typed English and Korean message dictionaries plus a minimal interpolation helper/hook.
5. Re-run the focused tests and TypeScript checking.

## Task 2: Add the header language selector and localize the shell

**Files:**
- Create: `src/components/Header.test.tsx`
- Modify: `src/components/Header.tsx`
- Modify: `src/App.tsx`
- Modify: `src/components/CommandPalette.tsx`
- Modify: `src/components/AppFooter.tsx`
- Modify: `src/styles/app.css`

1. Write a component test asserting Korean header labels appear by default, the current ontology name stays unchanged, and selecting English persists and switches labels.
2. Run the focused test and confirm failure.
3. Add a compact desktop selector and a mobile selector using the shared locale state.
4. Replace shell navigation, action, status, tooltip, command-palette, and footer literals with typed messages.
5. Run header and existing component tests.

## Task 3: Compile and load locale-specific learning content

**Files:**
- Modify: `scripts/compile-learn.ts`
- Create: `scripts/compile-learn.test.ts`
- Modify: `src/components/LearnPage.test.tsx`
- Modify: `src/components/LearnPage.tsx`
- Modify: `src/components/QuizSlide.tsx`
- Modify: `src/components/QuizCompile.test.ts`

1. Add failing tests for dual `learn.ko.json`/`learn.en.json` output and for Korean-first manifest loading with English fallback.
2. Refactor the compiler's existing single-directory routine into a reusable locale compilation function, preserving `learn.json` for compatibility.
3. Make `LearnPage` refetch on locale changes and fall back to English only when the localized request fails.
4. Localize learning navigation, course-type labels, loading/error states, article navigation, presentation controls, and quiz feedback.
5. Run compiler, learning-page, and quiz tests. Inspect generated files without overwriting unrelated content unexpectedly.

## Task 4: Localize the primary application workflow

**Files:**
- Modify: `src/components/GalleryModal.tsx`
- Modify: `src/components/WelcomeModal.tsx`
- Modify: `src/components/GuidedTour.tsx`
- Modify: `src/components/HelpModal.tsx`
- Modify: `src/components/AboutModal.tsx`
- Modify: `src/components/InspectorPanel.tsx`
- Modify: `src/components/QuestPanel.tsx`
- Modify: `src/components/QueryPlayground.tsx`
- Modify: `src/components/PathFinderPanel.tsx`
- Modify: `src/components/ImportExportModal.tsx`
- Modify: `src/components/DataSourcesModal.tsx`
- Modify: `src/components/OntologyDesigner.tsx`
- Modify: `src/components/designer/DesignerActions.tsx`
- Modify: `src/components/designer/EntityForm.tsx`
- Modify: `src/components/designer/RelationshipForm.tsx`
- Modify: `src/components/designer/TemplatePicker.tsx`
- Modify: `src/components/designer/SubmitCatalogueModal.tsx`
- Modify existing tests adjacent to these components as needed.

1. Add representative failing assertions to existing tests for Korean chrome and unchanged ontology-derived labels.
2. Move only user-facing literals into the typed dictionaries; leave entity names, property names, sample data, query syntax, RDF/JSON, and file-format identifiers untouched.
3. Localize generated quest instructions through locale-aware templates while preserving interpolated ontology terms.
4. Run all affected component and quest tests after each small group of changes.

## Task 5: Document and verify

**Files:**
- Modify: `README.md`
- Modify: `TODO.md`
- Generated: `public/learn.ko.json`
- Generated: `public/learn.en.json`
- Generated/compatibility: `public/learn.json`

1. Document Korean as the default, the header language switch, persistence behavior, and the learning-content source/output mapping.
2. Mark the applicable localization TODO complete without changing unrelated roadmap items.
3. Run `npm test`.
4. Run `npm run build`.
5. Run the translation verifier and `git diff --check`.
6. Review `git status --short` and the final diff to ensure pre-existing `.tool-versions`, translated documents, and generated changes were preserved.
