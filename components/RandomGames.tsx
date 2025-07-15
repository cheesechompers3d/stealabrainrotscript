"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { games, getGameSlug } from '@/data/games'
import { cn } from '@/lib/utils'
import { GameRating } from '@/components/GameList'

interface RandomGamesProps {
  count: number
  isMobile?: boolean
  currentGameSlug?: string
}

export default function RandomGames({ count, isMobile, currentGameSlug }: RandomGamesProps) {
  const [randomGames, setRandomGames] = useState<any[]>([])

  useEffect(() => {
    // 过滤掉当前游戏
    const filteredGames = currentGameSlug 
      ? games.filter(game => getGameSlug(game.name) !== currentGameSlug)
      : [...games]
    
    // 随机打乱游戏数组
    const shuffled = [...filteredGames].sort(() => 0.5 - Math.random())
    
    // 取前count个游戏
    setRandomGames(shuffled.slice(0, count))
  }, [count, currentGameSlug])

  if (randomGames.length === 0) {
    return null
  }

  return (
    <div className="mt-2">
      <h2 className={cn(
        "font-bold text-black mb-4",
        isMobile ? "text-lg" : "text-xl"
      )}>
        You May Also Like
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {randomGames.map((game, index) => {
          const gameSlug = getGameSlug(game.name)
          return (
            <Link 
              key={index} 
              href={`/game/${gameSlug}`}
              className="block bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300 relative"
            >
              <GameRating game={game} />
              <div className="relative h-20 sm:h-24 md:h-28 rounded-lg overflow-hidden mb-2">
                <img
                  src={game.icon}
                  alt={game.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-2">
                <h3 className="text-sm font-medium text-white line-clamp-1">{game.name}</h3>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
} 