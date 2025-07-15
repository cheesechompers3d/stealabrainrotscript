"use client"

import { GameFeature } from "@/lib/types"

interface WhyPlayGameProps {
  reasons?: GameFeature
}

export default function WhyPlayGame({ reasons }: WhyPlayGameProps) {
  if (!reasons?.items?.length) {
    return null
  }

  const parseReasonItem = (item: any) => {
    // 如果 item 是对象类型（包含 title 和 description）
    if (typeof item === 'object' && item !== null) {
      return {
        title: item.title || '',
        description: item.description || ''
      }
    }
    
    // 如果 item 是字符串类型
    if (typeof item === 'string') {
      // 尝试用不同的分隔符分割
      const separators = [': ', ': ', '：']
      for (const separator of separators) {
        if (item.includes(separator)) {
          const [title, ...descParts] = item.split(separator)
          return {
            title: title.trim(),
            description: descParts.join(separator).trim()
          }
        }
      }
      // 如果没有找到分隔符，返回整个字符串作为标题
      return {
        title: item,
        description: ''
      }
    }

    // 如果是其他类型，返回空对象
    return {
      title: '',
      description: ''
    }
  }

  return (
    <div className="mt-8">
      <div className="bg-gradient-to-br from-violet-900 to-purple-900 rounded-xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-violet-200 to-purple-200"><span role="img" aria-label="whyplay" className="text-yellow-400 align-middle">🤔</span> {reasons.title}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {reasons.items.map((reason, index) => {
            const { title, description } = parseReasonItem(reason)
            return (
              <div
                key={index}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-400/10 to-purple-400/10 rounded-xl transform transition-transform group-hover:scale-105" />
                <div className="relative p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-violet-400 to-purple-400 flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-violet-200">{title}</h3>
                  </div>
                  {description && (
                    <p className="text-violet-300/90 ml-12">{description}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
} 