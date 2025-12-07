'use client'

import { useState } from 'react'
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
  AlertTriangle,
} from 'lucide-react'

// Mock data
const upcomingInjections = [
  {
    id: '1',
    peptide: 'BPC-157',
    dosage: '250mcg',
    time: 'Today, 8:00 PM',
    site: 'Abdomen - Left',
    protocol: 'Weight Loss Stack',
    status: 'upcoming',
  },
  {
    id: '2',
    peptide: 'Semaglutide',
    dosage: '0.5mg',
    time: 'Tomorrow, 9:00 AM',
    site: 'Abdomen - Right',
    protocol: 'Weight Loss Stack',
    status: 'scheduled',
  },
]

const injectionHistory = [
  {
    id: '1',
    peptide: 'BPC-157',
    dosage: '250mcg',
    date: 'Dec 7, 2024',
    time: '8:00 AM',
    site: 'Abdomen - Right',
    reaction: 'none',
    notes: '',
  },
  {
    id: '2',
    peptide: 'Semaglutide',
    dosage: '0.5mg',
    date: 'Dec 3, 2024',
    time: '9:00 AM',
    site: 'Abdomen - Left',
    reaction: 'mild',
    notes: 'Slight redness at injection site',
  },
  {
    id: '3',
    peptide: 'BPC-157',
    dosage: '250mcg',
    date: 'Dec 6, 2024',
    time: '8:00 PM',
    site: 'Thigh - Right',
    reaction: 'none',
    notes: '',
  },
  {
    id: '4',
    peptide: 'BPC-157',
    dosage: '250mcg',
    date: 'Dec 6, 2024',
    time: '8:00 AM',
    site: 'Thigh - Left',
    reaction: 'none',
    notes: '',
  },
]

const injectionSites = [
  { id: 'abdomen-left', label: 'Abdomen - Left', lastUsed: '2 days ago' },
  { id: 'abdomen-right', label: 'Abdomen - Right', lastUsed: 'Today' },
  { id: 'thigh-left', label: 'Thigh - Left', lastUsed: 'Yesterday' },
  { id: 'thigh-right', label: 'Thigh - Right', lastUsed: '3 days ago' },
  { id: 'arm-left', label: 'Arm - Left', lastUsed: '5 days ago' },
  { id: 'arm-right', label: 'Arm - Right', lastUsed: 'Never' },
]

const reactionColors = {
  none: 'bg-emerald-500/10 text-emerald-400',
  mild: 'bg-amber-500/10 text-amber-400',
  moderate: 'bg-orange-500/10 text-orange-400',
  severe: 'bg-red-500/10 text-red-400',
}

export default function InjectionsPage() {
  const [showLogModal, setShowLogModal] = useState(false)
  const [selectedSite, setSelectedSite] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Injection Tracker</h1>
          <p className="text-slate-400">Log and monitor your injection history</p>
        </div>
        <Button onClick={() => setShowLogModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Log Injection
        </Button>
      </div>

      {/* Upcoming Injections */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Clock className="w-5 h-5 mr-2 text-primary-400" />
            Upcoming Injections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingInjections.map((injection) => (
              <div
                key={injection.id}
                className={`p-4 rounded-lg border ${
                  injection.status === 'upcoming'
                    ? 'bg-accent-500/10 border-accent-500/20'
                    : 'bg-slate-700/50 border-slate-600/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      injection.status === 'upcoming' ? 'bg-accent-500/20' : 'bg-slate-600/50'
                    }`}>
                      <Syringe className={`w-5 h-5 ${
                        injection.status === 'upcoming' ? 'text-accent-400' : 'text-slate-400'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{injection.peptide}</h3>
                      <p className="text-sm text-slate-400">{injection.dosage}</p>
                    </div>
                  </div>
                  {injection.status === 'upcoming' && (
                    <Badge variant="accent">Due Soon</Badge>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center text-slate-400">
                    <Clock className="w-4 h-4 mr-1" />
                    {injection.time}
                  </div>
                  <div className="flex items-center text-slate-400">
                    <MapPin className="w-4 h-4 mr-1" />
                    {injection.site}
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" className="flex-1">Log Now</Button>
                  <Button size="sm" variant="outline">Skip</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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
              {injectionSites.map((site) => (
                <button
                  key={site.id}
                  onClick={() => setSelectedSite(site.id)}
                  className={`w-full p-3 rounded-lg text-left transition-colors ${
                    selectedSite === site.id
                      ? 'bg-primary-500/10 border border-primary-500/20'
                      : 'bg-slate-700/50 hover:bg-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">{site.label}</span>
                    <span className="text-xs text-slate-500">{site.lastUsed}</span>
                  </div>
                </button>
              ))}
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
              <Button variant="ghost" size="sm">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-slate-400">December 2024</span>
              <Button variant="ghost" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {injectionHistory.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center space-x-4 p-4 bg-slate-700/50 rounded-lg"
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
                      {log.date} at {log.time} • {log.site}
                    </p>
                    {log.notes && (
                      <p className="text-xs text-slate-500 mt-1">{log.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={reactionColors[log.reaction as keyof typeof reactionColors]}>
                      {log.reaction === 'none' ? 'No reaction' : log.reaction}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Log Injection Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowLogModal(false)}
          />
          <Card className="relative w-full max-w-lg mx-4 bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Syringe className="w-5 h-5 mr-2 text-accent-400" />
                Log Injection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Peptide
                </label>
                <select className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option>BPC-157</option>
                  <option>Semaglutide</option>
                  <option>TB-500</option>
                  <option>GHK-Cu</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input label="Dosage" placeholder="250mcg" />
                <Input label="Time" type="time" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Injection Site
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {injectionSites.slice(0, 6).map((site) => (
                    <button
                      key={site.id}
                      onClick={() => setSelectedSite(site.id)}
                      className={`p-2 text-xs rounded-lg transition-colors ${
                        selectedSite === site.id
                          ? 'bg-primary-500 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {site.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Reaction
                </label>
                <div className="flex gap-2">
                  {['none', 'mild', 'moderate', 'severe'].map((reaction) => (
                    <button
                      key={reaction}
                      className={`flex-1 p-2 text-sm rounded-lg capitalize ${
                        reactionColors[reaction as keyof typeof reactionColors]
                      } border border-transparent hover:border-slate-500`}
                    >
                      {reaction}
                    </button>
                  ))}
                </div>
              </div>

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
