'use client'

import { useState } from 'react'
import { Check, Zap, Shield, Star, ArrowRight } from 'lucide-react'
import { track, EVENTS } from '@/lib/analytics'

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    monthlyPrice: 'R0',
    annualPrice: 'R0',
    tagline: 'Get started — no card needed',
    icon: Zap,
    iconColor: 'text-brand-muted',
    iconBg: 'bg-white/5',
    accentColor: '#64748B',
    features: [
      'Up to 3 signals per day',
      'JSE equities only',
      'Email alerts',
      'Basic confidence score',
      'Web dashboard access',
    ],
    cta: 'Start Free',
    ctaStyle: 'glass border border-brand-border text-brand-text hover:border-brand-green/40',
    highlight: false,
    badge: null,
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 'R199',
    annualPrice: 'R159',
    annualTotal: 'R1,910/yr',
    tagline: 'The full signal suite',
    icon: Shield,
    iconColor: 'text-brand-gold',
    iconBg: 'bg-brand-gold/10',
    accentColor: '#F59E0B',
    features: [
      'Up to 5 signals per day',
      'JSE · Forex · Crypto · US markets',
      'Exit Plan Tracker dashboard',
      'Commodity Intelligence feed',
      'Push, email & Telegram alerts',
      'Risk/reward pre-calculated',
      'Priority signal delivery',
    ],
    cta: 'Get Pro Access — Free for 30 Days',
    ctaStyle: 'bg-brand-gold text-brand-navy font-bold hover:bg-brand-gold/90 glow-gold',
    highlight: true,
    badge: '30-day free trial',
  },
  {
    id: 'elite',
    name: 'Elite',
    monthlyPrice: 'R549',
    annualPrice: 'R439',
    annualTotal: 'R5,270/yr',
    tagline: 'Built for serious rotational traders',
    icon: Star,
    iconColor: 'text-violet-400',
    iconBg: 'bg-violet-400/10',
    accentColor: '#A78BFA',
    features: [
      'Everything in Pro',
      'Roster-Aware Alert engine',
      'On-site vs off-site signal modes',
      'Full intraday feed when home',
      'AI-assisted signal rationale',
      'Priority support & Discord access',
      'Early access to new features',
    ],
    cta: 'Get Elite Access',
    ctaStyle: 'glass border border-violet-400/40 text-violet-400 hover:bg-violet-400/10',
    highlight: false,
    badge: 'Most complete',
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="pricing" className="relative py-20 sm:py-24 bg-brand-navy overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-border to-transparent" />

      {/* Ambient glow */}
      <div className="absolute inset-x-0 top-1/3 flex justify-center pointer-events-none">
        <div className="w-[700px] h-[400px] rounded-full bg-brand-green/5 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6">
            <span className="text-xs font-semibold text-brand-muted tracking-wide uppercase">
              Simple Pricing
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black tracking-tight mb-5">
            Start Free.{' '}
            <span className="gradient-text">Scale When Ready.</span>
          </h2>
          <p className="text-base sm:text-lg text-brand-muted max-w-xl mx-auto mb-8">
            No lock-ins. Cancel any time. Early access members get 30 days of Pro free at launch.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 glass rounded-full px-4 py-2">
            <button
              onClick={() => setAnnual(false)}
              className={`text-sm font-semibold px-3 py-1 rounded-full transition-all duration-200 ${
                !annual ? 'bg-brand-card text-brand-text' : 'text-brand-muted'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`text-sm font-semibold px-3 py-1 rounded-full transition-all duration-200 flex items-center gap-2 ${
                annual ? 'bg-brand-card text-brand-text' : 'text-brand-muted'
              }`}
            >
              Annual
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-brand-green/20 text-brand-green">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start md:items-stretch">
          {PLANS.map(plan => {
            const Icon = plan.icon
            const price = annual ? plan.annualPrice : plan.monthlyPrice
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-6 sm:p-8 flex flex-col h-full transition-all duration-200 ${
                  plan.highlight
                    ? 'bg-brand-card border-2 border-brand-gold/40 shadow-2xl md:-mt-3 md:-mb-3'
                    : 'glass border border-brand-border/60'
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                    style={{
                      background: plan.highlight ? '#F59E0B' : `${plan.accentColor}25`,
                      color: plan.highlight ? '#0F172A' : plan.accentColor,
                      border: plan.highlight ? 'none' : `1px solid ${plan.accentColor}40`,
                    }}
                  >
                    {plan.badge}
                  </div>
                )}

                {/* Icon + Name */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl ${plan.iconBg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${plan.iconColor}`} strokeWidth={2} />
                  </div>
                  <div>
                    <p className="font-black text-brand-text text-lg leading-tight">{plan.name}</p>
                    <p className="text-xs text-brand-muted">{plan.tagline}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black text-brand-text">{price}</span>
                    <span className="text-brand-muted text-sm mb-1.5">/mo</span>
                  </div>
                  {annual && plan.annualTotal && (
                    <p className="text-xs text-brand-muted mt-1">
                      Billed as <span className="text-brand-green font-semibold">{plan.annualTotal}</span>
                    </p>
                  )}
                  {plan.id === 'free' && (
                    <p className="text-xs text-brand-muted mt-1">Always free</p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-brand-muted">
                      <Check
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        style={{ color: plan.accentColor }}
                        strokeWidth={2.5}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA — pinned to bottom via flex-col + mt-auto */}
                <a
                  href="#waitlist"
                  onClick={() => track(EVENTS.PRICING_CTA_CLICK, plan.id)}
                  className={`mt-auto w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 ${plan.ctaStyle}`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            )
          })}
        </div>

        {/* Trust footer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-brand-muted/60">
            Prices in South African Rand (ZAR) · Stripe-powered payments · Cancel anytime ·
            Signals are for informational purposes only and do not constitute financial advice.
          </p>
        </div>
      </div>
    </section>
  )
}
