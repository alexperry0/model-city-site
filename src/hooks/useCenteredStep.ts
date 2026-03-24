import { useEffect, useState, useRef, useCallback } from 'react';

/**
 * Tracks which step element's center is closest to a target Y position
 * (default: top third of viewport, where sticky diagrams sit).
 * Returns the index of the closest step, or -1 if none are registered or all are too far away.
 * Bidirectional — updates on every scroll.
 * @param stepCount - Number of steps to track
 * @param targetRatio - Fractional height of viewport where target is (0-1)
 * @param maxDistance - Maximum distance as fraction of viewport height; returns -1 if closer step exceeds this
 */
export function useCenteredStep(stepCount: number, targetRatio = 0.35, maxDistance = 0.5) {
  const els = useRef<(HTMLElement | null)[]>(new Array(stepCount).fill(null));
  const [centerStep, setCenterStep] = useState(-1);

  const setRef = useCallback((index: number) => (el: HTMLElement | null) => {
    els.current[index] = el;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const target = window.innerHeight * targetRatio;
      let closest = -1;
      let closestDist = Infinity;
      els.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - target);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      // If closest step center is more than maxDistance * viewport height away, return -1
      if (closestDist > window.innerHeight * maxDistance) {
        closest = -1;
      }
      setCenterStep(closest);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [stepCount, targetRatio, maxDistance]);

  return { centerStep, setRef };
}
