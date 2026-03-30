import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import PageView from '@/components/ui/PageView'

export const metadata: Metadata = {
  title: 'Privacy Policy — Apex Signal',
  description: 'How Apex Signal collects, uses and protects your personal information in compliance with POPIA.',
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-brand-navy pt-24 pb-20">
      <PageView page="/privacy" />
      <div className="max-w-3xl mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-brand-text transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="glass rounded-2xl p-8 md:p-12">
          <div className="mb-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold glass-emerald text-brand-green mb-4">
              Legal Document
            </span>
            <h1 className="text-3xl font-black text-brand-text mb-2">Privacy Policy</h1>
            <p className="text-sm text-brand-muted">
              Effective date: 22 April 2026 · Last updated: 22 April 2026
            </p>
          </div>

          <div className="prose prose-invert prose-sm max-w-none space-y-8 text-brand-muted leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-brand-text mb-3">1. Introduction</h2>
              <p>
                Apex Signal (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is committed to protecting your personal
                information in accordance with the Protection of Personal Information Act 4 of 2013
                (&ldquo;POPIA&rdquo;). This Privacy Policy explains how we collect, use, store and protect
                information about users of our platform.
              </p>
              <p className="mt-3">
                Information Officer: Tiaan Engelbrecht —{' '}
                <a href="mailto:legal@apex-signal.com" className="text-brand-green hover:underline">
                  legal@apex-signal.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-text mb-3">2. Information We Collect</h2>
              <ul className="space-y-2 list-disc list-inside">
                <li><strong className="text-brand-text">Account information:</strong> name, email address, password hash</li>
                <li><strong className="text-brand-text">Usage data:</strong> pages visited, features used, signal interactions</li>
                <li><strong className="text-brand-text">Payment data:</strong> processed by Stripe — we do not store card numbers</li>
                <li><strong className="text-brand-text">Communications:</strong> support emails and waitlist correspondence</li>
                <li><strong className="text-brand-text">Device data:</strong> browser type, IP address, timezone (for roster features)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-text mb-3">3. How We Use Your Information</h2>
              <ul className="space-y-2 list-disc list-inside">
                <li>Delivering trading signals and platform features</li>
                <li>Processing payments and managing subscriptions</li>
                <li>Sending transactional emails (signal alerts, account notices)</li>
                <li>Marketing communications (only with your explicit consent)</li>
                <li>Improving platform performance and analytics</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-text mb-3">4. Data Sharing</h2>
              <p>
                We do not sell your personal information. We share data only with service providers
                necessary to operate the platform: Supabase (database), Stripe (payments), MailerLite
                (email), Vercel (hosting), and Sentry (error monitoring). All providers are bound by
                appropriate data processing agreements.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-text mb-3">5. Data Retention</h2>
              <p>
                We retain your personal information for as long as your account is active or as
                required by law. You may request deletion of your data at any time by emailing
                legal@apex-signal.com. We will process deletion requests within 21 business days.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-text mb-3">6. Your Rights (POPIA)</h2>
              <p>Under POPIA you have the right to:</p>
              <ul className="space-y-2 list-disc list-inside mt-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Object to processing of your information</li>
                <li>Lodge a complaint with the Information Regulator of South Africa</li>
              </ul>
              <p className="mt-3">
                Information Regulator: <a href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:underline">inforegulator.org.za</a>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-text mb-3">7. Cookies</h2>
              <p>
                We use essential cookies for authentication and session management. We do not use
                third-party advertising cookies. Analytics (if enabled) are privacy-first and do not
                track individuals across the web.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-text mb-3">8. Contact</h2>
              <p>
                For privacy-related queries: <a href="mailto:legal@apex-signal.com" className="text-brand-green hover:underline">legal@apex-signal.com</a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
