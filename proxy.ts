import { NextRequest, NextResponse, type NextFetchEvent } from 'next/server';
import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { createI18nMiddleware } from 'fumadocs-core/i18n/middleware';
import { docsContentRoute, docsRoute } from '@/lib/shared';
import { i18n, isLocale } from '@/lib/i18n';

const { rewrite: rewriteDocs } = rewritePath(
  `${docsRoute}{/*path}`,
  `${docsContentRoute}{/*path}/content.md`,
);
const { rewrite: rewriteSuffix } = rewritePath(
  `${docsRoute}{/*path}.mdx`,
  `${docsContentRoute}{/*path}/content.md`,
);

const i18nProxy = createI18nMiddleware(i18n);
const LOCALE_COOKIE = 'FD_LOCALE';

/**
 * Paths that should NOT go through the i18n middleware.
 * These are locale-agnostic API / asset routes, including Next.js
 * metadata file conventions (manifest, opengraph-image, etc.) which
 * must resolve at the root, not under /[lang]/.
 */
const I18N_BYPASS_PREFIXES = [
  '/api/',
  '/llms.txt',
  '/llms-full.txt',
  '/llms.mdx/',
  '/og/',
  '/_next/',
  '/favicon',
  '/icon',
  '/apple-icon',
  '/opengraph-image',
  '/twitter-image',
  '/manifest.webmanifest',
  '/sitemap.xml',
  '/robots.txt',
];

/**
 * File-extension regex for static assets that should bypass i18n
 * (anything with a dot followed by 2-5 lowercase chars at the end of the
 * pathname). Covers /clouds.webp, /og.png, /robots.txt, etc. without
 * having to list each one individually.
 */
const ASSET_EXT_RE = /\.[a-z0-9]{2,5}$/i;

function isBypassedFromI18n(pathname: string): boolean {
  if (
    I18N_BYPASS_PREFIXES.some(
      (p) => pathname === p || pathname.startsWith(p),
    )
  ) {
    return true;
  }
  return ASSET_EXT_RE.test(pathname);
}

/**
 * On a fresh visit (no FD_LOCALE cookie) where the user hasn't pinned a
 * locale via URL, parse Accept-Language and redirect to /es/... if the
 * preferred match is Spanish. Otherwise fall through to the EN default.
 *
 * Once a cookie is set (by the language switcher) we stop second-guessing
 * the user.
 */
function negotiateAcceptLanguage(request: NextRequest): NextResponse | null {
  if (request.cookies.get(LOCALE_COOKIE)) return null;

  const pathname = request.nextUrl.pathname;
  const firstSeg = pathname.split('/')[1];
  // Already on a locale-prefixed URL — leave it alone.
  if (isLocale(firstSeg)) return null;

  const header = request.headers.get('accept-language');
  if (!header) return null;

  // Cheap negotiation: pick the first language tag whose prefix is `es`.
  const tags = header.split(',').map((s) => s.split(';')[0].trim().toLowerCase());
  const prefersEs = tags.some(
    (tag) => tag === 'es' || tag.startsWith('es-'),
  );
  if (!prefersEs) return null;

  const url = new URL(request.nextUrl);
  url.pathname = `/es${pathname === '/' ? '' : pathname}`;
  const res = NextResponse.redirect(url);
  res.cookies.set(LOCALE_COOKIE, 'es');
  return res;
}

export default function proxy(request: NextRequest, event: NextFetchEvent) {
  // 1. Markdown content negotiation runs FIRST so .mdx URLs and
  //    Accept: text/markdown clients still hit the raw content route.
  const result = rewriteSuffix(request.nextUrl.pathname);
  if (result) {
    return NextResponse.rewrite(new URL(result, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    const docsResult = rewriteDocs(request.nextUrl.pathname);
    if (docsResult) {
      return NextResponse.rewrite(new URL(docsResult, request.nextUrl));
    }
  }

  // 2. Skip i18n for API / asset routes.
  if (isBypassedFromI18n(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // 3. Accept-Language detection (first visit only).
  const negotiated = negotiateAcceptLanguage(request);
  if (negotiated) return negotiated;

  // 4. Hand off to Fumadocs' i18n middleware. With hideLocale:
  //    'default-locale', /docs is rewritten internally to /en/docs and
  //    /es/docs serves ES.
  return i18nProxy(request, event);
}
