/**
 * Analytics event catalogue. Brief §18.
 *
 * §18 requires each event and its purpose be documented before launch — this
 * file is that document, and it is the only place event names are defined.
 *
 * PRIVACY (§18):
 *  - No health, age, registration-form or other sensitive participant data is
 *    ever sent here. The payload types below make that structurally hard.
 *  - RunSignUp participant data is never duplicated.
 *
 * PROVIDER: not yet chosen — client action item 6. Recommendation is Plausible
 * or Fathom (cookieless, so no consent banner is needed on a page whose only
 * job is conversion). `send()` is a no-op until a provider is wired in, so
 * nothing breaks and no data leaks in the meantime.
 *
 * IMPLEMENTATION: events fire from a single delegated click listener
 * (components/analytics/AnalyticsListener.tsx) reading `data-analytics-*`
 * attributes. That keeps every button and link a server component, and means a
 * JS failure costs tracking but never the link itself (§19).
 */

/**
 * The primary conversion: a click from this site out to RunSignUp (§18).
 *
 * This union is the complete list of surfaces that can send a visitor to
 * registration. Adding a CTA means adding a source here first, which keeps the
 * UTM `utm_content` values and the analytics breakdown in agreement — §18 asks
 * for exactly this comparison between RunSignUp traffic and site analytics.
 */
export type RegistrationSource =
  | 'header'
  | 'mobile-menu'
  | 'sticky-mobile'
  | 'hero'
  | 'distance-card'
  | 'final-section'
  | 'footer'
  | 'comparison-table'
  | 'race-weekend'
  | 'faq'
  | 'not-found'

/** Supporting measurements. §18: only what informs a decision. */
export type AnalyticsEvent =
  | { name: 'registration_click'; source: RegistrationSource; distance?: string }
  | { name: 'race_weekend_view' }
  | { name: 'packet_pickup_view' }
  | { name: 'parking_detail_view'; location?: string }
  | { name: 'faq_search'; query_length: number }
  | { name: 'faq_question_open'; question_id: string }
  | { name: 'live_results_click' }
  | { name: 'photo_provider_click' }
  | { name: 'volunteer_click' }
  | { name: 'team_registration_click' }

/** Human-readable purpose for each event. Required by §18 before launch. */
export const eventPurposes: Record<AnalyticsEvent['name'], string> = {
  registration_click:
    'Primary conversion. Which surface and which distance drove the click out to RunSignUp.',
  race_weekend_view: 'Whether participants find the operational guide before race week.',
  packet_pickup_view: 'Whether packet pickup detail is being read, which predicts race-morning queue load.',
  parking_detail_view: 'Which parking locations participants are actually considering.',
  faq_search: 'What participants cannot find. Length only — never the query text, which can contain personal detail.',
  faq_question_open: 'Which questions matter most, to decide what gets promoted out of the FAQ.',
  live_results_click: 'Race-day demand for the results provider.',
  photo_provider_click: 'Post-race demand for photography.',
  volunteer_click: 'Whether the Community page converts volunteers.',
  team_registration_click: 'Whether group and relay team registration is being pursued.',
}

declare global {
  interface Window {
    plausible?: (name: string, opts?: { props?: Record<string, string | number> }) => void
    fathom?: { trackEvent: (name: string) => void }
  }
}

/**
 * Sends an event to whichever provider is configured. No-ops when none is.
 * Never throws — analytics must not be able to break a registration click.
 */
export function send(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return

  const { name, ...props } = event

  try {
    if (window.plausible) {
      window.plausible(name, { props: props as Record<string, string | number> })
      return
    }
    if (window.fathom) {
      window.fathom.trackEvent(name)
      return
    }
    if (process.env.NODE_ENV === 'development') {
      // Visible in dev so events can be verified before a provider exists.
      console.debug('[analytics]', name, props)
    }
  } catch {
    // Deliberately swallowed. See above.
  }
}

/**
 * Builds the data attributes a server component spreads onto a link or button.
 * The delegated listener picks these up.
 */
export function analyticsAttrs(event: AnalyticsEvent): Record<string, string> {
  const { name, ...props } = event
  const attrs: Record<string, string> = { 'data-analytics': name }
  for (const [key, value] of Object.entries(props)) {
    if (value !== undefined) attrs[`data-analytics-${key}`] = String(value)
  }
  return attrs
}
