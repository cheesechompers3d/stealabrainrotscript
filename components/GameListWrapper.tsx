"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import GameList from './GameList'
import { Game } from '@/lib/games'

interface GameListWrapperProps {
  games: Game[]
  currentGame: string
}

export default function GameListWrapper({ games, currentGame }: GameListWrapperProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const router = useRouter()

  const handleGameSelect = (slug: string) => {
    router.push(`/${slug}`, { scroll: false })
  }

  return (
    <GameList
      games={games}
      currentGame={currentGame}
      onGameSelect={handleGameSelect}
      isDarkMode={isDarkMode}
    />
  )
} 