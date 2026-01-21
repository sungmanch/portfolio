'use client'

import { motion } from 'framer-motion'
import type { TimelineMilestone } from '@/lib/data'

interface MilestoneProps {
  milestone: TimelineMilestone
  index: number
  isActive: boolean
  progress: number
}

const typeColors = {
  education: 'nova',
  career: 'pulsar',
  achievement: 'supernova',
  project: 'nova',
}

const typeLabels = {
  education: 'Education',
  career: 'Career',
  achievement: 'Achievement',
  project: 'Project',
}

export function Milestone({ milestone, index, isActive, progress }: MilestoneProps) {
  const color = typeColors[milestone.type]
  const isLeft = index % 2 === 0

  return (
    <div className={`relative flex items-center ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
      {/* Star node - positioned at left timeline on mobile, centered on desktop */}
      <motion.div
        className="absolute left-4 sm:left-6 -translate-x-1/2 z-10 lg:static lg:translate-x-0"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isActive ? [1, 1.2, 1] : 1,
          opacity: progress > 0.3 ? 1 : 0.3,
        }}
        transition={{
          scale: { duration: 2, repeat: isActive ? Infinity : 0 },
          opacity: { duration: 0.5 },
        }}
      >
        <div
          className={`
            relative w-6 h-6 rounded-full
            ${isActive ? `bg-${color} glow-${color}` : 'bg-cosmos border-2 border-star-dim'}
          `}
        >
          {isActive && (
            <motion.div
              className={`absolute inset-0 rounded-full bg-${color}`}
              animate={{ scale: [1, 2], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </div>
      </motion.div>

      {/* Card */}
      <motion.div
        className={`
          flex-1 ml-10 sm:ml-12 lg:ml-0
          ${isLeft ? 'lg:mr-12 lg:text-right' : 'lg:ml-12 lg:text-left'}
        `}
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        animate={{
          opacity: progress > 0.2 ? 1 : 0,
          x: progress > 0.2 ? 0 : isLeft ? -30 : 30,
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div
          className={`
            card p-4 sm:p-6 backdrop-blur-sm
            ${isActive ? 'border-nova/30 bg-nebula/80' : ''}
          `}
        >
          {/* Year badge */}
          <div className={`inline-flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3 flex-wrap ${isLeft ? 'lg:flex-row-reverse' : ''}`}>
            <span className={`text-${color} font-mono text-xl sm:text-2xl font-bold`}>
              {milestone.year}
            </span>
            <span
              className={`
                px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-mono rounded-full
                bg-${color}/10 text-${color} border border-${color}/30
              `}
            >
              {typeLabels[milestone.type]}
            </span>
            {milestone.current && (
              <span className="px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-mono rounded-full bg-supernova/20 text-supernova border border-supernova/50 animate-pulse">
                Current
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-display text-xl sm:text-2xl lg:text-3xl text-star-bright mb-1.5 sm:mb-2">
            {milestone.title}
          </h3>

          {/* Description */}
          <p className="text-star-dim text-xs sm:text-sm leading-relaxed whitespace-pre-line">
            {milestone.description}
          </p>

          {/* Project Cards */}
          {milestone.projects && milestone.projects.length > 0 && (
            <div className={`mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-cosmos`}>
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 ${isLeft ? 'lg:text-left' : ''}`}>
                {milestone.projects.map((project, idx) => (
                  <motion.div
                    key={idx}
                    className={`p-3 sm:p-4 rounded-lg transition-colors ${
                      project.featured
                        ? 'bg-nova/10 border-2 border-nova/50 hover:border-nova/70'
                        : 'bg-deep-space/50 border border-cosmos hover:border-nova/30'
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                  >
                    {project.featured && (
                      <span className="inline-block text-[10px] font-mono text-nova mb-1.5 sm:mb-2 px-1.5 py-0.5 bg-nova/20 rounded">
                        Featured Project
                      </span>
                    )}
                    <h4 className={`font-medium text-xs sm:text-sm mb-1 ${project.featured ? 'text-nova' : 'text-star-bright'}`}>
                      {project.name}
                    </h4>
                    <p className="text-star-dim text-[11px] sm:text-xs leading-relaxed">
                      {project.description}
                    </p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-1.5 sm:mt-2 text-nova text-[11px] sm:text-xs hover:underline"
                      >
                        View →
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
