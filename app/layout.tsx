import type { Metadata, Viewport } from 'next'
import './globals.css'
import { fontVariables } from '@/lib/fonts'
import { buildMetadata } from '@/lib/metadata'
import { SkipLink } from '@/components/layout/SkipLink'
import { Banners } from '@/components/layout/Banners'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StickyRegisterCTA } from '@/components/layout/StickyRegisterCTA'
import { AnalyticsListener } from '@/components/analytics/AnalyticsListener'

export const metadata: Metadata = buildMetadata({
  title: 'Fort Lauderdale Running Festival — November 8, 2026',
  description:
    "Half Marathon, Two-Person Relay, 10K and 5K along Fort Lauderdale's beach roads. Sunday, November 8, 2026, starting at Las Olas Oceanside Park.",
  path: '/',
})

export const viewport: Viewport = {
  themeColor: '#10233E',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <SkipLink />
        <Banners />
        <Header />

        {/* Skip link target. tabIndex -1 so focus can land here. */}
        {/* Bottom space for the sticky mobile CTA is reserved here, always,
            rather than toggled when the bar appears — see StickyRegisterCTA. */}
        <main
          id="main"
          tabIndex={-1}
          className="pb-[calc(4.75rem+env(safe-area-inset-bottom,0px))] lg:pb-0"
        >
          {children}
        </main>

        <Footer />
        <StickyRegisterCTA />
        <AnalyticsListener />
      </body>
    </html>
  )
}
