import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check, Sparkles } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started with peptide tracking',
    features: [
      '1 active protocol',
      'Basic injection logging',
      'Weight tracking',
      'Limited educational content',
      'Email support',
    ],
    cta: 'Get Started',
    href: '/register',
    featured: false,
  },
  {
    name: 'Premium',
    price: '$14.99',
    period: 'per month',
    description: 'For serious biohackers who want full control',
    features: [
      'Unlimited protocols',
      'Advanced analytics & trends',
      'Biomarker tracking',
      'Photo progress timeline',
      'Full education library',
      'Priority support',
      'No ads',
    ],
    cta: 'Start Free Trial',
    href: '/register?plan=premium',
    featured: true,
  },
  {
    name: 'Pro',
    price: '$29.99',
    period: 'per month',
    description: 'Maximum results with AI-powered insights',
    features: [
      'Everything in Premium',
      'AI protocol recommendations',
      'Personalized coaching tips',
      'Early access to products',
      'Exclusive community access',
      'Lab results integration',
      'White-glove onboarding',
    ],
    cta: 'Start Free Trial',
    href: '/register?plan=pro',
    featured: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Start free and upgrade as you grow. All paid plans include a 7-day free trial.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 ${
                plan.featured
                  ? 'bg-gradient-to-b from-primary-900/50 to-slate-800/50 border-2 border-primary-500'
                  : 'bg-slate-800/50 border border-slate-700/50'
              }`}
            >
              {/* Featured Badge */}
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center space-x-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-medium px-4 py-1 rounded-full">
                    <Sparkles className="w-4 h-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center space-x-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-slate-400">/{plan.period}</span>
                </div>
                <p className="text-slate-400 text-sm mt-2">{plan.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href={plan.href}>
                <Button
                  className="w-full"
                  variant={plan.featured ? 'default' : 'outline'}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 mb-4">
            Need a custom solution for your clinic or team?
          </p>
          <Link href="/contact">
            <Button variant="ghost" className="text-primary-400 hover:text-primary-300">
              Contact us for Enterprise pricing
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
