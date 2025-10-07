"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import type { JikanAnime } from "@/lib/jikan"

interface BrowseAnimeCardProps {
  anime: JikanAnime
  userId: string
}

export function BrowseAnimeCard({ anime, userId }: BrowseAnimeCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState("watching")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const addToList = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.from("anime_lists").insert({
        user_id: userId,
        mal_id: anime.mal_id,
        title: anime.title,
        image_url: anime.images.jpg.large_image_url || anime.images.jpg.image_url,
        status,
        total_episodes: anime.episodes,
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
      <div className="glass rounded-xl overflow-hidden group hover:scale-105 transition-all duration-300 cursor-pointer">
        <div onClick={() => setIsOpen(true)}>
          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
              alt={anime.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {/* Score badge */}
            {anime.score && (
              <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                <span className="text-yellow-400 text-sm">★</span>
                <span className="text-white text-sm font-semibold">{anime.score}</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-semibold text-white mb-2 line-clamp-2 text-sm">{anime.title}</h3>
            {anime.episodes && <p className="text-slate-400 text-xs">{anime.episodes} episodes</p>}
          </div>
        </div>
      </div>

      {/* Add to List Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="glass border-purple-500/20 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-gradient-anime">{anime.title}</DialogTitle>
            {anime.title_english && anime.title_english !== anime.title && (
              <DialogDescription className="text-slate-400">{anime.title_english}</DialogDescription>
            )}
          </DialogHeader>

          <div className="space-y-6">
            {/* Image and Info */}
            <div className="flex gap-6">
              <div className="relative w-32 h-48 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
                  alt={anime.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 space-y-3">
                {anime.score && (
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">★</span>
                    <span className="font-semibold">{anime.score}/10</span>
                  </div>
                )}
                {anime.episodes && (
                  <div className="text-slate-300">
                    <span className="font-semibold">Episodes:</span> {anime.episodes}
                  </div>
                )}
                {anime.status && (
                  <div className="text-slate-300">
                    <span className="font-semibold">Status:</span> {anime.status}
                  </div>
                )}
                {anime.genres && anime.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {anime.genres.map((genre) => (
                      <span
                        key={genre.mal_id}
                        className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Synopsis */}
            {anime.synopsis && (
              <div>
                <h4 className="font-semibold mb-2">Synopsis</h4>
                <p className="text-slate-300 text-sm line-clamp-4">{anime.synopsis}</p>
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
