import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';
import { useAppStore } from '../store/appStore';

const props = {
  onAboutClick: vi.fn(),
  onHelpClick: vi.fn(),
  onDataSourcesClick: vi.fn(),
  onImportExportClick: vi.fn(),
  onGalleryClick: vi.fn(),
  onDesignerClick: vi.fn(),
  onLearnClick: vi.fn(),
  onSummaryClick: vi.fn(),
};

describe('Header localization', () => {
  beforeEach(() => {
    window.localStorage.clear();
    useAppStore.getState().resetToDefault();
    useAppStore.getState().setLocale('ko');
  });

  it('shows Korean controls by default while preserving the ontology name', async () => {
    const user = userEvent.setup();
    render(<Header {...props} />);

    expect(screen.getByLabelText('카탈로그')).toBeInTheDocument();
    expect(screen.getByText('Fourth Coffee')).toBeInTheDocument();

    await user.selectOptions(screen.getByRole('combobox', { name: '언어' }), 'en');

    expect(screen.getByLabelText('Catalogue')).toBeInTheDocument();
    expect(screen.getByText('Fourth Coffee')).toBeInTheDocument();
    expect(window.localStorage.getItem('locale')).toBe('en');
  });
});
