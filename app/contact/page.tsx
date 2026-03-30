'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, MessageSquare, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { track, EVENTS, usePageView } from '@/lib/analytics'

type FormState = { name: string; email: string; subject: string; message: string }

const EMPTY_FORM: FormState = { name: '', email: '', subject: '', message: '' }

export default function ContactPage() {
  usePageView('/contact')

  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    track(EVENTS.CONTACT_SUBMIT)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      track(EVENTS.CONTACT_SUCCESS)
      setStatus('success')
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  const field = (
    id: keyof FormState,
    label: string,
    placeholder: string,
    type = 'text',
  ) => (
    <div>
      <label className="block text-xs font-semibold text-brand-muted mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      <input
        type={type}
        required
        value={form[id]}
        onChange={e => { setForm(f => ({ ...f, [id]: e.target.value })); setErrorMsg('') }}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-brand-border/60 text-brand-text placeholder:text-brand-muted/40 text-sm focus:outline-none focus:border-brand-green/50 focus:ring-1 focus:ring-brand-green/20 transition-colors"
      />
    </div>
  )

  return (
    <main className="min-h-screen bg-brand-navy pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-brand-text transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-brand-text mb-3">Get in Touch</h1>
          <p className="text-brand-muted">
            Questions about Apex Signal, your subscription, or the signals?
            We&apos;ll get back to you within 24 hours.
          </p>
        </div>

        {/* Quick contact options */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <a
            href="mailto:info@apex-signal.com"
            className="glass rounded-xl p-4 flex items-center gap-3 hover:border-brand-green/30 transition-all"
          >
            <div className="w-9 h-9 rounded-lg bg-brand-green/10 flex items-center justify-center">
              <Mail className="w-4 h-4 text-brand-green" />
            </div>
            <div>
              <p className="text-xs font-semibold text-brand-text">General</p>
              <p className="text-xs text-brand-muted">info@apex-signal.com</p>
            </div>
          </a>
          <a
            href="mailto:legal@apex-signal.com"
            className="glass rounded-xl p-4 flex items-center gap-3 hover:border-brand-green/30 transition-all"
          >
            <div className="w-9 h-9 rounded-lg bg-brand-green/10 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-brand-green" />
            </div>
            <div>
              <p className="text-xs font-semibold text-brand-text">Legal</p>
              <p className="text-xs text-brand-muted">legal@apex-signal.com</p>
            </div>
          </a>
        </div>

        {/* Form card */}
        <div className="glass rounded-2xl p-8">
          {status === 'success' ? (
            <div className="py-8 flex flex-col items-center gap-4 text-center">
              <div className="w-14 h-14 rounded-full bg-brand-green/15 flex items-center justify-center glow-emerald">
                <CheckCircle2 className="w-7 h-7 text-brand-green" />
              </div>
              <h3 className="text-lg font-bold text-brand-text">Message received!</h3>
              <p className="text-sm text-brand-muted max-w-xs">
                We&apos;ll get back to you at{' '}
                <strong className="text-brand-text">{form.email}</strong> within 24 hours.
              </p>
              <button
                onClick={() => { setForm(EMPTY_FORM); setStatus('idle') }}
                className="mt-2 text-sm text-brand-green hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {field('name', 'Your Name *', 'Tiaan')}
                {field('email', 'Email Address *', 'you@email.com', 'email')}
              </div>
              {field('subject', 'Subject *', 'Question about signals...')}

              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1.5 uppercase tracking-wide">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => { setForm(f => ({ ...f, message: e.target.value })); setErrorMsg('') }}
                  placeholder="Tell us what you need..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-brand-border/60 text-brand-text placeholder:text-brand-muted/40 text-sm focus:outline-none focus:border-brand-green/50 focus:ring-1 focus:ring-brand-green/20 transition-colors resize-none"
                />
              </div>

              {errorMsg && (
                <div className="flex items-start gap-2 text-xs text-red-400">
                  <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-green text-white font-bold text-sm hover:bg-brand-green/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 glow-emerald hover:scale-[1.02] active:scale-100"
              >
                {status === 'loading' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />Sending…</>
                ) : (
                  <><Send className="w-4 h-4" />Send Message</>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
