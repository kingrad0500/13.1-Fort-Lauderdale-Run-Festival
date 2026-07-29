import { registrationUrl } from '@/content/links'
import { analyticsAttrs, type RegistrationSource } from '@/lib/analytics'
import type { DistanceSlug } from '@/content/race'
import { cn } from '@/lib/cn'

/**
 * THE registration CTA. One definition, used everywhere.
 *
 * Every outbound registration link on the site goes through this component so
 * that four things can never drift apart:
 *
 *  1. CONTRAST — coral fill with an ATLANTIC NAVY label. Brief §15 (revised
 *     §29.2). navy-on-coral is 5.6:1 and passes AA; white-on-coral is 2.8:1
 *     and fails. Hardcoding this in one place makes the failing combination
 *     unreachable.
 *  2. UTM TAGGING — §18 requires consistent campaign parameters so RunSignUp
 *     traffic can be compared against site analytics. Forgetting them on one
 *     button silently loses that click from attribution.
 *  3. ANALYTICS — §18 tracks which surface and which distance drove the click.
 *  4. `data-register-cta` — StickyRegisterCTA watches for this to hide itself
 *     when another registration CTA is already visible (§14). A CTA missing
 *     the attribute causes two competing buttons on screen.
 *
 * Brief §14: registration opens in the SAME tab, so there is deliberately no
 * newTab option here.
 */

type Variant =
  /** Coral fill, navy label. The default and the dominant path. */
  | 'solid'
  /** Light outline, for use on navy surfaces or over media beside a solid CTA. */
  | 'outline'
  /** Underlined text, for a registration link inside a sentence. */
  | 'inline'

interface Props {
  source: RegistrationSource
  distance?: DistanceSlug
  children?: React.ReactNode
  variant?: Variant
  size?: 'sm' | 'md' | 'lg'
  /** Stretches to the container width — used inside cards. */
  block?: boolean
  /** Appended for screen readers, e.g. "for the Two-Person Relay". */
  srSuffix?: string
  /** Set to -1 when the CTA is visually hidden, so it leaves the tab order. */
  tabIndex?: number
  className?: string
}

export function RegisterButton({
  source,
  distance,
  children = 'Register on RunSignUp',
  variant = 'solid',
  size = 'md',
  block = false,
  srSuffix,
  tabIndex,
  className,
}: Props) {
  return (
    <a
      href={registrationUrl(source, distance)}
      data-register-cta=""
      tabIndex={tabIndex}
      {...analyticsAttrs({ name: 'registration_click', source, distance })}
      className={cn(
        'font-sans font-bold transition-colors duration-200',
        // An inline variant must be display:inline, not inline-flex — inside a
        // paragraph, inline-flex makes the link an unbreakable box that cannot
        // wrap across lines. It is also what makes WCAG 2.5.8's exemption for
        // links inside a block of text apply.
        variant === 'inline'
          ? 'inline'
          : 'inline-flex items-center justify-center rounded-[var(--radius-pill)]',
        variant !== 'inline' &&
          {
            // Compact header size. Padding tightens below sm, where the bar has
            // to hold the sponsor mark, the event name, this button and the
            // menu trigger inside 288px.
            sm: 'min-h-[44px] px-3 text-sm sm:px-5',
            md: 'min-h-[48px] px-6 text-[0.9375rem]',
            lg: 'min-h-[52px] px-8 text-base',
          }[size],
        block && 'w-full',
        variant === 'solid' &&
          'bg-coral text-navy shadow-[var(--shadow-card)] hover:bg-coral-dark',
        variant === 'outline' &&
          'border-2 border-sand/70 text-sand hover:bg-sand hover:text-navy',
        // Inline links in a sentence are exempt from the 44px target rule
        // (WCAG 2.5.8), so this variant deliberately sets no min-height.
        variant === 'inline' && 'underline underline-offset-4',
        className,
      )}
    >
      {children}
      {srSuffix && <span className="sr-only"> {srSuffix}</span>}
    </a>
  )
}
