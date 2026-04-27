import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Github, Quote } from 'lucide-react';
import { BirdIcon } from '@/components/brand-icons';
import { HeroShowcase } from '@/components/hero-showcase';
import { CompatMatrix } from '@/components/visuals';
import { FeaturesCarousel } from '@/components/features-carousel';
import { LlmSection } from '@/components/llm-section';
import { UseCasesSection } from '@/components/use-cases-section';
import { SchemaIllustration } from '@/components/schema-illustration';
import { StatsCard } from '@/components/stats-card';
import { GradientPlate } from '@/components/gradient-plate';
import { AnimateText, Reveal } from '@/components/animate-text';
import {
  appName,
  author,
  description,
  githubUrl,
  npmUrl,
  siteUrl,
  tagline,
} from '@/lib/shared';
import { abstractImages } from '@/lib/images';
import { getDict, type Dict } from '@/lib/i18n/dict';
import type { Locale } from '@/lib/i18n';

export default async function HomePage(props: PageProps<'/[lang]'>) {
  const { lang } = await props.params;
  const locale = lang as Locale;
  const t = getDict(locale);
  const docsBase = locale === 'en' ? '/docs' : `/${locale}/docs`;

  return (
    <>
      <StructuredData locale={locale} />
      <Hero t={t} docsBase={docsBase} />
      <FeaturesCarousel t={t} />
      <LlmSection t={t} />
      <UseCasesSection t={t} />
      <IllustratedSection
        eyebrow={t.schemaSection.eyebrow}
        title={t.schemaSection.title}
        body={t.schemaSection.body}
        cta={{
          text: t.schemaSection.cta,
          href: `${docsBase}/kb/schema-drift-ps-8-9`,
        }}
        side="right"
      />
      <StatsCard t={t} />
      <CompatBand t={t} docsBase={docsBase} />
      <QuoteSection t={t} />
      <FinalCTA t={t} docsBase={docsBase} />
      <Footer t={t} docsBase={docsBase} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Structured data (JSON-LD)                                                  */
/* -------------------------------------------------------------------------- */

function StructuredData({ locale }: { locale: Locale }) {
  const homeUrl = locale === 'en' ? siteUrl : `${siteUrl}/${locale}`;
  const inLanguage = locale === 'en' ? 'en-US' : 'es-ES';

  const softwareApplication = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: appName,
    description,
    url: siteUrl,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'macOS, Linux, Windows',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    softwareVersion: '0.6.0',
    downloadUrl: npmUrl,
    codeRepository: githubUrl,
    license: 'https://opensource.org/licenses/MIT',
    author: {
      '@type': 'Person',
      name: author,
      url: 'https://github.com/educlopez',
    },
    keywords: 'PrestaShop, Lando, sandbox, CLI, local development, modules, recipes',
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${appName} — ${tagline}`,
    url: homeUrl,
    inLanguage,
    publisher: {
      '@type': 'Person',
      name: author,
      url: 'https://github.com/educlopez',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD payload, no user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplication) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD payload, no user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

function Hero({ t, docsBase }: { t: Dict; docsBase: string }) {
  return (
    <section className="relative -mt-14 overflow-hidden bg-fd-background">
      {/* Backdrop only visible toward the bottom of the section, behind
          and around the showcase. Top 55% stays clean. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage:
            'linear-gradient(to bottom, transparent 0%, transparent 50%, black 80%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, transparent 50%, black 80%, transparent 100%)',
        }}
      >
        <Image
          src={abstractImages.heroBackdrop}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-bottom opacity-60 dark:opacity-30"
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-10 md:pt-32 lg:pt-40">
        <div className="grid items-end gap-4">
          <AnimateText
            as="h1"
            effect="soft-blur-in"
            trigger="mount"
            delay={120}
            text={`${t.hero.titleLine1} ${t.hero.titleLine2}`}
            className="text-balance text-4xl font-semibold sm:text-5xl md:max-w-4xl lg:text-6xl text-neutral-950 dark:text-white tracking-tight leading-[1.05]"
          />
          <div className="max-w-lg">
            <AnimateText
              as="p"
              effect="per-word-crossfade"
              trigger="mount"
              delay={700}
              text={t.hero.description}
              className="mb-6 text-balance text-lg lg:text-xl text-fd-muted-foreground leading-relaxed"
            />
            <Reveal trigger="mount" delay={1100} y={12}>
              <div className="flex items-center gap-3">
                <Link
                  href={`${docsBase}/getting-started/quickstart`}
                  className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-md bg-fd-primary text-white text-sm font-medium ring-1 ring-fd-primary/40 shadow-md shadow-black/15 hover:bg-fd-primary/90 transition-all"
                >
                  {t.hero.ctaPrimary}
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-md text-sm font-medium bg-fd-card ring-1 ring-fd-border shadow-sm shadow-black/10 hover:bg-fd-accent hover:ring-fd-primary/40 transition-all"
                >
                  <Github className="size-4" />
                  {t.hero.ctaSecondary}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Showcase with tabs + swappable mockup — pulled down to give the
          hero text room to breathe before the tab strip. */}
      <div className="relative mx-auto max-w-6xl px-6 pt-12 lg:pt-20 pb-20">
        <HeroShowcase t={t} />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Image-led alternating sections                                             */
/* -------------------------------------------------------------------------- */

function IllustratedSection({
  eyebrow,
  title,
  body,
  cta,
  side,
}: {
  eyebrow: string;
  title: string;
  body: string;
  cta: { text: string; href: string };
  side: 'left' | 'right';
}) {
  return (
    <section className="border-t border-fd-border/60">
      <div className="mx-auto max-w-6xl px-6 py-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className={side === 'right' ? 'lg:order-1' : 'lg:order-2'}>
          <AnimateText
            as="div"
            effect="micro-scale-fade"
            trigger="in-view"
            text={eyebrow}
            className="text-[11px] uppercase tracking-[0.16em] font-medium text-fd-primary mb-3"
          />
          <AnimateText
            as="h2"
            effect="mask-reveal-up"
            trigger="in-view"
            text={title}
            className="text-3xl sm:text-4xl font-semibold tracking-tight text-balance leading-[1.1]"
          />
          <Reveal delay={200} className="mt-4">
            <p className="text-fd-muted-foreground leading-relaxed text-[15px] max-w-md">
              {body}
            </p>
          </Reveal>
          <Reveal delay={300} className="mt-6">
            <Link
              href={cta.href}
              className="inline-flex items-center gap-1.5 text-fd-primary font-medium text-sm hover:opacity-80 transition"
            >
              {cta.text}
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
        <Reveal className={side === 'right' ? 'lg:order-2' : 'lg:order-1'} delay={150}>
          <SchemaIllustration />
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Compat band                                                                */
/* -------------------------------------------------------------------------- */

function CompatBand({ t, docsBase }: { t: Dict; docsBase: string }) {
  return (
    <section className="border-t border-fd-border/60 bg-fd-card/30">
      <div className="mx-auto max-w-6xl px-6 py-20 grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
        <div>
          <AnimateText
            as="div"
            effect="micro-scale-fade"
            trigger="in-view"
            text={t.compatBand.eyebrow}
            className="text-[11px] uppercase tracking-[0.16em] font-medium text-fd-primary mb-3"
          />
          <AnimateText
            as="h2"
            effect="mask-reveal-up"
            trigger="in-view"
            text={t.compatBand.heading}
            className="text-3xl sm:text-4xl font-semibold tracking-tight text-balance leading-[1.1]"
          />
          <Reveal delay={250} className="mt-6">
            <Link
              href={`${docsBase}/reference/compatibility-matrix`}
              className="inline-flex items-center gap-1.5 text-fd-primary font-medium text-sm hover:opacity-80 transition"
            >
              {t.compatBand.cta}
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
        <Reveal delay={150}>
          <CompatMatrix />
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Quote                                                                      */
/* -------------------------------------------------------------------------- */

function QuoteSection({ t }: { t: Dict }) {
  return (
    <section className="border-t border-fd-border/60 relative overflow-hidden">
      <GradientPlate variant="glow" className="absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-4xl px-6 py-28 text-center">
        <Reveal>
          <Quote className="size-10 text-fd-primary/50 mx-auto mb-6" />
        </Reveal>
        <AnimateText
          as="blockquote"
          effect="mask-reveal-up"
          trigger="in-view"
          text={t.quote.body}
          className="text-2xl sm:text-3xl font-medium tracking-tight text-balance leading-[1.25]"
        />
        <div className="mt-8 inline-flex items-center gap-3 text-sm text-fd-muted-foreground">
          <Image
            src="https://github.com/educlopez.png"
            alt="Eduardo Calvo"
            width={36}
            height={36}
            className="size-9 rounded-full border border-fd-border object-cover"
            unoptimized
          />
          <div className="text-left">
            <div className="font-medium text-fd-foreground text-[13px]">
              Eduardo Calvo
            </div>
            <div className="text-[12px]">{t.quote.authorRole}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Final CTA                                                                  */
/* -------------------------------------------------------------------------- */

function FinalCTA({ t, docsBase }: { t: Dict; docsBase: string }) {
  return (
    <section className="border-t border-fd-border/60 relative overflow-hidden">
      <GradientPlate
        variant="spotlight"
        className="absolute inset-0 opacity-80"
      />
      <div className="relative mx-auto max-w-4xl px-6 py-32 text-center">
        <AnimateText
          as="h2"
          effect="soft-blur-in"
          trigger="in-view"
          text={t.finalCta.heading}
          className="text-4xl sm:text-6xl font-semibold tracking-tight text-balance leading-[1.05]"
        />
        <Reveal delay={400} className="mt-6">
          <p className="text-lg text-fd-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.finalCta.body}
          </p>
        </Reveal>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href={`${docsBase}/getting-started/quickstart`}
            className="px-6 py-3 rounded-md bg-fd-primary text-white font-medium hover:opacity-90 transition inline-flex items-center gap-2"
          >
            {t.finalCta.ctaPrimary}
            <ArrowRight className="size-4" />
          </Link>
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-md border border-fd-border bg-fd-background/70 backdrop-blur hover:border-fd-primary/40 hover:bg-fd-accent transition inline-flex items-center gap-2"
          >
            <Github className="size-4" />
            {t.finalCta.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Footer                                                                     */
/* -------------------------------------------------------------------------- */

function Footer({ t, docsBase }: { t: Dict; docsBase: string }) {
  return (
    <footer className="border-t border-fd-border/60">
      <div className="mx-auto max-w-6xl px-6 py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <BirdIcon className="size-7 text-fd-primary shrink-0" />
            <span className="font-semibold tracking-tight">Ps-lando</span>
          </div>
          <p className="text-sm text-fd-muted-foreground max-w-xs leading-relaxed">
            {t.footer.tagline}{' '}
            <a
              href="https://github.com/educlopez"
              target="_blank"
              rel="noreferrer"
              className="text-fd-foreground hover:underline underline-offset-2"
            >
              educlopez
            </a>
            .
          </p>
        </div>

        <FooterColumn title={t.footer.documentation}>
          <FooterLink href={docsBase}>{t.footer.links.welcome}</FooterLink>
          <FooterLink href={`${docsBase}/getting-started/quickstart`}>
            {t.footer.links.quickstart}
          </FooterLink>
          <FooterLink href={`${docsBase}/guides/selecting-modules`}>
            {t.footer.links.selectingModules}
          </FooterLink>
          <FooterLink href={`${docsBase}/guides/hooks-and-recipes`}>
            {t.footer.links.recipes}
          </FooterLink>
          <FooterLink href={`${docsBase}/guides/sandbox-lifecycle`}>
            {t.footer.links.lifecycle}
          </FooterLink>
        </FooterColumn>

        <FooterColumn title={t.footer.reference}>
          <FooterLink href={`${docsBase}/reference/commands`}>
            {t.footer.links.commands}
          </FooterLink>
          <FooterLink href={`${docsBase}/reference/flags`}>
            {t.footer.links.flags}
          </FooterLink>
          <FooterLink href={`${docsBase}/reference/recipes-catalog`}>
            {t.footer.links.recipesCatalog}
          </FooterLink>
          <FooterLink href={`${docsBase}/reference/compatibility-matrix`}>
            {t.footer.links.compatibility}
          </FooterLink>
        </FooterColumn>

        <FooterColumn title={t.footer.community}>
          <FooterLink href={githubUrl} external>
            {t.footer.links.github}
          </FooterLink>
          <FooterLink href="https://www.npmjs.com/package/ps-lando" external>
            {t.footer.links.npmPackage}
          </FooterLink>
          <FooterLink href={`${githubUrl}/issues`} external>
            {t.footer.links.reportIssue}
          </FooterLink>
          <FooterLink
            href={`${githubUrl}/blob/main/CHANGELOG.md`}
            external
          >
            {t.footer.links.changelog}
          </FooterLink>
        </FooterColumn>
      </div>

      <div className="border-t border-fd-border/60">
        <div className="mx-auto max-w-6xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-fd-muted-foreground">
          <span>{t.footer.copyright}</span>
          <span className="font-mono opacity-70">ps-lando v0.6.0</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.14em] font-medium text-fd-foreground mb-3">
        {title}
      </div>
      <ul className="space-y-2 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  if (external) {
    return (
      <li>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-fd-muted-foreground hover:text-fd-foreground transition"
        >
          {children}
        </a>
      </li>
    );
  }
  return (
    <li>
      <Link
        href={href}
        className="text-fd-muted-foreground hover:text-fd-foreground transition"
      >
        {children}
      </Link>
    </li>
  );
}
