import Link from 'next/link'
import { TrendingUp } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-brand-navy border-t border-brand-border/50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-green flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-lg tracking-tight">
                Apex<span className="gradient-text">Signal</span>
              </span>
            </div>
            <p className="text-sm text-brand-muted leading-relaxed max-w-xs">
              Algorithmic trading signals built for FIFO workers, offshore crew, and SA expats
              worldwide. Trade smarter around your roster.
            </p>
            <p className="mt-4 text-xs text-brand-muted/60">
              Not registered as a Financial Services Provider. Signals are for educational and
              informational purposes only. Past performance does not guarantee future results.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-muted mb-4">Product</h4>
            <ul className="space-y-2.5">
              {['Features', 'Pricing', 'How It Works', 'FAQ'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-brand-muted hover:text-brand-text transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-muted mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Risk Disclaimer', href: '/risk-disclaimer' },
                { label: 'Refund Policy', href: '/refund-policy' },
              ].map(item => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-brand-muted hover:text-brand-text transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-brand-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-muted/60">
            © {new Date().getFullYear()} Apex Signal. All rights reserved. Registered in South Africa.
          </p>
          <p className="text-xs text-brand-muted/60">
            JSE · Forex · Crypto · US Markets
          </p>
        </div>
      </div>
    </footer>
  )
}
