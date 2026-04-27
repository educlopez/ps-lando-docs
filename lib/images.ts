/**
 * Curated abstract Unsplash photos in cool teal/mint/cyan tones — picked
 * to harmonize with the mint brand accent. Replace IDs as you find better
 * matches; the keys stay the same so call-sites don't break.
 */
export const abstractImages = {
  // Soft teal/cyan abstract.
  hero: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1600&q=80&auto=format&fit=crop',
  // Misty cool tones — minimal.
  cli: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1200&q=80&auto=format&fit=crop',
  // Cool gradient abstract.
  recipes: 'https://images.unsplash.com/photo-1488229297570-58520851e868?w=1200&q=80&auto=format&fit=crop',
  // Calm aerial water.
  lifecycle: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=1200&q=80&auto=format&fit=crop',
  // Soft cool waves.
  doctor: 'https://images.unsplash.com/photo-1492011221367-f47e3ccd77a0?w=1200&q=80&auto=format&fit=crop',
  // Misty atmospheric — for the CTA.
  cta: 'https://images.unsplash.com/photo-1505820013142-f86a3439c5b2?w=1600&q=80&auto=format&fit=crop',
  // Hero backdrop — abstract gradient texture, masked top + bottom so
  // only a centered band is visible, blending into the page on both ends.
  heroBackdrop:
    'https://images.unsplash.com/photo-1695844918823-8ec54d7d839c?q=80&w=2852&auto=format&fit=crop',
} as const;
