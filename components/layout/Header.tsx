'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { primaryNav } from '@/content/navigation'
import { RegisterButton } from '@/components/ui/RegisterButton'
import { MobileMenu } from './MobileMenu'
import { cn } from '@/lib/cn'

/**
 * Floating navy pill header. Brief §14 (revised, §29.7).
 *
 * Solid from first paint on every page including the homepage. The inset hero
 * (§7.1) places this on sand rather than over moving media, so there is no
 * transparent state to manage and no contrast-over-video risk. On scroll it
 * gains only a shadow.
 *
 * Dropdown behaviour (§14): "must work with mouse, keyboard, and touch. They
 * must not depend on hover alone." Implemented as click/focus-driven with
 * hover as an enhancement — Escape closes, focus returns to the trigger, and
 * focus leaving the group closes it.
 *
 * Active page indicator (§14) does not rely on colour alone: it carries an
 * underline and aria-current.
 */
export function Header() {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close any dropdown on route change.
  useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
  }, [pathname])

  // Escape closes the open dropdown and returns focus to its trigger (§16).
  useEffect(() => {
    if (!openMenu) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Escape') return
      const trigger = document.getElementById(`nav-trigger-${openMenu}`)
      setOpenMenu(null)
      trigger?.focus()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [openMenu])

  // Clicking outside closes.
  useEffect(() => {
    if (!openMenu) return
    function onPointerDown(e: PointerEvent) {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [openMenu])

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  function scheduleClose() {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120)
  }

  // The pill floats, but the strip it sits in must be opaque enough to hide
  // page content scrolling through the gutters beside and above it — without
  // this, stray glyphs from the section below show in the gap around the pill.
  // A frosted sand strip keeps the floating look (the page background is sand
  // anyway) while reading as a deliberate surface over white sections. Same
  // treatment as StickyIndex, so the two read as one system.
  return (
    <header className="sticky top-0 z-50 bg-sand/80 pb-3 pt-3 backdrop-blur-md sm:pt-4">
      <div className="page-shell">
        <nav
          ref={navRef}
          aria-label="Primary"
          className={cn(
            'flex items-center justify-between gap-4',
            'rounded-[var(--radius-pill)] bg-navy px-4 py-2.5 sm:px-5 sm:py-3',
            'transition-shadow duration-300',
            scrolled
              ? 'shadow-[var(--shadow-raised)] backdrop-blur-sm'
              : 'shadow-[var(--shadow-nav)]',
          )}
        >
          {/* Event logo. Real mark pending — client action item 1. */}
          <Link
            href="/"
            className="flex min-h-[44px] shrink-0 items-center gap-2 rounded-[var(--radius-pill)] px-1 py-1"
            aria-label="Fort Lauderdale Running Festival — home"
          >
            <span className="font-numeric text-2xl leading-none text-gold">13.1</span>
            <span className="hidden font-sans text-[0.8125rem] font-bold leading-tight text-sand sm:block">
              FORT
              <br />
              LAUDERDALE
            </span>
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {primaryNav.map((item) => {
              const active = isActive(item.href)
              const hasChildren = Boolean(item.children?.length)
              const open = openMenu === item.label

              if (!hasChildren) {
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'inline-flex min-h-[44px] items-center rounded-[var(--radius-pill)] px-3 py-2',
                        'font-sans text-sm font-semibold text-sand/85 transition-colors',
                        'hover:bg-white/10 hover:text-sand',
                        // Not colour alone: an underline marks the active page.
                        active && 'text-sand underline decoration-gold decoration-2 underline-offset-[6px]',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              }

              return (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => {
                    cancelClose()
                    setOpenMenu(item.label)
                  }}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    id={`nav-trigger-${item.label}`}
                    type="button"
                    aria-expanded={open}
                    aria-controls={`nav-menu-${item.label}`}
                    aria-haspopup="true"
                    onClick={() => setOpenMenu(open ? null : item.label)}
                    className={cn(
                      'inline-flex min-h-[44px] items-center gap-1.5 rounded-[var(--radius-pill)] px-3 py-2',
                      'font-sans text-sm font-semibold text-sand/85 transition-colors',
                      'hover:bg-white/10 hover:text-sand',
                      active && 'text-sand underline decoration-gold decoration-2 underline-offset-[6px]',
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'text-[0.625rem] transition-transform duration-200',
                        open && 'rotate-180',
                      )}
                    >
                      ▼
                    </span>
                  </button>

                  {open && (
                    <div
                      id={`nav-menu-${item.label}`}
                      onMouseEnter={cancelClose}
                      onMouseLeave={scheduleClose}
                      className={cn(
                        'absolute left-0 top-[calc(100%+0.5rem)] min-w-[15rem]',
                        'rounded-[var(--radius-card)] border border-white/10 bg-navy p-2',
                        'shadow-[var(--shadow-raised)]',
                      )}
                    >
                      <ul>
                        <li>
                          <Link
                            href={item.href}
                            className="block rounded-[12px] px-3 py-2.5 font-sans text-sm font-bold text-sand hover:bg-white/10"
                          >
                            {item.label} overview
                          </Link>
                        </li>
                        {item.children!.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block rounded-[12px] px-3 py-2.5 font-sans text-sm text-sand/85 hover:bg-white/10 hover:text-sand"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>

          {/* Register + mobile trigger */}
          <div className="flex shrink-0 items-center gap-2">
            <RegisterButton source="header" className="min-h-[44px] px-5 text-sm">
              Register
            </RegisterButton>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="inline-flex size-11 items-center justify-center rounded-[var(--radius-pill)] text-sand hover:bg-white/10 lg:hidden"
            >
              <span className="sr-only">Open menu</span>
              <span aria-hidden="true" className="text-xl leading-none">
                ☰
              </span>
            </button>
          </div>
        </nav>
      </div>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
      />
    </header>
  )
}
