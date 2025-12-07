'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Calculator,
  Beaker,
  Droplets,
  Scale,
  Syringe,
  Info,
  ChevronDown,
  RotateCcw,
  Copy,
  Check,
} from 'lucide-react'

// Common peptide presets with typical dosing information
const peptidePresets = [
  {
    id: 'bpc157',
    name: 'BPC-157',
    vialSize: 5, // mg
    typicalDose: 250, // mcg
    doseUnit: 'mcg',
    frequency: 'Once or twice daily',
    notes: 'Subcutaneous injection, rotate sites',
  },
  {
    id: 'tb500',
    name: 'TB-500',
    vialSize: 5,
    typicalDose: 2.5, // mg
    doseUnit: 'mg',
    frequency: 'Twice weekly (loading), once weekly (maintenance)',
    notes: 'Subcutaneous or intramuscular',
  },
  {
    id: 'semaglutide',
    name: 'Semaglutide',
    vialSize: 3,
    typicalDose: 0.25, // mg starting dose
    doseUnit: 'mg',
    frequency: 'Once weekly',
    notes: 'Start low, titrate up slowly over weeks',
  },
  {
    id: 'tirzepatide',
    name: 'Tirzepatide',
    vialSize: 5,
    typicalDose: 2.5,
    doseUnit: 'mg',
    frequency: 'Once weekly',
    notes: 'Start at 2.5mg, increase every 4 weeks',
  },
  {
    id: 'nad',
    name: 'NAD+',
    vialSize: 100,
    typicalDose: 100, // mg
    doseUnit: 'mg',
    frequency: 'Daily or every other day',
    notes: 'Subcutaneous, may cause flushing',
  },
  {
    id: 'ghkcu',
    name: 'GHK-Cu',
    vialSize: 50,
    typicalDose: 1, // mg
    doseUnit: 'mg',
    frequency: 'Daily',
    notes: 'Subcutaneous injection',
  },
  {
    id: 'cjc1295',
    name: 'CJC-1295 (no DAC)',
    vialSize: 2,
    typicalDose: 100,
    doseUnit: 'mcg',
    frequency: '2-3 times daily',
    notes: 'Best before bed and post-workout',
  },
  {
    id: 'ipamorelin',
    name: 'Ipamorelin',
    vialSize: 5,
    typicalDose: 200,
    doseUnit: 'mcg',
    frequency: '2-3 times daily',
    notes: 'Often stacked with CJC-1295',
  },
  {
    id: 'pt141',
    name: 'PT-141 (Bremelanotide)',
    vialSize: 10,
    typicalDose: 1.5,
    doseUnit: 'mg',
    frequency: 'As needed, max 8 doses/month',
    notes: 'Subcutaneous, 45 min before activity',
  },
  {
    id: 'custom',
    name: 'Custom Peptide',
    vialSize: 0,
    typicalDose: 0,
    doseUnit: 'mcg',
    frequency: 'As prescribed',
    notes: 'Enter your own values',
  },
]

export default function CalculatorPage() {
  // Reconstitution calculator state
  const [selectedPeptide, setSelectedPeptide] = useState(peptidePresets[0])
  const [peptideAmount, setPeptideAmount] = useState<string>('5') // mg in vial
  const [waterVolume, setWaterVolume] = useState<string>('2') // ml of BAC water
  const [desiredDose, setDesiredDose] = useState<string>('250') // mcg or mg
  const [doseUnit, setDoseUnit] = useState<'mcg' | 'mg'>('mcg')
  const [bodyWeight, setBodyWeight] = useState<string>('') // kg (optional)
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg')
  const [showPresets, setShowPresets] = useState(false)
  const [copied, setCopied] = useState(false)

  // Calculate concentration and injection volume
  const calculations = useMemo(() => {
    const peptideMg = parseFloat(peptideAmount) || 0
    const waterMl = parseFloat(waterVolume) || 0
    const dose = parseFloat(desiredDose) || 0

    if (peptideMg <= 0 || waterMl <= 0) {
      return null
    }

    // Concentration in mg/ml
    const concentrationMgMl = peptideMg / waterMl
    // Concentration in mcg/ml
    const concentrationMcgMl = concentrationMgMl * 1000

    // Convert dose to mcg for calculation
    const doseMcg = doseUnit === 'mg' ? dose * 1000 : dose

    // Injection volume in ml
    const injectionVolumeMl = doseMcg / concentrationMcgMl

    // Convert to units on insulin syringe (1ml = 100 units)
    const injectionUnits = injectionVolumeMl * 100

    // Number of doses per vial
    const dosesPerVial = waterMl / injectionVolumeMl

    // Weight-based calculations (if provided)
    let weightBasedDose = null
    if (bodyWeight) {
      const weightKg = weightUnit === 'lbs' ? parseFloat(bodyWeight) / 2.205 : parseFloat(bodyWeight)
      if (weightKg > 0) {
        // Common weight-based dosing: mcg/kg
        weightBasedDose = {
          dosePerKg: doseMcg / weightKg,
          weightKg,
        }
      }
    }

    return {
      concentrationMgMl,
      concentrationMcgMl,
      injectionVolumeMl,
      injectionUnits,
      dosesPerVial,
      weightBasedDose,
    }
  }, [peptideAmount, waterVolume, desiredDose, doseUnit, bodyWeight, weightUnit])

  const handlePresetSelect = (preset: typeof peptidePresets[0]) => {
    setSelectedPeptide(preset)
    if (preset.id !== 'custom') {
      setPeptideAmount(preset.vialSize.toString())
      setDesiredDose(preset.typicalDose.toString())
      setDoseUnit(preset.doseUnit as 'mcg' | 'mg')
    }
    setShowPresets(false)
  }

  const handleReset = () => {
    setSelectedPeptide(peptidePresets[0])
    setPeptideAmount('5')
    setWaterVolume('2')
    setDesiredDose('250')
    setDoseUnit('mcg')
    setBodyWeight('')
    setWeightUnit('kg')
  }

  const handleCopyResults = () => {
    if (!calculations) return

    const text = `Dosage Calculation for ${selectedPeptide.name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Peptide: ${peptideAmount}mg in ${waterVolume}ml BAC water
Concentration: ${calculations.concentrationMgMl.toFixed(2)}mg/ml (${calculations.concentrationMcgMl.toFixed(0)}mcg/ml)
Desired Dose: ${desiredDose}${doseUnit}
Injection Volume: ${calculations.injectionVolumeMl.toFixed(3)}ml (${calculations.injectionUnits.toFixed(1)} units)
Doses per Vial: ~${Math.floor(calculations.dosesPerVial)} doses`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dosage Calculator</h1>
        <p className="text-slate-400">
          Calculate reconstitution ratios and precise injection volumes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Peptide Selection */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Beaker className="w-5 h-5 text-primary-400" />
                  Select Peptide
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="text-slate-400 hover:text-white"
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Reset
                </Button>
              </div>

              {/* Preset Dropdown */}
              <div className="relative mb-4">
                <button
                  onClick={() => setShowPresets(!showPresets)}
                  className="w-full flex items-center justify-between p-3 bg-slate-900 border border-slate-700 rounded-lg text-white hover:border-primary-500/50 transition-colors"
                >
                  <span>{selectedPeptide.name}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${showPresets ? 'rotate-180' : ''}`} />
                </button>

                {showPresets && (
                  <div className="absolute z-10 w-full mt-2 bg-slate-900 border border-slate-700 rounded-lg shadow-xl max-h-64 overflow-y-auto">
                    {peptidePresets.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => handlePresetSelect(preset)}
                        className={`w-full text-left p-3 hover:bg-slate-800 transition-colors ${
                          selectedPeptide.id === preset.id ? 'bg-primary-500/10 text-primary-400' : 'text-white'
                        }`}
                      >
                        <div className="font-medium">{preset.name}</div>
                        {preset.id !== 'custom' && (
                          <div className="text-xs text-slate-400 mt-0.5">
                            {preset.vialSize}mg vial • {preset.typicalDose}{preset.doseUnit} typical
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Peptide Info */}
              {selectedPeptide.id !== 'custom' && (
                <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                    <div className="text-sm">
                      <p className="text-slate-300"><strong>Frequency:</strong> {selectedPeptide.frequency}</p>
                      <p className="text-slate-400 mt-1">{selectedPeptide.notes}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Reconstitution */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                <Droplets className="w-5 h-5 text-secondary-400" />
                Reconstitution
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Peptide Amount (mg in vial)
                  </label>
                  <input
                    type="number"
                    value={peptideAmount}
                    onChange={(e) => setPeptideAmount(e.target.value)}
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., 5"
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Bacteriostatic Water (ml)
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 5].map((vol) => (
                      <button
                        key={vol}
                        onClick={() => setWaterVolume(vol.toString())}
                        className={`flex-1 py-2 px-3 rounded-lg border transition-colors ${
                          waterVolume === vol.toString()
                            ? 'bg-primary-500/10 border-primary-500/50 text-primary-400'
                            : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-primary-500/30'
                        }`}
                      >
                        {vol}ml
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={waterVolume}
                    onChange={(e) => setWaterVolume(e.target.value)}
                    className="w-full mt-2 p-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Or enter custom amount"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dosage */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                <Syringe className="w-5 h-5 text-accent-400" />
                Desired Dose
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Dose Amount
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={desiredDose}
                      onChange={(e) => setDesiredDose(e.target.value)}
                      className="flex-1 p-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., 250"
                      min="0"
                      step="0.01"
                    />
                    <div className="flex rounded-lg border border-slate-700 overflow-hidden">
                      <button
                        onClick={() => setDoseUnit('mcg')}
                        className={`px-4 py-2 transition-colors ${
                          doseUnit === 'mcg'
                            ? 'bg-primary-500 text-white'
                            : 'bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                      >
                        mcg
                      </button>
                      <button
                        onClick={() => setDoseUnit('mg')}
                        className={`px-4 py-2 transition-colors ${
                          doseUnit === 'mg'
                            ? 'bg-primary-500 text-white'
                            : 'bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                      >
                        mg
                      </button>
                    </div>
                  </div>
                </div>

                {/* Optional Body Weight */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Body Weight <span className="text-slate-500">(optional)</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={bodyWeight}
                      onChange={(e) => setBodyWeight(e.target.value)}
                      className="flex-1 p-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="For weight-based dosing"
                      min="0"
                    />
                    <div className="flex rounded-lg border border-slate-700 overflow-hidden">
                      <button
                        onClick={() => setWeightUnit('kg')}
                        className={`px-4 py-2 transition-colors ${
                          weightUnit === 'kg'
                            ? 'bg-primary-500 text-white'
                            : 'bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                      >
                        kg
                      </button>
                      <button
                        onClick={() => setWeightUnit('lbs')}
                        className={`px-4 py-2 transition-colors ${
                          weightUnit === 'lbs'
                            ? 'bg-primary-500 text-white'
                            : 'bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                      >
                        lbs
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Main Results */}
          <Card className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border-primary-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-primary-400" />
                  Results
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyResults}
                  disabled={!calculations}
                  className="text-slate-400 hover:text-white"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-1 text-green-400" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>

              {calculations ? (
                <div className="space-y-6">
                  {/* Concentration */}
                  <div className="p-4 bg-slate-900/50 rounded-xl">
                    <p className="text-sm text-slate-400 mb-1">Concentration</p>
                    <p className="text-2xl font-bold text-white">
                      {calculations.concentrationMgMl.toFixed(2)} <span className="text-lg text-slate-400">mg/ml</span>
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      = {calculations.concentrationMcgMl.toFixed(0)} mcg/ml
                    </p>
                  </div>

                  {/* Injection Volume - THE KEY RESULT */}
                  <div className="p-4 bg-gradient-to-r from-accent-500/20 to-accent-500/5 rounded-xl border border-accent-500/30">
                    <p className="text-sm text-accent-300 mb-1">Injection Volume</p>
                    <div className="flex items-baseline gap-3">
                      <p className="text-4xl font-bold text-white">
                        {calculations.injectionUnits.toFixed(1)}
                      </p>
                      <p className="text-xl text-slate-300">units</p>
                    </div>
                    <p className="text-sm text-slate-400 mt-2">
                      = {calculations.injectionVolumeMl.toFixed(3)} ml on insulin syringe
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <Badge className="bg-accent-500/20 text-accent-300 border-accent-500/30">
                        {desiredDose} {doseUnit} per injection
                      </Badge>
                    </div>
                  </div>

                  {/* Vial Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900/50 rounded-xl">
                      <p className="text-sm text-slate-400 mb-1">Doses per Vial</p>
                      <p className="text-2xl font-bold text-white">
                        ~{Math.floor(calculations.dosesPerVial)}
                      </p>
                    </div>
                    <div className="p-4 bg-slate-900/50 rounded-xl">
                      <p className="text-sm text-slate-400 mb-1">Total Volume</p>
                      <p className="text-2xl font-bold text-white">
                        {waterVolume} <span className="text-lg text-slate-400">ml</span>
                      </p>
                    </div>
                  </div>

                  {/* Weight-based calculation */}
                  {calculations.weightBasedDose && (
                    <div className="p-4 bg-slate-900/50 rounded-xl">
                      <p className="text-sm text-slate-400 mb-1">Weight-Based Dosing</p>
                      <p className="text-xl font-bold text-white">
                        {calculations.weightBasedDose.dosePerKg.toFixed(1)} <span className="text-sm text-slate-400">mcg/kg</span>
                      </p>
                      <p className="text-sm text-slate-500 mt-1">
                        Based on {calculations.weightBasedDose.weightKg.toFixed(1)} kg body weight
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calculator className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400">Enter peptide and water amounts to calculate</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Visual Syringe Guide */}
          {calculations && calculations.injectionUnits <= 100 && (
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Insulin Syringe Guide</h3>
                <div className="relative h-8 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary-500 to-primary-400 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(calculations.injectionUnits, 100)}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-between px-3">
                    {[0, 25, 50, 75, 100].map((mark) => (
                      <div key={mark} className="flex flex-col items-center">
                        <div className="w-px h-3 bg-slate-600" />
                        <span className="text-xs text-slate-500 mt-1">{mark}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-center text-sm text-slate-400 mt-3">
                  Draw to <span className="text-primary-400 font-semibold">{calculations.injectionUnits.toFixed(1)} units</span> on a 100-unit insulin syringe
                </p>
              </CardContent>
            </Card>
          )}

          {/* Safety Notice */}
          <Card className="bg-amber-500/10 border-amber-500/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-amber-300 mb-1">Important Safety Information</p>
                  <ul className="text-amber-200/80 space-y-1">
                    <li>• Always consult with a healthcare provider before using any peptides</li>
                    <li>• Double-check all calculations before injecting</li>
                    <li>• Use sterile technique and proper injection sites</li>
                    <li>• Store reconstituted peptides refrigerated (2-8°C)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
