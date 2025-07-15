import { SiteConfig } from './types'

// 由于无法直接导入MD文件，我们使用一个默认配置
export const defaultConfig: SiteConfig = {
  defaultGame: "steal-a-brainrot",
  siteName: "Steal a Brainrot Script",
  seo: {
    title: "Steal a Brainrot Script - Fast-Paced Competitive Game Online",
    description: "Play Steal a Brainrot Script! Compete to steal Brainrot from others while protecting your own. Enjoy chaotic, hilarious, and intense gameplay now!",
    ogImage: "/images/hot_game/steal-a-brainrot.png",
    keywords: "Steal a Brainrot Script, competitive, action, fast-paced, online, multiplayer"
  },
  advertisement: {
    key: ""
  },
  gameSettings: {
    randomGamesCount: 20
  },
  siteInfo: {
    companyName: "Steal a Brainrot Script",
    siteUrl: "https://www.roblox.com/games/109983668079237/Steal-a-Brainrot",
    email: "HarryC199101@gmail.com"
  },
  footer: {
    columns: [],
    copyright: "© 2025 All rights reserved.",
    disclaimer: "This is an independent website."
  }
}

// 获取随机游戏数量配置
export function getRandomGamesCount(): number {
  return defaultConfig.gameSettings?.randomGamesCount || 20
}

// 获取站点配置
export function getSiteConfig(): SiteConfig {
  return defaultConfig
}

export default defaultConfig 