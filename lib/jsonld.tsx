import { event, distances } from '@/content/race'
import { getLink } from '@/content/links'
import { siteUrl } from './metadata'

/**
 * Structured event data. Brief §18.
 *
 * §18 is explicit: use the CONFIRMED event name, date, location, offers and
 * official registration URL — and "do not include unknown course, capacity, or
 * schedule facts in structured data."
 *
 * So this deliberately omits: course distance claims beyond the advertised
 * distance, participant caps, aid stations, and certification. All of those
 * are unconfirmed (§27) and would be search-visible misinformation.
 */
export function raceEventJsonLd() {
  const registration = getLink('runSignUp')

  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: event.name,
    startDate: `${event.date}T06:15:00-05:00`,
    endDate: `${event.date}T10:00:00-05:00`,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    sport: 'Running',
    url: siteUrl,
    location: {
      '@type': 'Place',
      name: event.venue,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.address.street,
        addressLocality: event.address.city,
        addressRegion: event.address.state,
        postalCode: event.address.postalCode,
        addressCountry: event.address.country,
      },
    },
    organizer: {
      '@type': 'Organization',
      name: event.shortName,
      email: event.contactEmail,
    },
    // Base prices only. RunSignUp controls final checkout price (§20).
    offers: distances.map((d) => ({
      '@type': 'Offer',
      name: d.name,
      price: d.basePrice,
      priceCurrency: 'USD',
      url: registration.url,
      availability: 'https://schema.org/InStock',
      validThrough: '2026-10-02T23:59:00-04:00',
    })),
  }
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
