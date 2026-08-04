'use client'

import { useEffect, useState } from 'react'
import { Marquee } from '@/components/ui/Marquee'
import { cn } from '@/lib/cn'

/**
 * The moving half of the top bar. Client-directed, §29.19.
 *
 * WHY THIS IS A SEPARATE FILE. `Banners` reads EVENT_MODE, EMERGENCY_MESSAGE
 * and friends from `process.env`. None of those are NEXT_PUBLIC_, so they only
 * exist on the server — marking `Banners` itself `'use client'` would leave
 * them `undefined` and silently disable both the emergency banner and the
 * lifecycle override. So `Banners` stays a server component and hands the
 * finished content down here as children.
 *
 * The children are rendered twice by `Marquee` to form the loop; the second
 * copy is `aria-hidden`, so the facts are still announced exactly once.
 *
 * PAUSE (§12.3, §16, §25 and WCAG 2.2.2). Motion that starts on its own and
 * runs past five seconds needs a way to stop it. There are three here:
 * a real button, hover, and focus-within. The button is the one that matters —
 * hover does not exist on touch, and it is the only one a screen-reader user
 * can find.
 *
 * Reduced-motion and pre-hydration get the static scrollable row instead of a
 * frozen animation: §16 asks for "a static presentation", which means a
 * sensible layout, not a stopped one. That ordering also means the no-JS
 * experience is the default and the motion is the enhancement.
 */
export function EventTicker({ children }: { children: React.ReactNode }) {
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

  return (
    /*
      Fixed height on BOTH branches. The static row and the marquee must occupy
      identical space or the swap at hydration shifts every page down — the same
      trap the sponsor marquee hit at 0.096 CLS.
    */
    <div className="flex h-11 items-center">
      {animated ? (
        <>
          <div className="relative h-full min-w-0 flex-1">
            <Marquee
              paused={paused}
              className={cn(
                'h-full',
                '[&:hover_.marquee-track]:[animation-play-state:paused]',
                '[&:focus-within_.marquee-track]:[animation-play-state:paused]',
              )}
            >
              {children}
            </Marquee>

            {/* Edge fades, so text enters and leaves rather than being cut —
                the right-hand one also stops the strip colliding with the
                pause button beside it. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-navy-900 to-transparent sm:w-10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-navy-900 to-transparent sm:w-10"
            />
          </div>

          {/* On the bar itself, outside the clipped track, so the control is
              never carried off-screen by the thing it controls. */}
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className={cn(
              'mr-2 ml-1 inline-flex size-11 shrink-0 items-center justify-center',
              'rounded-full text-[0.625rem] text-sand/60 transition-colors',
              'hover:bg-white/10 hover:text-sand focus-visible:bg-white/10',
            )}
          >
            <span aria-hidden="true">{paused ? '▶' : '❚❚'}</span>
            <span className="sr-only">
              {paused ? 'Play' : 'Pause'} the event information ticker
            </span>
          </button>
        </>
      ) : (
        /*
          Static fallback. Left-aligned while it overflows, centred once it
          fits — centring an overflowing row clips BOTH ends, which opened the
          strip mid-sentence with the race date already scrolled off.
        */
        <div
          className={cn(
            'page-shell flex h-full items-center justify-start overflow-x-auto',
            'lg:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}
