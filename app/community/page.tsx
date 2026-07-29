import { event } from '@/content/race'
import {
  groupTypes,
  volunteerContacts,
  volunteerHashtag,
} from '@/content/sponsors'
import { buildMetadata } from '@/lib/metadata'

import { PageHero } from '@/components/ui/PageHero'
import { StickyIndex } from '@/components/ui/StickyIndex'
import { Section, SectionIntro } from '@/components/ui/SectionIntro'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { Button } from '@/components/ui/Button'
import { RegisterButton } from '@/components/ui/RegisterButton'
import { StatusNotice } from '@/components/ui/StatusNotice'
import { ExternalLinkOrNotice } from '@/components/ui/ExternalLink'
import { SponsorWall } from '@/components/race/SponsorWall'

import heroImage from '@/media/homepage-ftlauderdale.jpg'

export const metadata = buildMetadata({
  title: 'Community — partners, teams, charities and volunteers | Fort Lauderdale Running Festival',
  description:
    'Meet the partners, teams, volunteers and local community behind the Fort Lauderdale Running Festival, and find out how to join in.',
  path: '/community',
})

/**
 * Community — brief §12.
 *
 * Partners, Teams, Charities, Volunteer and Sponsorship are combined into ONE
 * hub (§12): "This preserves all content while preventing secondary
 * organizational pages from competing with race registration."
 *
 * §12.5 is explicit that charities must not be invented, and §12.6 requires
 * volunteer contacts be verified before publication — both are handled through
 * content/pending.ts and the unverified flags in content/sponsors.ts.
 */

const communitySections = [
  { label: 'Partners', href: '#partners' },
  { label: 'Teams & Groups', href: '#teams' },
  { label: 'Charities', href: '#charities' },
  { label: 'Volunteer', href: '#volunteer' },
  { label: 'Sponsorship', href: '#sponsorship' },
]

export default function CommunityPage() {
  return (
    <>
      <PageHero
        image={heroImage}
        alt="The race field on A1A in Fort Lauderdale, runners of all kinds together on the road"
        eyebrow="Community"
        title="Racing Is"
        accent="Better Together"
        lede="Meet the partners, teams, volunteers and local community that bring Fort Lauderdale's race weekend to life."
        actions={
          <>
            <Button href="#teams" variant="primary" size="lg">
              Join a team
            </Button>
            <Button href="#volunteer" variant="inverse" size="lg">
              Volunteer
            </Button>
          </>
        }
      />

      <StickyIndex sections={communitySections} className="mt-10" />

      {/* ============================================================
          3. Partners — §12.3, by confirmed hierarchy
          ============================================================ */}
      <Section id="partners" className="scroll-mt-40">
        <SectionIntro
          eyebrow="Partners"
          title="The people behind the race"
          lede="A 20th running takes more than a start line. These organisations make race weekend possible."
        />
        <SponsorWall logos className="mt-12" />
      </Section>

      {/* ============================================================
          4. Teams and groups — §12.4
          ============================================================ */}
      <Section surface="paper" id="teams" className="scroll-mt-40">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionIntro
            eyebrow="Teams & groups"
            title="Bring your people"
            lede="Races are better with company. Run clubs, offices, families and friend groups all show up together — and the relay exists precisely for pairs."
          />

          <div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {groupTypes.map((type) => (
                <li
                  key={type}
                  className="rounded-[var(--radius-card)] border border-sand-deep bg-sand/40 px-5 py-4 font-sans text-[0.9375rem] font-semibold text-navy"
                >
                  {type}
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-4">
              {/* §12.4: include a team registration action "when the correct
                  destination link is available" — it is not yet, so this
                  degrades to a notice rather than a guess. */}
              <ExternalLinkOrNotice id="teamRegistration" />
              <p className="font-sans text-[0.9375rem] leading-relaxed text-navy/70">
                In the meantime, everyone in your group can register
                individually and line up together on the morning.
              </p>
              <RegisterButton source="final-section" />
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================
          5. Charities — §12.5
          "Do not invent participating charities or donation arrangements."
          ============================================================ */}
      <Section id="charities" className="scroll-mt-40">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <SectionIntro
            eyebrow="Charities"
            title="Race for a cause"
            lede="Plenty of runners line up for a reason bigger than a finish time."
          />
          <div className="self-center">
            <StatusNotice id="charities" />
            <p className="measure mt-5 font-sans text-[0.9375rem] leading-relaxed text-navy/70">
              If your organisation is interested in becoming a 2026 charity
              partner, get in touch with the race team.
            </p>
            <a
              href={`mailto:${event.contactEmail}`}
              className="mt-3 inline-flex min-h-[44px] items-center font-sans text-[0.9375rem] font-bold text-blue underline underline-offset-4"
            >
              {event.contactEmail}
            </a>
          </div>
        </div>
      </Section>

      {/* ============================================================
          6. Volunteer — §12.6, structured rather than one long paragraph
          ============================================================ */}
      <Section surface="navy" id="volunteer" className="scroll-mt-40">
        <SectionIntro
          tone="inverse"
          eyebrow="Volunteer"
          title={
            <>
              The race does not happen{' '}
              <span className="italic text-gold">without you.</span>
            </>
          }
          lede="Every water cup, every course marshal, every finisher medal placed around a neck — that is volunteers."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-12">
          <div>
            <h3 className="font-sans text-base font-bold text-gold">
              Who can volunteer
            </h3>
            <ul className="mt-4 space-y-2.5">
              {[
                'Individuals and groups are both welcome.',
                'Clubs, teams, schools and workplaces often volunteer together.',
                'No running experience required.',
              ].map((line) => (
                <li
                  key={line}
                  className="font-sans text-[0.9375rem] leading-relaxed text-sand/80"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-base font-bold text-gold">
              What volunteers get
            </h3>
            <ul className="mt-4 space-y-2.5">
              {[
                'A front-row view of the best part of race morning.',
                'The finish line, from the other side of it.',
                'Our genuine thanks — and the festival afterwards.',
              ].map((line) => (
                <li
                  key={line}
                  className="font-sans text-[0.9375rem] leading-relaxed text-sand/80"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-base font-bold text-gold">
              Race-day roles
            </h3>
            <div className="mt-4">
              <StatusNotice id="volunteerRoles" />
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-[var(--radius-card)] bg-white/[0.06] p-7">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <h3 className="font-sans text-base font-bold text-gold">
                Get in touch
              </h3>
              {/*
                §12.6: "Verify coordinator names and email addresses before
                publication." Both are flagged unverified in content/sponsors.ts,
                so they are shown as names with addresses rather than as live
                mailto links that might bounce.
              */}
              <ul className="mt-4 space-y-2">
                {volunteerContacts.map((contact) => (
                  <li
                    key={contact.email}
                    className="font-sans text-[0.9375rem] text-sand/80"
                  >
                    <span className="font-semibold text-sand">
                      {contact.name}
                    </span>{' '}
                    — {contact.email}
                    {!contact.verified && (
                      <span className="ml-2 text-sand/50">(being confirmed)</span>
                    )}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-sans text-[0.9375rem] text-sand/70">
                Share your morning with{' '}
                <span className="font-semibold text-gold">
                  {volunteerHashtag}
                </span>
              </p>
            </div>

            <div>
              <ExternalLinkOrNotice
                id="volunteerRegistration"
                className="text-sand decoration-sand/40 hover:decoration-sand"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================
          7. Sponsorship — §12.7
          Kept visually and contextually separate from participant registration.
          ============================================================ */}
      <Section surface="paper" id="sponsorship" className="scroll-mt-40">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <SectionIntro
            eyebrow="Sponsorship"
            title="Interested in becoming a sponsor?"
            lede="The Fort Lauderdale Running Festival reaches thousands of participants and spectators across race weekend, from local families to runners travelling in for the event."
          />

          <div className="rounded-[var(--radius-card)] border border-sand-deep bg-sand/40 p-7">
            <p className="font-sans text-[0.9375rem] leading-relaxed text-navy/75">
              We work with local, national and international organisations
              across a range of partnership levels — from course and aid-station
              presence to festival activations and title partnerships.
            </p>
            <a
              href={`mailto:${event.contactEmail}?subject=Sponsorship%20enquiry`}
              className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-[var(--radius-pill)] border-2 border-navy px-6 font-sans text-[0.9375rem] font-bold text-navy transition-colors hover:bg-navy hover:text-sand"
            >
              Enquire about sponsorship
            </a>
          </div>
        </div>
      </Section>

      {/* ============================================================
          9. Closing actions — §12.9
          ============================================================ */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <SectionIntro
            align="center"
            eyebrow="Join in"
            title="Find your place in the festival"
          />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <RegisterButton source="final-section" size="lg">
              Register to Race
            </RegisterButton>
            <Button href="#teams" variant="secondary" size="lg">
              Join or Create a Team
            </Button>
            <Button href="#volunteer" variant="secondary" size="lg">
              Volunteer
            </Button>
            <Button href="#sponsorship" variant="secondary" size="lg">
              Become a Sponsor
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
