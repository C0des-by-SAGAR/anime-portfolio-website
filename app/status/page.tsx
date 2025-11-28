"use client"

import { useEffect, useState } from "react"

export default function StatusPage() {
  const [status, setStatus] = useState<{
    supabaseUrl: boolean
    supabaseKey: boolean
    supabaseUrlValue: string | null
    supabaseKeyValue: string | null
    message: string
  } | null>(null)

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    setStatus({
      supabaseUrl: !!supabaseUrl,
      supabaseKey: !!supabaseKey,
      supabaseUrlValue: supabaseUrl || null,
      supabaseKeyValue: supabaseKey ? `${supabaseKey.substring(0, 20)}...` : null,
      message: supabaseUrl && supabaseKey ? "All environment variables are set!" : "Some environment variables are missing.",
    })
  }, [])

  if (!status) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-slate-900 to-cyan-950 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Environment Variables Status
          </h1>

          <div className="space-y-4 mb-6">
            <div className="p-4 bg-slate-900/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300 font-medium">NEXT_PUBLIC_SUPABASE_URL</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    status.supabaseUrl
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-red-500/20 text-red-400 border border-red-500/30"
                  }`}
                >
                  {status.supabaseUrl ? "✓ Set" : "✗ Missing"}
                </span>
              </div>
              {status.supabaseUrlValue && (
                <p className="text-xs text-slate-500 mt-2 font-mono break-all">{status.supabaseUrlValue}</p>
              )}
            </div>

            <div className="p-4 bg-slate-900/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300 font-medium">NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    status.supabaseKey
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-red-500/20 text-red-400 border border-red-500/30"
                  }`}
                >
                  {status.supabaseKey ? "✓ Set" : "✗ Missing"}
                </span>
              </div>
              {status.supabaseKeyValue && (
                <p className="text-xs text-slate-500 mt-2 font-mono">{status.supabaseKeyValue}</p>
              )}
            </div>
          </div>

          {!status.supabaseUrl || !status.supabaseKey ? (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 mb-6">
              <h2 className="text-yellow-400 font-semibold mb-3">Setup Required</h2>
              <div className="space-y-4">
                <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                  <p className="text-red-400 text-sm font-semibold mb-1">⚠️ Important:</p>
                  <p className="text-slate-300 text-xs">
                    After adding variables, you <strong>MUST redeploy</strong> for them to take effect. Variables are embedded at build time!
                  </p>
                </div>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
                  <li>Go to <a href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">Vercel Dashboard</a></li>
                  <li>Select your project: <code className="bg-slate-900 px-2 py-1 rounded text-xs">anime-portfolio-website</code></li>
                  <li>Navigate to <strong>Settings</strong> → <strong>Environment Variables</strong></li>
                  <li>
                    Add <code className="bg-slate-900 px-2 py-1 rounded text-xs">NEXT_PUBLIC_SUPABASE_URL</code>
                    <br />
                    <span className="text-xs text-slate-400 ml-6">Value: </span>
                    <code className="bg-slate-900 px-2 py-1 rounded text-xs">https://mfgzaxdcsmdtsteoqrpa.supabase.co</code>
                  </li>
                  <li>
                    Add <code className="bg-slate-900 px-2 py-1 rounded text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>
                    <br />
                    <span className="text-xs text-slate-400 ml-6">Get from Supabase dashboard (see link below)</span>
                  </li>
                  <li>Select <strong>ALL environments</strong>: ✅ Production ✅ Preview ✅ Development</li>
                  <li>Click <strong>Save</strong></li>
                  <li>
                    <strong>CRITICAL:</strong> Go to <strong>Deployments</strong> tab → Click <strong>⋯</strong> on latest deployment → <strong>Redeploy</strong>
                  </li>
                </ol>
              </div>
              <div className="mt-4 pt-4 border-t border-yellow-500/20">
                <p className="text-slate-400 text-sm mb-2">Get your Supabase credentials:</p>
                <a
                  href="https://supabase.com/dashboard/project/mfgzaxdcsmdtsteoqrpa/settings/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 underline text-sm"
                >
                  Open Supabase API Settings →
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
              <p className="text-green-400 font-semibold">✓ All environment variables are configured correctly!</p>
              <p className="text-slate-400 text-sm mt-2">Your application should be working properly.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

