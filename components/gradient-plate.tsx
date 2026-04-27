/**
 * On-brand minimal abstract plates. Pure CSS — every gradient is computed
 * from `--color-fd-primary` so swapping the accent re-tints all of them.
 *
 * Variants kept intentionally subtle: low saturation, lots of negative
 * space, no busy liquid-art. Use as decorative backdrops or full-card
 * stand-ins for stock images.
 */
export type GradientVariant =
  | 'mesh'
  | 'glow'
  | 'aurora'
  | 'spotlight'
  | 'fade'
  | 'lines';

export function GradientPlate({
  variant = 'mesh',
  className = '',
  children,
}: {
  variant?: GradientVariant;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-0"
        style={getStyle(variant)}
        aria-hidden
      />
      {variant === 'lines' && <LinesOverlay />}
      <div className="absolute inset-0 noise-overlay opacity-[0.04] mix-blend-overlay pointer-events-none" />
      {children && <div className="relative h-full">{children}</div>}
    </div>
  );
}

function getStyle(variant: GradientVariant): React.CSSProperties {
  switch (variant) {
    case 'mesh':
      return {
        background: `
          radial-gradient(circle at 20% 20%, color-mix(in oklch, var(--color-fd-primary) 28%, transparent), transparent 55%),
          radial-gradient(circle at 80% 80%, color-mix(in oklch, var(--color-fd-primary) 18%, transparent), transparent 60%),
          radial-gradient(circle at 60% 30%, color-mix(in oklch, var(--color-fd-primary) 10%, transparent), transparent 60%),
          color-mix(in oklch, var(--color-fd-card) 92%, var(--color-fd-primary) 8%)
        `,
      };
    case 'glow':
      return {
        background: `
          radial-gradient(circle at 50% 60%, color-mix(in oklch, var(--color-fd-primary) 32%, transparent), transparent 65%),
          color-mix(in oklch, var(--color-fd-card) 90%, var(--color-fd-primary) 10%)
        `,
      };
    case 'aurora':
      return {
        background: `
          linear-gradient(180deg,
            color-mix(in oklch, var(--color-fd-card) 100%, transparent),
            color-mix(in oklch, var(--color-fd-primary) 14%, var(--color-fd-card)) 60%,
            color-mix(in oklch, var(--color-fd-primary) 26%, var(--color-fd-card)))
        `,
      };
    case 'spotlight':
      return {
        background: `
          radial-gradient(ellipse 90% 60% at 50% 110%, color-mix(in oklch, var(--color-fd-primary) 36%, transparent), transparent 60%),
          color-mix(in oklch, var(--color-fd-card) 95%, var(--color-fd-primary) 5%)
        `,
      };
    case 'fade':
      return {
        background: `
          linear-gradient(135deg,
            color-mix(in oklch, var(--color-fd-primary) 22%, var(--color-fd-card)),
            color-mix(in oklch, var(--color-fd-card) 100%, transparent) 70%)
        `,
      };
    case 'lines':
      return {
        background: `
          linear-gradient(135deg,
            color-mix(in oklch, var(--color-fd-primary) 14%, var(--color-fd-card)),
            color-mix(in oklch, var(--color-fd-card) 100%, transparent))
        `,
      };
  }
}

function LinesOverlay() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.07]"
      aria-hidden
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id="grid-pattern"
          width="32"
          height="32"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 32 0 L 0 0 0 32"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  );
}
