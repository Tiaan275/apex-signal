'use client'

import { Bell, LineChart, CheckCircle2, ArrowRight } from 'lucide-react'

const STEPS = [
  {
    step: '01',
    icon: Bell,
    title: 'Connect & Configure',
    description:
      'Set your markets (JSE, Forex, Crypto, US), risk appetite, and roster schedule. Apex Signal learns when you\'re on-site and adjusts signal timing accordingly.',
    detail: 'Takes 3 minutes. Works on any device.',
    color: 'brand-green',
    glow: 'rgba(16,185,129,0.2)',
  },
  {
    step: '02',
    icon: LineChart,
    title: 'Receive Precise Signals',
    description:
      'Our algorithm scans 50+ technical and fundamental indicators across 4 markets. When high-probability setups form, you get a signal with entry, target, stop, risk/reward, and confidence score.',
    detail: 'Every signal includes full rationale.',
    color: 'brand-gold',
    glow: 'rgba(245,158,11,0.2)',
  },
  {
    step: '03',
    icon: CheckCircle2,
    title: 'Execute With Confidence',
    description:
      'Place your trade in minutes. Track open positions through your dashboard. Whether you\'re on a rig in the North Sea or at home in Joburg, your exit plan is always visible.',
    detail: 'Close it on your phone between shifts.',
    color: 'brand-green',
    glow: 'rgba(16,185,129,0.2)',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 sm:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-brand-card/30" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-border to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6">
            <span className="text-xs font-semibold text-brand-muted tracking-wide uppercase">
              Simple 3-Step Process
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black tracking-tight mb-5">
            From Signal to Trade in{' '}
            <span className="gradient-text">Under 5 Minutes</span>
          </h2>
          <p className="text-lg text-brand-muted max-w-xl mx-auto">
            No chart-reading required. No hours of research. Just clear, actionable signals
            with every number you need to execute.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line — desktop only */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(16.666%+2rem)] right-[calc(16.666%+2rem)] h-px">
            <div className="w-full h-full bg-gradient-to-r from-brand-green/40 via-brand-gold/40 to-brand-green/40" />
            {/* Animated pulse along line */}
            <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse-slow" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {STEPS.map((step, idx) => {
              const Icon = step.icon
              const isGold = step.color === 'brand-gold'
              return (
                <div key={step.step} className="relative group">
                  {/* Step number + icon */}
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="relative mb-6">
                      {/* Outer ring */}
                      <div
                        className="w-[104px] h-[104px] rounded-full flex items-center justify-center"
                        style={{
                          background: `radial-gradient(circle, ${step.glow} 0%, transparent 70%)`,
                          boxShadow: `0 0 30px ${step.glow}`,
                        }}
                      >
                        <div
                          className="w-20 h-20 rounded-full glass flex items-center justify-center border"
                          style={{ borderColor: isGold ? 'rgba(245,158,11,0.4)' : 'rgba(16,185,129,0.4)' }}
                        >
                          <Icon
                            className="w-7 h-7"
                            style={{ color: isGold ? '#F59E0B' : '#10B981' }}
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>
                      {/* Step label */}
                      <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-brand-card border border-brand-border flex items-center justify-center">
                        <span className="text-[10px] font-bold text-brand-muted">{step.step}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-brand-text mb-3">{step.title}</h3>
                    <p className="text-sm text-brand-muted leading-relaxed mb-4 max-w-xs">
                      {step.description}
                    </p>

                    {/* Detail pill */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium glass-emerald text-brand-green">
                      <CheckCircle2 className="w-3 h-3" />
                      {step.detail}
                    </div>
                  </div>

                  {/* Arrow between cards — mobile only */}
                  {idx < STEPS.length - 1 && (
                    <div className="lg:hidden flex justify-center mb-2">
                      <ArrowRight className="w-5 h-5 text-brand-border rotate-90" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <a
            href="#waitlist"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-green text-white font-bold text-sm hover:bg-brand-green/90 transition-all duration-200 glow-emerald hover:scale-105"
          >
            Start Getting Signals — Free
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
