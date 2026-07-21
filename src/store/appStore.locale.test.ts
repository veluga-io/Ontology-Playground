import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('app locale state', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.resetModules();
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('defaults to Korean when no locale has been saved', async () => {
    const { useAppStore } = await import('./appStore');

    expect(useAppStore.getState().locale).toBe('ko');
  });

  it('restores a saved English locale', async () => {
    window.localStorage.setItem('locale', 'en');

    const { useAppStore } = await import('./appStore');

    expect(useAppStore.getState().locale).toBe('en');
  });

  it('ignores an unsupported saved locale', async () => {
    window.localStorage.setItem('locale', 'ja');

    const { useAppStore } = await import('./appStore');

    expect(useAppStore.getState().locale).toBe('ko');
  });

  it('persists locale changes', async () => {
    const { useAppStore } = await import('./appStore');

    useAppStore.getState().setLocale('en');

    expect(useAppStore.getState().locale).toBe('en');
    expect(window.localStorage.getItem('locale')).toBe('en');
  });
});
