import { getGameBySlug } from '@/lib/games'
import { defaultConfig } from '@/lib/config'

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

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
} 