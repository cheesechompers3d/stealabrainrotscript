"use client"

import { useState, useEffect } from 'react'
import { getSiteConfig } from '@/lib/config'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'

export default function ContactUs() {
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
            <h1 className="text-4xl font-bold text-center mb-12 text-black dark:text-white">CONTACT US</h1>
            
            <section className="space-y-6">
              <h3 className="text-2xl font-bold text-black dark:text-white">1. Contact Information</h3>
              <div className="space-y-4 text-black dark:text-gray-300">
                <p>You can reach us through the following channels:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Email:
                    <a 
                      href={`mailto:${config.siteInfo.email}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline ml-2"
                    >
                      {config.siteInfo.email}
                    </a>
                  </li>
                  <li>Website:
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
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-2xl font-bold text-black dark:text-white">2. Business Hours</h3>
              <div className="space-y-4 text-black dark:text-gray-300">
                <p>Our support team is available during the following hours:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Working Days: Monday to Friday</li>
                  <li>Hours: 9:00 AM - 6:00 PM (UTC+8)</li>
                  <li>Response Time: Usually within 24-48 hours</li>
                </ul>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-2xl font-bold text-black dark:text-white">3. Feedback & Suggestions</h3>
              <div className="space-y-4 text-black dark:text-gray-300">
                <p>We value your feedback and suggestions. Please contact us if you have any:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Product Usage Questions</li>
                  <li>Feature Enhancement Suggestions</li>
                  <li>Technical Support Needs</li>
                  <li>Business Cooperation Inquiries</li>
                  <li>Other Related Matters</li>
                </ul>
                <p>Feel free to reach out to us, and we will respond to your inquiry as soon as possible.</p>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-2xl font-bold text-black dark:text-white">4. Urgent Support</h3>
              <div className="space-y-4 text-black dark:text-gray-300">
                <p>If you have an urgent issue that requires immediate attention, please mark your email subject as "URGENT", and we will prioritize your request.</p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
} 