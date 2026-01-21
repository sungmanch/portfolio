import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Instrument_Serif } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sungman Cho | Researcher & Developer',
  description: 'Personal portfolio showcasing research, projects, and professional journey through the constellation of innovation.',
  keywords: ['researcher', 'developer', 'portfolio', 'technology', 'innovation'],
  authors: [{ name: 'Sungman Cho' }],
  openGraph: {
    title: 'Sungman Cho | Researcher & Developer',
    description: 'Personal portfolio showcasing research, projects, and professional journey.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}
