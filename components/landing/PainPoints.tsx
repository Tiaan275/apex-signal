'use client'

import { useRef } from 'react'
import { Clock, BookOpen, BarChart3 } from 'lucide-react'

const PAIN_POINTS = [
  {
    icon: Clock,
    iconColor: 'text-red-400',
    iconBg: 'bg-red-400/10',
    tag: 'The Time Problem',
    tagColor: 'text-red-400 bg-red-400/10 border-red-400/20',
    headline: 'You\'re away for 28 days. The market doesn\'t wait.',
    body:
      'When you land back home you have maybe 2 weeks before the next rotation. Researching entries, watching charts, managing trades — it\'s a second job. One you don\'t have time for.',
    quote: '"I missed a JSE breakout on a Wednesday. I was on a 12-hour shift 6,000 km away."',
    accent: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.15)',
  },
  {
    icon: BookOpen,
    iconColor: 'text-brand-gold',
    iconBg: 'bg-brand-gold/10',
    tag: 'The Knowledge Gap',
    tagColor: 'text-brand-gold bg-brand-gold/10 border-brand-gold/20',
    headline: 'Market noise drowns out the signals that actually matter.',
    body:
      'Twitter alerts, YouTube gurus, Telegram pump groups — it\'s impossible to know what\'s worth acting on. Without a systematic edge you\'re guessing, and guessing costs money.',
    quote: '"I bought ADA at the top because three different influencers said \'moon soon\'. Lost R 18,000."',
    accent: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.15)',
  },
  {
    icon: BarChart3,
    iconColor: 'text-brand-green',
    iconBg: 'bg-brand-green/10',
    tag: 'The Risk Problem',
    tagColor: 'text-brand-green bg-brand-green/10 border-brand-green/20',
    headline: 'No clear entry, target, or stop means no plan. No plan means blown accounts.',
    body:
      'You know you should set a stop loss. You don\'t always know where. Without precise levels calculated from real market structure, risk management stays theory.',
    quote: '"I held a losing trade for 3 months on a site rotation hoping it would come back. It didn\'t."',
    accent: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.15)',
  },
]

export default function PainPoints() {
  return (
    <section className="relative py-24 bg-brand-navy overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6">
            <span className="text-xs font-semibold text-brand-muted tracking-wide uppercase">
              Sound Familiar?
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black tracking-tight mb-5">
            The 3 Reasons FIFO Traders{' '}
            <span className="gradient-text">Lose Money</span>
          </h2>
          <p className="text-lg text-brand-muted max-w-2xl mx-auto">
            These aren&apos;t failures of effort — they&apos;re structural problems that
            standard trading tools were never designed to solve.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PAIN_POINTS.map((point) => {
            const Icon = point.icon
            return (
              <div
                key={point.tag}
                className="relative rounded-2xl p-6 card-3d gradient-border group cursor-default"
                style={{
                  background: `linear-gradient(135deg, ${point.accent} 0%, rgba(30,41,59,0.6) 100%)`,
                  borderColor: point.border,
                  border: `1px solid ${point.border}`,
                  backdropFilter: 'blur(12px)',
                }}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${point.iconBg} flex items-center justify-center mb-5`}>
                  <Icon className={`w-5 h-5 ${point.iconColor}`} strokeWidth={2} />
                </div>

                {/* Tag */}
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${point.tagColor} mb-3`}>
                  {point.tag}
                </span>

                {/* Headline */}
                <h3 className="text-lg font-bold text-brand-text leading-snug mb-3">
                  {point.headline}
                </h3>

                {/* Body */}
                <p className="text-sm text-brand-muted leading-relaxed mb-5">
                  {point.body}
                </p>

                {/* Quote */}
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                  <p className="text-xs text-brand-muted/80 italic leading-relaxed">
                    {point.quote}
                  </p>
                </div>

                {/* Hover glow line */}
                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/20 transition-all duration-300" />
              </div>
            )
          })}
        </div>

        {/* Bridge to solution */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 glass rounded-2xl px-8 py-5">
            <div className="w-2 h-2 rounded-full bg-brand-green pulse-dot" />
            <p className="text-sm text-brand-muted">
              Apex Signal was built to solve all three —
              <span className="text-brand-text font-semibold"> one platform, every rotation.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
