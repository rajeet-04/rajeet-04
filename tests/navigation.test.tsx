import { render, screen } from '@testing-library/react';
import App from '../src/app/App';

it('renders the portfolio landmark and primary navigation', () => {
  render(<App />);
  expect(screen.getByRole('main')).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument();
});

it('exposes section links and an accessible theme control', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /work/i })).toHaveAttribute('href', '#work');
  expect(screen.getByRole('link', { name: /research/i })).toHaveAttribute('href', '#research');
  expect(screen.getByRole('button', { name: /theme/i })).toBeInTheDocument();
});
