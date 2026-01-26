'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function CosmosHero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-[50vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-4xl mx-auto w-full">
        {/* Main statement */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.2] text-star-bright"
        >
          Deeply in love with{' '}
          <span className="text-nova">solving problems</span>
          {' '}in this world.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] leading-[1.25] text-star-bright/90"
        >
          Delivering value to people is my happiness,
          <span className="sm:block sm:mt-2">
            and I walk the path of a{' '}
            <span className="text-nova">founder</span>
            {' '}to maximize it.
          </span>
        </motion.p>

        {/* Subtle CTA */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: mounted ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-star-dim/50 text-sm font-mono"
        >
          Click on the markers below to explore my projects.
        </motion.p>
      </div>
    </section>
  )
}
