import '@testing-library/jest-dom/vitest';

if (typeof window !== 'undefined' && /jsdom/i.test(window.navigator.userAgent)) {
  Object.defineProperty(window, 'matchMedia', { value: () => ({ matches: true, addEventListener: () => {}, removeEventListener: () => {} }), configurable: true });
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', { value: () => null, configurable: true });
}
