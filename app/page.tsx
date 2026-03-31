import Hero from '@/components/landing/Hero'
import PainPoints from '@/components/landing/PainPoints'
import HowItWorks from '@/components/landing/HowItWorks'
import FeaturesPreview from '@/components/landing/FeaturesPreview'
import MarketIntelligence from '@/components/landing/MarketIntelligence'
import Pricing from '@/components/landing/Pricing'
import WaitlistForm from '@/components/landing/WaitlistForm'
import PageView from '@/components/ui/PageView'

export default function LandingPage() {
  return (
    <main className="bg-brand-navy min-h-screen">
      <PageView page="/" />
      {/* 1 — Hook + CTA */}
      <Hero />
      {/* 2 — Problem awareness */}
      <PainPoints />
      {/* 3 — Solution walkthrough */}
      <HowItWorks />
      {/* 4 — Features deep-dive */}
      <FeaturesPreview />
      {/* 5 — Market intelligence preview */}
      <MarketIntelligence />
      {/* 6 — Pricing / conversion */}
      <Pricing />
      {/* 7 — Final waitlist CTA */}
      <WaitlistForm />
    </main>
  )
}
