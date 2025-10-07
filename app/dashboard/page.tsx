import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { AnimeListTabs } from "@/components/anime-list-tabs"
import { DashboardStats } from "@/components/dashboard-stats"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Dashboard - AnimeVerse",
  description: "Manage your anime collection, track your watch progress, and view your personalized stats.",
  robots: {
    index: false, // Dashboard is private, no need to index
    follow: false,
  },
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch user's anime lists
  const { data: animeLists } = await supabase
    .from("anime_lists")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })

  // Fetch user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

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
              <span className="text-gradient-anime">Welcome back, {profile?.display_name || "Anime Fan"}!</span>
            </h1>
            <p className="text-slate-400 text-lg">Continue your legendary anime journey</p>
          </div>

          {/* Stats */}
          <DashboardStats animeLists={animeLists || []} />

          {/* Anime Lists */}
          <div className="mt-12">
            <AnimeListTabs animeLists={animeLists || []} userId={user.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
