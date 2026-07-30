import type { StaticImageData } from 'next/image'
import Image from 'next/image'
import { Scrim } from './Scrim'
import { EyebrowLabel } from './EyebrowLabel'
import { cn } from '@/lib/cn'

/**
 * Interior page hero. Brief §8.1 and §9.1.
 *
 * Deliberately SHORTER than the homepage hero — §8.1: "The hero is shorter than
 * the homepage hero so participants reach logistics quickly." Interior pages
 * are consulted, not browsed, so the content starts near the fold.
 *
 * Same inset rounded frame and measured scrim as the homepage (§29.4), so the
 * system reads as one site.
 *
 * The headline uses the same two-part treatment: `title` upright, `accent`
 * italic gold. Keep the upright part short enough to hold one line — verify
 * with scripts/screenshot.mjs rather than assuming.
 */
export function PageHero({
  eyebrow,
  title,
  accent,
  lede,
  image,
  alt,
  facts,
  actions,
}: {
  eyebrow?: string
  title: string
  accent?: string
  lede?: React.ReactNode
  image: StaticImageData
  alt: string
  /** Essential facts kept visible in the hero, per §8.1. */
  facts?: { label: string; value: string }[]
  actions?: React.ReactNode
}) {
  return (
    <>
    <section className="page-shell pt-4">
      <div
        className={cn(
          'relative isolate overflow-hidden rounded-[var(--radius-hero)]',
          'bg-navy shadow-[var(--shadow-raised)]',
        )}
      >
        <Image
          src={image}
          alt={alt}
          placeholder="blur"
          priority
          sizes="(min-width: 1536px) 1440px, 100vw"
          className="absolute inset-0 size-full object-cover"
        />

        <Scrim />

        <div className="relative z-[2] p-7 pb-9 sm:p-12 lg:px-16 lg:py-20">
          <div className="max-w-4xl">
            {eyebrow && <EyebrowLabel tone="inverse">{eyebrow}</EyebrowLabel>}

            <h1 className="mt-4 text-sand [text-wrap:initial]">
              <span className="block text-[clamp(2.25rem,6vw,5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em]">
                {title}
              </span>
              {accent && (
                <span className="mt-1 block text-[clamp(2.5rem,7vw,5.75rem)] font-bold italic leading-[0.9] tracking-[-0.03em] text-gold">
                  {accent}
                </span>
              )}
            </h1>

            {lede && (
              <p className="measure mt-6 font-sans text-lg leading-relaxed text-sand/90">
                {lede}
              </p>
            )}

            {actions && (
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {actions}
              </div>
            )}
          </div>

          {/* Essential facts stay visible in the hero — §8.1. */}
          {facts && facts.length > 0 && (
            <dl className="mt-10 grid gap-x-10 gap-y-5 border-t border-white/15 pt-8 sm:grid-cols-2 lg:grid-cols-4">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="eyebrow text-sand/55">{fact.label}</dt>
                  <dd className="mt-1.5 font-numeric text-xl text-sand">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>

    {/*
      Sentinel for the sticky mobile Register bar (§14). Without it the bar
      watches for an element that does not exist and never appears at all —
      which was true on every interior page until this was added. The homepage
      has its own sentinel after its hero.
    */}
    <div data-hero-sentinel="" aria-hidden="true" className="h-px" />
    </>
  )
}
