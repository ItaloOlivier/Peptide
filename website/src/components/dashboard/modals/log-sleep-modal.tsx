'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Moon } from 'lucide-react'

interface LogSleepModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LogSleepModal({ open, onOpenChange }: LogSleepModalProps) {
  const [formData, setFormData] = useState({
    hours: 7,
    quality: 5,
    date: new Date().toISOString().split('T')[0],
    bedtime: '22:00',
    wakeTime: '06:00',
    notes: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    const newErrors: Record<string, string> = {}
    if (formData.hours < 0 || formData.hours > 24) {
      newErrors.hours = 'Hours must be between 0 and 24'
    }
    if (formData.quality < 1 || formData.quality > 10) {
      newErrors.quality = 'Sleep quality must be between 1 and 10'
    }
    if (!formData.date) newErrors.date = 'Date is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Logging sleep:', formData)

      // Reset form and close modal
      setFormData({
        hours: 7,
        quality: 5,
        date: new Date().toISOString().split('T')[0],
        bedtime: '22:00',
        wakeTime: '06:00',
        notes: '',
      })
      setErrors({})
      onOpenChange(false)
    } catch (error) {
      console.error('Error logging sleep:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getQualityColor = (level: number) => {
    if (level >= 8) return 'text-emerald-400'
    if (level >= 5) return 'text-indigo-400'
    return 'text-accent-400'
  }

  const getQualityBgColor = (level: number) => {
    if (level >= 8) return 'bg-emerald-500/20'
    if (level >= 5) return 'bg-indigo-500/20'
    return 'bg-accent-500/20'
  }

  const getQualityLabel = (level: number) => {
    if (level >= 9) return 'Excellent'
    if (level >= 7) return 'Good'
    if (level >= 5) return 'Fair'
    if (level >= 3) return 'Poor'
    return 'Very Poor'
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogClose onClose={() => onOpenChange(false)} />
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${getQualityBgColor(formData.quality)} rounded-lg flex items-center justify-center`}>
              <Moon className={`w-5 h-5 ${getQualityColor(formData.quality)}`} />
            </div>
            <div>
              <DialogTitle>Log Sleep</DialogTitle>
              <DialogDescription>Track your sleep duration and quality</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 p-6">
            {/* Hours of Sleep */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                Hours of Sleep: <span className="font-bold text-indigo-400">{formData.hours}h</span>
              </label>
              <input
                type="range"
                min="0"
                max="12"
                step="0.5"
                value={formData.hours}
                onChange={(e) => setFormData({ ...formData, hours: parseFloat(e.target.value) })}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>0h</span>
                <span>4h</span>
                <span>8h</span>
                <span>12h</span>
              </div>
              {errors.hours && (
                <p className="text-sm text-accent-500">{errors.hours}</p>
              )}
            </div>

            {/* Sleep Quality */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-300">
                Sleep Quality: <span className={`font-bold ${getQualityColor(formData.quality)}`}>{formData.quality}/10 - {getQualityLabel(formData.quality)}</span>
              </label>

              <div className="space-y-2">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.quality}
                  onChange={(e) => setFormData({ ...formData, quality: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  style={{
                    background: `linear-gradient(to right,
                      rgb(239, 68, 68) 0%,
                      rgb(251, 191, 36) 50%,
                      rgb(34, 197, 94) 100%)`
                  }}
                />

                <div className="flex justify-between text-xs text-slate-500 px-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setFormData({ ...formData, quality: num })}
                      className={`w-6 h-6 rounded transition-colors ${
                        formData.quality === num
                          ? 'bg-indigo-500 text-white'
                          : 'hover:bg-slate-700 text-slate-400'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {errors.quality && (
                <p className="text-sm text-accent-500">{errors.quality}</p>
              )}
            </div>

            {/* Date */}
            <Input
              type="date"
              label="Date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              error={errors.date}
              required
            />

            {/* Bedtime and Wake Time */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="time"
                label="Bedtime"
                value={formData.bedtime}
                onChange={(e) => setFormData({ ...formData, bedtime: e.target.value })}
              />

              <Input
                type="time"
                label="Wake Time"
                value={formData.wakeTime}
                onChange={(e) => setFormData({ ...formData, wakeTime: e.target.value })}
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Notes (optional)
              </label>
              <textarea
                className="flex min-h-[80px] w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Any thoughts about your sleep? (e.g., dreams, disturbances, feeling rested)"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              Log Sleep
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
