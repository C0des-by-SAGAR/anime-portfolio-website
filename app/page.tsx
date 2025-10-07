import { Navigation } from "@/components/navigation"
import { AnimatedHero } from "@/components/animated-hero"
import { AnimatedFeatures } from "@/components/animated-features"
import { AnimatedStats } from "@/components/animated-stats"
import { DomainExpansionButton } from "@/components/domain-expansion-button"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AnimeVerse - Track Your Anime Journey | Personalized Recommendations",
  description:
    "The ultimate anime tracking platform. Discover new anime, track your watch history, get personalized recommendations based on your taste. Browse 20,000+ anime titles with advanced search.",
  openGraph: {
    title: "AnimeVerse - Your Legendary Anime Journey",
    description: "Track anime, discover hidden gems, and get personalized recommendations",
    url: "https://animeverse.vercel.app",
    images: ["/og-image.jpg"],
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navigation />

      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-slate-900 to-cyan-950" />
      <div className="absolute inset-0 bg-[url('/anime-hero-bg.jpg')] opacity-20 bg-cover bg-center" />

      {/* Hero Section with animations */}
      <AnimatedHero />

      {/* Features Section with scroll animations */}
      <AnimatedFeatures />

      {/* Stats Section with counter animations */}
      <AnimatedStats />

      {/* CTA Section with Domain Expansion effect */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-anime">Ready to Begin?</span>
          </h2>
          <p className="text-xl text-slate-300 mb-8">Join thousands of anime fans tracking their legendary journeys.</p>
          <DomainExpansionButton className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold px-12 py-6 text-lg neon-glow">
            <Link href="/auth/sign-up">Create Your Profile</Link>
          </DomainExpansionButton>
        </div>
      </section>
    </div>
  )
}
