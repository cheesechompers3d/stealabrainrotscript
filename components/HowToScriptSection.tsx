import React from "react"

interface HowToScriptSectionProps {
  title: string
  steps: string[]
}

const HowToScriptSection: React.FC<HowToScriptSectionProps> = ({ title, steps }) => {
  return (
    <section className="bg-gray-900 rounded-lg p-8 shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-purple-400"><span role="img" aria-label="howto">🛠️</span> {title}</h2>
      <ol className="list-decimal list-inside space-y-3 text-lg text-gray-200">
        {steps.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>
    </section>
  )
}

export default HowToScriptSection 