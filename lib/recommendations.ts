import type { JikanAnime } from "./jikan"

interface UserAnime {
  mal_id: number
  title: string
  status: string
  rating?: number
}

interface AnimeGenre {
  genre: string
}

// Calculate recommendation score based on user preferences
export function calculateRecommendationScore(
  anime: JikanAnime,
  userAnimeList: UserAnime[],
  userGenres: string[],
): number {
  let score = 0

  // Base score from MAL rating
  if (anime.score) {
    score += anime.score * 5 // Weight: 5
  }

  // Genre matching score
  const animeGenres = anime.genres?.map((g) => g.name.toLowerCase()) || []
  const genreMatches = animeGenres.filter((g) => userGenres.includes(g.toLowerCase())).length

  if (genreMatches > 0) {
    score += genreMatches * 15 // Weight: 15 per matching genre
  }

  // Popularity bonus (if highly rated)
  if (anime.score && anime.score >= 8.0) {
    score += 10
  }

  // Penalize if already in user's list
  const alreadyInList = userAnimeList.some((ua) => ua.mal_id === anime.mal_id)
  if (alreadyInList) {
    score -= 1000 // Heavy penalty to exclude from recommendations
  }

  return score
}

// Extract user's favorite genres from their anime list
export function extractUserGenres(userAnimeList: UserAnime[], animeGenres: AnimeGenre[]): string[] {
  const genreCount: Record<string, number> = {}

  // Count genre occurrences from user's completed and highly-rated anime
  animeGenres.forEach((ag) => {
    const genre = ag.genre.toLowerCase()
    genreCount[genre] = (genreCount[genre] || 0) + 1
  })

  // Sort by frequency and return top genres
  return Object.entries(genreCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([genre]) => genre)
}

// Generate recommendation reason
export function generateRecommendationReason(anime: JikanAnime, userGenres: string[]): string {
  const animeGenres = anime.genres?.map((g) => g.name) || []
  const matchingGenres = animeGenres.filter((g) => userGenres.includes(g.toLowerCase()))

  if (matchingGenres.length > 0) {
    return `Based on your love for ${matchingGenres.slice(0, 2).join(" and ")}`
  }

  if (anime.score && anime.score >= 8.5) {
    return "Highly rated by the community"
  }

  return "Popular among anime fans"
}
