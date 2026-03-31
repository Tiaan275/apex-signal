import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const viewport: Viewport = {
  themeColor: '#10B981',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Apex Signal — Precision Trading Signals for FIFO Workers',
  description:
    'Algorithmic trading signals across JSE, Forex, Crypto & US markets — built for FIFO workers, offshore crew, and SA expats who need to act decisively between rotations.',
  keywords: [
    'trading signals', 'JSE signals', 'forex signals', 'crypto signals',
    'FIFO workers', 'South Africa trading', 'algorithmic trading',
    'swing trading', 'signal service', 'Apex Signal',
  ],
  authors: [{ name: 'Apex Signal' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Apex Signal',
  },
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
  icons: {
    icon: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
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
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="bg-brand-navy text-brand-text antialiased">
        <Navbar />
        {children}
        <Footer />

        {/* Service worker registration */}
        <Script id="sw-register" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                  .then(function(reg) { console.log('SW registered:', reg.scope) })
                  .catch(function(err) { console.log('SW registration failed:', err) })
              })
            }
          `}
        </Script>
      </body>
    </html>
  )
}
