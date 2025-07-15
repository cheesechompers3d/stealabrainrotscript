"use client"

import { useEffect, useState, useRef } from "react"
import { useParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ShareBar from "@/components/ShareBar"
import RandomGames from "@/components/RandomGames"
import { GameData, findGameBySlug, getGameSlug } from "@/data/games"
import { getRandomGamesCount } from "@/lib/config"
import { FaExpand, FaCompress } from "react-icons/fa"
import Image from "next/image"
import { defaultConfig } from '@/lib/config'
import { getGameBySlug } from '@/lib/games'

interface GameParams {
  slug: string;
}

// 动态 SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const game = await getGameBySlug(params.slug)
  const fallbackSeo = defaultConfig.seo
  if (!game || !game.seo) {
    return {
      title: fallbackSeo.title,
      description: fallbackSeo.description,
      keywords: fallbackSeo.keywords,
      openGraph: {
        images: fallbackSeo.ogImage ? [fallbackSeo.ogImage] : [],
      },
    }
  }
  return {
    title: game.seo.title || game.title,
    description: game.seo.description || game.description,
    keywords: game.seo.keywords || fallbackSeo.keywords,
    openGraph: {
      images: game.seo.ogImage ? [game.seo.ogImage] : (fallbackSeo.ogImage ? [fallbackSeo.ogImage] : []),
    },
  }
}

export default function GamePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [game, setGame] = useState<GameData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentGame, setCurrentGame] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showOverlay, setShowOverlay] = useState<boolean>(true);
  const iframeContainerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
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

  useEffect(() => {
    // Get current domain
    setCurrentUrl(window.location.origin);
    
    // Find matching game from shared game data
    function loadGame() {
      try {
        const foundGame = findGameBySlug(slug);
        
        if (foundGame) {
          setGame(foundGame);
        } else {
          setError('Game not found');
        }
      } catch (error) {
        console.error('Error loading game data:', error);
        setError('Error loading game data');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadGame();
    }

    // Listen for fullscreen change events
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement === iframeContainerRef.current ||
        document.fullscreenElement === iframeRef.current
      );
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [slug]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
    if (isDarkMode) {
      document.body.classList.add('bg-gray-900');
      document.body.classList.remove('bg-white');
    } else {
      document.body.classList.add('bg-white');
      document.body.classList.remove('bg-gray-900');
    }
  };

  const toggleFullscreen = () => {
    if (!iframeContainerRef.current) return;
    
    if (!document.fullscreenElement) {
      // Enter fullscreen
      if (iframeContainerRef.current.requestFullscreen) {
        iframeContainerRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Navbar onGameSelect={setCurrentGame} onToggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-red-500 mb-4">{error}</h2>
            <p>Please go back to the game list and select another game</p>
            <button 
              onClick={() => window.history.back()}
              className="mt-6 px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Back
            </button>
          </div>
        ) : game && (
          <>
            {/* Game Embed Frame */}
            <div className="relative w-full bg-black rounded-lg overflow-hidden" ref={iframeContainerRef} style={{ paddingTop: '56.25%' }}>
              <iframe
                ref={iframeRef}
                src={game.url}
                className="absolute top-0 left-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={game.name}
              ></iframe>
              
              {/* Game Overlay */}
              {showOverlay && (
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-black/95 z-20 flex flex-col items-center justify-center">
                  {/* 游戏标题和描述 - 添加在遮罩层上方 */}
                  <div className="absolute top-0 left-0 w-full text-center py-4 hidden sm:block">
                    <h1 className="text-4xl font-bold text-purple-300 mb-2">{game.name}</h1>
                  </div>
                  
                  <div className="text-center p-4 sm:p-8 max-w-md bg-black/30 rounded-2xl border border-white/10 shadow-2xl">
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto mb-4 sm:mb-8 rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={game.icon}
                        alt={game.name}
                        className="object-cover w-full h-full"
                        style={{objectFit: 'cover'}}
                        width={160}
                        height={160}
                        loading="lazy"
                      />
                    </div>
                    <button
                      onClick={() => setShowOverlay(false)}
                      className="px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 md:py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl text-white font-bold text-base sm:text-lg md:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 flex items-center justify-center mx-auto"
                    >
                      <span>Play Now</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              
              {/* Fullscreen Button */}
              <button 
                onClick={toggleFullscreen}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <FaCompress size={20} /> : <FaExpand size={20} />}
              </button>
            </div>
            
            {/* 游戏标题栏 - 新的深色导航栏样式 */}
            <div className="flex items-center gap-3 mt-4 bg-gray-800 p-3 rounded-md">
              <div className="relative w-8 h-8 rounded-md overflow-hidden">
                <img
                  src={game.icon}
                  alt={game.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h1 className="text-base sm:text-lg font-bold text-white">{game.name}</h1>
              <div className="ml-auto flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button className="flex items-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 21h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2zM9 9l4.34-4.34L12 10h9v2l-3 7H9V9zM1 9h4v12H1V9z" />
                    </svg>
                    <span className="ml-1 text-white text-sm">{formatNumber(likesCount)}</span>
                  </button>
                  <button className="flex items-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm0 12l-4.34 4.34L12 14H3v-2l3-7h9v10zm4-12h4v12h-4V3z" />
                    </svg>
                    <span className="ml-1 text-white text-sm">{formatNumber(dislikesCount)}</span>
                  </button>
                </div>
                <button className="flex items-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
                <button 
                  onClick={toggleFullscreen}
                  className="flex items-center"
                  title={isFullscreen ? "退出全屏" : "全屏显示"}
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Share Bar */}
            <div className="mt-8">
              <ShareBar url={`${currentUrl}/game/${slug}`} title={`Play ${game.name} - Free Online Game`} />
            </div>
            
            {/* Game Description */}
            <div className="mt-6 bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-3">Game Description</h2>
              <p className="text-gray-300">{game.description}</p>
            </div>
            
            {/* Random Games */}
            <RandomGames 
              count={getRandomGamesCount()} 
              isMobile={false} 
              currentGameSlug={slug}
            />
          </>
        )}
      </div>
      
      <Footer />
    </main>
  );
} 