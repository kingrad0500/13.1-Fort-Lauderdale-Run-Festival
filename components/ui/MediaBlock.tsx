import Image, { type StaticImageData } from 'next/image'
import { Scrim } from './Scrim'
import { cn } from '@/lib/cn'

/**
 * Photography block. Brief §15 component system, §15 layout rhythm.
 *
 * §15: "Alternate photographic and informational sections" and "Reserve
 * full-width media for important emotional moments." This is the paired
 * variant — image beside content — used for the ordinary photographic
 * sections, leaving genuinely full-bleed treatment for the hero and the final
 * conversion moment.
 *
 * §16: images reserve their dimensions (static import), meaningful images get
 * useful alternative text, decorative images get empty alt.
 */
export function MediaBlock({
  image,
  alt,
  children,
  reverse = false,
  className,
}: {
  image: StaticImageData
  /** Empty string marks the image decorative (§16). */
  alt: string
  children: React.ReactNode
  /** Puts the image on the left instead of the right. */
  reverse?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        'grid items-center gap-10 lg:grid-cols-2 lg:gap-16',
        className,
      )}
    >
      <div className={cn(reverse && 'lg:order-2')}>{children}</div>

      <div
        className={cn(
          'relative aspect-[4/3] overflow-hidden rounded-[var(--radius-hero)]',
          'shadow-[var(--shadow-card)]',
          reverse && 'lg:order-1',
        )}
      >
        <Image
          src={image}
          alt={alt}
          placeholder="blur"
          sizes="(min-width: 1024px) 46vw, 100vw"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    </div>
  )
}

/**
 * Full-bleed media with content overlaid. Reserved for the emotional moments
 * §15 describes — currently the final conversion section only.
 */
export function FeatureMedia({
  image,
  alt,
  children,
  className,
}: {
  image: StaticImageData
  alt: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative isolate overflow-hidden rounded-[var(--radius-hero)] bg-navy',
        'shadow-[var(--shadow-raised)]',
        className,
      )}
    >
      <Image
        src={image}
        alt={alt}
        placeholder="blur"
        sizes="(min-width: 1536px) 1440px, 100vw"
        className="absolute inset-0 size-full object-cover"
      />
      <Scrim />

      <div className="relative z-[2]">{children}</div>
    </div>
  )
}
