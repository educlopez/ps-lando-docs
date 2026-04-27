'use client';

import {
  ArrowUpRight,
  Check,
  Database,
  Flame,
  LassoSelect,
  LoaderCircle,
  NotepadText,
  Play,
  ShieldCheck,
  Target,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import type { Dict } from '@/lib/i18n/dict';
import { AnimateText, Reveal } from './animate-text';
import { useInView } from '@/lib/use-in-view';

/**
 * Three feature cards. Each illustration replicates a layout from the
 * tailark Pro gallery (file-icon · stacked currency cards · task panel)
 * adapted to ps-lando content with our own primitives.
 */
export function LlmSection({ t }: { t: Dict }) {
  const s = t.llmSection;
  return (
    <section className="border-t border-fd-border/60">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl mb-14">
          <AnimateText
            as="div"
            effect="micro-scale-fade"
            trigger="in-view"
            text={s.eyebrow}
            className="text-[11px] uppercase tracking-[0.16em] font-medium text-fd-primary mb-3"
          />
          <AnimateText
            as="h2"
            effect="mask-reveal-up"
            trigger="in-view"
            text={s.heading}
            className="text-3xl sm:text-4xl font-semibold tracking-tight text-balance leading-tight"
          />
        </div>

        {/* tailark "bento-three" asymmetric 6-col grid:
            row 1 → llms.txt (2) + pipeline (4)
            row 2 → hooks (3)    + compatibility (3) */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-stretch">
          <Reveal delay={0} className="h-full lg:col-span-2">
            <FeatureCard
              illustration={<LlmsTxtIllustration />}
              tag={s.llmsTxt.eyebrow}
              title={s.llmsTxt.title}
              body={s.llmsTxt.body}
              ctaLabel={s.llmsTxt.cta}
              ctaHref="/docs/getting-started/installation"
            />
          </Reveal>
          <Reveal delay={120} className="h-full lg:col-span-4">
            <FeatureCard
              illustration={<PipelineIllustration />}
              tag={s.pipeline.eyebrow}
              title={s.pipeline.title}
              body={s.pipeline.body}
              ctaLabel={s.pipeline.cta}
              ctaHref="/docs/guides/sandbox-lifecycle"
            />
          </Reveal>
          <Reveal delay={240} className="h-full lg:col-span-3">
            <FeatureCard
              illustration={<HooksIllustration />}
              tag={s.hooks.eyebrow}
              title={s.hooks.title}
              body={s.hooks.body}
              ctaLabel={s.hooks.cta}
              ctaHref="/docs/guides/hooks-and-recipes"
            />
          </Reveal>
          <Reveal delay={360} className="h-full lg:col-span-3">
            <FeatureCard
              illustration={<CompatibilityIllustration />}
              tag={s.compat.eyebrow}
              title={s.compat.title}
              body={s.compat.body}
              ctaLabel={s.compat.cta}
              ctaHref="/docs/reference/compatibility-matrix"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Card chrome + shared primitives                                            */
/* -------------------------------------------------------------------------- */

function FeatureCard({
  illustration,
  tag,
  title,
  body,
  ctaLabel,
  ctaHref,
}: {
  illustration: React.ReactNode;
  tag: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  // tailark bento-three layout: text at the TOP, illustration fills the
  // remaining space below — no rigid square, no hard divider, illustration
  // bleeds out at the bottom for a softer feel.
  return (
    <div className="h-full rounded-2xl border border-fd-border/60 bg-fd-card/40 overflow-hidden flex flex-col group hover:border-fd-primary/40 transition">
      <div className="p-5 pb-3">
        <div className="text-[10px] uppercase tracking-[0.14em] font-medium text-fd-primary mb-2">
          {tag}
        </div>
        <h3 className="text-base font-semibold tracking-tight mb-1.5 leading-snug">
          {title}
        </h3>
        <p className="text-[13px] text-fd-muted-foreground leading-relaxed mb-3 text-balance">
          {body}
        </p>
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-fd-border bg-fd-background hover:bg-fd-accent hover:border-fd-primary/40 transition"
        >
          {ctaLabel}
          <ArrowUpRight className="size-3 opacity-70" />
        </Link>
      </div>
      <div className="relative flex-1 min-h-[180px] mt-2 overflow-hidden">
        {illustration}
      </div>
    </div>
  );
}

/**
 * Brand-tinted radial backdrop + subtle film-grain overlay. Centers the
 * hero element inside.
 */
function IllustrationShell({
  children,
  radialAt = '50% 30%',
}: {
  children: React.ReactNode;
  radialAt?: string;
}) {
  // No opaque base — only a soft radial highlight + noise. The card
  // chrome shows through, so the illustration blends into the card body
  // instead of cutting against it.
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `radial-gradient(ellipse 65% 55% at ${radialAt}, color-mix(in oklch, var(--color-fd-primary) 14%, transparent), transparent 70%)`,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 noise-overlay opacity-[0.12] mix-blend-overlay pointer-events-none"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

/* ============================================================================
 * Illustration 1 — llms.txt
 * Layout reference: tailark "MD/TXT file-icon" — single tall sheet with
 * skeleton lines + colored corner badge. Slight tilt.
 * ============================================================================
 */
function LlmsTxtIllustration() {
  // tailark "meeting summary" — single card with date header, title, a
  // play pill wrapped in a rotating gradient ring, a tab strip with active
  // underline, and a bulleted summary. Adapted to a fictional llms.txt
  // index report.
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="relative h-full px-4 pt-2"
        style={{
          maskImage:
            'linear-gradient(to bottom, #000 65%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, #000 65%, transparent 100%)',
        }}
      >
        <div className="relative z-10 rounded-2xl bg-fd-card ring-1 ring-border-illustration shadow-lg shadow-black/[0.065] p-4">
          {/* date header */}
          <div className="flex items-center gap-1.5 text-[10px] text-fd-muted-foreground">
            <span>today</span>
            <span className="size-0.5 rounded-full bg-fd-foreground/50" />
            <span>09:15</span>
          </div>
          {/* title */}
          <div className="mt-0.5 text-[14px] font-semibold tracking-tight text-fd-foreground">
            llms.txt · index report
          </div>
          {/* play pill with rotating gradient ring */}
          <div className="relative mb-3 mt-2 w-fit overflow-hidden rounded-full bg-fd-foreground/10 p-px shadow-md shadow-black/5">
            <div
              className="absolute inset-0 aspect-square -translate-y-1/3 animate-spin opacity-60"
              style={{
                backgroundImage:
                  'linear-gradient(to bottom right, oklch(0.78 0.16 162), oklch(0.62 0.19 245), oklch(0.65 0.18 285))',
                maskImage:
                  'linear-gradient(to right, transparent 25%, #000 50%, transparent 75%)',
                WebkitMaskImage:
                  'linear-gradient(to right, transparent 25%, #000 50%, transparent 75%)',
                animationDuration: '4s',
              }}
            />
            <div className="relative flex h-7 items-center gap-1.5 rounded-full bg-fd-background/95 px-2.5 text-[10.5px] text-fd-foreground">
              <Play
                className="size-2.5 fill-fd-foreground text-fd-foreground"
                strokeWidth={1.5}
              />
              03:47
            </div>
          </div>
          {/* tab strip */}
          <div className="flex gap-3 border-b border-fd-border/60 text-[10.5px]">
            <div className="-mb-px flex cursor-pointer items-center gap-1 border-b border-fd-primary py-1.5">
              <Target className="size-3 text-fd-foreground" />
              <span className="text-fd-foreground font-medium">Summary</span>
            </div>
            <div className="-mb-px flex cursor-pointer items-center gap-1 py-1.5 text-fd-foreground/50">
              <NotepadText className="size-3" />
              <span>Routes</span>
            </div>
            <div className="-mb-px flex cursor-pointer items-center gap-1 py-1.5 text-fd-foreground/50">
              <LassoSelect className="size-3" />
              <span>Hits</span>
            </div>
          </div>
          {/* body */}
          <div className="mt-2 space-y-1.5 text-[10.5px] leading-snug">
            <p className="text-fd-muted-foreground">
              AI tools fetched 1,248 routes in the last 24h:
            </p>
            <ul className="list-disc space-y-1 pl-3.5 text-fd-muted-foreground">
              <li>
                <span className="font-medium text-fd-foreground">
                  Top consumer:
                </span>{' '}
                ChatGPT 612 · Claude 340 · Cursor 210
              </li>
              <li>
                <span className="font-medium text-fd-foreground">
                  Indexed scope:
                </span>{' '}
                /docs · /guides · /reference
              </li>
              <li>
                <span className="font-medium text-fd-foreground">
                  Refresh:
                </span>{' '}
                regenerated on every push to main
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * Illustration 2 — Hooks
 * Layout reference: tailark "Workflow" pipeline — vertical step list with
 * icon · title · subtitle · status badge per row, dashed connector between
 * rows, and a layered backdrop card peeking from the sides. Adapted to
 * ps-lando's init-scripts pipeline.
 * ============================================================================
 */
function HooksIllustration() {
  const [ref, played] = useInView<HTMLDivElement>();
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        ref={ref}
        className="relative h-full px-4 pt-3"
        style={{
          maskImage:
            'linear-gradient(to bottom, #000 65%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, #000 65%, transparent 100%)',
        }}
      >
        {/* backdrop layered cards — peek from the sides + below */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-9 top-2 bottom-4 rounded-2xl ring-1 ring-border-illustration bg-fd-card/75"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-6 top-4 bottom-4 rounded-2xl ring-1 ring-border-illustration bg-fd-card backdrop-blur"
        />
        {/* main workflow card */}
        <div className="relative z-10 rounded-t-2xl bg-fd-card ring-1 ring-border-illustration shadow-lg shadow-black/[0.065] p-4">
          <div className="text-[12px] font-medium text-fd-foreground">
            init-scripts/
          </div>
          <div className="mt-3">
            <WorkflowStep
              icon={<ShieldCheck className="size-3.5 text-fd-primary" />}
              title="01-tax-rules.sh"
              sub="VAT & tax rules"
              status="done"
              played={played}
              delay={150}
            />
            <WorkflowConnector />
            <WorkflowStep
              icon={<Database className="size-3.5 text-blue-600 dark:text-blue-400" />}
              title="02-seed.js"
              sub="Seeding catalog…"
              status="running"
              played={played}
              delay={300}
            />
            <WorkflowConnector />
            <WorkflowStep
              icon={<Flame className="size-3.5 text-fd-muted-foreground" />}
              title="03-warm.php"
              sub="Warm Twig cache"
              status="pending"
              played={played}
              delay={450}
            />
            <WorkflowConnector dim />
            <WorkflowStep
              icon={<Zap className="size-3.5 text-fd-muted-foreground" />}
              title="04-smoke.sh"
              sub="Run smoke tests"
              status="pending"
              played={played}
              delay={600}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

type WorkflowStatus = 'done' | 'running' | 'pending';

function WorkflowStep({
  icon,
  title,
  sub,
  status,
  played,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
  status: WorkflowStatus;
  played: boolean;
  delay: number;
}) {
  const dim = status === 'pending';
  return (
    <div
      className="flex items-center gap-2.5"
      style={{
        opacity: played ? (dim ? 0.5 : 1) : 0,
        transform: played ? 'translateX(0)' : 'translateX(-6px)',
        transition: `opacity 500ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 500ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      <div
        className="flex size-8 shrink-0 items-center justify-center rounded-lg ring-1 ring-border-illustration shadow-md shadow-black/[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, color-mix(in oklch, var(--color-fd-muted-foreground) 12%, var(--color-fd-card)), var(--color-fd-background))',
        }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-mono text-[10.5px] font-medium text-fd-foreground truncate">
          {title}
        </div>
        <div className="text-[9.5px] text-fd-muted-foreground truncate">
          {sub}
        </div>
      </div>
      {status === 'done' && (
        <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-fd-primary/15 text-fd-primary">
          <Check className="size-3" strokeWidth={2.5} />
        </div>
      )}
      {status === 'running' && (
        <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
          <LoaderCircle className="size-3 animate-spin" />
        </div>
      )}
      {status === 'pending' && (
        <span className="shrink-0 rounded-full bg-fd-muted-foreground/15 px-1.5 py-0.5 text-[8.5px] font-medium text-fd-muted-foreground">
          Pending
        </span>
      )}
    </div>
  );
}

function WorkflowConnector({ dim }: { dim?: boolean }) {
  return (
    <div
      className={`ml-4 border-l border-dashed border-fd-border py-1.5 ${
        dim ? 'opacity-50' : ''
      }`}
    />
  );
}

/* ============================================================================
 * Illustration 3 — Pipeline
 * Layout reference: tailark "In Progress task panel" — single white panel
 * with a row list, each row has a colored status bar on left + title + sub.
 * ============================================================================
 */
function PipelineIllustration() {
  const [ref, played] = useInView<HTMLDivElement>();
  // tailark "Spending Limit" panel with stacked-paper backdrop peeking
  // OUT THE TOP, plus a bottom-fade mask so the panel dissolves into the
  // card chrome. Stacked papers are drawn as narrower rounded slabs that
  // sit slightly above the main card; the bottom mask hides them below
  // the main card body so the illusion holds.
  return (
    <div
      className="absolute inset-0 flex items-end justify-center px-6 pt-7"
      style={{
        // soft tint only, no opaque base — blends with card chrome
        backgroundImage:
          'radial-gradient(ellipse 80% 60% at 50% 100%, color-mix(in oklch, var(--color-fd-primary) 8%, transparent), transparent 70%)',
        maskImage:
          'linear-gradient(to bottom, #000 65%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, #000 65%, transparent 100%)',
      }}
    >
      <div ref={ref} className="relative mx-auto w-[78%]">
        {/* paper 2 — furthest back, narrowest, peeks highest */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-4 left-12 right-12 h-10 rounded-t-2xl border border-fd-border bg-fd-card/70 shadow-sm shadow-black/5"
        />
        {/* paper 1 — closer, wider, peeks slightly */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-2 left-6 right-6 h-10 rounded-t-2xl border border-fd-border bg-fd-card shadow-sm shadow-black/5"
        />
        {/* main panel */}
        <div className="relative rounded-2xl border border-fd-border bg-fd-background p-4 shadow-xl shadow-black/10">
          <div className="text-fd-foreground font-medium text-[13px]">
            <span className="bg-fd-primary/15 text-fd-primary px-1 py-0.5 rounded">
              Modules
            </span>{' '}
            · parallel install
          </div>
          <div className="text-fd-muted-foreground mt-1 text-[11px]">
            ps-lando installs modules in concurrent batches
          </div>
          {/* split bar — 3 segments */}
          <div className="relative mb-3 mt-3 flex h-4 overflow-hidden rounded-md">
            <div
              className="h-4 rounded-l-md"
              style={{
                width: played ? '20%' : '0%',
                backgroundColor:
                  'color-mix(in oklab, var(--color-fd-foreground) 40%, var(--color-fd-primary))',
                transition: 'width 800ms cubic-bezier(0.22,1,0.36,1) 200ms',
              }}
            />
            <div
              className="h-4 bg-fd-primary"
              style={{
                width: played ? '20%' : '0%',
                transition: 'width 800ms cubic-bezier(0.22,1,0.36,1) 400ms',
              }}
            />
            <div
              className="h-4 rounded-r-md border border-fd-border"
              style={{
                width: played ? '60%' : '100%',
                backgroundImage:
                  'linear-gradient(-90deg, color-mix(in oklab, var(--color-fd-foreground) 18%, transparent) 25%, transparent 25%, transparent 50%, color-mix(in oklab, var(--color-fd-foreground) 18%, transparent) 50%, color-mix(in oklab, var(--color-fd-foreground) 18%, transparent) 75%, transparent 75%)',
                backgroundSize: '5px 5px',
                transition: 'width 800ms cubic-bezier(0.22,1,0.36,1) 400ms',
              }}
            />
          </div>
          {/* stats row */}
          <div className="flex gap-1 border-b border-dashed border-fd-border pb-2.5">
            <div className="w-2/5">
              <div className="text-fd-foreground text-lg font-medium leading-tight">
                40%
              </div>
              <div className="text-fd-muted-foreground text-[11px]">Done</div>
            </div>
            <div className="w-3/5">
              <div className="text-fd-foreground text-lg font-medium leading-tight">
                60%
              </div>
              <div className="text-fd-muted-foreground text-[11px]">
                Pending
              </div>
            </div>
          </div>
          {/* bullet rows */}
          <div className="mt-2.5 space-y-1">
            <div className="grid grid-cols-[auto_1fr] items-center gap-2">
              <div
                className="size-1.5 rounded-full"
                style={{
                  backgroundColor:
                    'color-mix(in oklab, var(--color-fd-foreground) 40%, var(--color-fd-primary))',
                }}
              />
              <div className="line-clamp-1 text-[11px] font-medium">
                Batch 1 ·{' '}
                <span className="text-fd-muted-foreground">24 modules</span>{' '}
                <span className="text-fd-primary">✓ done</span>
              </div>
            </div>
            <div className="grid grid-cols-[auto_1fr] items-center gap-2">
              <div className="bg-fd-primary size-1.5 rounded-full animate-pulse" />
              <div className="line-clamp-1 text-[11px] font-medium">
                Batch 2 ·{' '}
                <span className="text-fd-muted-foreground">14 modules</span>{' '}
                <span className="text-fd-muted-foreground">in progress</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * Illustration 4 — Compatibility
 * Layout reference: tailark "Seamless Integration" — 6-col logo grid with
 * dashed-empty placeholder cells and a diagonal stripe overlay creating
 * a "constellation" effect. Adapted to show 6 PrestaShop versions.
 * ============================================================================
 */
function CompatibilityIllustration() {
  const [ref, played] = useInView<HTMLDivElement>();
  // tailark "Seamless Integration" — 2 rows × 6 col staggered
  // checkerboard. Row 1: ⬚▣⬚▣⬚▣ · Row 2: ▣⬚▣⬚▣⬚.
  // On mobile the dashed empties are hidden so each row collapses to
  // 3 filled cells in a 3-col grid.
  const row1: (string | null)[] = [null, '8.0', null, '8.1', null, '8.2'];
  const row2: (string | null)[] = ['8.3', null, '9.0', null, '9.1', null];

  const renderCell = (label: string | null, i: number, base: number) => {
    const delay = 100 + (base + i) * 40;
    if (label === null) {
      return (
        <div
          key={i}
          className="hidden sm:block aspect-square rounded-md border border-dashed border-fd-foreground/15 bg-fd-card/50 backdrop-blur-3xl"
          style={{
            opacity: played ? 1 : 0,
            transition: `opacity 400ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
          }}
        />
      );
    }
    return (
      <div
        key={i}
        className="aspect-square rounded-md bg-fd-background ring-1 ring-border-illustration shadow-md shadow-black/[0.065] flex flex-col items-center justify-center"
        style={{
          opacity: played ? 1 : 0,
          transform: played ? 'scale(1)' : 'scale(0.7)',
          transition: `opacity 500ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 500ms cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
        }}
      >
        <span className="font-mono text-[8.5px] text-fd-muted-foreground leading-none">
          PS
        </span>
        <span className="font-mono text-[12px] font-semibold text-fd-foreground leading-tight">
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="relative h-full flex flex-col justify-center px-5 py-4"
        style={{
          // subtle vertical mint→neutral gradient (replaces tailark's
          // orange→zinc with our brand)
          backgroundImage:
            'linear-gradient(to bottom, transparent, color-mix(in oklch, var(--color-fd-primary) 7%, transparent) 50%, color-mix(in oklch, var(--color-fd-muted-foreground) 6%, transparent) 100%)',
        }}
      >
        {/* diagonal stripe overlay with radial mask */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-6 inset-y-0 mix-blend-overlay opacity-50"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-45deg, currentColor 0, currentColor 1px, transparent 1px, transparent 6px)',
            color: 'var(--color-fd-foreground)',
            maskImage:
              'radial-gradient(ellipse 50% 50% at 50% 50%, #000 70%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 50% 50% at 50% 50%, #000 70%, transparent 100%)',
          }}
        />
        <div ref={ref} className="relative space-y-3">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {row1.map((label, i) => renderCell(label, i, 0))}
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {row2.map((label, i) => renderCell(label, i, 6))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Re-export shared primitives so use-cases-section can borrow them */
export { IllustrationShell };
