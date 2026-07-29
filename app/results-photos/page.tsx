import { buildMetadata } from '@/lib/metadata'
import { getEventMode } from '@/lib/event-status'
import { resolveLink } from '@/content/links'

import { PageHero } from '@/components/ui/PageHero'
import { Section, SectionIntro } from '@/components/ui/SectionIntro'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { Button, TextAction } from '@/components/ui/Button'
import { InlineNotice } from '@/components/ui/StatusNotice'
import { ExternalLinkOrNotice } from '@/components/ui/ExternalLink'

import heroImage from '@/media/sub-pages-ftlauderdale-131.jpg'

export const metadata = buildMetadata({
  title: 'Results & Photos | Fort Lauderdale Running Festival',
  description:
    'Race results and photography for the Fort Lauderdale Running Festival, plus the archive of previous years.',
  path: '/results-photos',
})

/**
 * Results & Photos — brief §11.
 *
 * The most lifecycle-dependent page on the site. §11 defines three different
 * content sets — before race day, on race day, and after — and this renders
 * whichever the current mode calls for, resolved server-side so there is no
 * flash of the wrong state.
 *
 * §11.2 is emphatic: "Do not show empty or inactive 2026 links." Before the
 * race, the 2026 entries are status notices, NOT disabled buttons.
 *
 * §11.4: "Do not copy or host result data unless a provider later supplies an
 * approved integration." Everything here links out; nothing is mirrored.
 *
 * Providers are not yet confirmed (client action items 14), so the live-results
 * and photo links currently degrade to honest notices via content/links.ts.
 */

/** Brief §11.5: organise past events by year, not a wall of unrelated links. */
const archive = [
  { year: '2026', current: true },
  { year: '2025', current: false },
  { year: '2024', current: false },
  { year: 'Earlier events', current: false },
]

export default function ResultsPhotosPage() {
  const mode = getEventMode()
  const liveResults = resolveLink('liveResults')

  const isRaceDay = mode === 'race-day'
  const isAfter = mode === 'post-race'
  const isBefore = mode === 'registration' || mode === 'race-week'

  return (
    <>
      <PageHero
        image={heroImage}
        alt="Runners approaching the finish on the Fort Lauderdale course"
        eyebrow="Results & photos"
        title="Every Finish"
        accent="Tells A Story"
        lede="Find race results, relive the finish line, and celebrate every mile."
      />

      {/* ============================================================
          Race day — §11.3. One primary action.
          ============================================================ */}
      {isRaceDay && (
        <Section>
          <div className="mx-auto max-w-3xl text-center">
            <SectionIntro
              align="center"
              eyebrow="Live now"
              title="Results are live"
              lede="Times update as runners cross the mats."
            />
            <div className="mt-10 flex flex-col items-center gap-4">
              {liveResults ? (
                <Button
                  href={liveResults.url!}
                  newTab
                  variant="primary"
                  size="lg"
                  data-analytics="live_results_click"
                >
                  View Live Results
                </Button>
              ) : (
                <InlineNotice>
                  Live results will be linked here as soon as the timing
                  provider is live.
                </InlineNotice>
              )}
              <ExternalLinkOrNotice id="liveResults">
                Find a participant
              </ExternalLinkOrNotice>
            </div>
          </div>
        </Section>
      )}

      {/* ============================================================
          Before race day — §11.2
          ============================================================ */}
      {isBefore && (
        <Section>
          <SectionIntro
            eyebrow="This year"
            title="2026 results and photography"
            lede="Nothing to show yet — the race is still ahead of us. Both will be published here once they are available."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <InlineNotice>
              2026 results will appear here after the race
            </InlineNotice>
            <InlineNotice>
              2026 race photography will be published when available
            </InlineNotice>
          </div>
        </Section>
      )}

      {/* ============================================================
          After race day — §11.4. Two prominent cards.
          ============================================================ */}
      {isAfter && (
        <Section>
          <SectionIntro
            eyebrow="2026"
            title="Results and photography"
            lede="Both are hosted by our timing and photography partners."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[var(--radius-card)] bg-paper p-8 shadow-[var(--shadow-card)]">
              <EyebrowLabel>Results</EyebrowLabel>
              <h3 className="mt-3 font-display text-2xl font-bold text-navy">
                2026 official results
              </h3>
              <p className="mt-3 font-sans text-[0.9375rem] leading-relaxed text-navy/70">
                Search by name or bib number across all four races.
              </p>
              <div className="mt-6">
                <ExternalLinkOrNotice id="liveResults">
                  View 2026 results
                </ExternalLinkOrNotice>
              </div>
            </div>

            <div className="rounded-[var(--radius-card)] bg-paper p-8 shadow-[var(--shadow-card)]">
              <EyebrowLabel>Photos</EyebrowLabel>
              <h3 className="mt-3 font-display text-2xl font-bold text-navy">
                2026 race photography
              </h3>
              <p className="mt-3 font-sans text-[0.9375rem] leading-relaxed text-navy/70">
                Free race photography for every participant.
              </p>
              <div className="mt-6">
                <ExternalLinkOrNotice id="racePhotos">
                  Find your photos
                </ExternalLinkOrNotice>
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* ============================================================
          Archive — §11.5. By year, not a link dump.
          ============================================================ */}
      <Section surface="paper">
        <SectionIntro
          eyebrow="Archive"
          title="Previous years"
          lede="Results and galleries from earlier Fort Lauderdale Running Festivals."
        />

        <ul className="mt-12 border-t border-navy/12">
          {archive.map((row) => {
            // The current year only belongs in the archive once the race is run.
            if (row.current && !isAfter) return null
            return (
              <li
                key={row.year}
                className="flex flex-wrap items-center justify-between gap-4 border-b border-navy/12 py-6"
              >
                <span className="font-numeric text-2xl text-navy">
                  {row.year}
                </span>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
                  <ExternalLinkOrNotice id="liveResults">
                    Results
                  </ExternalLinkOrNotice>
                  <ExternalLinkOrNotice id="racePhotos">
                    Photos
                  </ExternalLinkOrNotice>
                </div>
              </li>
            )
          })}
        </ul>

        <p className="mt-8 font-sans text-sm leading-relaxed text-navy/60">
          Results and photography are hosted by external providers. Links open
          in a new tab.
        </p>
      </Section>

      {/* ============================================================
          Emotional closing — §11.6
          ============================================================ */}
      <Section surface="navy">
        <div className="mx-auto max-w-3xl text-center">
          <SectionIntro
            align="center"
            tone="inverse"
            eyebrow="Race day"
            title={
              <>
                You earned the finish.{' '}
                <span className="italic text-gold">Now relive it.</span>
              </>
            }
          />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ExternalLinkOrNotice
              id="liveResults"
              className="text-sand decoration-sand/40 hover:decoration-sand"
            >
              View Results
            </ExternalLinkOrNotice>
            <ExternalLinkOrNotice
              id="racePhotos"
              className="text-sand decoration-sand/40 hover:decoration-sand"
            >
              Find Your Photos
            </ExternalLinkOrNotice>
          </div>

          <div className="mt-10">
            <TextAction href="/distances" className="text-gold">
              Race with us in 2026
            </TextAction>
          </div>
        </div>
      </Section>
    </>
  )
}
