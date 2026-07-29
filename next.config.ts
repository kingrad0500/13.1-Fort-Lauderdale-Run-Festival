import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Local media only. No remote patterns — all imagery is first-party
    // and served from public/media (see scripts/optimize-media.mjs).
    formats: ['image/avif', 'image/webp'],
  },
  // NOTE: SITE_INDEXABLE is deliberately NOT derived from VERCEL_ENV here.
  // Indexing is opt-in via an explicit env var — see lib/metadata.ts for why.
  // Set SITE_INDEXABLE=true in the hosting dashboard when the site is ready
  // to be found, together with NEXT_PUBLIC_SITE_URL.
}

export default nextConfig
