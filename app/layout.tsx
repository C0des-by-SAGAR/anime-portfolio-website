import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://animeverse.vercel.app"),
  title: {
    default: "AnimeVerse - Track Your Anime Journey | Personalized Recommendations",
    template: "%s | AnimeVerse",
  },
  description:
    "The ultimate anime tracking platform. Discover new anime, track your watch history, get personalized recommendations, and join a community of anime enthusiasts. Browse 20,000+ anime titles with advanced search and filtering.",
  keywords: [
    "anime tracker",
    "anime list",
    "anime recommendations",
    "myanimelist alternative",
    "anime database",
    "watch anime",
    "anime portfolio",
    "anime community",
    "track anime",
    "anime discovery",
    "best anime",
    "anime genres",
    "anime ratings",
  ],
  authors: [{ name: "AnimeVerse Team" }],
  creator: "AnimeVerse",
  publisher: "AnimeVerse",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://animeverse.vercel.app",
    siteName: "AnimeVerse",
    title: "AnimeVerse - Track Your Anime Journey",
    description:
      "Discover, track, and get personalized anime recommendations. Join thousands of anime fans on their legendary journey.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AnimeVerse - Your Legendary Anime Journey",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AnimeVerse - Track Your Anime Journey",
    description: "Discover, track, and get personalized anime recommendations.",
    images: ["/og-image.jpg"],
    creator: "@animeverse",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  icons: {
    icon: "/website-logo.png",
    shortcut: "/website-logo.png",
    apple: "/website-logo.png",
  },
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "AnimeVerse",
              url: "https://animeverse.vercel.app",
              description: "Track your anime journey, discover new titles, and get personalized recommendations",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://animeverse.vercel.app/browse?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <link rel="canonical" href="https://animeverse.vercel.app" />
        <link rel="icon" href="/website-logo.png" type="image/png" />
      </head>
      <body className="bg-background text-foreground">{children}</body>
    </html>
  )
}
