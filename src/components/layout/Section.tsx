'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useElementInView } from '@/hooks/useScrollProgress'

interface SectionProps {
  id: string
  children: React.ReactNode
  className?: string
  fullHeight?: boolean
}

export function Section({ id, children, className = '', fullHeight = false }: SectionProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useElementInView(ref, 0.1)

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`
        relative py-16 sm:py-20 md:py-24 lg:py-32
        ${fullHeight ? 'min-h-screen flex items-center' : ''}
        ${className}
      `}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="section-container">
        {children}
      </div>
    </motion.section>
  )
}

interface SectionTitleProps {
  children: React.ReactNode
  subtitle?: string
}

export function SectionTitle({ children, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
      <motion.h2
        className="font-display text-3xl sm:text-4xl lg:text-5xl text-star-bright mb-3 sm:mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="text-star-dim text-base sm:text-lg max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
