'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle2, Loader2, Users, Lock, Zap } from 'lucide-react'
import { track, EVENTS } from '@/lib/analytics'

const SOCIAL_PROOF_STATS = [
  { value: '22 Apr', label: 'Launch date' },
  { value: '30 days', label: 'Pro trial — free' },
  { value: '4 markets', label: 'JSE · FX · Crypto · US' },
]

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.')
      return
    }
    setStatus('loading')
    setErrorMsg('')
    track(EVENTS.WAITLIST_SUBMIT)

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      track(EVENTS.WAITLIST_SUCCESS)
      setStatus('success')
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <section id="waitlist" className="relative py-24 overflow-hidden">
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-brand-card/40" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-green/30 to-transparent" />

      {/* Big glow behind the form */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] rounded-full bg-brand-green/8 blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto px-6 text-center">
        {/* Countdown badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-emerald mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green pulse-dot" />
          <span className="text-xs font-semibold text-brand-green tracking-wide">
            Launching 22 April 2026 — Limited early-access spots
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black tracking-tight mb-5">
          Be First In.{' '}
          <span className="gradient-text">Trade Smarter</span>
          <br />From Day One.
        </h2>

        <p className="text-lg text-brand-muted mb-10 max-w-lg mx-auto">
          Join the free waitlist today and unlock 30 days of Pro at launch — no card required.
          We&apos;ll notify you the moment Apex Signal goes live on 22 April.
        </p>

        {/* Social proof */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
          {SOCIAL_PROOF_STATS.map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-xl font-black gradient-text">{stat.value}</p>
              <p className="text-xs text-brand-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="glass rounded-2xl p-8 gradient-border glow-emerald">
          {status === 'success' ? (
            <div className="py-6 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-brand-green/15 flex items-center justify-center glow-emerald">
                <CheckCircle2 className="w-8 h-8 text-brand-green" />
              </div>
              <h3 className="text-xl font-bold text-brand-text">You&apos;re on the list!</h3>
              <p className="text-sm text-brand-muted max-w-xs text-center leading-relaxed">
                We&apos;ll email you the moment Apex Signal launches on{' '}
                <span className="text-brand-green font-semibold">22 April 2026</span>.
                Your 30-day Pro trial will be waiting — no card needed.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-1">
                <div className="flex items-center gap-1.5 text-xs text-brand-muted">
                  <Lock className="w-3 h-3" />
                  No spam, ever
                </div>
                <div className="flex items-center gap-1.5 text-xs text-brand-muted">
                  <Zap className="w-3 h-3 text-brand-gold" />
                  30 days Pro — free
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field */}
              <div className="text-left">
                <label className="block text-xs font-semibold text-brand-muted mb-1.5 uppercase tracking-wide">
                  First Name <span className="normal-case font-normal text-brand-muted/50">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tiaan"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-brand-border/60 text-brand-text placeholder:text-brand-muted/50 text-sm focus:outline-none focus:border-brand-green/50 focus:ring-1 focus:ring-brand-green/20 transition-colors"
                />
              </div>

              {/* Email field */}
              <div className="text-left">
                <label className="block text-xs font-semibold text-brand-muted mb-1.5 uppercase tracking-wide">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setErrorMsg('') }}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-brand-border/60 text-brand-text placeholder:text-brand-muted/50 text-sm focus:outline-none focus:border-brand-green/50 focus:ring-1 focus:ring-brand-green/20 transition-colors"
                />
              </div>

              {/* Error */}
              {errorMsg && (
                <p className="text-xs text-red-400 text-left">{errorMsg}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-green text-white font-bold text-sm hover:bg-brand-green/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 glow-emerald hover:scale-[1.02] active:scale-100"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Joining…
                  </>
                ) : (
                  <>
                    Join the Free Waitlist
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Micro trust */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
                <div className="flex items-center gap-1.5 text-xs text-brand-muted">
                  <Lock className="w-3 h-3" />
                  POPIA compliant
                </div>
                <div className="flex items-center gap-1.5 text-xs text-brand-muted">
                  <Users className="w-3 h-3" />
                  No spam, ever
                </div>
                <div className="flex items-center gap-1.5 text-xs text-brand-muted">
                  <Zap className="w-3 h-3 text-brand-gold" />
                  30 days Pro free at launch
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Fine print */}
        <p className="mt-6 text-xs text-brand-muted/50 max-w-sm mx-auto">
          By joining you agree to our{' '}
          <a href="/terms" className="underline hover:text-brand-muted">Terms</a> and{' '}
          <a href="/privacy" className="underline hover:text-brand-muted">Privacy Policy</a>.
          Signals are for informational purposes only and do not constitute financial advice.
        </p>
      </div>
    </section>
  )
}
