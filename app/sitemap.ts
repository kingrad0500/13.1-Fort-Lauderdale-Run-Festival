import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/metadata'

/** Brief §18: generate an XML sitemap. */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '/', priority: 1 },
    { path: '/distances', priority: 0.9 },
    { path: '/race-weekend', priority: 0.9 },
    { path: '/plan-your-trip', priority: 0.7 },
    { path: '/faq', priority: 0.7 },
    { path: '/community', priority: 0.6 },
    { path: '/results-photos', priority: 0.6 },
  ]

  const lastModified = new Date()

  return routes.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority,
  }))
}
