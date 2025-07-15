"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import GameIframe from "./GameIframe"
import GameList from "./GameList"
import GameplayGuide from "./GameplayGuide"
import GameFeatures from "./GameFeatures"
import WhyPlayGame from "./WhyPlayGame"
import FAQ from "./FAQ"
import ScriptsSection from "./ScriptsSection"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useGames } from "@/hooks/useGames"
import { useRouter, usePathname } from "next/navigation"
import { Game } from "@/lib/games"
import { cn } from "@/lib/utils"
import HowToScriptSection from "./HowToScriptSection"
import CodesSection from "./CodesSection"
import TableOfContentsSection from "./TableOfContentsSection"
import ShareBar from "./ShareBar"

interface HomeProps {
  defaultGame: Game | null
  onGameSelect?: (slug: string) => void
}

export default function Home({ defaultGame, onGameSelect }: HomeProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === "dark"
  const { games, loading } = useGames()
  const [currentGame, setCurrentGame] = useState<string | null>(null)
  const [showGameList, setShowGameList] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (defaultGame && !currentGame) {
      setCurrentGame(defaultGame.slug)
    }
  }, [defaultGame, currentGame])

  const handleGameSelect = (slug: string) => {
    if (slug === currentGame) return
    setCurrentGame(slug)
    setShowGameList(false)
    
    // 如果提供了外部的onGameSelect处理函数，则调用它
    if (onGameSelect) {
      onGameSelect(slug)
    } else {
      // 否则使用默认的路由导航
      router.push(`/game/${slug}`, { scroll: true })
    }
  }

  const handleToggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark")
  }

  const selectedGame = currentGame ? games?.find(game => game.slug === currentGame) : defaultGame

  return (
    <div>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <div id="home"></div>
        <Navbar 
          currentGameTitle={selectedGame?.title}
          onShowGameList={() => setShowGameList(true)}
          isMobile={isMobile}
        />
        <main>
          {/* GameIframe 左右全铺，顶部无间隔 */}
          {selectedGame && (
            <div id="game-frame" className="w-full">
              <GameIframe
                game={selectedGame}
                onGameSelect={handleGameSelect}
                isDarkMode={isDarkMode}
                isMobile={isMobile}
              />
            </div>
          )}
          
          <div className="flex justify-center">
            {/* 左侧固定宽度空白区域 */}
            <div className="hidden lg:block flex-shrink-0"></div>

            {/* 中间内容区域 居中显示 */}
            <div className="w-full sm:w-4/5 mx-auto p-8 md:p-8 px-4 py-6">
              {loading ? (
                <div className="flex items-center justify-center h-96">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
                </div>
              ) : selectedGame ? (
                <>
                  {/* Game Info Section */}
                  {selectedGame.info && (
                    <div id="what-is-a-steal-a-brainrot-script" className={cn(
                      "bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl p-6 mt-8 w-full mx-auto shadow-xl border border-gray-700/50",
                      isMobile && "p-4"
                    )}>
                      <h2 className="text-2xl font-bold mb-4 drop-shadow-lg">
                        <span role="img" aria-label="info" className="align-middle">📖</span> <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">{selectedGame.info.title}</span>
                      </h2>
                      <p className="text-gray-300 leading-relaxed">
                        {selectedGame.info.content}
                      </p>
                    </div>
                  )}

                  {/* Share Bar */}
                  <div className="mt-8">
                    <ShareBar title={selectedGame.title} url={typeof window !== 'undefined' ? window.location.href : ''} />
                  </div>

                  {/* Table of Contents Section */}
                  {selectedGame.tableOfContents?.items && selectedGame.tableOfContents.items.length > 0 && (
                    <TableOfContentsSection
                      title={selectedGame.tableOfContents.title}
                      items={selectedGame.tableOfContents.items}
                    />
                  )}

                  {/* Features Section */}
                  {selectedGame.features?.items && selectedGame.features.items.length > 0 && (
                    <div id="key-features-of-steal-a-brainrot-script" className="mt-8">
                      <GameFeatures
                        features={selectedGame.features}
                      />
                    </div>
                  )}
                  {/* How to Play Section */}
                  {selectedGame.howToPlayIntro?.content && selectedGame.howToPlaySteps && selectedGame.howToPlaySteps.length > 0 && (
                    <div id="how-to-play" className="mt-8">
                      <h2 className="text-2xl font-bold mb-4 text-white">
                        {selectedGame.howToPlayIntro.title || "How to Play"}
                      </h2>
                      <GameplayGuide
                        intro={selectedGame.howToPlayIntro}
                        steps={selectedGame.howToPlaySteps}
                        videoUrls={selectedGame.videoUrls}
                      />
                    </div>
                  )}
                  {/* Why Play Section */}
                  {selectedGame.whyPlay?.items && selectedGame.whyPlay.items.length > 0 && (
                    <div id="why-play" className="mt-8">
                      <WhyPlayGame reasons={selectedGame.whyPlay} />
                    </div>
                  )}
                  {/* Scripts Section */}
                  {selectedGame.scripts?.items && selectedGame.scripts.items.length > 0 && (
                    <div id="scripts" className="mt-8">
                      <ScriptsSection
                        title={selectedGame.scripts.title}
                        description={selectedGame.scripts.description}
                        items={selectedGame.scripts.items}
                      />
                    </div>
                  )}
                  {/* How to Play Script Section（紧跟在ScriptsSection后面） */}
                  {selectedGame.howToScript?.steps && selectedGame.howToScript.steps.length > 0 && (
                    <div id="code" className="mt-8">
                      <HowToScriptSection
                        title={selectedGame.howToScript.title}
                        steps={selectedGame.howToScript.steps}
                      />
                    </div>
                  )}
                  {/* Codes Section（紧跟在HowToScriptSection后面） */}
                  {selectedGame.codes?.items && selectedGame.codes.items.length > 0 && (
                    <div id="codes" className="mt-8">
                      <CodesSection
                        title={selectedGame.codes.title}
                        description={selectedGame.codes.description}
                        items={selectedGame.codes.items}
                      />
                    </div>
                  )}
                  {/* FAQ Section */}
                  {selectedGame.faq?.items && selectedGame.faq.items.length > 0 && (
                    <div id="faq" className="mt-8">
                      <FAQ faq={selectedGame.faq} />
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <h1 className="text-3xl font-bold mb-4">Welcome to Game Portal</h1>
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    Select a game from the list to start playing
                  </p>
                </div>
              )}
            </div>
            {/* 删除右侧Hot Games和移动端Hot Games相关内容 */}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
} 