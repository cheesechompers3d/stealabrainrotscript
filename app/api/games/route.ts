import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Game, GameFeature } from '@/lib/types'

export async function GET() {
  try {
    // Read games.json
    const gamesJsonPath = path.join(process.cwd(), 'content', 'games.json')
    const gamesJsonContent = await fs.readFile(gamesJsonPath, 'utf8')
    const { games: basicGames } = JSON.parse(gamesJsonContent)

    // Read game markdown files
    const gamesDir = path.join(process.cwd(), 'content', 'games')
    const gameFiles = await fs.readdir(gamesDir)
    const markdownFiles = gameFiles.filter((file) => file.endsWith('.md'))

    // Process each markdown file
    const gameDetails = await Promise.all(
      markdownFiles.map(async (file) => {
        try {
          const filePath = path.join(gamesDir, file)
          const fileContent = await fs.readFile(filePath, 'utf8')
          const { data } = matter(fileContent)
          
          // 确保 features, characteristics 和 whyPlay 的 items 是数组
          const processFeature = (feature: any): GameFeature => {
            if (!feature) {
              return { title: '', items: [], image: '' }
            }

            // 检查并处理 items 数组
            let processedItems: string[] = []
            if (Array.isArray(feature.items)) {
              processedItems = feature.items.map((item: string) => {
                // 移除前导破折号和空格
                let processedItem = item.replace(/^[-\s]+/, '').trim()
                
                // 如果字符串为空，返回空字符串
                if (!processedItem) {
                  return ''
                }
                
                return processedItem
              }).filter(Boolean) // 过滤掉空字符串
            }

            // 确保返回所有必要的属性
            return {
              title: feature.title || '',
              items: processedItems,
              image: feature.image || '' // 确保包含图片属性
            }
          }

          // 处理游戏数据
          const processedData = {
            ...data,
            slug: data.slug,
            features: processFeature(data.features),
            characteristics: processFeature(data.characteristics),
            whyPlay: processFeature(data.whyPlay),
            faq: data.faq || { title: '', items: [] }
          }

          return processedData as Game
        } catch (error) {
          console.error(`Error processing ${file}:`, error)
          return null
        }
      })
    ).then(results => results.filter((result): result is Game => result !== null))

    // Merge basic game info with detailed info
    const games = basicGames.map((basicGame: Partial<Game>) => {
      const details = gameDetails.find((game) => game?.slug === basicGame.slug)
      
      if (details) {
        // Merge details with basic game info, keeping all fields from details
        const mergedGame = {
          ...details,
          // Only override these specific fields from basicGame if they exist
          title: basicGame.title || details.title,
          description: basicGame.description || details.description,
          icon: basicGame.icon || details.icon,
          url: basicGame.url || details.url,
          previewImage: basicGame.previewImage || details.previewImage,
          type: basicGame.type || details.type
        }
        return mergedGame
      }
      
      // If no details found, ensure the basic game has all required fields
      const emptyFeature: GameFeature = {
        title: '',
        items: [],
        image: '' // 移除默认图片
      }
      
      const basicGameWithDefaults: Game = {
        slug: basicGame.slug!,
        title: basicGame.title!,
        description: basicGame.description!,
        icon: basicGame.icon!,
        url: basicGame.url!,
        previewImage: basicGame.previewImage!,
        type: basicGame.type!,
        info: {
          title: 'Game Information',
          content: ''
        },
        videoUrls: [],
        howToPlayIntro: {
          title: 'How to Play',
          content: ''
        },
        howToPlaySteps: [],
        features: emptyFeature,
        characteristics: emptyFeature,
        whyPlay: emptyFeature,
        faq: {
          title: '',
          items: []
        }
      }
      
      return basicGameWithDefaults
    })

    return NextResponse.json(games)
  } catch (error) {
    console.error('Error loading games:', error)
    return NextResponse.json({ error: 'Failed to load games' }, { status: 500 })
  }
} 