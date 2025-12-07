'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  Plus,
  Trash2,
  Beaker,
  Calendar,
  Target,
  Clock,
  AlertCircle,
} from 'lucide-react'

// Template data
const templateProtocols: Record<string, {
  name: string
  goal: string
  description: string
  duration: number
  peptides: { name: string; dosage: string; frequency: string }[]
}> = {
  't1': {
    name: 'Beginner Weight Loss',
    goal: 'Weight Loss',
    description: 'A starter protocol for weight management using Semaglutide.',
    duration: 84, // 12 weeks
    peptides: [
      { name: 'Semaglutide', dosage: '0.25mg', frequency: 'Weekly' },
    ],
  },
  't2': {
    name: 'Advanced Fat Burning',
    goal: 'Weight Loss',
    description: 'An advanced protocol combining GLP-1 agonist with healing peptide.',
    duration: 112, // 16 weeks
    peptides: [
      { name: 'Tirzepatide', dosage: '2.5mg', frequency: 'Weekly' },
      { name: 'BPC-157', dosage: '250mcg', frequency: 'Daily' },
    ],
  },
  't3': {
    name: 'Injury Recovery',
    goal: 'Recovery',
    description: 'Healing protocol for tissue repair and recovery.',
    duration: 56, // 8 weeks
    peptides: [
      { name: 'TB-500', dosage: '2.5mg', frequency: '2x Weekly' },
      { name: 'BPC-157', dosage: '500mcg', frequency: 'Daily' },
    ],
  },
  't4': {
    name: 'Skin Rejuvenation',
    goal: 'Anti-Aging',
    description: 'Anti-aging protocol for skin health and collagen synthesis.',
    duration: 70, // 10 weeks
    peptides: [
      { name: 'GHK-Cu', dosage: '1mg', frequency: 'Daily' },
      { name: 'Copper Peptides', dosage: '200mcg', frequency: 'Daily' },
    ],
  },
}

const goalOptions = ['Weight Loss', 'Recovery', 'Anti-Aging', 'Performance', 'Sleep', 'Other']
const frequencyOptions = ['Daily', '2x Daily', '3x Weekly', '2x Weekly', 'Weekly', 'Every Other Day']

interface Peptide {
  id: string
  name: string
  dosage: string
  frequency: string
}

export default function NewProtocolPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const templateId = searchParams.get('template')

  // Initialize form with template data if provided
  const template = templateId ? templateProtocols[templateId] : null

  const [formData, setFormData] = useState({
    name: template?.name || '',
    goal: template?.goal || '',
    description: template?.description || '',
    startDate: new Date().toISOString().split('T')[0],
    duration: template?.duration || 56,
  })

  const [peptides, setPeptides] = useState<Peptide[]>(
    template?.peptides.map((p, i) => ({
      id: `peptide-${i}`,
      name: p.name,
      dosage: p.dosage,
      frequency: p.frequency,
    })) || []
  )

  const [errors, setErrors] = useState<Record<string, string>>({})

  const addPeptide = () => {
    setPeptides([
      ...peptides,
      { id: `peptide-${Date.now()}`, name: '', dosage: '', frequency: 'Daily' },
    ])
  }

  const removePeptide = (id: string) => {
    setPeptides(peptides.filter(p => p.id !== id))
  }

  const updatePeptide = (id: string, field: keyof Peptide, value: string) => {
    setPeptides(peptides.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    ))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Protocol name is required'
    }
    if (!formData.goal) {
      newErrors.goal = 'Please select a goal'
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required'
    }
    if (formData.duration < 7) {
      newErrors.duration = 'Duration must be at least 7 days'
    }
    if (peptides.length === 0) {
      newErrors.peptides = 'Add at least one peptide to your protocol'
    }
    peptides.forEach((p, i) => {
      if (!p.name.trim()) {
        newErrors[`peptide-${i}-name`] = 'Peptide name is required'
      }
      if (!p.dosage.trim()) {
        newErrors[`peptide-${i}-dosage`] = 'Dosage is required'
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // In production, save to API
    console.log('Creating protocol:', { ...formData, peptides })

    // Navigate back to protocols list
    router.push('/dashboard/protocols')
  }

  const calculateEndDate = () => {
    const start = new Date(formData.startDate)
    start.setDate(start.getDate() + formData.duration)
    return start.toISOString().split('T')[0]
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/dashboard/protocols">
          <Button variant="ghost" size="sm" aria-label="Back to protocols">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">
            {template ? 'Create from Template' : 'Create New Protocol'}
          </h1>
          <p className="text-slate-400">
            {template ? `Based on: ${template.name}` : 'Set up your peptide protocol'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Beaker className="w-5 h-5 mr-2 text-primary-400" />
              Protocol Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                Protocol Name *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Weight Loss Stack"
                className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.name ? 'border-accent-500' : 'border-slate-600'
                }`}
              />
              {errors.name && (
                <p className="text-accent-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Goal */}
            <div>
              <label htmlFor="goal" className="block text-sm font-medium text-slate-300 mb-2">
                Goal *
              </label>
              <select
                id="goal"
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.goal ? 'border-accent-500' : 'border-slate-600'
                }`}
              >
                <option value="">Select a goal</option>
                {goalOptions.map(goal => (
                  <option key={goal} value={goal}>{goal}</option>
                ))}
              </select>
              {errors.goal && (
                <p className="text-accent-400 text-sm mt-1">{errors.goal}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your protocol goals and notes..."
                rows={3}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Schedule */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-secondary-400" />
              Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Start Date */}
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-slate-300 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.startDate ? 'border-accent-500' : 'border-slate-600'
                  }`}
                />
                {errors.startDate && (
                  <p className="text-accent-400 text-sm mt-1">{errors.startDate}</p>
                )}
              </div>

              {/* Duration */}
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-slate-300 mb-2">
                  Duration (days) *
                </label>
                <input
                  type="number"
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
                  min={7}
                  className={`w-full px-4 py-2 bg-slate-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.duration ? 'border-accent-500' : 'border-slate-600'
                  }`}
                />
                {errors.duration && (
                  <p className="text-accent-400 text-sm mt-1">{errors.duration}</p>
                )}
              </div>
            </div>

            {/* Calculated End Date */}
            <div className="p-3 bg-slate-700/30 rounded-lg">
              <div className="flex items-center text-slate-400 text-sm mb-1">
                <Target className="w-4 h-4 mr-1" />
                Estimated End Date
              </div>
              <p className="text-white font-medium">{calculateEndDate()}</p>
              <p className="text-xs text-slate-500 mt-1">
                {Math.round(formData.duration / 7)} weeks from start
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Peptides */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white flex items-center">
              <Clock className="w-5 h-5 mr-2 text-accent-400" />
              Peptides
            </CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={addPeptide}>
              <Plus className="w-4 h-4 mr-2" />
              Add Peptide
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {errors.peptides && (
              <div className="flex items-center space-x-2 p-3 bg-accent-500/10 rounded-lg">
                <AlertCircle className="w-4 h-4 text-accent-400" />
                <p className="text-sm text-accent-300">{errors.peptides}</p>
              </div>
            )}

            {peptides.length === 0 ? (
              <div className="text-center py-8">
                <Beaker className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400 mb-4">No peptides added yet</p>
                <Button type="button" variant="outline" onClick={addPeptide}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Peptide
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {peptides.map((peptide, index) => (
                  <div
                    key={peptide.id}
                    className="p-4 bg-slate-700/30 rounded-lg border border-slate-600"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant="outline">Peptide {index + 1}</Badge>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-slate-400 hover:text-accent-400"
                        onClick={() => removePeptide(peptide.id)}
                        aria-label={`Remove peptide ${index + 1}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Peptide Name */}
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">
                          Name *
                        </label>
                        <input
                          type="text"
                          value={peptide.name}
                          onChange={(e) => updatePeptide(peptide.id, 'name', e.target.value)}
                          placeholder="e.g., BPC-157"
                          className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                            errors[`peptide-${index}-name`] ? 'border-accent-500' : 'border-slate-600'
                          }`}
                        />
                        {errors[`peptide-${index}-name`] && (
                          <p className="text-accent-400 text-xs mt-1">{errors[`peptide-${index}-name`]}</p>
                        )}
                      </div>

                      {/* Dosage */}
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">
                          Dosage *
                        </label>
                        <input
                          type="text"
                          value={peptide.dosage}
                          onChange={(e) => updatePeptide(peptide.id, 'dosage', e.target.value)}
                          placeholder="e.g., 250mcg"
                          className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                            errors[`peptide-${index}-dosage`] ? 'border-accent-500' : 'border-slate-600'
                          }`}
                        />
                        {errors[`peptide-${index}-dosage`] && (
                          <p className="text-accent-400 text-xs mt-1">{errors[`peptide-${index}-dosage`]}</p>
                        )}
                      </div>

                      {/* Frequency */}
                      <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">
                          Frequency
                        </label>
                        <select
                          value={peptide.frequency}
                          onChange={(e) => updatePeptide(peptide.id, 'frequency', e.target.value)}
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          {frequencyOptions.map(freq => (
                            <option key={freq} value={freq}>{freq}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex items-center justify-end space-x-4">
          <Link href="/dashboard/protocols">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit">
            Create Protocol
          </Button>
        </div>
      </form>
    </div>
  )
}
