"use client"

import Image from "next/image"
import { Game } from "@/lib/types"
import { GameData } from "@/data/games"
import { ReactNode } from "react"
import { useRouter } from "next/navigation"
import Advertisement from './Advertisement'
import { useState, useEffect } from "react"
import Link from "next/link"
import { defaultConfig } from '@/lib/config'

interface GameListProps {
  games?: Game[]
  currentGame: string | null
  onGameSelect: (slug: string) => void
  isDarkMode: boolean
}

export default function GameList({
  games = [],
  currentGame,
  onGameSelect,
  isDarkMode,
}: GameListProps) {
  const router = useRouter()

  const renderAdSlot = (index: number) => {
    if (!defaultConfig.advertisement?.key) return null;
    return (
      <div 
        key={`ad-${index}`} 
        className="col-span-2 flex items-center justify-center my-2"
      >
        <Advertisement position="content" isAdSlot={true} index={index} />
      </div>
    )
  }

  const handleGameClick = (e: React.MouseEvent, slug: string) => {
    e.preventDefault() // 阻止默认的链接导航行为
    onGameSelect(slug)
    // 更新 URL
    router.push(`/${slug}`)
    // 使用平滑滚动到游戏 iframe 区域
    const gameFrame = document.getElementById('game-frame')
    if (gameFrame) {
      gameFrame.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const renderGameItems = (): ReactNode[] => {
    const items: ReactNode[] = []
    games.forEach((game, index) => {
      // 构建完整的游戏页面 URL
      const gameUrl = `/${game.slug}`
      
      items.push(
        <a
          key={game.slug}
          href={gameUrl}
          className={`cursor-pointer transition-transform duration-300 hover:scale-105 block ${
            currentGame === game.slug ? "ring-2 ring-blue-500 rounded-lg" : ""
          } relative`}
          onClick={(e) => handleGameClick(e, game.slug)}
          tabIndex={0}
          aria-label={`Play ${game.title}`}
        >
          <GameRating game={game} />
          <div className="relative aspect-square rounded-lg overflow-hidden mb-2">
            <img
              src={game.icon}
              alt={game.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <h3 className="text-sm font-medium text-center truncate px-2">
            {game.title}
          </h3>
        </a>
      )

      // 每4个游戏（2行）后添加广告位
      if ((index + 1) % 4 === 0) {
        items.push(renderAdSlot(Math.floor(index / 4)))
      }
    })
    return items
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {renderGameItems()}
    </div>
  )
}

export const GameRating = ({ game }: { game: Game }) => {
  // 使用一个固定的占位符或者 null 作为初始状态
  const [rating, setRating] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Replace with actual game rating data when available
    // 客户端生成 5 到 10 之间的随机评分
    const randomRating = (Math.random() * 5 + 5).toFixed(1);
    setRating(randomRating);
  }, []); // 空依赖数组确保只在客户端挂载时执行一次

  if (rating === null) {
    // 在客户端加载数据前，服务器和客户端渲染一个一致的占位符或者为空
    return (
      <div className="absolute top-1 right-1 bg-black/70 text-white text-xs font-bold px-1.5 py-0.5 rounded-md flex items-center space-x-0.5 z-10">
        <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21L12 17.27z"/>
        </svg>
        <span>--</span> {/* 服务器和客户端初始渲染的占位符 */}
      </div>
    );
  }

  return (
    <div className="absolute top-1 right-1 bg-black/70 text-white text-xs font-bold px-1.5 py-0.5 rounded-md flex items-center space-x-0.5 z-10">
      <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21L12 17.27z"/>
      </svg>
      <span>{rating}</span> {/* 客户端 useEffect 后渲染的真实评分 */}
    </div>
  );
}; 