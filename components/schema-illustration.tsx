'use client';

import { Check } from 'lucide-react';
import { IllustrationShell } from './llm-section';
import { useInView } from '@/lib/use-in-view';

/**
 * Schema-aware illustration. Replicates the tailark "task panel" layout:
 * a single tilted white card with a "X / X" counter and a list of rows,
 * each with a check mark + label + version tag. Visualizes the message
 * "PrestaShop 8 and 9 drift is handled" as a checklist of fixed issues.
 */
export function SchemaIllustration() {
  const [ref, played] = useInView<HTMLDivElement>();
  const rows = [
    { label: 'ps_customer_shop dropped', version: 'PS 9' },
    { label: 'meta_keywords removed', version: 'PS 9' },
    { label: 'Cache.SerializerPath race', version: 'PS 8.2+' },
    { label: 'theme:enable bug', version: 'PS 8.x' },
    { label: 'HTMLPurifier dirs', version: 'PS 9' },
    { label: 'container compile race', version: 'PS 8.2+' },
  ];
  return (
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-fd-border/60">
      <IllustrationShell radialAt="50% 35%">
        <div
          ref={ref}
          className="w-[78%] sm:w-[70%] rounded-2xl bg-fd-background ring-1 ring-fd-border shadow-xl shadow-black/10 p-4"
          style={{ transform: 'rotate(-1.5deg)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.14em] font-medium text-fd-muted-foreground">
                Drift handled
              </div>
              <div className="font-mono text-[12px] font-medium text-fd-foreground mt-0.5">
                ps-lando · doctor
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[14px] font-semibold text-fd-foreground leading-none">
                <Counter target={11} played={played} delay={1100} />
                {' / 11'}
              </div>
              <div
                className="text-[9px] text-fd-primary mt-1 uppercase tracking-wider"
                style={{
                  opacity: played ? 1 : 0,
                  transition: 'opacity 500ms cubic-bezier(0.22,1,0.36,1) 1500ms',
                }}
              >
                all clear
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            {rows.map((r, i) => (
              <DriftRow
                key={i}
                label={r.label}
                version={r.version}
                played={played}
                delay={150 + i * 130}
              />
            ))}
          </div>
        </div>
      </IllustrationShell>
    </div>
  );
}

function Counter({
  target,
  played,
  delay = 0,
}: {
  target: number;
  played: boolean;
  delay?: number;
}) {
  // Cheap pure-CSS counter: fades in. (For real tweening we'd need a hook;
  // the row stagger already conveys the "filling up" feel.)
  return (
    <span
      style={{
        opacity: played ? 1 : 0,
        transition: `opacity 500ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {target}
    </span>
  );
}

function DriftRow({
  label,
  version,
  played = true,
  delay = 0,
}: {
  label: string;
  version: string;
  played?: boolean;
  delay?: number;
}) {
  const tone = version.startsWith('PS 9')
    ? 'mint'
    : 'amber';
  const tag = {
    mint: 'bg-fd-primary/10 text-fd-primary border-fd-primary/25',
    amber:
      'bg-amber-100 text-amber-900 border-amber-200 dark:bg-amber-400/15 dark:text-amber-300 dark:border-amber-400/25',
  } as const;
  return (
    <div
      className="flex items-center gap-2"
      style={{
        opacity: played ? 1 : 0,
        transform: played ? 'translateX(0)' : 'translateX(-6px)',
        transition: `opacity 450ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 450ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      <span
        className="size-3.5 rounded-full bg-fd-primary text-white flex items-center justify-center shrink-0"
        style={{
          transform: played ? 'scale(1)' : 'scale(0)',
          transition: `transform 500ms cubic-bezier(0.34,1.56,0.64,1) ${delay + 80}ms`,
        }}
      >
        <Check className="size-2.5" strokeWidth={3} />
      </span>
      <span className="font-mono text-[10px] text-fd-foreground flex-1 truncate">
        {label}
      </span>
      <span
        className={`shrink-0 px-1.5 py-0.5 rounded text-[8.5px] font-medium tracking-wider border ${tag[tone]}`}
      >
        {version}
      </span>
    </div>
  );
}
