import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-600 to-primary-800 p-12 md:p-16">
          {/* Background Effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary-500/20 rounded-full blur-3xl" />

          <div className="relative text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-lg text-primary-100 mb-8">
              Join thousands of biohackers who trust VitalityRx to manage their protocols.
              Start your free trial today - no credit card required.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button
                  size="xl"
                  className="bg-white text-primary-600 hover:bg-primary-50 group"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/learn">
                <Button
                  variant="ghost"
                  size="xl"
                  className="text-white hover:bg-white/10"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Trust Points */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-primary-100 text-sm">
              <span>7-day free trial</span>
              <span className="hidden sm:inline">•</span>
              <span>No credit card required</span>
              <span className="hidden sm:inline">•</span>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
