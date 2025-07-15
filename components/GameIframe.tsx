"use client"

import { useState, useRef, useEffect } from "react"
import { Game } from "@/lib/games"
import { cn } from "@/lib/utils"
import StarBackground from "./StarBackground";
import GradientBackground from "./GradientBackground"
import WaveBackground from "./WaveBackground"
import NeonGlowBackground from "./NeonGlowBackground"
import ShapeBackground from "./ShapeBackground"

interface GameIframeProps {
  game: Game
  onGameSelect: (slug: string) => void
  isDarkMode: boolean
  isMobile?: boolean
}

export default function GameIframe({ game, onGameSelect, isDarkMode, isMobile }: GameIframeProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isBrowserFullscreen, setIsBrowserFullscreen] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const gameFrameRef = useRef<HTMLDivElement>(null)
  
  // 随机生成点赞和不喜欢数量
  const [likesCount] = useState<number>(Math.floor(Math.random() * 500) * 1000 + 10000);
  const [dislikesCount] = useState<number>(Math.floor(Math.random() * 50) * 1000 + 1000);
  
  // 格式化数字函数
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  // 浏览器内全屏效果控制
  useEffect(() => {
    const body = document.body;
    const gameFrame = gameFrameRef.current;

    if (isBrowserFullscreen) {
      body.style.overflow = 'hidden';
      gameFrame?.classList.add('fixed', 'inset-0', 'z-50', 'w-screen', 'h-screen');
      gameFrame?.classList.remove('relative', 'overflow-hidden', 'bg-gray-900');
    } else {
      body.style.overflow = '';
      gameFrame?.classList.remove('fixed', 'inset-0', 'z-50', 'w-screen', 'h-screen');
      gameFrame?.classList.add('relative',  'overflow-hidden', 'bg-gray-900');
    }
  }, [isBrowserFullscreen]);

  const handleFullscreen = () => {
    if (iframeRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        iframeRef.current.requestFullscreen()
      }
    }
  }

  const handleBrowserFullscreen = () => {
    setIsBrowserFullscreen(!isBrowserFullscreen)
  }

  const handlePlayGame = () => {
    // “Play in New Tab”始终新开窗口打开，不在iframe内打开
    window.open(game.url, "_blank");
  }

  return (
    <div className="transition-all duration-300 relative after:absolute after:inset-0 after:bg-gradient-to-br after:from-purple-500/30 after:via-pink-400/25 after:to-blue-400/20 after:animate-pulse after:z-0 before:absolute before:inset-0 before:bg-gradient-to-tl before:from-blue-500/20 before:via-cyan-400/15 before:to-purple-400/10 before:animate-pulse before:z-0">
      <div ref={gameFrameRef} className={cn(
        "relative overflow-hidden w-full shadow-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black z-10",
        isMobile ? "w-full min-h-[320px]" : "w-full aspect-[16/5.5]"
      )}>
        
        {isPlaying ? (
          <>
            <iframe
              ref={iframeRef}
              src={game.url}
              className="absolute inset-0 w-full h-full border-0 shadow-inner"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={handleFullscreen}
              className={cn(
                "absolute p-3 bg-black bg-opacity-60 hover:bg-opacity-80 text-white rounded-xl transition-all duration-300 z-10 backdrop-blur-sm hover:scale-110 shadow-lg",
                isMobile ? "top-2 right-2" : "top-4 right-4",
                isBrowserFullscreen && "hidden"
              )}
              title="真正全屏"
            >
              <svg
                className={cn(
                  "text-white",
                  isMobile ? "w-5 h-5" : "w-6 h-6"
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2m8-20h2a2 2 0 012 2v2m0 12v2a2 2 0 01-2 2h-2"
                />
              </svg>
            </button>
            {isBrowserFullscreen && (
              <button
                onClick={handleBrowserFullscreen}
                className={cn(
                  "absolute p-3 bg-black bg-opacity-60 hover:bg-opacity-80 text-white rounded-xl transition-all duration-300 z-10 backdrop-blur-sm hover:scale-110 shadow-lg",
                  isMobile ? "top-2 right-2" : "top-4 right-4"
                )}
                title="退出浏览器内全屏"
              >
                <svg
                  className={cn(
                    "text-white",
                    isMobile ? "w-5 h-5" : "w-6 h-6"
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </>
        ) : (
          <>
            {/* 黑色背景区块，风格与第二张图一致 */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 flex flex-col items-center justify-start">
              <StarBackground />
              <WaveBackground />
              <NeonGlowBackground />
              <ShapeBackground />
              <div className={cn(
                "text-center z-10 relative",
                isMobile ? "py-4 max-w-full w-[96vw] px-1 overflow-auto" : "py-16 max-w-4xl w-full px-0"
              )}>
                <h1 className={cn(
                  "font-bold mb-1",
                  isMobile ? "text-white text-lg" : "text-white text-5xl"
                )}><span role="img" aria-label="game">🎮</span> {game.title}</h1>
                <div className={cn(
                  "font-semibold mb-1",
                  isMobile ? "text-green-500 text-sm" : "text-green-500 text-2xl"
                )}>
                  <span role="img" aria-label="tag">🏷️</span> {game.featuresTags}
                </div>
                <p className={cn(
                  "mx-auto mb-2",
                  isMobile ? "text-white text-xs max-w-full" : "text-white text-xl max-w-4xl"
                )}><span role="img" aria-label="desc">📝</span> {game.description}</p>
                <div className={cn(
                  "flex flex-col items-center",
                  isMobile ? "gap-2 mt-2" : "gap-8 mt-8"
                )}>
                  <div className={cn(
                    "relative rounded-2xl overflow-hidden shadow-2xl mx-auto ring-2 ring-purple-500/30 hover:ring-purple-400/50 transition-all duration-300 hover:scale-105",
                    isMobile ? "w-12 h-12 mb-2" : "w-40 h-40 mb-8"
                  )}>
                    <img
                      src={game.icon}
                      alt={game.title}
                      className="object-cover w-full h-full"
                      style={{objectFit: 'cover'}}
                      width={isMobile ? 48 : 160}
                      height={isMobile ? 48 : 160}
                      loading="lazy"
                    />
                  </div>
                  <div className={cn(
                    isMobile ? "flex flex-col gap-2 w-full" : "flex flex-row gap-4 w-full justify-center"
                  )}>
                    <button
                      onClick={() => {
                        const el = document.getElementById('scripts');
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={cn(
                        "border-2 border-green-400 text-white bg-gradient-to-r from-green-600/20 to-teal-600/20 hover:from-green-500 hover:to-teal-500 hover:text-white rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-green-500/50 backdrop-blur-sm",
                        isMobile ? "px-3 py-1 text-xs" : "px-8 py-4 text-lg"
                      )}
                    >
                      Go to Script
                    </button>
                    <button
                      onClick={handlePlayGame}
                      className={cn(
                        "border-2 border-purple-400 text-white bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-500 hover:to-pink-500 hover:text-white rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-purple-500/50 backdrop-blur-sm",
                        isMobile ? "px-3 py-1 text-xs mt-2 mb-2" : "px-10 py-4 text-xl"
                      )}
                    >
                      <span>{game.slug === "steal-a-brainrot" ? "Play Steal a Brainrot" : "Play Now"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

     
    </div>
  )
}

