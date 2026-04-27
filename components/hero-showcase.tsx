'use client';

import { useState } from 'react';
import {
  BookOpen,
  Terminal,
  Stethoscope,
  ArrowRight,
  FileText,
  Wrench,
  Database,
  Zap,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Globe,
  Server,
  Package,
  Search,
  Github,
  Hash,
  ChevronRight,
} from 'lucide-react';
import type { Dict } from '@/lib/i18n/dict';
import { BirdIcon } from './brand-icons';

type Tab = 'docs' | 'install' | 'diagnose';

export function HeroShowcase({ t }: { t: Dict }) {
  const [tab, setTab] = useState<Tab>('docs');
  const labels = t.hero.tabs;

  return (
    <div className="relative">
      {/* Tab strip */}
      <div className="@container relative z-10 border-b border-fd-border [mask-image:radial-gradient(ellipse_80%_95%_at_50%_0%,#000_80%,transparent_100%)]">
        <div className="border-y border-border-illustration pb-2">
          <div className="mx-auto max-w-3xl px-11">
            <div className="grid grid-cols-3 items-center justify-center gap-px divide-x divide-border-illustration border-x border-border-illustration *:h-16">
              <TabButton
                icon={<BookOpen />}
                label={labels.docs}
                active={tab === 'docs'}
                onClick={() => setTab('docs')}
              />
              <TabButton
                icon={<Terminal />}
                label={labels.install}
                active={tab === 'install'}
                onClick={() => setTab('install')}
              />
              <TabButton
                icon={<Stethoscope />}
                label={labels.diagnose}
                active={tab === 'diagnose'}
                onClick={() => setTab('diagnose')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Showcase — double-frame card with aspect ratio */}
      <div className="relative mx-auto -mt-2 max-w-6xl max-md:mx-1 lg:px-10">
        <div className="bg-fd-card ring-1 ring-border-illustration sm:aspect-[3/2] aspect-square rounded-2xl p-1 shadow-2xl shadow-black/25 backdrop-blur">
          <div className="bg-fd-card dark:bg-fd-background ring-1 ring-border-illustration sm:aspect-[3/2] relative aspect-square overflow-hidden rounded-xl border-4 border-l-8 border-transparent shadow">
            {tab === 'docs' && <DocsPane />}
            {tab === 'install' && <InstallPane />}
            {tab === 'diagnose' && <DiagnosePane />}
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex cursor-pointer items-center justify-center px-2"
    >
      <div
        className={`relative flex h-10 items-center gap-2 rounded-full px-4 ring-1 transition-all duration-150 [&>svg]:size-4 group-active:scale-[0.99] ${
          active
            ? 'text-fd-foreground ring-fd-primary/35 shadow-md shadow-fd-primary/20'
            : 'ring-border-illustration text-fd-muted-foreground group-hover:text-fd-foreground group-hover:bg-fd-foreground/5'
        }`}
        style={
          active
            ? {
                backgroundImage:
                  'linear-gradient(to bottom, color-mix(in oklch, var(--color-fd-primary) 8%, var(--color-fd-card)), var(--color-fd-card))',
              }
            : undefined
        }
      >
        {icon}
        <span className="@max-md:hidden">{label}</span>
      </div>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* DocsPane                                                                   */
/* -------------------------------------------------------------------------- */

function DocsPane() {
  return (
    <div className="absolute inset-0 flex flex-col bg-fd-background overflow-hidden">
      {/* Top bar */}
      <div
        className="flex items-center justify-between gap-4 px-5 py-3 border-b border-border-illustration"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, color-mix(in oklch, var(--color-fd-primary) 4%, var(--color-fd-card)), var(--color-fd-card))',
        }}
      >
        <div className="flex items-center gap-2">
          <BirdIcon className="size-5 text-fd-primary shrink-0" />
          <span className="font-semibold text-[13px] tracking-tight">Ps-lando</span>
          <ChevronRight className="size-3 text-fd-muted-foreground" />
          <span className="text-[12px] text-fd-muted-foreground">Docs</span>
          <ChevronRight className="size-3 text-fd-muted-foreground" />
          <span className="text-[12px] text-fd-foreground">Welcome</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full ring-1 ring-border-illustration bg-fd-background/70 text-[11px] text-fd-muted-foreground min-w-[180px] shadow-sm shadow-black/[0.04]">
            <Search className="size-3" />
            <span>Search…</span>
            <span className="ml-auto text-[9.5px] font-mono px-1 py-0.5 rounded bg-fd-card ring-1 ring-border-illustration">⌘K</span>
          </div>
          <button
            className="size-7 rounded-md ring-1 ring-border-illustration flex items-center justify-center shadow-sm shadow-black/[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(to bottom, var(--color-fd-card), var(--color-fd-background))',
            }}
          >
            <Github className="size-3.5 text-fd-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Body — sidebar + content */}
      <div className="grid grid-cols-[200px_1fr] sm:grid-cols-[240px_1fr] flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="border-r border-border-illustration bg-fd-card/40 p-5 overflow-hidden text-[12.5px]">
          <SidebarSection label="Getting started">
            <SidebarItem active>Welcome</SidebarItem>
            <SidebarItem>Quickstart</SidebarItem>
            <SidebarItem>Installation</SidebarItem>
          </SidebarSection>
          <SidebarSection label="Guides">
            <SidebarItem>First sandbox</SidebarItem>
            <SidebarItem>Selecting modules</SidebarItem>
            <SidebarItem>Hooks &amp; recipes</SidebarItem>
            <SidebarItem>Sandbox lifecycle</SidebarItem>
            <SidebarItem>Doctor</SidebarItem>
          </SidebarSection>
          <SidebarSection label="Reference">
            <SidebarItem>Commands</SidebarItem>
            <SidebarItem>Flags</SidebarItem>
            <SidebarItem>Recipes catalog</SidebarItem>
            <SidebarItem>Compatibility matrix</SidebarItem>
          </SidebarSection>
          <SidebarSection label="Knowledge base">
            <SidebarItem>Schema drift PS 8 → 9</SidebarItem>
            <SidebarItem>Symfony cache races</SidebarItem>
            <SidebarItem>HTMLPurifier bug</SidebarItem>
          </SidebarSection>
        </aside>

        {/* Content */}
        <div className="overflow-hidden flex flex-col">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_180px] gap-6 p-6 sm:p-8 flex-1 min-h-0 overflow-hidden">
            <div
              className="min-w-0 overflow-hidden"
              style={{
                maskImage:
                  'linear-gradient(to bottom, #000 86%, transparent 100%)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, #000 86%, transparent 100%)',
              }}
            >
              <div className="text-[11px] uppercase tracking-[0.14em] font-medium text-fd-muted-foreground mb-2">
                Getting started
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
                Welcome to ps-lando
              </h3>
              <p className="text-sm text-fd-muted-foreground leading-relaxed mb-6 max-w-xl">
                A CLI for local PrestaShop development. Wraps Lando, downloads
                PrestaShop from the official CDN, installs your theme, and
                orchestrates the modules you need — all in one command.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <DocCard icon={Zap} title="Quickstart" body="Spin up your first sandbox in 5 minutes." />
                <DocCard icon={Layers} title="Selecting modules" body="Skip blog, Easy Builder, or cherry-pick by name." />
                <DocCard icon={Sparkles} title="Recipes" body="6 bundled scripts for demo data, ES taxes, more." />
                <DocCard icon={Database} title="Sandbox lifecycle" body="Reset, dump, restore, doctor — full toolset." />
              </div>

              {/* Code block */}
              <div className="rounded-lg ring-1 ring-border-illustration bg-fd-card overflow-hidden shadow-sm shadow-black/[0.04]">
                <div
                  className="flex items-center justify-between px-3 py-2 border-b border-border-illustration text-[11px]"
                  style={{
                    backgroundImage:
                      'linear-gradient(to bottom, color-mix(in oklch, var(--color-fd-primary) 5%, var(--color-fd-card)), var(--color-fd-card))',
                  }}
                >
                  <div className="flex items-center gap-2 text-fd-muted-foreground">
                    <Terminal className="size-3" />
                    <span className="font-mono">terminal</span>
                  </div>
                  <span className="text-fd-muted-foreground font-mono">copy</span>
                </div>
                <div className="px-4 py-3 font-mono text-[11.5px] leading-relaxed">
                  <div>
                    <span className="text-fd-muted-foreground">$ </span>
                    npx ps-lando@latest create
                  </div>
                  <div className="text-fd-primary">
                    ✓ Sandbox ready · 55/56 modules · Done in 5m 41s
                  </div>
                </div>
              </div>
            </div>

            {/* On this page (right rail) */}
            <aside className="hidden lg:block min-w-0">
              <div className="text-[10px] uppercase tracking-[0.14em] font-medium text-fd-muted-foreground mb-3">
                On this page
              </div>
              <ul className="space-y-2 text-[11.5px] text-fd-muted-foreground">
                <li className="text-fd-foreground border-l-2 border-fd-primary pl-2">Overview</li>
                <li className="pl-2">Why ps-lando</li>
                <li className="pl-2">Compatibility</li>
                <li className="pl-2">Next steps</li>
              </ul>
              <div className="mt-6 pt-4 border-t border-border-illustration space-y-1.5 text-[11px] text-fd-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Hash className="size-3" /> Edit on GitHub
                </div>
                <div className="flex items-center gap-1.5">
                  <Hash className="size-3" /> Report an issue
                </div>
              </div>
            </aside>
          </div>

          {/* Footer pager */}
          <div className="grid grid-cols-2 gap-3 px-6 sm:px-8 py-3 border-t border-border-illustration bg-fd-card/30 text-[11.5px]">
            <div className="rounded-md ring-1 ring-border-illustration bg-fd-card/60 px-3 py-2 text-fd-muted-foreground opacity-60">
              <div className="text-[9.5px] uppercase tracking-wider mb-0.5">Previous</div>
              <div className="text-fd-foreground">—</div>
            </div>
            <div
              className="rounded-md ring-1 ring-border-illustration px-3 py-2 text-right text-fd-muted-foreground transition hover:ring-fd-primary/35 shadow-sm shadow-black/[0.04]"
              style={{
                backgroundImage:
                  'linear-gradient(to bottom, var(--color-fd-card), color-mix(in oklch, var(--color-fd-primary) 2%, var(--color-fd-card)))',
              }}
            >
              <div className="text-[9.5px] uppercase tracking-wider mb-0.5">Next</div>
              <div className="text-fd-foreground inline-flex items-center gap-1">
                Quickstart <ChevronRight className="size-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <div className="text-[10px] uppercase tracking-[0.14em] font-medium text-fd-muted-foreground mb-2">
        {label}
      </div>
      <ul className="space-y-1">{children}</ul>
    </div>
  );
}

function SidebarItem({ active, children }: { active?: boolean; children: React.ReactNode }) {
  return (
    <li
      className={`relative px-2 py-1 rounded-md ${
        active
          ? 'text-fd-foreground font-medium ring-1 ring-border-illustration shadow-sm shadow-black/[0.04]'
          : 'text-fd-muted-foreground'
      }`}
      style={
        active
          ? {
              backgroundImage:
                'linear-gradient(to bottom, color-mix(in oklch, var(--color-fd-primary) 8%, var(--color-fd-card)), var(--color-fd-card))',
            }
          : undefined
      }
    >
      {active && (
        <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-fd-primary" />
      )}
      {children}
    </li>
  );
}

function DocCard({ icon: Icon, title, body }: { icon: typeof Zap; title: string; body: string }) {
  return (
    <div
      className="rounded-md ring-1 ring-border-illustration p-3 transition hover:ring-fd-primary/35 shadow-sm shadow-black/[0.04]"
      style={{
        backgroundImage:
          'linear-gradient(to bottom, var(--color-fd-card), color-mix(in oklch, var(--color-fd-primary) 2%, var(--color-fd-card)))',
      }}
    >
      <div
        className="mb-2 flex size-7 items-center justify-center rounded-md ring-1 ring-border-illustration shadow-sm shadow-black/[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, color-mix(in oklch, var(--color-fd-muted-foreground) 12%, var(--color-fd-card)), var(--color-fd-background))',
        }}
      >
        <Icon className="size-3.5 text-fd-primary" />
      </div>
      <div className="font-medium text-[13px] mb-0.5 flex items-center gap-1">
        {title}
        <ArrowRight className="size-3 text-fd-muted-foreground" />
      </div>
      <div className="text-[11px] text-fd-muted-foreground leading-relaxed">{body}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* InstallPane                                                                */
/* -------------------------------------------------------------------------- */

const MODULE_PROGRESS = [
  { name: 'stoverride', state: 'done' as const },
  { name: 'stthemeeditor', state: 'done' as const },
  { name: 'stupgrader', state: 'done' as const },
  { name: 'stblog', state: 'done' as const },
  { name: 'stbanner', state: 'done' as const },
  { name: 'stmegamenu', state: 'done' as const },
  { name: 'stnewsletter', state: 'done' as const },
  { name: 'stcustomersignin', state: 'done' as const },
  { name: 'stswiper', state: 'done' as const },
  { name: 'stbestsellers', state: 'done' as const },
  { name: 'stcompare', state: 'done' as const },
  { name: 'stcountdown', state: 'done' as const },
  { name: 'stshoppingcart', state: 'active' as const },
  { name: 'stsearchbar', state: 'active' as const },
  { name: 'sttags', state: 'active' as const },
  { name: 'stbloglinknav', state: 'pending' as const },
  { name: 'stblogsearch', state: 'pending' as const },
  { name: 'stblogtags', state: 'pending' as const },
  { name: 'stsidebar', state: 'pending' as const },
  { name: 'stsocial', state: 'pending' as const },
  { name: 'stspecialslider', state: 'pending' as const },
  { name: 'ststickers', state: 'pending' as const },
  { name: 'stxlfgenerator', state: 'pending' as const },
  { name: 'stwishlist', state: 'pending' as const },
];

function InstallPane() {
  return (
    <div className="absolute inset-0 grid grid-cols-1 sm:grid-cols-[1.4fr_1fr] bg-fd-background overflow-hidden">
      {/* Terminal */}
      <div className="flex flex-col bg-fd-card/40 font-mono text-[12.5px] leading-relaxed overflow-hidden border-r border-border-illustration">
        <div
          className="flex items-center gap-1.5 px-5 py-3 border-b border-border-illustration"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, color-mix(in oklch, var(--color-fd-primary) 5%, var(--color-fd-card)), var(--color-fd-card))',
          }}
        >
          <span className="size-2.5 rounded-full bg-red-400/70 shadow-sm shadow-black/10" />
          <span className="size-2.5 rounded-full bg-yellow-400/70 shadow-sm shadow-black/10" />
          <span className="size-2.5 rounded-full bg-green-400/70 shadow-sm shadow-black/10" />
          <span className="ml-3 text-[11px] text-fd-muted-foreground">my-shop — ps-lando create</span>
          <span className="ml-auto text-[10px] text-fd-muted-foreground">3:24:08 PM</span>
        </div>
        <div className="flex-1 px-5 py-4 overflow-hidden space-y-1 min-h-0">
          <Line><span className="text-fd-muted-foreground">$ </span>npx ps-lando@latest create</Line>
          <Line>{' '}</Line>
          <Line tone="success">◇ Detected zips: panda-theme.zip · steasybuilder.zip · steasy_trans_panda.zip</Line>
          <Line tone="success">◇ Downloaded PrestaShop 9.1.0 from CDN (117 MB · 28s)</Line>
          <Line tone="success">◇ Extracted PrestaShop archive</Line>
          <Line tone="success">◇ Lando started · appserver, database, mail, phpmyadmin</Line>
          <Line tone="success">◇ Ran CLI installer (php install/index_cli.php)</Line>
          <Line tone="success">◇ Copied 54 st* modules from Panda</Line>
          <Line tone="success">◇ Activated Panda theme via SQL fallback</Line>
          <Line tone="primary">◐ Installing modules · 12 / 56 (parallel)</Line>
          <Line>{' '}</Line>
          <Line>Front:    http://my-shop.lndo.site/</Line>
          <Line>Admin:    http://my-shop.lndo.site/admin8a3kls9d/</Line>
          <Line>PHP:      8.5</Line>
          <Line>Theme:    panda</Line>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-col overflow-hidden">
        {/* Module install progress */}
        <div className="p-5 sm:p-6 flex-1 min-h-0 overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span
                className="flex size-5 items-center justify-center rounded-md ring-1 ring-border-illustration shadow-sm shadow-black/[0.04]"
                style={{
                  backgroundImage:
                    'linear-gradient(to bottom, color-mix(in oklch, var(--color-fd-muted-foreground) 12%, var(--color-fd-card)), var(--color-fd-background))',
                }}
              >
                <Package className="size-3 text-fd-primary" />
              </span>
              <div className="text-[10px] uppercase tracking-[0.14em] font-medium text-fd-muted-foreground">
                Module install
              </div>
            </div>
            <div className="text-[11px] font-mono text-fd-foreground tabular-nums">12 / 56</div>
          </div>

          {/* split progress bar — done mint · active blue · pending striped */}
          <div className="relative mb-4 flex h-1.5 overflow-hidden rounded-full">
            <div
              className="h-1.5 rounded-l-full"
              style={{
                width: `${(12 / 56) * 100}%`,
                backgroundColor:
                  'color-mix(in oklab, var(--color-fd-foreground) 30%, var(--color-fd-primary))',
              }}
            />
            <div
              className="h-1.5 bg-fd-primary"
              style={{ width: `${(3 / 56) * 100}%` }}
            />
            <div
              className="h-1.5 flex-1 rounded-r-full"
              style={{
                backgroundImage:
                  'linear-gradient(-90deg, color-mix(in oklab, var(--color-fd-foreground) 18%, transparent) 25%, transparent 25%, transparent 50%, color-mix(in oklab, var(--color-fd-foreground) 18%, transparent) 50%, color-mix(in oklab, var(--color-fd-foreground) 18%, transparent) 75%, transparent 75%)',
                backgroundSize: '5px 5px',
              }}
            />
          </div>

          <div
            className="flex flex-wrap gap-1.5 mb-4 max-h-[140px] overflow-hidden"
            style={{
              maskImage:
                'linear-gradient(to bottom, #000 65%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, #000 65%, transparent 100%)',
            }}
          >
            {MODULE_PROGRESS.map((m) => (
              <ModuleChip key={m.name} name={m.name} state={m.state} />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 text-[11px]">
            <Stat label="Elapsed" value="2m 14s" />
            <Stat label="Concurrency" value="3" />
            <Stat label="Failed" value="0" tone="success" />
          </div>
        </div>

        {/* Activity feed at the bottom */}
        <div
          className="border-t border-border-illustration p-4 overflow-hidden"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, color-mix(in oklch, var(--color-fd-primary) 3%, var(--color-fd-card)), var(--color-fd-card))',
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] uppercase tracking-[0.14em] font-medium text-fd-muted-foreground">
              Activity
            </div>
            <span className="flex items-center gap-1 text-[9.5px] text-fd-muted-foreground">
              <span className="size-1.5 rounded-full bg-fd-primary animate-pulse" />
              live
            </span>
          </div>
          <div className="space-y-1.5 text-[11px]">
            <ActivityRow time="3:24:08" text="stcompare installed (4.2s)" tone="success" />
            <ActivityRow time="3:24:04" text="stcountdown installed (3.1s)" tone="success" />
            <ActivityRow time="3:24:01" text="stbestsellers installed (3.8s)" tone="success" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Line({ children, tone }: { children: React.ReactNode; tone?: 'success' | 'primary' }) {
  const cls =
    tone === 'success'
      ? 'text-fd-primary'
      : tone === 'primary'
        ? 'text-blue-600 dark:text-blue-400'
        : 'text-fd-foreground';
  return <div className={cls}>{children}</div>;
}

function ModuleChip({ name, state }: { name: string; state: 'done' | 'active' | 'pending' }) {
  const styles =
    state === 'done'
      ? 'bg-fd-primary/12 ring-fd-primary/30 text-fd-foreground'
      : state === 'active'
      ? 'bg-blue-500/10 ring-blue-500/30 text-fd-foreground dark:text-fd-foreground'
      : 'bg-fd-card ring-border-illustration text-fd-muted-foreground';
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10.5px] font-mono ring-1 ${styles}`}>
      {state === 'done' && <CheckCircle2 className="size-2.5 text-fd-primary" />}
      {state === 'active' && <span className="size-1.5 rounded-full bg-blue-500 animate-pulse" />}
      {name}
    </span>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: 'success' }) {
  return (
    <div
      className="rounded-md ring-1 ring-border-illustration p-2.5 shadow-sm shadow-black/[0.04]"
      style={{
        backgroundImage:
          'linear-gradient(to bottom, var(--color-fd-card), color-mix(in oklch, var(--color-fd-primary) 2%, var(--color-fd-card)))',
      }}
    >
      <div className="text-[9px] uppercase tracking-wider text-fd-muted-foreground mb-1">{label}</div>
      <div className={`font-mono text-sm font-medium tabular-nums ${tone === 'success' ? 'text-fd-primary' : 'text-fd-foreground'}`}>
        {value}
      </div>
    </div>
  );
}

function ActivityRow({ time, text, tone }: { time: string; text: string; tone?: 'success' }) {
  return (
    <div className="flex items-center gap-2 font-mono">
      <span className="text-fd-muted-foreground tabular-nums text-[10px]">{time}</span>
      <CheckCircle2 className={`size-3 ${tone === 'success' ? 'text-fd-primary' : 'text-fd-muted-foreground'}`} />
      <span className="text-fd-foreground">{text}</span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* DiagnosePane                                                               */
/* -------------------------------------------------------------------------- */

const CHECKS = [
  { label: 'Lando running', detail: 'my-shop', state: 'ok' as const },
  { label: 'Database accessible', detail: 'lamp', state: 'ok' as const },
  { label: 'st* modules active', detail: '55 / 56', state: 'ok' as const },
  { label: 'Active theme', detail: 'panda', state: 'ok' as const },
  { label: 'Front-end HTTP', detail: '200', state: 'ok' as const },
  { label: 'Back-office HTTP', detail: '302 → /admin8a3kls9d/', state: 'ok' as const },
  { label: 'Init scripts dir', detail: 'init-scripts/ (3 files)', state: 'ok' as const },
  { label: 'HTMLPurifier cache dir', detail: 'missing — auto-fixable', state: 'warn' as const },
  { label: 'Recent var/logs/ errors', detail: 'none', state: 'ok' as const },
];

function DiagnosePane() {
  return (
    <div className="absolute inset-0 flex flex-col bg-fd-background overflow-hidden">
      {/* Top — checklist + sandbox info side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] flex-1 min-h-0">
        {/* Checklist */}
        <div className="p-5 sm:p-6 overflow-hidden border-r border-border-illustration flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span
                className="flex size-6 items-center justify-center rounded-md ring-1 ring-fd-primary/30 shadow-sm shadow-fd-primary/15"
                style={{
                  backgroundImage:
                    'linear-gradient(to bottom, color-mix(in oklch, var(--color-fd-primary) 18%, transparent), color-mix(in oklch, var(--color-fd-primary) 6%, transparent))',
                }}
              >
                <Stethoscope className="size-3.5 text-fd-primary" />
              </span>
              <span className="font-mono text-[12.5px]">ps-lando doctor</span>
            </div>
            <div className="flex items-center gap-2 text-[10.5px]">
              <span className="inline-flex items-center gap-1 rounded-full bg-fd-primary/12 px-2 py-0.5 ring-1 ring-fd-primary/30 text-fd-primary font-medium">
                <CheckCircle2 className="size-2.5" strokeWidth={2.5} />8 ok
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 ring-1 ring-amber-500/30 text-amber-600 dark:text-amber-400 font-medium">
                <AlertTriangle className="size-2.5" strokeWidth={2.5} />1 warn
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-fd-card px-2 py-0.5 ring-1 ring-border-illustration text-fd-muted-foreground">
                0 fail
              </span>
            </div>
          </div>
          <div className="space-y-1 flex-1 min-h-0">
            {CHECKS.map((c) => <CheckRow key={c.label} {...c} />)}
          </div>
          <div className="mt-3 pt-3 border-t border-border-illustration flex items-center justify-between text-[11px]">
            <span className="text-fd-muted-foreground">Suggested:</span>
            <span
              className="font-mono text-fd-foreground rounded-md ring-1 ring-border-illustration px-2 py-0.5 shadow-sm shadow-black/[0.04]"
              style={{
                backgroundImage:
                  'linear-gradient(to bottom, var(--color-fd-card), color-mix(in oklch, var(--color-fd-primary) 3%, var(--color-fd-card)))',
              }}
            >
              ps-lando doctor --fix
            </span>
          </div>
        </div>

        {/* Sandbox info */}
        <div className="p-5 sm:p-6 overflow-hidden flex flex-col">
          <div className="text-[10px] uppercase tracking-[0.14em] font-medium text-fd-muted-foreground mb-4">
            Sandbox info
          </div>
          <div className="space-y-3 mb-5">
            <InfoRow icon={Globe} label="Domain" value="my-shop.lndo.site" />
            <InfoRow icon={Server} label="PrestaShop" value="9.1.0" />
            <InfoRow icon={FileText} label="PHP" value="8.5" />
            <InfoRow icon={Package} label="Theme" value="panda 2.9.2" />
            <InfoRow icon={Activity} label="Uptime" value="2h 14m" />
            <InfoRow icon={Wrench} label="Modules" value="55 / 56" />
          </div>

          <div
            className="relative rounded-lg ring-1 ring-fd-primary/30 p-3 mt-auto shadow-sm shadow-fd-primary/10"
            style={{
              backgroundImage:
                'linear-gradient(to bottom, color-mix(in oklch, var(--color-fd-primary) 12%, var(--color-fd-card)), color-mix(in oklch, var(--color-fd-primary) 4%, var(--color-fd-card)))',
            }}
          >
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-fd-primary font-medium mb-1">
              <span className="flex size-4 items-center justify-center rounded-full bg-fd-primary/20 ring-1 ring-fd-primary/30">
                <CheckCircle2 className="size-2.5" strokeWidth={2.5} />
              </span>
              Healthy
            </div>
            <div className="text-[11px] text-fd-muted-foreground leading-snug">
              One warning, auto-fixable. Run with{' '}
              <span className="font-mono text-fd-foreground">--fix</span> to apply.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom — recent activity bar */}
      <div
        className="border-t border-border-illustration px-5 sm:px-6 py-3 overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, color-mix(in oklch, var(--color-fd-primary) 3%, var(--color-fd-card)), var(--color-fd-card))',
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="text-[10px] uppercase tracking-[0.14em] font-medium text-fd-muted-foreground">
            Recent activity
          </div>
          <span className="flex items-center gap-1 text-[10px] text-fd-muted-foreground font-mono">
            <span className="size-1.5 rounded-full bg-fd-primary/60" />
            last 10 min
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
          <ActivityRow time="3:24" text="doctor ran · 8 ok / 1 warn" tone="success" />
          <ActivityRow time="3:18" text="install-modules · 55/56 active" tone="success" />
          <ActivityRow time="3:02" text="hooks run spain-taxes (1.3s)" tone="success" />
        </div>
      </div>
    </div>
  );
}

function CheckRow({ label, detail, state }: { label: string; detail: string; state: 'ok' | 'warn' }) {
  const Icon = state === 'ok' ? CheckCircle2 : AlertTriangle;
  return (
    <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-md hover:bg-fd-accent transition">
      <div
        className={`flex size-5 shrink-0 items-center justify-center rounded-full ring-1 ring-border-illustration ${
          state === 'ok'
            ? 'bg-fd-primary/15 text-fd-primary'
            : 'bg-amber-500/15 text-amber-500'
        }`}
      >
        <Icon className="size-3" strokeWidth={2.5} />
      </div>
      <div className="text-[12.5px] flex-1 min-w-0 truncate">{label}</div>
      <div className="text-[11px] text-fd-muted-foreground font-mono truncate">{detail}</div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof Globe; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="size-7 rounded-md ring-1 ring-border-illustration flex items-center justify-center shadow-sm shadow-black/[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, color-mix(in oklch, var(--color-fd-muted-foreground) 12%, var(--color-fd-card)), var(--color-fd-background))',
        }}
      >
        <Icon className="size-3.5 text-fd-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-fd-muted-foreground leading-tight">{label}</div>
        <div className="font-mono text-[12px] text-fd-foreground truncate">{value}</div>
      </div>
    </div>
  );
}
