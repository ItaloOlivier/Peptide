'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import {
  Plus,
  Scale,
  Zap,
  Moon,
  Heart,
  TrendingDown,
  TrendingUp,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Camera,
} from 'lucide-react'

// Mock data
const todayMetrics = {
  weight: { value: 185.2, unit: 'lbs', change: -0.4, trend: 'down' },
  energy: { value: 7, max: 10 },
  sleep: { value: 7.5, unit: 'hrs' },
  mood: { value: 8, max: 10 },
}

const weeklyData = [
  { day: 'Mon', weight: 186.5, energy: 6, sleep: 6.5, mood: 6 },
  { day: 'Tue', weight: 186.2, energy: 7, sleep: 7, mood: 7 },
  { day: 'Wed', weight: 185.8, energy: 7, sleep: 7.5, mood: 7 },
  { day: 'Thu', weight: 185.6, energy: 8, sleep: 8, mood: 8 },
  { day: 'Fri', weight: 185.4, energy: 7, sleep: 7, mood: 7 },
  { day: 'Sat', weight: 185.2, energy: 7, sleep: 7.5, mood: 8 },
  { day: 'Sun', weight: null, energy: null, sleep: null, mood: null },
]

const goals = {
  targetWeight: 175,
  currentWeight: 185.2,
  startWeight: 195,
  progress: 49, // (195-185.2)/(195-175) * 100
}

const recentLogs = [
  { type: 'weight', value: '185.2 lbs', time: 'Today, 7:00 AM' },
  { type: 'energy', value: '7/10', time: 'Today, 8:00 AM' },
  { type: 'sleep', value: '7.5 hrs', time: 'Today, 7:00 AM' },
  { type: 'mood', value: '8/10', time: 'Today, 8:00 AM' },
  { type: 'weight', value: '185.6 lbs', time: 'Yesterday, 7:00 AM' },
]

const energyLevels = [
  { value: 1, label: 'Exhausted', color: 'bg-red-500' },
  { value: 2, label: 'Very Low', color: 'bg-red-400' },
  { value: 3, label: 'Low', color: 'bg-orange-500' },
  { value: 4, label: 'Below Average', color: 'bg-orange-400' },
  { value: 5, label: 'Average', color: 'bg-yellow-500' },
  { value: 6, label: 'Above Average', color: 'bg-yellow-400' },
  { value: 7, label: 'Good', color: 'bg-emerald-400' },
  { value: 8, label: 'Very Good', color: 'bg-emerald-500' },
  { value: 9, label: 'Excellent', color: 'bg-primary-400' },
  { value: 10, label: 'Peak', color: 'bg-primary-500' },
]

export default function TrackingPage() {
  const [showLogModal, setShowLogModal] = useState(false)
  const [logType, setLogType] = useState<'weight' | 'energy' | 'sleep' | 'mood'>('weight')
  const [selectedEnergy, setSelectedEnergy] = useState(7)

  const openLogModal = (type: 'weight' | 'energy' | 'sleep' | 'mood') => {
    setLogType(type)
    setShowLogModal(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Health Tracking</h1>
          <p className="text-slate-400">Monitor your daily health metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Camera className="w-4 h-4 mr-2" />
            Progress Photo
          </Button>
          <Button onClick={() => openLogModal('weight')}>
            <Plus className="w-4 h-4 mr-2" />
            Log Metrics
          </Button>
        </div>
      </div>

      {/* Today's Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Weight */}
        <Card
          className="bg-slate-800/50 border-slate-700/50 cursor-pointer hover:border-primary-500/50 transition-colors"
          onClick={() => openLogModal('weight')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
                <Scale className="w-5 h-5 text-primary-400" />
              </div>
              <div className="flex items-center text-emerald-400">
                <TrendingDown className="w-4 h-4 mr-1" />
                <span className="text-sm">{todayMetrics.weight.change} lbs</span>
              </div>
            </div>
            <p className="text-sm text-slate-400">Weight</p>
            <p className="text-2xl font-bold text-white">
              {todayMetrics.weight.value} <span className="text-sm text-slate-400">{todayMetrics.weight.unit}</span>
            </p>
          </CardContent>
        </Card>

        {/* Energy */}
        <Card
          className="bg-slate-800/50 border-slate-700/50 cursor-pointer hover:border-secondary-500/50 transition-colors"
          onClick={() => openLogModal('energy')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-secondary-500/10 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-secondary-400" />
              </div>
              <Badge variant="secondary">Good</Badge>
            </div>
            <p className="text-sm text-slate-400">Energy Level</p>
            <p className="text-2xl font-bold text-white">
              {todayMetrics.energy.value}<span className="text-sm text-slate-400">/{todayMetrics.energy.max}</span>
            </p>
            <Progress value={todayMetrics.energy.value} max={10} variant="warning" size="sm" className="mt-2" />
          </CardContent>
        </Card>

        {/* Sleep */}
        <Card
          className="bg-slate-800/50 border-slate-700/50 cursor-pointer hover:border-violet-500/50 transition-colors"
          onClick={() => openLogModal('sleep')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-violet-500/10 rounded-lg flex items-center justify-center">
                <Moon className="w-5 h-5 text-violet-400" />
              </div>
              <Badge className="bg-violet-500/10 text-violet-400">Normal</Badge>
            </div>
            <p className="text-sm text-slate-400">Sleep</p>
            <p className="text-2xl font-bold text-white">
              {todayMetrics.sleep.value} <span className="text-sm text-slate-400">{todayMetrics.sleep.unit}</span>
            </p>
          </CardContent>
        </Card>

        {/* Mood */}
        <Card
          className="bg-slate-800/50 border-slate-700/50 cursor-pointer hover:border-pink-500/50 transition-colors"
          onClick={() => openLogModal('mood')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-pink-500/10 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-pink-400" />
              </div>
              <Badge className="bg-pink-500/10 text-pink-400">Great</Badge>
            </div>
            <p className="text-sm text-slate-400">Mood</p>
            <p className="text-2xl font-bold text-white">
              {todayMetrics.mood.value}<span className="text-sm text-slate-400">/{todayMetrics.mood.max}</span>
            </p>
            <Progress value={todayMetrics.mood.value} max={10} variant="accent" size="sm" className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weight Progress Goal */}
        <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Weight Progress</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-slate-400">This Week</span>
              <Button variant="ghost" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Goal Progress */}
            <div className="mb-6 p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400">Goal: {goals.targetWeight} lbs</span>
                <span className="text-white font-medium">{goals.progress}% complete</span>
              </div>
              <div className="relative h-3 bg-slate-600 rounded-full overflow-hidden">
                <div
                  className="absolute h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all"
                  style={{ width: `${goals.progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-slate-500">
                <span>Start: {goals.startWeight} lbs</span>
                <span>Current: {goals.currentWeight} lbs</span>
                <span>Target: {goals.targetWeight} lbs</span>
              </div>
            </div>

            {/* Weekly Chart */}
            <div className="h-48 flex items-end justify-between gap-2">
              {weeklyData.map((day, index) => (
                <div key={day.day} className="flex-1 flex flex-col items-center">
                  <div
                    className={`w-full rounded-t transition-all ${
                      day.weight
                        ? 'bg-gradient-to-t from-primary-600 to-primary-400'
                        : 'bg-slate-700 border-2 border-dashed border-slate-600'
                    }`}
                    style={{
                      height: day.weight
                        ? `${((day.weight - 180) / 20) * 100}%`
                        : '30%',
                    }}
                  />
                  <span className="text-xs text-slate-400 mt-2">{day.day}</span>
                  {day.weight && (
                    <span className="text-xs text-white">{day.weight}</span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Logs */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Recent Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentLogs.map((log, index) => {
                const iconMap = {
                  weight: <Scale className="w-4 h-4 text-primary-400" />,
                  energy: <Zap className="w-4 h-4 text-secondary-400" />,
                  sleep: <Moon className="w-4 h-4 text-violet-400" />,
                  mood: <Heart className="w-4 h-4 text-pink-400" />,
                }
                const colorMap = {
                  weight: 'bg-primary-500/10',
                  energy: 'bg-secondary-500/10',
                  sleep: 'bg-violet-500/10',
                  mood: 'bg-pink-500/10',
                }
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorMap[log.type as keyof typeof colorMap]}`}>
                      {iconMap[log.type as keyof typeof iconMap]}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white capitalize">{log.type}: {log.value}</p>
                      <p className="text-xs text-slate-500">{log.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Log Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowLogModal(false)}
          />
          <Card className="relative w-full max-w-md mx-4 bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-xl capitalize">Log {logType}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {logType === 'weight' && (
                <div className="space-y-4">
                  <Input label="Weight" placeholder="185.2" type="number" step="0.1" />
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">lbs</Button>
                    <Button variant="ghost" size="sm" className="flex-1">kg</Button>
                  </div>
                </div>
              )}

              {logType === 'energy' && (
                <div className="space-y-4">
                  <p className="text-sm text-slate-400">How&apos;s your energy today?</p>
                  <div className="grid grid-cols-5 gap-2">
                    {energyLevels.map((level) => (
                      <button
                        key={level.value}
                        onClick={() => setSelectedEnergy(level.value)}
                        className={`h-12 rounded-lg transition-all ${
                          selectedEnergy === level.value
                            ? `${level.color} ring-2 ring-white`
                            : 'bg-slate-700 hover:bg-slate-600'
                        }`}
                      >
                        <span className="text-white font-medium">{level.value}</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-center text-sm text-slate-300">
                    {energyLevels.find((l) => l.value === selectedEnergy)?.label}
                  </p>
                </div>
              )}

              {logType === 'sleep' && (
                <div className="space-y-4">
                  <Input label="Hours of Sleep" placeholder="7.5" type="number" step="0.5" />
                  <Input label="Sleep Quality (1-10)" placeholder="8" type="number" min="1" max="10" />
                </div>
              )}

              {logType === 'mood' && (
                <div className="space-y-4">
                  <p className="text-sm text-slate-400">How are you feeling?</p>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                      <button
                        key={value}
                        className="h-12 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-medium"
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <Input label="Notes (optional)" placeholder="Any observations..." />

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowLogModal(false)}
                >
                  Cancel
                </Button>
                <Button className="flex-1" onClick={() => setShowLogModal(false)}>
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
