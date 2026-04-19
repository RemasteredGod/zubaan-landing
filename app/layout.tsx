import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['italic', 'normal'],
  weight: ['400', '600'],
  variable: '--font-fraunces',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Zubaan — Reply in your voice, not ChatGPT's.",
  description:
    'Upload any chat screenshot. Zubaan reads the vibe and writes three replies — in your tone, your language, your style. Hinglish native.',
  keywords: ['Zubaan', 'Hinglish', 'AI replies', 'WhatsApp', 'chat', 'voice notes'],
  openGraph: {
    title: "Zubaan — Reply in your voice, not ChatGPT's.",
    description: 'Koi screenshot lao. Baaki hum sambhaalte hain.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
