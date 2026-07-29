/**
 * External link registry. Brief §19 pre-launch check 3 requires every external
 * link be verified before publication, and §19 forbids inactive buttons.
 *
 * Rule enforced by this file: a link with `verified: false` or a null url is
 * NEVER rendered as a live link. Components call `resolveLink()` and render a
 * "Coming soon" status notice instead. That way an unverified URL degrades to
 * an honest placeholder rather than a dead link in front of a participant.
 *
 * Flip `verified` to true only after actually loading the URL.
 */

export type LinkTarget = 'same-tab' | 'new-tab'

export interface ExternalLink {
  id: string
  label: string
  url: string | null
  verified: boolean
  /**
   * Brief §14: registration opens in the SAME tab. Results, photos, training
   * and partner sites open in a NEW tab, because visitors may want to keep
   * their place on the event site.
   */
  target: LinkTarget
  /** Shown in place of the link when unverified. */
  pendingLabel?: string
  note?: string
}

const links = {
  /** Brief §1 and §14. The one confirmed destination. */
  runSignUp: {
    id: 'runSignUp',
    label: 'Register on RunSignUp',
    url: 'https://runsignup.com/Race/FL/FortLauderdale/FortLauderdale131',
    verified: true,
    target: 'same-tab',
  },

  /** Brief §12.4. Correct destination link not yet supplied. */
  teamRegistration: {
    id: 'teamRegistration',
    label: 'Register a team or group',
    url: null,
    verified: false,
    target: 'same-tab',
    pendingLabel: 'Team registration link coming soon',
  },

  /** Brief §12.6. Volunteer registration link not yet supplied. */
  volunteerRegistration: {
    id: 'volunteerRegistration',
    label: 'Volunteer for race weekend',
    url: null,
    verified: false,
    target: 'new-tab',
    pendingLabel: 'Volunteer registration coming soon',
  },

  /** Brief §11. Results provider not yet confirmed. */
  liveResults: {
    id: 'liveResults',
    label: 'View live results',
    url: null,
    verified: false,
    target: 'new-tab',
    // Mode-neutral: this renders in race-day and post-race too, where
    // "after the race" would be wrong. §11.2's before-race wording is stated
    // explicitly on the Results page instead.
    pendingLabel: 'Results link coming soon',
  },

  /** Brief §11. Photography provider not yet confirmed. */
  racePhotos: {
    id: 'racePhotos',
    label: 'Find your photos',
    url: null,
    verified: false,
    target: 'new-tab',
    // Mode-neutral, for the same reason as liveResults above.
    pendingLabel: 'Photography link coming soon',
  },

  /**
   * Brief §10.4. Both URLs are http:// in the source content and must be
   * loaded and confirmed — including whether they now redirect to https —
   * before either card goes live. Client action item 8.
   */
  lifeTimeRunPlan: {
    id: 'lifeTimeRunPlan',
    label: 'Life Time Run customized training plan',
    url: 'http://lifetimerun.com/Sub_Training/run-plan#Planspricing',
    verified: false,
    target: 'new-tab',
    pendingLabel: 'Training plan details coming soon',
    note: 'UNVERIFIED — http, may redirect or be dead. Verify before launch.',
  },
  lifeTimeRunCoaching: {
    id: 'lifeTimeRunCoaching',
    label: 'Life Time Run one-to-one coaching',
    url: 'http://lifetimerun.com/Sub_Training/run-coach',
    verified: false,
    target: 'new-tab',
    pendingLabel: 'Coaching details coming soon',
    note: 'UNVERIFIED — http, may redirect or be dead. Verify before launch.',
  },
} as const satisfies Record<string, ExternalLink>

export type LinkId = keyof typeof links

/**
 * Returns the link only when it is safe to render as a live anchor.
 * Otherwise returns null and the caller shows `pendingLabel` via StatusNotice.
 */
export function resolveLink(id: LinkId): ExternalLink | null {
  const link = links[id]
  return link.verified && link.url ? link : null
}

export function getLink(id: LinkId): ExternalLink {
  return links[id]
}

/** Every link in the registry, for the pre-launch audit script. */
export function allLinks(): ExternalLink[] {
  return Object.values(links)
}

/**
 * Brief §18: outbound registration clicks carry consistent campaign parameters
 * so RunSignUp's traffic sources can be compared against website analytics.
 *
 * `source` identifies WHERE on the site the click came from (header, hero,
 * sticky CTA, a specific distance card), which is exactly the breakdown §18
 * asks to track.
 */
export function registrationUrl(source: string, distanceSlug?: string): string {
  const base = links.runSignUp.url
  const params = new URLSearchParams({
    utm_source: '131fortlauderdale',
    utm_medium: 'website',
    utm_campaign: 'registration-2026',
    utm_content: distanceSlug ? `${source}--${distanceSlug}` : source,
  })
  return `${base}?${params.toString()}`
}
