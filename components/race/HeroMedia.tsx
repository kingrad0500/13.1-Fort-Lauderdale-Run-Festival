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
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'relative isolate overflow-hidden rounded-[var(--radius-hero)]',
        'bg-navy shadow-[var(--shadow-raised)]',
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

      <div className="relative z-[2]">{children}</div>
    </div>
  )
}
