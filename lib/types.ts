export interface Control {
  key: string
  action: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface FAQSection {
  title: string
  items: FAQ[]
}

export interface GameInfo {
  developer: string
  rating: number
  votes: number
  releaseDate: string
  lastUpdated: string
  technology: string
  platform: string
  tags: string[]
  controls: Control[]
}

export interface HowToPlayStep {
  title: string
  description: string
}

export interface GameFeature {
  title: string
  items: string[]
  image?: string
}

export interface ScriptItem {
  name: string
  code: string
}

export interface ScriptSection {
  title: string
  description?: string
  items: ScriptItem[]
}

export interface Game {
  slug: string
  title: string
  description: string
  icon: string
  url: string
  previewImage: string
  type: string
  info?: {
    title: string
    content: string
  } // 游戏详细介绍，包含标题和内容
  videoUrls?: string[]
  howToPlayIntro?: {
    title: string
    content: string
  } // 玩法指南介绍，包含标题和内容
  howToPlaySteps?: HowToPlayStep[] // 玩法指南步骤
  features?: GameFeature // 游戏特性
  characteristics?: GameFeature // 游戏特点
  whyPlay?: GameFeature // 为什么要玩
  scripts?: ScriptSection // 游戏脚本
  faq?: FAQSection // 常见问题
  howToScript?: {
    title: string
    steps: string[]
  }
  seo?: {
    title: string
    description: string
    keywords: string
    ogImage: string
  }
  codes?: {
    title: string
    description: string
    items: Array<{
      code: string
      reward: string
    }>
  }
  tableOfContents?: {
    title: string
    items: Array<{
      text: string
      id: string
    }>
  }
  featuresTags?: string
}

export interface SiteConfig {
  defaultGame: string
  siteName: string
  seo: {
    title: string
    description: string
    ogImage: string
    keywords: string
  }
  advertisement: {
    key: string
  }
  gameSettings?: {
    randomGamesCount: number
  }
  siteInfo: {
    companyName: string
    siteUrl: string
    email: string
  }
  footer: {
    columns: Array<{
      title: string
      description?: string
      links: Array<{
        text: string
        url: string
      }>
    }>
    copyright: string
    disclaimer: string
  }
}

