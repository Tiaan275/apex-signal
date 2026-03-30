'use client'

import { useState, useCallback } from 'react'
import { Users, BarChart3, RefreshCw, LogOut, TrendingUp, Calendar, Mail, Loader2, AlertCircle } from 'lucide-react'

interface Subscriber {
  id: string
  email: string
  name: string | null
  status: string
  joined: string
}

interface WaitlistData {
  total: number
  subscribers: Subscriber[]
  fetched_at: string
}

interface AnalyticsData {
  total_events: number
  by_event: Record<string, number>
  recent: { event: string; page?: string; timestamp: string }[]
  since: string | null
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-ZA', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

export default function AdminDashboard() {
  const [token, setToken] = useState('')
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState('')
  const [loading, setLoading] = useState(false)
  const [waitlist, setWaitlist] = useState<WaitlistData | null>(null)
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [error, setError] = useState('')

  const fetchData = useCallback(async (secret: string) => {
    setLoading(true)
    setError('')
    try {
      const [wRes, aRes] = await Promise.all([
        fetch('/api/admin/waitlist', { headers: { Authorization: `Bearer ${secret}` } }),
        fetch('/api/admin/analytics', { headers: { Authorization: `Bearer ${secret}` } }),
      ])

      if (wRes.status === 401 || aRes.status === 401) {
        setAuthed(false)
        setAuthError('Incorrect secret. Try again.')
        return
      }

      const [wData, aData] = await Promise.all([wRes.json(), aRes.json()])
      setWaitlist(wData)
      setAnalytics(aData)
    } catch {
      setError('Failed to load data. Check your connection.')
    } finally {
      setLoading(false)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')
    if (!token.trim()) return
    // Optimistically set authed, fetchData will unset if 401
    setAuthed(true)
    await fetchData(token.trim())
  }

  if (!authed) {
    return (
      <main className="min-h-screen bg-brand-navy flex items-center justify-center px-6">
        <div className="glass rounded-2xl p-8 w-full max-w-sm">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 rounded-lg bg-brand-green flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-brand-text">Admin Dashboard</span>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-brand-muted mb-1.5 uppercase tracking-wide">
                Admin Secret
              </label>
              <input
                type="password"
                value={token}
                onChange={e => { setToken(e.target.value); setAuthError('') }}
                placeholder="Enter ADMIN_SECRET"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-brand-border/60 text-brand-text placeholder:text-brand-muted/40 text-sm focus:outline-none focus:border-brand-green/50 focus:ring-1 focus:ring-brand-green/20 transition-colors"
              />
            </div>
            {authError && (
              <p className="text-xs text-red-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                {authError}
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-brand-green text-white font-bold text-sm hover:bg-brand-green/90 transition-all glow-emerald"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-brand-navy pt-8 pb-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-brand-text">Apex Signal Admin</h1>
            <p className="text-xs text-brand-muted mt-0.5">
              {waitlist ? `Last updated ${formatDate(waitlist.fetched_at)}` : 'Loading…'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchData(token)}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-brand-muted hover:text-brand-text transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={() => { setAuthed(false); setToken('') }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-brand-muted hover:text-red-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {error && (
          <div className="glass rounded-xl p-4 mb-6 border border-red-400/20 flex items-center gap-2 text-sm text-red-400">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {loading && !waitlist ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-brand-green animate-spin" />
          </div>
        ) : (
          <>
            {/* KPI row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                {
                  icon: Users,
                  label: 'Waitlist Total',
                  value: waitlist?.total ?? '—',
                  color: 'text-brand-green',
                  bg: 'bg-brand-green/10',
                },
                {
                  icon: BarChart3,
                  label: 'Events Tracked',
                  value: analytics?.total_events ?? 0,
                  color: 'text-brand-gold',
                  bg: 'bg-brand-gold/10',
                },
                {
                  icon: Mail,
                  label: 'Successful Signups',
                  value: analytics?.by_event?.waitlist_success ?? 0,
                  color: 'text-emerald-400',
                  bg: 'bg-emerald-400/10',
                },
                {
                  icon: TrendingUp,
                  label: 'CTA Clicks',
                  value: (analytics?.by_event?.hero_primary_cta ?? 0) +
                         (analytics?.by_event?.navbar_cta_click ?? 0),
                  color: 'text-violet-400',
                  bg: 'bg-violet-400/10',
                },
              ].map(kpi => {
                const Icon = kpi.icon
                return (
                  <div key={kpi.label} className="glass rounded-xl p-4">
                    <div className={`w-9 h-9 rounded-lg ${kpi.bg} flex items-center justify-center mb-3`}>
                      <Icon className={`w-4 h-4 ${kpi.color}`} strokeWidth={2} />
                    </div>
                    <p className={`text-2xl font-black ${kpi.color} mb-0.5`}>{kpi.value}</p>
                    <p className="text-xs text-brand-muted">{kpi.label}</p>
                  </div>
                )
              })}
            </div>

            {/* Analytics + Subscribers side-by-side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Event breakdown */}
              <div className="glass rounded-xl p-5">
                <h2 className="text-sm font-bold text-brand-text mb-4 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-brand-gold" />
                  Event Breakdown
                </h2>
                {analytics && Object.keys(analytics.by_event).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(analytics.by_event)
                      .sort(([, a], [, b]) => b - a)
                      .map(([evt, count]) => {
                        const max = Math.max(...Object.values(analytics.by_event))
                        return (
                          <div key={evt}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-brand-muted font-mono">{evt}</span>
                              <span className="text-brand-text font-bold">{count}</span>
                            </div>
                            <div className="h-1.5 bg-white/10 rounded-full">
                              <div
                                className="h-full bg-brand-green rounded-full transition-all duration-500"
                                style={{ width: `${(count / max) * 100}%` }}
                              />
                            </div>
                          </div>
                        )
                      })}
                  </div>
                ) : (
                  <p className="text-xs text-brand-muted">No events recorded yet.</p>
                )}
              </div>

              {/* Subscriber list */}
              <div className="glass rounded-xl p-5">
                <h2 className="text-sm font-bold text-brand-text mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 text-brand-green" />
                  Recent Subscribers
                </h2>
                {waitlist && waitlist.subscribers.length > 0 ? (
                  <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                    {waitlist.subscribers.map(sub => (
                      <div key={sub.id} className="flex items-center justify-between py-2 border-b border-brand-border/30 last:border-0">
                        <div>
                          <p className="text-sm text-brand-text font-medium">
                            {sub.name ?? sub.email.split('@')[0]}
                          </p>
                          <p className="text-xs text-brand-muted font-mono">{sub.email}</p>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand-green/10 text-brand-green">
                            {sub.status}
                          </span>
                          <p className="text-[10px] text-brand-muted mt-1 flex items-center gap-1 justify-end">
                            <Calendar className="w-3 h-3" />
                            {formatDate(sub.joined)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-brand-muted">No subscribers yet.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
