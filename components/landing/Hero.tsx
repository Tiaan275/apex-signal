'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, TrendingUp, TrendingDown, Zap, ShieldCheck } from 'lucide-react'
import { track, EVENTS } from '@/lib/analytics'

// ─── Ticker data ─────────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  { symbol: 'JSE:MTN',  price: 'R 82.40',  change: '+2.3%',  up: true  },
  { symbol: 'USD/ZAR',  price: '18.72',     change: '-0.8%',  up: false },
  { symbol: 'BTC/USD',  price: '$67,420',   change: '+4.1%',  up: true  },
  { symbol: 'JSE:NPN',  price: 'R 3,214',   change: '+1.7%',  up: true  },
  { symbol: 'XAU/USD',  price: '$2,341',    change: '+0.9%',  up: true  },
  { symbol: 'EUR/USD',  price: '1.0862',    change: '-0.3%',  up: false },
  { symbol: 'JSE:SBK',  price: 'R 168.20',  change: '+3.2%',  up: true  },
  { symbol: 'ETH/USD',  price: '$3,480',    change: '+5.6%',  up: true  },
  { symbol: 'GBP/ZAR',  price: '23.61',     change: '+0.5%',  up: true  },
  { symbol: 'JSE:SOL',  price: 'R 344.60',  change: '-1.2%',  up: false },
  { symbol: 'NASDAQ',   price: '18,247',    change: '+0.7%',  up: true  },
  { symbol: 'S&P 500',  price: '5,209',     change: '+0.4%',  up: true  },
]

// ─── Signal preview card ──────────────────────────────────────────────────────
function SignalCard({
  symbol, type, entry, target, stop, timeframe, confidence, delay,
}: {
  symbol: string; type: 'LONG' | 'SHORT'; entry: string; target: string
  stop: string; timeframe: string; confidence: number; delay: number
}) {
  const isLong = type === 'LONG'
  return (
    <div
      className="glass rounded-xl p-4 gradient-border card-3d"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs text-brand-muted mb-0.5 font-mono">{timeframe}</p>
          <p className="font-bold text-brand-text text-base">{symbol}</p>
        </div>
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wider ${
            isLong
              ? 'bg-brand-green/15 text-brand-green border border-brand-green/30'
              : 'bg-red-500/15 text-red-400 border border-red-400/30'
          }`}
        >
          {type}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-white/[0.04] rounded-lg p-2 text-center">
          <p className="text-[10px] text-brand-muted mb-0.5">Entry</p>
          <p className="text-xs font-semibold text-brand-text font-mono">{entry}</p>
        </div>
        <div className="bg-brand-green/10 rounded-lg p-2 text-center">
          <p className="text-[10px] text-brand-green mb-0.5">Target</p>
          <p className="text-xs font-semibold text-brand-green font-mono">{target}</p>
        </div>
        <div className="bg-red-500/10 rounded-lg p-2 text-center">
          <p className="text-[10px] text-red-400 mb-0.5">Stop</p>
          <p className="text-xs font-semibold text-red-400 font-mono">{stop}</p>
        </div>
      </div>

      {/* Confidence bar */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] text-brand-muted">Confidence</span>
          <span className="text-[10px] font-semibold text-brand-green">{confidence}%</span>
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-green to-emerald-400 rounded-full"
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>
    </div>
  )
}

// ─── Stat badge ───────────────────────────────────────────────────────────────
function StatBadge({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="glass rounded-xl px-4 py-3 flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-brand-green/15 flex items-center justify-center text-brand-green flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-base font-bold text-brand-text leading-tight">{value}</p>
        <p className="text-[11px] text-brand-muted">{label}</p>
      </div>
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-brand-navy"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 radial-glow" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-brand-green/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-brand-gold/5 blur-3xl pointer-events-none" />

      {/* Live ticker */}
      <div className="relative z-10 mt-[72px] border-y border-brand-border/40 bg-brand-card/30 backdrop-blur-sm overflow-hidden py-2.5">
        <div className="ticker-track flex items-center gap-8">
          {doubled.map((item, i) => (
            <div key={i} className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs font-mono text-brand-muted">{item.symbol}</span>
              <span className="text-xs font-mono font-semibold text-brand-text">{item.price}</span>
              <span className={`text-xs font-mono font-bold flex items-center gap-0.5 ${item.up ? 'text-brand-green' : 'text-red-400'}`}>
                {item.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {item.change}
              </span>
              <span className="text-brand-border/60 ml-4">|</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main hero content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — copy */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-emerald mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green pulse-dot" />
                <span className="text-xs font-semibold text-brand-green tracking-wide">
                  Launching 22 April 2026 · Waitlist Open
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black leading-[1.1] tracking-tight mb-6">
                Stop Losing Your{' '}
                <span className="gradient-text text-glow-emerald">
                  Hard-Earned<br />Site Pay
                </span>{' '}
                to the Market
              </h1>

              {/* Sub */}
              <p className="text-lg text-brand-muted leading-relaxed mb-8 max-w-lg">
                Precision algorithmic signals across JSE, Forex, Crypto &amp; US markets — built for
                FIFO workers, offshore crew, and SA expats who need to trade smart between
                rotations. Launching 22 April. Free tier included.
              </p>

              {/* CTA row */}
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <a
                  href="#waitlist"
                  onClick={() => track(EVENTS.HERO_PRIMARY_CTA)}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-brand-green text-white font-bold text-sm hover:bg-brand-green/90 transition-all duration-200 glow-emerald hover:scale-105 active:scale-100"
                >
                  Join the Free Waitlist
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#features"
                  onClick={() => track(EVENTS.HERO_SECONDARY_CTA)}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl glass text-brand-text font-semibold text-sm hover:border-brand-green/40 transition-all duration-200"
                >
                  See Signal Examples
                </a>
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs text-brand-muted">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-green" />
                  POPIA Compliant
                </div>
                <div className="w-px h-4 bg-brand-border" />
                <div className="flex items-center gap-1.5 text-xs text-brand-muted">
                  <Zap className="w-3.5 h-3.5 text-brand-gold" />
                  No FSP registration required
                </div>
                <div className="w-px h-4 bg-brand-border" />
                <div className="flex items-center gap-1.5 text-xs text-brand-muted">
                  <span className="text-brand-green font-bold">Free</span>
                  tier available at launch
                </div>
              </div>
            </div>

            {/* Right — 3D signal cards */}
            <div
              className="relative perspective-2000"
              style={{
                transform: `perspective(1200px) rotateY(${mousePos.x * 0.3}deg) rotateX(${-mousePos.y * 0.2}deg)`,
                transition: 'transform 0.1s ease-out',
              }}
            >
              {/* Ambient glow behind cards */}
              <div className="absolute inset-0 bg-brand-green/10 blur-3xl rounded-3xl" />

              <div className="relative space-y-3">
                {/* Top stat row */}
                <div className="grid grid-cols-2 gap-3">
                  <StatBadge value="87%" label="Signal accuracy (30d)" icon={<TrendingUp className="w-4 h-4" />} />
                  <StatBadge value="4 markets" label="JSE · FX · Crypto · US" icon={<Zap className="w-4 h-4" />} />
                </div>

                {/* Signal cards */}
                <SignalCard
                  symbol="JSE:MTN"
                  type="LONG"
                  entry="R 80.20"
                  target="R 88.50"
                  stop="R 77.80"
                  timeframe="4H · Swing"
                  confidence={82}
                  delay={0}
                />
                <div className="grid grid-cols-2 gap-3">
                  <SignalCard
                    symbol="XAU/USD"
                    type="LONG"
                    entry="$2,318"
                    target="$2,390"
                    stop="$2,290"
                    timeframe="D · Position"
                    confidence={76}
                    delay={100}
                  />
                  <SignalCard
                    symbol="BTC/USD"
                    type="SHORT"
                    entry="$68,400"
                    target="$63,000"
                    stop="$70,200"
                    timeframe="4H · Swing"
                    confidence={71}
                    delay={200}
                  />
                </div>

                {/* Live indicator */}
                <div className="flex items-center justify-center gap-2 py-2">
                  <span className="w-2 h-2 rounded-full bg-brand-green pulse-dot" />
                  <span className="text-xs text-brand-muted font-mono">Live signal feed · Updated every 15 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-navy to-transparent pointer-events-none" />
    </section>
  )
}
