"use client"

import { useEffect, useState } from "react"

interface FooterConfig {
  columns: Array<{
    title: string
    description?: string
    links?: Array<{
      text: string
      url: string
    }>
    anchors?: Array<{
      text: string
      id: string
    }>
  }>
  copyright: string
  disclaimer: string
}

export default function Footer() {
  const [config, setConfig] = useState<FooterConfig | null>(null)

  useEffect(() => {
    // 从 API 加载配置
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        setConfig(data.footer)
      })
      .catch(error => {
        console.error('Error loading footer config:', error)
      })
  }, [])

  if (!config) return null

  return (
    <footer className="bg-gray-800 py-8 z-0">
      <div className="container mx-auto px-4 lg:px-[100px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {config.columns.map((column, index) => (
            <div key={index}>
              <h3 className="text-2xl font-bold text-white mb-4">{column.title}</h3>
              {column.description && (
                <p className="text-gray-400">{column.description}</p>
              )}
              {/* Games锚点导航，优先anchors字段 */}
              {Array.isArray((column as any).anchors) ? (
                <ul className="space-y-2">
                  {(column as any).anchors.map((item: { text: string; id: string }) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        tabIndex={0}
                        aria-label={`Scroll to ${item.text}`}
                        className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer outline-none focus:underline"
                        onClick={e => {
                          e.preventDefault();
                          const el = document.getElementById(item.id);
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            const el = document.getElementById(item.id);
                            if (el) {
                              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }
                        }}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : column.links && (
                <ul className="space-y-2">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.url}
                        className="text-blue-400 hover:text-blue-300 transition-colors relative"
                        target={link.url.startsWith('#') ? undefined : "_blank"}
                        rel={link.url.startsWith('#') ? undefined : "noopener noreferrer"}
                        onClick={e => {
                          if (link.url.startsWith('#')) {
                            e.preventDefault();
                            const id = link.url.slice(1);
                            const el = document.getElementById(id);
                            if (el) {
                              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }
                        }}
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">{config.copyright}</p>
          <p className="text-gray-500 mt-2">
            Disclaimer: {config.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  )
}

