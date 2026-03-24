import { useEffect, useState, useRef, useCallback } from 'react';

export function useScrollProgress(stepCount: number, threshold = 0.4) {
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set());
  const refs = useRef<(HTMLElement | null)[]>(new Array(stepCount).fill(null));

  const setRef = useCallback((index: number) => (el: HTMLElement | null) => {
    refs.current[index] = el;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleSteps((prev) => {
          const next = new Set(prev);
          let changed = false;

          entries.forEach((entry) => {
            const idx = refs.current.indexOf(entry.target as HTMLElement);
            if (idx === -1) return;

            if (entry.isIntersecting && !prev.has(idx)) {
              next.add(idx);
              changed = true;
            } else if (!entry.isIntersecting && prev.has(idx)) {
              const rect = entry.boundingClientRect;
              if (rect.bottom < 0 || rect.top > window.innerHeight) {
                next.delete(idx);
                changed = true;
              }
            }
          });

          return changed ? next : prev;
        });
      },
      { threshold }
    );

    refs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [stepCount, threshold]);

  const maxStep = visibleSteps.size > 0 ? Math.max(...visibleSteps) : -1;

  return { visibleSteps, maxStep, setRef };
}
