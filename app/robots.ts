import type { MetadataRoute } from 'next'
import { siteUrl, siteIndexable } from '@/lib/metadata'

/**
 * Brief §18: "Preview and staging environments must not be indexed."
 * Only a production deployment gets a permissive robots file.
 */
export default function robots(): MetadataRoute.Robots {
  if (!siteIndexable) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
