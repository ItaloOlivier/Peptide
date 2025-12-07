'use client'

import { useState } from 'react'
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
  X,
} from 'lucide-react'

// Helper to calculate days remaining from today
function calculateDaysRemaining(endDateStr: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const endDate = new Date(endDateStr)
  endDate.setHours(0, 0, 0, 0)
  const diffTime = endDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(0, diffDays)
}

// Helper to calculate progress based on dates
function calculateProgress(startDateStr: string, endDateStr: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const startDate = new Date(startDateStr)
  startDate.setHours(0, 0, 0, 0)
  const endDate = new Date(endDateStr)
  endDate.setHours(0, 0, 0, 0)

  const totalDuration = endDate.getTime() - startDate.getTime()
  const elapsed = today.getTime() - startDate.getTime()

  if (elapsed <= 0) return 0
  if (elapsed >= totalDuration) return 100

  return Math.round((elapsed / totalDuration) * 100)
}

// Mock data with dynamic dates (relative to today)
const today = new Date()
const getDateString = (daysFromToday: number) => {
  const date = new Date(today)
  date.setDate(date.getDate() + daysFromToday)
  return date.toISOString().split('T')[0]
}

const initialProtocols = [
  {
    id: '1',
    name: 'Weight Loss Stack',
    status: 'active' as const,
    goal: 'Weight Loss',
    peptides: ['Semaglutide', 'BPC-157'],
    startDate: getDateString(-30), // Started 30 days ago
    endDate: getDateString(42), // Ends in 42 days
  },
  {
    id: '2',
    name: 'Recovery Protocol',
    status: 'paused' as const,
    goal: 'Recovery',
    peptides: ['TB-500', 'BPC-157'],
    startDate: getDateString(-45), // Started 45 days ago
    endDate: getDateString(23), // Ends in 23 days
  },
  {
    id: '3',
    name: 'Anti-Aging Routine',
    status: 'completed' as const,
    goal: 'Anti-Aging',
    peptides: ['GHK-Cu', 'Epithalon'],
    startDate: getDateString(-90), // Started 90 days ago
    endDate: getDateString(-10), // Ended 10 days ago
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
  completed: 'bg-primary-500/10 text-primary-400',
}

const goalColors: Record<string, string> = {
  'Weight Loss': 'text-accent-400',
  'Recovery': 'text-primary-400',
  'Anti-Aging': 'text-secondary-400',
}

const filterOptions = ['All', 'Active', 'Paused', 'Completed']

export default function ProtocolsPage() {
  const [protocols, setProtocols] = useState(initialProtocols)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)

  // Toggle protocol status between active and paused
  const toggleProtocolStatus = (protocolId: string) => {
    setProtocols(prev => prev.map(protocol => {
      if (protocol.id === protocolId) {
        if (protocol.status === 'active') {
          return { ...protocol, status: 'paused' as const }
        } else if (protocol.status === 'paused') {
          return { ...protocol, status: 'active' as const }
        }
      }
      return protocol
    }))
  }

  // Filter protocols based on search and status
  const filteredProtocols = protocols.filter(protocol => {
    const matchesSearch =
      protocol.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      protocol.goal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      protocol.peptides.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesStatus =
      statusFilter === 'All' ||
      protocol.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  // Get progress variant based on status
  const getProgressVariant = (status: string, progress: number): 'default' | 'success' | 'warning' | 'accent' => {
    if (status === 'completed' || progress === 100) return 'success'
    if (status === 'paused') return 'warning'
    return 'default'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Protocols</h1>
          <p className="text-slate-400">Manage your peptide protocols and track progress</p>
        </div>
        <Link href="/dashboard/protocols/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Protocol
          </Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search protocols..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search protocols"
            className="w-full pl-10 pr-10 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            aria-expanded={showFilterDropdown}
            aria-haspopup="listbox"
          >
            <Filter className="w-4 h-4 mr-2" />
            {statusFilter === 'All' ? 'Filter' : statusFilter}
          </Button>
          {showFilterDropdown && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowFilterDropdown(false)}
              />
              <div className="absolute right-0 mt-2 w-40 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-20">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setStatusFilter(option)
                      setShowFilterDropdown(false)
                    }}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-700 first:rounded-t-lg last:rounded-b-lg ${
                      statusFilter === option ? 'text-primary-400 bg-slate-700/50' : 'text-slate-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Active Protocols */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Your Protocols</h2>
        {filteredProtocols.length === 0 ? (
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-8 text-center">
              <Beaker className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No protocols found</h3>
              <p className="text-slate-400 mb-4">
                {searchQuery || statusFilter !== 'All'
                  ? 'Try adjusting your search or filter criteria'
                  : 'Create your first protocol to get started'}
              </p>
              {!searchQuery && statusFilter === 'All' && (
                <Link href="/dashboard/protocols/new">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Protocol
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProtocols.map((protocol) => {
              const progress = protocol.status === 'completed'
                ? 100
                : calculateProgress(protocol.startDate, protocol.endDate)
              const daysRemaining = calculateDaysRemaining(protocol.endDate)

              return (
                <Card key={protocol.id} className="bg-slate-800/50 border-slate-700/50 hover:border-primary-500/50 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base text-white">{protocol.name}</CardTitle>
                        <p className={`text-sm ${goalColors[protocol.goal] || 'text-slate-400'}`}>
                          {protocol.goal}
                        </p>
                      </div>
                      <Badge className={statusColors[protocol.status]}>
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
                        <span className={`text-xs ${protocol.status === 'completed' ? 'text-emerald-400' : 'text-white'}`}>
                          {progress}%
                        </span>
                      </div>
                      <Progress
                        value={progress}
                        size="sm"
                        variant={getProgressVariant(protocol.status, progress)}
                      />
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-slate-400">
                        <Calendar className="w-3 h-3 mr-1" />
                        {protocol.status === 'completed'
                          ? 'Completed'
                          : protocol.status === 'paused'
                          ? 'Paused'
                          : daysRemaining > 0
                          ? `${daysRemaining} days left`
                          : 'Ending today'}
                      </div>
                      <div className="flex items-center gap-2">
                        {protocol.status === 'active' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => toggleProtocolStatus(protocol.id)}
                            aria-label={`Pause ${protocol.name}`}
                          >
                            <Pause className="w-4 h-4" />
                          </Button>
                        )}
                        {protocol.status === 'paused' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => toggleProtocolStatus(protocol.id)}
                            aria-label={`Resume ${protocol.name}`}
                          >
                            <Play className="w-4 h-4" />
                          </Button>
                        )}
                        <Link href={`/dashboard/protocols/${protocol.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            aria-label={`View details for ${protocol.name}`}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
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
            <Link key={template.id} href={`/dashboard/protocols/new?template=${template.id}`}>
              <Card className="bg-slate-800/50 border-slate-700/50 hover:border-primary-500/50 transition-colors cursor-pointer h-full">
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
                    {template.peptides.map((peptide, index) => (
                      <span key={peptide} className="text-xs text-slate-400">
                        {peptide}
                        {index < template.peptides.length - 1 && ', '}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500">{template.duration}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
