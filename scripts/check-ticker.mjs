/**
 * Verification harness for the top-bar event ticker (§29.19).
 *
 * The marquee exists because the stationary row was hiding its own tail on a
 * phone. So the checks are about whether the information now genuinely arrives,
 * and whether making it move broke anything the stationary version got for free.
 *
 * Run with the dev server up: node scripts/check-ticker.mjs
 */
import { chromium } from 'playwright'

const URL = process.env.BASE_URL ?? 'http://localhost:3000'
const WIDTHS = [320, 375, 414, 768, 1024, 1440, 1920]

const browser = await chromium.launch()
const failures = []

// ---------------------------------------------------------------- motion
for (const width of WIDTHS) {
  const page = await browser.newPage({ viewport: { width, height: 800 } })
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)

  const m = await page.evaluate(async () => {
    const track = document.querySelector('.marquee-track')
    if (!track) return { missing: true }
    const copies = track.children
    const x = () => new DOMMatrixReadOnly(getComputedStyle(track).transform).m41
    const before = x()
    await new Promise((r) => setTimeout(r, 900))
    const after = x()
    return {
      moved: Math.abs(after - before),
      duration: getComputedStyle(track).animationDuration,
      playState: getComputedStyle(track).animationPlayState,
      copyCount: copies.length,
      copyWidths: [...copies].map((c) => Math.round(c.getBoundingClientRect().width)),
      secondCopyHidden: copies[1]?.getAttribute('aria-hidden') === 'true',
      docOverflow:
        document.documentElement.scrollWidth - document.documentElement.clientWidth,
      barHeight: Math.round(
        document.querySelector('.marquee-track').closest('.flex.h-11')
          ?.getBoundingClientRect().height ?? 0,
      ),
      pauseBtn: (() => {
        const b = [...document.querySelectorAll('button')].find((el) =>
          /ticker/i.test(el.textContent ?? ''),
        )
        if (!b) return null
        const r = b.getBoundingClientRect()
        return { w: Math.round(r.width), h: Math.round(r.height), pressed: b.getAttribute('aria-pressed') }
      })(),
    }
  })

  if (m.missing) {
    failures.push(`${width}px — marquee track not rendered`)
    await page.close()
    continue
  }
  if (m.moved < 5) failures.push(`${width}px — ticker is not moving (${m.moved.toFixed(1)}px in 0.9s)`)
  if (m.copyCount !== 2) failures.push(`${width}px — expected 2 copies, found ${m.copyCount}`)
  if (!m.secondCopyHidden) failures.push(`${width}px — duplicate copy is not aria-hidden (content announced twice)`)
  // A seamless -50% loop requires the two copies to be exactly equal width.
  if (m.copyWidths[0] !== m.copyWidths[1])
    failures.push(`${width}px — copies differ (${m.copyWidths.join(' vs ')}), loop will jump`)
  if (m.docOverflow > 0) failures.push(`${width}px — horizontal page overflow ${m.docOverflow}px`)
  if (!m.pauseBtn) failures.push(`${width}px — no pause control (WCAG 2.2.2)`)
  else if (m.pauseBtn.w < 44 || m.pauseBtn.h < 44)
    failures.push(`${width}px — pause control ${m.pauseBtn.w}x${m.pauseBtn.h}, under 44px`)

  console.log(
    `${String(width).padStart(4)}px  moved ${String(Math.round(m.moved)).padStart(3)}px/0.9s  ` +
      `dur ${m.duration}  copies ${m.copyWidths.join('/')}  bar ${m.barHeight}px  overflow ${m.docOverflow}px`,
  )
  await page.close()
}

// ---------------------------------------------------------------- pause
{
  const page = await browser.newPage({ viewport: { width: 375, height: 800 } })
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)
  const btn = page.locator('button', { hasText: /ticker/i }).first()
  await btn.click()
  await page.waitForTimeout(200)
  const stopped = await page.evaluate(async () => {
    const t = document.querySelector('.marquee-track')
    const x = () => new DOMMatrixReadOnly(getComputedStyle(t).transform).m41
    const a = x()
    await new Promise((r) => setTimeout(r, 700))
    return { delta: Math.abs(x() - a), pressed: document.activeElement?.getAttribute('aria-pressed') }
  })
  if (stopped.delta > 1) failures.push(`pause button did not stop the ticker (moved ${stopped.delta.toFixed(1)}px)`)
  if (stopped.pressed !== 'true') failures.push(`pause button aria-pressed is "${stopped.pressed}", expected "true"`)
  console.log(`\npause: moved ${stopped.delta.toFixed(1)}px after click, aria-pressed=${stopped.pressed}`)
  await page.close()
}

// -------------------------------------------------------- reduced motion
{
  const ctx = await browser.newContext({ viewport: { width: 375, height: 800 }, reducedMotion: 'reduce' })
  const page = await ctx.newPage()
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(700)
  const r = await page.evaluate(() => ({
    hasTrack: !!document.querySelector('.marquee-track'),
    scrollable: (() => {
      const el = [...document.querySelectorAll('div')].find(
        (d) => d.scrollWidth > d.clientWidth && d.className.includes('overflow-x-auto'),
      )
      return !!el
    })(),
  }))
  if (r.hasTrack) failures.push('reduced-motion still renders the moving marquee')
  if (!r.scrollable) failures.push('reduced-motion fallback is not a scrollable row')
  console.log(`reduced-motion: marquee=${r.hasTrack} scrollableFallback=${r.scrollable}`)
  await ctx.close()
}

// ------------------------------------------------------------------ CLS
{
  const page = await browser.newPage({ viewport: { width: 375, height: 800 } })
  await page.addInitScript(() => {
    window.__cls = 0
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value
    }).observe({ type: 'layout-shift', buffered: true })
  })
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(2000)
  const cls = await page.evaluate(() => window.__cls)
  if (cls > 0.02) failures.push(`hydration swap shifted layout: CLS ${cls.toFixed(4)}`)
  console.log(`CLS after hydration swap: ${cls.toFixed(4)}`)
  await page.close()
}

await browser.close()
if (failures.length) {
  console.log(`\n✗ ${failures.length} failure(s):`)
  for (const f of failures) console.log('  ' + f)
  process.exit(1)
}
console.log('\n✓ ticker passes')
