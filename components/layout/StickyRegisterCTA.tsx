'use client'

import { useEffect, useRef, useState } from 'react'
import { RegisterButton } from '@/components/ui/RegisterButton'
import { cn } from '@/lib/cn'

/**
 * Sticky mobile registration action. Brief §14.
 *
 * §14's three constraints:
 *   - respects device safe areas    -> env(safe-area-inset-bottom)
 *   - never covers page content     -> space is reserved in app/layout.tsx
 *   - may hide when another registration CTA is already visible near the
 *     bottom of the viewport        -> observes [data-register-cta]
 *
 * SPACE IS RESERVED STATICALLY, not toggled. An earlier version set a padding
 * custom property on <body> when the bar appeared, which resized <main>
 * mid-scroll and pushed the footer down — measured at 0.10 CLS on mobile,
 * over the 0.1 "good" threshold. A permanently reserved strip above the footer
 * costs one invisible gap and produces zero layout shift.
 */
export function StickyRegisterCTA() {
  const [pastHero, setPastHero] = useState(false)
  const [ctaVisible, setCtaVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = document.querySelector('[data-hero-sentinel]')
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { rootMargin: '0px' },
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  // Hide while another registration CTA occupies the lower viewport, so the
  // visitor never sees two competing registration buttons at once.
  //
  // CRITICAL: the bar's OWN button must be excluded. It carries
  // `data-register-cta` like every other RegisterButton, so observing it
  // creates a feedback loop — the bar appears, sees itself in the lower
  // viewport, decides a competing CTA is visible, hides, no longer sees
  // itself, reappears. Measured at 121 aria-hidden flips in 4 seconds while
  // the page was completely stationary.
  useEffect(() => {
    const container = containerRef.current
    const ctas = Array.from(
      document.querySelectorAll('[data-register-cta]'),
    ).filter((cta) => !container?.contains(cta))

    if (ctas.length === 0) return

    const visible = new Set<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target)
          else visible.delete(entry.target)
        }
        setCtaVisible(visible.size > 0)
      },
      // Only the lower half of the viewport counts as "already visible".
      { rootMargin: '-50% 0px 0px 0px' },
    )
    ctas.forEach((cta) => observer.observe(cta))
    return () => observer.disconnect()
  }, [])

  const shown = pastHero && !ctaVisible

  return (
    <div
      ref={containerRef}
      aria-hidden={!shown}
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 lg:hidden',
        'border-t border-navy/10 bg-sand/95 backdrop-blur',
        'px-4 pt-3 transition-transform duration-300 ease-[var(--ease-out-soft)]',
        shown ? 'translate-y-0' : 'pointer-events-none translate-y-full',
      )}
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))' }}
    >
      {/* Off-screen when hidden, so it must also leave the tab order (§16). */}
      <RegisterButton
        source="sticky-mobile"
        block
        size="lg"
        tabIndex={shown ? undefined : -1}
      />
    </div>
  )
}
