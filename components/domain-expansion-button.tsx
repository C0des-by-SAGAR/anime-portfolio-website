"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

interface DomainExpansionButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export function DomainExpansionButton({ children, onClick, className }: DomainExpansionButtonProps) {
  const [isExpanding, setIsExpanding] = useState(false)

  const handleClick = () => {
    setIsExpanding(true)
    setTimeout(() => {
      setIsExpanding(false)
      onClick?.()
    }, 1000)
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {isExpanding && (
          <>
            {/* Expanding circle effect */}
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-purple-500/30 blur-xl"
            />
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-cyan-500/30 blur-xl"
            />
            {/* Particle effects */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i * Math.PI) / 4) * 100,
                  y: Math.sin((i * Math.PI) / 4) * 100,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 w-2 h-2 bg-purple-400 rounded-full"
              />
            ))}
          </>
        )}
      </AnimatePresence>

      <Button onClick={handleClick} className={className} disabled={isExpanding}>
        {children}
      </Button>
    </div>
  )
}
