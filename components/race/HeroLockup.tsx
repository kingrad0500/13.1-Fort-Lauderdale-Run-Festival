import Image from 'next/image'
import { event } from '@/content/race'

/**
 * The homepage hero identity lockup. Client-directed (§29.15).
 *
 * Replaces the campaign headline "RUN INTO THE / Sunrise" with the full event
 * identity: title-sponsor mark, event name, presenting-partner mark.
 *
 * WHY THE LOGO SITS ON ITS OWN LINE. Liquid Youth's artwork is a STACKED
 * two-line wordmark (LIQUID over YOUTH), not a horizontal one. Setting it
 * inline with "Fort Lauderdale" would force it down to the cap-height of the
 * surrounding type, leaving the title sponsor as the smallest element in the
 * hero. Baptist Health's mark IS horizontal, so it sits inline after its label.
 *
 * HIERARCHY (§12.3) is preserved exactly as the header does it: the title
 * sponsor is part of the event name itself, the presenting partner gets the
 * smaller role-labelled treatment. The two are never levelled.
 *
 * The two-part Fraunces gesture — upright caps over gold italic — is the
 * site's one typographic signature. "FORT LAUDERDALE / Running Festival"
 * inherits the slot that "RUN INTO THE / Sunrise" occupied, so the hero still
 * reads as this site's hero rather than as a sponsor slide.
 *
 * ACCESSIBILITY. The h1 carries ONE accessible name via a visually-hidden
 * span; every visual part is aria-hidden. Without this a screen reader gets
 * the name in fragments split across two images and three text nodes.
 */
export function HeroLockup() {
  return (
    <h1 className="mt-5 [text-wrap:initial]">
      <span className="sr-only">
        {event.name}, presented by {event.presentedBy.name}
      </span>

      <span aria-hidden="true" className="block">
        {/* Title sponsor. Reversed-out artwork — see race.ts. */}
        <Image
          src={event.wordmark.sponsorLogo}
          alt=""
          width={897}
          height={320}
          priority
          className="h-auto w-[clamp(11.5rem,32vw,24rem)] object-contain"
        />

        <span className="mt-4 block text-sand sm:mt-5">
          {/*
            Sized to hold ONE line at every width. "FORT LAUDERDALE" is three
            characters longer than "RUN INTO THE" was, so the previous clamp
            minimum overflowed at 320px — the floor here is measured, not
            inherited.
          */}
          <span className="block text-[clamp(1.75rem,5.4vw,5.25rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em]">
            {event.wordmark.place}
          </span>
          <span className="mt-1 block text-[clamp(2.25rem,7.4vw,6.5rem)] font-bold italic leading-[0.9] tracking-[-0.03em] text-gold">
            {event.wordmark.event}
          </span>
        </span>

        {/* Presenting partner. Smaller, role-labelled, never the same weight
            as the title sponsor above. */}
        <span className="mt-5 flex items-center gap-3 sm:mt-6 sm:gap-4">
          <span className="eyebrow shrink-0 text-sand/60">Presented by</span>
          <Image
            src={event.presentedBy.logoWhite}
            alt=""
            width={900}
            height={315}
            priority
            className="h-auto w-[clamp(7.5rem,15vw,11.5rem)] object-contain"
          />
        </span>
      </span>
    </h1>
  )
}
