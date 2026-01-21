'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Section, SectionTitle } from '@/components/layout/Section'
import { publications } from '@/lib/data'

export function Publications() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <Section id="publications">
      <SectionTitle subtitle="Research contributions and academic work">
        Publications
      </SectionTitle>

      <div className="space-y-4">
        {publications.map((pub, index) => (
          <motion.article
            key={pub.id}
            className="card overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <button
              onClick={() => setExpandedId(expandedId === pub.id ? null : pub.id)}
              className="w-full p-6 text-left"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                {/* Main content */}
                <div className="flex-1">
                  {/* Venue and year */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-0.5 bg-pulsar/10 text-pulsar text-xs font-mono rounded">
                      {pub.year}
                    </span>
                    <span className="text-star-dim text-sm font-mono">
                      {pub.venue}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg text-star-bright mb-2 group-hover:text-nova transition-colors">
                    {pub.title}
                  </h3>

                  {/* Authors */}
                  <p className="text-star-dim text-sm">
                    {pub.authors.map((author, i) => (
                      <span key={author}>
                        <span className={author.includes('Sungman') ? 'text-nova font-medium' : ''}>
                          {author}
                        </span>
                        {i < pub.authors.length - 1 && ', '}
                      </span>
                    ))}
                  </p>
                </div>

                {/* Expand indicator */}
                <div className="flex items-center gap-4">
                  {pub.link && (
                    <a
                      href={pub.link}
                      onClick={(e) => e.stopPropagation()}
                      className="text-star-dim hover:text-nova transition-colors"
                      aria-label="View publication"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                  <motion.div
                    animate={{ rotate: expandedId === pub.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-star-dim"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </button>

            {/* Expandable abstract */}
            <AnimatePresence>
              {expandedId === pub.id && pub.abstract && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 border-t border-cosmos pt-4">
                    <h4 className="text-sm font-mono text-nova mb-2">Abstract</h4>
                    <p className="text-star-dim text-sm leading-relaxed">
                      {pub.abstract}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
