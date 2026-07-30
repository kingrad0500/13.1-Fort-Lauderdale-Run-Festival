/**
 * Verification harness for the homepage hero identity lockup (§29.15).
 *
 * Checks the four things that can actually break it:
 *   1. horizontal overflow at every breakpoint
 *   2. "FORT LAUDERDALE" holding ONE line (it is longer than the copy it
 *      replaced, so the old clamp floor was not safe to inherit)
 *   3. both sponsor marks rendered, visible and above the minimum legible size
 *   4. non-text contrast of the reversed-out marks against the hero media,
 *      sampled from the BRIGHTEST backdrop pixel behind each mark — worst case,
 *      not average, because a thin serif hairline over a bright patch is the
 *      failure mode.
 *
 * Run with the dev server up: node scripts/check-hero-lockup.mjs
 */
import { chromium } from 'playwright'
import sharp from 'sharp'

const URL = process.env.BASE_URL ?? 'http://localhost:3000'
const WIDTHS = [320, 360, 375, 390, 414, 480, 640, 768, 834, 1024, 1180, 1280, 1440, 1680, 1920]

const srgb = (c) => {
  const v = c / 255
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
}
const lum = (r, g, b) => 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b)
const ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)

const browser = await chromium.launch()
const failures = []
const rows = []

for (const width of WIDTHS) {
  const page = await browser.newPage({ viewport: { width, height: 900 } })
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)

  const m = await page.evaluate(() => {
    const h1 = document.querySelector('h1')
    const imgs = [...h1.querySelectorAll('img')]
    const place = [...h1.querySelectorAll('span')].find((s) =>
      s.textContent.trim() === 'Fort Lauderdale',
    )
    const lineCount = (el) => {
      if (!el) return null
      const cs = getComputedStyle(el)
      const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2
      return Math.round(el.getBoundingClientRect().height / lh)
    }
    return {
      docOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      accName: h1.innerText.replace(/\s+/g, ' ').trim(),
      srText: h1.querySelector('.sr-only')?.textContent.replace(/\s+/g, ' ').trim(),
      placeLines: lineCount(place),
      placeRect: place ? place.getBoundingClientRect().toJSON() : null,
      imgs: imgs.map((i) => {
        const r = i.getBoundingClientRect()
        return { src: i.currentSrc.split('/').pop().slice(0, 40), w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y), visible: r.width > 0 && r.height > 0 }
      }),
      // Must ask for a VISIBLE cta: below md the header's button is display:none
      // and the mobile-menu one is closed, so the first match in DOM order is a
      // zero-height element and says nothing about what the user can see.
      ctaVisible: [...document.querySelectorAll('[data-register-cta]')].some(
        (el) => el.getBoundingClientRect().height > 0,
      ),
      // The lockup is taller than the headline it replaced, so the hero CTA is
      // the thing most likely to be pushed off the first screen.
      heroCtaInFold: (() => {
        const el = [...document.querySelectorAll('[data-register-cta]')].find(
          (e) => e.getBoundingClientRect().height > 0,
        )
        if (!el) return null
        const r = el.getBoundingClientRect()
        return Math.round(r.bottom)
      })(),
    }
  })

  // Worst-case backdrop luminance behind each mark: hide the lockup, shoot the
  // hero, and take the brightest pixel inside each mark's former box.
  const boxes = [...m.imgs.map((i) => ({ label: i.src, ...i })), m.placeRect ? { label: 'FORT LAUDERDALE', x: m.placeRect.x, y: m.placeRect.y, w: m.placeRect.width, h: m.placeRect.height } : null].filter(Boolean)
  await page.evaluate(() => { document.querySelector('h1').style.visibility = 'hidden' })
  const raw = await sharp(await page.screenshot({ clip: { x: 0, y: 0, width, height: 900 } }))
    .ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const shot = { width: raw.info.width, height: raw.info.height, data: raw.data }
  await page.evaluate(() => { document.querySelector('h1').style.visibility = '' })

  for (const b of boxes) {
    let worst = 0
    const x0 = Math.max(0, Math.floor(b.x)), x1 = Math.min(shot.width, Math.ceil(b.x + b.w))
    const y0 = Math.max(0, Math.floor(b.y)), y1 = Math.min(shot.height, Math.ceil(b.y + b.h))
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
      const i = (shot.width * y + x) << 2
      const L = lum(shot.data[i], shot.data[i + 1], shot.data[i + 2])
      if (L > worst) worst = L
    }
    // marks and headline are reversed-out white / sand
    const fg = b.label === 'FORT LAUDERDALE' ? lum(0xf6, 0xf0, 0xe6) : lum(255, 255, 255)
    const r = ratio(fg, worst)
    if (r < 3) failures.push(`${width}px — ${b.label}: worst-case contrast ${r.toFixed(2)}:1 (needs 3:1)`)
    rows.push({ width, item: b.label, contrast: +r.toFixed(2) })
  }

  if (m.docOverflow > 0) failures.push(`${width}px — horizontal overflow ${m.docOverflow}px`)
  if (m.placeLines !== 1) failures.push(`${width}px — "Fort Lauderdale" wrapped to ${m.placeLines} lines`)
  if (m.imgs.length !== 2) failures.push(`${width}px — expected 2 sponsor marks, found ${m.imgs.length}`)
  for (const i of m.imgs) {
    if (!i.visible) failures.push(`${width}px — ${i.src} not visible`)
    if (i.w < 90) failures.push(`${width}px — ${i.src} only ${i.w}px wide`)
  }
  if (!m.ctaVisible) failures.push(`${width}px — no register CTA rendered`)
  if (!/20th Annual Liquid Youth Fort Lauderdale Running Festival, presented by Baptist Health/.test(m.srText ?? ''))
    failures.push(`${width}px — h1 accessible name wrong: ${m.srText}`)

  console.log(
    `${String(width).padStart(4)}px  LY ${String(m.imgs[0]?.w ?? '—').padStart(3)}px  BH ${String(m.imgs[1]?.w ?? '—').padStart(3)}px  ` +
    `place ${m.placeLines}ln  overflow ${m.docOverflow}px  ctaBottom ${m.heroCtaInFold}px`,
  )
  await page.close()
}

console.log('\nWorst contrast per item:')
for (const item of [...new Set(rows.map((r) => r.item))]) {
  const rs = rows.filter((r) => r.item === item)
  const min = rs.reduce((a, b) => (a.contrast < b.contrast ? a : b))
  console.log(`  ${item.padEnd(26)} min ${min.contrast}:1 @ ${min.width}px`)
}

await browser.close()
if (failures.length) {
  console.log(`\n✗ ${failures.length} failure(s):`)
  for (const f of failures) console.log('  ' + f)
  process.exit(1)
}
console.log('\n✓ hero lockup passes at all widths')
