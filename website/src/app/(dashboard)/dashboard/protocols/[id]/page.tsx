import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  ArrowLeft,
  Edit,
  Pause,
  Syringe,
  Calendar,
  Clock,
  Target,
  ChevronRight,
  AlertCircle,
} from 'lucide-react'

// Mock data for a single protocol
const protocol = {
  id: '1',
  name: 'Weight Loss Stack',
  status: 'active',
  goal: 'Weight Loss',
  description: 'A comprehensive weight loss protocol combining GLP-1 receptor agonist with healing peptide for optimal results.',
  startDate: '2024-11-01',
  endDate: '2025-01-15',
  progress: 35,
  daysRemaining: 42,
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
    { peptide: 'Semaglutide', dosage: '0.5mg', date: 'Dec 3, 9:00 AM', site: 'Abdomen - Left' },
    { peptide: 'BPC-157', dosage: '250mcg', date: 'Dec 3, 8:00 PM', site: 'Thigh - Right' },
  ],
}

export default function ProtocolDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/protocols">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-white">{protocol.name}</h1>
              <Badge className="bg-emerald-500/10 text-emerald-400">{protocol.status}</Badge>
            </div>
            <p className="text-slate-400">{protocol.goal}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Pause className="w-4 h-4 mr-2" />
            Pause
          </Button>
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-slate-400 mb-1">Progress</p>
              <p className="text-2xl font-bold text-white">{protocol.progress}%</p>
              <Progress value={protocol.progress} className="mt-2" />
            </div>
            <div>
              <p className="text-sm text-slate-400 mb-1">Days Remaining</p>
              <p className="text-2xl font-bold text-white">{protocol.daysRemaining}</p>
              <p className="text-xs text-slate-500 mt-1">Ends {protocol.endDate}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400 mb-1">Started</p>
              <p className="text-2xl font-bold text-white">{protocol.startDate}</p>
              <p className="text-xs text-slate-500 mt-1">35 days ago</p>
            </div>
            <div>
              <p className="text-sm text-slate-400 mb-1">Peptides</p>
              <p className="text-2xl font-bold text-white">{protocol.peptides.length}</p>
              <div className="flex gap-1 mt-1">
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
                        {peptide.dosage} • {peptide.frequency}
                      </p>
                    </div>
                  </div>
                  <Button size="sm">Log Injection</Button>
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
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Weekly Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {protocol.schedule.map((day, index) => (
                  <div
                    key={day.day}
                    className={`p-3 rounded-lg ${
                      index === 1 ? 'bg-primary-500/10 border border-primary-500/20' : 'bg-slate-700/50'
                    }`}
                  >
                    <p className={`text-sm font-medium ${index === 1 ? 'text-primary-400' : 'text-white'}`}>
                      {day.day}
                      {index === 1 && <span className="text-xs ml-2">(Today)</span>}
                    </p>
                    <div className="mt-1 space-y-1">
                      {day.injections.map((inj, i) => (
                        <p key={i} className="text-xs text-slate-400">{inj}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Injections */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Recent Injections</CardTitle>
              <Button variant="ghost" size="sm">
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {protocol.recentInjections.map((inj, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 pb-3 border-b border-slate-700/50 last:border-0 last:pb-0"
                  >
                    <div className="w-8 h-8 bg-accent-500/10 rounded-full flex items-center justify-center">
                      <Syringe className="w-4 h-4 text-accent-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white">
                        {inj.peptide} - {inj.dosage}
                      </p>
                      <p className="text-xs text-slate-500">{inj.date} • {inj.site}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
