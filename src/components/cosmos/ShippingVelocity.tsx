'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { cosmosProjects, CATEGORY_CONFIG, type CosmosProject } from '@/lib/data'

interface ShippingVelocityProps {
  className?: string
}

// January 2026 has 31 days
const DAYS_IN_MONTH = 31

export function ShippingVelocity({ className = '' }: ShippingVelocityProps) {
  // Get 2026 projects with shipping data
  const shippedProjects = useMemo(() => {
    return cosmosProjects
      .filter((p) => p.year === '2026' && p.shippedInDays)
      .sort((a, b) => {
        // Sort by launch date
        if (a.launchDate && b.launchDate) {
          return new Date(a.launchDate).getTime() - new Date(b.launchDate).getTime()
        }
        return 0
      })
  }, [])

  const totalProjects = shippedProjects.length
  const currentMonth = 'January'
  const currentYear = '2026'

  if (totalProjects === 0) return null

  // Generate day markers for the calendar header
  const dayMarkers = [1, 7, 14, 21, 28]

  return (
    <motion.div
      className={`relative rounded-xl border border-cosmos/60 bg-gradient-to-b from-void/80 to-cosmos/40 p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Stats Headline */}
      <div className="mb-6">
        <motion.div
          className="flex items-center gap-3 mb-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-2xl">🚀</span>
          <h3 className="text-xl font-bold text-star-bright">
            <span className="text-nova">{totalProjects}</span> products shipped in{' '}
            <span className="text-supernova">{currentMonth} {currentYear}</span>
          </h3>
        </motion.div>
        <motion.p
          className="text-star-dim/70 text-sm font-mono ml-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          One person. One problem. One week.
        </motion.p>
      </div>

      {/* Calendar Header - Day markers */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-32 flex-shrink-0" /> {/* Spacer for project name column */}
        <div className="flex-1 relative h-6">
          {dayMarkers.map((day) => (
            <div
              key={day}
              className="absolute text-xs font-mono text-star-dim/50"
              style={{ left: `${((day - 1) / DAYS_IN_MONTH) * 100}%` }}
            >
              {day}
            </div>
          ))}
        </div>
        <div className="w-20 flex-shrink-0" /> {/* Spacer for days column */}
      </div>

      {/* Timeline Bars */}
      <div className="space-y-4">
        {shippedProjects.map((project, index) => (
          <ProjectBar
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-nova/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-radial from-supernova/5 to-transparent pointer-events-none" />
    </motion.div>
  )
}

interface ProjectBarProps {
  project: CosmosProject
  index: number
  maxDays: number
}

function ProjectBar({ project, index, maxDays }: ProjectBarProps) {
  const categoryColor = CATEGORY_CONFIG[project.category].hex
  const barWidthPercent = ((project.shippedInDays || 7) / 14) * 100 // 14 days = 100%
  const days = project.shippedInDays || 7

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + index * 0.1 }}
    >
      <div className="flex items-center gap-4">
        {/* Project name */}
        <div className="w-40 flex-shrink-0">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-star-bright hover:text-nova transition-colors truncate block"
            >
              {project.title}
            </a>
          ) : (
            <span className="text-sm font-medium text-star-bright truncate block">
              {project.title}
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div className="flex-1 h-6 bg-cosmos/60 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full rounded-full relative"
            style={{ backgroundColor: categoryColor }}
            initial={{ width: 0 }}
            animate={{ width: `${barWidthPercent}%` }}
            transition={{
              delay: 0.5 + index * 0.15,
              duration: 0.8,
              ease: 'easeOut',
            }}
          >
            {/* Animated shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{
                delay: 1 + index * 0.15,
                duration: 0.8,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          {/* Category label on bar */}
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-void/80 font-medium"
            style={{ opacity: barWidthPercent > 30 ? 1 : 0 }}
          >
            {CATEGORY_CONFIG[project.category].label}
          </span>
        </div>

        {/* Days count */}
        <motion.div
          className="w-20 text-right flex-shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 + index * 0.15 }}
        >
          <span className="text-sm font-mono" style={{ color: categoryColor }}>
            {days} days
          </span>
        </motion.div>
      </div>

      {/* Launch date (subtle) */}
      {project.launchDate && (
        <motion.div
          className="ml-44 mt-1 text-xs text-star-dim/40 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 + index * 0.1 }}
        >
          Launched {new Date(project.launchDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })}
        </motion.div>
      )}
    </motion.div>
  )
}
