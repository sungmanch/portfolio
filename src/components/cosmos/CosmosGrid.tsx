'use client'

import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProjectCard } from './ProjectCard'
import { FilterTabs, type FilterCategory } from './FilterTabs'
import { GlobeMap } from './GlobeMap'
import { ShippingVelocity } from './ShippingVelocity'
import { cosmosProjects, CATEGORY_CONFIG, type TargetMarket, type MarketRegion } from '@/lib/data'

// Mini preview card for initial state
function ProjectPreviewCard({ project, onClick }: {
  project: typeof cosmosProjects[0]
  onClick: () => void
}) {
  const categoryConfig = CATEGORY_CONFIG[project.category]

  return (
    <motion.button
      onClick={onClick}
      className="group text-left p-3 rounded-lg border border-cosmos/40 bg-void/50
        hover:border-nova/30 hover:bg-cosmos/30 transition-all duration-300"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start gap-3">
        {/* Category color indicator */}
        <div
          className="w-1 h-full min-h-[40px] rounded-full flex-shrink-0"
          style={{ backgroundColor: categoryConfig.hex }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-sm text-star-bright truncate group-hover:text-nova transition-colors">
              {project.title}
            </h4>
            {project.status === 'active' && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
            )}
          </div>
          <p className="text-xs text-star-dim/70 line-clamp-1">
            {project.tagline}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span
              className="text-[9px] font-mono px-1.5 py-0.5 rounded-full"
              style={{
                color: categoryConfig.hex,
                backgroundColor: `${categoryConfig.hex}15`,
                border: `1px solid ${categoryConfig.hex}30`
              }}
            >
              {categoryConfig.label}
            </span>
            <span className="text-[10px] text-star-dim/50">
              {project.region.map(r => r === 'us' ? '🇺🇸' : '🇰🇷').join(' ')}
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  )
}

export function CosmosGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')
  const [activeMarkets, setActiveMarkets] = useState<TargetMarket[]>([])
  const [activeRegions, setActiveRegions] = useState<MarketRegion[]>([])
  const projectsRef = useRef<HTMLDivElement>(null)
  const prevRegionCount = useRef(0)

  const toggleMarket = useCallback((market: TargetMarket) => {
    setActiveMarkets((prev) =>
      prev.includes(market) ? prev.filter((m) => m !== market) : [...prev, market]
    )
  }, [])

  const toggleRegion = useCallback((region: MarketRegion) => {
    setActiveRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    )
  }, [])

  // Smooth scroll to projects when first region is selected
  useEffect(() => {
    if (activeRegions.length > 0 && prevRegionCount.current === 0) {
      const timer = setTimeout(() => {
        projectsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 400)
      return () => clearTimeout(timer)
    }
    prevRegionCount.current = activeRegions.length
  }, [activeRegions])

  const hasRegionSelected = activeRegions.length > 0

  const filteredProjects = useMemo(() => {
    let projects = cosmosProjects

    if (activeFilter === 'featured') {
      projects = projects.filter((p) => p.featured)
    } else if (activeFilter !== 'all') {
      projects = projects.filter((p) => p.category === activeFilter)
    }

    if (activeMarkets.length > 0) {
      projects = projects.filter((p) =>
        activeMarkets.some((m) => p.targetMarket.includes(m))
      )
    }

    if (activeRegions.length > 0) {
      projects = projects.filter((p) =>
        activeRegions.some((r) => p.region.includes(r))
      )
    }

    return projects
  }, [activeFilter, activeMarkets, activeRegions])

  // Get featured projects for preview (when no region selected)
  const previewProjects = useMemo(() => {
    return cosmosProjects
      .filter(p => p.year === '2026') // Show 2026 projects as preview
      .slice(0, 6)
  }, [])

  const counts = useMemo(() => {
    return {
      all: cosmosProjects.length,
      featured: cosmosProjects.filter((p) => p.featured).length,
      productivity: cosmosProjects.filter((p) => p.category === 'productivity').length,
      sales: cosmosProjects.filter((p) => p.category === 'sales').length,
      education: cosmosProjects.filter((p) => p.category === 'education').length,
      'dev-tools': cosmosProjects.filter((p) => p.category === 'dev-tools').length,
    }
  }, [])

  // Handle preview card click - select the region(s) for that project
  const handlePreviewClick = useCallback((project: typeof cosmosProjects[0]) => {
    // Select the first region of the clicked project
    const primaryRegion = project.region[0]
    if (primaryRegion && !activeRegions.includes(primaryRegion)) {
      toggleRegion(primaryRegion)
    }
  }, [activeRegions, toggleRegion])

  return (
    <div>
      {/* Interactive 3D Globe Map */}
      <GlobeMap
        activeRegions={activeRegions}
        onToggleRegion={toggleRegion}
      />

      {/* Initial State: Project Preview Cards */}
      <AnimatePresence>
        {!hasRegionSelected && (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {/* Section header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-mono text-star-dim/70">
                Recent Projects
              </h3>
              <span className="text-xs text-star-dim/50 font-mono">
                Click a region above to explore
              </span>
            </div>

            {/* Preview grid - smaller cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {previewProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <ProjectPreviewCard
                    project={project}
                    onClick={() => handlePreviewClick(project)}
                  />
                </motion.div>
              ))}
            </div>

            {/* Hint to explore more */}
            <motion.p
              className="text-center text-xs text-star-dim/40 mt-4 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {cosmosProjects.length} total projects across US & Korea
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* After Region Selection: Full Project Grid + Filters + ShippingVelocity */}
      <AnimatePresence>
        {hasRegionSelected && (
          <motion.div
            ref={projectsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <FilterTabs
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              counts={counts}
              activeMarkets={activeMarkets}
              onToggleMarket={toggleMarket}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </AnimatePresence>
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-star-dim">No projects found matching these filters.</p>
              </div>
            )}

            {/* Shipping Velocity - only shown after region selection */}
            <ShippingVelocity className="mt-12" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
