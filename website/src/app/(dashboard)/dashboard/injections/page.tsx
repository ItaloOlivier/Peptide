'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Plus,
  Syringe,
  Calendar,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  Check,
  Trash2,
  Edit,
} from 'lucide-react'

// Helper functions for dynamic dates
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}

const getRelativeDay = (date: Date): string => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const compareDate = new Date(date)
  compareDate.setHours(0, 0, 0, 0)

  const diffDays = Math.round((compareDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Tomorrow'
  if (diffDays === -1) return 'Yesterday'
  if (diffDays < -1) return `${Math.abs(diffDays)} days ago`
  return `In ${diffDays} days`
}

const getRelativeTime = (date: Date): string => {
  const now = new Date()
  const diffMs = date.getTime() - now.getTime()
  const diffHours = Math.round(diffMs / (1000 * 60 * 60))

  if (diffHours > 0 && diffHours < 24) {
    return `in ${diffHours} hour${diffHours === 1 ? '' : 's'}`
  }
  return getRelativeDay(date)
}

// Dynamic date generators
const now = new Date()
const createDate = (daysOffset: number, hours: number, minutes: number = 0): Date => {
  const date = new Date(now)
  date.setDate(date.getDate() + daysOffset)
  date.setHours(hours, minutes, 0, 0)
  return date
}

// Types
interface Injection {
  id: string
  peptide: string
  dosage: string
  date: Date
  site: string
  reaction: 'none' | 'mild' | 'moderate' | 'severe'
  notes: string
  protocol?: string
}

interface UpcomingInjection {
  id: string
  peptide: string
  dosage: string
  scheduledDate: Date
  site: string
  protocol: string
  status: 'due' | 'upcoming'
}

// Initial mock data with dynamic dates
const createInitialUpcoming = (): UpcomingInjection[] => [
  {
    id: 'u1',
    peptide: 'BPC-157',
    dosage: '250mcg',
    scheduledDate: createDate(0, 20, 0), // Today 8:00 PM
    site: 'Abdomen - Left',
    protocol: 'Weight Loss Stack',
    status: 'due',
  },
  {
    id: 'u2',
    peptide: 'Semaglutide',
    dosage: '0.5mg',
    scheduledDate: createDate(1, 9, 0), // Tomorrow 9:00 AM
    site: 'Abdomen - Right',
    protocol: 'Weight Loss Stack',
    status: 'upcoming',
  },
]

const createInitialHistory = (): Injection[] => [
  {
    id: 'h1',
    peptide: 'BPC-157',
    dosage: '250mcg',
    date: createDate(0, 8, 0), // Today 8:00 AM
    site: 'Abdomen - Right',
    reaction: 'none',
    notes: '',
  },
  {
    id: 'h2',
    peptide: 'BPC-157',
    dosage: '250mcg',
    date: createDate(-1, 20, 0), // Yesterday 8:00 PM
    site: 'Thigh - Right',
    reaction: 'none',
    notes: '',
  },
  {
    id: 'h3',
    peptide: 'BPC-157',
    dosage: '250mcg',
    date: createDate(-1, 8, 0), // Yesterday 8:00 AM
    site: 'Thigh - Left',
    reaction: 'none',
    notes: '',
  },
  {
    id: 'h4',
    peptide: 'Semaglutide',
    dosage: '0.5mg',
    date: createDate(-4, 9, 0), // 4 days ago
    site: 'Abdomen - Left',
    reaction: 'mild',
    notes: 'Slight redness at injection site',
  },
]

// Calculate last used for each site
const calculateSiteLastUsed = (history: Injection[], siteLabel: string): string => {
  const siteInjections = history.filter(h => h.site === siteLabel)
  if (siteInjections.length === 0) return 'Never'

  const sorted = siteInjections.sort((a, b) => b.date.getTime() - a.date.getTime())
  return getRelativeDay(sorted[0].date)
}

const injectionSitesList = [
  'Abdomen - Left',
  'Abdomen - Right',
  'Thigh - Left',
  'Thigh - Right',
  'Arm - Left',
  'Arm - Right',
]

const peptideOptions = ['BPC-157', 'Semaglutide', 'TB-500', 'GHK-Cu', 'Tirzepatide', 'Ipamorelin']

const reactionColors = {
  none: 'bg-emerald-500/10 text-emerald-400',
  mild: 'bg-amber-500/10 text-amber-400',
  moderate: 'bg-orange-500/10 text-orange-400',
  severe: 'bg-red-500/10 text-red-400',
}

export default function InjectionsPage() {
  // State
  const [upcomingInjections, setUpcomingInjections] = useState<UpcomingInjection[]>(createInitialUpcoming)
  const [injectionHistory, setInjectionHistory] = useState<Injection[]>(createInitialHistory)
  const [showLogModal, setShowLogModal] = useState(false)
  const [selectedSite, setSelectedSite] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [filterPeptide, setFilterPeptide] = useState<string | null>(null)
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)

  // Form state for logging injection
  const [formData, setFormData] = useState({
    peptide: 'BPC-157',
    dosage: '250mcg',
    time: '',
    site: '',
    reaction: 'none' as 'none' | 'mild' | 'moderate' | 'severe',
    notes: '',
  })

  // Calculate injection sites with last used
  const injectionSites = useMemo(() => {
    return injectionSitesList.map(label => ({
      id: label.toLowerCase().replace(/\s+/g, '-'),
      label,
      lastUsed: calculateSiteLastUsed(injectionHistory, label),
    }))
  }, [injectionHistory])

  // Suggest next site based on rotation
  const suggestedSite = useMemo(() => {
    const sitesWithDates = injectionSites
      .filter(s => s.lastUsed !== 'Never')
      .sort((a, b) => {
        if (a.lastUsed === 'Today') return 1
        if (b.lastUsed === 'Today') return -1
        return 0
      })

    const neverUsed = injectionSites.find(s => s.lastUsed === 'Never')
    if (neverUsed) return neverUsed.label

    // Return least recently used
    return sitesWithDates[sitesWithDates.length - 1]?.label || injectionSites[0].label
  }, [injectionSites])

  // Filter history by month and peptide
  const filteredHistory = useMemo(() => {
    return injectionHistory
      .filter(h => {
        const matchesMonth = h.date.getMonth() === currentMonth.getMonth() &&
                            h.date.getFullYear() === currentMonth.getFullYear()
        const matchesPeptide = !filterPeptide || h.peptide === filterPeptide
        return matchesMonth && matchesPeptide
      })
      .sort((a, b) => b.date.getTime() - a.date.getTime())
  }, [injectionHistory, currentMonth, filterPeptide])

  // Check if injection is due soon (within 2 hours)
  const isDueSoon = (date: Date): boolean => {
    const now = new Date()
    const diffMs = date.getTime() - now.getTime()
    const diffHours = diffMs / (1000 * 60 * 60)
    return diffHours > -1 && diffHours < 2
  }

  // Handlers
  const handleLogNow = (injection: UpcomingInjection) => {
    const newLog: Injection = {
      id: `h${Date.now()}`,
      peptide: injection.peptide,
      dosage: injection.dosage,
      date: new Date(),
      site: injection.site,
      reaction: 'none',
      notes: '',
    }

    setInjectionHistory(prev => [newLog, ...prev])
    setUpcomingInjections(prev => prev.filter(u => u.id !== injection.id))
  }

  const handleSkip = (injectionId: string) => {
    setUpcomingInjections(prev => prev.filter(u => u.id !== injectionId))
  }

  const handlePrevMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() - 1)
      return newDate
    })
  }

  const handleNextMonth = () => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() + 1)
      return newDate
    })
  }

  const handleSaveInjection = () => {
    if (!formData.site) {
      return
    }

    const injectionDate = new Date()
    if (formData.time) {
      const [hours, minutes] = formData.time.split(':').map(Number)
      injectionDate.setHours(hours, minutes, 0, 0)
    }

    const newLog: Injection = {
      id: `h${Date.now()}`,
      peptide: formData.peptide,
      dosage: formData.dosage,
      date: injectionDate,
      site: formData.site,
      reaction: formData.reaction,
      notes: formData.notes,
    }

    setInjectionHistory(prev => [newLog, ...prev])
    setShowLogModal(false)
    setFormData({
      peptide: 'BPC-157',
      dosage: '250mcg',
      time: '',
      site: '',
      reaction: 'none',
      notes: '',
    })
  }

  const handleDeleteLog = (id: string) => {
    setInjectionHistory(prev => prev.filter(h => h.id !== id))
  }

  const formatMonthYear = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  const openLogModal = () => {
    setFormData(prev => ({
      ...prev,
      site: suggestedSite,
      time: new Date().toTimeString().slice(0, 5),
    }))
    setShowLogModal(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Injection Tracker</h1>
          <p className="text-slate-400">Log and monitor your injection history</p>
        </div>
        <Button onClick={openLogModal}>
          <Plus className="w-4 h-4 mr-2" />
          Log Injection
        </Button>
      </div>

      {/* Upcoming Injections */}
      {upcomingInjections.length > 0 && (
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Clock className="w-5 h-5 mr-2 text-primary-400" />
              Upcoming Injections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingInjections.map((injection) => {
                const dueSoon = isDueSoon(injection.scheduledDate)
                return (
                  <div
                    key={injection.id}
                    className={`p-4 rounded-lg border ${
                      dueSoon
                        ? 'bg-accent-500/10 border-accent-500/20'
                        : 'bg-slate-700/50 border-slate-600/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          dueSoon ? 'bg-accent-500/20' : 'bg-slate-600/50'
                        }`}>
                          <Syringe className={`w-5 h-5 ${
                            dueSoon ? 'text-accent-400' : 'text-slate-400'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-white">{injection.peptide}</h3>
                          <p className="text-sm text-slate-400">{injection.dosage}</p>
                        </div>
                      </div>
                      {dueSoon && (
                        <Badge variant="accent">Due Soon</Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center text-slate-400">
                        <Clock className="w-4 h-4 mr-1" />
                        {getRelativeDay(injection.scheduledDate)}, {formatTime(injection.scheduledDate)}
                      </div>
                      <div className="flex items-center text-slate-400">
                        <MapPin className="w-4 h-4 mr-1" />
                        {injection.site}
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => handleLogNow(injection)}
                        aria-label={`Log ${injection.peptide} injection now`}
                      >
                        Log Now
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSkip(injection.id)}
                        aria-label={`Skip ${injection.peptide} injection`}
                      >
                        Skip
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Injection Site Rotation */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-secondary-400" />
              Site Rotation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {injectionSites.map((site) => {
                const isSuggested = site.label === suggestedSite
                return (
                  <div
                    key={site.id}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      isSuggested
                        ? 'bg-primary-500/10 border border-primary-500/20'
                        : 'bg-slate-700/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-white text-sm">{site.label}</span>
                        {isSuggested && (
                          <Badge className="bg-primary-500/20 text-primary-400 text-xs">
                            Suggested
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-slate-500">{site.lastUsed}</span>
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="text-xs text-slate-500 mt-4">
              Tip: Rotate injection sites to prevent tissue damage and improve absorption.
            </p>
          </CardContent>
        </Card>

        {/* Injection History */}
        <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary-400" />
              Injection History
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrevMonth}
                aria-label="Previous month"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-slate-400 min-w-[120px] text-center">
                {formatMonthYear(currentMonth)}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNextMonth}
                aria-label="Next month"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  aria-expanded={showFilterDropdown}
                  aria-haspopup="listbox"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {filterPeptide || 'Filter'}
                </Button>
                {showFilterDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowFilterDropdown(false)}
                    />
                    <div className="absolute right-0 mt-2 w-40 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-20">
                      <button
                        onClick={() => {
                          setFilterPeptide(null)
                          setShowFilterDropdown(false)
                        }}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-700 rounded-t-lg ${
                          !filterPeptide ? 'text-primary-400 bg-slate-700/50' : 'text-slate-300'
                        }`}
                      >
                        All Peptides
                      </button>
                      {peptideOptions.map((peptide) => (
                        <button
                          key={peptide}
                          onClick={() => {
                            setFilterPeptide(peptide)
                            setShowFilterDropdown(false)
                          }}
                          className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-700 last:rounded-b-lg ${
                            filterPeptide === peptide ? 'text-primary-400 bg-slate-700/50' : 'text-slate-300'
                          }`}
                        >
                          {peptide}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredHistory.length === 0 ? (
              <div className="text-center py-8">
                <Syringe className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400">No injections logged for {formatMonthYear(currentMonth)}</p>
                {filterPeptide && (
                  <button
                    onClick={() => setFilterPeptide(null)}
                    className="text-sm text-primary-400 hover:underline mt-2"
                  >
                    Clear filter
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredHistory.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center space-x-4 p-4 bg-slate-700/50 rounded-lg group"
                  >
                    <div className="w-10 h-10 bg-accent-500/10 rounded-lg flex items-center justify-center">
                      <Syringe className="w-5 h-5 text-accent-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-white font-medium">{log.peptide}</h4>
                        <Badge variant="outline" className="text-xs">{log.dosage}</Badge>
                      </div>
                      <p className="text-sm text-slate-400">
                        {formatDate(log.date)} at {formatTime(log.date)} &bull; {log.site}
                      </p>
                      {log.notes && (
                        <p className="text-xs text-slate-500 mt-1">{log.notes}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={reactionColors[log.reaction]}>
                        {log.reaction === 'none' ? 'No reaction' : log.reaction}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDeleteLog(log.id)}
                        aria-label={`Delete ${log.peptide} log from ${formatDate(log.date)}`}
                      >
                        <Trash2 className="w-4 h-4 text-slate-400 hover:text-accent-400" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Log Injection Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowLogModal(false)}
            aria-hidden="true"
          />
          <Card className="relative w-full max-w-lg mx-4 bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle id="modal-title" className="text-xl flex items-center">
                <Syringe className="w-5 h-5 mr-2 text-accent-400" />
                Log Injection
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLogModal(false)}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="peptide-select" className="block text-sm font-medium text-slate-300 mb-2">
                  Peptide
                </label>
                <select
                  id="peptide-select"
                  value={formData.peptide}
                  onChange={(e) => setFormData(prev => ({ ...prev, peptide: e.target.value }))}
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {peptideOptions.map(peptide => (
                    <option key={peptide} value={peptide}>{peptide}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dosage-input" className="block text-sm font-medium text-slate-300 mb-2">
                    Dosage
                  </label>
                  <input
                    id="dosage-input"
                    type="text"
                    value={formData.dosage}
                    onChange={(e) => setFormData(prev => ({ ...prev, dosage: e.target.value }))}
                    placeholder="250mcg"
                    className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="time-input" className="block text-sm font-medium text-slate-300 mb-2">
                    Time
                  </label>
                  <input
                    id="time-input"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Injection Site
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {injectionSites.map((site) => {
                    const isSelected = formData.site === site.label
                    const isSuggested = site.label === suggestedSite
                    return (
                      <button
                        key={site.id}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, site: site.label }))}
                        className={`p-2 text-xs rounded-lg transition-colors relative ${
                          isSelected
                            ? 'bg-primary-500 text-white'
                            : isSuggested
                            ? 'bg-primary-500/20 text-primary-300 hover:bg-primary-500/30'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                        aria-pressed={isSelected}
                      >
                        {site.label}
                        {isSuggested && !isSelected && (
                          <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary-400 rounded-full" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Reaction
                </label>
                <div className="flex gap-2">
                  {(['none', 'mild', 'moderate', 'severe'] as const).map((reaction) => (
                    <button
                      key={reaction}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, reaction }))}
                      className={`flex-1 p-2 text-sm rounded-lg capitalize transition-colors ${
                        reactionColors[reaction]
                      } ${
                        formData.reaction === reaction
                          ? 'ring-2 ring-white/50'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                      aria-pressed={formData.reaction === reaction}
                    >
                      {reaction}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="notes-input" className="block text-sm font-medium text-slate-300 mb-2">
                  Notes (optional)
                </label>
                <input
                  id="notes-input"
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any observations..."
                  className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowLogModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleSaveInjection}
                  disabled={!formData.site}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Save Injection
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
