import {
  ShoppingBag,
  Users,
  FileText,
  Receipt,
  Flame,
  Eraser,
  CheckCircle2,
  AlertTriangle,
  Database,
  Save,
  Download,
  Stethoscope,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* Module group chips                                                         */
/* -------------------------------------------------------------------------- */

export function ModuleGroupsVisual() {
  return (
    <div className="gb-card rounded-2xl p-6 sm:p-8 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(circle at 30% 0%, color-mix(in oklch, var(--color-fd-primary) 12%, transparent), transparent 60%)',
        }}
      />

      <div className="relative">
        <div className="text-[11px] uppercase tracking-[0.14em] font-medium text-fd-muted-foreground mb-3">
          Active selection
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Pill active>core (43)</Pill>
          <Pill active>easybuilder (2)</Pill>
          <Pill>blog (11)</Pill>
          <Pill>social (4)</Pill>
          <Pill>marketing (4)</Pill>
        </div>

        <div className="flex items-baseline gap-3 mb-1">
          <div className="text-5xl font-semibold tracking-tight tabular-nums">
            45
          </div>
          <div className="text-fd-muted-foreground text-sm">
            of 56 modules selected
          </div>
        </div>
        <div className="h-2 rounded-full bg-fd-border/40 overflow-hidden">
          <div
            className="h-full bg-fd-primary"
            style={{ width: `${(45 / 56) * 100}%` }}
          />
        </div>

        <div className="mt-6 pt-5 border-t border-fd-border/60 grid grid-cols-3 gap-3 text-[12px]">
          <div>
            <div className="text-fd-muted-foreground">Time saved</div>
            <div className="font-medium tabular-nums">~38 s</div>
          </div>
          <div>
            <div className="text-fd-muted-foreground">Persisted</div>
            <div className="font-medium font-mono text-[11px]">
              .ps-lando.json
            </div>
          </div>
          <div>
            <div className="text-fd-muted-foreground">Reset honors it</div>
            <div className="font-medium text-fd-primary">yes</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Pill({
  active,
  children,
}: {
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`text-xs px-3 py-1.5 rounded-full border transition ${
        active
          ? 'bg-fd-primary/10 border-fd-primary/30 text-fd-foreground'
          : 'bg-fd-card border-fd-border text-fd-muted-foreground'
      }`}
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Recipes "store" grid                                                       */
/* -------------------------------------------------------------------------- */

const RECIPES = [
  {
    icon: ShoppingBag,
    name: 'demo-catalog-10',
    blurb: '10 picsum products in a Demo category.',
    tone: 'a',
  },
  {
    icon: Users,
    name: 'demo-customer-with-orders',
    blurb: 'Test customer + 3 orders, varied states.',
    tone: 'b',
  },
  {
    icon: FileText,
    name: 'demo-cms-pages',
    blurb: 'About / Contact / Terms pages, ES + EN.',
    tone: 'c',
  },
  {
    icon: Receipt,
    name: 'spain-taxes',
    blurb: 'IVA 21 / 10 / 4 + default country = ES.',
    tone: 'd',
  },
  {
    icon: Flame,
    name: 'cache-warmup',
    blurb: 'Pre-render front + BO key URLs after boot.',
    tone: 'e',
  },
  {
    icon: Eraser,
    name: 'clean-seed',
    blurb: 'Drop PrestaShop default demo data.',
    tone: 'f',
  },
] as const;

export function RecipesVisual() {
  return (
    <div className="gb-card rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-[11px] uppercase tracking-[0.14em] font-medium text-fd-muted-foreground">
          Bundled recipes
        </div>
        <div className="text-xs text-fd-muted-foreground">
          <span className="font-mono opacity-70">recipes/</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {RECIPES.map((r) => (
          <div
            key={r.name}
            className="flex items-start gap-3 p-3 rounded-lg border border-fd-border/60 bg-fd-card/40 hover:border-fd-primary/40 transition"
          >
            <div className="size-8 shrink-0 rounded-md bg-fd-primary/10 border border-fd-primary/20 flex items-center justify-center">
              <r.icon className="size-4 text-fd-primary" />
            </div>
            <div className="min-w-0">
              <div className="font-mono text-[11.5px] truncate font-medium">
                {r.name}
              </div>
              <div className="text-[11px] text-fd-muted-foreground leading-snug mt-0.5">
                {r.blurb}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Lifecycle flow                                                             */
/* -------------------------------------------------------------------------- */

export function LifecycleFlow() {
  return (
    <div className="gb-card rounded-2xl p-6 sm:p-8 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'linear-gradient(135deg, color-mix(in oklch, var(--color-fd-primary) 6%, transparent), transparent 60%)',
        }}
      />

      <div className="relative">
        <div className="text-[11px] uppercase tracking-[0.14em] font-medium text-fd-muted-foreground mb-5">
          Sandbox lifecycle
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
          <FlowNode icon={Save} label="db dump" sub="snapshot.tar.gz" />
          <FlowArrow />
          <FlowNode
            icon={Database}
            label="db reset"
            sub="3-5 min"
            primary
          />
          <FlowArrow />
          <FlowNode icon={Download} label="db restore" sub="6.6 s" />
          <FlowArrow />
          <FlowNode icon={CheckCircle2} label="doctor" sub="--fix" />
        </div>

        <div className="rounded-lg border border-fd-border/60 bg-fd-background/60 p-3 font-mono text-[11.5px] leading-relaxed">
          <div className="text-fd-muted-foreground">
            <span className="select-none">$ </span>
            ps-lando db dump --with-files snapshot.tar.gz
          </div>
          <div className="text-fd-primary">
            ✓ DB dumped (1.3 MB) · img/ (29 MB) · themes/panda/ (26 MB)
          </div>
          <div className="text-fd-muted-foreground mt-1">
            <span className="select-none">$ </span>
            ps-lando db restore snapshot.tar.gz -y
          </div>
          <div className="text-fd-primary">
            ✓ Restored in 6.6 s — DB, images, theme overrides
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowNode({
  icon: Icon,
  label,
  sub,
  primary,
}: {
  icon: typeof Save;
  label: string;
  sub: string;
  primary?: boolean;
}) {
  return (
    <div
      className={`col-span-1 rounded-lg border p-3 text-center ${
        primary
          ? 'border-fd-primary/40 bg-fd-primary/5'
          : 'border-fd-border/60 bg-fd-card/40'
      }`}
    >
      <Icon
        className={`size-4 mx-auto mb-1.5 ${
          primary ? 'text-fd-primary' : 'text-fd-muted-foreground'
        }`}
      />
      <div className="font-mono text-[11px] font-medium">{label}</div>
      <div className="text-[10px] text-fd-muted-foreground mt-0.5">{sub}</div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="hidden sm:flex items-center justify-center text-fd-muted-foreground select-none">
      →
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Doctor report card                                                         */
/* -------------------------------------------------------------------------- */

export function DoctorReport() {
  return (
    <div className="gb-card rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-fd-border/60 bg-fd-card/40">
        <div className="flex items-center gap-2">
          <Stethoscope className="size-4 text-fd-primary" />
          <span className="font-mono text-xs">ps-lando doctor</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-fd-primary font-medium">6 ok</span>
          <span className="text-amber-500">1 warn</span>
          <span className="text-fd-muted-foreground">0 fail</span>
        </div>
      </div>
      <div className="p-3 space-y-1.5">
        <CheckRow status="ok" label="Lando running" detail="my-shop" />
        <CheckRow status="ok" label="Database accessible" detail="lamp" />
        <CheckRow
          status="ok"
          label="st* modules active"
          detail="55 / 56"
        />
        <CheckRow status="ok" label="Active theme" detail="panda" />
        <CheckRow status="ok" label="Front-end HTTP" detail="200" />
        <CheckRow
          status="ok"
          label="Back-office HTTP"
          detail="302 → /admin8a3kls9d/"
        />
        <CheckRow
          status="warn"
          label="HTMLPurifier cache dir"
          detail="missing — auto-fixable"
        />
      </div>
      <div className="px-5 py-3 border-t border-fd-border/60 bg-fd-card/40 flex items-center justify-between text-xs">
        <span className="text-fd-muted-foreground">Suggested:</span>
        <span className="font-mono text-fd-foreground">
          ps-lando doctor --fix
        </span>
      </div>
    </div>
  );
}

function CheckRow({
  status,
  label,
  detail,
}: {
  status: 'ok' | 'warn' | 'fail';
  label: string;
  detail: string;
}) {
  const Icon =
    status === 'ok'
      ? CheckCircle2
      : status === 'warn'
      ? AlertTriangle
      : AlertTriangle;
  const tone =
    status === 'ok'
      ? 'text-fd-primary'
      : status === 'warn'
      ? 'text-amber-500'
      : 'text-red-500';

  return (
    <div className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-fd-accent transition">
      <Icon className={`size-4 shrink-0 ${tone}`} />
      <div className="text-sm flex-1 min-w-0 truncate">{label}</div>
      <div className="text-xs text-fd-muted-foreground font-mono truncate">
        {detail}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Compatibility matrix                                                       */
/* -------------------------------------------------------------------------- */

export function CompatMatrix() {
  const versions = [
    { v: 'PS 8.2.x', php: 'PHP 8.1', state: 'tested' as const },
    { v: 'PS 9.0.x', php: 'PHP 8.4', state: 'expected' as const },
    { v: 'PS 9.1.x', php: 'PHP 8.5', state: 'tested' as const },
  ];

  return (
    <div className="gb-card rounded-2xl p-6 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(circle at 80% 100%, color-mix(in oklch, var(--color-fd-primary) 14%, transparent), transparent 55%)',
        }}
      />
      <div className="relative">
        <div className="text-[11px] uppercase tracking-[0.14em] font-medium text-fd-muted-foreground mb-4">
          Compatibility
        </div>
        <div className="space-y-2.5">
          {versions.map((v) => (
            <div
              key={v.v}
              className="flex items-center gap-3 py-2 border-b border-fd-border/40 last:border-0"
            >
              <div className="font-mono text-sm font-medium w-20">{v.v}</div>
              <div className="text-xs text-fd-muted-foreground flex-1 font-mono">
                {v.php}
              </div>
              <div
                className={`text-[11px] px-2 py-0.5 rounded-full border ${
                  v.state === 'tested'
                    ? 'border-fd-primary/30 bg-fd-primary/10 text-fd-foreground'
                    : 'border-fd-border bg-fd-card text-fd-muted-foreground'
                }`}
              >
                {v.state === 'tested' ? '✓ live-tested' : '↗ expected'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Config file preview                                                        */
/* -------------------------------------------------------------------------- */

export function ConfigPreview() {
  return (
    <div className="gb-card rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-fd-border/60 bg-fd-card/40">
        <span className="size-2.5 rounded-full bg-red-400/70" />
        <span className="size-2.5 rounded-full bg-yellow-400/70" />
        <span className="size-2.5 rounded-full bg-green-400/70" />
        <span className="ml-3 font-mono text-[11px] text-fd-muted-foreground">
          .ps-lando.json
        </span>
      </div>
      <pre className="p-5 text-[12px] font-mono leading-relaxed overflow-x-auto whitespace-pre">
        <span className="text-fd-muted-foreground">{`{`}</span>
        {'\n  '}
        <span className="text-fd-primary">"project"</span>
        <span className="text-fd-muted-foreground">: </span>
        <span>"my-shop"</span>
        <span className="text-fd-muted-foreground">,</span>
        {'\n  '}
        <span className="text-fd-primary">"ps_version"</span>
        <span className="text-fd-muted-foreground">: </span>
        <span>"9.1.0"</span>
        <span className="text-fd-muted-foreground">,</span>
        {'\n  '}
        <span className="text-fd-primary">"php_version"</span>
        <span className="text-fd-muted-foreground">: </span>
        <span>"8.5"</span>
        <span className="text-fd-muted-foreground">,</span>
        {'\n  '}
        <span className="text-fd-primary">"admin_dir"</span>
        <span className="text-fd-muted-foreground">: </span>
        <span>"admin8a3kls9d"</span>
        <span className="text-fd-muted-foreground">,</span>
        {'\n  '}
        <span className="text-fd-primary">"panda"</span>
        <span className="text-fd-muted-foreground">: </span>
        <span className="text-amber-500">true</span>
        <span className="text-fd-muted-foreground">,</span>
        {'\n  '}
        <span className="text-fd-primary">"module_selection"</span>
        <span className="text-fd-muted-foreground">: {`{`}</span>
        {'\n    '}
        <span className="text-fd-primary">"skipGroups"</span>
        <span className="text-fd-muted-foreground">: [</span>
        <span>"blog"</span>
        <span className="text-fd-muted-foreground">]</span>
        {'\n  '}
        <span className="text-fd-muted-foreground">{`}`}</span>
        {'\n'}
        <span className="text-fd-muted-foreground">{`}`}</span>
      </pre>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* File tree                                                                  */
/* -------------------------------------------------------------------------- */

export function FileTree() {
  return (
    <div className="gb-card rounded-2xl p-6 font-mono text-[12px] leading-relaxed">
      <div className="text-[11px] uppercase tracking-[0.14em] font-medium text-fd-muted-foreground mb-3 not-italic">
        Project layout
      </div>
      <div>
        <FT name="my-shop/" tone="dim" />
        <FT name="├── panda-theme.zip" indent={1} />
        <FT name="├── steasybuilder.zip" indent={1} />
        <FT name="├── steasy_trans_panda.zip" indent={1} tone="dim" />
        <FT name="├── .lando.yml" indent={1} tone="dim" />
        <FT name="├── .ps-lando.json" indent={1} highlight />
        <FT name="├── .ps-lando-install.log" indent={1} tone="dim" />
        <FT name="├── init-scripts/" indent={1} highlight />
        <FT name="│   ├── 01-tax-rules-es.sh" indent={2} tone="dim" />
        <FT name="│   └── 02-demo-catalog.sh" indent={2} tone="dim" />
        <FT name="├── post-scripts/" indent={1} highlight />
        <FT name="│   └── 01-warm-cache.sh" indent={2} tone="dim" />
        <FT name="├── modules/" indent={1} tone="dim" />
        <FT name="└── themes/panda/" indent={1} tone="dim" />
      </div>
    </div>
  );
}

function FT({
  name,
  indent = 0,
  tone,
  highlight,
}: {
  name: string;
  indent?: number;
  tone?: 'dim';
  highlight?: boolean;
}) {
  void indent;
  return (
    <div
      className={
        highlight
          ? 'text-fd-primary'
          : tone === 'dim'
          ? 'text-fd-muted-foreground'
          : 'text-fd-foreground'
      }
    >
      {name}
    </div>
  );
}
