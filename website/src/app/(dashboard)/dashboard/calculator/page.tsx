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
  User,
  Sparkles,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react'

// Peptide dosing data with weight/age/gender considerations
// Based on clinical research, biohacker protocols, and medical literature
const peptidePresets = [
  {
    id: 'bpc157',
    name: 'BPC-157',
    vialSize: 5,
    typicalDose: 250,
    doseUnit: 'mcg',
    frequency: 'Once or twice daily',
    notes: 'Subcutaneous injection, rotate sites',
    category: 'Healing',
    // Dosing parameters for recommendations
    dosing: {
      basePerKg: 2.5, // mcg/kg base dose
      minDose: 200,
      maxDose: 500,
      ageFactors: { young: 1.0, middle: 1.0, senior: 0.85 },
      genderFactors: { male: 1.0, female: 0.9 },
      goalFactors: { conservative: 0.8, standard: 1.0, aggressive: 1.2 },
    },
  },
  {
    id: 'tb500',
    name: 'TB-500',
    vialSize: 5,
    typicalDose: 2.5,
    doseUnit: 'mg',
    frequency: 'Twice weekly (loading), once weekly (maintenance)',
    notes: 'Subcutaneous or intramuscular',
    category: 'Healing',
    dosing: {
      basePerKg: 0.03, // mg/kg
      minDose: 2,
      maxDose: 5,
      ageFactors: { young: 1.0, middle: 1.0, senior: 0.8 },
      genderFactors: { male: 1.0, female: 0.85 },
      goalFactors: { conservative: 0.7, standard: 1.0, aggressive: 1.3 },
    },
  },
  {
    id: 'semaglutide',
    name: 'Semaglutide',
    vialSize: 3,
    typicalDose: 0.25,
    doseUnit: 'mg',
    frequency: 'Once weekly',
    notes: 'Start low, titrate up slowly over 4-week intervals',
    category: 'Weight Loss',
    dosing: {
      basePerKg: 0.003, // mg/kg starting
      minDose: 0.25,
      maxDose: 2.4,
      ageFactors: { young: 1.0, middle: 1.0, senior: 0.75 },
      genderFactors: { male: 1.1, female: 1.0 },
      goalFactors: { conservative: 0.8, standard: 1.0, aggressive: 1.2 },
    },
  },
  {
    id: 'tirzepatide',
    name: 'Tirzepatide',
    vialSize: 5,
    typicalDose: 2.5,
    doseUnit: 'mg',
    frequency: 'Once weekly',
    notes: 'Dual GIP/GLP-1 agonist. Start at 2.5mg, titrate every 4 weeks',
    category: 'Weight Loss',
    dosing: {
      basePerKg: 0.025, // mg/kg
      minDose: 2.5,
      maxDose: 15,
      ageFactors: { young: 1.0, middle: 1.0, senior: 0.7 },
      genderFactors: { male: 1.1, female: 1.0 },
      goalFactors: { conservative: 0.8, standard: 1.0, aggressive: 1.15 },
    },
  },
  {
    id: 'nad',
    name: 'NAD+',
    vialSize: 100,
    typicalDose: 100,
    doseUnit: 'mg',
    frequency: 'Daily or every other day',
    notes: 'Subcutaneous, may cause flushing. Build up tolerance gradually',
    category: 'Longevity',
    dosing: {
      basePerKg: 1.2, // mg/kg
      minDose: 50,
      maxDose: 200,
      ageFactors: { young: 0.8, middle: 1.0, senior: 1.2 }, // Seniors benefit more
      genderFactors: { male: 1.0, female: 0.9 },
      goalFactors: { conservative: 0.6, standard: 1.0, aggressive: 1.4 },
    },
  },
  {
    id: 'ghkcu',
    name: 'GHK-Cu',
    vialSize: 50,
    typicalDose: 1,
    doseUnit: 'mg',
    frequency: 'Daily',
    notes: 'Copper peptide for skin/hair. Can also be used topically',
    category: 'Anti-Aging',
    dosing: {
      basePerKg: 0.015, // mg/kg
      minDose: 0.5,
      maxDose: 2,
      ageFactors: { young: 0.8, middle: 1.0, senior: 1.1 },
      genderFactors: { male: 1.0, female: 1.1 }, // Women often use for skin
      goalFactors: { conservative: 0.7, standard: 1.0, aggressive: 1.3 },
    },
  },
  {
    id: 'cjc1295',
    name: 'CJC-1295 (no DAC)',
    vialSize: 2,
    typicalDose: 100,
    doseUnit: 'mcg',
    frequency: '2-3 times daily',
    notes: 'GHRH analog. Best before bed and post-workout on empty stomach',
    category: 'Growth Hormone',
    dosing: {
      basePerKg: 1.0, // mcg/kg per dose
      minDose: 50,
      maxDose: 150,
      ageFactors: { young: 1.1, middle: 1.0, senior: 0.8 },
      genderFactors: { male: 1.0, female: 0.85 },
      goalFactors: { conservative: 0.7, standard: 1.0, aggressive: 1.3 },
    },
  },
  {
    id: 'ipamorelin',
    name: 'Ipamorelin',
    vialSize: 5,
    typicalDose: 200,
    doseUnit: 'mcg',
    frequency: '2-3 times daily',
    notes: 'Selective GHRP. Often stacked with CJC-1295 for synergy',
    category: 'Growth Hormone',
    dosing: {
      basePerKg: 2.5, // mcg/kg per dose
      minDose: 100,
      maxDose: 300,
      ageFactors: { young: 1.1, middle: 1.0, senior: 0.75 },
      genderFactors: { male: 1.0, female: 0.85 },
      goalFactors: { conservative: 0.7, standard: 1.0, aggressive: 1.25 },
    },
  },
  {
    id: 'pt141',
    name: 'PT-141 (Bremelanotide)',
    vialSize: 10,
    typicalDose: 1.5,
    doseUnit: 'mg',
    frequency: 'As needed, max 8 doses/month',
    notes: 'Subcutaneous, 45 min before activity. May cause nausea initially',
    category: 'Sexual Health',
    dosing: {
      basePerKg: 0.018, // mg/kg
      minDose: 0.5,
      maxDose: 2,
      ageFactors: { young: 0.9, middle: 1.0, senior: 0.8 },
      genderFactors: { male: 1.0, female: 0.7 }, // Lower dose for women
      goalFactors: { conservative: 0.6, standard: 1.0, aggressive: 1.2 },
    },
  },
  {
    id: 'mots-c',
    name: 'MOTS-c',
    vialSize: 10,
    typicalDose: 5,
    doseUnit: 'mg',
    frequency: '3x weekly',
    notes: 'Mitochondrial peptide. Enhances metabolism and exercise capacity',
    category: 'Longevity',
    dosing: {
      basePerKg: 0.06, // mg/kg
      minDose: 2.5,
      maxDose: 10,
      ageFactors: { young: 0.9, middle: 1.0, senior: 1.15 },
      genderFactors: { male: 1.0, female: 0.9 },
      goalFactors: { conservative: 0.6, standard: 1.0, aggressive: 1.3 },
    },
  },
  {
    id: 'epitalon',
    name: 'Epitalon',
    vialSize: 10,
    typicalDose: 5,
    doseUnit: 'mg',
    frequency: 'Daily for 10-20 days, 2-3 cycles/year',
    notes: 'Telomerase activator. Cycle protocol important',
    category: 'Longevity',
    dosing: {
      basePerKg: 0.06, // mg/kg
      minDose: 3,
      maxDose: 10,
      ageFactors: { young: 0.7, middle: 1.0, senior: 1.2 },
      genderFactors: { male: 1.0, female: 1.0 },
      goalFactors: { conservative: 0.7, standard: 1.0, aggressive: 1.2 },
    },
  },
  {
    id: 'ss31',
    name: 'SS-31 (Elamipretide)',
    vialSize: 20,
    typicalDose: 20,
    doseUnit: 'mg',
    frequency: 'Daily',
    notes: 'Mitochondrial-targeted peptide. Cardioprotective properties',
    category: 'Longevity',
    dosing: {
      basePerKg: 0.25, // mg/kg
      minDose: 10,
      maxDose: 40,
      ageFactors: { young: 0.8, middle: 1.0, senior: 1.2 },
      genderFactors: { male: 1.0, female: 0.9 },
      goalFactors: { conservative: 0.6, standard: 1.0, aggressive: 1.25 },
    },
  },
  {
    id: 'custom',
    name: 'Custom Peptide',
    vialSize: 0,
    typicalDose: 0,
    doseUnit: 'mcg',
    frequency: 'As prescribed',
    notes: 'Enter your own values',
    category: 'Custom',
    dosing: null,
  },
]

type AgeRange = 'young' | 'middle' | 'senior'
type Gender = 'male' | 'female'
type Goal = 'conservative' | 'standard' | 'aggressive'

const categoryColors: Record<string, string> = {
  'Healing': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Weight Loss': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'Longevity': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Anti-Aging': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  'Growth Hormone': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Sexual Health': 'bg-red-500/10 text-red-400 border-red-500/20',
  'Custom': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
}

export default function CalculatorPage() {
  // Reconstitution calculator state
  const [selectedPeptide, setSelectedPeptide] = useState(peptidePresets[0])
  const [peptideAmount, setPeptideAmount] = useState<string>('5')
  const [waterVolume, setWaterVolume] = useState<string>('2')
  const [desiredDose, setDesiredDose] = useState<string>('250')
  const [doseUnit, setDoseUnit] = useState<'mcg' | 'mg'>('mcg')
  const [showPresets, setShowPresets] = useState(false)
  const [copied, setCopied] = useState(false)

  // Personalization state for recommended dosing
  const [bodyWeight, setBodyWeight] = useState<string>('70')
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg')
  const [age, setAge] = useState<string>('35')
  const [gender, setGender] = useState<Gender>('male')
  const [goal, setGoal] = useState<Goal>('standard')
  const [showRecommendation, setShowRecommendation] = useState(true)

  // Calculate recommended dose based on biometrics
  const recommendedDose = useMemo(() => {
    if (!selectedPeptide.dosing || !bodyWeight || !age) return null

    const weightKg = weightUnit === 'lbs'
      ? parseFloat(bodyWeight) / 2.205
      : parseFloat(bodyWeight)
    const ageNum = parseInt(age)

    if (isNaN(weightKg) || isNaN(ageNum) || weightKg <= 0 || ageNum <= 0) return null

    const dosing = selectedPeptide.dosing

    // Determine age category
    let ageRange: AgeRange
    if (ageNum < 35) ageRange = 'young'
    else if (ageNum < 55) ageRange = 'middle'
    else ageRange = 'senior'

    // Calculate base dose from weight
    let baseDose = dosing.basePerKg * weightKg

    // Apply modifiers
    const ageFactor = dosing.ageFactors[ageRange]
    const genderFactor = dosing.genderFactors[gender]
    const goalFactor = dosing.goalFactors[goal]

    let recommendedDose = baseDose * ageFactor * genderFactor * goalFactor

    // Clamp to min/max
    recommendedDose = Math.max(dosing.minDose, Math.min(dosing.maxDose, recommendedDose))

    // Round appropriately
    if (selectedPeptide.doseUnit === 'mcg') {
      recommendedDose = Math.round(recommendedDose / 10) * 10 // Round to nearest 10 mcg
    } else {
      recommendedDose = Math.round(recommendedDose * 100) / 100 // Round to 2 decimal places
    }

    // Calculate dose comparison to typical
    const typicalDose = selectedPeptide.typicalDose
    const percentDiff = ((recommendedDose - typicalDose) / typicalDose) * 100

    return {
      dose: recommendedDose,
      unit: selectedPeptide.doseUnit,
      weightKg,
      ageRange,
      ageFactor,
      genderFactor,
      goalFactor,
      percentDiff,
      min: dosing.minDose,
      max: dosing.maxDose,
    }
  }, [selectedPeptide, bodyWeight, weightUnit, age, gender, goal])

  // Calculate concentration and injection volume
  const calculations = useMemo(() => {
    const peptideMg = parseFloat(peptideAmount) || 0
    const waterMl = parseFloat(waterVolume) || 0
    const dose = parseFloat(desiredDose) || 0

    if (peptideMg <= 0 || waterMl <= 0) {
      return null
    }

    const concentrationMgMl = peptideMg / waterMl
    const concentrationMcgMl = concentrationMgMl * 1000
    const doseMcg = doseUnit === 'mg' ? dose * 1000 : dose
    const injectionVolumeMl = doseMcg / concentrationMcgMl
    const injectionUnits = injectionVolumeMl * 100
    const dosesPerVial = waterMl / injectionVolumeMl

    return {
      concentrationMgMl,
      concentrationMcgMl,
      injectionVolumeMl,
      injectionUnits,
      dosesPerVial,
    }
  }, [peptideAmount, waterVolume, desiredDose, doseUnit])

  const handlePresetSelect = (preset: typeof peptidePresets[0]) => {
    setSelectedPeptide(preset)
    if (preset.id !== 'custom') {
      setPeptideAmount(preset.vialSize.toString())
      setDesiredDose(preset.typicalDose.toString())
      setDoseUnit(preset.doseUnit as 'mcg' | 'mg')
    }
    setShowPresets(false)
  }

  const handleApplyRecommendation = () => {
    if (recommendedDose) {
      setDesiredDose(recommendedDose.dose.toString())
      setDoseUnit(recommendedDose.unit as 'mcg' | 'mg')
    }
  }

  const handleReset = () => {
    setSelectedPeptide(peptidePresets[0])
    setPeptideAmount('5')
    setWaterVolume('2')
    setDesiredDose('250')
    setDoseUnit('mcg')
    setBodyWeight('70')
    setAge('35')
    setGender('male')
    setGoal('standard')
  }

  const handleCopyResults = () => {
    if (!calculations) return

    let text = `Dosage Calculation for ${selectedPeptide.name}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Peptide: ${peptideAmount}mg in ${waterVolume}ml BAC water
Concentration: ${calculations.concentrationMgMl.toFixed(2)}mg/ml
Desired Dose: ${desiredDose}${doseUnit}
Injection Volume: ${calculations.injectionVolumeMl.toFixed(3)}ml (${calculations.injectionUnits.toFixed(1)} units)
Doses per Vial: ~${Math.floor(calculations.dosesPerVial)} doses`

    if (recommendedDose) {
      text += `

Personalized Recommendation:
Weight: ${bodyWeight}${weightUnit} | Age: ${age} | Gender: ${gender}
Goal: ${goal}
Recommended Dose: ${recommendedDose.dose}${recommendedDose.unit}`
    }

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
          Calculate reconstitution ratios, injection volumes, and get personalized dose recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Inputs */}
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
                  <div className="flex items-center gap-2">
                    <span>{selectedPeptide.name}</span>
                    <Badge className={categoryColors[selectedPeptide.category]}>
                      {selectedPeptide.category}
                    </Badge>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${showPresets ? 'rotate-180' : ''}`} />
                </button>

                {showPresets && (
                  <div className="absolute z-10 w-full mt-2 bg-slate-900 border border-slate-700 rounded-lg shadow-xl max-h-80 overflow-y-auto">
                    {peptidePresets.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => handlePresetSelect(preset)}
                        className={`w-full text-left p-3 hover:bg-slate-800 transition-colors ${
                          selectedPeptide.id === preset.id ? 'bg-primary-500/10 text-primary-400' : 'text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{preset.name}</span>
                          <Badge className={`${categoryColors[preset.category]} text-xs`}>
                            {preset.category}
                          </Badge>
                        </div>
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
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Column - Personalization */}
        <div className="space-y-6">
          {/* Biometrics for Recommended Dosing */}
          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-400" />
                  Your Profile
                </h2>
                <button
                  onClick={() => setShowRecommendation(!showRecommendation)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  {showRecommendation ? 'Hide' : 'Show'} recommendation
                </button>
              </div>

              <div className="space-y-4">
                {/* Weight */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Body Weight
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={bodyWeight}
                      onChange={(e) => setBodyWeight(e.target.value)}
                      className="flex-1 p-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="70"
                      min="0"
                    />
                    <div className="flex rounded-lg border border-slate-700 overflow-hidden">
                      <button
                        onClick={() => setWeightUnit('kg')}
                        className={`px-3 py-2 transition-colors ${
                          weightUnit === 'kg'
                            ? 'bg-purple-500 text-white'
                            : 'bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                      >
                        kg
                      </button>
                      <button
                        onClick={() => setWeightUnit('lbs')}
                        className={`px-3 py-2 transition-colors ${
                          weightUnit === 'lbs'
                            ? 'bg-purple-500 text-white'
                            : 'bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                      >
                        lbs
                      </button>
                    </div>
                  </div>
                </div>

                {/* Age */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="35"
                    min="18"
                    max="100"
                  />
                  {age && (
                    <p className="text-xs text-slate-500 mt-1">
                      Category: {parseInt(age) < 35 ? 'Young Adult' : parseInt(age) < 55 ? 'Middle Aged' : 'Senior'}
                    </p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Biological Sex
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setGender('male')}
                      className={`flex-1 py-2 px-3 rounded-lg border transition-colors ${
                        gender === 'male'
                          ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-blue-500/30'
                      }`}
                    >
                      Male
                    </button>
                    <button
                      onClick={() => setGender('female')}
                      className={`flex-1 py-2 px-3 rounded-lg border transition-colors ${
                        gender === 'female'
                          ? 'bg-pink-500/20 border-pink-500/50 text-pink-400'
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-pink-500/30'
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>

                {/* Goal */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Dosing Approach
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setGoal('conservative')}
                      className={`flex-1 py-2 px-2 rounded-lg border transition-colors text-sm ${
                        goal === 'conservative'
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-emerald-500/30'
                      }`}
                    >
                      Conservative
                    </button>
                    <button
                      onClick={() => setGoal('standard')}
                      className={`flex-1 py-2 px-2 rounded-lg border transition-colors text-sm ${
                        goal === 'standard'
                          ? 'bg-primary-500/20 border-primary-500/50 text-primary-400'
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-primary-500/30'
                      }`}
                    >
                      Standard
                    </button>
                    <button
                      onClick={() => setGoal('aggressive')}
                      className={`flex-1 py-2 px-2 rounded-lg border transition-colors text-sm ${
                        goal === 'aggressive'
                          ? 'bg-orange-500/20 border-orange-500/50 text-orange-400'
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-orange-500/30'
                      }`}
                    >
                      Aggressive
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    {goal === 'conservative' && 'Lower doses, ideal for beginners or sensitive individuals'}
                    {goal === 'standard' && 'Typical research-backed doses for most users'}
                    {goal === 'aggressive' && 'Higher doses for experienced users with specific goals'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Dose */}
          {showRecommendation && recommendedDose && selectedPeptide.id !== 'custom' && (
            <Card className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border-emerald-500/20">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  Recommended Dose
                </h2>

                <div className="text-center mb-4">
                  <p className="text-4xl font-bold text-white">
                    {recommendedDose.dose}
                    <span className="text-xl text-slate-400 ml-1">{recommendedDose.unit}</span>
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    {recommendedDose.percentDiff > 5 ? (
                      <TrendingUp className="w-4 h-4 text-orange-400" />
                    ) : recommendedDose.percentDiff < -5 ? (
                      <TrendingDown className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Minus className="w-4 h-4 text-slate-400" />
                    )}
                    <span className={`text-sm ${
                      Math.abs(recommendedDose.percentDiff) <= 5 ? 'text-slate-400' :
                      recommendedDose.percentDiff > 0 ? 'text-orange-400' : 'text-emerald-400'
                    }`}>
                      {recommendedDose.percentDiff > 0 ? '+' : ''}{recommendedDose.percentDiff.toFixed(0)}% vs typical
                    </span>
                  </div>
                </div>

                {/* Factors breakdown */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Base (weight-adjusted)</span>
                    <span className="text-slate-300">{(recommendedDose.dose / (recommendedDose.ageFactor * recommendedDose.genderFactor * recommendedDose.goalFactor)).toFixed(1)} {recommendedDose.unit}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Age factor ({recommendedDose.ageRange})</span>
                    <span className={recommendedDose.ageFactor !== 1 ? (recommendedDose.ageFactor > 1 ? 'text-orange-400' : 'text-emerald-400') : 'text-slate-300'}>
                      ×{recommendedDose.ageFactor.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Gender factor ({gender})</span>
                    <span className={recommendedDose.genderFactor !== 1 ? (recommendedDose.genderFactor > 1 ? 'text-orange-400' : 'text-emerald-400') : 'text-slate-300'}>
                      ×{recommendedDose.genderFactor.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Goal factor ({goal})</span>
                    <span className={recommendedDose.goalFactor !== 1 ? (recommendedDose.goalFactor > 1 ? 'text-orange-400' : 'text-emerald-400') : 'text-slate-300'}>
                      ×{recommendedDose.goalFactor.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Dose range */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Min: {recommendedDose.min}{recommendedDose.unit}</span>
                    <span>Max: {recommendedDose.max}{recommendedDose.unit}</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                      style={{
                        width: `${((recommendedDose.dose - recommendedDose.min) / (recommendedDose.max - recommendedDose.min)) * 100}%`
                      }}
                    />
                  </div>
                </div>

                <Button
                  onClick={handleApplyRecommendation}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  Apply Recommended Dose
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Factor explanations */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-slate-300 mb-3">How Recommendations Work</h3>
              <div className="space-y-2 text-xs text-slate-400">
                <p><strong className="text-slate-300">Weight:</strong> Base dose scales with lean body mass. Heavier individuals generally need higher doses for equivalent effects.</p>
                <p><strong className="text-slate-300">Age:</strong> Metabolism and hormone levels change with age. Seniors may need lower doses of stimulatory peptides but higher doses of restorative ones like NAD+.</p>
                <p><strong className="text-slate-300">Gender:</strong> Hormonal differences affect peptide metabolism. Women typically need 10-15% lower doses for most peptides.</p>
                <p><strong className="text-slate-300">Goal:</strong> Conservative for beginners/sensitive individuals, aggressive for experienced users targeting specific outcomes.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {/* Main Results */}
          <Card className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border-primary-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-primary-400" />
                  Calculation Results
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
                <div className="space-y-4">
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

                  {/* Injection Volume */}
                  <div className="p-4 bg-gradient-to-r from-accent-500/20 to-accent-500/5 rounded-xl border border-accent-500/30">
                    <p className="text-sm text-accent-300 mb-1">Injection Volume</p>
                    <div className="flex items-baseline gap-3">
                      <p className="text-4xl font-bold text-white">
                        {calculations.injectionUnits.toFixed(1)}
                      </p>
                      <p className="text-xl text-slate-300">units</p>
                    </div>
                    <p className="text-sm text-slate-400 mt-2">
                      = {calculations.injectionVolumeMl.toFixed(3)} ml
                    </p>
                    <Badge className="mt-2 bg-accent-500/20 text-accent-300 border-accent-500/30">
                      {desiredDose} {doseUnit} per injection
                    </Badge>
                  </div>

                  {/* Vial Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900/50 rounded-xl">
                      <p className="text-sm text-slate-400 mb-1">Doses/Vial</p>
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
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calculator className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400">Enter peptide and water amounts to calculate</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Syringe Guide */}
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
                  Draw to <span className="text-primary-400 font-semibold">{calculations.injectionUnits.toFixed(1)} units</span>
                </p>
              </CardContent>
            </Card>
          )}

          {/* Safety Notice */}
          <Card className="bg-amber-500/10 border-amber-500/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-amber-300 mb-1">Medical Disclaimer</p>
                  <ul className="text-amber-200/80 space-y-1 text-xs">
                    <li>• Recommendations are for educational purposes only</li>
                    <li>• Always consult a healthcare provider before use</li>
                    <li>• Individual responses vary significantly</li>
                    <li>• Start with lower doses and titrate up</li>
                    <li>• Monitor for side effects and adjust accordingly</li>
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
