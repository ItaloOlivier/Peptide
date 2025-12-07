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
import { Select } from '@/components/ui/select'
import { Target } from 'lucide-react'

interface LogWeightModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LogWeightModal({ open, onOpenChange }: LogWeightModalProps) {
  const [formData, setFormData] = useState({
    weight: '',
    unit: 'lbs',
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
    if (!formData.weight) {
      newErrors.weight = 'Weight is required'
    } else if (isNaN(parseFloat(formData.weight)) || parseFloat(formData.weight) <= 0) {
      newErrors.weight = 'Please enter a valid weight'
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
      console.log('Logging weight:', formData)

      // Reset form and close modal
      setFormData({
        weight: '',
        unit: 'lbs',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().slice(0, 5),
        notes: '',
      })
      setErrors({})
      onOpenChange(false)
    } catch (error) {
      console.error('Error logging weight:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogClose onClose={() => onOpenChange(false)} />
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-primary-400" />
            </div>
            <div>
              <DialogTitle>Log Weight</DialogTitle>
              <DialogDescription>Record your current weight</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 p-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <Input
                  type="number"
                  label="Weight"
                  placeholder="185.2"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  error={errors.weight}
                  required
                />
              </div>
              <Select
                label="Unit"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              >
                <option value="lbs">lbs</option>
                <option value="kg">kg</option>
              </Select>
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
                placeholder="Any additional notes..."
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
              Log Weight
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
