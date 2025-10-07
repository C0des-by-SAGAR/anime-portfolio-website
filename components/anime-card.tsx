"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface AnimeCardProps {
  anime: any
  userId: string
}

export function AnimeCard({ anime, userId }: AnimeCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const updateStatus = async (newStatus: string) => {
    setIsLoading(true)
    try {
      const { error } = await supabase.from("anime_lists").update({ status: newStatus }).eq("id", anime.id)

      if (error) throw error
      router.refresh()
    } catch (error) {
      console.error("Error updating status:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteAnime = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.from("anime_lists").delete().eq("id", anime.id)

      if (error) throw error
      router.refresh()
    } catch (error) {
      console.error("Error deleting anime:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "watching":
        return "from-purple-600 to-purple-400"
      case "completed":
        return "from-cyan-600 to-cyan-400"
      case "plan_to_watch":
        return "from-pink-600 to-pink-400"
      case "on_hold":
        return "from-orange-600 to-orange-400"
      case "dropped":
        return "from-red-600 to-red-400"
      default:
        return "from-slate-600 to-slate-400"
    }
  }

  return (
    <div className="glass rounded-xl overflow-hidden group hover:scale-105 transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={anime.image_url || "/placeholder.svg?height=400&width=300"}
          alt={anime.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="space-y-2">
            {anime.rating && (
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-sm">★</span>
                <span className="text-white text-sm font-semibold">{anime.rating}/10</span>
              </div>
            )}
            {anime.episodes_watched !== null && anime.total_episodes && (
              <div className="text-white text-sm">
                {anime.episodes_watched}/{anime.total_episodes} episodes
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-white mb-2 line-clamp-2 text-sm">{anime.title}</h3>

        {/* Status badge */}
        <div
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getStatusColor(anime.status)} text-white mb-3`}
        >
          {anime.status.replace("_", " ")}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-purple-500/30 text-purple-400 hover:bg-purple-500/10 bg-transparent"
                disabled={isLoading}
              >
                Change Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glass border-purple-500/20">
              <DropdownMenuItem onClick={() => updateStatus("watching")} className="text-purple-400">
                Watching
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateStatus("completed")} className="text-cyan-400">
                Completed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateStatus("plan_to_watch")} className="text-pink-400">
                Plan to Watch
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateStatus("on_hold")} className="text-orange-400">
                On Hold
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateStatus("dropped")} className="text-red-400">
                Dropped
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="sm"
            onClick={deleteAnime}
            disabled={isLoading}
            className="text-red-400 hover:bg-red-500/10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )
}
