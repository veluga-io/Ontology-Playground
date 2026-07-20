import { useCallback } from 'react';
import { useAppStore } from '../store/appStore';
import { translate, type MessageKey } from './messages';

type MessageParams = Record<string, string | number>;

export function useI18n() {
  const locale = useAppStore((state) => state.locale);
  const t = useCallback(
    (key: MessageKey, params?: MessageParams) => translate(locale, key, params),
    [locale],
  );

  return { locale, t };
}
