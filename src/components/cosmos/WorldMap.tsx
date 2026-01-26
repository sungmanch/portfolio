'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { MapMarker } from './MapMarker'
import type { MarketRegion } from '@/lib/data'
import { cosmosProjects } from '@/lib/data'
import { useMemo } from 'react'

interface WorldMapProps {
  activeRegions: MarketRegion[]
  onToggleRegion: (region: MarketRegion) => void
}

// Marker positions in SVG coordinate space (viewBox 0 0 1000 500)
const MARKER_POSITIONS = {
  us: { x: 230, y: 200 },
  korea: { x: 780, y: 180 },
} as const

export function WorldMap({ activeRegions, onToggleRegion }: WorldMapProps) {
  const isExpanded = activeRegions.length === 0

  const regionCounts = useMemo(() => ({
    us: cosmosProjects.filter((p) => p.region.includes('us')).length,
    korea: cosmosProjects.filter((p) => p.region.includes('korea')).length,
  }), [])

  // Determine which region to highlight on the map
  const highlightedRegion = activeRegions.length === 1 ? activeRegions[0] : null

  return (
    <div className="relative mb-8">
      <motion.div
        className="relative overflow-hidden rounded-xl border border-cosmos/60"
        animate={{
          height: isExpanded ? 400 : 150,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        style={{ height: 400 }}
      >
        {/* Map background subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-void/80 to-cosmos/40" />

        {/* SVG Map Layer */}
        <div className="absolute inset-0 p-4">
          <svg
            viewBox="0 0 1000 500"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Reuse defs from WorldMapSVG inline for marker glow */}
            <defs>
              <filter id="continent-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="marker-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Continent outlines - inline for single SVG context */}
            <ContinentPaths highlightedRegion={highlightedRegion} />

            {/* Dotted arc connector between markers */}
            <motion.path
              d={`M ${MARKER_POSITIONS.us.x} ${MARKER_POSITIONS.us.y} Q 505 60 ${MARKER_POSITIONS.korea.x} ${MARKER_POSITIONS.korea.y}`}
              fill="none"
              stroke="#9895a3"
              strokeWidth={0.8}
              strokeDasharray="4 6"
              opacity={0.25}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 2, duration: 1.5, ease: 'easeInOut' }}
            />

            {/* Map Markers */}
            <MapMarker
              region="us"
              label="United States"
              position={MARKER_POSITIONS.us}
              isActive={activeRegions.includes('us')}
              onClick={() => onToggleRegion('us')}
              projectCount={regionCounts.us}
            />
            <MapMarker
              region="korea"
              label="South Korea"
              position={MARKER_POSITIONS.korea}
              isActive={activeRegions.includes('korea')}
              onClick={() => onToggleRegion('korea')}
              projectCount={regionCounts.korea}
            />
          </svg>
        </div>

        {/* Guide text when expanded */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="absolute bottom-6 left-0 right-0 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ delay: 2.5, duration: 0.5 }}
            >
              <p className="text-star-dim/60 text-sm font-mono">
                Select a region to explore projects
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* "Show All" reset button when collapsed */}
        <AnimatePresence>
          {!isExpanded && (
            <motion.button
              className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-mono
                bg-cosmos/80 border border-star-dim/20 text-star-dim
                hover:border-nova/40 hover:text-nova transition-colors z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => {
                // Deselect all regions
                activeRegions.forEach((r) => onToggleRegion(r))
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Show All Regions
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

/**
 * Continent paths rendered inline (same SVG context as markers).
 * Simplified outlines with constellation-style strokes.
 */
function ContinentPaths({ highlightedRegion }: { highlightedRegion: MarketRegion | null }) {
  const continents = [
    {
      id: 'north-america',
      region: 'us' as MarketRegion,
      d: 'M 130,80 L 155,75 175,80 195,90 210,85 240,90 260,100 280,120 285,140 275,155 260,160 250,175 245,190 240,195 225,200 215,215 200,225 185,230 175,240 160,250 155,240 150,225 140,215 130,220 115,210 105,195 90,185 80,170 75,155 85,140 95,125 105,110 115,95 125,85 Z',
    },
    {
      id: 'south-america',
      region: null,
      d: 'M 230,270 L 245,260 260,265 275,275 280,290 285,310 280,330 275,350 265,365 255,375 245,385 235,390 225,380 220,365 215,345 218,325 220,310 222,295 225,280 Z',
    },
    {
      id: 'europe',
      region: null,
      d: 'M 450,95 L 465,90 480,85 500,90 510,95 520,100 525,110 520,120 510,130 500,135 490,130 480,125 470,120 460,115 455,105 Z',
    },
    {
      id: 'africa',
      region: null,
      d: 'M 460,175 L 480,170 500,175 520,180 530,195 535,215 530,240 525,265 515,285 505,300 495,310 485,315 475,310 465,295 458,275 455,255 450,235 448,215 450,195 455,185 Z',
    },
    {
      id: 'asia',
      region: 'korea' as MarketRegion,
      d: 'M 530,70 L 560,65 590,60 620,65 650,60 680,65 710,70 740,75 760,80 780,90 790,100 800,115 810,130 800,145 790,155 775,160 760,165 745,175 730,180 715,185 700,180 685,175 670,170 655,165 640,160 625,155 610,150 595,145 580,140 565,135 550,125 540,115 535,100 530,85 Z',
    },
    {
      id: 'oceania',
      region: null,
      d: 'M 780,290 L 800,285 820,290 840,300 850,315 845,330 830,340 815,335 800,325 790,310 785,300 Z M 860,310 L 870,305 880,310 875,320 865,318 Z',
    },
  ]

  return (
    <>
      {continents.map((continent, i) => {
        const isHighlighted = highlightedRegion && continent.region === highlightedRegion
        const strokeColor = isHighlighted
          ? continent.region === 'us'
            ? '#64ffda'
            : '#ff6b9d'
          : '#9895a3'

        return (
          <motion.path
            key={continent.id}
            d={continent.d}
            fill="none"
            stroke={strokeColor}
            strokeWidth={isHighlighted ? 1.5 : 0.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={isHighlighted ? 0.8 : 0.3}
            filter={isHighlighted ? 'url(#continent-glow)' : undefined}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: isHighlighted ? 0.8 : 0.3,
            }}
            transition={{
              pathLength: { delay: i * 0.15, duration: 1.5, ease: 'easeInOut' },
              opacity: { delay: i * 0.15, duration: 0.3 },
            }}
          />
        )
      })}
    </>
  )
}
