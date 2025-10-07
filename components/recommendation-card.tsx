"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface RecommendationCardProps {
  recommendation: any
  userId: string
}

export function RecommendationCard({ recommendation, userId }: RecommendationCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState("plan_to_watch")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const addToList = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.from("anime_lists").insert({
        user_id: userId,
        mal_id: recommendation.mal_id,
        title: recommendation.title,
        image_url: recommendation.image_url,
        status,
      })

      if (error) {
        if (error.code === "23505") {
          alert("This anime is already in your list!")
        } else {
          throw error
        }
      } else {
        setIsOpen(false)
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Error adding anime:", error)
      alert("Failed to add anime to list")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div
        className="glass rounded-xl overflow-hidden group hover:scale-105 transition-all duration-300 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={recommendation.image_url || "/placeholder.svg"}
            alt={recommendation.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {/* Score badge */}
          {recommendation.score > 0 && (
            <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
              <span className="text-yellow-400 text-sm">★</span>
              <span className="text-white text-sm font-semibold">{recommendation.score.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-white mb-2 line-clamp-2 text-sm">{recommendation.title}</h3>
          <p className="text-purple-400 text-xs">{recommendation.reason}</p>
        </div>
      </div>

      {/* Add to List Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="glass border-purple-500/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl text-gradient-anime">{recommendation.title}</DialogTitle>
            <DialogDescription className="text-slate-400">{recommendation.reason}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Image */}
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <Image
                src={recommendation.image_url || "/placeholder.svg"}
                alt={recommendation.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Score */}
            {recommendation.score > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">★</span>
                <span className="font-semibold">{recommendation.score.toFixed(1)}/10</span>
              </div>
            )}

            {/* Add to List */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Add to list:</label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="bg-slate-800/50 border-purple-500/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass border-purple-500/20">
                    <SelectItem value="watching">Watching</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="plan_to_watch">Plan to Watch</SelectItem>
                    <SelectItem value="on_hold">On Hold</SelectItem>
                    <SelectItem value="dropped">Dropped</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={addToList}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500"
              >
                {isLoading ? "Adding..." : "Add to My List"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
