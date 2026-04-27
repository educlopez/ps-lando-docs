'use client';

import { useEffect } from 'react';

/**
 * Mirrors the active locale onto the root <html lang> attribute.
 * Next.js requires the <html> tag in the root layout, so we can't set
 * lang there per-locale — this client effect bridges the gap.
 */
export function HtmlLangSync({ lang }: { lang: string }) {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
