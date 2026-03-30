import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Apex Signal — Precision Trading Signals for FIFO Workers',
  description:
    'Stop losing your hard-earned site pay to the market. Apex Signal delivers algorithmic JSE, Forex, Crypto & US trading signals built for FIFO workers, offshore crew, and SA expats worldwide.',
  keywords: [
    'trading signals', 'JSE signals', 'forex signals', 'crypto signals',
    'FIFO workers', 'South Africa trading', 'algorithmic trading',
    'swing trading', 'signal service', 'Apex Signal',
  ],
  authors: [{ name: 'Apex Signal' }],
  openGraph: {
    title: 'Apex Signal — Precision Trading Signals for FIFO Workers',
    description: 'Algorithmic trading signals built for FIFO workers and SA expats. Join the waitlist.',
    type: 'website',
    locale: 'en_ZA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apex Signal',
    description: 'Precision trading signals for FIFO workers and SA expats.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-brand-navy text-brand-text antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
