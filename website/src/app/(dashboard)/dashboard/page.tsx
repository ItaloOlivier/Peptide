'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Syringe,
  TrendingDown,
  Zap,
  Clock,
  Calendar,
  Plus,
  ChevronRight,
  Target,
} from 'lucide-react'
import {
  LogInjectionModal,
  LogWeightModal,
  LogEnergyModal,
} from '@/components/dashboard/modals'

// Mock data - in production, fetch from database
const mockData = {
  activeProtocol: {
    name: 'Weight Loss Stack',
    peptides: ['Semaglutide', 'BPC-157'],
    progress: 35,
    daysRemaining: 42,
  },
  nextInjection: {
    peptide: 'Semaglutide',
    dosage: '0.5mg',
    timeUntil: '2h 30m',
    site: 'Abdomen - Left',
  },
  weeklyStats: {
    weight: { value: -2.3, unit: 'lbs' },
    energy: { value: 7.5, max: 10 },
    injections: { completed: 5, total: 6 },
  },
  recentLogs: [
    { type: 'injection', peptide: 'BPC-157', dosage: '250mcg', time: '2 hours ago' },
    { type: 'weight', value: '185.2 lbs', time: '6 hours ago' },
    { type: 'injection', peptide: 'Semaglutide', dosage: '0.5mg', time: 'Yesterday' },
  ],
}

export default function DashboardPage() {
  const router = useRouter()
  const [isInjectionModalOpen, setIsInjectionModalOpen] = useState(false)
  const [isWeightModalOpen, setIsWeightModalOpen] = useState(false)
  const [isEnergyModalOpen, setIsEnergyModalOpen] = useState(false)
  const [prefilledPeptide, setPrefilledPeptide] = useState<string | undefined>()

  const handleLogInjection = (peptide?: string) => {
    setPrefilledPeptide(peptide)
    setIsInjectionModalOpen(true)
  }

  return (
    <>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <p className="text-slate-400">Here&apos;s your health dashboard overview</p>
          </div>
          <Button onClick={() => handleLogInjection()}>
            <Plus className="w-4 h-4 mr-2" />
            Log Injection
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Next Injection */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-accent-500/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-accent-400" />
                </div>
                <Badge variant="accent">Upcoming</Badge>
              </div>
              <p className="text-sm text-slate-400 mb-1">Next Injection</p>
              <p className="text-2xl font-bold text-white">{mockData.nextInjection.timeUntil}</p>
              <p className="text-sm text-slate-400 mt-1">
                {mockData.nextInjection.peptide} • {mockData.nextInjection.dosage}
              </p>
            </CardContent>
          </Card>

          {/* Weekly Weight Change */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-emerald-400" />
                </div>
                <Badge variant="success">This Week</Badge>
              </div>
              <p className="text-sm text-slate-400 mb-1">Weight Change</p>
              <p className="text-2xl font-bold text-emerald-400">
                {mockData.weeklyStats.weight.value} {mockData.weeklyStats.weight.unit}
              </p>
              <p className="text-sm text-slate-400 mt-1">On track for your goal</p>
            </CardContent>
          </Card>

          {/* Energy Level */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-secondary-500/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-secondary-400" />
                </div>
                <Badge variant="secondary">Average</Badge>
              </div>
              <p className="text-sm text-slate-400 mb-1">Energy Level</p>
              <p className="text-2xl font-bold text-white">
                {mockData.weeklyStats.energy.value}/{mockData.weeklyStats.energy.max}
              </p>
              <Progress
                value={mockData.weeklyStats.energy.value}
                max={mockData.weeklyStats.energy.max}
                variant="warning"
                size="sm"
                className="mt-2"
              />
            </CardContent>
          </Card>

          {/* Injections Completed */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
                  <Syringe className="w-5 h-5 text-primary-400" />
                </div>
                <Badge>This Week</Badge>
              </div>
              <p className="text-sm text-slate-400 mb-1">Injections</p>
              <p className="text-2xl font-bold text-white">
                {mockData.weeklyStats.injections.completed}/{mockData.weeklyStats.injections.total}
              </p>
              <Progress
                value={mockData.weeklyStats.injections.completed}
                max={mockData.weeklyStats.injections.total}
                size="sm"
                className="mt-2"
              />
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Protocol */}
          <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Active Protocol</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/dashboard/protocols')}
              >
                View Details
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{mockData.activeProtocol.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    {mockData.activeProtocol.peptides.map((peptide) => (
                      <Badge key={peptide} variant="outline">
                        {peptide}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-slate-400">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="text-sm">{mockData.activeProtocol.daysRemaining} days left</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-400">Protocol Progress</span>
                  <span className="text-sm font-medium text-white">{mockData.activeProtocol.progress}%</span>
                </div>
                <Progress value={mockData.activeProtocol.progress} size="md" />
              </div>

              {/* Next Injection Details */}
              <div className="mt-6 p-4 bg-slate-700/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent-500/20 rounded-full flex items-center justify-center">
                      <Syringe className="w-5 h-5 text-accent-400" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Next: {mockData.nextInjection.peptide}</p>
                      <p className="text-white font-medium">
                        {mockData.nextInjection.dosage} • {mockData.nextInjection.site}
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleLogInjection(mockData.nextInjection.peptide)}
                  >
                    Log Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/dashboard/activity')}
              >
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.recentLogs.map((log, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 pb-4 border-b border-slate-700/50 last:border-0 last:pb-0"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        log.type === 'injection'
                          ? 'bg-accent-500/10'
                          : 'bg-primary-500/10'
                      }`}
                    >
                      {log.type === 'injection' ? (
                        <Syringe className="w-4 h-4 text-accent-400" />
                      ) : (
                        <Target className="w-4 h-4 text-primary-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">
                        {log.type === 'injection'
                          ? `${log.peptide} - ${log.dosage}`
                          : `Weight: ${log.value}`}
                      </p>
                      <p className="text-xs text-slate-500">{log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-auto py-4 flex-col"
                onClick={() => handleLogInjection()}
              >
                <Syringe className="w-5 h-5 mb-2" />
                Log Injection
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex-col"
                onClick={() => setIsWeightModalOpen(true)}
              >
                <Target className="w-5 h-5 mb-2" />
                Log Weight
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex-col"
                onClick={() => setIsEnergyModalOpen(true)}
              >
                <Zap className="w-5 h-5 mb-2" />
                Log Energy
              </Button>
              <Button
                variant="outline"
                className="h-auto py-4 flex-col"
                onClick={() => router.push('/dashboard/injections')}
              >
                <Calendar className="w-5 h-5 mb-2" />
                View Calendar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <LogInjectionModal
        open={isInjectionModalOpen}
        onOpenChange={setIsInjectionModalOpen}
        defaultPeptide={prefilledPeptide}
      />
      <LogWeightModal
        open={isWeightModalOpen}
        onOpenChange={setIsWeightModalOpen}
      />
      <LogEnergyModal
        open={isEnergyModalOpen}
        onOpenChange={setIsEnergyModalOpen}
      />
    </>
  )
}
