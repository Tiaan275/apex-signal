'use client'

import { TrendingUp, TrendingDown, Minus, Globe, Activity, BarChart2 } from 'lucide-react'

// ─── Static market snapshot (will be replaced with live API data post-launch) ──
const MARKET_SNAPSHOTS = [
  {
    market: 'JSE Top 40',
    region: 'South Africa',
    trend: 'up' as const,
    summary: 'Resources sector leading gains. Mining stocks benefiting from elevated gold and platinum prices.',
    watchlist: ['MTN', 'NPN', 'SOL', 'BHP', 'AGL'],
    sentiment: 72,
  },
  {
    market: 'Forex (ZAR pairs)',
    region: 'FX Markets',
    trend: 'neutral' as const,
    summary: 'USD/ZAR consolidating near key support. Watch US CPI data this week for breakout catalyst.',
    watchlist: ['USD/ZAR', 'GBP/ZAR', 'EUR/ZAR'],
    sentiment: 51,
  },
  {
    market: 'Crypto',
    region: 'Global',
    trend: 'up' as const,
    summary: 'BTC holding above key weekly level. ETH showing relative strength. Altcoin rotation ongoing.',
    watchlist: ['BTC', 'ETH', 'SOL'],
    sentiment: 68,
  },
  {
    market: 'US Markets',
    region: 'New York',
    trend: 'neutral' as const,
    summary: 'S&P consolidating near all-time highs. Tech sector mixed ahead of earnings season.',
    watchlist: ['SPY', 'QQQ', 'NVDA'],
    sentiment: 55,
  },
]

const KEY_THEMES = [
  {
    title: 'Gold at Multi-Year Highs',
    body: 'XAU/USD above $2,300 driven by central bank buying and geopolitical uncertainty. Elevated levels create both opportunity and risk.',
    tag: 'Commodities',
    tagColor: 'text-brand-gold bg-brand-gold/10',
  },
  {
    title: 'USD/ZAR: Critical Zone',
    body: 'The rand is trading near a technically significant level. Direction from here will impact JSE exporters and commodity importers significantly.',
    tag: 'Forex',
    tagColor: 'text-blue-400 bg-blue-400/10',
  },
  {
    title: 'Mining Sector Rotation',
    body: 'Platinum group metals showing renewed interest. FIFO workers in the mining sector should watch PGM exposure closely.',
    tag: 'JSE',
    tagColor: 'text-brand-green bg-brand-green/10',
  },
]

function TrendIcon({ trend }: { trend: 'up' | 'down' | 'neutral' }) {
  if (trend === 'up')      return <TrendingUp className="w-4 h-4 text-brand-green" />
  if (trend === 'down')    return <TrendingDown className="w-4 h-4 text-red-400" />
  return <Minus className="w-4 h-4 text-brand-muted" />
}

function SentimentBar({ value }: { value: number }) {
  const color = value >= 65 ? '#10B981' : value >= 45 ? '#F59E0B' : '#EF4444'
  const label = value >= 65 ? 'Bullish' : value >= 45 ? 'Neutral' : 'Bearish'
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] text-brand-muted">Sentiment</span>
        <span className="text-[10px] font-semibold" style={{ color }}>{label} {value}%</span>
      </div>
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
    </div>
  )
}

export default function MarketIntelligence() {
  return (
    <section id="markets" className="relative py-20 sm:py-24 bg-brand-navy overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-border to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-brand-green/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6">
            <Activity className="w-3 h-3 text-brand-green" />
            <span className="text-xs font-semibold text-brand-muted tracking-wide uppercase">
              Market Intelligence
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black tracking-tight mb-5">
            4 Markets.{' '}
            <span className="gradient-text">One Clear View.</span>
          </h2>
          <p className="text-base sm:text-lg text-brand-muted max-w-xl mx-auto">
            Context matters as much as the signal. Apex Signal tracks market conditions
            across every asset class relevant to South African rotational traders.
          </p>
        </div>

        {/* Market snapshot grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {MARKET_SNAPSHOTS.map(snap => (
            <div key={snap.market} className="glass rounded-xl p-5 flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] text-brand-muted mb-0.5 flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    {snap.region}
                  </p>
                  <p className="font-bold text-brand-text text-sm leading-tight">{snap.market}</p>
                </div>
                <TrendIcon trend={snap.trend} />
              </div>

              {/* Summary */}
              <p className="text-xs text-brand-muted leading-relaxed flex-1">{snap.summary}</p>

              {/* Watchlist */}
              <div className="flex flex-wrap gap-1.5">
                {snap.watchlist.map(sym => (
                  <span
                    key={sym}
                    className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-white/[0.05] text-brand-muted"
                  >
                    {sym}
                  </span>
                ))}
              </div>

              {/* Sentiment */}
              <SentimentBar value={snap.sentiment} />
            </div>
          ))}
        </div>

        {/* Key themes */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <BarChart2 className="w-4 h-4 text-brand-green" />
            <h3 className="text-base font-bold text-brand-text">Key Themes Right Now</h3>
            <span className="ml-auto text-[11px] text-brand-muted glass px-2 py-0.5 rounded-full">
              Illustrative — live data at launch
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {KEY_THEMES.map(theme => (
              <div key={theme.title} className="glass rounded-xl p-5">
                <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold mb-3 ${theme.tagColor}`}>
                  {theme.tag}
                </span>
                <h4 className="text-sm font-bold text-brand-text mb-2">{theme.title}</h4>
                <p className="text-xs text-brand-muted leading-relaxed">{theme.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-brand-border/40 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-muted/50" />
            <span className="text-[11px] font-semibold text-brand-muted/70 tracking-wide uppercase">Demo Data</span>
          </div>
          <p className="text-xs text-brand-muted/60 max-w-md mx-auto">
            Market snapshots above are illustrative examples of the intelligence Apex Signal
            delivers. All values are for demonstration only — live data connects at launch.
          </p>
        </div>
      </div>
    </section>
  )
}
