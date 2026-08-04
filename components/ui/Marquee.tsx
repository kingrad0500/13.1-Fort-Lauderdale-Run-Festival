'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'

/**
 * Continuous horizontal marquee, in pure CSS.
 *
 * WHY NOT `InfiniteSlider`. The existing sponsor marquee is framer-motion, and
 * that is affordable because it renders on the homepage only. This one lives in
 * the top bar, which is in `app/layout.tsx` and therefore on every page —
 * reusing the framer-motion slider would push ~49kB onto all seven routes for a
 * strip of text. So this is a transform animation and a keyframe, nothing else.
 *
 * HOW THE LOOP WORKS. The track holds the children TWICE and translates by
 * exactly -50%, which lands copy 2 where copy 1 started. Seamless, and it never
 * needs to measure a scroll position. The duplicate is `aria-hidden`, so the
 * content is still announced once.
 *
 * CONSTANT SPEED. The duration is derived from the measured track width rather
 * than fixed, so the text always moves at the same px/sec no matter how long
 * the message is. A fixed duration would make a long lifecycle banner read
 * fast and a short one crawl. Re-measured on resize and after fonts load,
 * because both change the width underneath us.
 *
 * This component does NOT decide whether to animate — the caller does, because
 * reduced-motion users need a genuinely static layout rather than a frozen
 * animation (§16, §25). See Banners for that branch.
 */
export function Marquee({
  children,
  /** Pixels per second. */
  speed = 55,
  paused = false,
  className,
}: {
  children: React.ReactNode
  speed?: number
  paused?: boolean
  className?: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [duration, setDuration] = useState<number | null>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const measure = () => {
      // Half the track is one copy of the children — that is the distance the
      // animation actually travels.
      const distance = track.scrollWidth / 2
      if (distance > 0) setDuration(distance / speed)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(track)
    // Webfonts land after first paint and change the width, which would
    // otherwise leave the speed calculated against fallback metrics.
    document.fonts?.ready.then(measure).catch(() => {})

    return () => observer.disconnect()
  }, [speed])

  return (
    /* `flex items-center` so the track is centred when the caller gives this a
       fixed height — without it the track keeps its content height and rides
       at the top of the bar. */
    <div className={cn('relative flex items-center overflow-hidden', className)}>
      <div
        ref={trackRef}
        className="marquee-track flex w-max flex-nowrap items-center"
        style={{
          // Held still until measured, so it never starts at the wrong speed
          // and visibly corrects itself.
          animationDuration: duration ? `${duration}s` : undefined,
          animationPlayState: paused || !duration ? 'paused' : 'running',
        }}
      >
        <div className="flex flex-nowrap items-center">{children}</div>
        <div aria-hidden="true" className="flex flex-nowrap items-center">
          {children}
        </div>
      </div>
    </div>
  )
}
