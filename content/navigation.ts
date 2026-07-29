/**
 * Navigation architecture. Brief §6 and §14.
 *
 * Brief §14: small, focused dropdowns only where they help. Distances, Plan
 * Your Trip and Community get them; Race Weekend, Results & Photos and FAQ
 * remain direct links. Register is a persistent, visually dominant CTA.
 */

export interface NavChild {
  label: string
  href: string
}

export interface NavItem {
  label: string
  href: string
  children?: NavChild[]
}

export const primaryNav: NavItem[] = [
  { label: 'Race Weekend', href: '/race-weekend' },
  {
    label: 'Distances',
    href: '/distances',
    children: [
      { label: 'Half Marathon', href: '/distances#half-marathon' },
      { label: 'Two-Person Relay', href: '/distances#relay' },
      { label: '10K', href: '/distances#10k' },
      { label: '5K', href: '/distances#5k' },
    ],
  },
  {
    label: 'Plan Your Trip',
    href: '/plan-your-trip',
    children: [
      { label: 'Explore Fort Lauderdale', href: '/plan-your-trip#explore' },
      { label: 'Training', href: '/plan-your-trip#training' },
      { label: 'Parking & Directions', href: '/plan-your-trip#parking' },
      { label: 'Spectator Guide', href: '/plan-your-trip#spectators' },
    ],
  },
  { label: 'Results & Photos', href: '/results-photos' },
  {
    label: 'Community',
    href: '/community',
    children: [
      { label: 'Partners', href: '/community#partners' },
      { label: 'Teams & Groups', href: '/community#teams' },
      { label: 'Charities', href: '/community#charities' },
      { label: 'Volunteer', href: '/community#volunteer' },
      { label: 'Sponsorship', href: '/community#sponsorship' },
    ],
  },
  { label: 'FAQ', href: '/faq' },
]

/** Brief §14 footer: utility links, kept useful without becoming a sitemap. */
export const footerUtilityLinks: NavChild[] = [
  { label: 'Race Weekend', href: '/race-weekend' },
  { label: 'Packet pickup', href: '/race-weekend#packet-pickup' },
  { label: 'Parking & directions', href: '/plan-your-trip#parking' },
  { label: 'Results', href: '/results-photos' },
  { label: 'FAQ', href: '/faq' },
]

/** Brief §8.2 sticky page index. */
export const raceWeekendSections: NavChild[] = [
  { label: 'Schedule', href: '#schedule' },
  { label: 'Packet Pickup', href: '#packet-pickup' },
  { label: 'Your Packet', href: '#your-packet' },
  { label: 'Bib & Timing', href: '#bib-timing' },
  { label: 'Race Rules', href: '#race-rules' },
  { label: 'Accessibility', href: '#accessibility' },
  { label: 'Festival', href: '#festival' },
]
