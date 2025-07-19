'use client'

import { useState, useEffect } from 'react'
import { MiniKit, VerificationLevel, ResponseEvent, MiniAppVerifyActionPayload } from '@worldcoin/minikit-js'

interface VerifyResult {
  status: 'success' | 'error'
  proof?: string
  merkle_root?: string
  nullifier_hash?: string
  verification_level?: VerificationLevel
  error_code?: string
}

interface WorldIdAuthProps {
  onSuccess: (result: VerifyResult) => void
}

export default function WorldIdAuth({ onSuccess }: WorldIdAuthProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isWorldApp, setIsWorldApp] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Check if running in World App after component mounts
    const checkWorldApp = async () => {
      if (typeof window !== 'undefined') {
        try {
          // Alternative method: Check user agent or global objects
          const userAgent = navigator.userAgent || ''
          const isWorldAppUA = userAgent.includes('WorldApp') || userAgent.includes('MiniKit')
          
          // Try to check MiniKit installation, but fallback to user agent check
          let isMiniKitInstalled = false
          try {
            isMiniKitInstalled = MiniKit.isInstalled && MiniKit.isInstalled()
          } catch (miniKitError) {
            console.log('MiniKit.isInstalled() failed:', miniKitError)
            isMiniKitInstalled = false
          }
          
          // Use either method
          const isWorldAppDetected = isMiniKitInstalled || isWorldAppUA
          setIsWorldApp(isWorldAppDetected)
          
          console.log('User Agent:', userAgent)
          console.log('World App detected (UA):', isWorldAppUA)
          console.log('MiniKit installed:', isMiniKitInstalled)
          console.log('Final World App status:', isWorldAppDetected)
        } catch (error) {
          console.log('World App check failed:', error)
          setIsWorldApp(false)
        }
      }
      setIsInitialized(true)
    }
    checkWorldApp()
  }, [])

  const handleAuth = async () => {
    setIsLoading(true)
    try {
      // Debug information
      console.log('NODE_ENV:', process.env.NODE_ENV)
      console.log('FORCE_REAL_AUTH:', process.env.NEXT_PUBLIC_FORCE_REAL_AUTH)
      
      // Check if we should force real authentication even in development
      const forceRealAuth = process.env.NEXT_PUBLIC_FORCE_REAL_AUTH === 'true'
      
      // Use the state we already checked in useEffect
      if (!isWorldApp && !forceRealAuth) {
        // Development mode fallback
        const isDevelopment = process.env.NODE_ENV === 'development'
        const isLocalhost = typeof window !== 'undefined' && 
          (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        
        console.log('isDevelopment:', isDevelopment)
        console.log('isLocalhost:', isLocalhost)
        console.log('hostname:', typeof window !== 'undefined' ? window.location.hostname : 'undefined')
        
        if (isDevelopment || isLocalhost) {
          console.log('Using mock authentication for development')
          // Mock successful authentication for development
          setTimeout(() => {
            onSuccess({
              status: 'success',
              proof: 'mock_proof_for_development',
              merkle_root: 'mock_merkle_root',
              nullifier_hash: 'mock_nullifier_hash'
            })
            setIsLoading(false)
          }, 1000)
          return
        } else {
          alert('This application must be run inside World App. Please open it in World App to continue.')
          setIsLoading(false)
          return
        }
      }

      // Subscribe to verify action response
      MiniKit.subscribe(ResponseEvent.MiniAppVerifyAction, async (response: MiniAppVerifyActionPayload) => {
        MiniKit.unsubscribe(ResponseEvent.MiniAppVerifyAction)
        
        if (response.status === 'success') {
          console.log('Verification successful:', response)
          onSuccess({
            status: 'success',
            proof: response.proof,
            merkle_root: response.merkle_root,
            nullifier_hash: response.nullifier_hash,
            verification_level: response.verification_level
          })
        } else {
          console.error('Verification failed:', response.error_code)
          onSuccess({
            status: 'error',
            error_code: response.error_code
          })
        }
        setIsLoading(false)
      })

      // Execute verify command
      const result = await MiniKit.commandsAsync.verify({
        action: 'login',
        signal: 'hamburger-memory-game',
        verification_level: VerificationLevel.Orb
      })

      // Handle immediate result (fallback for older versions)
      if (result && result.finalPayload) {
        if (result.finalPayload.status === 'success') {
          onSuccess({
            status: 'success',
            proof: result.finalPayload.proof,
            merkle_root: result.finalPayload.merkle_root,
            nullifier_hash: result.finalPayload.nullifier_hash,
            verification_level: result.finalPayload.verification_level
          })
        } else {
          console.error('Verification failed:', result.finalPayload.error_code)
          onSuccess({
            status: 'error',
            error_code: result.finalPayload.error_code
          })
        }
      }
    } catch (error) {
      console.error('Auth error:', error)
      onSuccess({
        status: 'error',
        error_code: 'generic_error'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const isDevelopment = process.env.NODE_ENV === 'development'
  const isLocalhost = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  const forceRealAuth = process.env.NEXT_PUBLIC_FORCE_REAL_AUTH === 'true'
  const isDevMode = (isDevelopment || isLocalhost) && !forceRealAuth

  if (!isInitialized) {
    return (
      <div className="flex flex-col items-center space-y-4 animate-in">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
          <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-transparent border-t-purple-600 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
        </div>
        <p className="text-sm text-gray-600 animate-pulse">Checking World App...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center space-y-6 animate-in">
      {!isWorldApp && !forceRealAuth && (
        <div className="glass-morphism rounded-xl px-6 py-4 border-yellow-400/30 bg-yellow-50/30 dark:bg-yellow-900/20 bounce-in">
          <p className="text-sm text-yellow-800 dark:text-yellow-200 flex items-center gap-2">
            <span className="text-xl">⚡</span>
            {isDevMode 
              ? "Development Mode: Mock authentication will be used" 
              : "⚠️ This app must be opened in World App"}
          </p>
        </div>
      )}
      
      {forceRealAuth && !isWorldApp && (
        <div className="glass-morphism rounded-xl px-6 py-4 border-blue-400/30 bg-blue-50/30 dark:bg-blue-900/20 bounce-in">
          <p className="text-sm text-blue-800 dark:text-blue-200 flex items-center gap-2">
            <span className="text-xl">🔐</span>
            Real authentication enabled. Open in World App to verify.
          </p>
        </div>
      )}
      
      <button
        onClick={handleAuth}
        disabled={isLoading}
        className={`
          relative group
          px-8 py-4 rounded-2xl font-semibold text-lg
          glass-morphism hover-lift
          ${isLoading 
            ? 'cursor-not-allowed opacity-70' 
            : 'cursor-pointer hover:shadow-2xl'
          }
          ${isDevMode && !isWorldApp 
            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' 
            : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
          }
          transition-all duration-300
          before:absolute before:inset-0 before:rounded-2xl before:opacity-0 before:scale-110
          before:bg-gradient-to-r before:from-blue-600 before:to-purple-700
          before:transition-all before:duration-300
          hover:before:opacity-100 hover:before:scale-100
          overflow-hidden
        `}
      >
        <span className="relative z-10 flex items-center gap-3">
          {isLoading ? (
            <>
              <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <span className="text-2xl">{isDevMode && !isWorldApp ? '🚀' : '🌐'}</span>
              <span>{isDevMode && !isWorldApp ? 'Login (Dev Mode)' : 'Login with World ID'}</span>
            </>
          )}
        </span>
      </button>
      
      <div className="text-center space-y-2 max-w-md">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {isWorldApp 
            ? "Verify your World ID to unlock the game"
            : isDevMode 
            ? "Development mode active - instant access granted"
            : "Please open this app in World App to use World ID verification"}
        </p>
        {isWorldApp && (
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Your privacy is protected with zero-knowledge proofs
          </p>
        )}
      </div>
    </div>
  )
}