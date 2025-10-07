import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { AnimeSearch } from "@/components/anime-search"
import { getTopAnime } from "@/lib/jikan"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Browse Anime - Discover 20,000+ Titles | AnimeVerse",
  description:
    "Search and discover anime from a database of 20,000+ titles. Filter by genre, rating, year, and more. Find your next favorite anime series or movie.",
  keywords: ["browse anime", "anime search", "anime database", "find anime", "anime genres", "top anime"],
  openGraph: {
    title: "Browse Anime - Discover 20,000+ Titles",
    description: "Search and discover anime from a massive database. Filter by genre, rating, and more.",
  },
}

export default async function BrowsePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch top anime as initial data
  const topAnime = await getTopAnime(1)

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
              <span className="text-gradient-anime">Discover Anime</span>
            </h1>
            <p className="text-slate-400 text-lg">Search and explore thousands of anime titles</p>
          </div>

          {/* Search and Results */}
          <AnimeSearch initialAnime={topAnime.data} userId={user.id} />
        </div>
      </div>
    </div>
  )
}
