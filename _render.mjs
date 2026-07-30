import { chromium } from 'playwright'
import fs from 'node:fs'
const out='/private/tmp/claude-501/-Users-radstudios-Documents-Freelance-Josh-Stern-Florida-13-1-FLL-Race/5a546b09-9286-4038-889c-77438b9a1ff2/scratchpad'
const b=(p)=>'data:image/svg+xml;base64,'+fs.readFileSync(p).toString('base64')
const ly=b('assets/Photos/logos/Liquid Youth - SVG.svg')
const bh=b('assets/Photos/logos/Baptist Health - SVG.svg')
const br=await chromium.launch()
const pg=await br.newPage({viewport:{width:900,height:700},deviceScaleFactor:2})
await pg.setContent(`<body style="margin:0;background:#10233E;padding:24px;font-family:sans-serif">
<div style="color:#888;font:12px sans-serif">Liquid Youth SVG @ 380px</div>
<img src="${ly}" style="width:380px;display:block">
<div style="color:#888;font:12px sans-serif;margin-top:20px">Baptist Health SVG @ 220px</div>
<img src="${bh}" style="width:220px;display:block">
<div style="color:#888;font:12px sans-serif;margin-top:20px">Baptist Health SVG @ 220px on WHITE</div>
<div style="background:#fff;display:inline-block;padding:8px"><img src="${bh}" style="width:220px;display:block"></div>
</body>`)
await pg.waitForTimeout(500)
await pg.screenshot({path:out+'/svg-check.png'})
await br.close()
