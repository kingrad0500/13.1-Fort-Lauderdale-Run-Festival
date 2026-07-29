import {
  distances,
  getDistance,
  eligibility,
  capacity,
  pricingNotice,
  deadlines,
  registrationPolicy,
  completion,
} from '@/content/race'
import {
  relayOptionalFinish,
  relayEligibilityNote,
  relayBatonRule,
} from '@/content/relay'
import { buildMetadata } from '@/lib/metadata'

import { RegisterButton } from '@/components/ui/RegisterButton'
import { PageHero } from '@/components/ui/PageHero'
import { Section, SectionIntro } from '@/components/ui/SectionIntro'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { Button } from '@/components/ui/Button'
import { ComparisonTable } from '@/components/race/ComparisonTable'
import { DistanceSection } from '@/components/race/DistanceSection'
import { RaceCard, RaceCardCompact } from '@/components/race/RaceCard'
import { RelayDiagram } from '@/components/race/RelayDiagram'
import { StaggeredGrid } from '@/components/ui/StaggeredGrid'

import heroImage from '@/media/sub-pages-ftlauderdale-131.jpg'

export const metadata = buildMetadata({
  title: 'Distances — Half Marathon, Relay, 10K and 5K | Fort Lauderdale Running Festival',
  description:
    'Compare the Half Marathon, Two-Person Relay, 10K and 5K. Start times, distances and base prices for the Fort Lauderdale Running Festival on November 8, 2026.',
  path: '/distances',
})

/**
 * Distances — brief §9.
 *
 * ONE conversion-focused page with anchored sections, not four separate pages
 * (§9). That keeps comparison easy and stops shared rules — eligibility,
 * pricing, refunds, distance changes — being duplicated four times where they
 * could drift apart.
 */
export default function DistancesPage() {
  return (
    <>
      <PageHero
        image={heroImage}
        alt="The race field spread across A1A in Fort Lauderdale during the event"
        eyebrow="Four races, one morning"
        title="Find Your"
        accent="Start Line"
        lede="Go long, run fast, team up, or make your first finish unforgettable."
        actions={
          <>
            <Button href="#compare" variant="primary" size="lg">
              Compare the races
            </Button>
            <RegisterButton source="hero" variant="outline" size="lg" />
          </>
        }
      />

      {/* ============================================================
          2. Distance comparison — §9.2
          Four cards, then a compact table.
          ============================================================ */}
      <Section id="compare" className="scroll-mt-28">
        <SectionIntro
          eyebrow="Compare"
          title="Four distances, one finish line"
          lede="Every race is professionally timed with live results, starts and finishes at Las Olas Oceanside Park, and must be completed by 10:00 a.m."
        />

        <StaggeredGrid className="mt-14">
          {distances.map((distance) => (
            <RaceCard key={distance.slug} distance={distance} />
          ))}
        </StaggeredGrid>

        <div className="mt-20 sm:mt-24 lg:mt-28">
          <EyebrowLabel>Side by side</EyebrowLabel>
          <div className="mt-5">
            <ComparisonTable />
          </div>
          <p className="measure mt-6 font-sans text-sm leading-relaxed text-navy/65">
            {pricingNotice}
          </p>
        </div>
      </Section>

      {/* ============================================================
          3. Half Marathon — §9.3
          ============================================================ */}
      <DistanceSection
        surface="paper"
        distance={getDistance('half-marathon')}
        positioning={
          <>
            <p>
              The full coastal experience. You start in the dark at Las Olas
              Oceanside Park, run the quiet early miles through Harbor Beach,
              then turn onto A1A with the Atlantic on one side and the sun
              coming up over it.
            </p>
            <p>
              Thirteen point one miles, professionally timed, with live results
              so the people waiting at the finish know exactly when to look up.
            </p>
          </>
        }
        features={[
          'Las Olas, Harbor Beach and A1A',
          'Professional timing with live results',
          '3 hours 45 minutes from the 6:15 a.m. start',
          'Finisher medal and technical shirt',
          'Free race photography',
        ]}
      />

      {/* ============================================================
          4. Two-Person Relay — §9.4
          ============================================================ */}
      <DistanceSection
        distance={getDistance('relay')}
        positioning={
          <>
            <p>
              The same 13.1 miles, split between two people. One runner takes
              the first leg and hands the baton over on A1A; the second carries
              it to the finish.
            </p>
            <p className="font-semibold text-navy">{relayEligibilityNote}</p>
          </>
        }
        features={[
          'Two runners, one half marathon',
          `Exchange at E Las Olas and A1A southbound`,
          relayBatonRule,
          'Optional shared finish for the photograph',
          'Professional timing with live results',
        ]}
      >
        <div className="mt-10">
          <RelayDiagram tone="ink" />

          <div className="mt-6 space-y-2">
            {relayOptionalFinish.map((line) => (
              <p
                key={line}
                className="font-sans text-[0.9375rem] leading-relaxed text-navy/70"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </DistanceSection>

      {/* ============================================================
          5. Fort Lauderdale A1A 10K — §9.5
          ============================================================ */}
      <DistanceSection
        surface="paper"
        distance={getDistance('10k')}
        positioning={
          <>
            <p>
              A real challenge without the half marathon commitment. Six coastal
              miles with the ocean on one side and Fort Lauderdale waking up on
              the other.
            </p>
            <p>
              Starting at 7:00 a.m., you run into the best light of the morning
              and finish while the festival is just getting going.
            </p>
          </>
        }
        features={[
          '7:00 a.m. start',
          'Coastal A1A course',
          'Professional timing with live results',
          'Finisher medal and technical shirt',
          'Free race photography',
        ]}
      />

      {/* ============================================================
          6. Fort Lauderdale A1A 5K — §9.6
          ============================================================ */}
      <DistanceSection
        distance={getDistance('5k')}
        positioning={
          <>
            <p>
              For first-time racers, families, friends, and anyone who wants a
              short, fast morning. Welcoming, and still professionally organised
              and timed.
            </p>
            <p>
              Walking is welcome — walkers start behind the runners and finish
              on the same beach, at the same party.
            </p>
          </>
        }
        features={[
          '7:00 a.m. start',
          'Walking is welcome',
          'Professional timing with live results',
          'Finisher medal and technical shirt',
          'Free race photography',
        ]}
      />

      {/* ============================================================
          7. Shared eligibility and pricing — §9.7
          Stated ONCE for all four races, which is the whole reason §9
          chose a single page.
          ============================================================ */}
      <Section surface="navy" id="eligibility" className="scroll-mt-28">
        <SectionIntro
          tone="inverse"
          eyebrow="Applies to every distance"
          title="Before you register"
        />

        <div className="mt-12 grid gap-x-16 gap-y-10 lg:grid-cols-2">
          <div>
            <h3 className="font-sans text-base font-bold text-gold">
              Age and eligibility
            </h3>
            <ul className="mt-4 space-y-3">
              {[eligibility.statement, eligibility.minorWaiver].map((line) => (
                <li
                  key={line}
                  className="font-sans text-[0.9375rem] leading-relaxed text-sand/80"
                >
                  {line}
                </li>
              ))}
              <li className="font-sans text-[0.9375rem] leading-relaxed text-sand/80">
                Minor waivers are arranged through{' '}
                <a
                  href={`mailto:${eligibility.minorWaiverContact}`}
                  className="font-semibold text-sand underline underline-offset-4"
                >
                  {eligibility.minorWaiverContact}
                </a>
                .
              </li>
            </ul>

            <h3 className="mt-8 font-sans text-base font-bold text-gold">
              Capacity
            </h3>
            <p className="mt-4 font-sans text-[0.9375rem] leading-relaxed text-sand/80">
              {capacity}
            </p>

            <h3 className="mt-8 font-sans text-base font-bold text-gold">
              Finishing
            </h3>
            <ul className="mt-4 space-y-3">
              {[completion.statement, completion.halfMarathon, ...completion.walkers].map(
                (line) => (
                  <li
                    key={line}
                    className="font-sans text-[0.9375rem] leading-relaxed text-sand/80"
                  >
                    {line}
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-base font-bold text-gold">Pricing</h3>
            <ul className="mt-4 space-y-3">
              <li className="font-sans text-[0.9375rem] leading-relaxed text-sand/80">
                Displayed prices are base prices and exclude the variable
                RunSignUp processing fee. Final pricing is shown at checkout.
              </li>
              <li className="font-sans text-[0.9375rem] leading-relaxed text-sand/80">
                Prices increase after {deadlines.priceIncrease.display}.
              </li>
            </ul>

            <h3 className="mt-8 font-sans text-base font-bold text-gold">
              Refunds and deferrals
            </h3>
            <p className="mt-4 font-sans text-[0.9375rem] leading-relaxed text-sand/80">
              {registrationPolicy.refunds}
            </p>

            <h3 className="mt-8 font-sans text-base font-bold text-gold">
              Changing your distance
            </h3>
            <ul className="mt-4 space-y-3">
              {registrationPolicy.distanceChanges.map((line) => (
                <li
                  key={line}
                  className="font-sans text-[0.9375rem] leading-relaxed text-sand/80"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ============================================================
          8. Final race selector — §9.8
          The four races again, simplified, for immediate conversion.
          ============================================================ */}
      <Section surface="paper">
        <SectionIntro
          align="center"
          eyebrow="Ready?"
          title="Pick your distance"
          lede="You will be taken to RunSignUp to complete your registration."
        />

        <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
          {distances.map((distance) => (
            <li key={distance.slug} className="flex">
              <RaceCardCompact distance={distance} />
            </li>
          ))}
        </ul>

        <p className="measure mx-auto mt-10 text-center font-sans text-sm leading-relaxed text-navy/65">
          {pricingNotice}
        </p>
      </Section>
    </>
  )
}
