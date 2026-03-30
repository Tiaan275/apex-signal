import Hero from '@/components/landing/Hero'
import PainPoints from '@/components/landing/PainPoints'
import HowItWorks from '@/components/landing/HowItWorks'
import FeaturesPreview from '@/components/landing/FeaturesPreview'
import WaitlistForm from '@/components/landing/WaitlistForm'
import PageView from '@/components/ui/PageView'

export default function LandingPage() {
  return (
    <main className="bg-brand-navy min-h-screen">
      <PageView page="/" />
      <Hero />
      <PainPoints />
      <HowItWorks />
      <FeaturesPreview />
      <WaitlistForm />
    </main>
  )
}
