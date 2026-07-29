import { faqCategories, popularQuestions } from '@/content/faq'
import { event } from '@/content/race'
import { buildMetadata } from '@/lib/metadata'

import { PageHero } from '@/components/ui/PageHero'
import { Section, SectionIntro } from '@/components/ui/SectionIntro'
import { EyebrowLabel } from '@/components/ui/EyebrowLabel'
import { Button } from '@/components/ui/Button'
import { RegisterButton } from '@/components/ui/RegisterButton'
import { FaqSearch } from '@/components/race/FaqSearch'

import heroImage from '@/media/sub-pages-ftlauderdale-131-3.jpg'

export const metadata = buildMetadata({
  title: 'FAQ — registration, race day, course rules | Fort Lauderdale Running Festival',
  description:
    'Quick answers about registration, start times, packet pickup, walking, course rules, parking and the finish-line festival for the Fort Lauderdale Running Festival.',
  path: '/faq',
})

/**
 * FAQ — brief §13.
 *
 * §13 frames this as "a fast support tool rather than one long uninterrupted
 * accordion", so: search first, the six most-needed questions next, then
 * categories.
 *
 * §13 also forbids the FAQ becoming a second, conflicting source for
 * operational information. Every factual answer is interpolated from
 * content/race.ts in content/faq.ts rather than retyped, and answers link out
 * to the page that owns the subject.
 */
export default function FaqPage() {
  const popular = popularQuestions()

  return (
    <>
      <PageHero
        image={heroImage}
        alt="Runners on the Fort Lauderdale course with the coastline behind them"
        eyebrow="Support"
        title="Everything You"
        accent="Need To Know"
        lede="Quick answers for registration, race day, course rules and the finish-line festival."
      />

      {/* Popular questions — §13.2. Each links directly to its answer. */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <EyebrowLabel>Start here</EyebrowLabel>
          <h2 className="mt-3 font-display text-2xl font-bold text-navy sm:text-3xl">
            Most asked
          </h2>
        </div>

        <ul className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2">
          {popular.map((q) => (
            <li key={q.id}>
              <a
                href={`#${q.id}`}
                className="group flex min-h-[56px] items-center justify-between gap-4 rounded-[var(--radius-card)] border border-sand-deep bg-paper px-5 py-4 transition-shadow hover:shadow-[var(--shadow-card)]"
              >
                <span className="font-sans text-[0.9375rem] font-semibold leading-snug text-navy">
                  {q.question}
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 font-sans text-blue transition-transform duration-200 group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      {/* Search + all categories — §13.1, §13.3–§13.7 */}
      <Section surface="paper" id="all-questions" className="scroll-mt-40">
        <FaqSearch categories={faqCategories} />
      </Section>

      {/* Contact and feedback — §13.8 */}
      <Section surface="navy">
        <div className="mx-auto max-w-3xl text-center">
          <SectionIntro
            align="center"
            tone="inverse"
            eyebrow="Still stuck?"
            title="Still have a question?"
            lede="If the answer isn't here, the race team would rather hear from you than have you guess."
          />

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${event.contactEmail}`}
              className="inline-flex min-h-[52px] items-center justify-center rounded-[var(--radius-pill)] bg-coral px-8 font-sans text-base font-bold text-navy transition-colors hover:bg-coral-dark"
            >
              Email the race team
            </a>
            <Button href="/race-weekend" variant="inverse" size="lg">
              Race weekend guide
            </Button>
          </div>

          <p className="mt-8 font-sans text-sm text-sand/70">
            Registration questions can also be handled through{' '}
            <RegisterButton
              source="faq"
              variant="inline"
              className="font-semibold text-sand"
            >
              RunSignUp
            </RegisterButton>
            , which manages checkout and participant accounts.
          </p>
        </div>
      </Section>
    </>
  )
}
