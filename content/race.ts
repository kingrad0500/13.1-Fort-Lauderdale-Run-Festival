/**
 * SINGLE SOURCE OF TRUTH for race facts.
 *
 * Brief §19 requires "central race-information data" and its launch gate
 * requires "no known factual contradiction." Prices, start times and the
 * 10:00 a.m. deadline each appear on five or more pages. Nothing in this file
 * may be retyped anywhere else — import it.
 *
 * Every value here traces to brief §20-§23. Do not invent operational facts
 * (§26.5). Anything unconfirmed belongs in content/pending.ts instead.
 */

export type DistanceSlug = 'half-marathon' | 'relay' | '10k' | '5k'

export interface Distance {
  slug: DistanceSlug
  /** Official name, per brief §20. */
  name: string
  /** Short label for chips, cards and navigation. */
  shortName: string
  /** Human-readable distance, e.g. "13.1 miles". */
  distance: string
  /** Distance in kilometres, for structured data only. */
  distanceKm: number
  /** Display start time, e.g. "6:15 a.m.". */
  startTime: string
  /** 24-hour start, for structured data and sorting. */
  startTime24: string
  /** Base price in USD. RunSignUp controls final checkout price (§20). */
  basePrice: number
  /** Whether basePrice covers one participant or a whole team. */
  priceBasis: 'participant' | 'team'
  /** One-line emotional promise. Brief §9.2 asks each race for a distinct one. */
  promise: string
  /** Card and section description. */
  description: string
}

export const event = {
  name: 'The 20th Annual Liquid Youth Fort Lauderdale Running Festival',
  shortName: 'Fort Lauderdale Running Festival',
  /** Used in page titles and structured data. */
  seoName: 'Fort Lauderdale Running Festival',
  date: '2026-11-08',
  dateDisplay: 'Sunday, November 8, 2026',
  dateShort: 'November 8, 2026',
  venue: 'Las Olas Oceanside Park',
  address: {
    street: '3000 E Las Olas Blvd',
    city: 'Fort Lauderdale',
    state: 'FL',
    postalCode: '33316',
    country: 'US',
  },
  addressDisplay: '3000 E Las Olas Blvd, Fort Lauderdale, FL 33316',
  contactEmail: 'info@131FortLauderdale.com',
} as const

export const distances: Distance[] = [
  {
    slug: 'half-marathon',
    name: 'The Liquid Youth Half Marathon',
    shortName: 'Half Marathon',
    distance: '13.1 miles',
    distanceKm: 21.0975,
    startTime: '6:15 a.m.',
    startTime24: '06:15',
    basePrice: 80,
    priceBasis: 'participant',
    promise: 'The complete coastal experience.',
    description:
      'Thirteen point one miles through Las Olas, Harbor Beach and A1A, starting in the dark and finishing in full Florida sunlight. Professionally timed, with live results.',
  },
  {
    slug: 'relay',
    name: 'Two-Person Half Marathon Relay',
    shortName: 'Two-Person Relay',
    distance: '6.4 + 6.7 miles',
    distanceKm: 21.0975,
    startTime: '6:15 a.m.',
    startTime24: '06:15',
    basePrice: 110,
    priceBasis: 'team',
    promise: 'Split the distance. Share the finish.',
    description:
      'Two runners, one half marathon. Hand off at E Las Olas and A1A, then reunite for the finish if you want the photograph.',
  },
  {
    slug: '10k',
    name: 'Fort Lauderdale A1A 10K',
    shortName: '10K',
    distance: '10 kilometers',
    distanceKm: 10,
    startTime: '7:00 a.m.',
    startTime24: '07:00',
    basePrice: 55,
    priceBasis: 'participant',
    promise: 'A real challenge, a shorter morning.',
    description:
      'Six coastal miles with the ocean on one side and Fort Lauderdale waking up on the other. Professionally timed, with live results.',
  },
  {
    slug: '5k',
    name: 'Fort Lauderdale A1A 5K',
    shortName: '5K',
    distance: '5 kilometers',
    distanceKm: 5,
    startTime: '7:00 a.m.',
    startTime24: '07:00',
    basePrice: 40,
    priceBasis: 'participant',
    promise: 'Your first finish line, or your fastest.',
    description:
      'Short, fast and welcoming. Bring the family, bring a friend, walk it if you like — everyone finishes on the beach.',
  },
]

export function getDistance(slug: DistanceSlug): Distance {
  const found = distances.find((d) => d.slug === slug)
  if (!found) throw new Error(`Unknown distance: ${slug}`)
  return found
}

/** Formats a base price for display. Always described as a base price (§20). */
export function formatPrice(distance: Distance): string {
  return distance.priceBasis === 'team'
    ? `$${distance.basePrice} per team`
    : `$${distance.basePrice}`
}

export const deadlines = {
  /** Brief §20. All four events must be completed by this time. */
  courseSupportEnds: '10:00 a.m.',
  /** Half Marathon and Relay have 3h45m from the 6:15 a.m. start (§20). */
  halfMarathonLimit: '3 hours 45 minutes',
  priceIncrease: {
    iso: '2026-10-02T23:59:00-04:00',
    display: 'October 2, 2026 at 11:59 p.m. EDT',
    short: 'October 2',
  },
  distanceChangeClose: {
    iso: '2026-10-25T23:59:00-04:00',
    display: 'Sunday, October 25, 2026 at 11:59 p.m. EDT',
  },
} as const

export const eligibility = {
  minimumAge: 14,
  /** Brief §20: applies to all four events and both relay members. */
  statement:
    'Participants must be at least 14 years old on November 8, 2026. The age requirement applies to all four events and to both relay team members.',
  minorWaiver:
    'A younger participant may take part only after arranging a minor waiver.',
  minorWaiverContact: event.contactEmail,
} as const

export const completion = {
  // NOTE: no trailing period. `courseSupportEnds` is "10:00 a.m." and already
  // ends in one — adding another renders "10:00 a.m..". Same applies anywhere
  // this value ends a sentence. `priceIncrease.display` ends in "EDT" and DOES
  // need its own period, so the two are not interchangeable.
  statement: `All four events must be completed by ${deadlines.courseSupportEnds}`,
  halfMarathon: `Half Marathon and Relay participants have ${deadlines.halfMarathonLimit} from the 6:15 a.m. start.`,
  walkers: [
    'Walkers are welcome.',
    'Walkers start behind runners.',
    'There is no early start.',
  ],
} as const

/**
 * Brief §20: exact participant caps are unknown. This is the approved public
 * wording. Do not replace it with a specific number without written
 * confirmation from the race team.
 */
export const capacity =
  'Capacity is limited. Register early to secure your preferred distance.'

/**
 * Brief §7.4 requires this notice verbatim wherever prices appear.
 * The price-increase date is interpolated so it can never drift from
 * `deadlines.priceIncrease`.
 */
export const pricingNotice = `Plus applicable RunSignUp processing fee. Final pricing is shown at checkout. Prices increase after ${deadlines.priceIncrease.display}.`

/** Brief §22. */
export const registrationPolicy = {
  refunds:
    'All registrations are final. No refunds or deferrals are available. Optional race insurance may be purchased through RunSignUp when offered at checkout.',
  distanceChanges: [
    `Distance changes close ${deadlines.distanceChangeClose.display}.`,
    "Upgrades are completed through the participant's RunSignUp account.",
    'Participants pay any price difference for an upgrade.',
    `Downgrades are requested through ${event.contactEmail}.`,
    'Downgrades do not receive a refund of the price difference.',
  ],
} as const

/** Brief §23. */
export const safety = {
  wheelchair: [
    'Athletes using wheelchairs are welcome.',
    'There is no hand-cycle division.',
    'Hand cycles, hand bikes, hand-crank devices and mechanically gear-driven devices are not permitted.',
    'The event follows applicable recognized wheelchair-racing rules.',
  ],
  roadClosures:
    'Official road closures are managed by police and race crews. Confirmed road-closure details will be published when available.',
  severeWeather:
    'Safety comes first. Severe weather or other emergency conditions may require the event team and public-safety officials to delay, modify, or cancel the event. Follow official event communications for current instructions.',
} as const

/** Brief §7.6. Medal and shirt photography are pending — see content/pending.ts. */
export const runnerBenefits = [
  'High-quality technical running shirt',
  'Finisher medal',
  'Professional event timing',
  'Live results messaging',
  'Free race photography',
  'Complimentary post-race beer for participants 21+ with valid identification',
  'Awards for top finishers',
] as const
