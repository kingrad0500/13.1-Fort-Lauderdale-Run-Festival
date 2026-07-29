import { event } from '@/content/race'
import { parkingGuidance, raceMorningChecklist } from '@/content/parking'
import { trainingPartner } from '@/content/sponsors'
import { buildMetadata } from '@/lib/metadata'

import { PageHero } from '@/components/ui/PageHero'
import { StickyIndex } from '@/components/ui/StickyIndex'
import { Section, SectionIntro } from '@/components/ui/SectionIntro'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { Button, TextAction } from '@/components/ui/Button'
import { StatusNotice } from '@/components/ui/StatusNotice'
import { ExternalLinkOrNotice } from '@/components/ui/ExternalLink'
import { ParkingList } from '@/components/race/ParkingList'

import heroImage from '@/media/homepage-ftlauderdale2.jpg'

export const metadata = buildMetadata({
  title: 'Plan Your Trip — parking, training and spectator guide | Fort Lauderdale Running Festival',
  description:
    'Parking and directions, training partners, a spectator guide and a race-morning checklist for the Fort Lauderdale Running Festival on November 8, 2026.',
  path: '/plan-your-trip',
})

/**
 * Plan Your Trip — brief §10.
 *
 * ONE hub page with four anchored sections, not four thin pages (§10):
 * "This keeps the initial scope focused and prevents thin pages while hotel and
 * transportation programs remain unavailable." Training, Parking and Spectator
 * content can split out later if they grow.
 *
 * §10.1: the copy welcomes visitors without implying that locals need a travel
 * guide — so this reads as "here is what you need", not "welcome to our city".
 */

const planningSections = [
  { label: 'Explore', href: '#explore' },
  { label: 'Training', href: '#training' },
  { label: 'Parking', href: '#parking' },
  { label: 'Spectators', href: '#spectators' },
  { label: 'Checklist', href: '#checklist' },
]

export default function PlanYourTripPage() {
  return (
    <>
      <PageHero
        image={heroImage}
        alt="Runners along the Fort Lauderdale beachfront with palms and the coastline behind"
        eyebrow="Race weekend planning"
        title="Make A"
        accent="Weekend Of It"
        lede="From training days to race morning, everything you need to enjoy Fort Lauderdale and arrive ready."
        actions={
          <>
            <Button href="#checklist" variant="primary" size="lg">
              Prepare for race day
            </Button>
            <Button href="#explore" variant="inverse" size="lg">
              Explore Fort Lauderdale
            </Button>
          </>
        }
      />

      <StickyIndex sections={planningSections} className="mt-10" />

      {/* ============================================================
          3. Explore Fort Lauderdale — §10.3
          ============================================================ */}
      <Section id="explore" className="scroll-mt-40">
        <SectionIntro
          eyebrow="Explore"
          title={
            <>
              Come for the race,{' '}
              <span className="italic text-blue">stay for the fun.</span>
            </>
          }
          lede="The finish line is two blocks from the beach and a short walk from Las Olas. Whether you are driving ten minutes or flying in, the rest of the weekend is right there."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Fort Lauderdale Beach',
              body: 'Three miles of sand along A1A, which you will have just run.',
            },
            {
              title: 'Las Olas Boulevard',
              body: 'Galleries, restaurants and shopfronts between downtown and the beach.',
            },
            {
              title: 'Waterfront promenades',
              body: 'The Riverwalk and the beachfront path, both flat and easy on tired legs.',
            },
            {
              title: 'Shopping and dining',
              body: 'From beachfront casual to Las Olas evening, without needing a car.',
            },
            {
              title: 'The waterways',
              body: 'Water taxis and canal tours — the city looks different from the water.',
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
            </div>
          ))}
        </div>

        {/*
          §10.3: "Do not recommend specific commercial properties without an
          approved partnership." No hotels are named anywhere on this page.
        */}
        <div className="mt-10 flex flex-wrap gap-3">
          <StatusNotice id="hotels" />
          <StatusNotice id="transportation" />
        </div>
      </Section>

      {/* ============================================================
          4. Training — §10.4
          ============================================================ */}
      <Section surface="paper" id="training" className="scroll-mt-40">
        <SectionIntro
          eyebrow="Training"
          title="Prepare to beat your best"
          lede="However far out you are, a plan beats guessing. Our training partner runs structured programmes for every distance on the schedule."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {[
            {
              id: 'lifeTimeRunPlan' as const,
              title: 'Customized run plan',
              body: 'A structured plan built around your distance, your schedule and your current fitness.',
            },
            {
              id: 'lifeTimeRunCoaching' as const,
              title: 'One-to-one coaching',
              body: 'Direct coaching if you want someone watching your training and adjusting it as you go.',
            },
          ].map((card) => (
            <div
              key={card.id}
              className="flex flex-col rounded-[var(--radius-card)] border border-sand-deep bg-sand/40 p-7"
            >
              <EyebrowLabel>{trainingPartner.name}</EyebrowLabel>
              <h3 className="mt-3 font-display text-2xl font-bold text-navy">
                {card.title}
              </h3>
              <p className="mt-3 font-sans text-[0.9375rem] leading-relaxed text-navy/70">
                {card.body}
              </p>
              <div className="mt-auto pt-6">
                {/*
                  §10.4: "Verify external links before launch. Each external
                  action must clearly identify Life Time Run as the destination."
                  Both URLs are unverified, so these render as honest notices
                  rather than links that might 404 (client action item 8).
                */}
                <ExternalLinkOrNotice id={card.id} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ============================================================
          5. Parking & Directions — §10.5
          ============================================================ */}
      <Section id="parking" className="scroll-mt-40">
        <SectionIntro
          eyebrow="Parking & directions"
          title="Get to the start with time to spare"
          lede="The first wave goes at 6:15 a.m. and race-morning packet pickup closes at 6:00. Give yourself more room than you think you need."
        />

        <ul className="mt-10 flex flex-wrap gap-3">
          {parkingGuidance.map((line) => (
            <li
              key={line}
              className="rounded-[var(--radius-pill)] border border-navy/12 bg-paper px-4 py-2 font-sans text-sm font-semibold text-navy"
            >
              {line}
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <ParkingList />
        </div>

        <div className="mt-10">
          <StatusNotice id="roadClosures" />
        </div>
      </Section>

      {/* ============================================================
          6. Spectator Guide — §10.6
          Gives families a useful role, not just "spectators matter".
          ============================================================ */}
      <Section surface="navy" id="spectators" className="scroll-mt-40">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionIntro
            tone="inverse"
            eyebrow="Spectators"
            title={
              <>
                Cheer them{' '}
                <span className="italic text-gold">to the finish.</span>
              </>
            }
            lede="Being a good spectator at a race with four staggered starts takes a little planning. Here is what actually helps."
          />

          <div className="space-y-6">
            {[
              {
                title: 'Start and finish are the same place',
                body: `${event.venue}, ${event.addressDisplay}. If you only go to one spot, make it here — you will catch every start and every finish.`,
              },
              {
                title: 'Know your runner’s start time',
                body: 'Half Marathon and Relay at 6:15 a.m.; 10K and 5K at 7:00 a.m. Sunrise is around the first start, so bring a light layer.',
              },
              {
                title: 'The festival opens at 7:00 a.m.',
                body: 'Grab a spot near the finish before the 5K field arrives — it gets busy quickly.',
              },
              {
                title: 'Signs and cameras welcome',
                body: 'Stay clear of the course itself and follow race crew directions, especially near the finish chute.',
              },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="font-sans text-base font-bold text-gold">
                  {item.title}
                </h3>
                <p className="mt-2 font-sans text-[0.9375rem] leading-relaxed text-sand/80">
                  {item.body}
                </p>
              </div>
            ))}

            <div className="flex flex-wrap gap-3 pt-2">
              <StatusNotice id="spectatorViewing" />
              <StatusNotice id="runnerTracking" />
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================
          7. Race-morning checklist — §10.7
          ============================================================ */}
      <Section surface="paper" id="checklist" className="scroll-mt-40">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          <SectionIntro
            eyebrow="The night before"
            title="Race-morning checklist"
            lede="Run through this the night before and race morning gets a lot quieter."
          />

          <ul className="border-t border-navy/10">
            {raceMorningChecklist.map((item, i) => (
              <li
                key={item}
                className="flex items-center gap-4 border-b border-navy/10 py-4"
              >
                <span className="font-numeric text-lg text-teal">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-sans text-[1.0625rem] text-navy">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <TextAction href="/race-weekend#packet-pickup">
            Packet pickup details
          </TextAction>
        </div>
      </Section>

      {/* ============================================================
          8. Final action — §10.8
          ============================================================ */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <SectionIntro
            align="center"
            eyebrow="One more thing"
            title="Ready for Fort Lauderdale?"
            lede="Pick your distance, then work backwards from race morning."
          />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button href="/distances" variant="primary" size="lg">
              Choose Your Race
            </Button>
            <Button href="/race-weekend" variant="secondary" size="lg">
              View Race Weekend
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
