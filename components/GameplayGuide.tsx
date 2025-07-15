"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { HowToPlayStep } from "@/lib/types"

interface GameplayGuideProps {
  intro?: {
    title: string
    content: string
  }
  steps?: HowToPlayStep[]
  videoUrls?: string[]
}

export default function GameplayGuide({ intro, steps, videoUrls }: GameplayGuideProps) {
  if (!intro && (!steps || steps.length === 0) && (!videoUrls || videoUrls.length === 0)) {
    return null
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-400"><span role="img" aria-label="howto">🎯</span> {intro?.title || "How to Play"}</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-8xl mx-auto">
          {intro?.content}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps && steps.length > 0 && steps.map((step, index) => (
          <div 
            key={index}
            className="relative bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-purple-500 transition-colors"
          >
            {/* 序号圆形背景 */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold border-2 border-gray-900">
              {index + 1}
            </div>
            <h3 className="text-lg font-semibold mb-3 text-purple-400 mt-2">
              {step.title}
            </h3>
            <p className="text-gray-400">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {videoUrls && videoUrls.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-6 text-center">Tutorial Videos</h3>
          {videoUrls.length === 1 ? (
            <div className="w-full aspect-video mx-auto flex items-center justify-center">
              <iframe
                src={`${videoUrls[0]}?autoplay=0&rel=0&showinfo=0&modestbranding=1`}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                title="Game Tutorial Video"
              />
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {videoUrls.map((url, index) => (
                <div key={index} className="aspect-video">
                  <iframe
                    src={`${url}?autoplay=0&rel=0&showinfo=0&modestbranding=1`}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    title="Game Tutorial Video"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
