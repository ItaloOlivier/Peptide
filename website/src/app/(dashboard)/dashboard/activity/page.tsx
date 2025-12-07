'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
  Syringe,
  Target,
  Zap,
  Calendar,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

// Mock data - in production, fetch from database
const mockActivities = [
  {
    id: '1',
    type: 'injection',
    peptide: 'Semaglutide',
    dosage: '0.5mg',
    site: 'Abdomen - Left',
    date: '2024-01-15',
    time: '09:30',
    notes: 'Feeling good, no side effects',
  },
  {
    id: '2',
    type: 'weight',
    value: 185.2,
    unit: 'lbs',
    change: -0.8,
    date: '2024-01-15',
    time: '08:00',
    notes: 'Morning weight after fasting',
  },
  {
    id: '3',
    type: 'energy',
    level: 8,
    date: '2024-01-15',
    time: '14:00',
    notes: 'High energy throughout the day',
  },
  {
    id: '4',
    type: 'injection',
    peptide: 'BPC-157',
    dosage: '250mcg',
    site: 'Thigh - Right',
    date: '2024-01-14',
    time: '20:00',
    notes: '',
  },
  {
    id: '5',
    type: 'weight',
    value: 186.0,
    unit: 'lbs',
    change: -0.5,
    date: '2024-01-14',
    time: '08:00',
    notes: '',
  },
  {
    id: '6',
    type: 'energy',
    level: 7,
    date: '2024-01-14',
    time: '12:00',
    notes: 'Slightly tired after lunch',
  },
  {
    id: '7',
    type: 'injection',
    peptide: 'Semaglutide',
    dosage: '0.5mg',
    site: 'Abdomen - Right',
    date: '2024-01-13',
    time: '09:30',
    notes: 'Rotated to right side',
  },
  {
    id: '8',
    type: 'weight',
    value: 186.5,
    unit: 'lbs',
    change: -1.2,
    date: '2024-01-13',
    time: '08:00',
    notes: 'Great progress this week',
  },
]

export default function ActivityPage() {
  const [filterType, setFilterType] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredActivities =
    filterType === 'all'
      ? mockActivities
      : mockActivities.filter((activity) => activity.type === filterType)

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const displayedActivities = filteredActivities.slice(startIndex, startIndex + itemsPerPage)

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'injection':
        return <Syringe className="w-5 h-5 text-accent-400" />
      case 'weight':
        return <Target className="w-5 h-5 text-primary-400" />
      case 'energy':
        return <Zap className="w-5 h-5 text-secondary-400" />
      default:
        return <Calendar className="w-5 h-5 text-slate-400" />
    }
  }

  const getActivityBgColor = (type: string) => {
    switch (type) {
      case 'injection':
        return 'bg-accent-500/10'
      case 'weight':
        return 'bg-primary-500/10'
      case 'energy':
        return 'bg-secondary-500/10'
      default:
        return 'bg-slate-700/50'
    }
  }

  const getActivityTitle = (activity: any) => {
    switch (activity.type) {
      case 'injection':
        return `${activity.peptide} Injection`
      case 'weight':
        return 'Weight Measurement'
      case 'energy':
        return 'Energy Level'
      default:
        return 'Activity'
    }
  }

  const getActivityDetails = (activity: any) => {
    switch (activity.type) {
      case 'injection':
        return `${activity.dosage} • ${activity.site}`
      case 'weight':
        return `${activity.value} ${activity.unit} ${
          activity.change ? `(${activity.change > 0 ? '+' : ''}${activity.change} ${activity.unit})` : ''
        }`
      case 'energy':
        return `Level ${activity.level}/10`
      default:
        return ''
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }
  }

  const handleExport = () => {
    // TODO: Implement export functionality
    alert('Export functionality will be implemented soon!')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Activity History</h1>
          <p className="text-slate-400">Track all your health and treatment logs</p>
        </div>
        <Button onClick={handleExport} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Logs</p>
                <p className="text-2xl font-bold text-white mt-1">{mockActivities.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-slate-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Injections</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {mockActivities.filter((a) => a.type === 'injection').length}
                </p>
              </div>
              <Syringe className="w-8 h-8 text-accent-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Weight Logs</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {mockActivities.filter((a) => a.type === 'weight').length}
                </p>
              </div>
              <Target className="w-8 h-8 text-primary-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Energy Logs</p>
                <p className="text-2xl font-bold text-white mt-1">
                  {mockActivities.filter((a) => a.type === 'energy').length}
                </p>
              </div>
              <Zap className="w-8 h-8 text-secondary-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-slate-400" />
            <Select
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value)
                setCurrentPage(1)
              }}
              className="w-48"
            >
              <option value="all">All Activities</option>
              <option value="injection">Injections Only</option>
              <option value="weight">Weight Only</option>
              <option value="energy">Energy Only</option>
            </Select>
            <div className="flex-1" />
            <span className="text-sm text-slate-400">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredActivities.length)} of{' '}
              {filteredActivities.length}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Activity List */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {displayedActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-4 p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                <div className={`w-12 h-12 ${getActivityBgColor(activity.type)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-white font-medium">{getActivityTitle(activity)}</h4>
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-300 mb-1">{getActivityDetails(activity)}</p>
                  {activity.notes && (
                    <p className="text-sm text-slate-400 italic">&quot;{activity.notes}&quot;</p>
                  )}
                  <div className="flex items-center space-x-4 mt-2 text-xs text-slate-500">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(activity.date)}
                    </span>
                    <span>{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}

            {displayedActivities.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">No activities found</p>
                <p className="text-slate-500 text-sm mt-1">Try adjusting your filters</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-700/50">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <span className="text-sm text-slate-400">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
