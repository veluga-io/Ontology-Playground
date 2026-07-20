# Korean-Default UI Design

## Goal

Make Korean the default language when running `npm run dev`, while preserving an English option and keeping ontology domain data and technical identifiers in English.

## User-visible behavior

- A first-time visitor sees the application shell, navigation, dialogs, guidance, and learning pages in Korean.
- The header provides a `한국어 / English` language selector on desktop and mobile.
- The selected language is stored in `localStorage` and restored on the next visit.
- Ontology names, entity/property/relationship names, sample values, query syntax, RDF, JSON keys, file formats, and other technical identifiers remain unchanged.
- English remains fully available through the selector.

## Architecture

Use a small, typed in-repository localization layer rather than adding an i18n dependency. A locale store exposes `ko` and `en`, defaults to `ko`, validates the persisted value, and provides a translation function to React components. Translation keys are grouped by feature so missing keys fail during TypeScript compilation.

User-facing strings in the main application workflow move to the locale dictionaries. Data-derived labels are rendered as-is. Quest and generated guidance copy receives localized templates, but interpolated ontology terms remain in their original language.

## Learning content

The build script compiles two manifests:

- `content/learn` to `public/learn.en.json`
- `docs/ko/content/learn` to `public/learn.ko.json`

`LearnPage` loads the manifest for the active locale. Korean is requested first by default; if a localized manifest cannot be loaded, the page falls back to English and shows a localized error only if both requests fail. Existing `public/learn.json` is retained as a compatibility artifact so external consumers are not broken.

## Scope

Translate the main shell and primary learning/design workflow: header and mobile menu, command palette and tabs, catalogue/gallery, learning page and quizzes, help/about/welcome/tour dialogs, inspector, quest panel, query playground, path finder, designer controls, and primary import/export and data-source dialogs.

Do not translate ontology catalogue data, imported ontology content, sample bindings, technical vocabulary inside code examples, or serialized output.

## Testing

Follow test-driven development with focused tests for:

- Korean being the default locale.
- Valid persisted English being restored and invalid values falling back to Korean.
- The language selector changing and persisting the locale.
- `LearnPage` requesting the locale-specific manifest and falling back to English.
- The learning compiler producing Korean and English manifests.
- Representative primary UI labels rendering in Korean while ontology names remain unchanged.

Run the focused tests during implementation, then the full test suite and production build. Run `git diff --check` as the final whitespace check.

## Documentation

Update the README with the Korean-default behavior and language switch instructions. Update the repository TODO only if one exists and has an applicable localization section; do not introduce an unrelated TODO file solely for this change.
