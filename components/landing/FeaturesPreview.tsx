'use client'

import { useState } from 'react'
import { Zap, Target, Cpu, CalendarClock, ArrowUpRight } from 'lucide-react'
import { track, EVENTS } from '@/lib/analytics'

const FEATURES = [
  {
    id: 'signals',
    icon: Zap,
    title: 'Daily Signal Feed',
    subtitle: 'JSE · Forex · Crypto · US',
    description:
      'Every morning at 06:00 SAST, receive pre-market signals with full entry, target, and stop levels. Mid-session alerts fire within 15 minutes of a setup confirming.',
    bullets: [
      'Entry, target & stop on every signal',
      'Risk/reward ratio pre-calculated',
      'Confidence score 1–100',
      'Push, email & Telegram alerts',
    ],
    highlight: 'Up to 5 signals/day',
    gradient: 'from-brand-green/20 to-transparent',
    border: 'border-brand-green/20',
    iconColor: 'text-brand-green',
    iconBg: 'bg-brand-green/10',
    accentColor: '#10B981',
    tier: 'Free',
    tierColor: 'text-brand-green bg-brand-green/10',
  },
  {
    id: 'exit',
    icon: Target,
    title: 'Exit Plan Tracker',
    subtitle: 'Never guess your way out',
    description:
      'Track every open trade in one dashboard. See your current P&L, distance to target, distance to stop, and hold recommendation — all in real time.',
    bullets: [
      'Live P&L tracking per trade',
      'Dynamic stop-loss adjustments',
      'Partial profit suggestions',
      'Trailing stop notifications',
    ],
    highlight: 'Zero guesswork on exits',
    gradient: 'from-brand-gold/20 to-transparent',
    border: 'border-brand-gold/20',
    iconColor: 'text-brand-gold',
    iconBg: 'bg-brand-gold/10',
    accentColor: '#F59E0B',
    tier: 'Pro',
    tierColor: 'text-brand-gold bg-brand-gold/10',
  },
  {
    id: 'commodities',
    icon: Cpu,
    title: 'Commodity Intelligence',
    subtitle: 'Gold · Oil · Platinum · Palladium',
    description:
      'Dedicated commodity signals calibrated for South African miners and energy workers. Includes USD/ZAR impact analysis — critical when your salary is in ZAR but commodities trade in USD.',
    bullets: [
      'XAU, XPT, XPD dedicated feed',
      'USD/ZAR correlation alerts',
      'Oil price shift notifications',
      'SA commodity sector analysis',
    ],
    highlight: 'Critical for SA miners & energy',
    gradient: 'from-emerald-400/20 to-transparent',
    border: 'border-emerald-400/20',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-400/10',
    accentColor: '#34D399',
    tier: 'Pro',
    tierColor: 'text-brand-gold bg-brand-gold/10',
  },
  {
    id: 'roster',
    icon: CalendarClock,
    title: 'Roster-Aware Alerts',
    subtitle: 'Built around your rotation',
    description:
      'Enter your FIFO roster and Apex Signal maps your signal schedule to your life. On-site? Get lower-maintenance swing trade setups only. At home? Unlock the full intraday feed.',
    bullets: [
      'FIFO roster calendar integration',
      'On-site vs off-site signal modes',
      'Lower-frequency swing setups on rotation',
      'Full intraday feed when home',
    ],
    highlight: 'The only signal tool that knows your roster',
    gradient: 'from-violet-400/20 to-transparent',
    border: 'border-violet-400/20',
    iconColor: 'text-violet-400',
    iconBg: 'bg-violet-400/10',
    accentColor: '#A78BFA',
    tier: 'Elite',
    tierColor: 'text-violet-400 bg-violet-400/10',
  },
]

export default function FeaturesPreview() {
  const [activeId, setActiveId] = useState('signals')
  const active = FEATURES.find(f => f.id === activeId)!

  return (
    <section id="features" className="relative py-24 bg-brand-navy overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 radial-glow" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6">
            <span className="text-xs font-semibold text-brand-muted tracking-wide uppercase">
              Everything You Need
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black tracking-tight mb-5">
            Four Tools,{' '}
            <span className="gradient-text">One Platform</span>
          </h2>
          <p className="text-lg text-brand-muted max-w-xl mx-auto">
            Built from the ground up for traders who work away from home for weeks at a time.
          </p>
        </div>

        {/* Tab selector */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {FEATURES.map(feature => {
            const Icon = feature.icon
            const isActive = feature.id === activeId
            return (
              <button
                key={feature.id}
                onClick={() => { setActiveId(feature.id); track(EVENTS.FEATURES_TAB_CLICK, feature.id) }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                  isActive
                    ? `bg-brand-card border-[${feature.accentColor}]/40 text-brand-text shadow-lg`
                    : 'glass border-brand-border/50 text-brand-muted hover:text-brand-text hover:border-brand-border'
                }`}
                style={isActive ? { borderColor: `${feature.accentColor}40` } : {}}
              >
                <Icon className={`w-4 h-4 ${isActive ? feature.iconColor : ''}`} strokeWidth={2} />
                {feature.title}
              </button>
            )
          })}
        </div>

        {/* Feature detail — 3D card layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left — description */}
          <div
            key={active.id}
            className="animate-fade-in"
          >
            <div className={`w-14 h-14 rounded-2xl ${active.iconBg} flex items-center justify-center mb-6`}>
              <active.icon className={`w-7 h-7 ${active.iconColor}`} strokeWidth={1.5} />
            </div>

            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-2xl font-black text-brand-text">{active.title}</h3>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${active.tierColor}`}>
                {active.tier}
              </span>
            </div>
            <p className="text-sm text-brand-muted mb-2">{active.subtitle}</p>
            <p className="text-base text-brand-text/80 leading-relaxed mb-6">{active.description}</p>

            <ul className="space-y-3 mb-8">
              {active.bullets.map(bullet => (
                <li key={bullet} className="flex items-start gap-3 text-sm text-brand-muted">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-brand-green/15 flex items-center justify-center flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>

            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
              style={{ background: `${active.accentColor}15`, color: active.accentColor }}
            >
              <Zap className="w-4 h-4" />
              {active.highlight}
            </div>
          </div>

          {/* Right — visual preview card with 3D tilt */}
          <div className="perspective-1000">
            <div
              className="glass rounded-2xl p-6 card-3d gradient-border relative overflow-hidden"
              style={{ borderColor: `${active.accentColor}30` }}
            >
              {/* Glow overlay */}
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ background: active.accentColor }}
              />

              {/* Mock UI preview */}
              <div className="relative z-10">
                {/* Header bar */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <active.icon className={`w-4 h-4 ${active.iconColor}`} strokeWidth={2} />
                    <span className="text-sm font-semibold text-brand-text">{active.title}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-green pulse-dot" />
                    <span className="text-xs text-brand-muted">Live</span>
                  </div>
                </div>

                {/* Signal rows */}
                {[
                  { sym: 'JSE:MTN',  dir: 'LONG',  rr: '3.4:1', conf: 82, color: '#10B981' },
                  { sym: 'USD/ZAR',  dir: 'SHORT', rr: '2.8:1', conf: 74, color: '#EF4444' },
                  { sym: 'BTC/USD',  dir: 'LONG',  rr: '4.1:1', conf: 79, color: '#10B981' },
                  { sym: 'XAU/USD',  dir: 'LONG',  rr: '3.0:1', conf: 85, color: '#10B981' },
                ].map((row, i) => (
                  <div
                    key={row.sym}
                    className="flex items-center justify-between py-3 border-b border-brand-border/30 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono font-bold text-brand-text">{row.sym}</span>
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                        style={{ background: `${row.color}20`, color: row.color }}
                      >
                        {row.dir}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-[11px] text-brand-muted">R/R</p>
                        <p className="text-xs font-mono font-semibold text-brand-text">{row.rr}</p>
                      </div>
                      <div className="w-16">
                        <p className="text-[11px] text-brand-muted mb-1">Conf</p>
                        <div className="h-1 bg-white/10 rounded-full">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${row.conf}%`, background: row.color }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* View all link */}
                <div className="mt-4 flex items-center justify-center">
                  <span className="flex items-center gap-1 text-xs text-brand-muted hover:text-brand-green transition-colors cursor-pointer">
                    View full signal dashboard
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature grid cards — bottom 4 pills */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {FEATURES.map(f => {
            const Icon = f.icon
            return (
              <button
                key={f.id}
                onClick={() => { setActiveId(f.id); track(EVENTS.FEATURES_TAB_CLICK, f.id) }}
                className={`glass rounded-xl p-4 text-left hover:border-brand-green/30 transition-all duration-200 card-3d ${
                  activeId === f.id ? 'border-brand-green/30 glow-emerald' : ''
                }`}
              >
                <Icon className={`w-5 h-5 ${f.iconColor} mb-3`} strokeWidth={2} />
                <p className="text-sm font-bold text-brand-text mb-1">{f.title}</p>
                <p className="text-xs text-brand-muted">{f.subtitle}</p>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
