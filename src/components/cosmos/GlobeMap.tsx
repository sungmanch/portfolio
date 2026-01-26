'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import type { MarketRegion } from '@/lib/data'
import { cosmosProjects } from '@/lib/data'

// Dynamic import with wrapper for proper ref forwarding in Next.js
const Globe = dynamic(() => import('./GlobeWrapper'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-star-dim/60 text-sm font-mono">Entering cosmos...</div>
    </div>
  ),
})

interface GlobeMapProps {
  activeRegions: MarketRegion[]
  onToggleRegion: (region: MarketRegion) => void
}

// Location coordinates
const LOCATIONS = {
  us: { lat: 37.0902, lng: -95.7129, name: 'United States' },
  korea: { lat: 37.5665, lng: 126.978, name: 'South Korea' },
} as const

// Arc data for connection between US and Korea
const arcData = [
  {
    startLat: LOCATIONS.us.lat,
    startLng: LOCATIONS.us.lng,
    endLat: LOCATIONS.korea.lat,
    endLng: LOCATIONS.korea.lng,
    color: ['#64ffda', '#ff6b9d'],
  },
]

// Region colors matching the theme
const REGION_COLORS: Record<MarketRegion, string> = {
  us: '#64ffda',
  korea: '#ff6b9d',
}

// Generate random stars for the background
function generateStars(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.7 + 0.3,
    delay: Math.random() * 3,
  }))
}

const STARS = generateStars(80)

export function GlobeMap({ activeRegions, onToggleRegion }: GlobeMapProps) {
  const globeRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [globeReady, setGlobeReady] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  const isExpanded = activeRegions.length === 0

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        // Expanded: 70vh, Collapsed: 250px
        const height = isExpanded ? Math.min(window.innerHeight * 0.7, 700) : 250
        setDimensions({ width, height })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [isExpanded])

  // Calculate project counts per region
  const regionCounts = {
    us: cosmosProjects.filter((p) => p.region.includes('us')).length,
    korea: cosmosProjects.filter((p) => p.region.includes('korea')).length,
  }

  // Points data for markers
  const pointsData = [
    {
      lat: LOCATIONS.us.lat,
      lng: LOCATIONS.us.lng,
      region: 'us' as MarketRegion,
      label: LOCATIONS.us.name,
      count: regionCounts.us,
      color: REGION_COLORS.us,
      isActive: activeRegions.includes('us'),
    },
    {
      lat: LOCATIONS.korea.lat,
      lng: LOCATIONS.korea.lng,
      region: 'korea' as MarketRegion,
      label: LOCATIONS.korea.name,
      count: regionCounts.korea,
      color: REGION_COLORS.korea,
      isActive: activeRegions.includes('korea'),
    },
  ]

  // Auto-rotate when not hovered and no region selected
  useEffect(() => {
    if (!globeReady || !globeRef.current) return
    const controls = globeRef.current.controls()
    if (controls) {
      controls.autoRotate = !isHovered && isExpanded
      controls.autoRotateSpeed = 0.3
    }
  }, [isHovered, isExpanded, globeReady])

  // Fly to region when selected
  useEffect(() => {
    if (!globeReady || !globeRef.current) return
    if (activeRegions.length === 1) {
      const region = activeRegions[0]
      const location = LOCATIONS[region]
      globeRef.current.pointOfView(
        { lat: location.lat, lng: location.lng, altitude: 2.5 },
        1000
      )
    }
  }, [activeRegions, globeReady])

  // Handle globe ready event
  const handleGlobeReady = useCallback(() => {
    setGlobeReady(true)
  }, [])

  // Initial globe setup
  useEffect(() => {
    if (!globeReady || !globeRef.current) return

    // Set initial view to US - bigger globe for immersive feel
    globeRef.current.pointOfView(
      { lat: 30, lng: -95, altitude: 1.5 },
      0
    )

    // Configure controls
    const controls = globeRef.current.controls()
    if (controls) {
      controls.enableZoom = false
      controls.autoRotate = false
      controls.autoRotateSpeed = 0.3
    }

    // Start rotating after 2 seconds
    const timer = setTimeout(() => {
      const ctrl = globeRef.current?.controls()
      if (ctrl) {
        ctrl.autoRotate = true
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [globeReady])

  // Handle point click
  const handlePointClick = useCallback(
    (point: any) => {
      if (point?.region) {
        onToggleRegion(point.region)
      }
    },
    [onToggleRegion]
  )

  return (
    <div className="relative mb-6" ref={containerRef}>
      <motion.div
        className="relative overflow-hidden rounded-2xl"
        animate={{
          height: isExpanded ? '70vh' : 250,
          maxHeight: isExpanded ? 700 : 250,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 25 }}
        style={{ minHeight: isExpanded ? 500 : 250 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Deep space background with multiple gradient layers */}
        <div className="absolute inset-0 bg-[#030014]" />

        {/* Radial gradient for depth - cosmic void effect */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 30% 20%, rgba(100, 255, 218, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, rgba(255, 107, 157, 0.06) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.04) 0%, transparent 70%)
            `
          }}
        />

        {/* Animated stars */}
        <div className="absolute inset-0 overflow-hidden">
          {STARS.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size,
                height: star.size,
              }}
              animate={{
                opacity: [star.opacity * 0.5, star.opacity, star.opacity * 0.5],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2 + star.delay,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: star.delay,
              }}
            />
          ))}
        </div>

        {/* Subtle nebula effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at 20% 30%, rgba(100, 255, 218, 0.03) 0%, transparent 40%),
              radial-gradient(ellipse at 80% 70%, rgba(255, 107, 157, 0.03) 0%, transparent 40%)
            `,
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Vignette effect for depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 150px 50px rgba(0, 0, 0, 0.6)',
          }}
        />

        {/* Globe container - centered with slight offset for visual interest */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Globe
            forwardRef={globeRef}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            backgroundImageUrl=""
            backgroundColor="rgba(0,0,0,0)"
            width={dimensions.width}
            height={dimensions.height}
            atmosphereColor="#64ffda"
            atmosphereAltitude={0.2}
            // Points (markers)
            pointsData={pointsData}
            pointLat="lat"
            pointLng="lng"
            pointColor={(d: any) => d.color}
            pointAltitude={(d: any) => (d.isActive ? 0.15 : 0.08)}
            pointRadius={(d: any) => (d.isActive ? 3 : 2)}
            pointsMerge={false}
            onPointClick={handlePointClick}
            // Arcs
            arcsData={arcData}
            arcColor="color"
            arcDashLength={0.4}
            arcDashGap={0.2}
            arcDashAnimateTime={2000}
            arcStroke={0.8}
            arcAltitudeAutoScale={0.3}
            // HTML Labels - two lines: country name + project count
            htmlElementsData={pointsData}
            htmlLat="lat"
            htmlLng="lng"
            htmlAltitude={0.05}
            htmlElement={(d: any) => {
              const el = document.createElement('div')
              el.style.cssText = `
                display: flex;
                flex-direction: column;
                align-items: center;
                cursor: pointer;
                pointer-events: auto;
                transform: translateX(-50%);
              `
              el.innerHTML = `
                <div style="
                  font-family: ui-monospace, monospace;
                  font-size: 14px;
                  font-weight: 500;
                  color: ${d.color};
                  text-shadow: 0 0 10px ${d.color}80, 0 2px 4px rgba(0,0,0,0.8);
                  white-space: nowrap;
                ">${d.label}</div>
                <div style="
                  font-family: ui-monospace, monospace;
                  font-size: 11px;
                  color: ${d.color}99;
                  text-shadow: 0 2px 4px rgba(0,0,0,0.8);
                  margin-top: 2px;
                ">${d.count} projects</div>
              `
              el.onclick = () => onToggleRegion(d.region)
              return el
            }}
            // Rings (pulse effect)
            ringsData={pointsData.filter((p) => p.isActive)}
            ringLat="lat"
            ringLng="lng"
            ringColor={(d: any) => () => d.color}
            ringMaxRadius={4}
            ringPropagationSpeed={2}
            ringRepeatPeriod={1000}
            // Events
            onGlobeReady={handleGlobeReady}
          />
        </div>

        {/* Guide text when expanded - more dramatic positioning */}
        <AnimatePresence>
          {isExpanded && globeReady && (
            <motion.div
              className="absolute bottom-24 left-0 right-0 text-center pointer-events-none z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              <p className="text-star-dim/50 text-sm font-mono tracking-wide">
                Select a region to explore
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* "Show All" reset button when collapsed */}
        <AnimatePresence>
          {!isExpanded && (
            <motion.button
              className="absolute top-4 right-4 px-4 py-2 rounded-full text-xs font-mono
                bg-void/80 backdrop-blur-sm border border-star-dim/20 text-star-dim
                hover:border-nova/40 hover:text-nova transition-colors z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => {
                activeRegions.forEach((r) => onToggleRegion(r))
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Show All Regions
            </motion.button>
          )}
        </AnimatePresence>

        {/* Region selector buttons - floating at bottom with glass effect */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 z-10 px-4">
          {(['us', 'korea'] as MarketRegion[]).map((region) => (
            <motion.button
              key={region}
              onClick={() => onToggleRegion(region)}
              className={`flex flex-col items-center px-6 py-3 rounded-xl text-sm font-mono transition-all
                backdrop-blur-md
                ${
                  activeRegions.includes(region)
                    ? 'bg-void/70 border-2'
                    : 'bg-void/40 border border-white/10 hover:bg-void/60 hover:border-white/20'
                }`}
              style={{
                borderColor: activeRegions.includes(region)
                  ? REGION_COLORS[region]
                  : undefined,
                boxShadow: activeRegions.includes(region)
                  ? `0 0 30px ${REGION_COLORS[region]}30, inset 0 0 20px ${REGION_COLORS[region]}10`
                  : '0 4px 20px rgba(0, 0, 0, 0.3)',
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Country name with indicator */}
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: REGION_COLORS[region],
                    boxShadow: `0 0 8px ${REGION_COLORS[region]}`,
                  }}
                />
                <span
                  style={{
                    color: activeRegions.includes(region)
                      ? REGION_COLORS[region]
                      : '#e2e0e7',
                  }}
                >
                  {LOCATIONS[region].name}
                </span>
              </div>
              {/* Project count on second line */}
              <span
                className="text-xs mt-1 opacity-60"
                style={{
                  color: activeRegions.includes(region)
                    ? REGION_COLORS[region]
                    : '#9895a3',
                }}
              >
                {regionCounts[region]} projects
              </span>
            </motion.button>
          ))}
        </div>

        {/* Subtle border glow */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: `
              inset 0 0 0 1px rgba(100, 255, 218, 0.1),
              0 0 60px -20px rgba(100, 255, 218, 0.2)
            `,
          }}
        />
      </motion.div>
    </div>
  )
}
