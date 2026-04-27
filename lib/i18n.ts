import { defineI18n } from 'fumadocs-core/i18n';

/**
 * Site i18n configuration.
 *
 * - `en` is the default; URLs without a locale segment serve EN.
 * - `es` is the second locale; reachable at `/es/...`.
 *
 * `hideLocale: 'default-locale'` rewrites `/foo` → `/en/foo` internally,
 * so the EN URL stays prefix-free while ES uses `/es/foo`.
 *
 * `parser: 'dot'` enables sibling MDX files (`page.mdx` + `page.es.mdx`)
 * inside the same directory, instead of a `content/docs/es/` folder.
 */
export const i18n = defineI18n({
  defaultLanguage: 'en',
  languages: ['en', 'es'],
  hideLocale: 'default-locale',
  parser: 'dot',
});

export type Locale = (typeof i18n.languages)[number];

export const locales: { name: string; locale: Locale }[] = [
  { name: 'English', locale: 'en' },
  { name: 'Español', locale: 'es' },
];

export function isLocale(value: string | undefined): value is Locale {
  return value === 'en' || value === 'es';
}
