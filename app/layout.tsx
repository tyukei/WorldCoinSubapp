import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import MiniKitProvider from '@/components/MiniKitProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WorldCoin Hamburger Memory Game',
  description: 'A memory game with hamburger cards using WorldCoin authentication',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MiniKitProvider>
          {children}
        </MiniKitProvider>
      </body>
    </html>
  )
}