'use client'

import { motion } from 'framer-motion'
import type { MarketRegion } from '@/lib/data'

interface MapMarkerProps {
  region: MarketRegion
  label: string
  position: { x: number; y: number }
  isActive: boolean
  onClick: () => void
  projectCount: number
}

const regionColors: Record<MarketRegion, { color: string; className: string }> = {
  us: { color: '#64ffda', className: 'text-nova' },
  korea: { color: '#ff6b9d', className: 'text-supernova' },
}

export function MapMarker({
  region,
  label,
  position,
  isActive,
  onClick,
  projectCount,
}: MapMarkerProps) {
  const { color, className } = regionColors[region]

  return (
    <motion.g
      role="button"
      tabIndex={0}
      aria-label={`${label} — ${projectCount} projects`}
      aria-pressed={isActive}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      className="cursor-pointer outline-none"
      style={{ transformOrigin: `${position.x}px ${position.y}px` }}
      whileHover={{ scale: 1.3 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 200, damping: 15 }}
    >
      <title>{`${label}: ${projectCount} projects`}</title>

      {/* Outer pulse ring */}
      <motion.circle
        cx={position.x}
        cy={position.y}
        r={isActive ? 14 : 10}
        fill="none"
        stroke={color}
        strokeWidth={1}
        opacity={0.4}
        animate={
          isActive
            ? { r: [14, 22, 14], opacity: [0.4, 0, 0.4] }
            : { r: [10, 18, 10], opacity: [0.3, 0, 0.3] }
        }
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Second pulse ring (offset timing) */}
      <motion.circle
        cx={position.x}
        cy={position.y}
        r={isActive ? 14 : 10}
        fill="none"
        stroke={color}
        strokeWidth={0.5}
        opacity={0.2}
        animate={
          isActive
            ? { r: [14, 26, 14], opacity: [0.2, 0, 0.2] }
            : { r: [10, 22, 10], opacity: [0.15, 0, 0.15] }
        }
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Core glow */}
      <circle
        cx={position.x}
        cy={position.y}
        r={isActive ? 8 : 5}
        fill={color}
        opacity={0.15}
        filter="url(#marker-glow)"
      />

      {/* Inner dot */}
      <motion.circle
        cx={position.x}
        cy={position.y}
        r={isActive ? 5 : 3.5}
        fill={color}
        opacity={isActive ? 1 : 0.8}
        animate={isActive ? { opacity: [1, 0.7, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Label */}
      <text
        x={position.x}
        y={position.y + (region === 'korea' ? -18 : 24)}
        textAnchor="middle"
        className={`text-[11px] font-mono ${className}`}
        fill={color}
        opacity={isActive ? 1 : 0.7}
      >
        {label}
      </text>

      {/* Project count badge */}
      <text
        x={position.x}
        y={position.y + (region === 'korea' ? -30 : 36)}
        textAnchor="middle"
        className="text-[9px] font-mono"
        fill={color}
        opacity={0.5}
      >
        {projectCount} {projectCount === 1 ? 'project' : 'projects'}
      </text>
    </motion.g>
  )
}
