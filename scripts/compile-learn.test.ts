import { describe, expect, it } from 'vitest';
import { join } from 'node:path';
import { compileLearningContent, LEARN_BUILDS } from './compile-learn';

describe('localized learning content compiler', () => {
  it('defines Korean and English build targets and compiles both sources', () => {
    const root = join(import.meta.dirname, '..');
    const korean = LEARN_BUILDS.find((build) => build.locale === 'ko');
    const english = LEARN_BUILDS.find((build) => build.locale === 'en');

    expect(korean?.outputPath.endsWith('public/learn.ko.json')).toBe(true);
    expect(english?.outputPath.endsWith('public/learn.en.json')).toBe(true);

    const koreanManifest = compileLearningContent(join(root, 'docs', 'ko', 'content', 'learn'));
    const englishManifest = compileLearningContent(join(root, 'content', 'learn'));

    expect(koreanManifest.courses.length).toBe(englishManifest.courses.length);
    expect(koreanManifest.courses[0].articles[0].html).not.toBe(
      englishManifest.courses[0].articles[0].html,
    );
  });
});
