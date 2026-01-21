'use client'

import { motion } from 'framer-motion'
import { Section, SectionTitle } from '@/components/layout/Section'
import { Badge } from '@/components/ui/Badge'
import { projects } from '@/lib/data'

export function Projects() {
  return (
    <Section id="projects">
      <SectionTitle subtitle="Things I've built and contributed to">
        Featured Projects
      </SectionTitle>

      {/* Bento grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {projects.map((project, index) => {
          // Featured projects span 2 columns on larger screens
          const isFeatured = project.featured && index < 2

          return (
            <motion.article
              key={project.id}
              className={`
                card card-hover group relative overflow-hidden
                ${isFeatured ? 'sm:col-span-2 lg:col-span-1 lg:first:col-span-2' : ''}
              `}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-nova/5 to-pulsar/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative p-4 sm:p-6">
                {/* Header with icon and links */}
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  {/* Folder icon */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-cosmos flex items-center justify-center text-nova">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                  </div>

                  {/* Links */}
                  <div className="flex gap-2 sm:gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        className="text-star-dim hover:text-nova transition-colors p-1"
                        aria-label="View on GitHub"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        className="text-star-dim hover:text-nova transition-colors p-1"
                        aria-label="View project"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-lg sm:text-xl text-star-bright mb-1.5 sm:mb-2 group-hover:text-nova transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-star-dim text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="default" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Featured indicator */}
                {project.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nova opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-nova" />
                    </span>
                  </div>
                )}
              </div>
            </motion.article>
          )
        })}
      </div>
    </Section>
  )
}
