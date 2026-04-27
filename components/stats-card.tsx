import Image from 'next/image';
import { abstractImages } from '@/lib/images';
import type { Dict } from '@/lib/i18n/dict';
import { AnimateText, Reveal } from './animate-text';

/**
 * Big "showcase" card with an abstract image backdrop in the brand
 * palette and stats overlay.
 */
export function StatsCard({ t }: { t: Dict }) {
  return (
    <section className="border-t border-fd-border/60">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="relative rounded-3xl overflow-hidden border border-fd-border/60 min-h-[320px] sm:min-h-[400px]">
          <Image
            src={abstractImages.hero}
            alt=""
            fill
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, oklch(0.18 0.04 185 / 0.85), oklch(0.22 0.06 185 / 0.7))',
            }}
          />
          <div className="relative h-full flex flex-col justify-between p-8 sm:p-12 text-white">
            <div>
              <AnimateText
                as="div"
                effect="micro-scale-fade"
                trigger="in-view"
                text={t.stats.eyebrow}
                className="text-[10px] uppercase tracking-[0.16em] font-medium opacity-80 mb-3"
              />
              <AnimateText
                as="h3"
                effect="mask-reveal-up"
                trigger="in-view"
                text={t.stats.heading}
                className="text-2xl sm:text-4xl font-semibold tracking-tight max-w-xl text-balance leading-tight"
              />
            </div>

            <Reveal delay={300}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mt-10">
                <Stat value="194" label={t.stats.testsPassing} />
                <Stat value="56" label={t.stats.modulesSupported} />
                <Stat value="6 min" label={t.stats.avgCreate} />
                <Stat value="6" label={t.stats.recipes} />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-3xl sm:text-5xl font-semibold tracking-tight tabular-nums">
        {value}
      </div>
      <div className="text-xs sm:text-sm opacity-75 mt-1.5 leading-tight">
        {label}
      </div>
    </div>
  );
}
