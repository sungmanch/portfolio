'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'

// Photo configuration - single group with 5 photos
const constellations = [
  {
    name: 'Memories',
    photos: [
      { src: '/optimized/photos/family.webp', alt: 'Family' },
      { src: '/optimized/photos/friends.webp', alt: 'Friends' },
      { src: '/optimized/photos/brian.webp', alt: 'Brian' },
      { src: '/optimized/photos/eo.webp', alt: 'EO' },
      { src: '/optimized/photos/global-lg2.webp', alt: 'Global Community' },
    ],
  },
]

// Layout patterns for 5 photos - stacked pile effect centered
// Desktop positions - center photo at 50%, others spread around it
const desktopLayoutPatterns = [
  [
    { x: 15, y: 25, size: 'xxl', rotate: -12 },   // bottom-left
    { x: 55, y: 5, size: 'xxl', rotate: 8 },      // top-right
    { x: 20, y: 0, size: 'xxl', rotate: -5 },     // top-left
    { x: 50, y: 30, size: 'xxl', rotate: 10 },    // bottom-right
    { x: 35, y: 15, size: 'xxl', rotate: -2 },    // center (top of pile)
  ],
]

// Mobile positions - centered pile with spread
const mobileLayoutPatterns = [
  [
    { x: 5, y: 30, size: 'xl', rotate: -12 },     // bottom-left
    { x: 45, y: 5, size: 'xl', rotate: 8 },       // top-right
    { x: 10, y: 0, size: 'xl', rotate: -6 },      // top-left
    { x: 40, y: 35, size: 'xl', rotate: 10 },     // bottom-right
    { x: 25, y: 18, size: 'xl', rotate: -1 },     // center (top of pile)
  ],
]

// Size configuration with larger dimensions
const sizeConfig = {
  md: {
    className: 'w-[120px] h-[120px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px] lg:w-[260px] lg:h-[260px]',
    glow: '0 0 40px rgba(100, 255, 218, 0.15)',
  },
  lg: {
    className: 'w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] lg:w-[360px] lg:h-[360px]',
    glow: '0 0 60px rgba(167, 139, 250, 0.2)',
  },
  xl: {
    className: 'w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px]',
    glow: '0 0 80px rgba(167, 139, 250, 0.25)',
  },
  xxl: {
    className: 'w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] md:w-[420px] md:h-[420px] lg:w-[500px] lg:h-[500px]',
    glow: '0 0 100px rgba(167, 139, 250, 0.3)',
  },
}

// Custom hook to detect mobile viewport
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

function ConstellationGroup({
  photos,
  desktopPattern,
  mobilePattern,
  index,
  isMobile
}: {
  photos: { src: string; alt: string }[]
  desktopPattern: typeof desktopLayoutPatterns[0]
  mobilePattern: typeof mobileLayoutPatterns[0]
  index: number
  isMobile: boolean
}) {
  const groupRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: groupRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [80, -80])

  const pattern = isMobile ? mobilePattern : desktopPattern

  // Calculate dynamic height - larger spread pile needs more height
  const getGroupHeight = () => {
    if (isMobile) {
      return 'h-[550px]'
    }
    return 'h-[700px] md:h-[850px] lg:h-[1000px]'
  }

  return (
    <motion.div
      ref={groupRef}
      className={`relative ${getGroupHeight()}`}
      style={{ opacity }}
    >
      {photos.map((photo, i) => {
        const layout = pattern[i]
        if (!layout) return null

        const config = sizeConfig[layout.size as keyof typeof sizeConfig]
        const isLarge = layout.size === 'xl' || layout.size === 'lg'

        return (
          <motion.div
            key={`${index}-${i}`}
            className="absolute"
            style={{
              left: `${layout.x}%`,
              top: `${layout.y}%`,
              zIndex: 10 + i, // Stack order: later photos on top
              y: isLarge ? y : undefined,
            }}
            initial={{ opacity: 0, scale: 0.8, rotate: layout.rotate * 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: layout.rotate }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
              duration: 0.8,
              delay: i * 0.15,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            {/* Ambient glow */}
            <div
              className="absolute inset-0 rounded-2xl opacity-40 blur-xl"
              style={{
                background: i % 2 === 0
                  ? 'radial-gradient(circle, rgba(100, 255, 218, 0.3) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(167, 139, 250, 0.3) 0%, transparent 70%)',
                transform: 'scale(1.5)',
              }}
            />

            {/* Photo container */}
            <motion.div
              className={`relative rounded-2xl overflow-hidden shadow-2xl ${config.className}`}
              style={{
                boxShadow: `${config.glow}, 0 25px 50px -12px rgba(0, 0, 0, 0.5)`,
              }}
              whileHover={{
                scale: 1.05,
                rotate: 0,
                boxShadow: `${config.glow.replace('0.15', '0.3').replace('0.2', '0.4').replace('0.25', '0.5')}, 0 35px 60px -15px rgba(0, 0, 0, 0.6)`,
              }}
              transition={{ duration: 0.4 }}
            >
              {/* Inner border glow */}
              <div className="absolute inset-0 rounded-2xl border border-white/20 z-10 pointer-events-none" />

              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 180px, (max-width: 768px) 260px, (max-width: 1024px) 380px, 450px"
              />

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
            </motion.div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export function Memories() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  return (
    <section
      ref={containerRef}
      id="memories"
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background ambient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-pulsar/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-nova/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[700px] h-[700px] bg-supernova/3 rounded-full blur-[180px]" />
      </div>

      <div className="section-container relative">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-24 lg:mb-32 relative z-40 px-4">
          <motion.p
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-star-bright mb-4 sm:mb-6 tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            The best things in life start with{' '}
            <span className="text-nova">Co-</span>.
          </motion.p>
          <motion.p
            className="text-star-dim text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Every memory worth keeping has a{' '}
            <span className="italic text-star-bright">&lsquo;we&rsquo;</span> in it.
          </motion.p>
        </div>

        {/* Constellation groups */}
        <div className="space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-20">
          {constellations.map((constellation, index) => (
            <ConstellationGroup
              key={constellation.name}
              photos={constellation.photos}
              desktopPattern={desktopLayoutPatterns[index]}
              mobilePattern={mobileLayoutPatterns[index]}
              index={index}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
              backgroundColor: i % 2 === 0 ? 'rgba(100, 255, 218, 0.4)' : 'rgba(167, 139, 250, 0.4)',
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: (i * 0.2) % 3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </section>
  )
}
