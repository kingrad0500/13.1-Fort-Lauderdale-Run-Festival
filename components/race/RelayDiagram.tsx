import { relayLegs, relayExchange, relayBatonRule } from '@/content/relay'
import { cn } from '@/lib/cn'

/**
 * Two-leg relay diagram. Brief §9.4 and §16.
 *
 * §16: "Relay diagrams provide equivalent text descriptions." This is built as
 * an ordered list with real text rather than an image or an SVG-only graphic,
 * so the diagram IS the text equivalent — a screen reader gets leg order,
 * distances, the exchange point and the baton rule in sequence, with no
 * separate alt-text summary to drift out of sync.
 *
 * The connecting rail is decorative and hidden from assistive technology.
 */
export function RelayDiagram({ tone = 'inverse' }: { tone?: 'ink' | 'inverse' }) {
  const inverse = tone === 'inverse'

  return (
    <div>
      <ol className="relative grid gap-6 sm:grid-cols-2 sm:gap-8">
        {/* Decorative rail linking the two legs on desktop. */}
        <div
          aria-hidden="true"
          className={cn(
            'absolute left-1/2 top-12 hidden h-px w-16 -translate-x-1/2 sm:block',
            inverse ? 'bg-sand/30' : 'bg-navy/20',
          )}
        />

        {relayLegs.map((leg, i) => (
          <li
            key={leg.member}
            className={cn(
              'rounded-[var(--radius-card)] p-6 sm:p-7',
              inverse
                ? 'border border-white/12 bg-white/[0.04]'
                : 'border border-sand-deep bg-paper',
            )}
          >
            <p
              className={cn(
                'eyebrow',
                inverse ? 'text-gold' : 'text-blue',
              )}
            >
              Leg {i + 1}
            </p>

            <p
              className={cn(
                'mt-3 font-numeric text-4xl leading-none',
                inverse ? 'text-sand' : 'text-navy',
              )}
            >
              {leg.distance}
            </p>

            <h3
              className={cn(
                'mt-3 font-sans text-base font-bold',
                inverse ? 'text-sand' : 'text-navy',
              )}
            >
              {leg.member}
            </h3>

            <p
              className={cn(
                'mt-1 font-numeric text-sm',
                inverse ? 'text-teal' : 'text-blue',
              )}
            >
              {leg.start}
            </p>

            <p
              className={cn(
                'mt-3 font-sans text-[0.9375rem] leading-relaxed',
                inverse ? 'text-sand/75' : 'text-navy/75',
              )}
            >
              {leg.detail}
            </p>
          </li>
        ))}
      </ol>

      <div
        className={cn(
          'mt-6 rounded-[var(--radius-card)] px-6 py-5',
          inverse ? 'bg-white/[0.06]' : 'bg-sand-dark/60',
        )}
      >
        <p
          className={cn(
            'font-sans text-[0.9375rem] font-bold',
            inverse ? 'text-sand' : 'text-navy',
          )}
        >
          {relayBatonRule}
        </p>
        <p
          className={cn(
            'mt-1 font-sans text-[0.9375rem]',
            inverse ? 'text-sand/75' : 'text-navy/70',
          )}
        >
          Exchange point: {relayExchange}.
        </p>
      </div>
    </div>
  )
}
