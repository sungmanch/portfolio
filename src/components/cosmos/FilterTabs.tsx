'use client'

import { motion } from 'framer-motion'
import { CATEGORY_CONFIG, type CosmosCategory, type TargetMarket, type MarketRegion } from '@/lib/data'

type FilterCategory = 'all' | 'featured' | CosmosCategory

interface FilterTabsProps {
  activeFilter: FilterCategory
  onFilterChange: (filter: FilterCategory) => void
  counts: Record<FilterCategory, number>
  activeMarkets: TargetMarket[]
  onToggleMarket: (market: TargetMarket) => void
  activeRegions: MarketRegion[]
  onToggleRegion: (region: MarketRegion) => void
}

const primaryFilters: { key: FilterCategory; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'featured', label: 'Featured' },
  { key: 'productivity', label: 'Productivity' },
  { key: 'sales', label: 'Sales' },
  { key: 'education', label: 'Education' },
  { key: 'dev-tools', label: 'Dev Tools' },
]

const marketFilters: { key: TargetMarket; label: string }[] = [
  { key: 'b2b', label: 'B2B' },
  { key: 'b2c', label: 'B2C' },
]

const regionFilters: { key: MarketRegion; label: string }[] = [
  { key: 'us', label: 'US' },
  { key: 'korea', label: 'Korea' },
]

export function FilterTabs({
  activeFilter,
  onFilterChange,
  counts,
  activeMarkets,
  onToggleMarket,
  activeRegions,
  onToggleRegion,
}: FilterTabsProps) {
  return (
    <div className="flex flex-col items-center gap-3 mb-8 sm:mb-12">
      {/* Primary category filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 px-4 sm:px-0 scrollbar-hide">
        {primaryFilters.map((filter) => {
          const isActive = activeFilter === filter.key
          const count = counts[filter.key]

          if (count === 0 && filter.key !== 'all') return null

          const isCategory = filter.key !== 'all' && filter.key !== 'featured'
          const categoryHex = isCategory ? CATEGORY_CONFIG[filter.key as CosmosCategory].hex : undefined

          return (
            <motion.button
              key={filter.key}
              onClick={() => onFilterChange(filter.key)}
              className={`
                relative px-4 py-2 rounded-full text-sm font-mono whitespace-nowrap
                transition-all duration-300 border
                ${
                  isActive && !isCategory
                    ? 'bg-nova/10 border-nova text-nova'
                    : !isActive
                    ? 'bg-cosmos/50 border-cosmos text-star-dim hover:border-star-dim hover:text-star-bright'
                    : ''
                }
              `}
              style={
                isActive && isCategory
                  ? {
                      backgroundColor: `${categoryHex}15`,
                      borderColor: categoryHex,
                      color: categoryHex,
                    }
                  : undefined
              }
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {filter.label}
              <span
                className={`ml-1.5 text-xs ${
                  isActive ? 'opacity-70' : 'text-star-dim/50'
                }`}
              >
                {count}
              </span>

              {isActive && (
                <motion.div
                  className={`absolute inset-0 rounded-full blur-md -z-10 ${
                    !isCategory ? 'bg-nova/20' : ''
                  }`}
                  style={
                    isCategory
                      ? { backgroundColor: `${categoryHex}30` }
                      : undefined
                  }
                  layoutId="activeFilterGlow"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Secondary filters: Market + Region */}
      <div className="flex gap-2 overflow-x-auto pb-1 px-4 sm:px-0 scrollbar-hide">
        {marketFilters.map((filter) => {
          const isActive = activeMarkets.includes(filter.key)
          return (
            <motion.button
              key={filter.key}
              onClick={() => onToggleMarket(filter.key)}
              className={`
                px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap
                transition-all duration-300 border
                ${
                  isActive
                    ? 'bg-pulsar/10 border-pulsar text-pulsar'
                    : 'bg-cosmos/50 border-cosmos text-star-dim hover:border-star-dim hover:text-star-bright'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {filter.label}
            </motion.button>
          )
        })}

        <span className="text-star-dim/30 self-center px-1">|</span>

        {regionFilters.map((filter) => {
          const isActive = activeRegions.includes(filter.key)
          return (
            <motion.button
              key={filter.key}
              onClick={() => onToggleRegion(filter.key)}
              className={`
                px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap
                transition-all duration-300 border
                ${
                  isActive
                    ? 'bg-supernova/10 border-supernova text-supernova'
                    : 'bg-cosmos/50 border-cosmos text-star-dim hover:border-star-dim hover:text-star-bright'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {filter.label}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export type { FilterCategory }
