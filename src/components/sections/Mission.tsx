'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/layout/Section'
import { missionStatement } from '@/lib/data'

export function Mission() {
  // Parse the mission statement text (remove quotes if present)
  const cleanStatement = missionStatement.trim().replace(/^["']|["']$/g, '')

  return (
    <Section id="mission" className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-nebula/30 to-void" />

      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-nova/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pulsar/5 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Quote mark */}
          <motion.div
            className="text-nova/20 text-9xl font-display leading-none mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            &ldquo;
          </motion.div>

          {/* Mission statement */}
          <motion.blockquote
            className="font-display text-3xl sm:text-4xl lg:text-5xl text-star-bright leading-tight italic"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {cleanStatement}
          </motion.blockquote>

          {/* Attribution line */}
          <motion.div
            className="mt-12 flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-nova/50" />
            <span className="text-nova font-mono text-sm tracking-wider">My Mission</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-nova/50" />
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}
