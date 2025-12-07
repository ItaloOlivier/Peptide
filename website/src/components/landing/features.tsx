import {
  Syringe,
  BarChart3,
  Bell,
  ShoppingBag,
  BookOpen,
  Users,
  Calendar,
  Pill,
  Camera,
  Activity,
  Target,
  Clock
} from 'lucide-react'

const features = [
  {
    icon: Syringe,
    title: 'Injection Tracking',
    description: 'Log doses, rotate sites with visual body maps, and track reactions. Never miss an injection.',
    color: 'text-accent-400',
    bgColor: 'bg-accent-500/10',
  },
  {
    icon: Calendar,
    title: 'Protocol Management',
    description: 'Choose from pre-built protocols or create custom ones. Manage cycling schedules and stacking.',
    color: 'text-primary-400',
    bgColor: 'bg-primary-500/10',
  },
  {
    icon: BarChart3,
    title: 'Progress Analytics',
    description: 'Visualize your health journey with detailed charts. Track weight, biomarkers, and trends.',
    color: 'text-secondary-400',
    bgColor: 'bg-secondary-500/10',
  },
  {
    icon: Bell,
    title: 'Smart Reminders',
    description: 'Get timely notifications for injections, supply reorders, and protocol phase changes.',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
  },
  {
    icon: Pill,
    title: 'Dosage Calculator',
    description: 'Precise reconstitution and dosage calculations based on your body weight and protocol.',
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/10',
  },
  {
    icon: Camera,
    title: 'Photo Progress',
    description: 'Document your transformation with before/after comparisons and timeline views.',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
  },
  {
    icon: Activity,
    title: 'Health Logging',
    description: 'Track daily energy, sleep, mood, and side effects. See how your body responds.',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
  },
  {
    icon: Target,
    title: 'Goal Tracking',
    description: 'Set weight loss, muscle, or anti-aging goals. Monitor progress toward milestones.',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
  },
  {
    icon: ShoppingBag,
    title: 'Shop Supplies',
    description: 'Order peptides, syringes, and supplements. Smart reorder alerts when you run low.',
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10',
  },
  {
    icon: BookOpen,
    title: 'Education Hub',
    description: 'Learn about peptides, mechanisms, and best practices with our research-backed guides.',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
  },
  {
    icon: Clock,
    title: 'Fasting Integration',
    description: 'Track intermittent fasting windows alongside your protocol for maximum results.',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Connect with others on similar journeys. Share experiences and get support.',
    color: 'text-teal-400',
    bgColor: 'bg-teal-500/10',
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything You Need to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
              Optimize Your Health
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            From injection tracking to progress analytics, we&apos;ve built every tool you need
            to manage your peptide protocols effectively.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-primary-500/50 transition-all hover:shadow-lg hover:shadow-primary-500/5"
            >
              <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
