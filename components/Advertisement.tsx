"use client"

import { useEffect, useRef } from 'react'
import { defaultConfig } from '@/lib/config'

interface AdvertisementProps {
  position: 'sidebar' | 'content'
  isAdSlot?: boolean
  index?: number
}

export default function Advertisement({ position, isAdSlot, index = 0 }: AdvertisementProps) {
  const adContainerRef = useRef<HTMLDivElement>(null)

  // 如果广告key为空，直接返回null
  if (!defaultConfig.advertisement?.key) {
    return null
  }

  useEffect(() => {
    if (isAdSlot && adContainerRef.current) {
      // 使用延迟加载，每个广告错开加载时间
      const timeout = setTimeout(() => {
        // 为每个广告实例创建唯一的配置
        const configScript = document.createElement('script')
        configScript.type = 'text/javascript'
        configScript.text = `
          window.atOptions = {
            'key': '${defaultConfig.advertisement.key}',
            'format': 'iframe',
            'height': 250,
            'width': 300,
            'params': {}
          };
        `
        adContainerRef.current?.appendChild(configScript)

        // 加载广告脚本
        const adScript = document.createElement('script')
        adScript.src = `//www.highperformanceformat.com/${defaultConfig.advertisement.key}/invoke.js`
        adScript.async = true
        adScript.type = "text/javascript"
        adContainerRef.current?.appendChild(adScript)
      }, index * 1000) // 每个广告间隔1秒加载

      return () => {
        clearTimeout(timeout)
        // 清理脚本
        if (adContainerRef.current) {
          const scripts = adContainerRef.current.getElementsByTagName('script')
          Array.from(scripts).forEach(script => script.remove())
        }
      }
    }
  }, [isAdSlot, index])

  if (isAdSlot) {
    return (
      <div ref={adContainerRef} className="ad-container h-[250px] w-[300px]" />
    )
  }

  return (
    <div className={`ad-container ${position === 'sidebar' ? 'h-[600px]' : 'h-[250px]'} bg-gray-100 rounded-lg flex items-center justify-center`}>
      <span className="text-gray-500">广告位</span>
    </div>
  )
} 