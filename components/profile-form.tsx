"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface ProfileFormProps {
  profile: any
  userId: string
}

export function ProfileForm({ profile, userId }: ProfileFormProps) {
  const [displayName, setDisplayName] = useState(profile?.display_name || "")
  const [bio, setBio] = useState(profile?.bio || "")
  const [favoriteAnime, setFavoriteAnime] = useState(profile?.favorite_anime || "")
  const [favoriteCharacter, setFavoriteCharacter] = useState(profile?.favorite_character || "")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          display_name: displayName || null,
          bio: bio || null,
          favorite_anime: favoriteAnime || null,
          favorite_character: favoriteCharacter || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId)

      if (updateError) throw updateError

      setSuccess(true)
      router.refresh()
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred while updating your profile")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Username (read-only) */}
      <div className="space-y-2">
        <Label htmlFor="username" className="text-slate-200">
          Username
        </Label>
        <Input
          id="username"
          type="text"
          value={profile?.username || ""}
          disabled
          className="bg-slate-800/50 border-purple-500/30 text-slate-400 cursor-not-allowed"
        />
        <p className="text-xs text-slate-500">Username cannot be changed</p>
      </div>

      {/* Display Name */}
      <div className="space-y-2">
        <Label htmlFor="displayName" className="text-slate-200">
          Display Name
        </Label>
        <Input
          id="displayName"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Your display name"
          className="bg-slate-800/50 border-purple-500/30 text-white placeholder:text-slate-500 focus:border-purple-400"
        />
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio" className="text-slate-200">
          Bio
        </Label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us about yourself..."
          rows={4}
          className="w-full rounded-md border border-purple-500/30 bg-slate-800/50 px-3 py-2 text-white placeholder:text-slate-500 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-colors"
        />
      </div>

      {/* Favorite Anime */}
      <div className="space-y-2">
        <Label htmlFor="favoriteAnime" className="text-slate-200">
          Favorite Anime
        </Label>
        <Input
          id="favoriteAnime"
          type="text"
          value={favoriteAnime}
          onChange={(e) => setFavoriteAnime(e.target.value)}
          placeholder="Your favorite anime title"
          className="bg-slate-800/50 border-purple-500/30 text-white placeholder:text-slate-500 focus:border-purple-400"
        />
      </div>

      {/* Favorite Character */}
      <div className="space-y-2">
        <Label htmlFor="favoriteCharacter" className="text-slate-200">
          Favorite Character
        </Label>
        <Input
          id="favoriteCharacter"
          type="text"
          value={favoriteCharacter}
          onChange={(e) => setFavoriteCharacter(e.target.value)}
          placeholder="Your favorite anime character"
          className="bg-slate-800/50 border-purple-500/30 text-white placeholder:text-slate-500 focus:border-purple-400"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
          <p className="text-sm text-green-400">Profile updated successfully!</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold py-6 rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/25"
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save Profile"}
      </Button>
    </form>
  )
}

