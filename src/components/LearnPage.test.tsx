import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LearnPage } from './LearnPage';
import type { LearnManifest } from '../types/learn';
import { useAppStore } from '../store/appStore';

const manifestFixture: LearnManifest = {
  generatedAt: '2026-05-04T00:00:00.000Z',
  courses: [
    {
      slug: 'finance-path',
      title: 'Finance Path',
      description: 'Finance learning path',
      type: 'path',
      icon: '🏦',
      articles: [
        {
          slug: 'finance-overview',
          title: 'Finance Overview',
          description: 'Start here',
          order: 1,
          html: '<p>Finance</p>',
        },
      ],
    },
    {
      slug: 'ontology-fundamentals',
      title: 'Ontology Fundamentals',
      description: 'Foundational concepts',
      type: 'path',
      icon: '📘',
      articles: [
        {
          slug: 'what-is-ontology',
          title: 'What is an ontology?',
          description: 'Basics',
          order: 1,
          html: '<p>Intro</p>',
        },
      ],
    },
    {
      slug: 'healthcare-path',
      title: 'Healthcare Path',
      description: 'Healthcare learning path',
      type: 'path',
      icon: '🏥',
      articles: [
        {
          slug: 'healthcare-overview',
          title: 'Healthcare Overview',
          description: 'Start here',
          order: 1,
          html: '<p>Healthcare</p>',
        },
      ],
    },
  ],
};

describe('LearnPage course ordering', () => {
  beforeEach(() => {
    useAppStore.getState().setLocale('ko');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('pins ontology fundamentals first while preserving order of other courses', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(manifestFixture),
    } as Response);

    const { container } = render(<LearnPage route={{ page: 'learn' }} />);

    await waitFor(() => {
      expect(screen.getByText('Ontology Fundamentals')).toBeInTheDocument();
    });

    expect(globalThis.fetch).toHaveBeenCalledWith(expect.stringContaining('learn.ko.json'));

    const titles = Array.from(container.querySelectorAll('.learn-card h2')).map((node) => node.textContent?.trim());
    expect(titles).toEqual(['Ontology Fundamentals', 'Finance Path', 'Healthcare Path']);
  });

  it('falls back to English when the Korean manifest is unavailable', async () => {
    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce({ ok: false, status: 404 } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(manifestFixture),
      } as Response);

    render(<LearnPage route={{ page: 'learn' }} />);

    await waitFor(() => {
      expect(screen.getByText('Ontology Fundamentals')).toBeInTheDocument();
    });

    expect(globalThis.fetch).toHaveBeenNthCalledWith(1, expect.stringContaining('learn.ko.json'));
    expect(globalThis.fetch).toHaveBeenNthCalledWith(2, expect.stringContaining('learn.en.json'));
  });

  it('allows switching locale directly from the learning page', async () => {
    const user = userEvent.setup();
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(manifestFixture),
    } as Response);

    render(<LearnPage route={{ page: 'learn' }} />);
    await screen.findByText('Ontology Fundamentals');
    await user.selectOptions(screen.getByRole('combobox', { name: '언어' }), 'en');

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(expect.stringContaining('learn.en.json'));
    });
  });
});
