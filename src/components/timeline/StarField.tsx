'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Star {
  id: number
  x: number
  y: number
  size: 'sm' | 'md' | 'lg'
  delay: number
  duration: number
}

interface StarFieldProps {
  count?: number
  className?: string
}

export function StarField({ count = 100, className = '' }: StarFieldProps) {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    setStars(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() < 0.6 ? 'sm' : Math.random() < 0.9 ? 'md' : 'lg',
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 3,
      }))
    )
  }, [count])

  const sizeClasses = {
    sm: 'w-0.5 h-0.5',
    md: 'w-1 h-1',
    lg: 'w-1.5 h-1.5',
  }

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className={`absolute rounded-full bg-star-bright ${sizeClasses[star.size]}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.1, 0.8, 0.1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
