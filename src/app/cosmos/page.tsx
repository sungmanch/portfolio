import { Metadata } from 'next'
import { CosmosBackground } from '@/components/cosmos/CosmosBackground'
import { CosmosGrid } from '@/components/cosmos/CosmosGrid'
import { CosmosHero } from '@/components/cosmos/CosmosHero'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cosmos | Sungman Cho',
  description: 'Explore the projects and products I\'ve built. From AI applications to enterprise solutions.',
}

export default function CosmosPage() {
  return (
    <main className="relative min-h-screen">
      <CosmosBackground />

      <div className="relative z-10">
        {/* Back link - positioned absolutely */}
        <div className="absolute top-6 left-4 sm:left-6 lg:left-8 z-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-star-dim hover:text-nova transition-colors group"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="font-mono text-sm">Back to Home</span>
          </Link>
        </div>

        {/* Hero Section */}
        <CosmosHero />

        {/* Projects Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <CosmosGrid />
        </div>
      </div>
    </main>
  )
}
