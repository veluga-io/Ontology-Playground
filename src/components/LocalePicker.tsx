import { Languages } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';
import { useAppStore } from '../store/appStore';

interface LocalePickerProps {
  mobile?: boolean;
}

export function LocalePicker({ mobile = false }: LocalePickerProps) {
  const { t, locale } = useI18n();
  const setLocale = useAppStore((state) => state.setLocale);

  return (
    <label className={mobile ? 'mobile-menu-locale' : 'locale-picker'}>
      <Languages size={mobile ? 18 : 16} aria-hidden="true" />
      {mobile && <span>{t('header.language')}</span>}
      <select
        aria-label={mobile ? `${t('header.language')} (${t('header.menu')})` : t('header.language')}
        value={locale}
        onChange={(event) => setLocale(event.target.value as 'ko' | 'en')}
      >
        <option value="ko">{t('common.korean')}</option>
        <option value="en">{t('common.english')}</option>
      </select>
    </label>
  );
}
