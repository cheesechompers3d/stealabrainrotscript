import Image from "next/image"

export default function GameListItem({
  game,
  onSelect,
  slug
}: { 
  game: { name: string; icon: string }; 
  onSelect: () => void;
  slug?: string; // 添加可选的 slug 参数
}) {
  // 构建游戏 URL，如果没有提供 slug，则使用 game.name 的小写版本作为备用
  const gameUrl = `/${slug || game.name.toLowerCase().replace(/\s+/g, '-')}`
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault() // 阻止默认的链接导航行为
    onSelect()
  }
  
  return (
    <a 
      href={gameUrl}
      className="flex flex-col items-center cursor-pointer" 
      onClick={handleClick}
      tabIndex={0}
      aria-label={`Play ${game.name}`}
    >
      <div className="relative aspect-square rounded-full overflow-hidden w-16 h-16 mb-2">
        <img src={game.icon || "/placeholder.svg"} alt={game.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      </div>
      <span className="mt-2 text-sm">{game.name}</span>
    </a>
  )
}

