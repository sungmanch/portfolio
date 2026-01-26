'use client'

import { useState, useMemo, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ProjectCard } from './ProjectCard'
import { FilterTabs, type FilterCategory } from './FilterTabs'
import { cosmosProjects, type TargetMarket, type MarketRegion } from '@/lib/data'

export function CosmosGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')
  const [activeMarkets, setActiveMarkets] = useState<TargetMarket[]>([])
  const [activeRegions, setActiveRegions] = useState<MarketRegion[]>([])

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

  const filteredProjects = useMemo(() => {
    let projects = cosmosProjects

    // Primary category filter
    if (activeFilter === 'featured') {
      projects = projects.filter((p) => p.featured)
    } else if (activeFilter !== 'all') {
      projects = projects.filter((p) => p.category === activeFilter)
    }

    // Secondary market filter (OR within markets)
    if (activeMarkets.length > 0) {
      projects = projects.filter((p) =>
        activeMarkets.some((m) => p.targetMarket.includes(m))
      )
    }

    // Secondary region filter (OR within regions)
    if (activeRegions.length > 0) {
      projects = projects.filter((p) =>
        activeRegions.some((r) => p.region.includes(r))
      )
    }

    return projects
  }, [activeFilter, activeMarkets, activeRegions])

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

  return (
    <div>
      <FilterTabs
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        counts={counts}
        activeMarkets={activeMarkets}
        onToggleMarket={toggleMarket}
        activeRegions={activeRegions}
        onToggleRegion={toggleRegion}
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
    </div>
  )
}
