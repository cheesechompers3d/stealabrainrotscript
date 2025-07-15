import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

interface Game {
  slug: string
  title: string
  description: string
}

export default async function GamesPage() {
  const gamesDirectory = path.join(process.cwd(), 'content/games')
  const files = await fs.readdir(gamesDirectory)
  
  const games = await Promise.all(
    files
      .filter(file => file.endsWith('.md'))
      .map(async (file) => {
        const filePath = path.join(gamesDirectory, file)
        const fileContents = await fs.readFile(filePath, 'utf8')
        const { data } = matter(fileContents)
        
        return {
          slug: file.replace(/\.md$/, ''),
          title: data.title,
          description: data.description,
        }
      })
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Game List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Link 
            href={`/games/${game.slug}`}
            key={game.slug}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-2">{game.title}</h2>
            <p className="text-gray-600">{game.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
} 