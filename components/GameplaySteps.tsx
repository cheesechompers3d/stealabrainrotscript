"use client"

interface GameplayStepsProps {
  steps?: string[]
}

export default function GameplaySteps({ steps }: GameplayStepsProps) {
  if (!steps?.length) {
    return null
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
      <div className="grid gap-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
          >
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full">
              {index + 1}
            </div>
            <p className="text-lg">{step}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
