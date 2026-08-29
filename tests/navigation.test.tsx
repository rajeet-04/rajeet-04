import { render, screen } from '@testing-library/react';
import App from '../src/app/App';

it('renders the portfolio landmark and primary navigation', () => {
  render(<App />);
  expect(screen.getByRole('main')).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument();
});

it('exposes section links and an accessible theme control', () => {
  render(<App />);
  const navigation = screen.getByRole('navigation', { name: /primary/i });
  expect(navigation.querySelector('a[href="#work"]')).toBeInTheDocument();
  expect(navigation.querySelector('a[href="#research"]')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /theme/i })).toBeInTheDocument();
});

it('renders an accessible engineering focus list in the hero', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /software engineer/i })).toBeVisible();
  expect(screen.getByRole('list', { name: /engineering focus/i })).toBeVisible();
});
