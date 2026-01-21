'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Section, SectionTitle } from '@/components/layout/Section'
import { StarField } from '@/components/timeline/StarField'
import { Constellation } from '@/components/timeline/Constellation'
import { Milestone } from '@/components/timeline/Milestone'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { timeline } from '@/lib/data'

// Filter to show only career milestones
const careerTimeline = timeline.filter((m) => m.type === 'career')

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { progress, isInView } = useScrollProgress(containerRef as React.RefObject<HTMLElement>, {
    offset: 100,
  })

  return (
    <Section id="timeline" className="relative overflow-hidden">
      {/* Star field background */}
      <StarField count={80} className="opacity-50" />

      <SectionTitle subtitle="Milestones in my constellation">
        Journey Through the Stars
      </SectionTitle>

      <div ref={containerRef} className="relative mt-16">
        {/* Constellation SVG overlay */}
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-full h-full">
          <Constellation progress={progress} nodeCount={careerTimeline.length} />
        </div>

        {/* Mobile: Vertical line */}
        <div className="lg:hidden absolute left-6 top-0 bottom-0 w-px bg-cosmos">
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-nova via-pulsar to-supernova"
            style={{ scaleY: progress, transformOrigin: 'top' }}
          />
        </div>

        {/* Timeline milestones */}
        <div className="relative space-y-16 lg:space-y-24">
          {careerTimeline.map((milestone, index) => {
            const milestoneProgress = index / (careerTimeline.length - 1)
            const isActive = Math.abs(progress - milestoneProgress) < 0.15

            return (
              <Milestone
                key={milestone.id}
                milestone={milestone}
                index={index}
                isActive={isActive && isInView}
                progress={progress > milestoneProgress ? 1 : progress / milestoneProgress}
              />
            )
          })}
        </div>
      </div>

      {/* Bottom decorative element */}
      <motion.div
        className="mt-20 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <div className="inline-flex items-center gap-3 text-star-dim">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-nova/50" />
          <span className="font-mono text-xs tracking-wider">The journey continues...</span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-nova/50" />
        </div>
      </motion.div>
    </Section>
  )
}
