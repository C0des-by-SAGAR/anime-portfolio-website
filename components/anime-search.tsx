"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BrowseAnimeCard } from "@/components/browse-anime-card"
import { searchAnime, getAnimeByGenre, GENRES, type JikanAnime } from "@/lib/jikan"

interface AnimeSearchProps {
  initialAnime: JikanAnime[]
  userId: string
}

export function AnimeSearch({ initialAnime, userId }: AnimeSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState<string>("all")
  const [animeList, setAnimeList] = useState<JikanAnime[]>(initialAnime)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await searchAnime(searchQuery)
      setAnimeList(result.data)
    } catch (err) {
      setError("Failed to search anime. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenreChange = async (genreId: string) => {
    setSelectedGenre(genreId)
    if (genreId === "all") {
      setAnimeList(initialAnime)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await getAnimeByGenre(Number.parseInt(genreId))
      setAnimeList(result.data)
    } catch (err) {
      setError("Failed to filter by genre. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="space-y-8">
      {/* Search and Filter */}
      <div className="glass rounded-2xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex gap-2">
            <Input
              placeholder="Search anime..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-slate-800/50 border-purple-500/30 text-white placeholder:text-slate-500"
            />
            <Button
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500"
            >
              Search
            </Button>
          </div>

          <Select value={selectedGenre} onValueChange={handleGenreChange}>
            <SelectTrigger className="w-full md:w-48 bg-slate-800/50 border-purple-500/30 text-white">
              <SelectValue placeholder="Filter by genre" />
            </SelectTrigger>
            <SelectContent className="glass border-purple-500/20">
              <SelectItem value="all">All Genres</SelectItem>
              {GENRES.map((genre) => (
                <SelectItem key={genre.id} value={genre.id.toString()}>
                  {genre.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="glass rounded-xl p-4 border border-red-500/30">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          <p className="text-slate-400 mt-4">Loading anime...</p>
        </div>
      )}

      {/* Results Grid */}
      {!isLoading && animeList.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {animeList.map((anime) => (
            <BrowseAnimeCard key={anime.mal_id} anime={anime} userId={userId} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && animeList.length === 0 && (
        <div className="glass rounded-2xl p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-600/20 to-cyan-600/20 flex items-center justify-center">
            <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">No anime found</h3>
          <p className="text-slate-400">Try a different search term or genre</p>
        </div>
      )}
    </div>
  )
}
