'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { primaryNav } from '@/content/navigation'
import { RegisterButton } from '@/components/ui/RegisterButton'
import { Brandmark } from './Brandmark'
import { MobileMenu } from './MobileMenu'
import { cn } from '@/lib/cn'

/**
 * Full-width header. Brief §14.
 *
 * This REPLACES the floating navy pill from §29.7 and, in doing so, returns to
 * the brief's original §14 behaviour: transparent over the homepage hero,
 * becoming solid Atlantic Navy after scrolling; solid immediately on interior
 * pages.
 *
 * The pill existed because an inset hero put the header on sand, which removed
 * the risk of text sitting over moving video. Going full-width brings that risk
 * back, so the hero carries a dedicated top scrim (see HeroMedia) and the
 * result is MEASURED — scripts/check-contrast.mjs samples the nav region as
 * well as the headline.
 *
 * Dropdown behaviour is unchanged (§14): click/focus driven with hover as an
 * enhancement, Escape closes and returns focus, never hover-only.
 */
export function Header() {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Only the homepage has media directly beneath the header.
  const overHero = pathname === '/'
  const solid = !overHero || scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120)
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-colors duration-300',
        solid
          ? 'border-b border-white/10 bg-navy shadow-[var(--shadow-nav)]'
          : 'bg-transparent',
      )}
    >
      <nav
        ref={navRef}
        aria-label="Primary"
        className={cn(
          // FIXED height, matching --header-h exactly. Content-driven height
          // let the bar wrap and grow at tight widths (108px at 1024, 88px at
          // 1280), which desynced the hero overlay and exposed a sliver of
          // page background. flex-nowrap makes overflow impossible to hide.
          'page-shell flex h-[4.5rem] flex-nowrap items-center justify-between',
          'gap-2 sm:gap-4 md:h-[5rem] md:gap-6',
        )}
      >
        <Brandmark className="min-w-0" />

        <div className="flex shrink-0 items-center gap-2">
          <ul className="hidden items-center gap-0.5 xl:flex">
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
                        'inline-flex min-h-[44px] items-center rounded-[var(--radius-pill)] px-2.5 py-2 2xl:px-3',
                        'font-sans text-sm font-semibold text-sand/85 transition-colors',
                        'hover:bg-white/10 hover:text-sand',
                        active &&
                          'text-sand underline decoration-gold decoration-2 underline-offset-[6px]',
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
                      'inline-flex min-h-[44px] items-center gap-1.5 rounded-[var(--radius-pill)] px-2.5 py-2 2xl:px-3',
                      'font-sans text-sm font-semibold text-sand/85 transition-colors',
                      'hover:bg-white/10 hover:text-sand',
                      active &&
                        'text-sand underline decoration-gold decoration-2 underline-offset-[6px]',
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
                      className="absolute left-0 top-[calc(100%+0.5rem)] min-w-[15rem] rounded-[var(--radius-card)] border border-white/10 bg-navy p-2 shadow-[var(--shadow-raised)]"
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

          {/*
            Hidden on phones so the full identity lockup — sponsor mark, event
            name and presenting partner — can be shown in full. Registration is
            not lost: the sticky bottom bar covers every page (§14), and every
            hero carries its own CTA. Client-directed.

            Visibility lives on a WRAPPER, not on the button's className.
            RegisterButton emits `inline-flex` itself, and a competing `hidden`
            is another display utility — which of the two wins is decided by
            stylesheet order, not class order, so it silently failed to hide.
          */}
          <div className="hidden md:block">
            <RegisterButton source="header" size="sm">
              Register
            </RegisterButton>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="inline-flex size-11 items-center justify-center rounded-[var(--radius-pill)] text-sand hover:bg-white/10 xl:hidden"
          >
            <span className="sr-only">Open menu</span>
            <span aria-hidden="true" className="text-xl leading-none">
              ☰
            </span>
          </button>
        </div>
      </nav>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
      />
    </header>
  )
}
