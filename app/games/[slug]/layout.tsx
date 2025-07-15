import GameListWrapper from '@/components/GameListWrapper'
import Advertisement from '@/components/Advertisement'
import { getGames, getGameBySlug } from '@/lib/games'
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

export default async function GameLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  const games = await getGames()

  return (
    <div className="mx-auto px-0 py-0">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-4">
          {children}
        </div>
        
      </div>
    </div>
  )
} 