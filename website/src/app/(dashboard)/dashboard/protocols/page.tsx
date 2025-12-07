import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Plus,
  Search,
  Filter,
  Play,
  Pause,
  ChevronRight,
  Calendar,
  Beaker,
} from 'lucide-react'

// Mock data
const protocols = [
  {
    id: '1',
    name: 'Weight Loss Stack',
    status: 'active',
    goal: 'Weight Loss',
    peptides: ['Semaglutide', 'BPC-157'],
    progress: 35,
    startDate: '2024-11-01',
    endDate: '2025-01-15',
    daysRemaining: 42,
  },
  {
    id: '2',
    name: 'Recovery Protocol',
    status: 'paused',
    goal: 'Recovery',
    peptides: ['TB-500', 'BPC-157'],
    progress: 60,
    startDate: '2024-10-15',
    endDate: '2024-12-30',
    daysRemaining: 23,
  },
  {
    id: '3',
    name: 'Anti-Aging Routine',
    status: 'completed',
    goal: 'Anti-Aging',
    peptides: ['GHK-Cu', 'Epithalon'],
    progress: 100,
    startDate: '2024-08-01',
    endDate: '2024-10-30',
    daysRemaining: 0,
  },
]

const templateProtocols = [
  {
    id: 't1',
    name: 'Beginner Weight Loss',
    goal: 'Weight Loss',
    peptides: ['Semaglutide'],
    duration: '12 weeks',
    popularity: 'Most Popular',
  },
  {
    id: 't2',
    name: 'Advanced Fat Burning',
    goal: 'Weight Loss',
    peptides: ['Tirzepatide', 'BPC-157'],
    duration: '16 weeks',
    popularity: 'Trending',
  },
  {
    id: 't3',
    name: 'Injury Recovery',
    goal: 'Recovery',
    peptides: ['TB-500', 'BPC-157'],
    duration: '8 weeks',
    popularity: null,
  },
  {
    id: 't4',
    name: 'Skin Rejuvenation',
    goal: 'Anti-Aging',
    peptides: ['GHK-Cu', 'Copper Peptides'],
    duration: '10 weeks',
    popularity: null,
  },
]

const statusColors = {
  active: 'bg-emerald-500/10 text-emerald-400',
  paused: 'bg-amber-500/10 text-amber-400',
  completed: 'bg-slate-500/10 text-slate-400',
}

const goalColors: Record<string, string> = {
  'Weight Loss': 'text-accent-400',
  'Recovery': 'text-primary-400',
  'Anti-Aging': 'text-secondary-400',
}

export default function ProtocolsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Protocols</h1>
          <p className="text-slate-400">Manage your peptide protocols and track progress</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Protocol
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search protocols..."
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Active Protocols */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Your Protocols</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {protocols.map((protocol) => (
            <Card key={protocol.id} className="bg-slate-800/50 border-slate-700/50 hover:border-primary-500/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base text-white">{protocol.name}</CardTitle>
                    <p className={`text-sm ${goalColors[protocol.goal] || 'text-slate-400'}`}>
                      {protocol.goal}
                    </p>
                  </div>
                  <Badge className={statusColors[protocol.status as keyof typeof statusColors]}>
                    {protocol.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Peptides */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {protocol.peptides.map((peptide) => (
                    <Badge key={peptide} variant="outline" className="text-xs">
                      {peptide}
                    </Badge>
                  ))}
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-slate-400">Progress</span>
                    <span className="text-xs text-white">{protocol.progress}%</span>
                  </div>
                  <Progress value={protocol.progress} size="sm" />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-slate-400">
                    <Calendar className="w-3 h-3 mr-1" />
                    {protocol.daysRemaining > 0
                      ? `${protocol.daysRemaining} days left`
                      : 'Completed'}
                  </div>
                  <div className="flex items-center gap-2">
                    {protocol.status === 'active' && (
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Pause className="w-4 h-4" />
                      </Button>
                    )}
                    {protocol.status === 'paused' && (
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Play className="w-4 h-4" />
                      </Button>
                    )}
                    <Link href={`/dashboard/protocols/${protocol.id}`}>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Protocol Templates */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Protocol Templates</h2>
          <Link href="/dashboard/protocols/templates">
            <Button variant="ghost" size="sm">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {templateProtocols.map((template) => (
            <Card key={template.id} className="bg-slate-800/50 border-slate-700/50 hover:border-primary-500/50 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
                    <Beaker className="w-5 h-5 text-primary-400" />
                  </div>
                  {template.popularity && (
                    <Badge variant="secondary" className="text-xs">
                      {template.popularity}
                    </Badge>
                  )}
                </div>
                <h3 className="font-medium text-white mb-1">{template.name}</h3>
                <p className={`text-sm ${goalColors[template.goal] || 'text-slate-400'} mb-2`}>
                  {template.goal}
                </p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {template.peptides.map((peptide) => (
                    <span key={peptide} className="text-xs text-slate-400">
                      {peptide}
                      {template.peptides.indexOf(peptide) < template.peptides.length - 1 && ', '}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-slate-500">{template.duration}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
