#!/usr/bin/env node
/**
 * Normalises source photography into `media/` for static import.
 *
 * Why this exists rather than a full derivative pipeline: next/image already
 * produces responsive AVIF and WebP at build time, and a *static import*
 * additionally gives us intrinsic width/height (so every image reserves its
 * space, per brief §16) and a blur placeholder for free.
 *
 * So this script only does what next/image cannot:
 *   1. Normalises filenames — the originals contain spaces, which cannot be
 *      statically imported.
 *   2. Caps the longest edge at 2560px and strips EXIF. One source file is
 *      1.5 MB; §16 requires optimised media and a site usable on slow mobile
 *      connections.
 *   3. Reports dimensions so crops can be checked against the inset hero
 *      requirement in website-plan.md §3.2 (wide landscape, headline space).
 *
 * Run: npm run media
 */

import { readdir, mkdir, stat, copyFile } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'
import sharp from 'sharp'

const SOURCE = 'assets/Photos'
const OUT = 'media'
const MAX_EDGE = 2560

function kebab(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const files = (await readdir(SOURCE)).filter((f) =>
  ['.jpg', '.jpeg', '.png'].includes(extname(f).toLowerCase()),
)

await mkdir(OUT, { recursive: true })

console.log(`\nNormalising ${files.length} images from ${SOURCE}/ -> ${OUT}/\n`)

const report = []

for (const file of files) {
  const src = join(SOURCE, file)
  const name = kebab(basename(file, extname(file)))
  const dest = join(OUT, `${name}.jpg`)

  const image = sharp(src).rotate()
  const meta = await image.metadata()
  const longest = Math.max(meta.width ?? 0, meta.height ?? 0)

  await image
    .resize({
      width: meta.width >= meta.height ? Math.min(meta.width, MAX_EDGE) : undefined,
      height: meta.height > meta.width ? Math.min(meta.height, MAX_EDGE) : undefined,
      withoutEnlargement: true,
    })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(dest)

  const before = (await stat(src)).size
  let after = (await stat(dest)).size

  // Several sources are already aggressively compressed, and re-encoding them
  // at q82 makes them BIGGER even after downscaling. When that happens the
  // original wins on BOTH size and resolution, so keep it under the normalised
  // name. next/image derives responsive AVIF/WebP from whichever we keep, and
  // it downscales at request time anyway — so nothing is lost by staying big.
  let kept = 'reencoded'
  if (after >= before) {
    await copyFile(src, dest)
    after = (await stat(dest)).size
    kept = 'original'
  }

  const out = await sharp(dest).metadata()
  const ratio = out.width / out.height

  report.push({
    file: `${name}.jpg`,
    dimensions: `${out.width}x${out.height}`,
    ratio: ratio.toFixed(2),
    landscape: ratio >= 1.6,
    before,
    after,
  })

  const saved = Math.round((1 - after / before) * 100)
  const note = kept === 'original' ? 'kept original (already smaller)' : `${saved}% smaller`
  console.log(
    `  ${name}.jpg`.padEnd(42) +
      `${out.width}x${out.height}`.padEnd(12) +
      `${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB  ${note}`,
  )
}

/*
 * Sponsor logos. Supplied at a uniform 2048x706 with alpha, which is far
 * larger than the ~200px they display at. Trimmed of surrounding transparency
 * so every mark optically fills its tile, then downsized.
 *
 * Trademarked artwork is never recoloured or altered — only resized. Where a
 * logo is white artwork and cannot sit on a light tile, that is handled by the
 * `tile` field in content/sponsors.ts, not by touching the file.
 */
const LOGO_SRC = 'assets/Photos/logos'
// public/, not media/ — these are referenced by path in next/image
// rather than static-imported, so they must be publicly served.
const LOGO_OUT = 'public/media/logos'
await mkdir(LOGO_OUT, { recursive: true })

// .jpg included: the supplied Baptist Health full-colour mark is a JPEG with
// no alpha. It is tightly cropped to the artwork, so it sits correctly on a
// white tile — but it must never be placed on a dark one, where its lack of
// transparency would show as a white box.
const logoFiles = (await readdir(LOGO_SRC)).filter((f) =>
  ['.png', '.jpg', '.jpeg', '.svg'].includes(extname(f).toLowerCase()),
)
// Note: "Baptist Health White.png" is the reversed-out presenting-partner mark
// used in the header lockup over dark media. It kebabs to
// baptist-health-white.png and is referenced by content/race.ts.

console.log(`\n  Sponsor logos (${logoFiles.length}):`)
for (const file of logoFiles) {
  const name = kebab(basename(file, extname(file)))
  const dest = join(LOGO_OUT, `${name}.png`)
  await sharp(join(LOGO_SRC, file))
    .trim({ threshold: 1 })
    .resize({ width: 560, height: 200, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9, palette: true })
    .toFile(dest)
  const before = (await stat(join(LOGO_SRC, file))).size
  const after = (await stat(dest)).size
  console.log(
    `    ${(name + '.png').padEnd(26)} ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`,
  )
}

/*
 * Open Graph social preview image. Brief §18: "Use a strong approved race
 * image for social previews." 1200x630 is the size every major platform
 * crops to, so producing it here means the preview is never a browser's
 * arbitrary crop of a 2880px hero.
 */
const OG_SOURCE = 'assets/Photos/homepage_ftlauderdale.jpg'
await mkdir('public', { recursive: true })
await sharp(OG_SOURCE)
  .resize(1200, 630, { fit: 'cover', position: 'attention' })
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile('public/og-image.jpg')
const ogSize = (await stat('public/og-image.jpg')).size
console.log(`\n  public/og-image.jpg              1200x630    ${(ogSize / 1024).toFixed(0)}KB  (social preview)`)

// Hero suitability check — website-plan.md §3.2 requires wide landscape crops
// (16:9 or wider) with space for the headline block.
const heroReady = report.filter((r) => r.landscape)
console.log(
  `\n  ${heroReady.length} of ${report.length} are 1.6:1 or wider and usable as inset hero media.`,
)
const notHero = report.filter((r) => !r.landscape)
if (notHero.length) {
  console.log(
    `  Not hero-shaped: ${notHero.map((r) => `${r.file} (${r.ratio}:1)`).join(', ')}`,
  )
}
console.log()
