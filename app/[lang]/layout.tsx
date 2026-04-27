import { notFound } from 'next/navigation';
import { isLocale } from '@/lib/i18n';
import { HtmlLangSync } from '@/components/html-lang-sync';

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
