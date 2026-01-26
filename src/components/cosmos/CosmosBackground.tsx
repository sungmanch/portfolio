'use client'

import { StarField } from '@/components/timeline/StarField'

export function CosmosBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Base dark background */}
      <div className="absolute inset-0 bg-void" />

      {/* Star field with more stars */}
      <StarField count={120} />

      {/* Nebula gradients */}
      <div
        className="absolute top-0 left-0 w-[800px] h-[800px] opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(100, 255, 218, 0.15) 0%, transparent 70%)',
          transform: 'translate(-30%, -30%)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(167, 139, 250, 0.2) 0%, transparent 70%)',
          transform: 'translate(20%, 20%)',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-[500px] h-[500px] opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255, 107, 157, 0.15) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Subtle vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10, 10, 15, 0.6) 100%)',
        }}
      />
    </div>
  )
}
