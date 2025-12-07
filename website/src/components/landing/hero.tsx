import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Shield, Zap, TrendingUp } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/50 to-background-dark" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
            <span className="text-primary-400 text-sm font-medium">
              The Future of Health Management
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Master Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
              Peptide Protocols
            </span>
            <br />
            Transform Your Health
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            The all-in-one platform for tracking your peptide protocols, managing injections,
            monitoring progress, and achieving your anti-aging and wellness goals.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/register">
              <Button size="xl" className="group">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="outline" size="xl" className="group">
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-slate-400">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-primary-400" />
              <span className="text-sm">HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-secondary-400" />
              <span className="text-sm">10,000+ Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span className="text-sm">95% Success Rate</span>
            </div>
          </div>
        </div>

        {/* Hero Image/Dashboard Preview */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent z-10" />
          <div className="relative bg-slate-800/50 rounded-2xl border border-slate-700/50 p-2 shadow-2xl">
            <div className="bg-slate-900 rounded-xl overflow-hidden">
              {/* Mock Dashboard Preview */}
              <div className="aspect-[16/9] bg-gradient-to-br from-slate-800 to-slate-900 p-6">
                <div className="grid grid-cols-3 gap-4 h-full">
                  {/* Left Panel */}
                  <div className="space-y-4">
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                      <div className="text-xs text-slate-400 mb-2">Today&apos;s Protocol</div>
                      <div className="text-lg font-semibold text-white">BPC-157</div>
                      <div className="text-sm text-primary-400">250mcg - Morning</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                      <div className="text-xs text-slate-400 mb-2">Next Injection</div>
                      <div className="text-2xl font-bold text-white">2h 45m</div>
                    </div>
                  </div>
                  {/* Center - Chart */}
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                    <div className="text-xs text-slate-400 mb-4">Weight Progress</div>
                    <div className="h-full flex items-end justify-around pb-4">
                      {[65, 45, 75, 55, 85, 70, 90].map((h, i) => (
                        <div
                          key={i}
                          className="w-6 bg-gradient-to-t from-primary-600 to-primary-400 rounded-t"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Right Panel */}
                  <div className="space-y-4">
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                      <div className="text-xs text-slate-400 mb-2">Week Progress</div>
                      <div className="text-lg font-semibold text-emerald-400">-2.3 lbs</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                      <div className="text-xs text-slate-400 mb-2">Energy Level</div>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className={`w-4 h-4 rounded-full ${i <= 4 ? 'bg-secondary-400' : 'bg-slate-600'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
