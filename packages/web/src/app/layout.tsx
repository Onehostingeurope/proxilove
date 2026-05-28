import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'STITCH — Proximity Dating. Find Who\'s Near You, Right Now.',
  description:
    'PROXILOVE uses Bluetooth proximity to show you real people in real locations, right now. No algorithms. Just distance. Download for iOS and Android.',
  keywords: [
    'proximity dating',
    'dating app',
    'bluetooth dating',
    'nearby singles',
    'PROXILOVE app',
    'location dating',
    'real-time dating',
  ],
  authors: [{ name: 'PROXILOVE' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'STITCH — Proximity Dating',
    description:
      'Find real people near you right now using Bluetooth proximity technology.',
    type: 'website',
    siteName: 'PROXILOVE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'STITCH — Proximity Dating',
    description: 'Find real people near you right now using Bluetooth proximity.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
