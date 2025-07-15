import { defaultConfig } from "@/lib/config"
import type { Metadata } from "next"

// 限制SEO字段长度
const safeTitle = defaultConfig.seo.title.slice(0, 50)
const safeDescription = defaultConfig.seo.description.slice(0, 160)

export const metadata: Metadata = {
  title: safeTitle,
  description: safeDescription,
  keywords: defaultConfig.seo.keywords,
  openGraph: {
    title: safeTitle,
    description: safeDescription,
    url: defaultConfig.siteInfo.siteUrl,
    siteName: defaultConfig.siteName,
    images: [
      {
        url: defaultConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: defaultConfig.siteName,
      }
    ],
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#6d28d9', // 紫色主题色，可根据品牌色调整
} 