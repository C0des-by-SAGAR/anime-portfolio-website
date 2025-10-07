import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { RecommendationsList } from "@/components/recommendations-list"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Personalized Recommendations - AnimeVerse",
  description:
    "Get AI-powered anime recommendations based on your watch history and preferences. Discover hidden gems tailored to your taste.",
  keywords: ["anime recommendations", "personalized anime", "anime suggestions", "what to watch", "anime AI"],
  robots: {
    index: false, // Recommendations are personalized, no need to index
    follow: false,
  },
}

export default async function RecommendationsPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch user's recommendations
  const { data: recommendations } = await supabase
    .from("recommendations")
    .select("*")
    .eq("user_id", user.id)
    .order("score", { ascending: false })

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navigation />

      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-slate-900 to-cyan-950" />
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-glow-pulse delay-1000" />

      {/* Content */}
      <div className="relative pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              <span className="text-gradient-anime">Your Recommendations</span>
            </h1>
            <p className="text-slate-400 text-lg">Personalized anime suggestions based on your watch history</p>
          </div>

          {/* Recommendations */}
          <RecommendationsList recommendations={recommendations || []} userId={user.id} />
        </div>
      </div>
    </div>
  )
}
