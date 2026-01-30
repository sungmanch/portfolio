import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const appDir = join(__dirname, '..', 'src', 'app')

// ============================================================
// ICON: Constellation S (32x32)
// ============================================================
const iconStars = [
  { x: 22, y: 8, color: '#64ffda' },
  { x: 14, y: 6, color: '#64ffda' },
  { x: 8, y: 8, color: '#64ffda' },
  { x: 10, y: 14, color: '#64ffda' },
  { x: 18, y: 16, color: '#a78bfa' },
  { x: 22, y: 22, color: '#a78bfa' },
  { x: 14, y: 26, color: '#a78bfa' },
  { x: 8, y: 24, color: '#a78bfa' },
]

function createIconSvg() {
  const stars = iconStars.map(s =>
    `<circle cx="${s.x}" cy="${s.y}" r="2" fill="${s.color}"/>`
  ).join('\n    ')

  const lines = iconStars.slice(0, -1).map((s, i) => {
    const next = iconStars[i + 1]
    return `<line x1="${s.x}" y1="${s.y}" x2="${next.x}" y2="${next.y}" stroke="url(#grad)" stroke-width="0.8" opacity="0.5"/>`
  }).join('\n    ')

  return `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#64ffda"/>
      <stop offset="100%" stop-color="#a78bfa"/>
    </linearGradient>
  </defs>
  <rect width="32" height="32" fill="#0a0a0f"/>
  ${lines}
  ${stars}
</svg>`
}

// ============================================================
// APPLE ICON: Constellation S (180x180)
// ============================================================
function createAppleIconSvg() {
  const scale = 180 / 32
  const stars = iconStars.map(s => {
    const x = s.x * scale
    const y = s.y * scale
    return `<circle cx="${x}" cy="${y}" r="8" fill="${s.color}" opacity="0.3"/>
    <circle cx="${x}" cy="${y}" r="5" fill="${s.color}"/>
    <circle cx="${x}" cy="${y}" r="2" fill="#ffffff" opacity="0.7"/>`
  }).join('\n    ')

  const lines = iconStars.slice(0, -1).map((s, i) => {
    const next = iconStars[i + 1]
    return `<line x1="${s.x * scale}" y1="${s.y * scale}" x2="${next.x * scale}" y2="${next.y * scale}" stroke="url(#grad)" stroke-width="2" opacity="0.4"/>`
  }).join('\n    ')

  return `<svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#64ffda"/>
      <stop offset="100%" stop-color="#a78bfa"/>
    </linearGradient>
  </defs>
  <rect width="180" height="180" fill="#0a0a0f"/>
  ${lines}
  ${stars}
</svg>`
}

// ============================================================
// OG IMAGE: Shipping Velocity (1200x630)
// ============================================================
const trajectoryColors = [
  '#fbbf24', '#34d399', '#38bdf8', '#64ffda',
  '#a78bfa', '#ff6b9d', '#f97316',
]

async function createOgImage() {
  const centerX = 600
  const centerY = 260

  const element = {
    type: 'div',
    props: {
      style: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0a0f',
        position: 'relative',
      },
      children: [
        // Stars background
        ...Array.from({ length: 60 }).map((_, i) => ({
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              width: (i % 3) + 1,
              height: (i % 3) + 1,
              backgroundColor: '#e8e4d9',
              borderRadius: '50%',
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
              opacity: 0.3 + (i % 5) * 0.1,
            },
          },
        })),
        // Central glow
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              width: 400,
              height: 400,
              left: centerX - 200,
              top: centerY - 200,
              background: 'radial-gradient(circle, rgba(100, 255, 218, 0.15) 0%, rgba(167, 139, 250, 0.1) 40%, transparent 70%)',
              borderRadius: '50%',
            },
          },
        },
        // Trajectories
        ...trajectoryColors.flatMap((color, i) => {
          const angle = (i * 360) / 7 - 90
          const radian = (angle * Math.PI) / 180
          const length = 220 + (i % 3) * 40
          const endX = centerX + Math.cos(radian) * length
          const endY = centerY + Math.sin(radian) * length

          return [
            // Line
            {
              type: 'div',
              props: {
                style: {
                  position: 'absolute',
                  left: centerX,
                  top: centerY,
                  width: length,
                  height: 3,
                  background: `linear-gradient(to right, rgba(100, 255, 218, 0.3), ${color})`,
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: '0 50%',
                },
              },
            },
            // Endpoint glow
            {
              type: 'div',
              props: {
                style: {
                  position: 'absolute',
                  left: endX - 15,
                  top: endY - 15,
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  backgroundColor: color,
                  opacity: 0.25,
                },
              },
            },
            // Endpoint core
            {
              type: 'div',
              props: {
                style: {
                  position: 'absolute',
                  left: endX - 8,
                  top: endY - 8,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: color,
                },
              },
            },
          ]
        }),
        // Center point
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              left: centerX - 25,
              top: centerY - 25,
              width: 50,
              height: 50,
              borderRadius: '50%',
              backgroundColor: '#64ffda',
              opacity: 0.15,
            },
          },
        },
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              left: centerX - 15,
              top: centerY - 15,
              width: 30,
              height: 30,
              borderRadius: '50%',
              backgroundColor: '#64ffda',
            },
          },
        },
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              left: centerX - 6,
              top: centerY - 6,
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#ffffff',
            },
          },
        },
        // Main text
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              bottom: 140,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            },
            children: {
              type: 'div',
              props: {
                style: {
                  fontSize: 72,
                  fontWeight: 800,
                  color: '#e8e4d9',
                  letterSpacing: '-0.03em',
                },
                children: '7 weeks. 7 projects. No settle.',
              },
            },
          },
        },
        // Bottom attribution
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              bottom: 50,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: '#64ffda',
                  },
                },
              },
              {
                type: 'div',
                props: {
                  style: { fontSize: 24, color: '#9895a3', fontWeight: 500 },
                  children: 'Sungman Cho',
                },
              },
              {
                type: 'div',
                props: {
                  style: { fontSize: 24, color: '#64ffda' },
                  children: '·',
                },
              },
              {
                type: 'div',
                props: {
                  style: { fontSize: 24, color: '#64ffda' },
                  children: 'sungman.world',
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: '#a78bfa',
                  },
                },
              },
            ],
          },
        },
      ],
    },
  }

  const svg = await satori(element, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Inter',
        data: await fetch('https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff').then(r => r.arrayBuffer()),
        weight: 400,
        style: 'normal',
      },
      {
        name: 'Inter',
        data: await fetch('https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBWYAZ9hjp-Ek-_EeA.woff').then(r => r.arrayBuffer()),
        weight: 800,
        style: 'normal',
      },
    ],
  })

  return svg
}

// ============================================================
// MAIN
// ============================================================
async function main() {
  console.log('Generating static images...')

  // Icon (32x32)
  console.log('  → icon.png (32x32)')
  const iconSvg = createIconSvg()
  const iconResvg = new Resvg(iconSvg)
  const iconPng = iconResvg.render().asPng()
  writeFileSync(join(appDir, 'icon.png'), iconPng)

  // Apple Icon (180x180)
  console.log('  → apple-icon.png (180x180)')
  const appleIconSvg = createAppleIconSvg()
  const appleResvg = new Resvg(appleIconSvg)
  const appleIconPng = appleResvg.render().asPng()
  writeFileSync(join(appDir, 'apple-icon.png'), appleIconPng)

  // OG Image (1200x630)
  console.log('  → opengraph-image.png (1200x630)')
  const ogSvg = await createOgImage()
  const ogResvg = new Resvg(ogSvg, {
    fitTo: { mode: 'width', value: 1200 },
  })
  const ogPng = ogResvg.render().asPng()
  writeFileSync(join(appDir, 'opengraph-image.png'), ogPng)

  // Twitter Image (same as OG)
  console.log('  → twitter-image.png (1200x630)')
  writeFileSync(join(appDir, 'twitter-image.png'), ogPng)

  console.log('Done! Images generated in src/app/')
}

main().catch(console.error)
