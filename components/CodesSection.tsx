import React from "react"

interface CodeItem {
  code: string
  reward: string
}

interface CodesSectionProps {
  title: string
  description?: string
  items: CodeItem[]
}

const CodesSection: React.FC<CodesSectionProps> = ({ title, description, items }) => {
  return (
    <section className="bg-gray-900 rounded-lg p-8 shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-green-400"><span role="img" aria-label="codes">🎁</span> {title}</h2>
      {description && <p className="text-gray-300 mb-6 text-center">{description}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-gray-700">Code</th>
              <th className="px-4 py-2 border-b border-gray-700">Reward</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-800">
                <td className="px-4 py-2 font-mono text-lg">{item.code}</td>
                <td className="px-4 py-2">{item.reward}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default CodesSection 