'use client'

import { useState, useEffect } from 'react'

interface Card {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

const HAMBURGER_EMOJIS = ['🍔', '🍟', '🌭', '🥪', '🍕', '🥙']

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)
  const [isWon, setIsWon] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  // Initialize cards
  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const newCards: Card[] = []
    let id = 0
    
    // Create pairs of cards
    for (const emoji of HAMBURGER_EMOJIS) {
      for (let i = 0; i < 2; i++) {
        newCards.push({
          id: id++,
          emoji,
          isFlipped: false,
          isMatched: false
        })
      }
    }
    
    // Shuffle cards
    const shuffled = newCards.sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setFlippedCards([])
    setMoves(0)
    setMatches(0)
    setIsWon(false)
    setShowCelebration(false)
  }

  const handleCardClick = (id: number) => {
    if (isChecking) return
    
    const card = cards.find(c => c.id === id)
    if (!card || card.isFlipped || card.isMatched) return
    
    const newFlippedCards = [...flippedCards, id]
    setFlippedCards(newFlippedCards)
    
    setCards(prevCards => 
      prevCards.map(c => 
        c.id === id ? { ...c, isFlipped: true } : c
      )
    )
    
    if (newFlippedCards.length === 2) {
      setIsChecking(true)
      setMoves(prev => prev + 1)
      checkForMatch(newFlippedCards)
    }
  }

  const checkForMatch = (flipped: number[]) => {
    setTimeout(() => {
      const [first, second] = flipped
      const firstCard = cards.find(c => c.id === first)
      const secondCard = cards.find(c => c.id === second)
      
      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        // Match found
        setCards(prevCards => 
          prevCards.map(c => 
            c.id === first || c.id === second 
              ? { ...c, isMatched: true } 
              : c
          )
        )
        setMatches(prev => {
          const newMatches = prev + 1
          if (newMatches === HAMBURGER_EMOJIS.length) {
            setTimeout(() => {
              setIsWon(true)
              setShowCelebration(true)
            }, 500)
          }
          return newMatches
        })
      } else {
        // No match, flip back
        setCards(prevCards => 
          prevCards.map(c => 
            c.id === first || c.id === second 
              ? { ...c, isFlipped: false } 
              : c
          )
        )
      }
      
      setFlippedCards([])
      setIsChecking(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col items-center space-y-8 animate-in w-full max-w-4xl mx-auto">
      {/* Stats Display */}
      <div className="flex gap-8 text-center">
        <div className="glass-morphism rounded-2xl px-6 py-4 min-w-[120px] hover-lift">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Moves</p>
          <p className="text-3xl font-bold text-gradient">{moves}</p>
        </div>
        <div className="glass-morphism rounded-2xl px-6 py-4 min-w-[120px] hover-lift">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Matches</p>
          <p className="text-3xl font-bold text-gradient">{matches}/{HAMBURGER_EMOJIS.length}</p>
        </div>
      </div>
      
      {/* Game Grid */}
      <div className="relative">
        {showCelebration && (
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="text-6xl animate-bounce">🎉</div>
          </div>
        )}
        
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 p-4">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={card.isFlipped || card.isMatched || isChecking}
              className={`
                relative w-20 h-20 md:w-24 md:h-24
                rounded-2xl
                transition-all duration-300
                ${card.isMatched 
                  ? 'scale-0 opacity-0' 
                  : 'hover-lift cursor-pointer'
                }
              `}
            >
              <div className={`
                absolute inset-0 w-full h-full
                card-flip
                ${card.isFlipped ? 'card-flip-active' : ''}
              `}>
                {/* Card Back */}
                <div className={`
                  absolute inset-0 w-full h-full
                  rounded-2xl
                  glass-morphism
                  bg-gradient-to-br from-blue-400 to-purple-600
                  flex items-center justify-center
                  card-face
                  ${!card.isFlipped ? 'hover:shadow-xl' : ''}
                  ${card.isMatched ? 'opacity-0' : ''}
                `}>
                  <span className="text-3xl md:text-4xl text-white">?</span>
                </div>
                
                {/* Card Front */}
                <div className={`
                  absolute inset-0 w-full h-full
                  rounded-2xl
                  glass-morphism
                  bg-gradient-to-br from-green-400 to-blue-500
                  flex items-center justify-center
                  card-face card-back
                  ${card.isFlipped && !card.isMatched ? 'pulse-glow' : ''}
                `}>
                  <span className="text-4xl md:text-5xl">{card.emoji}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Win Message */}
      {isWon && (
        <div className="glass-morphism rounded-2xl p-8 text-center space-y-4 bounce-in">
          <h2 className="text-3xl font-bold text-gradient">
            Congratulations! 🎉
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            You won in {moves} moves!
          </p>
          <button
            onClick={initializeGame}
            className="px-6 py-3 rounded-xl font-semibold
              bg-gradient-to-r from-green-500 to-blue-600 text-white
              hover-lift hover:shadow-xl
              transition-all duration-300"
          >
            Play Again
          </button>
        </div>
      )}
      
      {/* Reset Button */}
      {!isWon && (
        <button
          onClick={initializeGame}
          className="px-6 py-3 rounded-xl font-semibold
            glass-morphism
            hover-lift hover:shadow-lg
            transition-all duration-300
            text-gray-700 dark:text-gray-300"
        >
          Reset Game
        </button>
      )}
    </div>
  )
}