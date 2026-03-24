// src/test/setup.ts
import '@testing-library/jest-dom'

// Mock IntersectionObserver (not available in jsdom)
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {}
}
vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
