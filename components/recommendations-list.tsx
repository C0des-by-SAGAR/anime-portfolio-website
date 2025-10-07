"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RecommendationCard } from "@/components/recommendation-card"
import { useRouter } from "next/navigation"

interface RecommendationsListProps {
  recommendations: any[]
  userId: string
}

export function RecommendationsList({ recommendations, userId }: RecommendationsListProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const router = useRouter()

  const generateRecommendations = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch("/api/recommendations/generate", {
        method: "POST",
      })

      if (!response.ok) throw new Error("Failed to generate recommendations")

      router.refresh()
    } catch (error) {
      console.error("Error generating recommendations:", error)
      alert("Failed to generate recommendations. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  if (recommendations.length === 0) {
    return (
      <div className="glass rounded-2xl p-12 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-600/20 to-cyan-600/20 flex items-center justify-center">
          <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">No Recommendations Yet</h3>
        <p className="text-slate-400 mb-6">
          Generate personalized recommendations based on your anime watch history and preferences.
        </p>
        <Button
          onClick={generateRecommendations}
          disabled={isGenerating}
          className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500"
        >
          {isGenerating ? "Generating..." : "Generate Recommendations"}
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Regenerate button */}
      <div className="flex justify-end">
        <Button
          onClick={generateRecommendations}
          disabled={isGenerating}
          variant="outline"
          className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 bg-transparent"
        >
          {isGenerating ? "Regenerating..." : "Regenerate Recommendations"}
        </Button>
      </div>

      {/* Recommendations grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {recommendations.map((recommendation) => (
          <RecommendationCard key={recommendation.id} recommendation={recommendation} userId={userId} />
        ))}
      </div>
    </div>
  )
}
