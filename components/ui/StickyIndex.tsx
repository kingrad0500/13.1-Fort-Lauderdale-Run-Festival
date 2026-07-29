'use client'

import { useEffect, useRef, useState } from 'react'
import type { NavChild } from '@/content/navigation'
import { cn } from '@/lib/cn'

/**
 * Sticky in-page section navigator. Brief §8.2.
 *
 * §8.2: "Use a horizontal section navigator… On mobile, this becomes a
 * horizontally scrollable control." §16 adds that horizontal section
 * navigation must clearly indicate that it can scroll.
 *
 * Two rules from the UX database shaped this:
 *  - Active State: the current section must be indicated, and NOT by colour
 *    alone (§16), so the active chip carries a filled background AND
 *    aria-current.
 *  - Sticky Navigation must not obscure content. This bar sits below the
 *    floating header, so anchored sections need scroll-margin clearing BOTH.
 *    That is why sections using this control set `scroll-mt-40` rather than
 *    relying on the global `scroll-padding-top`, which only clears the header.
 *
 * Without JavaScript this still renders as a usable row of anchor links; only
 * the active-section highlighting is lost (§19).
 */
export function StickyIndex({
  sections,
  className,
}: {
  sections: NavChild[]
  className?: string
}) {
  const [active, setActive] = useState<string | null>(null)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const ids = sections.map((s) => s.href.replace('#', ''))
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    // Track which section occupies the upper band of the viewport, just below
    // the header + index. Picking the topmost intersecting entry avoids the
    // flicker you get from toggling on every partial intersection.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-180px 0px -55% 0px', threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sections])

  // Keep the active chip in view within the scrollable strip on mobile.
  //
  // Deliberately NOT scrollIntoView: that walks up to the nearest scrollable
  // ancestor and will scroll the PAGE, which hijacks in-progress hash
  // navigation — landing the visitor a few hundred pixels down instead of at
  // the section they asked for, and leaving the active chip wrong. Setting
  // scrollLeft directly moves only this strip and can never touch the page.
  useEffect(() => {
    const list = listRef.current
    if (!active || !list) return

    const chip = list.querySelector<HTMLElement>(`[data-section="${active}"]`)
    if (!chip) return

    const target =
      chip.offsetLeft - list.clientWidth / 2 + chip.clientWidth / 2
    const max = list.scrollWidth - list.clientWidth
    list.scrollLeft = Math.max(0, Math.min(target, max))
  }, [active])

  return (
    <div
      className={cn(
        // Offsets are the MEASURED header height (88px / 96px), not a guess —
        // the header is a floating pill with its own padding, so eyeballing this
        // leaves a 12px overlap that clips the top of the chips.
        'sticky top-[5.5rem] z-30 border-y border-navy/10 bg-sand/90 backdrop-blur sm:top-[6rem]',
        className,
      )}
    >
      <nav aria-label="Sections on this page" className="page-shell">
        {/*
          The fade on the right edge signals scrollability on narrow screens
          (§16). It is decorative and pointer-events-none so it never blocks a
          tap on the chip beneath it.
        */}
        <div className="relative">
          <ul
            ref={listRef}
            className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {sections.map((section) => {
              const id = section.href.replace('#', '')
              const isActive = active === id
              return (
                <li key={section.href} className="shrink-0">
                  <a
                    href={section.href}
                    data-section={id}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'inline-flex min-h-[44px] items-center rounded-[var(--radius-pill)] px-4',
                      'font-sans text-sm font-semibold transition-colors',
                      isActive
                        ? 'bg-navy text-sand'
                        : 'text-navy/70 hover:bg-navy/8 hover:text-navy',
                    )}
                  >
                    {section.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-sand to-transparent sm:hidden"
          />
        </div>
      </nav>
    </div>
  )
}
