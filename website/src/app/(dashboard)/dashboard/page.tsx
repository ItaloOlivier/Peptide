'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Syringe,
  TrendingDown,
  TrendingUp,
  Zap,
  Clock,
  Calendar,
  Plus,
  ChevronRight,
  Target,
  Flame,
  Trophy,
  Star,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Gift,
  Users,
  Crown,
  Rocket,
  PartyPopper,
  Moon,
} from 'lucide-react'
import {
  LogInjectionModal,
  LogWeightModal,
  LogEnergyModal,
  LogSleepModal,
} from '@/components/dashboard/modals'

// Import gamification config
import {
  CELEBRATION_MILESTONES,
  getStreakMessage as getConfigStreakMessage,
  ACHIEVEMENTS,
  getUserLevel,
  URGENCY_THRESHOLDS,
  getUrgencyLevel,
  WEIGHT_MILESTONES,
  getMilestoneLabel,
  getRandomQuote,
  getDailyTip,
} from '@/config/gamification'

// Mock data - in production, fetch from database
const mockData = {
  user: {
    name: 'Demo User',
    startDate: '2024-10-15',
    currentStreak: 12,
    longestStreak: 18,
    totalInjections: 47,
    xp: 2340,
  },
  activeProtocol: {
    name: 'Weight Loss Stack',
    peptides: ['Semaglutide', 'BPC-157'],
    progress: 35,
    daysRemaining: 42,
    startWeight: 195,
    currentWeight: 185.2,
    goalWeight: 175,
    weeklyLossRate: 1.5, // lbs per week for projection calculation
  },
  nextInjection: {
    peptide: 'Semaglutide',
    dosage: '0.5mg',
    timeUntil: '2h 30m',
    site: 'Abdomen - Left',
  },
  weeklyStats: {
    weight: { value: -2.3, unit: 'lbs', trend: 'down' },
    energy: { value: 7.5, max: 10, improvement: 15 },
    injections: { completed: 5, total: 6 },
  },
  recentLogs: [
    { type: 'injection', peptide: 'BPC-157', dosage: '250mcg', time: '2 hours ago' },
    { type: 'weight', value: '185.2 lbs', time: '6 hours ago' },
    { type: 'injection', peptide: 'Semaglutide', dosage: '0.5mg', time: 'Yesterday' },
  ],
  communityStats: {
    activeUsers: 2847,
    totalWeightLost: 12450,
    avgEnergyIncrease: 34,
  },
}

// Helper: Parse time string like "2h 30m" to minutes
function parseTimeToMinutes(timeStr: string): number {
  const hourMatch = timeStr.match(/(\d+)h/)
  const minMatch = timeStr.match(/(\d+)m/)
  const hours = hourMatch ? parseInt(hourMatch[1]) : 0
  const minutes = minMatch ? parseInt(minMatch[1]) : 0
  return hours * 60 + minutes
}

// Helper: Check if injection is urgent using config thresholds
function isInjectionUrgent(timeUntil: string): boolean {
  const minutes = parseTimeToMinutes(timeUntil)
  return getUrgencyLevel(minutes) === 'urgent'
}

// Helper: Calculate milestones dynamically using config
function calculateMilestones(startWeight: number, currentWeight: number, goalWeight: number) {
  const totalToLose = startWeight - goalWeight

  return WEIGHT_MILESTONES.map((step, index) => {
    const targetWeight = startWeight - (totalToLose * step)
    const label = getMilestoneLabel(step, totalToLose)
    const reached = currentWeight <= targetWeight
    return { weight: targetWeight, label, reached }
  })
}

// Helper: Calculate achievements with dynamic progress using config
function calculateAchievements(
  currentStreak: number,
  weightLost: number,
  totalInjections: number
) {
  // Get first 4 achievements for display (mix of types)
  const displayAchievements = ACHIEVEMENTS.filter(a =>
    a.id === 'streak_7' ||
    a.id === 'streak_10' ||
    a.id === 'weight_5' ||
    a.id === 'streak_30'
  )

  return displayAchievements.map(def => {
    let earned = false
    let progress: number | undefined = undefined
    let currentValue = 0

    switch (def.type) {
      case 'streak':
        currentValue = currentStreak
        break
      case 'weight':
        currentValue = weightLost
        break
      case 'injection_count':
        currentValue = totalInjections
        break
    }

    earned = currentValue >= def.target
    if (!earned) {
      progress = Math.min(100, Math.round((currentValue / def.target) * 100))
    }

    return {
      id: def.id,
      name: def.name,
      icon: def.icon,
      earned,
      progress,
    }
  })
}

// Helper: Calculate projected weeks to goal
function calculateProjectedWeeks(currentWeight: number, goalWeight: number, weeklyLossRate: number): number {
  const remainingToLose = currentWeight - goalWeight
  if (remainingToLose <= 0 || weeklyLossRate <= 0) return 0
  return Math.ceil(remainingToLose / weeklyLossRate)
}

// Get time-based greeting
function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

// Get motivational message based on streak (using config)
function getStreakMessage(streak: number): string {
  const { emoji, message } = getConfigStreakMessage(streak)
  return `${emoji} ${message}`
}

export default function DashboardPage() {
  const router = useRouter()
  const [isInjectionModalOpen, setIsInjectionModalOpen] = useState(false)
  const [isWeightModalOpen, setIsWeightModalOpen] = useState(false)
  const [isEnergyModalOpen, setIsEnergyModalOpen] = useState(false)
  const [isSleepModalOpen, setIsSleepModalOpen] = useState(false)
  const [prefilledPeptide, setPrefilledPeptide] = useState<string | undefined>()
  const [quote] = useState(() => getRandomQuote())
  const [showCelebration, setShowCelebration] = useState(false)

  // Get user level from config
  const userLevel = getUserLevel(mockData.user.xp)

  // Get daily tip from config
  const dailyTip = getDailyTip()

  // Show celebration animation on first load if streak milestone (using config)
  useEffect(() => {
    if (CELEBRATION_MILESTONES.includes(mockData.user.currentStreak as typeof CELEBRATION_MILESTONES[number])) {
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 3000)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogInjection = (peptide?: string) => {
    setPrefilledPeptide(peptide)
    setIsInjectionModalOpen(true)
  }

  // Calculate weight loss progress (capped at 100%)
  const rawWeightLossProgress = ((mockData.activeProtocol.startWeight - mockData.activeProtocol.currentWeight) /
    (mockData.activeProtocol.startWeight - mockData.activeProtocol.goalWeight)) * 100
  const weightLossProgress = Math.min(100, Math.max(0, rawWeightLossProgress))

  // Calculate weight lost for achievements
  const weightLost = mockData.activeProtocol.startWeight - mockData.activeProtocol.currentWeight

  // Calculate dynamic milestones
  const milestones = calculateMilestones(
    mockData.activeProtocol.startWeight,
    mockData.activeProtocol.currentWeight,
    mockData.activeProtocol.goalWeight
  )

  // Calculate achievements with dynamic progress
  const achievements = calculateAchievements(
    mockData.user.currentStreak,
    weightLost,
    mockData.user.totalInjections
  )

  // Calculate if next injection is urgent
  const isNextInjectionUrgent = isInjectionUrgent(mockData.nextInjection.timeUntil)

  // Calculate projected weeks to goal
  const projectedWeeks = calculateProjectedWeeks(
    mockData.activeProtocol.currentWeight,
    mockData.activeProtocol.goalWeight,
    mockData.activeProtocol.weeklyLossRate
  )

  // XP progress from config-based level calculation
  const xpProgress = userLevel.progress
  const xpToNextLevel = userLevel.xpToNextLevel

  return (
    <>
      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="text-center animate-bounce">
            <PartyPopper className="w-24 h-24 text-secondary-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-white mb-2">Amazing!</h2>
            <p className="text-xl text-secondary-400">{mockData.user.currentStreak} Day Streak! 🎉</p>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Hero Welcome Section - Emotional Connection */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 p-6 sm:p-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-white/20 text-white border-white/30">
                    <Crown className="w-3 h-3 mr-1" />
                    {userLevel.name}
                  </Badge>
                  <Badge className="bg-secondary-400/20 text-secondary-200 border-secondary-400/30">
                    {mockData.user.xp} XP
                  </Badge>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  {getGreeting()}, {mockData.user.name.split(' ')[0]}! ✨
                </h1>
                <p className="text-primary-100 text-lg">
                  {getStreakMessage(mockData.user.currentStreak)}
                </p>
              </div>

              {/* Streak Counter - Gamification Hook */}
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="relative">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border-4 border-secondary-400">
                      <div>
                        <Flame className="w-6 h-6 text-secondary-300 mx-auto" />
                        <span className="text-2xl sm:text-3xl font-bold text-white">{mockData.user.currentStreak}</span>
                      </div>
                    </div>
                    {mockData.user.currentStreak >= 7 && (
                      <div className="absolute -top-1 -right-1 w-8 h-8 bg-secondary-400 rounded-full flex items-center justify-center animate-pulse">
                        <Star className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-primary-100 mt-2">Day Streak</p>
                </div>

                <Button
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-primary-50 shadow-lg"
                  onClick={() => handleLogInjection()}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Log Injection
                </Button>
              </div>
            </div>

            {/* Motivational Quote */}
            <div className="mt-6 p-4 bg-white/10 backdrop-blur rounded-xl border border-white/20">
              <p className="text-white/90 italic">"{quote.text}"</p>
              <p className="text-primary-200 text-sm mt-1">— {quote.author}</p>
            </div>
          </div>
        </div>

        {/* Urgent Action Card - Loss Aversion Hook */}
        {isNextInjectionUrgent && (
          <Card className="bg-gradient-to-r from-accent-500/20 to-accent-600/10 border-accent-500/50 animate-pulse-subtle">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 bg-accent-500/20 rounded-full flex items-center justify-center">
                      <Clock className="w-7 h-7 text-accent-400" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">!</span>
                    </span>
                  </div>
                  <div>
                    <p className="text-accent-300 font-medium text-sm">Upcoming injection reminder</p>
                    <p className="text-white text-lg font-semibold">
                      {mockData.nextInjection.peptide} due in {mockData.nextInjection.timeUntil}
                    </p>
                    <p className="text-slate-400 text-sm">
                      {mockData.nextInjection.dosage} • {mockData.nextInjection.site}
                    </p>
                  </div>
                </div>
                <Button
                  className="bg-accent-500 hover:bg-accent-600 text-white shadow-lg shadow-accent-500/25"
                  onClick={() => handleLogInjection(mockData.nextInjection.peptide)}
                >
                  <Syringe className="w-4 h-4 mr-2" />
                  Log Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress & Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Weight Progress - Visual Goal */}
          <Card className="bg-slate-800/50 border-slate-700/50 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-emerald-400" />
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  {mockData.weeklyStats.weight.value} {mockData.weeklyStats.weight.unit}
                </Badge>
              </div>
              <p className="text-sm text-slate-400 mb-1">Weight Loss Journey</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white">{mockData.activeProtocol.currentWeight}</span>
                <span className="text-slate-500">/ {mockData.activeProtocol.goalWeight} lbs goal</span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Start: {mockData.activeProtocol.startWeight} lbs</span>
                  <span>{weightLossProgress.toFixed(0)}% to goal</span>
                </div>
                <Progress value={weightLossProgress} variant="success" size="sm" />
              </div>
              {/* Milestone dots */}
              <div className="flex justify-between mt-3">
                {milestones.map((milestone, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${
                      milestone.reached ? 'bg-emerald-400' : 'bg-slate-600'
                    }`} />
                    <span className="text-xs text-slate-500 mt-1">{milestone.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Energy Level */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-secondary-500/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-secondary-400" />
                </div>
                <Badge className="bg-secondary-500/10 text-secondary-400 border-secondary-500/20">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +{mockData.weeklyStats.energy.improvement}%
                </Badge>
              </div>
              <p className="text-sm text-slate-400 mb-1">Energy Level</p>
              <p className="text-2xl font-bold text-white">
                {mockData.weeklyStats.energy.value}
                <span className="text-lg text-slate-500">/{mockData.weeklyStats.energy.max}</span>
              </p>
              <Progress
                value={mockData.weeklyStats.energy.value}
                max={mockData.weeklyStats.energy.max}
                variant="warning"
                size="sm"
                className="mt-3"
              />
              <p className="text-xs text-secondary-400 mt-2">
                ⚡ Your energy is {mockData.weeklyStats.energy.improvement}% higher than last week!
              </p>
            </CardContent>
          </Card>

          {/* Weekly Injections */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-primary-500/10 rounded-lg flex items-center justify-center">
                  <Syringe className="w-5 h-5 text-primary-400" />
                </div>
                {mockData.weeklyStats.injections.completed === mockData.weeklyStats.injections.total && (
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Complete!
                  </Badge>
                )}
              </div>
              <p className="text-sm text-slate-400 mb-1">This Week's Injections</p>
              <p className="text-2xl font-bold text-white">
                {mockData.weeklyStats.injections.completed}
                <span className="text-lg text-slate-500">/{mockData.weeklyStats.injections.total}</span>
              </p>
              <Progress
                value={mockData.weeklyStats.injections.completed}
                max={mockData.weeklyStats.injections.total}
                size="sm"
                className="mt-3"
              />
              <p className="text-xs text-slate-400 mt-2">
                {mockData.weeklyStats.injections.total - mockData.weeklyStats.injections.completed === 0
                  ? '🎉 All done this week!'
                  : `${mockData.weeklyStats.injections.total - mockData.weeklyStats.injections.completed} more to go!`}
              </p>
            </CardContent>
          </Card>

          {/* XP Progress - Gamification */}
          <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-purple-400" />
                </div>
                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {xpProgress >= 90 ? 'Almost There!' : xpProgress >= 50 ? 'Halfway!' : 'Keep Going!'}
                </Badge>
              </div>
              <p className="text-sm text-slate-400 mb-1">Experience Points</p>
              <p className="text-2xl font-bold text-white">
                {mockData.user.xp}
                <span className="text-lg text-slate-500">/{userLevel.maxXp} XP</span>
              </p>
              <Progress
                value={xpProgress}
                size="sm"
                className="mt-3"
              />
              <p className="text-xs text-purple-400 mt-2">
                🎮 {xpToNextLevel} XP to next level!
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Achievements Row - Dopamine Triggers */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-secondary-400" />
              <CardTitle className="text-lg">Your Achievements</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={() => router.push('/dashboard/achievements')}>
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`relative p-4 rounded-xl text-center transition-all ${
                    achievement.earned
                      ? 'bg-gradient-to-br from-secondary-500/20 to-amber-500/20 border border-secondary-500/30'
                      : 'bg-slate-700/50 border border-slate-600/50 opacity-60'
                  }`}
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <p className={`text-sm font-medium ${achievement.earned ? 'text-white' : 'text-slate-400'}`}>
                    {achievement.name}
                  </p>
                  {!achievement.earned && achievement.progress && (
                    <div className="mt-2">
                      <Progress value={achievement.progress} size="sm" />
                      <p className="text-xs text-slate-500 mt-1">{achievement.progress}%</p>
                    </div>
                  )}
                  {achievement.earned && (
                    <div className="absolute -top-2 -right-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Protocol - Enhanced */}
          <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary-400" />
                <CardTitle className="text-lg">Active Protocol</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/dashboard/protocols')}
              >
                View Details
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{mockData.activeProtocol.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    {mockData.activeProtocol.peptides.map((peptide) => (
                      <Badge key={peptide} variant="outline">
                        {peptide}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-slate-400">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="text-sm">{mockData.activeProtocol.daysRemaining} days left</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-400">Protocol Progress</span>
                  <span className="text-sm font-medium text-white">{mockData.activeProtocol.progress}%</span>
                </div>
                <Progress value={mockData.activeProtocol.progress} size="md" />
              </div>

              {/* Projected Results - Future Self Visualization */}
              <div className="mt-6 p-4 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-xl border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <Rocket className="w-5 h-5 text-emerald-400" />
                  <span className="font-medium text-emerald-400">Projected Results</span>
                </div>
                <p className="text-slate-300">
                  {projectedWeeks > 0 ? (
                    <>At your current pace, you'll reach <span className="text-emerald-400 font-semibold">{mockData.activeProtocol.goalWeight} lbs</span> in approximately <span className="text-emerald-400 font-semibold">{projectedWeeks} week{projectedWeeks !== 1 ? 's' : ''}</span>. Keep it up!</>
                  ) : (
                    <>Congratulations! You've reached your goal of <span className="text-emerald-400 font-semibold">{mockData.activeProtocol.goalWeight} lbs</span>!</>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Community Stats - Social Proof */}
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" />
                <CardTitle className="text-lg">Community Impact</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-center">
                  <p className="text-3xl font-bold text-cyan-400">{mockData.communityStats.activeUsers.toLocaleString()}</p>
                  <p className="text-sm text-slate-400">Active Members</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-700/50 rounded-lg text-center">
                    <p className="text-xl font-bold text-emerald-400">{mockData.communityStats.totalWeightLost.toLocaleString()}</p>
                    <p className="text-xs text-slate-400">lbs Lost Together</p>
                  </div>
                  <div className="p-3 bg-slate-700/50 rounded-lg text-center">
                    <p className="text-xl font-bold text-secondary-400">+{mockData.communityStats.avgEnergyIncrease}%</p>
                    <p className="text-xs text-slate-400">Avg Energy Boost</p>
                  </div>
                </div>
                <p className="text-sm text-center text-slate-400 italic">
                  "You're part of something bigger. Together, we're transforming lives."
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/dashboard/activity')}
            >
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {mockData.recentLogs.map((log, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 rounded-full"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      log.type === 'injection'
                        ? 'bg-accent-500/20'
                        : 'bg-primary-500/20'
                    }`}
                  >
                    {log.type === 'injection' ? (
                      <Syringe className="w-3 h-3 text-accent-400" />
                    ) : (
                      <Target className="w-3 h-3 text-primary-400" />
                    )}
                  </div>
                  <span className="text-sm text-white">
                    {log.type === 'injection'
                      ? `${log.peptide} ${log.dosage}`
                      : `${log.value}`}
                  </span>
                  <span className="text-xs text-slate-500">{log.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions - Simplified & Motivational */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Button
            variant="outline"
            className="h-auto py-6 flex-col bg-slate-800/50 border-slate-700/50 hover:bg-primary-500/10 hover:border-primary-500/50 group"
            onClick={() => handleLogInjection()}
          >
            <div className="w-12 h-12 bg-primary-500/10 rounded-full flex items-center justify-center mb-2 group-hover:bg-primary-500/20 transition-colors">
              <Syringe className="w-6 h-6 text-primary-400" />
            </div>
            <span className="font-medium">Log Injection</span>
            <span className="text-xs text-slate-500">+50 XP</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-6 flex-col bg-slate-800/50 border-slate-700/50 hover:bg-emerald-500/10 hover:border-emerald-500/50 group"
            onClick={() => setIsWeightModalOpen(true)}
          >
            <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mb-2 group-hover:bg-emerald-500/20 transition-colors">
              <Target className="w-6 h-6 text-emerald-400" />
            </div>
            <span className="font-medium">Log Weight</span>
            <span className="text-xs text-slate-500">+25 XP</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-6 flex-col bg-slate-800/50 border-slate-700/50 hover:bg-secondary-500/10 hover:border-secondary-500/50 group"
            onClick={() => setIsEnergyModalOpen(true)}
          >
            <div className="w-12 h-12 bg-secondary-500/10 rounded-full flex items-center justify-center mb-2 group-hover:bg-secondary-500/20 transition-colors">
              <Zap className="w-6 h-6 text-secondary-400" />
            </div>
            <span className="font-medium">Log Energy</span>
            <span className="text-xs text-slate-500">+25 XP</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-6 flex-col bg-slate-800/50 border-slate-700/50 hover:bg-indigo-500/10 hover:border-indigo-500/50 group"
            onClick={() => setIsSleepModalOpen(true)}
          >
            <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center mb-2 group-hover:bg-indigo-500/20 transition-colors">
              <Moon className="w-6 h-6 text-indigo-400" />
            </div>
            <span className="font-medium">Log Sleep</span>
            <span className="text-xs text-slate-500">+25 XP</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-6 flex-col bg-slate-800/50 border-slate-700/50 hover:bg-accent-500/10 hover:border-accent-500/50 group"
            onClick={() => router.push('/dashboard/injections')}
          >
            <div className="w-12 h-12 bg-accent-500/10 rounded-full flex items-center justify-center mb-2 group-hover:bg-accent-500/20 transition-colors">
              <Calendar className="w-6 h-6 text-accent-400" />
            </div>
            <span className="font-medium">View Calendar</span>
            <span className="text-xs text-slate-500">Plan Ahead</span>
          </Button>
        </div>

        {/* Daily Tip - Education Hook */}
        <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center shrink-0">
              <Gift className="w-6 h-6 text-amber-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-amber-300">Daily Tip</p>
              <p className="text-slate-300">{dailyTip.tip}</p>
            </div>
            <Button variant="ghost" size="sm" className="text-amber-400 shrink-0" onClick={() => router.push('/dashboard/learn')}>
              Learn More
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <LogInjectionModal
        open={isInjectionModalOpen}
        onOpenChange={setIsInjectionModalOpen}
        defaultPeptide={prefilledPeptide}
      />
      <LogWeightModal
        open={isWeightModalOpen}
        onOpenChange={setIsWeightModalOpen}
      />
      <LogEnergyModal
        open={isEnergyModalOpen}
        onOpenChange={setIsEnergyModalOpen}
      />
      <LogSleepModal
        open={isSleepModalOpen}
        onOpenChange={setIsSleepModalOpen}
      />
    </>
  )
}
