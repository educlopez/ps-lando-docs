'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isLocale, type Locale } from '@/lib/i18n';

/**
 * Compact EN/ES toggle for the marketing nav.
 *
 * Strategy: take the current pathname, strip the leading locale segment
 * if present, then prepend the target locale (or nothing if target is
 * the default EN, since we use hideLocale: 'default-locale').
 *
 * No flags, no dropdown — two pills, one active. Visible on mobile too.
 */
export function LangSwitcher({
  current,
  labels,
  ariaLabel,
}: {
  current: Locale;
  labels: { en: string; es: string };
  ariaLabel: string;
}) {
  const pathname = usePathname() ?? '/';

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="inline-flex items-center rounded-md border border-fd-border bg-fd-card/50 p-0.5 text-[11px] font-medium tracking-wide"
    >
      <LangPill
        target="en"
        active={current === 'en'}
        href={pathFor('en', pathname)}
      >
        {labels.en}
      </LangPill>
      <LangPill
        target="es"
        active={current === 'es'}
        href={pathFor('es', pathname)}
      >
        {labels.es}
      </LangPill>
    </div>
  );
}

function LangPill({
  active,
  href,
  children,
}: {
  target: Locale;
  active: boolean;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'true' : undefined}
      className={
        active
          ? 'px-2 py-1 rounded-[5px] bg-fd-primary/15 text-fd-foreground'
          : 'px-2 py-1 rounded-[5px] text-fd-muted-foreground hover:text-fd-foreground transition'
      }
    >
      {children}
    </Link>
  );
}

function pathFor(target: Locale, pathname: string): string {
  // Strip an existing locale prefix if any.
  const segs = pathname.split('/').filter(Boolean);
  if (segs.length > 0 && isLocale(segs[0])) {
    segs.shift();
  }
  const stripped = '/' + segs.join('/');
  // Default locale (en) has no prefix.
  if (target === 'en') {
    return stripped === '/' ? '/' : stripped;
  }
  // Spanish always carries the prefix.
  return stripped === '/' ? `/${target}` : `/${target}${stripped}`;
}
