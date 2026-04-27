import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/lib/i18n';
import { HtmlLangSync } from '@/components/html-lang-sync';
import { appName, description, tagline } from '@/lib/shared';

/**
 * Per-locale copy used to override the root <title>/<description> so that
 * Spanish URLs ship Spanish metadata. Marketing tagline and meta description
 * stay in sync with `lib/i18n/dict.ts` hero/finalCta copy.
 */
const localeMeta: Record<Locale, { title: string; description: string; ogLocale: string }> = {
  en: {
    title: `${appName} — ${tagline}`,
    description,
    ogLocale: 'en_US',
  },
  es: {
    title: `${appName} — Sandboxes locales de PrestaShop en 6 minutos`,
    description:
      'Levanta sandboxes locales de PrestaShop 8 y 9 en 6 minutos con ps-lando — un CLI basado en Lando. Hooks, recipes, reset/dump/restore de DB, tema y módulos listos.',
    ogLocale: 'es_ES',
  },
};

export async function generateMetadata(
  props: LayoutProps<'/[lang]'>,
): Promise<Metadata> {
  const { lang } = await props.params;
  if (!isLocale(lang)) return {};

  const meta = localeMeta[lang];
  const path = lang === 'en' ? '/' : `/${lang}`;

  return {
    title: { default: meta.title, template: `%s · ${appName}` },
    description: meta.description,
    alternates: {
      canonical: path,
      languages: {
        en: '/',
        es: '/es',
        'x-default': '/',
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: path,
      locale: meta.ogLocale,
      alternateLocale: lang === 'en' ? ['es_ES'] : ['en_US'],
    },
    twitter: {
      title: meta.title,
      description: meta.description,
    },
  };
}

/**
 * Per-locale layout. Validates the [lang] segment, refuses anything
 * that isn't `en` or `es`, and syncs the document's `lang` attribute
 * so screen readers and translation tools pick the right pronunciation.
 */
export default async function LocaleLayout({
  params,
  children,
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <>
      <HtmlLangSync lang={lang} />
      {children}
    </>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}
