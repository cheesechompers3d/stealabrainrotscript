import type React from "react"
import "./globals.css"
import GoogleAnalytics from "@/components/GoogleAnalytics"
import { ThemeProvider } from '@/components/theme-provider'
import CanonicalUrl from '@/components/Metadata'
import ScrollToTop from '@/components/ScrollToTop'
import { metadata } from './metadata'

export { metadata }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CanonicalUrl />
          <GoogleAnalytics />
          {children}
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
