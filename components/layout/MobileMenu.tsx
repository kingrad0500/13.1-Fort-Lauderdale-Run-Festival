'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { primaryNav } from '@/content/navigation'
import { RegisterButton } from '@/components/ui/RegisterButton'
import { cn } from '@/lib/cn'

/**
 * Full-height mobile navigation. Brief §14 and §16.
 *
 * Every requirement from §14's mobile header section is implemented here:
 *   - full-height Atlantic Navy panel, large readable navigation
 *   - sublinks expand as accordions
 *   - the current page is clearly indicated
 *   - Escape closes the menu when a keyboard is used
 *   - focus remains inside the menu until it closes
 *   - body scrolling is disabled while the menu is open
 * plus §16's rule that closing an overlay returns focus to the control that
 * opened it.
 */
export function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean
  onClose: () => void
  pathname: string
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return

    previouslyFocused.current = document.activeElement as HTMLElement

    // Body scroll lock. Compensating for the scrollbar prevents the layout
    // shifting sideways as the menu opens.
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    const { overflow, paddingRight } = document.body.style
    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`

    // Move focus into the panel.
    const first = panelRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    first?.focus()

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }

      if (e.key !== 'Tab') return

      // Focus trap.
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables || focusables.length === 0) return

      const list = Array.from(focusables).filter(
        (el) => !el.hasAttribute('disabled') && el.offsetParent !== null,
      )
      const firstEl = list[0]
      const lastEl = list[list.length - 1]

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault()
        lastEl.focus()
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault()
        firstEl.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
      // Return focus to the control that opened the menu (§16).
      previouslyFocused.current?.focus()
    }
  }, [open, onClose])

  if (!open) return null

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <div
      className="fixed inset-0 z-[60] xl:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
    >
      <div
        ref={panelRef}
        id="mobile-menu"
        className="flex h-full flex-col overflow-y-auto bg-navy surface-inverse"
      >
        <div className="flex items-center justify-between px-5 py-4">
          <span className="font-numeric text-2xl text-gold">13.1</span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-11 items-center justify-center rounded-[var(--radius-pill)] text-sand hover:bg-white/10"
          >
            <span className="sr-only">Close menu</span>
            <span aria-hidden="true" className="text-2xl leading-none">
              ×
            </span>
          </button>
        </div>

        <nav aria-label="Site" className="flex-1 px-5 pb-8">
          <ul className="space-y-1">
            {primaryNav.map((item) => {
              const active = isActive(item.href)
              const hasChildren = Boolean(item.children?.length)
              const isExpanded = expanded === item.label

              return (
                <li key={item.label} className="border-b border-white/10">
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex-1 py-4 font-display text-2xl font-semibold text-sand/90',
                        active && 'text-sand underline decoration-gold decoration-2 underline-offset-8',
                      )}
                    >
                      {item.label}
                    </Link>

                    {hasChildren && (
                      <button
                        type="button"
                        onClick={() => setExpanded(isExpanded ? null : item.label)}
                        aria-expanded={isExpanded}
                        aria-controls={`mobile-sub-${item.label}`}
                        className="inline-flex size-11 items-center justify-center rounded-[var(--radius-pill)] text-sand/70 hover:bg-white/10"
                      >
                        <span className="sr-only">
                          {isExpanded ? 'Collapse' : 'Expand'} {item.label}
                        </span>
                        <span
                          aria-hidden="true"
                          className={cn(
                            'text-sm transition-transform duration-200',
                            isExpanded && 'rotate-180',
                          )}
                        >
                          ▼
                        </span>
                      </button>
                    )}
                  </div>

                  {hasChildren && isExpanded && (
                    <ul id={`mobile-sub-${item.label}`} className="pb-3 pl-3">
                      {item.children!.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={onClose}
                            className="block py-3 font-sans text-base text-sand/75 hover:text-sand"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>

          <RegisterButton source="mobile-menu" block size="lg" className="mt-8" />
        </nav>
      </div>
    </div>
  )
}
