'use client';

import {
  ArrowUpRight,
  BatteryFull,
  Plus,
  Signal,
  TrendingUp,
  Wifi,
} from 'lucide-react';
import Link from 'next/link';
import { IllustrationShell } from './llm-section';
import { AnimateText, Reveal } from './animate-text';
import { useInView } from '@/lib/use-in-view';
import type { Dict } from '@/lib/i18n/dict';

/**
 * Use-cases section. Three illustrations replicate distinct tailark
 * gallery layouts: uptime bar chart · kanban columns · ZIP file-icon.
 */
export function UseCasesSection({ t }: { t: Dict }) {
  const s = t.useCases;
  return (
    <section className="border-t border-fd-border/60 bg-fd-card/30">
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

        <div className="grid lg:grid-cols-3 gap-5 items-stretch">
          <Reveal delay={0} className="h-full">
            <UseCaseCard
              illustration={<DailyIllustration />}
              tag={s.daily.eyebrow}
              title={s.daily.title}
              body={s.daily.body}
              ctaLabel={s.daily.cta}
              ctaHref="/docs/guides/sandbox-lifecycle"
            />
          </Reveal>
          <Reveal delay={120} className="h-full">
            <UseCaseCard
              illustration={<OnboardingIllustration />}
              tag={s.onboarding.eyebrow}
              title={s.onboarding.title}
              body={s.onboarding.body}
              ctaLabel={s.onboarding.cta}
              ctaHref="/docs/guides/selecting-modules"
            />
          </Reveal>
          <Reveal delay={240} className="h-full">
            <UseCaseCard
              illustration={<QaIllustration />}
              tag={s.qa.eyebrow}
              title={s.qa.title}
              body={s.qa.body}
              ctaLabel={s.qa.cta}
              ctaHref="/docs/guides/sandbox-lifecycle"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function UseCaseCard({
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
  // tailark bento-three: text on top, illustration fills the bottom.
  return (
    <div className="h-full rounded-2xl border border-fd-border/60 bg-fd-background overflow-hidden flex flex-col group hover:border-fd-primary/40 transition">
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
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-fd-border bg-fd-card hover:bg-fd-accent hover:border-fd-primary/40 transition"
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

/* ============================================================================
 * Illustration 4 — Daily / "Iterate without re-creating"
 * Layout reference: tailark "Screen Time" — phone-shaped card with status
 * bar (9:41 + signal/wifi/battery), Running ▲65%, big time stat, weekly
 * bar chart with today highlighted. Adapted to ps-lando iteration time.
 * ============================================================================
 */
function DailyIllustration() {
  const [ref, played] = useInView<HTMLDivElement>();
  const days = [
    { label: 'Mon', h: 28 },
    { label: 'Tue', h: 50 },
    { label: 'Wed', h: 72 },
    { label: 'Thu', h: 90 },
    { label: 'Fri', h: 56 },
    { label: 'Sat', h: 36 },
    { label: 'Sun', h: 84, today: true },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        ref={ref}
        className="relative h-full px-3 pt-2"
        style={{
          maskImage:
            'linear-gradient(to bottom, #000 75%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, #000 75%, transparent 100%)',
        }}
      >
        {/* outer "phone case" */}
        <div className="mx-auto max-w-[280px] overflow-hidden rounded-t-[2rem] border border-transparent bg-fd-background/75 ring-1 ring-border-illustration shadow-md shadow-black/[0.065] px-1.5 pt-1.5">
          {/* inner "screen" */}
          <div className="overflow-hidden rounded-t-[1.5rem] bg-fd-card ring-1 ring-border-illustration shadow shadow-black/[0.065] px-4 pb-12 pt-1">
            {/* status bar */}
            <div className="flex items-center justify-between py-1.5 pl-2 text-[10px]">
              <span className="font-semibold text-fd-foreground">9:41</span>
              <div className="flex items-end gap-0.5 text-fd-foreground">
                <Signal className="size-3" strokeWidth={2.5} />
                <Wifi className="size-3" strokeWidth={2.5} />
                <BatteryFull className="size-3.5" />
              </div>
            </div>
            {/* Running 65% */}
            <div className="mt-3 flex items-center gap-1.5 text-[10px] text-fd-muted-foreground">
              Running
              <div className="flex items-center gap-1">
                <span className="flex size-3 items-center justify-center rounded-[3px] bg-fd-primary text-white">
                  <TrendingUp className="size-2" strokeWidth={3} />
                </span>
                <span className="text-[10px] font-medium text-fd-primary">
                  65%
                </span>
              </div>
            </div>
            {/* time */}
            <div className="mt-0.5 flex items-baseline gap-1.5">
              <span className="text-[26px] font-semibold tracking-tight text-fd-foreground leading-none">
                11
              </span>
              <span className="text-[10px] text-fd-foreground/50">hr</span>
              <span className="text-[26px] font-semibold tracking-tight text-fd-foreground leading-none">
                59
              </span>
              <span className="text-[10px] text-fd-foreground/50">min</span>
            </div>
            {/* weekly bar chart */}
            <div className="mt-6 grid h-20 grid-cols-7 items-end text-fd-muted-foreground">
              {days.map((d, i) => (
                <div
                  key={d.label}
                  className="flex h-full flex-col items-center justify-end gap-1 text-[8.5px]"
                >
                  <div
                    className={`w-1.5 rounded-[1px] ${
                      d.today
                        ? 'bg-gradient-to-b from-fd-primary/70 to-fd-primary'
                        : 'bg-fd-foreground/10'
                    }`}
                    style={{
                      height: played ? `${d.h}%` : '0%',
                      transition: `height 700ms cubic-bezier(0.22,1,0.36,1) ${100 + i * 60}ms`,
                    }}
                  />
                  {d.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * Illustration 5 — Onboarding
 * Layout reference: tailark "Kanban DnD" — 2 columns ("In Progress" / "Ready
 * for Review"), card lifted out of its dotted origin slot with rotation +
 * shadow, second column shows a drop zone. Adapted to ps-lando module
 * selection (mint accent in place of tailark's emerald).
 * ============================================================================
 */
function OnboardingIllustration() {
  const [ref, played] = useInView<HTMLDivElement>();
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        ref={ref}
        className="relative h-full px-4 pt-2"
        style={{
          maskImage:
            'linear-gradient(to bottom, #000 65%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, #000 65%, transparent 100%)',
        }}
      >
        <div className="grid grid-cols-2 gap-2 *:rounded-xl *:border *:border-fd-border/60 *:bg-fd-card/30 *:p-1">
          {/* Column 1: In Progress */}
          <div>
            <div className="text-fd-muted-foreground px-2 pb-1.5 pt-1 text-[10px] font-semibold">
              In Progress
            </div>
            <div className="space-y-1.5">
              {/* origin slot with dotted pattern + lifted card on top */}
              <div className="relative h-16 rounded-lg ring-1 ring-border-illustration">
                <div
                  aria-hidden
                  className="absolute inset-1.5 z-0 opacity-30"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 1px 1px, var(--color-fd-muted-foreground) 0.8px, transparent 0)',
                    backgroundSize: '8px 8px',
                  }}
                />
                <div
                  className="absolute inset-0 z-10 flex h-16 flex-col justify-between rounded-lg bg-fd-background p-2.5 shadow-xl shadow-black/15 ring-1 ring-border-illustration"
                  style={{
                    transform: played
                      ? 'rotate(4deg) translate(6px, 6px)'
                      : 'rotate(0deg) translate(0, 0)',
                    transition:
                      'transform 700ms cubic-bezier(0.34,1.56,0.64,1) 250ms',
                  }}
                >
                  <div className="text-[10.5px] font-semibold text-fd-foreground leading-tight">
                    Multi-language SEO
                  </div>
                  <div className="flex items-center gap-1.5">
                    <img
                      alt="educlopez"
                      width={20}
                      height={20}
                      loading="lazy"
                      src="https://avatars.githubusercontent.com/educlopez"
                      className="size-3 rounded-full ring-1 ring-fd-border object-cover"
                    />
                    <span className="text-[9px] font-medium text-fd-foreground">
                      educlopez
                    </span>
                  </div>
                </div>
              </div>
              {/* flat card */}
              <div className="bg-fd-card flex h-16 flex-col justify-between rounded-lg p-2.5 ring-1 ring-border-illustration">
                <div className="text-[10.5px] font-semibold text-fd-foreground leading-tight">
                  Loyalty rewards
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="size-3 rounded-full bg-fd-muted-foreground/25 ring-1 ring-fd-muted-foreground/40 text-[7px] font-semibold text-fd-foreground/70 flex items-center justify-center">
                    EC
                  </span>
                  <span className="text-[9px] font-medium text-fd-foreground">
                    data-team
                  </span>
                </div>
              </div>
              {/* add task pseudo-button */}
              <div className="flex items-center gap-1 rounded-lg bg-fd-foreground/[0.04] p-1.5">
                <Plus className="size-3 opacity-50" />
                <span className="text-[9.5px] font-medium text-fd-foreground/70">
                  Add task
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Ready for Review */}
          <div className="flex flex-col">
            <div className="text-fd-muted-foreground px-2 pb-1.5 pt-1 text-[10px] font-semibold">
              Ready for Review
            </div>
            <div className="space-y-1.5">
              <div className="relative flex h-16 items-center justify-center rounded-lg ring-1 ring-fd-primary/30">
                <div
                  aria-hidden
                  className="absolute inset-1.5 z-0 opacity-25"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 1px 1px, var(--color-fd-primary) 0.8px, transparent 0)',
                    backgroundSize: '8px 8px',
                  }}
                />
                <div
                  className="relative z-10 text-[10.5px] font-semibold text-fd-primary"
                  style={{
                    opacity: played ? 1 : 0,
                    transform: played ? 'scale(1)' : 'scale(0.85)',
                    transition:
                      'opacity 400ms cubic-bezier(0.22,1,0.36,1) 600ms, transform 500ms cubic-bezier(0.34,1.56,0.64,1) 600ms',
                  }}
                >
                  Drop here
                </div>
              </div>
            </div>
            <div className="mt-auto flex items-center gap-1 rounded-lg bg-fd-foreground/[0.04] p-1.5">
              <Plus className="size-3 opacity-50" />
              <span className="text-[9.5px] font-medium text-fd-foreground/70">
                Add task
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * Illustration 6 — QA & demos
 * Layout reference: tailark "Poll Created · +50 Users voted · Poll Closed"
 * vertical timeline with two flat events around a highlighted card containing
 * stacked avatars. Adapted to ps-lando snapshot review lifecycle.
 * ============================================================================
 */
function QaIllustration() {
  return (
    <IllustrationShell radialAt="50% 50%">
      <div aria-hidden className="relative w-full select-none px-5">
        <div className="relative w-full space-y-2.5 py-5">
          {/* vertical timeline line */}
          <span className="absolute inset-y-0 w-px bg-fd-foreground/10" />

          {/* event 1 */}
          <div className="relative pl-5">
            <span className="absolute left-[-2px] top-[18px] block size-[5px] rounded-full border border-fd-muted-foreground bg-fd-background ring-2 ring-fd-background" />
            <div className="text-[10px] text-fd-muted-foreground">10:00</div>
            <div className="mt-0.5 text-[12px] font-medium text-fd-foreground">
              Snapshot created
            </div>
          </div>

          {/* event 2 — highlighted card with avatars */}
          <div className="relative -mx-3 rounded-2xl border border-transparent bg-fd-background ring-1 ring-border-illustration shadow shadow-black/[0.065] p-2 text-[10px]">
            <div className="ml-7 text-[10px] text-fd-muted-foreground">10:32</div>
            <div className="ml-7 flex py-1">
              <div className="flex -space-x-1.5">
                <span className="block size-5 rounded-full bg-fd-background border border-fd-border p-0.5 shadow-sm shadow-black/5">
                  <img
                    alt="educlopez"
                    width={20}
                    height={20}
                    loading="lazy"
                    src="https://avatars.githubusercontent.com/educlopez"
                    className="aspect-square size-full rounded-full object-cover"
                  />
                </span>
                <span className="flex size-5 items-center justify-center rounded-full bg-fd-card border border-fd-border text-[7.5px] font-semibold text-fd-foreground/70 shadow-sm shadow-black/5">
                  MR
                </span>
                <span className="flex size-5 items-center justify-center rounded-full bg-fd-card border border-fd-border text-[7.5px] font-semibold text-fd-foreground/70 shadow-sm shadow-black/5">
                  TB
                </span>
                <span className="flex size-5 items-center justify-center rounded-full bg-fd-card border border-fd-border text-[7.5px] font-semibold text-fd-foreground/70 shadow-sm shadow-black/5">
                  GL
                </span>
              </div>
            </div>
            <div className="relative ml-7 mt-0.5 text-[12px] font-medium text-fd-foreground">
              <span className="absolute left-[-19px] top-1/2 -translate-y-1/2 block size-[5px] rounded-full border border-fd-primary bg-fd-background ring-2 ring-fd-background" />
              +4 reviewers verified
            </div>
          </div>

          {/* event 3 */}
          <div className="relative pl-5">
            <span className="absolute left-[-2px] top-[18px] block size-[5px] rounded-full border border-fd-muted-foreground bg-fd-background ring-2 ring-fd-background" />
            <div className="text-[10px] text-fd-muted-foreground">10:45</div>
            <div className="mt-0.5 text-[12px] font-medium text-fd-foreground">
              Ready to ship
            </div>
          </div>
        </div>
      </div>
    </IllustrationShell>
  );
}
