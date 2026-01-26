import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Sungman Cho - I love solving problems and enjoy shipping fast.'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#030014',
          position: 'relative',
        }}
      >
        {/* Stars background */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              backgroundColor: 'white',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}

        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(100, 255, 218, 0.15) 0%, transparent 50%)',
          }}
        />

        {/* Globe representation */}
        <div
          style={{
            width: 300,
            height: 300,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 30% 30%, #1a3a5c 0%, #0a1628 50%, #030014 100%)',
            boxShadow:
              '0 0 60px rgba(100, 255, 218, 0.3), inset -20px -20px 60px rgba(0,0,0,0.5), inset 10px 10px 40px rgba(100, 255, 218, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            marginBottom: 40,
          }}
        >
          {/* Atmosphere glow */}
          <div
            style={{
              position: 'absolute',
              inset: -20,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(100, 255, 218, 0.2) 0%, transparent 70%)',
            }}
          />

          {/* Grid lines on globe */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '1px solid rgba(100, 255, 218, 0.2)',
            }}
          />

          {/* Horizontal lines */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: 1,
              backgroundColor: 'rgba(100, 255, 218, 0.15)',
              top: '50%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '90%',
              height: 1,
              backgroundColor: 'rgba(100, 255, 218, 0.1)',
              top: '30%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '90%',
              height: 1,
              backgroundColor: 'rgba(100, 255, 218, 0.1)',
              top: '70%',
            }}
          />

          {/* Vertical curve */}
          <div
            style={{
              position: 'absolute',
              width: 1,
              height: '100%',
              backgroundColor: 'rgba(100, 255, 218, 0.15)',
              left: '50%',
            }}
          />

          {/* US marker */}
          <div
            style={{
              position: 'absolute',
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#64ffda',
              boxShadow: '0 0 20px #64ffda',
              top: '40%',
              left: '25%',
            }}
          />

          {/* Korea marker */}
          <div
            style={{
              position: 'absolute',
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#ff6b9d',
              boxShadow: '0 0 20px #ff6b9d',
              top: '42%',
              right: '20%',
            }}
          />

          {/* Arc between markers */}
          <div
            style={{
              position: 'absolute',
              width: 140,
              height: 60,
              borderTop: '2px dashed rgba(100, 255, 218, 0.4)',
              borderRadius: '50% 50% 0 0',
              top: '20%',
              left: '30%',
            }}
          />
        </div>

        {/* Text */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: '#e2e0e7',
              letterSpacing: '-0.02em',
            }}
          >
            Sungman Cho
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#64ffda',
              fontFamily: 'monospace',
              opacity: 0.9,
            }}
          >
            I love solving problems and enjoy shipping fast.
          </div>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#64ffda',
            }}
          />
          <div
            style={{
              fontSize: 16,
              color: '#9895a3',
              fontFamily: 'monospace',
            }}
          >
            sungman.world
          </div>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#ff6b9d',
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
