"use client"

interface DashboardStatsProps {
  animeLists: any[]
}

export function DashboardStats({ animeLists }: DashboardStatsProps) {
  const watching = animeLists.filter((a) => a.status === "watching").length
  const completed = animeLists.filter((a) => a.status === "completed").length
  const planToWatch = animeLists.filter((a) => a.status === "plan_to_watch").length
  const totalEpisodes = animeLists.reduce((sum, a) => sum + (a.episodes_watched || 0), 0)

  const stats = [
    { label: "Watching", value: watching, color: "from-purple-600 to-purple-400" },
    { label: "Completed", value: completed, color: "from-cyan-600 to-cyan-400" },
    { label: "Plan to Watch", value: planToWatch, color: "from-pink-600 to-pink-400" },
    { label: "Episodes Watched", value: totalEpisodes, color: "from-orange-600 to-orange-400" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="glass rounded-xl p-6 hover:scale-105 transition-transform">
          <div
            className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
          >
            {stat.value}
          </div>
          <div className="text-slate-400 text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
