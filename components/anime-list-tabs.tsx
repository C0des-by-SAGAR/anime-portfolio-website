"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimeCard } from "@/components/anime-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface AnimeListTabsProps {
  animeLists: any[]
  userId: string
}

export function AnimeListTabs({ animeLists, userId }: AnimeListTabsProps) {
  const [activeTab, setActiveTab] = useState("watching")

  const watching = animeLists.filter((a) => a.status === "watching")
  const completed = animeLists.filter((a) => a.status === "completed")
  const planToWatch = animeLists.filter((a) => a.status === "plan_to_watch")
  const dropped = animeLists.filter((a) => a.status === "dropped")
  const onHold = animeLists.filter((a) => a.status === "on_hold")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="glass border border-purple-500/20 p-1 mb-8">
        <TabsTrigger
          value="watching"
          className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-400"
        >
          Watching ({watching.length})
        </TabsTrigger>
        <TabsTrigger value="completed" className="data-[state=active]:bg-cyan-600/20 data-[state=active]:text-cyan-400">
          Completed ({completed.length})
        </TabsTrigger>
        <TabsTrigger
          value="plan_to_watch"
          className="data-[state=active]:bg-pink-600/20 data-[state=active]:text-pink-400"
        >
          Plan to Watch ({planToWatch.length})
        </TabsTrigger>
        <TabsTrigger
          value="on_hold"
          className="data-[state=active]:bg-orange-600/20 data-[state=active]:text-orange-400"
        >
          On Hold ({onHold.length})
        </TabsTrigger>
        <TabsTrigger value="dropped" className="data-[state=active]:bg-red-600/20 data-[state=active]:text-red-400">
          Dropped ({dropped.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="watching">
        {watching.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {watching.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} userId={userId} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No anime in watching list"
            description="Start watching some anime to see them here"
            action={
              <Button asChild className="bg-gradient-to-r from-purple-600 to-cyan-600">
                <Link href="/browse">Browse Anime</Link>
              </Button>
            }
          />
        )}
      </TabsContent>

      <TabsContent value="completed">
        {completed.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {completed.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} userId={userId} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No completed anime"
            description="Complete some anime to see them here"
            action={
              <Button asChild className="bg-gradient-to-r from-purple-600 to-cyan-600">
                <Link href="/browse">Browse Anime</Link>
              </Button>
            }
          />
        )}
      </TabsContent>

      <TabsContent value="plan_to_watch">
        {planToWatch.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {planToWatch.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} userId={userId} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No anime in plan to watch"
            description="Add some anime to your plan to watch list"
            action={
              <Button asChild className="bg-gradient-to-r from-purple-600 to-cyan-600">
                <Link href="/browse">Browse Anime</Link>
              </Button>
            }
          />
        )}
      </TabsContent>

      <TabsContent value="on_hold">
        {onHold.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {onHold.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} userId={userId} />
            ))}
          </div>
        ) : (
          <EmptyState title="No anime on hold" description="Anime you've paused will appear here" />
        )}
      </TabsContent>

      <TabsContent value="dropped">
        {dropped.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {dropped.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} userId={userId} />
            ))}
          </div>
        ) : (
          <EmptyState title="No dropped anime" description="Anime you've dropped will appear here" />
        )}
      </TabsContent>
    </Tabs>
  )
}

function EmptyState({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action?: React.ReactNode
}) {
  return (
    <div className="glass rounded-2xl p-12 text-center">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-600/20 to-cyan-600/20 flex items-center justify-center">
        <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
          />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 mb-6">{description}</p>
      {action}
    </div>
  )
}
