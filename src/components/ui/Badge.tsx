'use client'

import { motion } from 'framer-motion'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'nova' | 'supernova' | 'pulsar'
  size?: 'sm' | 'md'
}

const variantStyles = {
  default: 'bg-cosmos text-star-dim border-cosmos',
  nova: 'bg-nova/10 text-nova border-nova/30',
  supernova: 'bg-supernova/10 text-supernova border-supernova/30',
  pulsar: 'bg-pulsar/10 text-pulsar border-pulsar/30',
}

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
}

export function Badge({ children, variant = 'default', size = 'sm' }: BadgeProps) {
  return (
    <motion.span
      className={`
        inline-flex items-center rounded-full border font-mono
        ${variantStyles[variant]}
        ${sizeStyles[size]}
      `}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {children}
    </motion.span>
  )
}
