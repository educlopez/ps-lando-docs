'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Returns [ref, played] — once the element scrolls into view (or mounts,
 * if `mode='mount'`), `played` flips to true and stays true. Respects
 * prefers-reduced-motion by returning played=true immediately.
 */
export function useInView<T extends HTMLElement = HTMLElement>(
  mode: 'in-view' | 'mount' = 'in-view',
  options?: { threshold?: number; rootMargin?: string },
) {
  const ref = useRef<T | null>(null);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      setPlayed(true);
      return;
    }

    if (mode === 'mount') {
      const id = requestAnimationFrame(() => setPlayed(true));
      return () => cancelAnimationFrame(id);
    }

    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlayed(true);
          obs.disconnect();
        }
      },
      {
        threshold: options?.threshold ?? 0.25,
        rootMargin: options?.rootMargin ?? '0px 0px -8% 0px',
      },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [mode, options?.threshold, options?.rootMargin]);

  return [ref, played] as const;
}
