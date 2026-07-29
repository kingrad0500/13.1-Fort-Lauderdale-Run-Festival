'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { sponsors, type Sponsor } from '@/content/sponsors'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { cn } from '@/lib/cn'

/**
 * Sponsor logo marquee. Brief §7.10, §12.3, §16, §25.
 *
 * §12.3 permits a marquee but is conditional: "If logos use a controlled
 * marquee… visitors must be able to pause it." So this ships a real pause
 * BUTTON, not the hover-only slowdown the source component came with — hover
 * does not exist on touch and cannot be reached by keyboard (§16).
 *
 * REDUCED MOTION (§16, §25): a continuously moving strip is exactly what
 * prefers-reduced-motion exists to suppress. Those users get a static
 * scrollable row instead of a frozen marquee — §16 asks for "a static
 * presentation", which means a sensible layout, not a stopped animation.
 *
 * Because the preference can only be read on the client, the first paint is
 * the static row and the marquee starts after mount. That order matters: it
 * means the no-JS and reduced-motion experience is the DEFAULT, and motion is
 * the enhancement.
 *
 * SURFACE-AWARE. It renders on sand below the hero and on navy in the footer.
 * The edge fades and the pause control must match whichever surface they sit
 * on, and the two `dark`-tile logos need a visible edge on navy or their tile
 * disappears into the background entirely.
 */
export function SponsorMarquee({
  surface = 'sand',
  reverse = false,
  /** Distinguishes the two pause buttons for screen-reader users. */
  label = 'sponsor logos',
}: {
  surface?: 'sand' | 'navy'
  reverse?: boolean
  label?: string
}) {
  const [mounted, setMounted] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(query.matches)
    setMounted(true)

    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const animated = mounted && !reducedMotion
  const onNavy = surface === 'navy'

  const fadeLeft = onNavy
    ? 'from-navy via-navy/80 to-transparent'
    : 'from-sand via-sand/80 to-transparent'
  const fadeRight = fadeLeft

  return (
    /*
      Fixed row height on BOTH states. The static fallback and the marquee must
      occupy identical space, otherwise the swap at hydration resizes the strip
      and pushes the whole page down — a layout shift measured at 0.096 CLS on
      mobile before this was reserved.
    */
    <div>
      <div className="h-[84px] sm:h-[96px]">
        {animated ? (
          <div className="relative">
            <InfiniteSlider
              gap={16}
              duration={45}
              reverse={reverse}
              paused={paused}
            >
              {sponsors.map((sponsor) => (
                <LogoTile key={sponsor.id} sponsor={sponsor} onNavy={onNavy} />
              ))}
            </InfiniteSlider>

            {/* Edge fades so logos enter and leave rather than being clipped. */}
            <div
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r sm:w-32',
                fadeLeft,
              )}
            />
            <div
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l sm:w-32',
                fadeRight,
              )}
            />
          </div>
        ) : (
          /* Static fallback: pre-hydration, reduced-motion, and no-JS. */
          <ul
            className={cn(
              'flex h-full items-center gap-4 overflow-x-auto px-4',
              'sm:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
            )}
          >
            {sponsors.map((sponsor) => (
              <li key={sponsor.id} className="shrink-0">
                <LogoTile sponsor={sponsor} onNavy={onNavy} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {animated && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className={cn(
              'inline-flex min-h-[44px] items-center gap-2 rounded-[var(--radius-pill)] px-4',
              'font-sans text-sm font-semibold transition-colors',
              onNavy
                ? 'text-sand/70 hover:bg-white/10 hover:text-sand'
                : 'text-navy/70 hover:bg-navy/8 hover:text-navy',
            )}
          >
            <span aria-hidden="true" className="text-xs">
              {paused ? '▶' : '❚❚'}
            </span>
            {paused ? 'Play' : 'Pause'}
            {/* Two marquees exist on the homepage. Without distinct names a
                screen-reader user browsing by button hears "Pause" twice with
                no way to tell them apart. */}
            <span className="sr-only"> {label}</span>
          </button>
        </div>
      )}
    </div>
  )
}

/**
 * One logo on its own tile.
 *
 * The tile colour comes from the sponsor data, not from a global choice —
 * seven of the nine marks are dark artwork that needs a light tile, and two
 * are white artwork that would be invisible on one. See content/sponsors.ts.
 *
 * On a navy surface the `dark` tiles would vanish into the background, so they
 * take a light hairline border to keep the row reading as a set of tiles
 * rather than two logos floating loose among seven cards.
 */
function LogoTile({
  sponsor,
  onNavy = false,
}: {
  sponsor: Sponsor
  onNavy?: boolean
}) {
  if (!sponsor.logo) {
    return (
      <span
        className={cn(
          'inline-flex h-[84px] items-center rounded-[var(--radius-card)] px-6',
          'font-sans text-sm font-semibold sm:h-[96px]',
          onNavy
            ? 'border border-white/15 text-sand/60'
            : 'border border-navy/10 bg-paper text-navy/60',
        )}
      >
        {sponsor.name}
      </span>
    )
  }

  const dark = sponsor.tile === 'dark'

  return (
    <span
      className={cn(
        'inline-flex h-[84px] w-[168px] items-center justify-center rounded-[var(--radius-card)]',
        'px-5 sm:h-[96px] sm:w-[196px] sm:px-6',
        dark
          ? onNavy
            ? 'border border-white/15 bg-navy'
            : 'bg-navy'
          : 'border border-navy/8 bg-paper shadow-[var(--shadow-card)]',
      )}
    >
      <Image
        src={`/media/logos/${sponsor.logo}`}
        alt={sponsor.name}
        width={280}
        height={100}
        className="h-auto max-h-[52px] w-auto max-w-full object-contain sm:max-h-[60px]"
      />
    </span>
  )
}
