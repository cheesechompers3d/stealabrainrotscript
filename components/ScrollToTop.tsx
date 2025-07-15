"use client"

import { useState, useEffect } from 'react'
import { FaArrowUp } from 'react-icons/fa'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // 监听滚动事件，当页面滚动超过300px时显示按钮
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    
    // 清理事件监听
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  // 滚动到顶部的函数
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 sm:bottom-6 left-6 sm:left-auto sm:right-6 p-3 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 transition-all duration-300 z-50 hover:scale-110"
          aria-label="返回顶部"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </>
  )
} 