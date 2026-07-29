import { runnerBenefits } from '@/content/race'
import { StatusNotice } from '@/components/ui/StatusNotice'
import { cn } from '@/lib/cn'

/**
 * What every runner receives. Brief §7.6.
 *
 * §7.6 asks for real product photography of the medal and shirt "when
 * available". It is not available (client action item 12), so rather than a
 * grey box or a stock medal, these render as a clean typographic list with a
 * single honest notice. §19: no empty modules, no invented content.
 */
export function BenefitList({ className }: { className?: string }) {
  return (
    <div className={className}>
      {/*
        Single column, deliberately. Seven items across two columns always
        leaves an orphan and makes the divider rules disagree between columns,
        because rows size to the tallest item. One column keeps the rhythm even
        and the list scannable, which is what §15 asks of information content.
      */}
      <ul className="border-t border-navy/10">
        {runnerBenefits.map((benefit) => (
          <li
            key={benefit}
            className="flex items-start gap-4 border-b border-navy/10 py-4"
          >
            <span
              aria-hidden="true"
              className="mt-2.5 size-1.5 shrink-0 rounded-full bg-teal"
            />
            <span className="font-sans text-[1.0625rem] leading-snug text-navy">
              {benefit}
            </span>
          </li>
        ))}
      </ul>

      <StatusNotice id="medalAndShirt" className="mt-8" />
    </div>
  )
}
