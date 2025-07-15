"use client"

import { useEffect, useState } from 'react'
import Home from "@/components/Home"
import { defaultConfig } from "@/lib/config"
import { getGameBySlug } from "@/lib/games"
import type { Game } from "@/lib/games"
import { useRouter } from 'next/navigation'

export default function ClientPage() {
  const [defaultGame, setDefaultGame] = useState<Game | null>(null)
  const config = defaultConfig
  const router = useRouter()

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const game = await getGameBySlug(config.defaultGame)
        if (game) {
          setDefaultGame(game)
        } else {
          console.error('Default game not found:', config.defaultGame)
          setDefaultGame({
            slug: config.defaultGame,
            title: config.siteName,
            description: `Play ${config.siteName}`,
            icon: "/images/games/default-icon.jpg",
            url: "/",
            previewImage: "/images/games/default-preview.jpg",
            type: "game"
          })
        }
      } catch (error) {
        console.error('Error loading default game:', error)
        setDefaultGame({
          slug: config.defaultGame,
          title: config.siteName,
          description: `Play ${config.siteName}`,
          icon: "/images/games/default-icon.jpg",
          url: "/",
          previewImage: "/images/games/default-preview.jpg",
          type: "game"
        })
      }
    }

    fetchGame()
  }, [config.defaultGame, config.siteName])

  const handleGameSelect = (slug: string) => {
    // 导航到新的游戏页面
    router.push(`/game/${slug}`)
  }

  if (!defaultGame) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Steal a Brainrot Script</h1>
        </div>
      </div>
    )
  }

  return <Home defaultGame={defaultGame} onGameSelect={handleGameSelect} />
} 