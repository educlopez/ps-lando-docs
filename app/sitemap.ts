import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { siteUrl } from '@/lib/shared';
import type { Locale } from '@/lib/i18n';

/**
 * Build a per-locale URL. EN is prefix-free (`hideLocale: 'default-locale'`),
 * ES lives at `/es/...`. The home page is `/` for EN, `/es` for ES.
 */
function localePath(locale: Locale, path: string): string {
  if (locale === 'en') return path === '/' ? '/' : path;
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

function url(locale: Locale, path: string): string {
  return `${siteUrl}${localePath(locale, path)}`;
}

/**
 * hreflang `languages` map for a given path. Includes both locales plus an
 * `x-default` fallback pointing at the EN version.
 */
function languages(path: string): Record<string, string> {
  return {
    en: url('en', path),
    es: url('es', path),
    'x-default': url('en', path),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static marketing pages — home in both locales.
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: url('en', '/'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: { languages: languages('/') },
    },
    {
      url: url('es', '/'),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: languages('/') },
    },
  ];

  // Docs pages — iterate the EN tree (the canonical surface). For each EN
  // page, emit one URL per locale that actually has a corresponding doc.
  const enPages = source.getPages('en');
  const esSlugSet = new Set(
    source.getPages('es').map((p) => p.slugs.join('/')),
  );

  const docEntries: MetadataRoute.Sitemap = [];
  for (const page of enPages) {
    const slugPath = page.slugs.length === 0 ? '/docs' : `/docs/${page.slugs.join('/')}`;
    const hasEs = esSlugSet.has(page.slugs.join('/'));

    docEntries.push({
      url: url('en', slugPath),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: page.slugs.length === 0 ? 0.9 : 0.7,
      alternates: hasEs ? { languages: languages(slugPath) } : undefined,
    });

    if (hasEs) {
      docEntries.push({
        url: url('es', slugPath),
        lastModified: now,
        changeFrequency: 'monthly',
        priority: page.slugs.length === 0 ? 0.8 : 0.6,
        alternates: { languages: languages(slugPath) },
      });
    }
  }

  return [...staticEntries, ...docEntries];
}
