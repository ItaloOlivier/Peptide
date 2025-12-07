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
import { Syringe } from 'lucide-react'

interface LogInjectionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultPeptide?: string
}

const injectionSites = [
  'Abdomen - Left',
  'Abdomen - Right',
  'Thigh - Left',
  'Thigh - Right',
  'Upper Arm - Left',
  'Upper Arm - Right',
  'Buttocks - Left',
  'Buttocks - Right',
]

const commonPeptides = [
  'Semaglutide',
  'BPC-157',
  'Tirzepatide',
  'Ipamorelin',
  'CJC-1295',
  'TB-500',
  'Melanotan II',
  'Other',
]

export function LogInjectionModal({
  open,
  onOpenChange,
  defaultPeptide,
}: LogInjectionModalProps) {
  const [formData, setFormData] = useState({
    peptide: defaultPeptide || '',
    dosage: '',
    site: '',
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
    if (!formData.peptide) newErrors.peptide = 'Peptide is required'
    if (!formData.dosage) newErrors.dosage = 'Dosage is required'
    if (!formData.site) newErrors.site = 'Injection site is required'
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
      console.log('Logging injection:', formData)

      // Reset form and close modal
      setFormData({
        peptide: '',
        dosage: '',
        site: '',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().slice(0, 5),
        notes: '',
      })
      setErrors({})
      onOpenChange(false)
    } catch (error) {
      console.error('Error logging injection:', error)
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
            <div className="w-10 h-10 bg-accent-500/20 rounded-lg flex items-center justify-center">
              <Syringe className="w-5 h-5 text-accent-400" />
            </div>
            <div>
              <DialogTitle>Log Injection</DialogTitle>
              <DialogDescription>Record a new peptide injection</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 p-6">
            <Select
              label="Peptide"
              value={formData.peptide}
              onChange={(e) => setFormData({ ...formData, peptide: e.target.value })}
              error={errors.peptide}
              required
            >
              <option value="">Select peptide...</option>
              {commonPeptides.map((peptide) => (
                <option key={peptide} value={peptide}>
                  {peptide}
                </option>
              ))}
            </Select>

            <Input
              label="Dosage"
              placeholder="e.g., 0.5mg, 250mcg"
              value={formData.dosage}
              onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
              error={errors.dosage}
              required
            />

            <Select
              label="Injection Site"
              value={formData.site}
              onChange={(e) => setFormData({ ...formData, site: e.target.value })}
              error={errors.site}
              required
            >
              <option value="">Select site...</option>
              {injectionSites.map((site) => (
                <option key={site} value={site}>
                  {site}
                </option>
              ))}
            </Select>

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
              Log Injection
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
