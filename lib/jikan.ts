// Jikan API v4 client
const JIKAN_BASE_URL = "https://api.jikan.moe/v4"

export interface JikanAnime {
  mal_id: number
  title: string
  title_english?: string
  images: {
    jpg: {
      image_url: string
      large_image_url: string
    }
  }
  score?: number
  episodes?: number
  status?: string
  aired?: {
    from?: string
    to?: string
  }
  genres?: Array<{ mal_id: number; name: string }>
  studios?: Array<{ mal_id: number; name: string }>
  synopsis?: string
  year?: number
  rating?: string
}

export interface JikanResponse {
  data: JikanAnime[]
  pagination: {
    last_visible_page: number
    has_next_page: boolean
    current_page: number
  }
}

// Rate limiting helper
let lastRequestTime = 0
const MIN_REQUEST_INTERVAL = 1000 // 1 second between requests

async function rateLimit() {
  const now = Date.now()
  const timeSinceLastRequest = now - lastRequestTime
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    await new Promise((resolve) => setTimeout(resolve, MIN_REQUEST_INTERVAL - timeSinceLastRequest))
  }
  lastRequestTime = Date.now()
}

export async function searchAnime(query: string, page = 1): Promise<JikanResponse> {
  await rateLimit()
  const response = await fetch(`${JIKAN_BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}&limit=20`)
  if (!response.ok) throw new Error("Failed to search anime")
  return response.json()
}

export async function getTopAnime(page = 1): Promise<JikanResponse> {
  await rateLimit()
  const response = await fetch(`${JIKAN_BASE_URL}/top/anime?page=${page}&limit=20`)
  if (!response.ok) throw new Error("Failed to fetch top anime")
  return response.json()
}

export async function getAnimeByGenre(genreId: number, page = 1): Promise<JikanResponse> {
  await rateLimit()
  const response = await fetch(`${JIKAN_BASE_URL}/anime?genres=${genreId}&page=${page}&limit=20`)
  if (!response.ok) throw new Error("Failed to fetch anime by genre")
  return response.json()
}

export async function getAnimeById(id: number): Promise<{ data: JikanAnime }> {
  await rateLimit()
  const response = await fetch(`${JIKAN_BASE_URL}/anime/${id}`)
  if (!response.ok) throw new Error("Failed to fetch anime details")
  return response.json()
}

export async function getSeasonalAnime(year: number, season: string): Promise<JikanResponse> {
  await rateLimit()
  const response = await fetch(`${JIKAN_BASE_URL}/seasons/${year}/${season}`)
  if (!response.ok) throw new Error("Failed to fetch seasonal anime")
  return response.json()
}

// Genre IDs for filtering
export const GENRES = [
  { id: 1, name: "Action" },
  { id: 2, name: "Adventure" },
  { id: 4, name: "Comedy" },
  { id: 8, name: "Drama" },
  { id: 10, name: "Fantasy" },
  { id: 14, name: "Horror" },
  { id: 22, name: "Romance" },
  { id: 24, name: "Sci-Fi" },
  { id: 36, name: "Slice of Life" },
  { id: 37, name: "Supernatural" },
  { id: 41, name: "Thriller" },
]
