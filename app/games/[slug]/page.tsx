"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Game } from '@/lib/types'
import { getGameBySlug } from '@/lib/games'
import Home from '@/components/Home'

// 动态 SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const game = await getGameBySlug(params.slug)
  if (!game || !game.seo) {
    return {
      title: '游戏未找到',
      description: '你访问的游戏不存在。'
    }
  }
  return {
    title: game.seo.title || game.title,
    description: game.seo.description || game.description,
    keywords: game.seo.keywords || '',
    openGraph: {
      images: game.seo.ogImage ? [game.seo.ogImage] : [],
    },
  }
}

export default function GamePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string || ''
  const [defaultGame, setDefaultGame] = useState<Game | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!slug) return

    const fetchGame = async () => {
      try {
        const game = await getGameBySlug(slug)
        if (game) {
          setDefaultGame(game)
        } else {
          setError(new Error('Game not found'))
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load game'))
      }
    }

    fetchGame()
  }, [slug])

  const handleGameSelect = (gameSlug: string) => {
    // 导航到新的游戏页面
    router.push(`/game/${gameSlug}`)
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Loading Failed</h1>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    )
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

  return (
    <>
      <Home defaultGame={defaultGame} onGameSelect={handleGameSelect} />
    </>
  )
} 