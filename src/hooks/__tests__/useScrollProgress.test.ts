import { renderHook, act } from '@testing-library/react';
import { useScrollProgress } from '../useScrollProgress';

type IntersectionCallback = (entries: IntersectionObserverEntry[]) => void;

let intersectionCallback: IntersectionCallback | null = null;
const observedElements: Element[] = [];
const disconnectMock = vi.fn();

class MockIntersectionObserver {
  constructor(callback: IntersectionCallback) {
    intersectionCallback = callback;
  }
  observe(el: Element) {
    observedElements.push(el);
  }
  unobserve(_el: Element) {}
  disconnect = disconnectMock;
}

beforeEach(() => {
  intersectionCallback = null;
  observedElements.length = 0;
  disconnectMock.mockClear();
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  vi.stubGlobal('innerHeight', 768);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function makeEntry(
  el: HTMLElement,
  isIntersecting: boolean,
  boundingClientRect: Partial<DOMRect> = {}
): IntersectionObserverEntry {
  return {
    target: el,
    isIntersecting,
    boundingClientRect: {
      top: 0,
      bottom: 100,
      left: 0,
      right: 100,
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      toJSON: () => ({}),
      ...boundingClientRect,
    },
    intersectionRatio: isIntersecting ? 1 : 0,
    intersectionRect: {} as DOMRect,
    rootBounds: null,
    time: 0,
  } as IntersectionObserverEntry;
}

describe('useScrollProgress', () => {
  it('initial maxStep is -1', () => {
    const { result } = renderHook(() => useScrollProgress(3));
    expect(result.current.maxStep).toBe(-1);
  });

  it('initial visibleSteps is an empty Set', () => {
    const { result } = renderHook(() => useScrollProgress(3));
    expect(result.current.visibleSteps.size).toBe(0);
  });

  it('setRef returns a function', () => {
    const { result } = renderHook(() => useScrollProgress(3));
    const setter = result.current.setRef(0);
    expect(typeof setter).toBe('function');
  });

  it('step entering viewport updates maxStep', () => {
    const { result } = renderHook(() => useScrollProgress(3));

    // Attach elements via setRef
    const els = [
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div'),
    ];

    act(() => {
      result.current.setRef(0)(els[0]);
      result.current.setRef(1)(els[1]);
      result.current.setRef(2)(els[2]);
    });

    expect(intersectionCallback).not.toBeNull();

    act(() => {
      intersectionCallback!([makeEntry(els[1], true)]);
    });

    expect(result.current.maxStep).toBe(1);
  });

  it('multiple visible steps: maxStep is highest index', () => {
    const { result } = renderHook(() => useScrollProgress(5));

    const els = Array.from({ length: 5 }, () => document.createElement('div'));

    act(() => {
      els.forEach((el, i) => result.current.setRef(i)(el));
    });

    act(() => {
      intersectionCallback!([
        makeEntry(els[0], true),
        makeEntry(els[2], true),
        makeEntry(els[4], true),
      ]);
    });

    expect(result.current.maxStep).toBe(4);
    expect(result.current.visibleSteps.has(0)).toBe(true);
    expect(result.current.visibleSteps.has(2)).toBe(true);
    expect(result.current.visibleSteps.has(4)).toBe(true);
  });

  it('step exiting above viewport removes it from visibleSteps', () => {
    const { result } = renderHook(() => useScrollProgress(3));

    const els = [
      document.createElement('div'),
      document.createElement('div'),
      document.createElement('div'),
    ];

    act(() => {
      els.forEach((el, i) => result.current.setRef(i)(el));
    });

    // First make steps visible
    act(() => {
      intersectionCallback!([
        makeEntry(els[0], true),
        makeEntry(els[1], true),
      ]);
    });

    expect(result.current.maxStep).toBe(1);

    // Step 0 exits above viewport (bottom < 0)
    act(() => {
      intersectionCallback!([makeEntry(els[0], false, { bottom: -10, top: -110 })]);
    });

    expect(result.current.visibleSteps.has(0)).toBe(false);
    expect(result.current.visibleSteps.has(1)).toBe(true);
    expect(result.current.maxStep).toBe(1);
  });

  it('step exiting below viewport removes it from visibleSteps', () => {
    const { result } = renderHook(() => useScrollProgress(3));

    const els = [document.createElement('div'), document.createElement('div')];

    act(() => {
      els.forEach((el, i) => result.current.setRef(i)(el));
    });

    act(() => {
      intersectionCallback!([makeEntry(els[0], true)]);
    });

    expect(result.current.maxStep).toBe(0);

    // Step 0 exits below viewport (top > innerHeight)
    act(() => {
      intersectionCallback!([makeEntry(els[0], false, { top: 900, bottom: 1000 })]);
    });

    expect(result.current.visibleSteps.has(0)).toBe(false);
    expect(result.current.maxStep).toBe(-1);
  });

  it('non-intersecting entry within viewport does not remove step', () => {
    const { result } = renderHook(() => useScrollProgress(2));

    const els = [document.createElement('div'), document.createElement('div')];

    act(() => {
      els.forEach((el, i) => result.current.setRef(i)(el));
    });

    act(() => {
      intersectionCallback!([makeEntry(els[0], true)]);
    });

    expect(result.current.visibleSteps.has(0)).toBe(true);

    // Entry is not intersecting but bounding rect is within viewport — should NOT remove
    act(() => {
      intersectionCallback!([makeEntry(els[0], false, { top: 100, bottom: 200 })]);
    });

    expect(result.current.visibleSteps.has(0)).toBe(true);
  });

  it('calls disconnect on cleanup', () => {
    const { unmount } = renderHook(() => useScrollProgress(2));
    unmount();
    expect(disconnectMock).toHaveBeenCalled();
  });

  it('maxStep returns -1 when all visible steps are removed', () => {
    const { result } = renderHook(() => useScrollProgress(2));

    const els = [document.createElement('div'), document.createElement('div')];

    act(() => {
      els.forEach((el, i) => result.current.setRef(i)(el));
    });

    act(() => {
      intersectionCallback!([makeEntry(els[0], true)]);
    });

    expect(result.current.maxStep).toBe(0);

    act(() => {
      intersectionCallback!([makeEntry(els[0], false, { bottom: -10, top: -110 })]);
    });

    expect(result.current.maxStep).toBe(-1);
  });
});
