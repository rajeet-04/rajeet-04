import '@testing-library/jest-dom/vitest';

if (typeof window !== 'undefined' && /jsdom/i.test(window.navigator.userAgent)) {
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', { value: () => null, configurable: true });
}
