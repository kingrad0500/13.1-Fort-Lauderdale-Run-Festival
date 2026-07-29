'use client'

import { useEffect } from 'react'
import { send, type AnalyticsEvent } from '@/lib/analytics'

/**
 * One delegated click listener for the whole site. Brief §18.
 *
 * Why delegation rather than onClick handlers: it keeps every button and link
 * a server component, and it means a JavaScript failure costs tracking but
 * never the underlying link — which §19 requires for registration paths.
 */
export function AnalyticsListener() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null
      const el = target?.closest<HTMLElement>('[data-analytics]')
      if (!el) return

      const name = el.dataset.analytics
      if (!name) return

      const props: Record<string, string | number> = {}
      for (const [key, value] of Object.entries(el.dataset)) {
        if (key === 'analytics' || value === undefined) continue
        if (key.startsWith('analytics')) {
          const prop = key.slice('analytics'.length)
          props[prop.charAt(0).toLowerCase() + prop.slice(1)] = value
        }
      }

      send({ name, ...props } as unknown as AnalyticsEvent)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
