import type { ReactNode } from 'react';

/**
 * GitBook-ish "screenshot card" — soft elevation, rounded, with a
 * browser/terminal chrome at the top. Used as the visual companion for
 * alternating feature blocks.
 */
export function TerminalCard({
  title = 'ps-lando',
  children,
  className = '',
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`gb-card rounded-xl overflow-hidden font-mono text-[12.5px] sm:text-sm leading-relaxed ${className}`}
    >
      {/* Chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-fd-border/60 bg-fd-card/60">
        <span className="size-2.5 rounded-full bg-red-400/70" />
        <span className="size-2.5 rounded-full bg-yellow-400/70" />
        <span className="size-2.5 rounded-full bg-green-400/70" />
        <span className="ml-3 text-[11px] text-fd-muted-foreground select-none">
          {title}
        </span>
      </div>
      {/* Body */}
      <pre className="px-5 py-4 overflow-x-auto whitespace-pre">{children}</pre>
    </div>
  );
}

/** Faux terminal prompt-line. */
export function PromptLine({ children }: { children: ReactNode }) {
  return (
    <div>
      <span className="text-fd-muted-foreground select-none">$ </span>
      <span className="text-fd-foreground">{children}</span>
    </div>
  );
}

/** Output line — muted, indented look. */
export function OutputLine({
  children,
  marker = '',
  tone = 'muted',
}: {
  children: ReactNode;
  marker?: string;
  tone?: 'muted' | 'success' | 'warn';
}) {
  const color =
    tone === 'success'
      ? 'text-fd-primary'
      : tone === 'warn'
      ? 'text-amber-500'
      : 'text-fd-muted-foreground';
  return (
    <div className={color}>
      {marker && <span className="select-none mr-2">{marker}</span>}
      {children}
    </div>
  );
}
