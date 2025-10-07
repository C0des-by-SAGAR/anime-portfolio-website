"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AnimatedHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title with stagger effect
      gsap.from(".hero-title", {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "power4.out",
        stagger: 0.2,
      })

      // Animate subtitle
      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      })

      // Animate CTA buttons
      gsap.from(".hero-cta", {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        delay: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.1,
      })

      // Animate floating orbs
      gsap.to(".floating-orb", {
        y: "random(-30, 30)",
        x: "random(-30, 30)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.5,
          from: "random",
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <motion.section ref={containerRef} style={{ y, opacity }} className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Animated floating orbs */}
      <div className="floating-orb absolute top-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="floating-orb absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      <div className="floating-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-8">
          {/* Main heading with split animation */}
          <h1 className="text-6xl md:text-8xl font-bold text-balance">
            <div className="hero-title text-gradient-anime">Your Legendary</div>
            <div className="hero-title text-white">Anime Journey</div>
          </h1>

          {/* Subheading */}
          <p className="hero-subtitle text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto text-pretty">
            Track your anime adventures, discover hidden gems, and unlock personalized recommendations powered by your
            unique taste.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button
              asChild
              size="lg"
              className="hero-cta bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold px-8 py-6 text-lg neon-glow"
            >
              <Link href="/auth/sign-up">Start Your Journey</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="hero-cta border-purple-500/30 text-purple-400 hover:bg-purple-500/10 px-8 py-6 text-lg bg-transparent"
            >
              <Link href="/browse">Explore Anime</Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
