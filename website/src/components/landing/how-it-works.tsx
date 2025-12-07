import { UserPlus, ClipboardList, Syringe, TrendingUp } from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: UserPlus,
    title: 'Create Your Profile',
    description: 'Tell us about your health goals, experience level, and current metrics. Our onboarding helps personalize your experience.',
  },
  {
    step: '02',
    icon: ClipboardList,
    title: 'Choose Your Protocol',
    description: 'Select from our library of research-backed protocols or build your own custom protocol with our easy-to-use builder.',
  },
  {
    step: '03',
    icon: Syringe,
    title: 'Track Everything',
    description: 'Log injections, track body measurements, and monitor how you feel. Our smart reminders keep you on schedule.',
  },
  {
    step: '04',
    icon: TrendingUp,
    title: 'See Results',
    description: 'Watch your progress with detailed analytics and visualizations. Adjust your approach based on real data.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Get started in minutes and take control of your health journey with our simple four-step process.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary-500 to-primary-500/0" />
              )}

              <div className="relative text-center">
                {/* Step Number */}
                <div className="text-6xl font-bold text-slate-800 mb-4">{step.step}</div>

                {/* Icon */}
                <div className="relative -mt-12 mb-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/25">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
