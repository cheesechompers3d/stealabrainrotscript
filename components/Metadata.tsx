"use client"

import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { defaultConfig } from '@/lib/config'
import { useEffect } from 'react'

export default function CanonicalUrl() {
  const pathname = usePathname()
  const { siteInfo } = defaultConfig
  const canonicalUrl = `${siteInfo.siteUrl}${pathname}`

  useEffect(() => {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.remove();
    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = window.location.origin + window.location.pathname + window.location.search;
    document.head.appendChild(link);
  }, [pathname]);

  return (
    <>
      <Script id="canonical-url" strategy="afterInteractive">
        {`
          (function() {
            var canonical = document.querySelector('link[rel=\\'canonical\\']');
            if (canonical) canonical.remove();
            var link = document.createElement('link');
            link.rel = 'canonical';
            link.href = window.location.origin + window.location.pathname + window.location.search;
            document.head.appendChild(link);
          })();
        `}
      </Script>
    </>
  )
} 