"use client"

import ScriptBlock from "@/components/ScriptBlock"

interface ScriptItem {
  name: string
  code: string
}

interface ScriptsSectionProps {
  title: string
  description?: string
  items: ScriptItem[]
}

export default function ScriptsSection({ title, description, items }: ScriptsSectionProps) {
  return (
    <section className="my-12">
      <ScriptBlock
        title={title}
        description={description}
        items={items}
      />
    </section>
  )
} 