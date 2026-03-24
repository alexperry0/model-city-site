import { renderHook } from '@testing-library/react';
import { useScrollToTop } from '../useScrollToTop';

let mockPathname = '/';

vi.mock('react-router-dom', () => ({
  useLocation: () => ({ pathname: mockPathname }),
}));

describe('useScrollToTop', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  it('calls scrollTo(0, 0) on initial render', () => {
    mockPathname = '/';
    renderHook(() => useScrollToTop());
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('calls scrollTo(0, 0) when pathname changes', () => {
    mockPathname = '/';
    const { rerender } = renderHook(() => useScrollToTop());
    expect(window.scrollTo).toHaveBeenCalledTimes(1);

    mockPathname = '/about';
    rerender();
    expect(window.scrollTo).toHaveBeenCalledTimes(2);
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0);
  });

  it('does not call scrollTo again when pathname is unchanged', () => {
    mockPathname = '/give';
    const { rerender } = renderHook(() => useScrollToTop());
    expect(window.scrollTo).toHaveBeenCalledTimes(1);

    rerender();
    expect(window.scrollTo).toHaveBeenCalledTimes(1);
  });
});
