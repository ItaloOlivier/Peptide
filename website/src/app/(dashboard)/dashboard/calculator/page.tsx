'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Calculator,
  Beaker,
  Droplets,
  Syringe,
  Info,
  ChevronDown,
  ChevronRight,
  RotateCcw,
  Copy,
  Check,
  User,
  Sparkles,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  HelpCircle,
  Target,
  Zap,
  Heart,
  Brain,
  Dumbbell,
  Flame,
  Clock,
  Shield,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
} from 'lucide-react'

// Peptide data with beginner-friendly descriptions
const peptidePresets = [
  {
    id: 'bpc157',
    name: 'BPC-157',
    vialSize: 5,
    typicalDose: 250,
    doseUnit: 'mcg',
    frequency: 'Once or twice daily',
    category: 'Healing & Recovery',
    icon: Heart,
    color: 'emerald',
    shortDesc: 'Helps your body heal faster',
    longDesc: 'A healing peptide that supports tissue repair, gut health, and injury recovery. Popular for joint and muscle healing.',
    beginnerTip: 'Great first peptide - very well tolerated with minimal side effects.',
    dosing: {
      basePerKg: 2.5,
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
    frequency: 'Twice weekly',
    category: 'Healing & Recovery',
    icon: Heart,
    color: 'emerald',
    shortDesc: 'Accelerates injury healing',
    longDesc: 'Promotes healing of muscles, tendons, and ligaments. Often combined with BPC-157 for enhanced recovery.',
    beginnerTip: 'Usually taken less frequently than other peptides - only 2x per week.',
    dosing: {
      basePerKg: 0.03,
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
    category: 'Weight Management',
    icon: Flame,
    color: 'orange',
    shortDesc: 'Reduces appetite & aids weight loss',
    longDesc: 'A GLP-1 medication that helps control appetite and blood sugar. The active ingredient in Ozempic and Wegovy.',
    beginnerTip: 'Start with the lowest dose and increase slowly every 4 weeks to minimize nausea.',
    dosing: {
      basePerKg: 0.003,
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
    category: 'Weight Management',
    icon: Flame,
    color: 'orange',
    shortDesc: 'Powerful appetite control',
    longDesc: 'A dual-action medication (GIP + GLP-1) for weight management. The active ingredient in Mounjaro and Zepbound.',
    beginnerTip: 'Even more effective than Semaglutide but requires careful dose titration.',
    dosing: {
      basePerKg: 0.025,
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
    category: 'Energy & Longevity',
    icon: Zap,
    color: 'purple',
    shortDesc: 'Boosts cellular energy & anti-aging',
    longDesc: 'A coenzyme essential for cellular energy production. Declines with age, so supplementation may support vitality and longevity.',
    beginnerTip: 'May cause temporary flushing or warmth - this is normal and fades with continued use.',
    dosing: {
      basePerKg: 1.2,
      minDose: 50,
      maxDose: 200,
      ageFactors: { young: 0.8, middle: 1.0, senior: 1.2 },
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
    category: 'Skin & Hair',
    icon: Sparkles,
    color: 'pink',
    shortDesc: 'Improves skin, hair & healing',
    longDesc: 'A copper peptide that promotes collagen production, skin elasticity, and hair growth. Also supports wound healing.',
    beginnerTip: 'Can also be applied topically in serums - injection gives systemic benefits.',
    dosing: {
      basePerKg: 0.015,
      minDose: 0.5,
      maxDose: 2,
      ageFactors: { young: 0.8, middle: 1.0, senior: 1.1 },
      genderFactors: { male: 1.0, female: 1.1 },
      goalFactors: { conservative: 0.7, standard: 1.0, aggressive: 1.3 },
    },
  },
  {
    id: 'cjc1295',
    name: 'CJC-1295',
    vialSize: 2,
    typicalDose: 100,
    doseUnit: 'mcg',
    frequency: '2-3 times daily',
    category: 'Growth & Performance',
    icon: Dumbbell,
    color: 'blue',
    shortDesc: 'Stimulates natural growth hormone',
    longDesc: 'A growth hormone releasing hormone that stimulates your body to produce more HGH naturally. Supports muscle, sleep, and recovery.',
    beginnerTip: 'Best taken on an empty stomach, especially before bed for enhanced sleep.',
    dosing: {
      basePerKg: 1.0,
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
    category: 'Growth & Performance',
    icon: Dumbbell,
    color: 'blue',
    shortDesc: 'Gentle growth hormone booster',
    longDesc: 'One of the safest growth hormone peptides. Promotes muscle growth, fat loss, and better sleep without harsh side effects.',
    beginnerTip: 'Often combined with CJC-1295 for synergistic effects. Very well tolerated.',
    dosing: {
      basePerKg: 2.5,
      minDose: 100,
      maxDose: 300,
      ageFactors: { young: 1.1, middle: 1.0, senior: 0.75 },
      genderFactors: { male: 1.0, female: 0.85 },
      goalFactors: { conservative: 0.7, standard: 1.0, aggressive: 1.25 },
    },
  },
  {
    id: 'pt141',
    name: 'PT-141',
    vialSize: 10,
    typicalDose: 1.5,
    doseUnit: 'mg',
    frequency: 'As needed',
    category: 'Wellness',
    icon: Heart,
    color: 'red',
    shortDesc: 'Supports intimate wellness',
    longDesc: 'A peptide that works through the nervous system to support sexual function in both men and women.',
    beginnerTip: 'Use 45 minutes before needed. May cause temporary nausea - start with a lower dose.',
    dosing: {
      basePerKg: 0.018,
      minDose: 0.5,
      maxDose: 2,
      ageFactors: { young: 0.9, middle: 1.0, senior: 0.8 },
      genderFactors: { male: 1.0, female: 0.7 },
      goalFactors: { conservative: 0.6, standard: 1.0, aggressive: 1.2 },
    },
  },
  {
    id: 'motsc',
    name: 'MOTS-c',
    vialSize: 10,
    typicalDose: 5,
    doseUnit: 'mg',
    frequency: '3x weekly',
    category: 'Energy & Longevity',
    icon: Zap,
    color: 'purple',
    shortDesc: 'Enhances metabolism & exercise',
    longDesc: 'A mitochondrial peptide that improves how your body uses energy. Supports exercise performance and metabolic health.',
    beginnerTip: 'Great for improving exercise capacity and energy levels.',
    dosing: {
      basePerKg: 0.06,
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
    frequency: 'Daily (10-20 day cycles)',
    category: 'Energy & Longevity',
    icon: Clock,
    color: 'purple',
    shortDesc: 'Anti-aging at the cellular level',
    longDesc: 'A peptide that may support telomere health - the protective caps on your DNA associated with cellular aging.',
    beginnerTip: 'Used in cycles (10-20 days) rather than continuously. 2-3 cycles per year typical.',
    dosing: {
      basePerKg: 0.06,
      minDose: 3,
      maxDose: 10,
      ageFactors: { young: 0.7, middle: 1.0, senior: 1.2 },
      genderFactors: { male: 1.0, female: 1.0 },
      goalFactors: { conservative: 0.7, standard: 1.0, aggressive: 1.2 },
    },
  },
]

type AgeRange = 'young' | 'middle' | 'senior'
type Gender = 'male' | 'female'
type Goal = 'conservative' | 'standard' | 'aggressive'

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  'Healing & Recovery': { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  'Weight Management': { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
  'Energy & Longevity': { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
  'Skin & Hair': { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/20' },
  'Growth & Performance': { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  'Wellness': { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
}

// Tooltip component
function Tooltip({ children, content }: { children: React.ReactNode; content: string }) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative inline-flex items-center">
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(!show)}
        className="cursor-help"
      >
        {children}
      </div>
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-300 whitespace-normal w-64 z-50 shadow-xl">
          {content}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-700" />
        </div>
      )}
    </div>
  )
}

export default function CalculatorPage() {
  // Current step in the wizard
  const [currentStep, setCurrentStep] = useState(1)

  // Form state
  const [selectedPeptide, setSelectedPeptide] = useState(peptidePresets[0])
  const [peptideAmount, setPeptideAmount] = useState<string>('5')
  const [waterVolume, setWaterVolume] = useState<string>('2')
  const [desiredDose, setDesiredDose] = useState<string>('250')
  const [doseUnit, setDoseUnit] = useState<'mcg' | 'mg'>('mcg')
  const [showPresets, setShowPresets] = useState(false)
  const [copied, setCopied] = useState(false)

  // Profile state
  const [bodyWeight, setBodyWeight] = useState<string>('70')
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg')
  const [age, setAge] = useState<string>('35')
  const [gender, setGender] = useState<Gender>('male')
  const [goal, setGoal] = useState<Goal>('standard')
  const [experienceLevel, setExperienceLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner')

  // Calculate recommended dose
  const recommendedDose = useMemo(() => {
    if (!selectedPeptide.dosing || !bodyWeight || !age) return null

    const weightKg = weightUnit === 'lbs'
      ? parseFloat(bodyWeight) / 2.205
      : parseFloat(bodyWeight)
    const ageNum = parseInt(age)

    if (isNaN(weightKg) || isNaN(ageNum) || weightKg <= 0 || ageNum <= 0) return null

    const dosing = selectedPeptide.dosing

    let ageRange: AgeRange
    if (ageNum < 35) ageRange = 'young'
    else if (ageNum < 55) ageRange = 'middle'
    else ageRange = 'senior'

    let baseDose = dosing.basePerKg * weightKg
    const ageFactor = dosing.ageFactors[ageRange]
    const genderFactor = dosing.genderFactors[gender]
    const goalFactor = dosing.goalFactors[goal]

    let recDose = baseDose * ageFactor * genderFactor * goalFactor
    recDose = Math.max(dosing.minDose, Math.min(dosing.maxDose, recDose))

    if (selectedPeptide.doseUnit === 'mcg') {
      recDose = Math.round(recDose / 10) * 10
    } else {
      recDose = Math.round(recDose * 100) / 100
    }

    const typicalDose = selectedPeptide.typicalDose
    const percentDiff = ((recDose - typicalDose) / typicalDose) * 100

    return {
      dose: recDose,
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

  // Calculate injection volume
  const calculations = useMemo(() => {
    const peptideMg = parseFloat(peptideAmount) || 0
    const waterMl = parseFloat(waterVolume) || 0
    const dose = parseFloat(desiredDose) || 0

    if (peptideMg <= 0 || waterMl <= 0 || dose <= 0) return null

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
    setPeptideAmount(preset.vialSize.toString())
    setDesiredDose(preset.typicalDose.toString())
    setDoseUnit(preset.doseUnit as 'mcg' | 'mg')
    setShowPresets(false)
  }

  const handleApplyRecommendation = () => {
    if (recommendedDose) {
      setDesiredDose(recommendedDose.dose.toString())
      setDoseUnit(recommendedDose.unit as 'mcg' | 'mg')
    }
  }

  const handleReset = () => {
    setCurrentStep(1)
    setSelectedPeptide(peptidePresets[0])
    setPeptideAmount('5')
    setWaterVolume('2')
    setDesiredDose('250')
    setDoseUnit('mcg')
    setBodyWeight('70')
    setAge('35')
    setGender('male')
    setGoal('standard')
    setExperienceLevel('beginner')
  }

  const handleCopyResults = () => {
    if (!calculations) return

    const text = `My ${selectedPeptide.name} Dosage
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Dose: ${desiredDose} ${doseUnit}
Draw: ${calculations.injectionUnits.toFixed(1)} units on insulin syringe
Frequency: ${selectedPeptide.frequency}
Doses per vial: ~${Math.floor(calculations.dosesPerVial)}

Reconstitution:
${peptideAmount}mg peptide + ${waterVolume}ml water`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const steps = [
    { num: 1, title: 'About You', desc: 'Tell us about yourself' },
    { num: 2, title: 'Choose Goal', desc: 'What do you want to achieve?' },
    { num: 3, title: 'Prepare Vial', desc: 'Mix your peptide' },
    { num: 4, title: 'Your Dose', desc: 'How much to inject' },
  ]

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white">Peptide Dosage Calculator</h1>
        <p className="text-slate-400 mt-1">
          We'll guide you step-by-step to calculate your perfect dose
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {steps.map((step, index) => (
          <div key={step.num} className="flex items-center">
            <button
              onClick={() => setCurrentStep(step.num)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                currentStep === step.num
                  ? 'bg-primary-500 text-white'
                  : currentStep > step.num
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-slate-800 text-slate-500'
              }`}
            >
              {currentStep > step.num ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <span className="w-5 h-5 flex items-center justify-center text-sm font-bold">{step.num}</span>
              )}
              <span className="hidden sm:inline text-sm font-medium">{step.title}</span>
            </button>
            {index < steps.length - 1 && (
              <ChevronRight className="w-5 h-5 text-slate-600 mx-1" />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: About You */}
      {currentStep === 1 && (
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardContent className="p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-primary-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">Let's personalize your experience</h2>
              <p className="text-slate-400 mt-1">This helps us calculate the right dose for your body</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {/* Weight */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  Body Weight
                  <Tooltip content="Your dose will be calculated based on your weight. Heavier people generally need slightly higher doses.">
                    <HelpCircle className="w-4 h-4 text-slate-500" />
                  </Tooltip>
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={bodyWeight}
                    onChange={(e) => setBodyWeight(e.target.value)}
                    className="flex-1 p-3 bg-slate-900 border border-slate-700 rounded-lg text-white text-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="70"
                  />
                  <div className="flex rounded-lg border border-slate-700 overflow-hidden">
                    <button
                      onClick={() => setWeightUnit('kg')}
                      className={`px-4 py-2 transition-colors ${
                        weightUnit === 'kg' ? 'bg-primary-500 text-white' : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      kg
                    </button>
                    <button
                      onClick={() => setWeightUnit('lbs')}
                      className={`px-4 py-2 transition-colors ${
                        weightUnit === 'lbs' ? 'bg-primary-500 text-white' : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      lbs
                    </button>
                  </div>
                </div>
              </div>

              {/* Age */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  Age
                  <Tooltip content="Age affects how your body processes peptides. We'll adjust the dose accordingly.">
                    <HelpCircle className="w-4 h-4 text-slate-500" />
                  </Tooltip>
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-white text-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="35"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  Biological Sex
                  <Tooltip content="Hormonal differences affect how peptides are metabolized. This helps us fine-tune your dose.">
                    <HelpCircle className="w-4 h-4 text-slate-500" />
                  </Tooltip>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setGender('male')}
                    className={`p-3 rounded-lg border transition-all ${
                      gender === 'male'
                        ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setGender('female')}
                    className={`p-3 rounded-lg border transition-all ${
                      gender === 'female'
                        ? 'bg-pink-500/20 border-pink-500/50 text-pink-400'
                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                  Experience with Peptides
                  <Tooltip content="If you're new to peptides, we'll recommend a lower starting dose to see how your body responds.">
                    <HelpCircle className="w-4 h-4 text-slate-500" />
                  </Tooltip>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => {
                        setExperienceLevel(level)
                        setGoal(level === 'beginner' ? 'conservative' : level === 'intermediate' ? 'standard' : 'aggressive')
                      }}
                      className={`p-3 rounded-lg border transition-all text-sm capitalize ${
                        experienceLevel === level
                          ? 'bg-primary-500/20 border-primary-500/50 text-primary-400'
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'
                      }`}
                    >
                      {level === 'beginner' ? 'New to this' : level === 'intermediate' ? 'Some exp.' : 'Experienced'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <Button onClick={() => setCurrentStep(2)} className="px-8">
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Choose Goal / Peptide */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6 sm:p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-secondary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-secondary-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">What's your goal?</h2>
                <p className="text-slate-400 mt-1">Select a peptide based on what you want to achieve</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {peptidePresets.map((peptide) => {
                  const colors = categoryColors[peptide.category]
                  const IconComponent = peptide.icon
                  return (
                    <button
                      key={peptide.id}
                      onClick={() => handlePresetSelect(peptide)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        selectedPeptide.id === peptide.id
                          ? `${colors.bg} ${colors.border} ring-2 ring-offset-2 ring-offset-slate-900 ring-${peptide.color}-500`
                          : 'bg-slate-900 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center shrink-0`}>
                          <IconComponent className={`w-5 h-5 ${colors.text}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-white">{peptide.name}</h3>
                            {selectedPeptide.id === peptide.id && (
                              <CheckCircle2 className="w-4 h-4 text-primary-400" />
                            )}
                          </div>
                          <p className="text-sm text-slate-400 mb-2">{peptide.shortDesc}</p>
                          <Badge className={`${colors.bg} ${colors.text} ${colors.border} text-xs`}>
                            {peptide.category}
                          </Badge>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Selected Peptide Info */}
          <Card className={`${categoryColors[selectedPeptide.category].bg} ${categoryColors[selectedPeptide.category].border}`}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${categoryColors[selectedPeptide.category].bg} flex items-center justify-center shrink-0`}>
                  <selectedPeptide.icon className={`w-6 h-6 ${categoryColors[selectedPeptide.category].text}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{selectedPeptide.name}</h3>
                  <p className="text-slate-300 mb-3">{selectedPeptide.longDesc}</p>
                  <div className="flex items-start gap-2 p-3 bg-slate-900/50 rounded-lg">
                    <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-300">Beginner Tip</p>
                      <p className="text-sm text-slate-400">{selectedPeptide.beginnerTip}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(1)}>
              Back
            </Button>
            <Button onClick={() => setCurrentStep(3)}>
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Prepare Vial (Reconstitution) */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6 sm:p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Droplets className="w-8 h-8 text-cyan-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">Prepare Your Peptide</h2>
                <p className="text-slate-400 mt-1">
                  Peptides come as a powder. You need to mix them with sterile water before use.
                </p>
              </div>

              <div className="max-w-xl mx-auto space-y-6">
                {/* What's in your vial */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
                    <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs">1</span>
                    How much peptide is in your vial?
                    <Tooltip content="Check the label on your vial. It will say something like '5mg' or '10mg'. This is the total amount of powder in the vial.">
                      <HelpCircle className="w-4 h-4 text-slate-500" />
                    </Tooltip>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={peptideAmount}
                      onChange={(e) => setPeptideAmount(e.target.value)}
                      className="w-full p-4 pr-16 bg-slate-900 border border-slate-700 rounded-lg text-white text-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="5"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">mg</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Common sizes: 5mg, 10mg, or as shown on your {selectedPeptide.name} vial ({selectedPeptide.vialSize}mg typical)
                  </p>
                </div>

                {/* Water to add */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
                    <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs">2</span>
                    How much water will you add?
                    <Tooltip content="Use bacteriostatic water (BAC water) to mix your peptide. More water = easier to measure small doses. 2ml is a good standard.">
                      <HelpCircle className="w-4 h-4 text-slate-500" />
                    </Tooltip>
                  </label>

                  <div className="grid grid-cols-4 gap-3 mb-3">
                    {[1, 2, 3, 5].map((vol) => (
                      <button
                        key={vol}
                        onClick={() => setWaterVolume(vol.toString())}
                        className={`p-4 rounded-lg border transition-all ${
                          waterVolume === vol.toString()
                            ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                            : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'
                        }`}
                      >
                        <div className="text-2xl font-bold">{vol}</div>
                        <div className="text-xs">ml</div>
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    <p className="text-sm text-slate-400">
                      <span className="text-emerald-400 font-medium">Recommended: 2ml</span> - Easy to measure and keeps your peptide stable
                    </p>
                  </div>
                </div>

                {/* Visual Guide */}
                <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20">
                  <h3 className="font-medium text-white mb-3 flex items-center gap-2">
                    <Beaker className="w-5 h-5 text-cyan-400" />
                    Quick Mixing Guide
                  </h3>
                  <ol className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center text-xs shrink-0">1</span>
                      Draw {waterVolume}ml of bacteriostatic water into your syringe
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center text-xs shrink-0">2</span>
                      Inject the water slowly into the peptide vial (aim at the side, not directly on powder)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center text-xs shrink-0">3</span>
                      Gently swirl (don't shake!) until the powder is fully dissolved
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center text-xs shrink-0">4</span>
                      Store in the refrigerator - good for about 4 weeks
                    </li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(2)}>
              Back
            </Button>
            <Button onClick={() => setCurrentStep(4)}>
              Calculate My Dose
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Results */}
      {currentStep === 4 && (
        <div className="space-y-6">
          {/* Recommended Dose Card */}
          {recommendedDose && (
            <Card className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border-emerald-500/30">
              <CardContent className="p-6 sm:p-8">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 rounded-full text-emerald-400 text-sm mb-4">
                    <Sparkles className="w-4 h-4" />
                    Personalized for you
                  </div>

                  <h2 className="text-lg text-slate-300 mb-2">Your recommended {selectedPeptide.name} dose:</h2>

                  <div className="text-5xl sm:text-6xl font-bold text-white mb-2">
                    {recommendedDose.dose}
                    <span className="text-2xl sm:text-3xl text-slate-400 ml-2">{recommendedDose.unit}</span>
                  </div>

                  <p className="text-slate-400 mb-6">{selectedPeptide.frequency}</p>

                  <Button
                    onClick={handleApplyRecommendation}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Use This Dose
                  </Button>
                </div>

                {/* Why this dose */}
                <div className="mt-6 pt-6 border-t border-slate-700/50">
                  <p className="text-sm text-slate-400 text-center mb-3">Why this dose?</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Badge className="bg-slate-800/50 text-slate-300 border-slate-700">
                      {bodyWeight}{weightUnit} body weight
                    </Badge>
                    <Badge className="bg-slate-800/50 text-slate-300 border-slate-700">
                      Age {age}
                    </Badge>
                    <Badge className="bg-slate-800/50 text-slate-300 border-slate-700">
                      {gender === 'male' ? 'Male' : 'Female'}
                    </Badge>
                    <Badge className="bg-slate-800/50 text-slate-300 border-slate-700">
                      {experienceLevel === 'beginner' ? 'Beginner (conservative)' : experienceLevel === 'intermediate' ? 'Intermediate' : 'Experienced (aggressive)'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Manual Dose Adjustment */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <h3 className="font-medium text-white mb-4 flex items-center gap-2">
                <Syringe className="w-5 h-5 text-accent-400" />
                Adjust Dose (Optional)
              </h3>
              <div className="flex gap-3">
                <input
                  type="number"
                  value={desiredDose}
                  onChange={(e) => setDesiredDose(e.target.value)}
                  className="flex-1 p-3 bg-slate-900 border border-slate-700 rounded-lg text-white text-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <div className="flex rounded-lg border border-slate-700 overflow-hidden">
                  <button
                    onClick={() => setDoseUnit('mcg')}
                    className={`px-4 py-2 transition-colors ${
                      doseUnit === 'mcg' ? 'bg-primary-500 text-white' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    mcg
                  </button>
                  <button
                    onClick={() => setDoseUnit('mg')}
                    className={`px-4 py-2 transition-colors ${
                      doseUnit === 'mg' ? 'bg-primary-500 text-white' : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    mg
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Final Result - How much to inject */}
          {calculations && (
            <Card className="bg-gradient-to-br from-accent-500/20 to-primary-500/20 border-accent-500/30">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-accent-400" />
                    How Much to Inject
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyResults}
                    className="text-slate-400 hover:text-white"
                  >
                    {copied ? <Check className="w-4 h-4 mr-1 text-emerald-400" /> : <Copy className="w-4 h-4 mr-1" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>

                {/* Big number */}
                <div className="text-center mb-6">
                  <p className="text-slate-400 mb-2">Draw this much on your insulin syringe:</p>
                  <div className="text-6xl sm:text-7xl font-bold text-white">
                    {calculations.injectionUnits.toFixed(1)}
                  </div>
                  <p className="text-2xl text-slate-400">units</p>
                </div>

                {/* Visual syringe */}
                <div className="mb-6">
                  <div className="relative h-12 bg-slate-900 rounded-full overflow-hidden border-2 border-slate-700">
                    <div
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-accent-500 to-accent-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(calculations.injectionUnits, 100)}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-between px-4">
                      {[0, 25, 50, 75, 100].map((mark) => (
                        <div key={mark} className="flex flex-col items-center">
                          <div className="w-0.5 h-4 bg-slate-600" />
                          <span className="text-xs text-slate-500 mt-1">{mark}</span>
                        </div>
                      ))}
                    </div>
                    {/* Marker for injection point */}
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
                      style={{ left: `${Math.min(calculations.injectionUnits, 100)}%` }}
                    />
                  </div>
                  <p className="text-center text-sm text-slate-400 mt-3">
                    Fill your syringe to the <span className="text-accent-400 font-semibold">{calculations.injectionUnits.toFixed(1)}</span> mark
                  </p>
                </div>

                {/* Additional info */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-900/50 rounded-xl text-center">
                    <p className="text-sm text-slate-400 mb-1">In milliliters</p>
                    <p className="text-xl font-semibold text-white">{calculations.injectionVolumeMl.toFixed(3)} ml</p>
                  </div>
                  <div className="p-4 bg-slate-900/50 rounded-xl text-center">
                    <p className="text-sm text-slate-400 mb-1">Doses in vial</p>
                    <p className="text-xl font-semibold text-white">~{Math.floor(calculations.dosesPerVial)}</p>
                  </div>
                  <div className="p-4 bg-slate-900/50 rounded-xl text-center">
                    <p className="text-sm text-slate-400 mb-1">Concentration</p>
                    <p className="text-xl font-semibold text-white">{calculations.concentrationMgMl.toFixed(1)} mg/ml</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Safety Notice */}
          <Card className="bg-amber-500/10 border-amber-500/20">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0" />
                <div>
                  <h3 className="font-medium text-amber-300 mb-2">Important Reminders</h3>
                  <ul className="space-y-2 text-sm text-amber-200/80">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      Always consult a healthcare provider before starting any peptide
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      Use a fresh needle for each injection and rotate injection sites
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      Store reconstituted peptides in the refrigerator (2-8°C)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      Start with lower doses and increase gradually based on response
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(3)}>
              Back
            </Button>
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Start Over
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
