import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import PageView from '@/components/ui/PageView'

export const metadata: Metadata = {
  title: 'Terms of Service — Apex Signal',
  description: 'Terms and conditions governing use of the Apex Signal trading signals platform.',
}

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-brand-navy pt-24 pb-20">
      <PageView page="/terms" />
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
            <h1 className="text-3xl font-black text-brand-text mb-2">Terms of Service</h1>
            <p className="text-sm text-brand-muted">
              Effective at product launch · Governed by South African law
            </p>
          </div>

          <div className="prose prose-invert prose-sm max-w-none space-y-8 text-brand-muted leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-brand-text mb-3">1. Acceptance</h2>
              <p>
                By accessing or using Apex Signal (&ldquo;Platform&rdquo;, &ldquo;Service&rdquo;), you agree to
                these Terms of Service. If you do not agree, do not use the Platform.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-text mb-3">2. Nature of Service</h2>
              <p>
                Apex Signal provides algorithmic trading signals for educational and informational
                purposes only. We are <strong className="text-brand-text">not</strong> registered as a
                Financial Services Provider (FSP) under the Financial Advisory and Intermediary Services
                Act 37 of 2002 (&ldquo;FAIS Act&rdquo;). Signals do not constitute financial advice,
                recommendations to buy or sell any financial instrument, or a guarantee of profit.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-text mb-3">3. Risk Disclosure</h2>
              <p>
                Trading financial instruments involves significant risk of loss. Past performance does
                not guarantee future results. You acknowledge that you trade entirely at your own risk
                and that Apex Signal accepts no liability for trading losses. You should not trade with
                funds you cannot afford to lose.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-text mb-3">4. Subscriptions & Billing</h2>
              <ul className="space-y-2 list-disc list-inside">
                <li>Subscriptions are billed monthly or annually as selected at checkout</li>
                <li>Payments are processed by Stripe and governed by their terms</li>
                <li>You have a 7-day cooling-off right under ECTA for electronic contracts</li>
                <li>Renewals are automatic — cancel any time before the renewal date</li>
                <li>Prices are in South African Rand (ZAR) and include VAT where applicable</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-text mb-3">5. Prohibited Use</h2>
              <p>You may not:</p>
              <ul className="space-y-2 list-disc list-inside mt-2">
                <li>Share, resell or redistribute signals to third parties</li>
                <li>Reverse engineer or scrape the Platform</li>
                <li>Use the Platform for any unlawful purpose</li>
                <li>Create multiple accounts to circumvent subscription limits</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-text mb-3">6. Intellectual Property</h2>
              <p>
                All content, algorithms, signal methodologies, and platform design are the exclusive
                property of Apex Signal. You receive a limited, non-transferable licence to use the
                Platform for personal trading purposes only.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-text mb-3">7. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Apex Signal&apos;s total liability to you for any
                claim arising from your use of the Platform shall not exceed the amount you paid in the
                30 days prior to the claim. We are not liable for indirect, consequential, or trading
                losses.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-text mb-3">8. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the Republic of South Africa. Any disputes
                shall be subject to the exclusive jurisdiction of the courts of South Africa.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-text mb-3">9. Contact</h2>
              <p>
                Questions about these Terms:{' '}
                <a href="mailto:legal@apex-signal.com" className="text-brand-green hover:underline">
                  legal@apex-signal.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
