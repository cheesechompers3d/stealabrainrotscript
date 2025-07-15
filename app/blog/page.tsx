export default function Blog() {
  const posts = [
    {
      title: "New Game Features Coming Soon!",
      date: "2023-06-15",
      excerpt: "We're excited to announce some thrilling new features coming to Awesome Game...",
    },
    {
      title: "Player Spotlight: Meet the Champions",
      date: "2023-06-10",
      excerpt: "In this month's Player Spotlight, we're featuring the top players who have...",
    },
    {
      title: "Behind the Scenes: Game Development Process",
      date: "2023-06-05",
      excerpt: "Ever wondered how we create the immersive world of Awesome Game? In this post...",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="space-y-8">
        {posts.map((post, index) => (
          <article key={index} className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-400 mb-4">{post.date}</p>
            <p>{post.excerpt}</p>
            <a href="#" className="text-blue-400 hover:underline mt-2 inline-block">
              Read more
            </a>
          </article>
        ))}
      </div>
    </div>
  )
}

