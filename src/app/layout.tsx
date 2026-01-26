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
  title: 'Sungman Cho',
  description: 'I love solving problems and enjoy shipping fast.',
  keywords: ['founder', 'builder', 'problem solver', 'startup', 'shipping'],
  authors: [{ name: 'Sungman Cho' }],
  metadataBase: new URL('https://www.sungman.world'),
  openGraph: {
    title: 'Sungman Cho',
    description: 'I love solving problems and enjoy shipping fast.',
    type: 'website',
    url: 'https://www.sungman.world',
    siteName: 'Sungman Cho',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sungman Cho',
    description: 'I love solving problems and enjoy shipping fast.',
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
