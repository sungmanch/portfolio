'use client'

import { motion } from 'framer-motion'

interface ConstellationProps {
  progress: number
  nodeCount: number
}

export function Constellation({ progress, nodeCount }: ConstellationProps) {
  // Generate node positions for the constellation path
  const nodes = Array.from({ length: nodeCount }, (_, i) => {
    const yPos = (i / (nodeCount - 1)) * 100
    // Alternate left and right with some variation
    const xBase = i % 2 === 0 ? 30 : 70
    const xVariation = (Math.sin(i * 1.5) * 15)
    return {
      x: xBase + xVariation,
      y: yPos,
    }
  })

  // Create path string for the SVG line
  const pathData = nodes.reduce((path, node, i) => {
    if (i === 0) return `M ${node.x} ${node.y}`
    return `${path} L ${node.x} ${node.y}`
  }, '')

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#64ffda" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ff6b9d" stopOpacity="0.8" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background line (dim) */}
      <path
        d={pathData}
        fill="none"
        stroke="#1a1a24"
        strokeWidth="0.3"
        vectorEffect="non-scaling-stroke"
      />

      {/* Animated line */}
      <motion.path
        d={pathData}
        fill="none"
        stroke="url(#lineGradient)"
        strokeWidth="0.15"
        strokeLinecap="round"
        filter="url(#glow)"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: progress }}
        transition={{ duration: 0.1 }}
      />

      {/* Node circles */}
      {nodes.map((node, i) => {
        const nodeProgress = i / (nodeCount - 1)
        const isVisible = progress >= nodeProgress
        const isActive = Math.abs(progress - nodeProgress) < 0.1

        return (
          <motion.circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={isActive ? 1.2 : 0.8}
            fill={isVisible ? '#64ffda' : '#1a1a24'}
            filter={isActive ? 'url(#glow)' : undefined}
            initial={{ scale: 0 }}
            animate={{
              scale: isVisible ? 1 : 0,
              opacity: isVisible ? 1 : 0.3,
            }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          />
        )
      })}
    </svg>
  )
}
