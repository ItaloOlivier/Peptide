'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  ArrowLeft,
  Edit,
  Pause,
  Play,
  Trash2,
  Syringe,
  Calendar,
  Clock,
  Target,
  ChevronRight,
  AlertCircle,
  TrendingUp,
  CheckCircle,
} from 'lucide-react'

// Helper functions for date calculations
function calculateDaysRemaining(endDateStr: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const endDate = new Date(endDateStr)
  endDate.setHours(0, 0, 0, 0)
  const diffTime = endDate.getTime() - today.getTime()
  return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)))
}

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

// Dynamic date helpers
const today = new Date()
const getDateString = (daysFromToday: number) => {
  const date = new Date(today)
  date.setDate(date.getDate() + daysFromToday)
  return date.toISOString().split('T')[0]
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// Mock data for protocols with dynamic dates
const protocolsData: Record<string, {
  id: string
  name: string
  status: 'active' | 'paused' | 'completed'
  goal: string
  description: string
  startDate: string
  endDate: string
  peptides: {
    name: string
    dosage: string
    frequency: string
    nextDose: string
    site: string
    notes: string
  }[]
  schedule: { day: string; injections: string[] }[]
  recentInjections: { peptide: string; dosage: string; date: string; site: string }[]
}> = {
  '1': {
    id: '1',
    name: 'Weight Loss Stack',
    status: 'active',
    goal: 'Weight Loss',
    description: 'A comprehensive weight loss protocol combining GLP-1 receptor agonist with healing peptide for optimal results.',
    startDate: getDateString(-30),
    endDate: getDateString(42),
    peptides: [
      {
        name: 'Semaglutide',
        dosage: '0.5mg',
        frequency: 'Weekly',
        nextDose: 'Tomorrow, 9:00 AM',
        site: 'Abdomen',
        notes: 'Increase to 1mg after week 4',
      },
      {
        name: 'BPC-157',
        dosage: '250mcg',
        frequency: 'Daily',
        nextDose: 'Today, 8:00 PM',
        site: 'Subcutaneous',
        notes: 'Take on empty stomach',
      },
    ],
    schedule: [
      { day: 'Monday', injections: ['BPC-157 250mcg'] },
      { day: 'Tuesday', injections: ['BPC-157 250mcg', 'Semaglutide 0.5mg'] },
      { day: 'Wednesday', injections: ['BPC-157 250mcg'] },
      { day: 'Thursday', injections: ['BPC-157 250mcg'] },
      { day: 'Friday', injections: ['BPC-157 250mcg'] },
      { day: 'Saturday', injections: ['BPC-157 250mcg'] },
      { day: 'Sunday', injections: ['BPC-157 250mcg'] },
    ],
    recentInjections: [
      { peptide: 'BPC-157', dosage: '250mcg', date: 'Today, 8:00 AM', site: 'Abdomen - Right' },
      { peptide: 'Semaglutide', dosage: '0.5mg', date: 'Yesterday, 9:00 AM', site: 'Abdomen - Left' },
      { peptide: 'BPC-157', dosage: '250mcg', date: 'Yesterday, 8:00 PM', site: 'Thigh - Right' },
    ],
  },
  '2': {
    id: '2',
    name: 'Recovery Protocol',
    status: 'paused',
    goal: 'Recovery',
    description: 'A healing protocol designed for injury recovery and tissue repair using synergistic peptides.',
    startDate: getDateString(-45),
    endDate: getDateString(23),
    peptides: [
      {
        name: 'TB-500',
        dosage: '2.5mg',
        frequency: '2x Weekly',
        nextDose: 'When resumed',
        site: 'Subcutaneous',
        notes: 'Paused due to travel',
      },
      {
        name: 'BPC-157',
        dosage: '500mcg',
        frequency: 'Daily',
        nextDose: 'When resumed',
        site: 'Near injury site',
        notes: 'Inject close to affected area',
      },
    ],
    schedule: [
      { day: 'Monday', injections: ['BPC-157 500mcg', 'TB-500 2.5mg'] },
      { day: 'Tuesday', injections: ['BPC-157 500mcg'] },
      { day: 'Wednesday', injections: ['BPC-157 500mcg'] },
      { day: 'Thursday', injections: ['BPC-157 500mcg', 'TB-500 2.5mg'] },
      { day: 'Friday', injections: ['BPC-157 500mcg'] },
      { day: 'Saturday', injections: ['BPC-157 500mcg'] },
      { day: 'Sunday', injections: ['BPC-157 500mcg'] },
    ],
    recentInjections: [
      { peptide: 'BPC-157', dosage: '500mcg', date: '2 weeks ago', site: 'Knee - Left' },
      { peptide: 'TB-500', dosage: '2.5mg', date: '2 weeks ago', site: 'Abdomen' },
    ],
  },
  '3': {
    id: '3',
    name: 'Anti-Aging Routine',
    status: 'completed',
    goal: 'Anti-Aging',
    description: 'A comprehensive anti-aging protocol targeting skin health and cellular rejuvenation.',
    startDate: getDateString(-90),
    endDate: getDateString(-10),
    peptides: [
      {
        name: 'GHK-Cu',
        dosage: '1mg',
        frequency: 'Daily',
        nextDose: 'Protocol completed',
        site: 'Subcutaneous',
        notes: 'Copper peptide for collagen synthesis',
      },
      {
        name: 'Epithalon',
        dosage: '5mg',
        frequency: '10 days on/20 off',
        nextDose: 'Protocol completed',
        site: 'Subcutaneous',
        notes: 'Telomere support peptide',
      },
    ],
    schedule: [],
    recentInjections: [],
  },
}

const statusColors = {
  active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  paused: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  completed: 'bg-primary-500/10 text-primary-400 border-primary-500/20',
}

const goalColors: Record<string, string> = {
  'Weight Loss': 'text-accent-400',
  'Recovery': 'text-primary-400',
  'Anti-Aging': 'text-secondary-400',
}

export default function ProtocolDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const router = useRouter()
  const protocolData = protocolsData[resolvedParams.id]

  const [protocol, setProtocol] = useState(protocolData)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // Handle protocol not found
  if (!protocol) {
    return (
      <div className="space-y-6">
        <Link href="/dashboard/protocols">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Protocols
          </Button>
        </Link>
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Protocol Not Found</h3>
            <p className="text-slate-400 mb-4">The protocol you&apos;re looking for doesn&apos;t exist or has been deleted.</p>
            <Link href="/dashboard/protocols">
              <Button>View All Protocols</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const progress = protocol.status === 'completed' ? 100 : calculateProgress(protocol.startDate, protocol.endDate)
  const daysRemaining = calculateDaysRemaining(protocol.endDate)
  const daysElapsed = Math.abs(Math.round((new Date().getTime() - new Date(protocol.startDate).getTime()) / (1000 * 60 * 60 * 24)))

  const toggleStatus = () => {
    if (protocol.status === 'active') {
      setProtocol({ ...protocol, status: 'paused' })
    } else if (protocol.status === 'paused') {
      setProtocol({ ...protocol, status: 'active' })
    }
  }

  const handleDelete = () => {
    // In production, call API
    router.push('/dashboard/protocols')
  }

  const getProgressVariant = (): 'default' | 'success' | 'warning' => {
    if (protocol.status === 'completed') return 'success'
    if (protocol.status === 'paused') return 'warning'
    return 'default'
  }

  const getTodayIndex = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[new Date().getDay()]
  }

  return (
    <div className="space-y-6">
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <Card className="bg-slate-800 border-slate-700 max-w-md mx-4">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Delete Protocol?</h3>
              <p className="text-slate-400 mb-4">
                Are you sure you want to delete &quot;{protocol.name}&quot;? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </Button>
                <Button
                  className="bg-accent-500 hover:bg-accent-600 text-white"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/protocols">
            <Button variant="ghost" size="sm" aria-label="Back to protocols">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-white">{protocol.name}</h1>
              <Badge className={statusColors[protocol.status]}>{protocol.status}</Badge>
            </div>
            <p className={goalColors[protocol.goal] || 'text-slate-400'}>{protocol.goal}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {protocol.status !== 'completed' && (
            <>
              <Button variant="outline" onClick={toggleStatus} aria-label={protocol.status === 'active' ? 'Pause protocol' : 'Resume protocol'}>
                {protocol.status === 'active' ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Resume
                  </>
                )}
              </Button>
              <Button variant="outline" aria-label="Edit protocol">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </>
          )}
          <Button
            variant="outline"
            className="text-accent-400 hover:text-accent-300 hover:border-accent-400"
            onClick={() => setShowDeleteModal(true)}
            aria-label="Delete protocol"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Description */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardContent className="p-4">
          <p className="text-slate-300">{protocol.description}</p>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4 text-primary-400" />
                <p className="text-sm text-slate-400">Progress</p>
              </div>
              <p className="text-2xl font-bold text-white">{progress}%</p>
              <Progress value={progress} variant={getProgressVariant()} className="mt-2" size="sm" />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-secondary-400" />
                <p className="text-sm text-slate-400">
                  {protocol.status === 'completed' ? 'Status' : 'Days Remaining'}
                </p>
              </div>
              <p className="text-2xl font-bold text-white">
                {protocol.status === 'completed' ? 'Complete' : daysRemaining}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {protocol.status === 'completed' ? 'Protocol finished' : `Ends ${formatDate(protocol.endDate)}`}
              </p>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Calendar className="w-4 h-4 text-accent-400" />
                <p className="text-sm text-slate-400">Started</p>
              </div>
              <p className="text-2xl font-bold text-white">{formatDate(protocol.startDate)}</p>
              <p className="text-xs text-slate-500 mt-1">{daysElapsed} days ago</p>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Syringe className="w-4 h-4 text-emerald-400" />
                <p className="text-sm text-slate-400">Peptides</p>
              </div>
              <p className="text-2xl font-bold text-white">{protocol.peptides.length}</p>
              <div className="flex gap-1 mt-1 flex-wrap">
                {protocol.peptides.map((p) => (
                  <Badge key={p.name} variant="outline" className="text-xs">
                    {p.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Peptide Details */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-white">Peptides in Protocol</h2>
          {protocol.peptides.map((peptide) => (
            <Card key={peptide.name} className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-accent-500/10 rounded-lg flex items-center justify-center">
                      <Syringe className="w-6 h-6 text-accent-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{peptide.name}</h3>
                      <p className="text-sm text-slate-400">
                        {peptide.dosage} &bull; {peptide.frequency}
                      </p>
                    </div>
                  </div>
                  {protocol.status === 'active' && (
                    <Link href="/dashboard/injections">
                      <Button size="sm">Log Injection</Button>
                    </Link>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center text-slate-400 text-sm mb-1">
                      <Clock className="w-4 h-4 mr-1" />
                      Next Dose
                    </div>
                    <p className="text-white font-medium">{peptide.nextDose}</p>
                  </div>
                  <div className="p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center text-slate-400 text-sm mb-1">
                      <Target className="w-4 h-4 mr-1" />
                      Injection Site
                    </div>
                    <p className="text-white font-medium">{peptide.site}</p>
                  </div>
                </div>

                {peptide.notes && (
                  <div className="flex items-start space-x-2 p-3 bg-secondary-500/10 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-secondary-400 mt-0.5" />
                    <p className="text-sm text-secondary-300">{peptide.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Weekly Schedule */}
          {protocol.schedule.length > 0 && (
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Weekly Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {protocol.schedule.map((day) => {
                    const isToday = day.day === getTodayIndex()
                    return (
                      <div
                        key={day.day}
                        className={`p-3 rounded-lg ${
                          isToday ? 'bg-primary-500/10 border border-primary-500/20' : 'bg-slate-700/50'
                        }`}
                      >
                        <p className={`text-sm font-medium ${isToday ? 'text-primary-400' : 'text-white'}`}>
                          {day.day}
                          {isToday && <span className="text-xs ml-2">(Today)</span>}
                        </p>
                        <div className="mt-1 space-y-1">
                          {day.injections.map((inj, i) => (
                            <p key={i} className="text-xs text-slate-400">{inj}</p>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Injections */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Recent Injections</CardTitle>
              <Link href="/dashboard/injections">
                <Button variant="ghost" size="sm">
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {protocol.recentInjections.length === 0 ? (
                <div className="text-center py-6">
                  <Syringe className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-sm text-slate-400">No injections logged</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {protocol.recentInjections.map((inj, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 pb-3 border-b border-slate-700/50 last:border-0 last:pb-0"
                    >
                      <div className="w-8 h-8 bg-emerald-500/10 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white">
                          {inj.peptide} - {inj.dosage}
                        </p>
                        <p className="text-xs text-slate-500">{inj.date} &bull; {inj.site}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
