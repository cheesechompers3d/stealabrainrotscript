"use client"

import { useState, useEffect } from 'react'
import { Game } from '@/lib/types'

interface SiteConfig {
  defaultGame: string
  footerColumns: any[]
  copyright: string
  disclaimer: string
}

export function useGames() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [defaultGame, setDefaultGame] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 获取游戏列表
        const gamesResponse = await fetch('/api/games')
        const gamesData = await gamesResponse.json()
        
        // 获取站点配置
        const configResponse = await fetch('/api/config')
        const configData: SiteConfig = await configResponse.json()
        
        setGames(gamesData)
        setDefaultGame(configData.defaultGame)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { games, loading, defaultGame }
} 