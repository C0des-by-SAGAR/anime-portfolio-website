import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { searchAnime, getTopAnime } from "@/lib/jikan"
import { calculateRecommendationScore, extractUserGenres, generateRecommendationReason } from "@/lib/recommendations"

export async function POST() {
  try {
    const supabase = await createClient()

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fetch user's anime list
    const { data: userAnimeList, error: listError } = await supabase
      .from("anime_lists")
      .select("mal_id, title, status, rating")
      .eq("user_id", user.id)

    if (listError) throw listError

    // Fetch user's anime genres
    const { data: animeGenres, error: genresError } = await supabase
      .from("anime_genres")
      .select("genre")
      .in("anime_list_id", userAnimeList?.map((a) => a.id) || [])

    if (genresError) throw genresError

    // Extract user's favorite genres
    const userGenres = extractUserGenres(userAnimeList || [], animeGenres || [])

    // Fetch anime from Jikan API
    const topAnime = await getTopAnime(1)
    let candidateAnime = topAnime.data

    // If user has favorite genres, search for anime in those genres
    if (userGenres.length > 0) {
      const genreSearches = await Promise.all(
        userGenres.slice(0, 2).map((genre) => searchAnime(genre).catch(() => ({ data: [] }))),
      )
      candidateAnime = [...candidateAnime, ...genreSearches.flatMap((result) => result.data)]
    }

    // Calculate scores and sort
    const scoredAnime = candidateAnime
      .map((anime) => ({
        anime,
        score: calculateRecommendationScore(anime, userAnimeList || [], userGenres),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20)

    // Clear old recommendations
    await supabase.from("recommendations").delete().eq("user_id", user.id)

    // Save new recommendations
    const recommendations = scoredAnime.map((item) => ({
      user_id: user.id,
      mal_id: item.anime.mal_id,
      title: item.anime.title,
      image_url: item.anime.images.jpg.large_image_url || item.anime.images.jpg.image_url,
      score: item.anime.score || 0,
      reason: generateRecommendationReason(item.anime, userGenres),
    }))

    const { error: insertError } = await supabase.from("recommendations").insert(recommendations)

    if (insertError) throw insertError

    return NextResponse.json({ success: true, count: recommendations.length })
  } catch (error) {
    console.error("Error generating recommendations:", error)
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 })
  }
}
