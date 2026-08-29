import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PretextStatement } from '../src/components/hero/PretextStatement';
import { CustomCursor } from '../src/components/ui/CustomCursor';

describe('PretextStatement', () => {
  it('exposes a stable interactive canvas with individually addressable text units', () => {
    render(<PretextStatement />);

    const canvas = screen.getByRole('img', { name: /good software makes complex systems feel possible/i });

    expect(canvas).toHaveAttribute('data-pretext-canvas', 'true');
    expect(canvas.querySelectorAll('[data-pretext-unit]').length).toBeGreaterThan(5);
  });

  it('provides an unobtrusive reticle cursor surface', () => {
    render(<CustomCursor />);

    expect(screen.getByTestId('custom-cursor')).toHaveAttribute('aria-hidden', 'true');
  });
});
