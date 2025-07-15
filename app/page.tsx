import type { Metadata } from "next"
import { defaultConfig } from "@/lib/config"
import ClientPage from "@/components/ClientPage"

export const metadata: Metadata = {
  title: defaultConfig.seo.title,
  description: defaultConfig.seo.description

}

export default function Page() {
  return <ClientPage />
}

