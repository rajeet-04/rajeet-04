import { render, screen } from '@testing-library/react';
import App from '../src/app/App';

it('renders the portfolio landmark and primary navigation', () => {
  render(<App />);
  expect(screen.getByRole('main')).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument();
});
