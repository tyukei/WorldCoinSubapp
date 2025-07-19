'use client'

import { useState } from 'react'
import WorldIdAuth from '@/components/WorldIdAuth'
import MemoryGame from '@/components/MemoryGame'

interface VerifyResult {
  status: 'success' | 'error'
  proof?: string
  merkle_root?: string
  nullifier_hash?: string
  error_code?: string
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userInfo, setUserInfo] = useState<VerifyResult | null>(null)

  const handleAuthSuccess = (result: VerifyResult) => {
    if (result.status === 'success') {
      setIsAuthenticated(true)
      setUserInfo(result)
    } else {
      console.error('Authentication failed:', result.error_code)
      alert('Authentication failed. Please try again.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserInfo(null)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-300 dark:bg-yellow-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-300 dark:bg-pink-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="z-10 max-w-5xl w-full items-center justify-center text-center mb-8 animate-in">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">
          WorldCoin Burger Quest
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          A delicious memory game powered by World ID
        </p>
        
        {isAuthenticated && (
          <div className="mb-6 glass-morphism rounded-2xl px-6 py-4 inline-block bounce-in">
            <p className="text-green-600 dark:text-green-400 mb-2 flex items-center justify-center gap-2">
              <span className="text-2xl">✅</span>
              <span className="font-semibold">Verified with World ID</span>
            </p>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 underline transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {!isAuthenticated ? (
        <div className="text-center space-y-6 animate-in">
          <div className="glass-morphism rounded-2xl p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Welcome, Burger Hunter! 🍔</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Test your memory skills with our delicious hamburger-themed game. 
              Login with World ID to start your culinary adventure!
            </p>
            <WorldIdAuth onSuccess={handleAuthSuccess} />
          </div>
        </div>
      ) : (
        <div className="w-full animate-in">
          <MemoryGame />
        </div>
      )}

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </main>
  )
}