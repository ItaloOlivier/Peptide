'use client'

import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  Heart,
  Brain,
  Dumbbell,
  Sparkles,
  Beaker,
  AlertTriangle,
  CheckCircle,
  Clock,
  Syringe,
  FileText,
} from 'lucide-react'
import { LucideIcon } from 'lucide-react'

// Peptide data (in production, fetch from API)
const peptides: Record<string, {
  id: string
  name: string
  category: string
  difficulty: string
  description: string
  icon: LucideIcon
  benefits: string[]
  sideEffects: string[]
  dosing: { range: string; frequency: string; timing: string }
  storage: string
  reconstitution: string
  halfLife: string
  topics: string[]
}> = {
  'bpc157': {
    id: 'bpc157',
    name: 'BPC-157',
    category: 'Healing & Recovery',
    difficulty: 'Intermediate',
    description: 'Body Protection Compound-157 is a synthetic peptide derived from a protective protein found in the stomach. It has been studied for its potential tissue repair and gut health support properties.',
    icon: Heart,
    benefits: [
      'May support tissue repair and healing',
      'Studied for gut health benefits',
      'Research on tendon and ligament recovery',
      'Potential anti-inflammatory properties',
    ],
    sideEffects: [
      'Generally well-tolerated in studies',
      'Possible injection site reactions',
      'Limited long-term human data',
      'May interact with certain medications',
    ],
    dosing: {
      range: '200-500 mcg',
      frequency: '1-2x daily',
      timing: 'Can be taken any time',
    },
    storage: 'Refrigerate after reconstitution. Stable for 2-4 weeks.',
    reconstitution: 'Use bacteriostatic water. Typical: 2ml per 5mg vial.',
    halfLife: '~4 hours',
    topics: ['Mechanism of Action', 'Dosing Guidelines', 'Reconstitution', 'Storage'],
  },
  'semaglutide': {
    id: 'semaglutide',
    name: 'Semaglutide',
    category: 'Metabolic Health',
    difficulty: 'Advanced',
    description: 'A GLP-1 receptor agonist originally developed for type 2 diabetes and now FDA-approved for weight management. It works by mimicking the hormone GLP-1 to regulate appetite and blood sugar.',
    icon: Sparkles,
    benefits: [
      'FDA-approved for weight management',
      'Helps regulate appetite and satiety',
      'Supports blood sugar control',
      'Cardiovascular benefits in studies',
    ],
    sideEffects: [
      'Nausea (common, usually temporary)',
      'Gastrointestinal discomfort',
      'Potential gallbladder issues',
      'Requires medical supervision',
    ],
    dosing: {
      range: '0.25mg - 2.4mg',
      frequency: 'Once weekly',
      timing: 'Same day each week',
    },
    storage: 'Refrigerate. Do not freeze. Protect from light.',
    reconstitution: 'Typically comes pre-mixed in injection pens.',
    halfLife: '~7 days',
    topics: ['How It Works', 'Titration Protocol', 'Side Effects', 'Monitoring'],
  },
  'tb500': {
    id: 'tb500',
    name: 'TB-500',
    category: 'Healing & Recovery',
    difficulty: 'Intermediate',
    description: 'Thymosin Beta-4 is a naturally occurring peptide present in almost all human and animal cells. It plays a role in tissue repair, cell migration, and reducing inflammation.',
    icon: Dumbbell,
    benefits: [
      'May promote tissue repair',
      'Studied for flexibility improvement',
      'Research on inflammation reduction',
      'Potential wound healing support',
    ],
    sideEffects: [
      'Generally well-tolerated',
      'Possible fatigue initially',
      'Injection site reactions',
      'Limited human clinical data',
    ],
    dosing: {
      range: '2-5 mg',
      frequency: '2x per week (loading), 1x weekly (maintenance)',
      timing: 'Any time of day',
    },
    storage: 'Refrigerate after reconstitution. Use within 2-3 weeks.',
    reconstitution: 'Bacteriostatic water. Typical: 2ml per 5mg vial.',
    halfLife: '~2 hours (but prolonged tissue effects)',
    topics: ['Mechanism', 'Loading Protocol', 'Stacking', 'Storage'],
  },
  'ghk-cu': {
    id: 'ghk-cu',
    name: 'GHK-Cu',
    category: 'Anti-Aging',
    difficulty: 'Beginner',
    description: 'Copper peptide GHK-Cu is a naturally occurring tripeptide with copper. It has been extensively studied for skin regeneration, wound healing, and anti-aging properties.',
    icon: Brain,
    benefits: [
      'Skin rejuvenation and collagen production',
      'Hair follicle support',
      'Wound healing acceleration',
      'Antioxidant properties',
    ],
    sideEffects: [
      'Very well-tolerated',
      'Rare skin sensitivity',
      'Minimal systemic effects when topical',
    ],
    dosing: {
      range: '1-2 mg (injection) or topical application',
      frequency: 'Daily (topical) or 2-3x weekly (injection)',
      timing: 'Evening application preferred for skin',
    },
    storage: 'Store in cool, dark place. Refrigerate solutions.',
    reconstitution: 'Bacteriostatic water for injection form.',
    halfLife: 'Minutes to hours (varies by route)',
    topics: ['Skin Benefits', 'Application Methods', 'Combinations', 'Research'],
  },
}

const levelColors: Record<string, string> = {
  'Beginner': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Intermediate': 'bg-secondary-500/10 text-secondary-400 border-secondary-500/20',
  'Advanced': 'bg-accent-500/10 text-accent-400 border-accent-500/20',
}

export default function PeptideDetailPage() {
  const params = useParams()
  const router = useRouter()
  const peptideId = params.id as string

  const peptide = peptides[peptideId]

  if (!peptide) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <h1 className="text-2xl font-bold text-white">Peptide Not Found</h1>
        <p className="text-slate-400">The peptide you're looking for doesn't exist in our encyclopedia.</p>
        <Button onClick={() => router.push('/dashboard/learn')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Learn
        </Button>
      </div>
    )
  }

  const IconComponent = peptide.icon

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => router.push('/dashboard/learn')} className="text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Learn
      </Button>

      {/* Header */}
      <div className="flex items-start gap-6">
        <div className="w-20 h-20 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
          <IconComponent className="w-10 h-10 text-primary-400" />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-white">{peptide.name}</h1>
            <Badge className={levelColors[peptide.difficulty]}>{peptide.difficulty}</Badge>
          </div>
          <p className="text-primary-400 text-sm mb-2">{peptide.category}</p>
          <p className="text-slate-300">{peptide.description}</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Syringe className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-slate-400">Typical Dose</span>
            </div>
            <p className="font-semibold text-white">{peptide.dosing.range}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-secondary-400" />
              <span className="text-sm text-slate-400">Frequency</span>
            </div>
            <p className="font-semibold text-white">{peptide.dosing.frequency}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Beaker className="w-4 h-4 text-accent-400" />
              <span className="text-sm text-slate-400">Half-Life</span>
            </div>
            <p className="font-semibold text-white">{peptide.halfLife}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-slate-400">Timing</span>
            </div>
            <p className="font-semibold text-white text-sm">{peptide.dosing.timing}</p>
          </CardContent>
        </Card>
      </div>

      {/* Benefits & Side Effects */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-emerald-500/5 border-emerald-500/20">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Potential Benefits
            </h2>
            <ul className="space-y-3">
              {peptide.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-amber-500/5 border-amber-500/20">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-amber-400 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Side Effects & Considerations
            </h2>
            <ul className="space-y-3">
              {peptide.sideEffects.map((effect, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-300">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  {effect}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Storage & Reconstitution */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-white mb-3">Storage</h2>
            <p className="text-slate-300">{peptide.storage}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-white mb-3">Reconstitution</h2>
            <p className="text-slate-300">{peptide.reconstitution}</p>
          </CardContent>
        </Card>
      </div>

      {/* Related Topics */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Related Topics</h2>
          <div className="flex flex-wrap gap-2">
            {peptide.topics.map((topic, index) => (
              <Badge
                key={index}
                className="bg-slate-700/50 text-slate-300 border-slate-600/50 cursor-pointer hover:bg-slate-600/50"
              >
                {topic}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-400">
              This information is for educational purposes only. Always consult with a qualified healthcare professional before starting any peptide protocol. Individual results may vary.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 pt-4">
        <Button variant="outline" onClick={() => router.push('/dashboard/calculator')}>
          <Beaker className="w-4 h-4 mr-2" />
          Calculate Dosage
        </Button>
        <Button className="bg-primary-500 hover:bg-primary-600" onClick={() => router.push('/dashboard/shop')}>
          View in Shop
        </Button>
      </div>
    </div>
  )
}
