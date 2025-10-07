"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { gsap } from "gsap"

const stats = [
  { label: "Anime Titles", value: 10000, suffix: "+" },
  { label: "Users", value: 50000, suffix: "+" },
  { label: "Reviews", value: 1000000, suffix: "+" },
  { label: "Updates", value: 24, suffix: "/7" },
]

export function AnimatedStats() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0))

  useEffect(() => {
    if (!isInView) return

    stats.forEach((stat, index) => {
      gsap.to(
        {},
        {
          duration: 2,
          ease: "power2.out",
          onUpdate: function () {
            const progress = this.progress()
            const currentValue = Math.floor(stat.value * progress)
            setAnimatedValues((prev) => {
              const newValues = [...prev]
              newValues[index] = currentValue
              return newValues
            })
          },
        },
      )
    })
  }, [isInView])

  return (
    <section className="relative py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-gradient-anime mb-2">
                  {animatedValues[index].toLocaleString()}
                  {stat.suffix}
                </div>
                <div className="text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
