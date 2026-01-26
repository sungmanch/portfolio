'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/Badge'
import { CATEGORY_CONFIG, type CosmosProject } from '@/lib/data'

interface ProjectCardProps {
  project: CosmosProject
  index: number
}

function StatusBadge({ status }: { status: CosmosProject['status'] }) {
  switch (status) {
    case 'active':
      return (
        <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          Active
        </span>
      )
    case 'archived':
      return (
        <span className="flex items-center gap-1.5 text-xs font-mono text-star-dim/50">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
          </svg>
          Archived
        </span>
      )
  }
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const categoryConfig = CATEGORY_CONFIG[project.category]

  return (
    <motion.article
      className="card card-hover group relative overflow-hidden flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      layout
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-nova/5 to-pulsar/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative p-5 sm:p-6 flex flex-col flex-1">
        {/* Header: Category pill + Status + Links */}
        <div className="flex items-start justify-between mb-4">
          <span
            className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded-full border"
            style={{
              color: categoryConfig.hex,
              borderColor: `${categoryConfig.hex}40`,
              backgroundColor: `${categoryConfig.hex}15`,
            }}
          >
            {categoryConfig.label}
          </span>

          <div className="flex items-center gap-2">
            <StatusBadge status={project.status} />
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-star-dim hover:text-nova transition-colors p-1"
                aria-label="View on GitHub"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-star-dim hover:text-nova transition-colors p-1"
                aria-label="View project"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-lg sm:text-xl text-star-bright mb-3 group-hover:text-nova transition-colors">
          {project.title}
        </h3>

        {/* Tagline + hover details */}
        <div className="mb-4 flex-1">
          <p className="text-star-dim text-sm leading-relaxed line-clamp-2">
            {project.tagline}
          </p>
          {(project.audience || project.value) && (
            <div className="mt-2 space-y-1 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              {project.audience && (
                <p className="text-xs text-star-dim/70">
                  <span className="text-star-dim/50 font-mono">For:</span>{' '}
                  {project.audience}
                </p>
              )}
              {project.value && (
                <p className="text-xs text-star-dim/70">
                  <span className="text-star-dim/50 font-mono">Value:</span>{' '}
                  {project.value}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 5).map((tag) => (
            <Badge key={tag} variant="default" size="sm">
              {tag}
            </Badge>
          ))}
          {project.tags.length > 5 && (
            <Badge variant="default" size="sm">
              +{project.tags.length - 5}
            </Badge>
          )}
        </div>

        {/* Footer divider + metadata */}
        <div className="border-t border-cosmos/50 pt-3 flex items-center justify-between opacity-60 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-1.5">
            {project.targetMarket.map((market) => (
              <span
                key={market}
                className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-pulsar/10 text-pulsar border border-pulsar/20"
              >
                {market.toUpperCase()}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {project.region.map((r) => (
                <span
                  key={r}
                  className="text-[10px] font-mono text-star-dim/70"
                >
                  {r === 'us' ? '🇺🇸' : '🇰🇷'}
                </span>
              ))}
            </div>
            <span className="text-[10px] font-mono text-star-dim/50">
              {project.year}
            </span>
          </div>
        </div>
      </div>

      {/* Category color indicator line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-50"
        style={{ backgroundColor: categoryConfig.hex }}
      />
    </motion.article>
  )
}
