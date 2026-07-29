import { distances, formatPrice } from '@/content/race'
import { registrationUrl } from '@/content/links'
import { analyticsAttrs } from '@/lib/analytics'
import { RegisterButton } from '@/components/ui/RegisterButton'

/**
 * Distance comparison. Brief §9.2 and §16.
 *
 * §16: "Comparison tables become accessible stacked rows when necessary."
 *
 * Implemented as TWO renderings rather than one table restyled with CSS.
 * Changing a table's `display` to stack it breaks the row/column relationships
 * some screen readers rely on, and `::before` pseudo-content labels are not
 * reliably announced. Tailwind's `hidden` sets `display: none`, which removes
 * the inactive rendering from the accessibility tree entirely, so exactly one
 * is ever exposed. The duplication is a few lines of markup; the correctness is
 * worth more.
 *
 * Every value is read from content/race.ts (§19) — nothing retyped.
 *
 * Wide row actions are TEXT actions, not coral buttons. §15: "Do not use coral
 * buttons for every action." This page already carries coral CTAs on the four
 * race cards and the four distance panels; making the table rows coral too
 * would put sixteen identical buttons on one page and flatten the hierarchy the
 * brief asks for. The table is a comparison surface — people decide here and
 * commit in a card or section.
 *
 * The narrow rendering DOES keep a coral button, deliberately. Stacked on a
 * phone each row is a self-contained decision unit with no competing CTA in
 * view, and §16 wants a comfortable touch target rather than an inline link.
 */
export function ComparisonTable() {
  return (
    <>
      {/* --- Wide: a real table with proper headers --- */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            Comparison of the four races: distance, start time and base price.
          </caption>
          <thead>
            <tr className="border-b-2 border-navy/15">
              <th scope="col" className="eyebrow py-4 pr-4 text-navy/55">
                Event
              </th>
              <th scope="col" className="eyebrow py-4 pr-4 text-navy/55">
                Distance
              </th>
              <th scope="col" className="eyebrow py-4 pr-4 text-navy/55">
                Start
              </th>
              <th scope="col" className="eyebrow py-4 pr-4 text-navy/55">
                Base price
              </th>
              <th scope="col" className="py-4">
                <span className="sr-only">Register</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {distances.map((d) => (
              <tr key={d.slug} className="border-b border-navy/10">
                <th
                  scope="row"
                  className="py-5 pr-4 font-sans text-base font-bold text-navy"
                >
                  {d.name}
                </th>
                <td className="py-5 pr-4 font-numeric text-lg text-navy/80">
                  {d.distance}
                </td>
                <td className="py-5 pr-4 font-numeric text-lg text-navy/80">
                  {d.startTime}
                </td>
                <td className="py-5 pr-4 font-numeric text-lg text-navy">
                  {formatPrice(d)}
                </td>
                <td className="py-5 text-right">
                  <a
                    href={registrationUrl('comparison-table', d.slug)}
                    data-register-cta=""
                    {...analyticsAttrs({
                      name: 'registration_click',
                      source: 'comparison-table',
                      distance: d.slug,
                    })}
                    className="group inline-flex min-h-[44px] items-center gap-1.5 font-sans text-sm font-bold text-blue underline underline-offset-4 decoration-blue/40 hover:decoration-blue"
                  >
                    Register
                    <span className="sr-only"> for the {d.name}</span>
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Narrow: stacked rows, each race a self-contained block --- */}
      <ul className="md:hidden">
        {distances.map((d) => (
          <li key={d.slug} className="border-b border-navy/10 py-6 first:border-t">
            <h3 className="font-sans text-base font-bold text-navy">{d.name}</h3>

            <dl className="mt-3 grid grid-cols-3 gap-3">
              <div>
                <dt className="eyebrow text-navy/50">Distance</dt>
                <dd className="mt-1 font-numeric text-base text-navy/80">
                  {d.distance}
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-navy/50">Start</dt>
                <dd className="mt-1 font-numeric text-base text-navy/80">
                  {d.startTime}
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-navy/50">Base price</dt>
                <dd className="mt-1 font-numeric text-base text-navy">
                  ${d.basePrice}
                  {d.priceBasis === 'team' && (
                    <span className="font-sans text-xs text-navy/60"> /team</span>
                  )}
                </dd>
              </div>
            </dl>

            <RegisterButton
              source="comparison-table"
              distance={d.slug}
              block
              className="mt-4"
              srSuffix={`for the ${d.name}`}
            >
              Register
            </RegisterButton>
          </li>
        ))}
      </ul>
    </>
  )
}
