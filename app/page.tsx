import { event, distances, pricingNotice, capacity } from '@/content/race'
import { relayOptionalFinish, relayEligibilityNote } from '@/content/relay'
import { raceEventJsonLd, JsonLd } from '@/lib/jsonld'

import { RegisterButton } from '@/components/ui/RegisterButton'
import { HeroMedia } from '@/components/race/HeroMedia'
import { RaceCard } from '@/components/race/RaceCard'
import { RelayDiagram } from '@/components/race/RelayDiagram'
import { BenefitList } from '@/components/race/BenefitList'
import { SnapshotTimeline } from '@/components/race/SnapshotTimeline'
import { SponsorWall } from '@/components/race/SponsorWall'
import { SponsorMarquee } from '@/components/race/SponsorMarquee'

import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { EventChipRow } from '@/components/ui/ChipRow'
import { Button, TextAction } from '@/components/ui/Button'
import { Section, SectionIntro } from '@/components/ui/SectionIntro'
import { StaggeredGrid } from '@/components/ui/StaggeredGrid'
import { StatusNotice } from '@/components/ui/StatusNotice'
import { MediaBlock, FeatureMedia } from '@/components/ui/MediaBlock'

import heroImage from '@/media/homepage-ftlauderdale.jpg'
import courseImage from '@/media/sub-pages-ftlauderdale-131-3.jpg'
import festivalImage from '@/media/sub-pages-ftlauderdale-131-2.jpg'
import finalImage from '@/media/homepage-ftlauderdale2.jpg'

/**
 * Homepage — brief §7, all eleven sections in the approved order.
 *
 * Layout rhythm follows §15: photographic and informational sections alternate,
 * card grids are never stacked consecutively, and full-bleed media is reserved
 * for the two emotional moments (hero, final conversion).
 *
 * NOTE ON IMAGERY: `finisher.jpg` is the natural choice for section 11 and is
 * deliberately NOT used. It shows Cleveland Clinic and Life Time branding from
 * 2019, and the 2026 title sponsor is Liquid Youth — publishing it would put a
 * former title sponsor on the homepage. Held pending client action item 3.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={raceEventJsonLd()} />

      {/* ============================================================
          1. Hero — §7.1 (revised §29.4)
          ============================================================ */}
      {/* Full-bleed, and pulled up by exactly the header height so the
          transparent nav sits ON the media rather than above it. The inner
          padding gives the content that height back, so nothing hides behind
          the bar. */}
      <section className="-mt-[var(--header-h)]">
        <HeroMedia
          poster={heroImage}
          video="/media/runners-poster.jpg"
          priority
          fullBleed
          alt="Runners along A1A in Fort Lauderdale at sunrise, palm trees and race banners lining the road"
          className="min-h-[36rem] sm:min-h-[40rem] lg:min-h-[88vh]"
        >
          <div className="page-shell flex min-h-[36rem] flex-col justify-end pb-24 pt-[calc(var(--header-h)+2rem)] sm:min-h-[40rem] sm:pb-20 lg:min-h-[88vh] lg:pb-20">
            <div className="max-w-4xl">
              <div className="motion-safe:animate-[hero-enter_0.6s_var(--ease-out-soft)_both]">
                <EyebrowLabel tone="inverse">
                  {event.dateDisplay} · {event.venue}
                </EyebrowLabel>
              </div>

              {/*
                Mixed Fraunces headline — §4. Approved copy, verbatim.
                Sized so "RUN INTO THE" holds ONE line at every breakpoint:
                the intended shape is two lines, not three. Balance is off
                because balancing a deliberately composed headline is wrong.
              */}
              <h1 className="mt-5 text-sand [text-wrap:initial] motion-safe:animate-[hero-enter_0.6s_var(--ease-out-soft)_0.1s_both]">
                <span className="block text-[clamp(2.25rem,6.4vw,6rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em]">
                  Run Into The
                </span>
                <span className="mt-1 block text-[clamp(3rem,9vw,7rem)] font-bold italic leading-[0.9] tracking-[-0.03em] text-gold">
                  Sunrise
                </span>
              </h1>

              <p className="measure mt-6 font-sans text-lg leading-relaxed text-sand/90 sm:text-xl motion-safe:animate-[hero-enter_0.6s_var(--ease-out-soft)_0.2s_both]">
                Four ways to race. One unforgettable morning along Las Olas and
                A1A.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3 motion-safe:animate-[hero-enter_0.6s_var(--ease-out-soft)_0.3s_both]">
                <RegisterButton source="hero" size="lg">
                  Choose Your Race
                </RegisterButton>
                <Button href="/race-weekend" variant="inverse" size="lg">
                  Explore Race Weekend
                </Button>
              </div>

              {/* Micro-reassurance — §7.1. States something TRUE: §22 makes
                  registration final, so no guarantee is implied. */}
              <p className="mt-5 font-sans text-sm text-sand/70 motion-safe:animate-[hero-enter_0.6s_var(--ease-out-soft)_0.4s_both]">
                Secure registration on RunSignUp · Final pricing shown at
                checkout
              </p>
            </div>
          </div>
        </HeroMedia>
      </section>

      <div data-hero-sentinel="" aria-hidden="true" className="h-px" />

      {/* ============================================================
          1b. Partner logo strip — client-directed placement.

          Moved here from §7.10 at the client's request. This matches the
          reference sites, all five of which put a trust strip directly below
          the hero, and it is the position that made the brief's original
          §7.10 placement a compromise in the first place.

          §12.3 permits a marquee only if it can be PAUSED, and §25 forbids
          automatic movement on critical content — which is why the race times
          immediately below stay a static row and never became a slider.
          ============================================================ */}
      <section
        aria-label="Event partners and sponsors"
        className="pt-10 sm:pt-14"
      >
        <p className="eyebrow mb-5 text-center text-navy/45">
          Proudly supported by
        </p>
        {/* Full-bleed, deliberately: a marquee clipped at the page gutter cuts
            logos mid-mark. Running edge to edge lets tiles enter and leave
            under the fades instead. */}
        <SponsorMarquee label="partner logos above the race times" />
      </section>

      {/* ============================================================
          2. Essential event strip — §7.2 (revised §29.5)
          Static. No slider. Critical schedule information.
          ============================================================ */}
      <section
        aria-label="Race distances and start times"
        className="page-shell pb-10 pt-8 sm:pb-14 sm:pt-10"
      >
        <EventChipRow />
      </section>

      {/* ============================================================
          3. Emotional introduction — §7.3
          ============================================================ */}
      <section className="page-shell pb-20 pt-6 text-center sm:pb-28">
        <h2 className="mx-auto max-w-4xl text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-[-0.02em] text-navy">
          Ocean air. Sunrise miles.{' '}
          <span className="italic text-blue">Las Olas energy.</span> A finish
          line by the beach.
        </h2>
      </section>

      {/* ============================================================
          4. Choose your race — §7.4 (staggered grid, §29.6)
          ============================================================ */}
      <Section surface="paper" id="choose-your-race">
        <SectionIntro
          eyebrow="Four ways to race"
          title="Choose your race"
          lede="Go long, run fast, team up, or make your first finish unforgettable. Every distance is professionally timed and finishes at the same beach party."
        />

        <StaggeredGrid className="mt-14 lg:mt-16">
          {distances.map((distance) => (
            <RaceCard key={distance.slug} distance={distance} />
          ))}
        </StaggeredGrid>

        {/* Required verbatim, §7.4. Interpolated from content/race.ts so the
            price-increase date can never drift. */}
        <div className="mt-20 sm:mt-24 lg:mt-28">
          <p className="measure font-sans text-sm leading-relaxed text-navy/65">
            {pricingNotice}
          </p>
          <p className="measure mt-3 font-sans text-sm leading-relaxed text-navy/65">
            {capacity}
          </p>
        </div>
      </Section>

      {/* ============================================================
          5. Course experience — §7.5
          ============================================================ */}
      <Section>
        <MediaBlock
          image={courseImage}
          alt="Runners on the coastal A1A section of the Fort Lauderdale course"
        >
          <SectionIntro
            eyebrow="The course"
            title={
              <>
                Las Olas, Harbor Beach,{' '}
                <span className="italic text-blue">and the Atlantic.</span>
              </>
            }
            lede="You start in the dark at Las Olas Oceanside Park, run the quiet early miles through Harbor Beach, then turn onto A1A as the sun comes up over the water. The last stretch is the one people remember."
          />

          {/* §7.5: a discreet status, not a large empty placeholder. */}
          <div className="mt-8">
            <StatusNotice id="courseMaps" />
          </div>

          <div className="mt-8">
            <TextAction href="/distances">See every distance</TextAction>
          </div>
        </MediaBlock>
      </Section>

      {/* ============================================================
          6. What every runner receives — §7.6
          ============================================================ */}
      <Section surface="paper">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          <SectionIntro
            eyebrow="Included with every entry"
            title="What every runner receives"
            lede="Whichever distance you choose, race morning comes with the same things."
          />
          <BenefitList />
        </div>
      </Section>

      {/* ============================================================
          7. Relay experience — §7.7
          One of the two deliberate full-width dark moments (§4).
          ============================================================ */}
      <Section surface="navy" id="relay">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionIntro
            tone="inverse"
            eyebrow="Two-person relay"
            title={
              <>
                Half the distance.{' '}
                <span className="italic text-gold">Twice the story.</span>
              </>
            }
            lede="Split 13.1 miles with someone you like being around at 5 a.m. One runner takes the first leg, hands off on A1A, and the second brings it home."
          />

          <div>
            <RelayDiagram tone="inverse" />

            <div className="mt-8 space-y-2">
              {relayOptionalFinish.map((line) => (
                <p
                  key={line}
                  className="font-sans text-[0.9375rem] leading-relaxed text-sand/70"
                >
                  {line}
                </p>
              ))}
            </div>

            <p className="mt-6 font-sans text-[0.9375rem] font-semibold text-sand">
              {relayEligibilityNote}
            </p>

            <div className="mt-8">
             <RegisterButton source="final-section" size="lg" />
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================
          8. More than a race — §7.8
          Welcomes visitors without presenting locals as tourists.
          ============================================================ */}
      <Section>
        <MediaBlock
          reverse
          image={festivalImage}
          alt="Runners and spectators along the Fort Lauderdale beachfront during the race"
        >
          <SectionIntro
            eyebrow="More than a race"
            title={
              <>
                The finish line is where{' '}
                <span className="italic text-blue">the morning really starts.</span>
              </>
            }
            lede="The festival opens at 7:00 a.m. on the sand — food, music, medals, and everyone who came to watch you. Stay for the morning, then take the rest of the weekend at Las Olas, the beach, and the waterways."
          />

          <p className="measure mt-6 font-sans text-[1.0625rem] leading-relaxed text-navy/75">
            Whether you drove ten minutes or flew in for the weekend, the same
            thing is true: this is a good morning to be in Fort Lauderdale.
          </p>

          <div className="mt-8">
            <TextAction href="/plan-your-trip">Plan your weekend</TextAction>
          </div>
        </MediaBlock>
      </Section>

      {/* ============================================================
          9. Race weekend snapshot — §7.9
          Essential schedule only. Static, chronological.
          ============================================================ */}
      <Section surface="paper" id="weekend">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          <SectionIntro
            eyebrow="Race weekend"
            title="The essentials"
            lede="Packet pickup on Saturday, racing on Sunday. The full guide covers everything else."
          />

          <div>
            <SnapshotTimeline />
            <div className="mt-8">
              <Button href="/race-weekend" variant="secondary">
                View the full race weekend guide
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================
          10. Accessibility and community — §7.10
          §8.8: respectful, brief, no large promotional image beside a
          long legal paragraph. Sponsors stay restrained here (§7.10).
          ============================================================ */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionIntro
              eyebrow="Everyone on the course"
              title="Accessibility"
              lede="Athletes using wheelchairs are welcome, and the event follows applicable recognized wheelchair-racing rules. There is no hand-cycle division."
            />
            <div className="mt-8">
              <TextAction href="/race-weekend#accessibility">
                Read the full participation policy
              </TextAction>
            </div>
          </div>

          <div>
            <EyebrowLabel>Partners</EyebrowLabel>
            {/* The logo strip now sits below the hero, so this repeats the
                hierarchy in text only rather than showing a second wall. */}
            <SponsorWall className="mt-6" />
          </div>
        </div>
      </Section>

      {/* ============================================================
          11. Final conversion — §7.11
          Approved copy, verbatim.
          ============================================================ */}
      <section className="page-shell pb-4">
        <FeatureMedia
          image={finalImage}
          alt="The race field spread across the road in Fort Lauderdale on race morning"
        >
          <div className="flex min-h-[26rem] flex-col justify-end p-8 sm:min-h-[32rem] sm:p-14 lg:p-20">
            <div className="max-w-3xl">
              <h2 className="text-sand [text-wrap:initial]">
                <span className="block text-[clamp(2.25rem,6vw,5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em]">
                  Your Start Line
                </span>
                <span className="mt-1 block text-[clamp(2.5rem,7vw,6rem)] font-bold italic leading-[0.9] tracking-[-0.03em] text-gold">
                  Is Waiting
                </span>
              </h2>

              <p className="measure mt-6 font-sans text-lg leading-relaxed text-sand/90 sm:text-xl">
                Choose your distance and join Fort Lauderdale at sunrise.
              </p>

              <div className="mt-9">
               <RegisterButton source="distance-card" distance="relay" size="lg">
                 Register your team
               </RegisterButton>
              </div>
            </div>
          </div>
        </FeatureMedia>
      </section>
    </>
  )
}
