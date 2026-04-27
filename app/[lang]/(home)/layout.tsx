import Link from 'next/link';
import { ArrowRight, Github } from 'lucide-react';
import { BirdIcon } from '@/components/brand-icons';
import { githubUrl, npmUrl } from '@/lib/shared';
import { getDict } from '@/lib/i18n/dict';
import type { Locale } from '@/lib/i18n';
import { LangSwitcher } from '@/components/lang-switcher';
import { ThemeToggle } from '@/components/theme-toggle';

/**
 * Standalone marketing layout for the home page. Replaces Fumadocs'
 * HomeLayout so we can match the GitBook chrome 1:1: announcement bar +
 * minimal centered nav. Docs pages keep using Fumadocs' DocsLayout.
 */
export default async function HomeMarketingLayout({
  params,
  children,
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  const locale = lang as Locale;
  const t = getDict(locale);
  const homeHref = locale === 'en' ? '/' : `/${locale}`;
  const docsBase = locale === 'en' ? '/docs' : `/${locale}/docs`;
  const quickstartHref = `${docsBase}/getting-started/quickstart`;

  return (
    <>
      <AnnouncementBar
        href={quickstartHref}
        pill={t.announcement.pill}
        body={t.announcement.body}
      />
      <MarketingNav
        locale={locale}
        nav={t.nav}
        langSwitcher={t.langSwitcher}
        homeHref={homeHref}
        docsBase={docsBase}
        quickstartHref={quickstartHref}
      />
      <main className="flex flex-col flex-1">{children}</main>
    </>
  );
}

function AnnouncementBar({
  href,
  pill,
  body,
}: {
  href: string;
  pill: string;
  body: string;
}) {
  return (
    <Link
      href={href}
      className="block w-full bg-fd-primary text-white text-center text-[13px] py-2 hover:opacity-95 transition"
    >
      <span className="opacity-90 mr-2">{pill}</span>
      <span>{body}</span>
      <ArrowRight className="inline size-3 ml-2 -mt-0.5" />
    </Link>
  );
}

function MarketingNav({
  locale,
  nav,
  langSwitcher,
  homeHref,
  docsBase,
  quickstartHref,
}: {
  locale: Locale;
  nav: ReturnType<typeof getDict>['nav'];
  langSwitcher: ReturnType<typeof getDict>['langSwitcher'];
  homeHref: string;
  docsBase: string;
  quickstartHref: string;
}) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-fd-background/75 border-b border-fd-border/60">
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between gap-6">
        <Link href={homeHref} className="flex items-center gap-2">
          <BirdIcon className="size-7 text-fd-primary shrink-0" />
          <span className="font-semibold tracking-tight text-[15px]">
            Ps-lando
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm text-fd-muted-foreground">
          <Link href={docsBase} className="hover:text-fd-foreground transition">
            {nav.docs}
          </Link>
          <Link
            href={`${docsBase}/reference/commands`}
            className="hover:text-fd-foreground transition"
          >
            {nav.reference}
          </Link>
          <Link
            href={`${docsBase}/kb/schema-drift-ps-8-9`}
            className="hover:text-fd-foreground transition"
          >
            {nav.kb}
          </Link>
          <a
            href={`https://github.com/educlopez/ps-lando/blob/main/CHANGELOG.md`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-fd-foreground transition"
          >
            {nav.changelog}
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitcher
            current={locale}
            labels={{ en: langSwitcher.en, es: langSwitcher.es }}
            ariaLabel={langSwitcher.ariaLabel}
          />
          <ThemeToggle ariaLabel={nav.themeToggleAriaLabel ?? 'Toggle theme'} />
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="size-9 inline-flex items-center justify-center rounded-md border border-fd-border hover:border-fd-primary/40 hover:bg-fd-accent transition"
          >
            <Github className="size-4" />
          </a>
          <a
            href={npmUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-md text-sm font-medium border border-fd-border hover:border-fd-primary/40 hover:bg-fd-accent transition"
          >
            npm
          </a>
          <Link
            href={quickstartHref}
            className="inline-flex items-center px-3.5 py-1.5 rounded-md text-sm font-medium bg-fd-primary text-white hover:opacity-90 transition"
          >
            {nav.getStarted}
          </Link>
        </div>
      </div>
    </header>
  );
}
