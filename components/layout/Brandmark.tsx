import Link from 'next/link'
import Image from 'next/image'
import { event } from '@/content/race'
import { cn } from '@/lib/cn'

/**
 * Event identity lockup: stacked wordmark + presenting-partner mark.
 *
 * WHY STACKED. Measured at 1440px, the header leaves 496px for a wordmark once
 * the nav links (674px) and Register button (110px) are placed. The full title
 * on one line needs 578px at 22px — and 473px at 18px, which is too small to
 * act as a primary identity. Stacking lets the name read properly AND leaves
 * room for the presenting-partner lockup beside it.
 *
 * HIERARCHY (brief §12.3). Liquid Youth are the TITLE sponsor, so they sit
 * inside the event name itself. Baptist Health are the PRESENTING partner, so
 * they get the smaller "presented by" treatment. The two are not
 * interchangeable and must not be levelled to the same weight.
 *
 * The real event logo is still outstanding (client action item 1). This is a
 * typographic stand-in, built so swapping in a supplied mark is a one-file
 * change.
 */
export function Brandmark({
  tone = 'inverse',
  className,
}: {
  /** `inverse` for navy/over-media; `ink` for light surfaces. */
  tone?: 'inverse' | 'ink'
  className?: string
}) {
  const inverse = tone === 'inverse'

  return (
    <Link
      href="/"
      aria-label={`${event.name}, presented by ${event.presentedBy.name} — home`}
      className={cn(
        'flex min-h-[44px] shrink-0 items-center gap-1.5 sm:gap-2.5 md:gap-3.5',
        className,
      )}
    >
      {/* Title sponsor mark. Reversed-out artwork — see race.ts. */}
      <Image
        src={event.wordmark.sponsorLogo}
        alt=""
        aria-hidden="true"
        width={560}
        height={200}
        priority
        className={cn(
          'h-auto w-[44px] shrink-0 object-contain sm:w-[58px] md:w-[72px]',
          // Reversed-out white. Inverted rather than recoloured on a light
          // surface — the artwork itself is never altered.
          !inverse && 'brightness-0',
        )}
      />

      {/*
        Event name. aria-hidden because the link already carries the full,
        correctly punctuated name including the title sponsor — otherwise it
        is announced twice.

        Two lines at every width. It was three when the sponsor was set in
        type; moving that to artwork shortened the text enough that the place
        and event names no longer need to split apart on small screens.
      */}
      <span
        aria-hidden="true"
        className={cn(
          'flex min-w-0 flex-col font-sans text-[0.5625rem] font-extrabold uppercase leading-[1.15]',
          'tracking-[0.02em] sm:text-[0.625rem] md:text-[0.9375rem] md:leading-[1.05]',
        )}
      >
        <span className={inverse ? 'text-sand' : 'text-navy'}>
          {event.wordmark.place}
        </span>
        <span className={inverse ? 'text-gold' : 'text-blue'}>
          {event.wordmark.event}
        </span>
      </span>

      {/* Presenting partner, separated by a rule so the two marks never read
          as one lockup. Shown at EVERY width now that the Register button
          steps aside on phones — the full lockup was the point of freeing
          that space. */}
      <span
        aria-hidden="true"
        className={cn(
          'flex items-center gap-1 border-l pl-1.5 sm:gap-2.5 sm:pl-3 md:gap-3 md:pl-4',
          inverse ? 'border-sand/25' : 'border-navy/20',
        )}
      >
        <span
          className={cn(
            'font-sans text-[0.4375rem] font-bold uppercase leading-tight tracking-[0.1em] sm:text-[0.5rem] sm:tracking-[0.14em]',
            inverse ? 'text-sand/60' : 'text-navy/50',
          )}
        >
          Presented
          <br />
          by
        </span>
        <Image
          src={event.presentedBy.logoWhite}
          alt=""
          width={280}
          height={100}
          priority
          className={cn(
            'h-auto w-[42px] object-contain sm:w-[64px] lg:w-[86px]',
            // The supplied mark is reversed-out white. On a light surface it
            // would vanish, so it is inverted rather than recoloured — the
            // artwork itself is never altered.
            !inverse && 'brightness-0',
          )}
        />
      </span>
    </Link>
  )
}
