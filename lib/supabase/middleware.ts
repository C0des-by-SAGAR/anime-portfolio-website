import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If environment variables are missing, skip Supabase auth and allow the request to proceed
  // This prevents middleware from crashing during build or when env vars aren't configured
  if (!supabaseUrl || !supabaseAnonKey) {
    // Log warning in development, but don't throw error
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY. Get these values from: https://supabase.com/dashboard/project/_/settings/api"
      )
    }
    return supabaseResponse
  }

  try {
    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
          },
        },
      },
    )

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    // Only redirect if we successfully checked auth and user is not logged in
    // If there's an error, allow the request to proceed (might be a temporary issue)
    if (!error && !user && !request.nextUrl.pathname.startsWith("/auth") && request.nextUrl.pathname !== "/") {
      const url = request.nextUrl.clone()
      url.pathname = "/auth/login"
      return NextResponse.redirect(url)
    }
  } catch (error) {
    // If Supabase connection fails, log error but don't crash the middleware
    // This allows the app to continue functioning even if Supabase is temporarily unavailable
    console.error("Middleware Supabase error:", error)
    // Return the response without auth check - let the page handle auth requirements
  }

  return supabaseResponse
}
