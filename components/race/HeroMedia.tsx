import Image, { type StaticImageData } from 'next/image'
import { Scrim } from '@/components/ui/Scrim'
import { HeroVideo } from './HeroVideo'
import { cn } from '@/lib/cn'

/**
 * Inset hero media. Brief §7.1 (revised, §29.4) and §16.
 *
 * VIDEO-READY BY DESIGN. `video` is nullable and is null everywhere today,
 * because assets/Videos/ is empty (client action item 11). With video null this
 * renders an optimised still inside the rounded frame. When footage arrives,
 * passing a src activates autoplay/muted/loop plus the pause control §16
 * requires — with NO structural change to this component or its callers.
 *
 * §16 requirements already satisfied in the still state:
 *   - a strong poster image appears before video loads or if autoplay fails
 *   - meaningful images receive useful alternative text
 *   - reduced-motion users get a static presentation (globals.css kills the drift)
 *   - dimensions come from the static import, so the frame reserves its space
 *     and CLS stays at zero
 */
export function HeroMedia({
  poster,
  alt,
  video = null,
  priority = false,
  fullBleed = false,
  className,
  children,
}: {
  poster: StaticImageData
  alt: string
  /**
   * Poster path for the video variant. When set, HeroVideo takes over the
   * background and this component's static Image is skipped — see below.
   */
  video?: string | null
  priority?: boolean
  /** Edge-to-edge with square corners, for the overlaid homepage hero. */
  fullBleed?: boolean
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'relative isolate overflow-hidden bg-navy',
        fullBleed
          ? ''
          : 'rounded-[var(--radius-hero)] shadow-[var(--shadow-raised)]',
        className,
      )}
    >
      {video ? (
        /*
          Video supplies its own poster, pause control and reduced-motion
          fallback (§16). The Ken Burns drift is deliberately NOT applied on
          top — the footage already moves, and animating a moving video is the
          kind of compounded motion §25 warns against.
        */
        <HeroVideo poster={video} />
      ) : (
        <Image
          src={poster}
          alt={alt}
          placeholder="blur"
          priority={priority}
          sizes="(min-width: 1536px) 1440px, 100vw"
          className="absolute inset-0 size-full object-cover motion-safe:animate-[hero-drift_24s_ease-in-out_infinite_alternate]"
        />
      )}

      <Scrim intensity={video ? 'light' : 'default'} />

      {/*
        Extra top scrim, full-bleed only. The nav now sits ON the media, and
        the brightest part of this clip is the sky at the top of frame — the
        main scrim is weakest exactly there because it ramps from the bottom.
        Without this the nav links and the reversed-out Baptist Health mark
        lose contrast. Verified by scripts/check-contrast.mjs, which samples
        the nav region as well as the headline.
      */}
      {fullBleed && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-40 bg-gradient-to-b from-navy/85 via-navy/45 to-transparent"
        />
      )}

      <div className="relative z-[2]">{children}</div>
    </div>
  )
}
