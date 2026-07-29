'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'

/**
 * Hero background video. Brief §16.
 *
 * Every §16 video requirement is implemented here:
 *   - "Video never autoplays with sound"      -> muted, and the encoded files
 *                                                have no audio stream at all
 *   - "Hero video includes a pause control"   -> a real button, bottom-right
 *   - "A strong poster image appears before
 *      the video loads or when autoplay is
 *      unavailable"                           -> poster, always rendered first
 *   - "Reduced-motion users receive a static
 *      or minimally animated experience"      -> poster only, video never loads
 *   - "provide smaller mobile versions"       -> 298 KB mobile / 829 KB desktop
 *
 * LOADING STRATEGY. The poster is the default and the video is an enhancement,
 * chosen after mount so that:
 *   - reduced-motion users never download 829 KB they will not watch
 *   - the source is picked from viewport width, so phones get the 298 KB file
 *   - `<video>` carries no `src` until we decide, so nothing is fetched twice
 *
 * The clip is 5.87s, so it loops often. That is fine for ambient motion but it
 * is why playback is slow and unobtrusive rather than something you watch.
 */
export function HeroVideo({
  poster,
  className,
}: {
  poster: string
  className?: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [src, setSrc] = useState<string | null>(null)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Respect an explicit data-saver preference where the browser exposes it.
    const conn = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection
    if (conn?.saveData) return

    const mobile = window.matchMedia('(max-width: 767px)').matches
    setSrc(mobile ? '/media/runners-mobile.mp4' : '/media/runners-desktop.mp4')
  }, [])

  useEffect(() => {
    const el = videoRef.current
    if (!el || !src) return

    el.play().then(
      () => setPlaying(true),
      // Autoplay refused (battery saver, iOS low-power). The poster stays,
      // which is exactly the §16 fallback, and the control lets them start it.
      () => setPlaying(false),
    )
  }, [src])

  function toggle() {
    const el = videoRef.current
    if (!el) return
    if (el.paused) {
      el.play().then(() => setPlaying(true), () => {})
    } else {
      el.pause()
      setPlaying(false)
    }
  }

  return (
    <>
      {/* Poster is always present and never removed — it is what shows before
          the video decodes, if autoplay is refused, and under reduced motion. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        className={cn('absolute inset-0 size-full object-cover', className)}
      />

      {src && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          onCanPlay={() => setReady(true)}
          aria-hidden="true"
          tabIndex={-1}
          className={cn(
            'absolute inset-0 size-full object-cover transition-opacity duration-700',
            ready && playing ? 'opacity-100' : 'opacity-0',
            className,
          )}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      {src && ready && (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={!playing}
          className={cn(
            // Bottom-right. It was top-right while the hero was inset, but the
            // header now overlays the media full-bleed and the top-right corner
            // belongs to the Register button. The hero content reserves matching
            // bottom padding so this never lands on the reassurance line.
            'absolute bottom-5 right-5 z-[3]',
            'inline-flex min-h-[44px] min-w-[44px]',
            'items-center justify-center gap-2 rounded-[var(--radius-pill)]',
            'border border-sand/30 bg-navy/60 px-4 backdrop-blur-sm',
            'font-sans text-xs font-bold text-sand transition-colors',
            'hover:bg-navy/80',
          )}
        >
          <span aria-hidden="true">{playing ? '❚❚' : '▶'}</span>
          <span className="sr-only">
            {playing ? 'Pause background video' : 'Play background video'}
          </span>
        </button>
      )}
    </>
  )
}
