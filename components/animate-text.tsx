'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/cn';

/**
 * Catalog-driven text animations from the `animate-text` skill.
 * Implements 4 specs with CSS transitions (no runtime deps):
 *   - soft-blur-in       (per-character, mount)         → hero titles
 *   - per-word-crossfade (per-word, calm)               → hero descriptions
 *   - mask-reveal-up     (per-line, on scroll)          → section H2s
 *   - micro-scale-fade   (whole, subtle)                → eyebrows / pills
 *
 * Respects prefers-reduced-motion and falls back to visible state for
 * users without scripting via @media (scripting: none) in globals.css.
 */

type Effect =
  | 'soft-blur-in'
  | 'per-word-crossfade'
  | 'mask-reveal-up'
  | 'micro-scale-fade';

type Trigger = 'mount' | 'in-view';

type Recipe = {
  split: 'char' | 'word' | 'line' | 'whole';
  duration: number;
  stagger: number;
  easing: string;
  from: { opacity?: number; y?: number; blur?: number; scale?: number };
};

const RECIPES: Record<Effect, Recipe> = {
  'soft-blur-in': {
    split: 'char',
    duration: 900,
    stagger: 25,
    easing: 'cubic-bezier(0.22,1,0.36,1)',
    from: { opacity: 0, y: 16, blur: 12 },
  },
  'per-word-crossfade': {
    split: 'word',
    duration: 700,
    stagger: 70,
    easing: 'cubic-bezier(0.16,1,0.3,1)',
    from: { opacity: 0, y: 8 },
  },
  'mask-reveal-up': {
    split: 'line',
    duration: 760,
    stagger: 90,
    easing: 'cubic-bezier(0.22,1,0.36,1)',
    from: { opacity: 0, y: 30, blur: 6 },
  },
  'micro-scale-fade': {
    split: 'whole',
    duration: 600,
    stagger: 0,
    easing: 'cubic-bezier(0.32,0.72,0,1)',
    from: { opacity: 0, scale: 0.96 },
  },
};

function fromStyle(r: Recipe): CSSProperties {
  const t: string[] = [];
  if (r.from.y) t.push(`translateY(${r.from.y}px)`);
  if (r.from.scale && r.from.scale !== 1) t.push(`scale(${r.from.scale})`);
  return {
    opacity: r.from.opacity ?? 1,
    transform: t.length ? t.join(' ') : 'none',
    filter: r.from.blur ? `blur(${r.from.blur}px)` : 'none',
    willChange: 'opacity, transform, filter',
  };
}

function toStyle(r: Recipe, offsetMs: number): CSSProperties {
  return {
    opacity: 1,
    transform: 'none',
    filter: 'none',
    transition: `opacity ${r.duration}ms ${r.easing} ${offsetMs}ms, transform ${r.duration}ms ${r.easing} ${offsetMs}ms, filter ${r.duration}ms ${r.easing} ${offsetMs}ms`,
  };
}

function usePlayed(trigger: Trigger) {
  const ref = useRef<HTMLElement | null>(null);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      setPlayed(true);
      return;
    }

    if (trigger === 'mount') {
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
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [trigger]);

  return { ref, played };
}

export function AnimateText({
  text,
  effect,
  as: Tag = 'span',
  trigger = 'mount',
  delay = 0,
  className,
}: {
  text: string;
  effect: Effect;
  as?: ElementType;
  trigger?: Trigger;
  delay?: number;
  className?: string;
}) {
  const recipe = RECIPES[effect];
  const { ref, played } = usePlayed(trigger);

  const Wrapper = Tag as ElementType;

  if (recipe.split === 'whole') {
    const offset = delay;
    return (
      <Wrapper
        ref={ref as React.Ref<HTMLElement>}
        data-anim="text"
        className={cn(className)}
        style={played ? toStyle(recipe, offset) : fromStyle(recipe)}
      >
        {text}
      </Wrapper>
    );
  }

  if (recipe.split === 'line') {
    const lines = text.split(/\n+/);
    return (
      <Wrapper
        ref={ref as React.Ref<HTMLElement>}
        data-anim="text"
        className={cn(className)}
        aria-label={text}
      >
        {lines.map((line, i) => {
          const offset = delay + i * recipe.stagger;
          return (
            <span
              key={i}
              className="block overflow-hidden"
              aria-hidden
            >
              <span
                className="block"
                style={played ? toStyle(recipe, offset) : fromStyle(recipe)}
              >
                {line}
              </span>
            </span>
          );
        })}
      </Wrapper>
    );
  }

  if (recipe.split === 'word') {
    const tokens = text.split(/(\s+)/);
    let wIndex = 0;
    return (
      <Wrapper
        ref={ref as React.Ref<HTMLElement>}
        data-anim="text"
        className={cn(className)}
        aria-label={text}
      >
        {tokens.map((tok, i) => {
          if (/^\s+$/.test(tok))
            return (
              <span key={`s${i}`} aria-hidden>
                {tok}
              </span>
            );
          const idx = wIndex++;
          const offset = delay + idx * recipe.stagger;
          return (
            <span
              key={`w${i}`}
              className="inline-block"
              style={played ? toStyle(recipe, offset) : fromStyle(recipe)}
              aria-hidden
            >
              {tok}
            </span>
          );
        })}
      </Wrapper>
    );
  }

  // split === 'char' — keep words intact for line-breaking
  const tokens = text.split(/(\s+)/);
  let cIndex = 0;
  return (
    <Wrapper
      ref={ref as React.Ref<HTMLElement>}
      data-anim="text"
      className={cn(className)}
      aria-label={text}
    >
      {tokens.map((tok, ti) => {
        if (/^\s+$/.test(tok))
          return (
            <span key={`s${ti}`} aria-hidden>
              {tok}
            </span>
          );
        return (
          <span
            key={`w${ti}`}
            className="inline-block whitespace-nowrap"
            aria-hidden
          >
            {Array.from(tok).map((ch) => {
              const idx = cIndex++;
              const offset = delay + idx * recipe.stagger;
              return (
                <span
                  key={idx}
                  className="inline-block"
                  style={played ? toStyle(recipe, offset) : fromStyle(recipe)}
                >
                  {ch}
                </span>
              );
            })}
          </span>
        );
      })}
    </Wrapper>
  );
}

/* -------------------------------------------------------------------------- */
/* Reveal — generic block fade-up on scroll for non-text elements             */
/* -------------------------------------------------------------------------- */

export function Reveal({
  children,
  delay = 0,
  y = 18,
  duration = 700,
  className,
  as: Tag = 'div',
  trigger = 'in-view',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  as?: ElementType;
  trigger?: Trigger;
}) {
  const { ref, played } = usePlayed(trigger);
  const Wrapper = Tag as ElementType;
  const easing = 'cubic-bezier(0.22,1,0.36,1)';
  const style: CSSProperties = played
    ? {
        opacity: 1,
        transform: 'none',
        transition: `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`,
      }
    : {
        opacity: 0,
        transform: `translateY(${y}px)`,
        willChange: 'opacity, transform',
      };

  return (
    <Wrapper
      ref={ref as React.Ref<HTMLElement>}
      data-anim="reveal"
      className={cn(className)}
      style={style}
    >
      {children}
    </Wrapper>
  );
}
