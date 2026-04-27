'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'fumadocs-ui/provider/base';
import { useEffect, useState } from 'react';

/**
 * Compact light/dark toggle for the marketing nav. Uses Fumadocs'
 * re-exported `useTheme` from next-themes so it stays in sync with the
 * docs layout's own toggle.
 */
export function ThemeToggle({ ariaLabel }: { ariaLabel: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — `resolvedTheme` is undefined on the server.
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={ariaLabel}
      className="size-9 inline-flex items-center justify-center rounded-md border border-fd-border hover:border-fd-primary/40 hover:bg-fd-accent transition"
    >
      {!mounted ? (
        <span className="size-4" />
      ) : isDark ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </button>
  );
}
