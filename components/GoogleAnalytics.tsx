"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import ReactGA from 'react-ga4'

// 获取环境变量中的 Google Analytics ID
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// 初始化 Google Analytics
if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize("G-FF6NLS9327")
}

export default function GoogleAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    // 每次路由变化时发送页面视图事件
    ReactGA.send({ hitType: 'pageview', page: pathname })
  }, [pathname])

  return null
}
