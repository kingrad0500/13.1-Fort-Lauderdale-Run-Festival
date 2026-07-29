#!/usr/bin/env node
/**
 * Encodes hero video derivatives. Brief §16:
 *   "Optimize hero video and provide smaller mobile versions."
 *   "Video never autoplays with sound."
 *   "A strong poster image appears before the video loads."
 *
 * Produces, from a single source:
 *   runners-desktop.mp4           — 1280w, for wide viewports
 *   runners-mobile.mp4            — 720w, for phones
 *   runners-poster.jpg            — first-frame still, so there is no visible
 *                                   jump when playback starts
 *
 * The AUDIO TRACK IS REMOVED entirely (`-an`). That is deliberate and belt-and-
 * braces: `muted` already satisfies §16, but a file with no audio stream cannot
 * ever play sound even if an attribute is lost in a future edit — and it is
 * free bytes back.
 *
 * NO WEBM. VP9 is usually 30-50% smaller than H.264, so it was tried — and on
 * a clip this short it came out LARGER at matched quality (866 KB vs 829 KB
 * desktop, 397 KB vs 298 KB mobile). Shipping a second, bigger file for no
 * gain is worse than not shipping it. Re-test if the source is ever replaced
 * with a longer clip, where VP9 usually wins.
 *
 * Usage: npm run video
 */

import { execFileSync } from 'node:child_process'
import { mkdir, stat } from 'node:fs/promises'
import ffmpeg from 'ffmpeg-static'

const SOURCE = 'assets/Videos/Runners video.mp4'
const OUT = 'public/media'

await mkdir(OUT, { recursive: true })

const run = (args) =>
  execFileSync(ffmpeg, ['-y', '-loglevel', 'error', ...args], { stdio: 'pipe' })

const size = async (p) => ((await stat(p)).size / 1024).toFixed(0)

console.log('\nEncoding hero video derivatives\n')
console.log(`  source ${(await size(SOURCE))} KB`)

const variants = [
  { name: 'desktop', width: 1280, crf: 26 },
  { name: 'mobile', width: 720, crf: 28 },
]

for (const v of variants) {
  const mp4 = `${OUT}/runners-${v.name}.mp4`

  run([
    '-i', SOURCE,
    '-an',                                  // strip audio entirely (§16)
    '-vf', `scale=${v.width}:-2`,
    '-c:v', 'libx264',
    '-profile:v', 'main',
    '-crf', String(v.crf),
    '-preset', 'slow',
    '-movflags', '+faststart',              // metadata first, so it starts sooner
    '-pix_fmt', 'yuv420p',
    mp4,
  ])

  console.log(`  ${v.name.padEnd(8)} ${v.width}w   mp4 ${(await size(mp4)).padStart(5)} KB`)
}

// Poster from the FIRST frame, so there is no visual jump when playback begins.
const poster = `${OUT}/runners-poster.jpg`
run([
  '-i', SOURCE,
  '-vf', 'select=eq(n\\,0),scale=1280:-2',
  '-frames:v', '1',
  '-q:v', '4',
  poster,
])
console.log(`  poster   1280w  jpg ${(await size(poster)).padStart(5)} KB`)
console.log()
