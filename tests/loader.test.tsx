import { act, render, screen } from '@testing-library/react';
import { afterEach, it, vi } from 'vitest';
import App from '../src/app/App';

function setReducedMotion(matches: boolean) {
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
}

afterEach(() => {
  sessionStorage.clear();
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

it('shows a fast terminal loader once per session', async () => {
  vi.useFakeTimers();
  setReducedMotion(false);

  const firstVisit = render(<App />);
  expect(screen.getByRole('status', { name: /loading portfolio/i })).toBeVisible();
  expect(screen.getByText(/init portfolio/i)).toBeInTheDocument();
  expect(firstVisit.container.querySelector('.app-shell')).toHaveAttribute('aria-busy', 'true');

  await act(async () => { vi.advanceTimersByTime(900); });

  expect(screen.queryByRole('status', { name: /loading portfolio/i })).not.toBeInTheDocument();
  expect(firstVisit.container.querySelector('.app-shell')).toHaveAttribute('aria-busy', 'false');

  firstVisit.unmount();
  render(<App />);
  expect(screen.queryByRole('status', { name: /loading portfolio/i })).not.toBeInTheDocument();
});

it('lets visitors skip the terminal loader with Escape', () => {
  vi.useFakeTimers();
  setReducedMotion(false);
  render(<App />);

  expect(screen.getByRole('status', { name: /loading portfolio/i })).toBeVisible();
  act(() => { window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' })); });

  expect(screen.queryByRole('status', { name: /loading portfolio/i })).not.toBeInTheDocument();
});

it('uses the shorter loader path for reduced motion', async () => {
  vi.useFakeTimers();
  setReducedMotion(true);
  render(<App />);

  expect(screen.getByRole('status', { name: /loading portfolio/i })).toBeVisible();
  await act(async () => { vi.advanceTimersByTime(200); });
  expect(screen.queryByRole('status', { name: /loading portfolio/i })).not.toBeInTheDocument();
});
