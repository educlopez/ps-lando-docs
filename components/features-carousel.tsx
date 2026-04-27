'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, FileText } from 'lucide-react';
import { abstractImages } from '@/lib/images';
import type { Dict } from '@/lib/i18n/dict';
import { AnimateText } from './animate-text';

type Slide = {
  eyebrow: string;
  title: string;
  caption: string;
  bg: string;
  visual: React.ReactNode;
};

export function FeaturesCarousel({ t }: { t: Dict }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: true });
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef<{
    pointerId: number;
    startX: number;
    startScrollLeft: number;
    moved: boolean;
  } | null>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => {
      setCanScroll({
        left: el.scrollLeft > 4,
        right: el.scrollLeft < el.scrollWidth - el.clientWidth - 4,
      });
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.querySelector('[data-slide]') as HTMLElement | null;
    const step = slide ? slide.offsetWidth + 16 : el.clientWidth * 0.6;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return;
    const el = trackRef.current;
    if (!el) return;
    dragState.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startScrollLeft: el.scrollLeft,
      moved: false,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    const el = trackRef.current;
    if (!state || !el || state.pointerId !== e.pointerId) return;
    const dx = e.clientX - state.startX;
    if (!state.moved) {
      if (Math.abs(dx) < 6) return;
      state.moved = true;
      setIsDragging(true);
      el.setPointerCapture(e.pointerId);
    }
    el.scrollLeft = state.startScrollLeft - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    const el = trackRef.current;
    if (!state || state.pointerId !== e.pointerId) return;
    if (state.moved && el?.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }
    dragState.current = null;
    if (state.moved) setIsDragging(false);
  };

  const handleClickCapture = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const slides: Slide[] = [
    {
      eyebrow: t.bento.oneCommand.eyebrow,
      title: t.bento.oneCommand.title,
      caption: t.bento.oneCommand.caption,
      bg: abstractImages.cli,
      visual: <CommandFloater />,
    },
    {
      eyebrow: t.bento.moduleSelection.eyebrow,
      title: t.bento.moduleSelection.title,
      caption: t.bento.moduleSelection.caption,
      bg: abstractImages.recipes,
      visual: <ModuleFloater />,
    },
    {
      eyebrow: t.bento.doctor.eyebrow,
      title: t.bento.doctor.title,
      caption: t.bento.doctor.caption,
      bg: abstractImages.doctor,
      visual: <DoctorFloater />,
    },
    {
      eyebrow: t.bento.recipes.eyebrow,
      title: t.bento.recipes.title,
      caption: t.bento.recipes.caption,
      bg: abstractImages.hero,
      visual: <RecipeFloater />,
    },
    {
      eyebrow: t.bento.lifecycle.eyebrow,
      title: t.bento.lifecycle.title,
      caption: t.bento.lifecycle.caption,
      bg: abstractImages.lifecycle,
      visual: <LifecycleFloater />,
    },
    {
      eyebrow: t.bento.llm.eyebrow,
      title: t.bento.llm.title,
      caption: t.bento.llm.caption,
      bg: abstractImages.cta,
      visual: <LlmFloater />,
    },
  ];

  return (
    <section className="border-t border-fd-border/60 bg-fd-card/30">
      <div
        className="relative mx-auto max-w-6xl py-24 max-lg:px-1"
        role="region"
        aria-roledescription="carousel"
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 px-6 lg:mb-12">
          <div className="max-w-md">
            <AnimateText
              as="div"
              effect="micro-scale-fade"
              trigger="in-view"
              text={t.bento.eyebrow}
              className="text-[11px] uppercase tracking-[0.16em] font-medium text-fd-primary mb-3"
            />
            <AnimateText
              as="h2"
              effect="mask-reveal-up"
              trigger="in-view"
              text={t.bento.heading}
              className="text-3xl sm:text-4xl font-semibold tracking-tight text-balance leading-[1.1]"
            />
          </div>
          <div className="flex items-center gap-2">
            <CarouselButton
              direction="left"
              disabled={!canScroll.left}
              onClick={() => scroll(-1)}
            />
            <CarouselButton
              direction="right"
              disabled={!canScroll.right}
              onClick={() => scroll(1)}
            />
          </div>
        </div>

        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={handleClickCapture}
          className={`overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden touch-pan-y select-none ${
            isDragging
              ? 'cursor-grabbing'
              : 'cursor-grab scroll-smooth snap-x snap-mandatory'
          }`}
        >
          <div className="flex gap-4 pb-4">
            {slides.map((s, i) => (
              <article
                key={i}
                data-slide
                role="group"
                aria-roledescription="slide"
                className="snap-start min-w-0 shrink-0 grow-0 basis-[85%] sm:basis-[60%] md:basis-[48%] lg:basis-[40%] space-y-4"
              >
                <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl ring-1 ring-fd-border/70 bg-fd-card shadow-md shadow-black/5">
                  <Image
                    src={s.bg}
                    alt=""
                    fill
                    draggable={false}
                    sizes="(min-width: 1024px) 40vw, (min-width: 768px) 48vw, 85vw"
                    className="object-cover opacity-40 dark:opacity-25 pointer-events-none select-none"
                  />
                  <div className="relative z-10 px-4">{s.visual}</div>
                </div>
                <div className="px-1">
                  <div className="text-[10px] uppercase tracking-[0.16em] font-medium text-fd-primary mb-1.5">
                    {s.eyebrow}
                  </div>
                  <h3 className="font-semibold text-base text-fd-foreground leading-tight">
                    {s.title}
                  </h3>
                  <p className="text-sm text-fd-muted-foreground leading-relaxed mt-1.5 max-w-sm">
                    {s.caption}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CarouselButton({
  direction,
  disabled,
  onClick,
}: {
  direction: 'left' | 'right';
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === 'left' ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'left' ? 'Previous slide' : 'Next slide'}
      className="size-9 rounded-full bg-fd-card ring-1 ring-fd-border shadow-sm shadow-black/10 hover:bg-fd-accent hover:ring-fd-primary/40 transition disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center cursor-pointer"
    >
      <Icon className="size-4" />
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Floater mini-cards (one per slide)                                         */
/* -------------------------------------------------------------------------- */

function FloaterShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-fd-background ring-1 ring-fd-border rounded-xl shadow-xl shadow-black/10 p-4 w-[260px] sm:w-[280px]">
      {children}
    </div>
  );
}

function CommandFloater() {
  return (
    <FloaterShell>
      <div className="flex items-center gap-1.5 mb-3">
        <span className="size-2 rounded-full bg-red-400/80" />
        <span className="size-2 rounded-full bg-amber-400/80" />
        <span className="size-2 rounded-full bg-emerald-400/80" />
        <span className="ml-2 text-[10px] font-mono text-fd-muted-foreground">
          ~/projects/shop
        </span>
      </div>
      <div className="font-mono text-[13px] text-fd-foreground">
        <span className="text-fd-primary">$</span> ps-lando install
      </div>
      <div className="mt-2 font-mono text-[11px] text-fd-muted-foreground space-y-0.5">
        <div>
          <span className="text-fd-primary">✔</span> download · 23s
        </div>
        <div>
          <span className="text-fd-primary">✔</span> extract panda · 8s
        </div>
        <div className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-fd-primary animate-pulse" />
          installing modules…
        </div>
      </div>
    </FloaterShell>
  );
}

function ModuleFloater() {
  const groups = [
    { name: 'Core', count: 14, on: true },
    { name: 'Payment', count: 8, on: true },
    { name: 'Theme', count: 9, on: true },
    { name: 'SEO', count: 6, on: false },
  ];
  return (
    <FloaterShell>
      <div className="text-[10px] uppercase tracking-[0.14em] text-fd-muted-foreground mb-3">
        Module groups
      </div>
      <div className="space-y-2">
        {groups.map((g) => (
          <div
            key={g.name}
            className="flex items-center justify-between text-[12px]"
          >
            <div className="flex items-center gap-2">
              <span
                className={`size-3.5 rounded-full ring-1 flex items-center justify-center ${
                  g.on
                    ? 'bg-fd-primary ring-fd-primary'
                    : 'bg-transparent ring-fd-border'
                }`}
              >
                {g.on && (
                  <Check
                    className="size-2.5 text-white"
                    strokeWidth={3}
                  />
                )}
              </span>
              <span className="text-fd-foreground">{g.name}</span>
            </div>
            <span className="font-mono text-fd-muted-foreground">
              {g.count}
            </span>
          </div>
        ))}
      </div>
    </FloaterShell>
  );
}

function DoctorFloater() {
  const checks = ['Docker daemon', 'Node 20.x', 'Ports free', 'Disk space'];
  return (
    <FloaterShell>
      <div className="flex items-center justify-between mb-3">
        <div className="text-[11px] font-medium text-fd-foreground">
          Diagnose
        </div>
        <div className="text-[10px] px-2 py-0.5 rounded-full bg-fd-primary/10 text-fd-primary border border-fd-primary/20">
          All clear
        </div>
      </div>
      <div className="space-y-1.5">
        {checks.map((label) => (
          <div key={label} className="flex items-center gap-2 text-[12px]">
            <Check className="size-3 text-fd-primary" strokeWidth={3} />
            <span className="text-fd-foreground">{label}</span>
          </div>
        ))}
      </div>
    </FloaterShell>
  );
}

function RecipeFloater() {
  return (
    <FloaterShell>
      <div className="text-[10px] uppercase tracking-[0.14em] text-fd-muted-foreground mb-3">
        Recipes
      </div>
      <div className="space-y-1 font-mono text-[12px]">
        <RecipeRow name="spain-taxes" />
        <RecipeRow name="demo-catalog-10" />
        <RecipeRow name="cache-warmup" />
        <RecipeRow name="clean-seed" active />
      </div>
    </FloaterShell>
  );
}

function RecipeRow({ name, active }: { name: string; active?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between rounded-md px-2 py-1.5 ${
        active ? 'bg-fd-primary/10 border border-fd-primary/20' : ''
      }`}
    >
      <div className="flex items-center gap-2">
        <Check className="size-3 text-fd-primary" strokeWidth={3} />
        <span className="text-fd-foreground">{name}</span>
      </div>
      {active && (
        <span className="text-[9px] text-fd-primary uppercase tracking-[0.14em]">
          running
        </span>
      )}
    </div>
  );
}

function LifecycleFloater() {
  const steps = ['create', 'start', 'stop', 'reset'];
  return (
    <FloaterShell>
      <div className="text-[10px] uppercase tracking-[0.14em] text-fd-muted-foreground mb-4">
        Sandbox lifecycle
      </div>
      <div className="flex items-center justify-between gap-1">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-1">
            <div className="px-2 py-1 rounded-md bg-fd-primary/10 ring-1 ring-fd-primary/25 text-[11px] font-mono text-fd-primary">
              {s}
            </div>
            {i < steps.length - 1 && (
              <span className="text-fd-muted-foreground/60 text-xs">›</span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 text-[11px] text-fd-muted-foreground flex items-center justify-between">
        <span className="font-mono text-fd-foreground">db reset</span>
        <span>3-5 min</span>
      </div>
    </FloaterShell>
  );
}

function LlmFloater() {
  return (
    <FloaterShell>
      <div className="flex items-center gap-2 mb-3">
        <FileText className="size-3.5 text-fd-primary" />
        <span className="font-mono text-[12px] text-fd-foreground">
          llms.txt
        </span>
        <span className="ml-auto text-[10px] text-fd-muted-foreground">
          42 pages
        </span>
      </div>
      <div className="font-mono text-[11px] text-fd-muted-foreground space-y-0.5 leading-relaxed">
        <div className="opacity-70">// ps-lando documentation</div>
        <div>/docs/getting-started.md</div>
        <div>/docs/recipes.md</div>
        <div>/docs/reference.md</div>
        <div className="text-fd-foreground">
          /docs/llms-full.txt{' '}
          <span className="text-fd-primary">✓</span>
        </div>
      </div>
    </FloaterShell>
  );
}
