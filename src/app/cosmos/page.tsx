import { Metadata } from 'next'
import { CosmosBackground } from '@/components/cosmos/CosmosBackground'
import { CosmosGrid } from '@/components/cosmos/CosmosGrid'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cosmos | Sungman Cho',
  description: 'Explore the projects and products I\'ve built. From AI applications to enterprise solutions.',
}

export default function CosmosPage() {
  return (
    <main className="relative min-h-screen">
      <CosmosBackground />

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-12 sm:mb-16">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-star-dim hover:text-nova transition-colors mb-8 group"
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

          {/* Title */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-star-bright mb-4">
            Cosmos
          </h1>
          <p className="text-star-dim text-lg sm:text-xl max-w-2xl">
            A collection of projects and products I&apos;ve built
          </p>
        </div>

        {/* Projects Grid */}
        <div className="max-w-6xl mx-auto">
          <CosmosGrid />
        </div>
      </div>
    </main>
  )
}
