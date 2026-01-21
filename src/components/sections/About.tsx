'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Section, SectionTitle } from '@/components/layout/Section'
import { aboutText, personalInfo } from '@/lib/data'

export function About() {
  return (
    <Section id="about">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
        {/* Profile Photo */}
        <motion.div
          className="relative aspect-square max-w-xs sm:max-w-sm md:max-w-md mx-auto md:mx-0"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative elements */}
          <div className="absolute -inset-4 bg-gradient-to-br from-nova/20 via-pulsar/10 to-supernova/20 rounded-3xl blur-2xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-cosmos to-nebula rounded-2xl border border-cosmos overflow-hidden" />

          {/* Profile Image */}
          <div className="relative h-full w-full rounded-2xl overflow-hidden">
            <Image
              src="/optimized/profile.webp"
              alt={personalInfo.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Floating decorative stars */}
          <motion.div
            className="absolute -top-4 -right-4 w-3 h-3 rounded-full bg-nova"
            animate={{ y: [-5, 5, -5], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-6 -left-6 w-2 h-2 rounded-full bg-supernova"
            animate={{ y: [5, -5, 5], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-1/2 -right-8 w-2 h-2 rounded-full bg-pulsar"
            animate={{ x: [-5, 5, -5], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3.5, repeat: Infinity }}
          />
        </motion.div>

        {/* Content */}
        <div>
          <SectionTitle subtitle="A bit about my journey">
            About Me
          </SectionTitle>

          <motion.div
            className="space-y-4 sm:space-y-6 text-star-dim text-base sm:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {aboutText.trim().split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph.trim()}</p>
            ))}
          </motion.div>

          <motion.div
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-2 text-star-dim">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-nova flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-mono text-xs sm:text-sm">{personalInfo.location}</span>
            </div>
            <div className="flex items-center gap-2 text-star-dim">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-nova flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="font-mono text-xs sm:text-sm break-all">{personalInfo.email}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
