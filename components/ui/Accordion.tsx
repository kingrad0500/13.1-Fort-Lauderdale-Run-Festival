import { cn } from '@/lib/cn'

/**
 * Disclosure built on native <details>/<summary>. Brief §8.6, §13, §19.
 *
 * WHY NATIVE, not a JS-driven accordion:
 *  - §19 requires policies to stay accessible when JavaScript is unavailable.
 *    A <details> element opens without a single line of script.
 *  - Keyboard operation, focus order and screen-reader semantics are supplied
 *    by the browser and cannot drift out of sync with the visuals.
 *  - Browser find-in-page can open a closed <details> in modern engines, which
 *    a div-based accordion silently defeats.
 *
 * §13 wants "only one answer open at a time". The `name` attribute makes a
 * group of <details> mutually exclusive natively — again with no JavaScript.
 * In engines that do not support it the panels simply all stay openable, which
 * is a harmless degradation rather than a broken control.
 *
 * The UX database flags removing focus rings as high severity; the global
 * :focus-visible ring in globals.css applies to <summary> automatically.
 */
export function Accordion({
  id,
  question,
  /** Shared name makes a group mutually exclusive (§13). */
  group,
  defaultOpen = false,
  children,
  className,
}: {
  id?: string
  question: React.ReactNode
  group?: string
  defaultOpen?: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <details
      id={id}
      name={group}
      open={defaultOpen}
      className={cn(
        'group border-b border-navy/12 [&[open]]:bg-sand-dark/25',
        // Anchored questions must clear BOTH the floating header and any
        // sticky section index above them.
        'scroll-mt-40',
        className,
      )}
    >
      <summary
        className={cn(
          'flex cursor-pointer list-none items-start justify-between gap-5',
          'px-4 py-5 font-sans text-[1.0625rem] font-semibold leading-snug text-navy',
          'transition-colors hover:bg-sand-dark/40',
          // Safari renders a disclosure triangle without this.
          '[&::-webkit-details-marker]:hidden',
          'min-h-[56px]',
        )}
      >
        <span>{question}</span>

        {/* Decorative — the open/closed state is carried by the element itself
            and announced by the browser, so this is never the only indicator. */}
        <span
          aria-hidden="true"
          className={cn(
            'mt-0.5 grid size-6 shrink-0 place-items-center rounded-full',
            'border border-navy/20 text-navy/60 transition-transform duration-200',
            'group-open:rotate-45 group-open:border-navy/40',
          )}
        >
          <span className="text-lg leading-none">+</span>
        </span>
      </summary>

      <div className="px-4 pb-6 pt-0">
        <div className="measure space-y-3 font-sans text-[1.0625rem] leading-relaxed text-navy/75">
          {children}
        </div>
      </div>
    </details>
  )
}
