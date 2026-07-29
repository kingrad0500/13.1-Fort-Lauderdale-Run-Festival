import { event, deadlines, safety } from '@/content/race'
import {
  pickupLocations,
  pickupRules,
  packetContents,
  timingWarnings,
  bibInstructions,
  timingInstructions,
  raceRuleTopics,
} from '@/content/packet'
import { raceWeekendSections } from '@/content/navigation'
import { buildMetadata } from '@/lib/metadata'

import { RegisterButton } from '@/components/ui/RegisterButton'
import { PageHero } from '@/components/ui/PageHero'
import { StickyIndex } from '@/components/ui/StickyIndex'
import { Section, SectionIntro } from '@/components/ui/SectionIntro'
import { Accordion } from '@/components/ui/Accordion'
import { Button, TextAction } from '@/components/ui/Button'
import { StatusNotice } from '@/components/ui/StatusNotice'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { WeekendTimeline } from '@/components/race/WeekendTimeline'
import { LocationCard } from '@/components/race/LocationCard'

import heroImage from '@/media/sub-pages-ftlauderdale-131-2.jpg'

export const metadata = buildMetadata({
  title: 'Race Weekend — schedule, packet pickup and race rules | Fort Lauderdale Running Festival',
  description:
    'Everything you need for race weekend: the Saturday expo, packet pickup times and locations, bib and timing instructions, race rules, accessibility and the finish-line festival.',
  path: '/race-weekend',
})

/**
 * Race Weekend — brief §8.
 *
 * This is the participant's practical guide. Unlike the emotional homepage it
 * prioritises clarity, preparation and confidence (§8), so the hero is short,
 * the section index is sticky, and nothing here animates.
 */
export default function RaceWeekendPage() {
  return (
    <>
      {/* 1. Compact hero — §8.1. Essential facts stay visible. */}
      <PageHero
        image={heroImage}
        alt="Runners and spectators along the Fort Lauderdale beachfront on race morning"
        eyebrow="Your race guide"
        title="Race The Coast."
        accent="Celebrate By The Sea."
        lede="Start near Fort Lauderdale Beach, run through Las Olas, Harbor Beach and A1A, then finish where the celebration begins."
        facts={[
          { label: 'Date', value: 'Sunday, November 8, 2026' },
          { label: 'Start & finish', value: event.venue },
          { label: 'First start', value: '6:15 a.m.' },
          { label: 'Course support ends', value: deadlines.courseSupportEnds },
        ]}
      />

      {/* 2. Sticky page index — §8.2.
          NOT wrapped in a spacing div: `position: sticky` is confined to its
          parent's box, so a wrapper only as tall as the bar itself makes it
          scroll away instantly. Its parent must span the scroll region, so the
          top margin lives on the component root instead. */}
      <StickyIndex sections={raceWeekendSections} className="mt-10" />

      {/* 3. Weekend timeline — §8.3. Static, no animation. */}
      <Section id="schedule" className="scroll-mt-40">
        <SectionIntro
          eyebrow="Schedule"
          title="The weekend, hour by hour"
          lede="Packet pickup on Saturday, racing on Sunday. Times are Eastern."
        />
        <div className="mt-12">
          <WeekendTimeline />
        </div>
      </Section>

      {/* 4. Packet pickup — §8.4 */}
      <Section surface="paper" id="packet-pickup" className="scroll-mt-40">
        <SectionIntro
          eyebrow="Packet pickup"
          title="Collect your packet first"
          lede="Every participant must pick up a packet to take part. Saturday is strongly recommended — race-morning pickup closes at 6:00 a.m. sharp."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {pickupLocations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>

        <div className="mt-12">
          <EyebrowLabel>Before you go</EyebrowLabel>
          <ul className="mt-5 max-w-3xl border-t border-navy/10">
            {pickupRules.map((rule) => (
              <li
                key={rule}
                className="flex items-start gap-4 border-b border-navy/10 py-4"
              >
                <span
                  aria-hidden="true"
                  className="mt-2.5 size-1.5 shrink-0 rounded-full bg-teal"
                />
                <span className="font-sans text-[1.0625rem] leading-snug text-navy">
                  {rule}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 5. What is in your packet — §8.5. Scannable, not another text card. */}
      <Section id="your-packet" className="scroll-mt-40">
        <SectionIntro
          eyebrow="Your packet"
          title="What's inside"
        />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {packetContents.map((item, i) => (
            <li
              key={item.title}
              className="rounded-[var(--radius-card)] bg-paper p-6 shadow-[var(--shadow-card)]"
            >
              <p className="font-numeric text-3xl leading-none text-teal">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-4 font-sans text-base font-bold leading-snug text-navy">
                {item.title}
              </h3>
              <p className="mt-2 font-sans text-[0.9375rem] leading-relaxed text-navy/70">
                {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 6. Bib and timing — §8.6
          The three warnings stay VISIBLE, outside the collapsed detail. */}
      <Section surface="paper" id="bib-timing" className="scroll-mt-40">
        <SectionIntro
          eyebrow="Bib & timing"
          title="Wear it right, get your time"
        />

        <div className="mt-10 rounded-[var(--radius-card)] border-2 border-coral/40 bg-coral/8 p-7">
          <h3 className="font-sans text-base font-bold text-navy">
            Three things that will cost you an official time
          </h3>
          <ul className="mt-4 space-y-2.5">
            {timingWarnings.map((warning) => (
              <li
                key={warning}
                className="flex items-start gap-3 font-sans text-[1.0625rem] font-semibold leading-snug text-navy"
              >
                <span aria-hidden="true" className="mt-0.5 shrink-0">
                  ✕
                </span>
                {warning}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 max-w-4xl border-t border-navy/12">
          <Accordion
            group="bib-timing"
            question="How to wear and complete your bib"
          >
            <ul className="space-y-2.5">
              {bibInstructions.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Accordion>

          <Accordion group="bib-timing" question="How ChronoTrack timing works">
            <ul className="space-y-2.5">
              {timingInstructions.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </Accordion>
        </div>
      </Section>

      {/* 7. Race rules and safety — §8.7, organised by topic */}
      <Section id="race-rules" className="scroll-mt-40">
        <SectionIntro
          eyebrow="Rules & safety"
          title="How the course runs"
          lede="Organised by topic so you can find the one thing you need."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-10">
            {raceRuleTopics.map((topic) => (
              <div key={topic.id}>
                <h3 className="font-sans text-base font-bold text-navy">
                  {topic.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {topic.rules.map((rule) => (
                    <li
                      key={rule}
                      className="flex items-start gap-3 font-sans text-[0.9375rem] leading-relaxed text-navy/75"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-teal"
                      />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="space-y-8">
            <div className="rounded-[var(--radius-card)] bg-paper p-7 shadow-[var(--shadow-card)]">
              <h3 className="font-sans text-base font-bold text-navy">
                Road closures
              </h3>
              <p className="mt-3 font-sans text-[0.9375rem] leading-relaxed text-navy/75">
                {safety.roadClosures}
              </p>
              <div className="mt-5">
                <StatusNotice id="roadClosures" />
              </div>
            </div>

            <div className="rounded-[var(--radius-card)] bg-paper p-7 shadow-[var(--shadow-card)]">
              <h3 className="font-sans text-base font-bold text-navy">
                Aid stations and medical support
              </h3>
              <div className="mt-5 space-y-3">
                <StatusNotice id="aidStations" />
                <StatusNotice id="medicalSupport" />
              </div>
            </div>

            <div className="rounded-[var(--radius-card)] bg-paper p-7 shadow-[var(--shadow-card)]">
              <h3 className="font-sans text-base font-bold text-navy">
                Headphones, equipment and animals
              </h3>
              <div className="mt-5 space-y-3">
                <StatusNotice id="headphonePolicy" />
                <StatusNotice id="prohibitedEquipment" />
              </div>
            </div>

            <div className="rounded-[var(--radius-card)] bg-paper p-7 shadow-[var(--shadow-card)]">
              <h3 className="font-sans text-base font-bold text-navy">
                Severe weather
              </h3>
              <p className="mt-3 font-sans text-[0.9375rem] leading-relaxed text-navy/75">
                {safety.severeWeather}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 8. Accessibility — §8.8
          Respectful and concise. §8.8 warns specifically against pairing a
          large promotional image with a long legal paragraph, so there is no
          image here at all — just the policy and a way to ask questions. */}
      <Section surface="navy" id="accessibility" className="scroll-mt-40">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionIntro
            tone="inverse"
            eyebrow="Accessibility"
            title="Everyone on the course"
            lede="Athletes using wheelchairs are welcome at the Fort Lauderdale Running Festival."
          />

          <div>
            <ul className="space-y-3">
              {safety.wheelchair.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 font-sans text-[1.0625rem] leading-relaxed text-sand/85"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold"
                  />
                  {line}
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-[var(--radius-card)] bg-white/[0.06] p-6">
              <h3 className="font-sans text-base font-bold text-gold">
                Questions about accommodations?
              </h3>
              <p className="mt-3 font-sans text-[0.9375rem] leading-relaxed text-sand/80">
                Contact the race team and we will help you plan your race
                morning.
              </p>
              <a
                href={`mailto:${event.contactEmail}`}
                className="mt-3 inline-flex min-h-[44px] items-center font-sans text-[0.9375rem] font-bold text-sand underline underline-offset-4"
              >
                {event.contactEmail}
              </a>
              <div className="mt-5">
                <StatusNotice id="accessibilityContact" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 9. Finish-line festival — §8.9. Ends the operational page with energy. */}
      <Section id="festival" className="scroll-mt-40">
        <SectionIntro
          eyebrow="Finish-line festival"
          title={
            <>
              Then the <span className="italic text-blue">good part.</span>
            </>
          }
          lede="The festival opens at 7:00 a.m. on the sand. Food, medals, music, and everyone who came to watch you."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Awards',
              body: 'Awards for top finishers across the four races.',
              pending: 'awardsCategories' as const,
            },
            {
              title: 'Food',
              body: 'Post-race food at the finish-line festival.',
              pending: 'participantFood' as const,
            },
            {
              title: 'A cold one',
              body: 'Complimentary beer for participants 21+ with valid identification and a wristband from your packet.',
              pending: null,
            },
            {
              title: 'Friends and family',
              body: 'Spectators are welcome at the festival. Bring them.',
              pending: null,
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[var(--radius-card)] bg-paper p-6 shadow-[var(--shadow-card)]"
            >
              <h3 className="font-sans text-base font-bold text-navy">
                {item.title}
              </h3>
              <p className="mt-2 font-sans text-[0.9375rem] leading-relaxed text-navy/70">
                {item.body}
              </p>
              {item.pending && (
                <div className="mt-4">
                  <StatusNotice id={item.pending} tone="inline" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10">
          <TextAction href="/plan-your-trip#spectators">
            Spectator guide
          </TextAction>
        </div>

        {/* Final actions — §8.9 */}
        <div className="mt-16 flex flex-wrap items-center gap-3 border-t border-navy/10 pt-12">
          <Button href="/distances" variant="secondary" size="lg">
            Choose Your Race
          </Button>
          <RegisterButton source="race-weekend" size="lg" />
        </div>
      </Section>
    </>
  )
}
