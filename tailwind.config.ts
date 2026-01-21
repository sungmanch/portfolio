import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Constellation Journey color palette
        void: '#0a0a0f',
        nebula: '#12121a',
        cosmos: '#1a1a24',
        'star-bright': '#e8e4d9',
        'star-dim': '#9895a3',
        nova: '#64ffda',
        supernova: '#ff6b9d',
        pulsar: '#a78bfa',
      },
      fontFamily: {
        display: ['var(--font-instrument-serif)', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      animation: {
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'draw-line': 'draw-line 1.5s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 5px currentColor, 0 0 10px currentColor',
            transform: 'scale(1)',
          },
          '50%': {
            boxShadow: '0 0 20px currentColor, 0 0 40px currentColor',
            transform: 'scale(1.1)',
          },
        },
        'draw-line': {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
