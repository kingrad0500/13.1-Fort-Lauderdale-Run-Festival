/**
 * Sponsors and partners. Brief §12.3 and §24.
 *
 * Brief §12.3: present sponsors according to confirmed hierarchy rather than
 * giving every logo equal prominence. Brief §7.10: sponsor presentation stays
 * restrained so it never interrupts the registration journey.
 *
 * LOGO FILES DO NOT EXIST YET — client action item 2. `logo: null` renders the
 * organisation's name as styled text, which is honest and looks deliberate,
 * rather than a broken image. Brief §24 also requires official organisation
 * names, usage permissions and hierarchy be confirmed before publication.
 */

export type SponsorTier = 'title' | 'presenting' | 'partner'

export interface Sponsor {
  id: string
  name: string
  tier: SponsorTier
  /** File in media/logos, or null if not supplied. */
  logo: string | null
  /**
   * Which tile the mark needs behind it.
   *
   * Determined by compositing every logo on both surfaces and looking, not by
   * guessing: on white, Visit Lauderdale loses its entire wordmark and
   * WildSide's script nearly vanishes, because both are WHITE artwork. On
   * navy, Baptist Health and Liquid Youth disappear instead.
   *
   * Trademarked artwork must not be recoloured, so the tile adapts to the
   * logo rather than the other way round. Ask the client for dark-safe
   * variants of the two `dark` entries if a uniform wall is wanted.
   */
  tile: 'light' | 'dark'
  /** Only rendered when the URL has been confirmed. */
  url: string | null
  /** Extra descriptor, e.g. medical partner. */
  role?: string
}

export const sponsors: Sponsor[] = [
  {
    id: 'liquid-youth',
    name: 'Liquid Youth',
    tier: 'title',
    logo: 'liquid-youth.png',
    tile: 'light',
    url: null,
    role: 'Title sponsor',
  },
  {
    id: 'baptist-health',
    name: 'Baptist Health South Florida',
    tier: 'presenting',
    // Client-specified full-colour mark. Sourced from a JPEG, so it has no
    // transparency — safe on a light tile only. The reversed-out
    // baptist-health-white.png is the one used in the header over dark media.
    logo: 'bh-full-color.png',
    tile: 'light',
    url: null,
    role: 'Presenting and medical partner',
  },
    // Client-supplied colour version. This REPLACES the white-wordmark file,
  // which was unreadable on a light tile — the colour mark works on both.
  { id: 'visit-lauderdale', name: 'Visit Lauderdale', tier: 'partner', logo: 'visit-lauderdale-josh.png', tile: 'light', url: null },
  {
    id: 'fl-beach-improvement',
    name: 'Fort Lauderdale Beach Improvement District',
    tier: 'partner',
    logo: 'bid.png',
    tile: 'light',
    url: null,
  },
    { id: 'dole', name: 'Dole', tier: 'partner', logo: 'dole.png', tile: 'light', url: null },
    { id: '7-eleven', name: '7-Eleven', tier: 'partner', logo: '7-eleven.png', tile: 'light', url: null },
    { id: 'split-second-timing', name: 'Split Second Timing', tier: 'partner', logo: 'sst.png', tile: 'light', url: null },
    // Pale cream script — legible only on a dark tile. On the all-white Partners
  // wall it falls back to its name in type until the client supplies a
  // dark/colour version. It still renders as a logo in the homepage marquee,
  // which can give it the navy tile it needs.
  { id: 'wildside', name: 'WildSide', tier: 'partner', logo: 'wildside.png', tile: 'dark', url: null },
    { id: 'running-wild', name: 'Running Wild', tier: 'partner', logo: 'running-wild.png', tile: 'light', url: null },
]

export function sponsorsByTier(tier: SponsorTier): Sponsor[] {
  return sponsors.filter((s) => s.tier === tier)
}

/** True once every sponsor has artwork — used to drop the text fallback. */
export function allLogosSupplied(): boolean {
  return sponsors.every((s) => s.logo !== null)
}

/**
 * Whether a sponsor's artwork can sit on a LIGHT tile.
 *
 * `tile: 'dark'` means the mark is reversed-out and needs a dark background,
 * so a surface that only offers white tiles must fall back to the name in
 * type rather than render an invisible logo. Currently WildSide only.
 */
export function isLightSafe(sponsor: Sponsor): boolean {
  return sponsor.logo !== null && sponsor.tile === 'light'
}

/** Sponsors still awaiting light-surface artwork — for the pre-launch audit. */
export function sponsorsAwaitingLightArtwork(): Sponsor[] {
  return sponsors.filter((s) => !isLightSafe(s))
}

/** Brief §24: training partner, tracked separately from event sponsors. */
export const trainingPartner = {
  name: 'Life Time Run',
  logo: null,
} as const

/** Brief §12.6. Verify both addresses before publication — client action item 8. */
export const volunteerContacts = [
  { name: 'Matt Lorraine', email: 'Lorraine@exclusivesports.com', verified: false },
  { name: 'Josh Stern', email: 'Josh@splitsecondtiming.com', verified: false },
] as const

/** Brief §12.6. */
export const volunteerHashtag = '#13.1FortLauderdalevolunteer'

/** Brief §12.4. */
export const groupTypes = [
  'Running clubs',
  'Coworkers',
  'Friends and families',
  'Traveling groups',
  'Relay teams',
  'Community organizations',
] as const
