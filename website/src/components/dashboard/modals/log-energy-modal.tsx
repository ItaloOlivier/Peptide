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
import { Zap } from 'lucide-react'

interface LogEnergyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LogEnergyModal({ open, onOpenChange }: LogEnergyModalProps) {
  const [formData, setFormData] = useState({
    level: 5,
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    notes: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    const newErrors: Record<string, string> = {}
    if (formData.level < 1 || formData.level > 10) {
      newErrors.level = 'Energy level must be between 1 and 10'
    }
    if (!formData.date) newErrors.date = 'Date is required'
    if (!formData.time) newErrors.time = 'Time is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Logging energy:', formData)

      // Reset form and close modal
      setFormData({
        level: 5,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().slice(0, 5),
        notes: '',
      })
      setErrors({})
      onOpenChange(false)
    } catch (error) {
      console.error('Error logging energy:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getEnergyColor = (level: number) => {
    if (level >= 8) return 'text-emerald-400'
    if (level >= 5) return 'text-secondary-400'
    return 'text-accent-400'
  }

  const getEnergyBgColor = (level: number) => {
    if (level >= 8) return 'bg-emerald-500/20'
    if (level >= 5) return 'bg-secondary-500/20'
    return 'bg-accent-500/20'
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogClose onClose={() => onOpenChange(false)} />
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${getEnergyBgColor(formData.level)} rounded-lg flex items-center justify-center`}>
              <Zap className={`w-5 h-5 ${getEnergyColor(formData.level)}`} />
            </div>
            <div>
              <DialogTitle>Log Energy Level</DialogTitle>
              <DialogDescription>Rate your current energy level</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 p-6">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-300">
                Energy Level: <span className={`font-bold ${getEnergyColor(formData.level)}`}>{formData.level}/10</span>
              </label>

              {/* Visual slider */}
              <div className="space-y-2">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                  style={{
                    background: `linear-gradient(to right,
                      rgb(239, 68, 68) 0%,
                      rgb(251, 191, 36) 50%,
                      rgb(34, 197, 94) 100%)`
                  }}
                />

                {/* Number indicators */}
                <div className="flex justify-between text-xs text-slate-500 px-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setFormData({ ...formData, level: num })}
                      className={`w-6 h-6 rounded transition-colors ${
                        formData.level === num
                          ? 'bg-primary-500 text-white'
                          : 'hover:bg-slate-700 text-slate-400'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {errors.level && (
                <p className="text-sm text-accent-500">{errors.level}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                type="date"
                label="Date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                error={errors.date}
                required
              />

              <Input
                type="time"
                label="Time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                error={errors.time}
                required
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Notes (optional)
              </label>
              <textarea
                className="flex min-h-[80px] w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="How are you feeling today?"
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
              Log Energy
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
