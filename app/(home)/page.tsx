import Link from 'next/link';
import {
  Terminal,
  Layers,
  Sparkles,
  RefreshCw,
  Stethoscope,
  Github,
} from 'lucide-react';
import { CopyCommand } from '@/components/copy-command';
import { description, githubUrl, npmUrl } from '@/lib/shared';

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-fd-border">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="relative mx-auto max-w-5xl px-6 py-24 sm:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-fd-border bg-fd-card/60 text-xs font-mono text-fd-muted-foreground mb-6">
            <span className="size-1.5 rounded-full bg-brand-500" />
            v0.6.0 — sandbox lifecycle ready
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-balance">
            PrestaShop sandboxes in{' '}
            <span className="text-fd-primary">one command</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-fd-muted-foreground max-w-2xl mx-auto text-balance">
            {description}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <CopyCommand command="npx ps-lando@latest create" />
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <Link
                href="/docs"
                className="px-4 py-2 rounded-md bg-fd-primary text-fd-primary-foreground font-medium hover:opacity-90 transition"
              >
                Read the docs →
              </Link>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-md border border-fd-border hover:bg-fd-accent transition inline-flex items-center gap-2"
              >
                <Github className="size-4" />
                GitHub
              </a>
              <a
                href={npmUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-md border border-fd-border hover:bg-fd-accent transition font-mono text-xs"
              >
                npm install ps-lando
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Everything a Panda dev needs.
          </h2>
          <p className="mt-3 text-fd-muted-foreground max-w-2xl mx-auto">
            From clone-to-checkout on a fresh PrestaShop sandbox, with the
            full Panda theme + Easy Builder installed and 56 modules active.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Feature
            icon={Terminal}
            title="One command"
            description="Full sandbox in ~6 min. PrestaShop downloaded from the official CDN, Panda extracted, modules installed in parallel."
          />
          <Feature
            icon={Layers}
            title="Pick what you need"
            description="--skip-blog, --skip-easybuilder, --only stmegamenu — install just the modules your client wants. Or all 56."
          />
          <Feature
            icon={Sparkles}
            title="6 bundled recipes"
            description="Demo catalog with picsum images, demo customer + orders, ES tax rules, cache warmup, clean-seed. Drop in your own under init-scripts/."
          />
          <Feature
            icon={RefreshCw}
            title="Reset, dump, restore"
            description="ps-lando db reset rebuilds the DB in 3-5 min. Snapshot with db dump --with-files, restore in seconds."
          />
          <Feature
            icon={Stethoscope}
            title="Doctor + auto-fix"
            description="ps-lando doctor checks Lando, DB, modules, theme, HTTP, hook dirs, recent errors. --fix auto-recovers what it can."
          />
          <Feature
            icon={Github}
            title="Open source"
            description="MIT licensed. PR welcome. Built for personal projects, agency work, and CI pipelines."
          />
        </div>
      </section>

      {/* Quick start */}
      <section className="border-t border-fd-border bg-fd-card/30">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold">
              From zero to BO in 5 minutes.
            </h2>
          </div>
          <ol className="space-y-6">
            <Step
              n={1}
              title="Install Lando + Docker"
              description="ps-lando wraps Lando, which wraps Docker. Get them installed once and forget about them."
              code="brew install --cask docker lando"
            />
            <Step
              n={2}
              title="Drop your Panda zip in a folder"
              description="Plus your Easy Builder zip if you have it. ps-lando auto-detects them."
              code={`mkdir my-shop && cd my-shop\ncp ~/Downloads/panda-theme.zip .`}
            />
            <Step
              n={3}
              title="Run create"
              description="Pick a PS version, answer a couple prompts, and watch it install everything."
              code="npx ps-lando@latest create"
            />
          </ol>
          <div className="mt-10 text-center">
            <Link
              href="/docs/getting-started/quickstart"
              className="text-fd-primary font-medium hover:underline"
            >
              Read the full quickstart →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-fd-border">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-fd-muted-foreground">
          <span className="font-mono">
            <span className="opacity-60">$</span> ps-lando
          </span>
          <div className="flex items-center gap-6">
            <Link href="/docs" className="hover:text-fd-foreground transition">
              Docs
            </Link>
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-fd-foreground transition"
            >
              GitHub
            </a>
            <a
              href={npmUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-fd-foreground transition"
            >
              npm
            </a>
          </div>
          <span>
            Crafted by{' '}
            <a
              href="https://github.com/educlopez"
              target="_blank"
              rel="noreferrer"
              className="hover:text-fd-foreground transition"
            >
              educlopez
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}

function Feature({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Terminal;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-fd-border bg-fd-card/50 p-5 hover:border-fd-primary/50 transition">
      <Icon className="size-5 text-fd-primary mb-3" />
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-fd-muted-foreground">{description}</p>
    </div>
  );
}

function Step({
  n,
  title,
  description,
  code,
}: {
  n: number;
  title: string;
  description: string;
  code: string;
}) {
  return (
    <li className="flex gap-4 sm:gap-6">
      <span className="shrink-0 size-8 rounded-full border border-fd-border bg-fd-background flex items-center justify-center font-mono text-sm">
        {n}
      </span>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-fd-muted-foreground mb-3">{description}</p>
        <pre className="rounded-md border border-fd-border bg-fd-background/80 px-4 py-3 text-xs font-mono overflow-x-auto whitespace-pre">
          {code}
        </pre>
      </div>
    </li>
  );
}
