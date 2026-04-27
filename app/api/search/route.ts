import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

/**
 * Per-locale search index.
 *
 * `localeMap` maps each Fumadocs locale to its Orama-compatible language
 * tokenizer. EN is `english`; ES uses `spanish` for stemming.
 *
 * https://docs.orama.com/docs/orama-js/supported-languages
 */
export const { GET } = createFromSource(source, {
  localeMap: {
    en: { language: 'english' },
    es: { language: 'spanish' },
  },
});
