'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { cosmosProjects, CATEGORY_CONFIG } from '@/lib/data'

interface ShippingVelocityProps {
  className?: string
}

export function ShippingVelocity({ className = '' }: ShippingVelocityProps) {
  const shippedProjects = useMemo(() => {
    return cosmosProjects
      .filter((p) => p.year === '2026' && p.shippedInDays)
      .sort((a, b) => {
        if (a.launchDate && b.launchDate) {
          return new Date(a.launchDate).getTime() - new Date(b.launchDate).getTime()
        }
        return 0
      })
  }, [])

  const totalProjects = shippedProjects.length

  if (totalProjects === 0) return null

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.h3
        className="text-xl sm:text-2xl font-display text-star-bright mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <span className="text-nova">{totalProjects}</span> products shipped in a month,{' '}
        <span className="text-star-dim/60">January 2026</span>
      </motion.h3>

      {/* Simple project list */}
      <div className="space-y-3">
        {shippedProjects.map((project, index) => {
          const categoryColor = CATEGORY_CONFIG[project.category].hex

          return (
            <motion.div
              key={project.id}
              className="flex items-center gap-4 group"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.08 }}
            >
              {/* Color dot */}
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: categoryColor }}
              />

              {/* Project name */}
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-star-bright hover:text-nova transition-colors"
                >
                  {project.title}
                </a>
              ) : (
                <span className="text-star-bright">{project.title}</span>
              )}

              {/* Category tag */}
              <span
                className="text-xs font-mono px-2 py-0.5 rounded-full"
                style={{
                  color: categoryColor,
                  backgroundColor: `${categoryColor}15`,
                }}
              >
                {CATEGORY_CONFIG[project.category].label}
              </span>

              {/* Spacer line */}
              <div className="flex-1 h-px bg-cosmos/40 group-hover:bg-cosmos/60 transition-colors" />
            </motion.div>
          )
        })}
      </div>

      {/* Tagline */}
      <motion.p
        className="mt-8 text-star-dim/40 text-sm font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        One person. One problem. One week.
      </motion.p>
    </motion.div>
  )
}
