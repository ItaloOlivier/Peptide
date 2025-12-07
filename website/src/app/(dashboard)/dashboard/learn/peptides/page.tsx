'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  Search,
  Heart,
  Brain,
  Dumbbell,
  Sparkles,
  Beaker,
  Filter,
} from 'lucide-react'
import { LucideIcon } from 'lucide-react'

const allPeptides: {
  id: string
  name: string
  category: string
  difficulty: string
  description: string
  icon: LucideIcon
  topics: string[]
}[] = [
  {
    id: 'bpc157',
    name: 'BPC-157',
    category: 'Healing & Recovery',
    difficulty: 'Intermediate',
    description: 'Body Protection Compound - studied for tissue repair and gut health support.',
    icon: Heart,
    topics: ['Mechanism of Action', 'Dosing Guidelines', 'Reconstitution', 'Storage'],
  },
  {
    id: 'semaglutide',
    name: 'Semaglutide',
    category: 'Metabolic Health',
    difficulty: 'Advanced',
    description: 'GLP-1 receptor agonist researched for metabolic and weight management.',
    icon: Sparkles,
    topics: ['How It Works', 'Titration Protocol', 'Side Effects', 'Monitoring'],
  },
  {
    id: 'tb500',
    name: 'TB-500',
    category: 'Healing & Recovery',
    difficulty: 'Intermediate',
    description: 'Thymosin Beta-4 studied for tissue repair and flexibility improvement.',
    icon: Dumbbell,
    topics: ['Mechanism', 'Loading Protocol', 'Stacking', 'Storage'],
  },
  {
    id: 'ghk-cu',
    name: 'GHK-Cu',
    category: 'Anti-Aging',
    difficulty: 'Beginner',
    description: 'Copper peptide researched for skin rejuvenation and wound healing.',
    icon: Brain,
    topics: ['Skin Benefits', 'Application Methods', 'Combinations', 'Research'],
  },
  {
    id: 'ipamorelin',
    name: 'Ipamorelin',
    category: 'Growth Hormone',
    difficulty: 'Intermediate',
    description: 'Growth hormone secretagogue studied for GH release without appetite stimulation.',
    icon: Beaker,
    topics: ['GH Release', 'Dosing', 'Timing', 'Stacking'],
  },
  {
    id: 'cjc1295',
    name: 'CJC-1295',
    category: 'Growth Hormone',
    difficulty: 'Advanced',
    description: 'Growth hormone releasing hormone analog researched for sustained GH elevation.',
    icon: Beaker,
    topics: ['DAC vs No DAC', 'Protocols', 'Timing', 'Combinations'],
  },
  {
    id: 'pt141',
    name: 'PT-141 (Bremelanotide)',
    category: 'Sexual Health',
    difficulty: 'Intermediate',
    description: 'Melanocortin receptor agonist FDA-approved for hypoactive sexual desire.',
    icon: Heart,
    topics: ['Mechanism', 'Dosing', 'Side Effects', 'Timing'],
  },
  {
    id: 'tirzepatide',
    name: 'Tirzepatide',
    category: 'Metabolic Health',
    difficulty: 'Advanced',
    description: 'Dual GIP/GLP-1 receptor agonist for metabolic health and weight management.',
    icon: Sparkles,
    topics: ['Dual Action', 'Titration', 'Comparison to Semaglutide', 'Monitoring'],
  },
  {
    id: 'selank',
    name: 'Selank',
    category: 'Cognitive Enhancement',
    difficulty: 'Beginner',
    description: 'Synthetic peptide researched for anxiolytic and nootropic effects.',
    icon: Brain,
    topics: ['Cognitive Effects', 'Nasal Administration', 'Dosing', 'Safety'],
  },
  {
    id: 'semax',
    name: 'Semax',
    category: 'Cognitive Enhancement',
    difficulty: 'Beginner',
    description: 'Nootropic peptide studied for cognitive enhancement and neuroprotection.',
    icon: Brain,
    topics: ['BDNF Effects', 'Administration', 'Protocols', 'Combinations'],
  },
]

const levelColors: Record<string, string> = {
  'Beginner': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Intermediate': 'bg-secondary-500/10 text-secondary-400 border-secondary-500/20',
  'Advanced': 'bg-accent-500/10 text-accent-400 border-accent-500/20',
}

const categories = [
  { id: 'all', name: 'All' },
  { id: 'Healing & Recovery', name: 'Healing' },
  { id: 'Metabolic Health', name: 'Metabolic' },
  { id: 'Growth Hormone', name: 'Growth Hormone' },
  { id: 'Anti-Aging', name: 'Anti-Aging' },
  { id: 'Cognitive Enhancement', name: 'Cognitive' },
  { id: 'Sexual Health', name: 'Sexual Health' },
]

const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced']

export default function PeptidesListPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')

  const filteredPeptides = allPeptides.filter(peptide => {
    const matchesSearch = searchQuery === '' ||
      peptide.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      peptide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      peptide.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || peptide.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'All' || peptide.difficulty === selectedDifficulty
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => router.push('/dashboard/learn')} className="text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Learn
      </Button>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Peptide Encyclopedia</h1>
        <p className="text-slate-400">Comprehensive reference for all peptides</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search peptides..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary-500"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-400">Difficulty:</span>
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                selectedDifficulty === diff
                  ? 'bg-secondary-500/20 text-secondary-400'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-slate-400">{filteredPeptides.length} peptide{filteredPeptides.length !== 1 ? 's' : ''} found</p>

      {/* Peptide Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPeptides.map((peptide) => {
          const IconComponent = peptide.icon
          return (
            <Card
              key={peptide.id}
              className="bg-slate-800/50 border-slate-700/50 hover:border-primary-500/50 transition-all cursor-pointer"
              onClick={() => router.push(`/dashboard/learn/peptide/${peptide.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-primary-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-white">{peptide.name}</h3>
                      <Badge className={levelColors[peptide.difficulty]}>{peptide.difficulty}</Badge>
                    </div>
                    <p className="text-xs text-primary-400 mb-2">{peptide.category}</p>
                    <p className="text-sm text-slate-400 mb-3">{peptide.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {peptide.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="text-xs px-2 py-1 bg-slate-700/50 text-slate-400 rounded"
                        >
                          {topic}
                        </span>
                      ))}
                      {peptide.topics.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-slate-700/50 text-slate-400 rounded">
                          +{peptide.topics.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredPeptides.length === 0 && (
        <div className="text-center py-12">
          <Beaker className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No peptides found</h3>
          <p className="text-slate-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}
