"use client"

import { useState, useEffect } from 'react'
import { getSiteConfig } from '@/lib/config'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'

export default function AboutUs() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const config = getSiteConfig()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleNavigateHome = () => {
    router.push('/')
  }

  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      <Navbar
        onToggleTheme={handleToggleTheme}
        isDarkMode={theme === 'dark'}
        onNavigateHome={handleNavigateHome}
      />
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-12">
          <div className="prose max-w-none">
            <h1 className="text-4xl font-bold text-center mb-12 text-black dark:text-white">ABOUT US</h1>
            
            <section className="space-y-6">
              <h3 className="text-2xl font-bold text-black dark:text-white">1. Game Overview</h3>
              <div className="space-y-4 text-black dark:text-gray-300">
                <p>Welcome to {config.siteName}! This is an exciting arcade game that combines skill, strategy, and fun. Players need to flip and match objects while managing momentum and timing to achieve the highest scores possible.</p>
                <p>Whether you're a casual player looking for some quick fun or a competitive gamer aiming for the leaderboards, {config.siteName} offers an engaging experience for everyone.</p>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-2xl font-bold text-black dark:text-white">2. Key Features</h3>
              <div className="space-y-4 text-black dark:text-gray-300">
                <ul className="list-disc pl-6 space-y-2">
                  <li><b>Intuitive Controls:</b> Simple to learn, challenging to master</li>
                  <li><b>Dynamic Gameplay:</b> Each level brings new challenges and excitement</li>
                  <li><b>Progressive Difficulty:</b> Gradually increasing challenge to keep you engaged</li>
                  <li><b>Achievement System:</b> Unlock rewards as you progress</li>
                  <li><b>Global Leaderboards:</b> Compete with players worldwide</li>
                </ul>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-2xl font-bold text-black dark:text-white">3. Game Modes</h3>
              <div className="space-y-4 text-black dark:text-gray-300">
                <ul className="list-disc pl-6 space-y-2">
                  <li><b>Adventure Mode:</b> Progress through increasingly challenging levels</li>
                  <li><b>Time Attack:</b> Race against the clock to achieve high scores</li>
                  <li><b>Practice Mode:</b> Perfect your skills without pressure</li>
                  <li><b>Challenge Mode:</b> Take on special missions and daily tasks</li>
                </ul>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-2xl font-bold text-black dark:text-white">4. Regular Updates</h3>
              <div className="space-y-4 text-black dark:text-gray-300">
                <p>We are committed to continuously improving your gaming experience with:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>New levels and challenges</li>
                  <li>Special events and seasonal content</li>
                  <li>Performance improvements</li>
                  <li>Community-requested features</li>
                  <li>Bug fixes and optimizations</li>
                </ul>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-2xl font-bold text-black dark:text-white">5. Community & Support</h3>
              <div className="space-y-4 text-black dark:text-gray-300">
                <p>Join our growing community and get support through:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Email:
                    <a 
                      href={`mailto:${config.siteInfo.email}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline ml-2"
                    >
                      {config.siteInfo.email}
                    </a>
                  </li>
                  <li>Official Website:
                    <a 
                      href={config.siteInfo.siteUrl}
                      className="text-blue-600 dark:text-blue-400 hover:underline ml-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {config.siteInfo.siteUrl}
                    </a>
                  </li>
                </ul>
                <p>Follow us for the latest news, updates, and community events. Your feedback helps us make the game even better!</p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
} 