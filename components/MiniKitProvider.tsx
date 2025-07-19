'use client'

import { MiniKit } from '@worldcoin/minikit-js'
import { ReactNode, useEffect, useState } from 'react'

export default function MiniKitProvider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false)
  const [isWorldApp, setIsWorldApp] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if running in World App
      const userAgent = navigator.userAgent
      const isInWorldApp = userAgent.includes('WorldApp') || userAgent.includes('MiniKit')
      setIsWorldApp(isInWorldApp)

      if (isInWorldApp) {
        // Initialize MiniKit only in World App
        MiniKit.install(process.env.NEXT_PUBLIC_WLD_APP_ID || '')
      }
      
      setIsInitialized(true)
    }
  }, [])

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Initializing...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}