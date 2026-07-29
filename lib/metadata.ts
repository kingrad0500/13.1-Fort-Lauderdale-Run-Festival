import type { Metadata } from 'next'
import { event } from '@/content/race'

/**
 * Search and sharing metadata. Brief §18.
 *
 * §18 requires: unique title and description per page, canonical URLs, an XML
 * sitemap, robots directives, Open Graph data, and structured event data — and
 * that preview and staging environments are not indexed.
 *
 * DOMAIN IS NOT CONFIRMED (client action item 4). Set SITE_URL when it is.
 */
/**
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL  — set this once the real domain is live
 *   2. the actual Vercel deployment URL
 *   3. the intended production domain, as a last resort
 *
 * Falling back to the Vercel URL matters: canonicals, the sitemap and the OG
 * image are all absolute. Pointing them at a domain that does not resolve yet
 * means shared links render with a broken preview image, and any indexing
 * points at a dead host.
 */
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL

  const vercel =
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    process.env.VERCEL_URL
  if (vercel) return `https://${vercel}`

  return 'https://www.131fortlauderdale.com'
}

export const siteUrl = resolveSiteUrl()

/**
 * Indexing is OPT-IN, not automatic.
 *
 * Brief §18: "Preview and staging environments must not be indexed." A demo on
 * a .vercel.app URL is staging, and this site still has blocking items open
 * (no event logo, unverified partner links, placeholder legal copy). Tying
 * indexing to VERCEL_ENV === 'production' would invite Google in the moment the
 * first production deploy happens, which is almost never what you want on the
 * day you first show someone.
 *
 * TO GO LIVE: set SITE_INDEXABLE=true and NEXT_PUBLIC_SITE_URL=<real domain>.
 */
export const siteIndexable = process.env.SITE_INDEXABLE === 'true'

/** §18: a strong approved race image for social previews. */
const ogImage = {
  url: `${siteUrl}/og-image.jpg`,
  width: 1200,
  height: 630,
  alt: 'Runners along A1A in Fort Lauderdale at sunrise during the Fort Lauderdale Running Festival',
}

export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  const url = `${siteUrl}${path}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: event.seoName,
      type: 'website',
      locale: 'en_US',
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.url],
    },
    robots: siteIndexable
      ? { index: true, follow: true }
      : { index: false, follow: false },
  }
}
