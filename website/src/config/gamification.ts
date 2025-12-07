/**
 * Gamification Configuration
 *
 * This file contains all configurable thresholds and settings for the
 * gamification system including streaks, achievements, XP, and levels.
 */

// =============================================================================
// STREAK CONFIGURATION
// =============================================================================

/**
 * Milestone streaks that trigger celebration animations
 * Add or remove values to customize when users see celebration overlays
 */
export const CELEBRATION_MILESTONES = [7, 14, 21, 30, 60, 90, 100, 365] as const

/**
 * Streak-based messages shown in the hero section
 * Each threshold shows the message for streaks >= that value
 */
export const STREAK_MESSAGES: { threshold: number; emoji: string; message: string }[] = [
  { threshold: 365, emoji: '🏆', message: "One year strong! You're legendary!" },
  { threshold: 100, emoji: '💎', message: "100 days! Diamond status unlocked!" },
  { threshold: 60, emoji: '🌟', message: "60 days! You're a true champion!" },
  { threshold: 30, emoji: '🏆', message: "Legendary! You're unstoppable!" },
  { threshold: 14, emoji: '🔥', message: "On fire! Two weeks strong!" },
  { threshold: 7, emoji: '⭐', message: "Amazing week! Keep the momentum!" },
  { threshold: 3, emoji: '💪', message: "Great start! Building habits!" },
  { threshold: 0, emoji: '🚀', message: "Let's begin your streak today!" },
]

/**
 * Get the appropriate streak message based on current streak
 */
export function getStreakMessage(streak: number): { emoji: string; message: string } {
  const match = STREAK_MESSAGES.find(m => streak >= m.threshold)
  return match || STREAK_MESSAGES[STREAK_MESSAGES.length - 1]
}

// =============================================================================
// ACHIEVEMENT DEFINITIONS
// =============================================================================

export type AchievementType = 'streak' | 'weight' | 'injection_count' | 'protocol_complete'

export interface AchievementDefinition {
  id: string
  name: string
  description: string
  icon: string
  type: AchievementType
  target: number // days for streak, lbs for weight, count for injections
  xpReward: number
}

/**
 * All available achievements
 * Add new achievements here - the dashboard will automatically calculate progress
 */
export const ACHIEVEMENTS: AchievementDefinition[] = [
  // Streak achievements
  { id: 'streak_7', name: 'First Week', description: 'Complete a 7-day streak', icon: '🎯', type: 'streak', target: 7, xpReward: 100 },
  { id: 'streak_10', name: '10 Day Streak', description: 'Complete a 10-day streak', icon: '🔥', type: 'streak', target: 10, xpReward: 150 },
  { id: 'streak_14', name: 'Two Week Warrior', description: 'Complete a 14-day streak', icon: '⚔️', type: 'streak', target: 14, xpReward: 200 },
  { id: 'streak_21', name: 'Habit Formed', description: 'Complete a 21-day streak', icon: '🧠', type: 'streak', target: 21, xpReward: 300 },
  { id: 'streak_30', name: '30 Day Warrior', description: 'Complete a 30-day streak', icon: '👑', type: 'streak', target: 30, xpReward: 500 },
  { id: 'streak_60', name: 'Two Month Master', description: 'Complete a 60-day streak', icon: '🌟', type: 'streak', target: 60, xpReward: 750 },
  { id: 'streak_90', name: 'Quarter Champion', description: 'Complete a 90-day streak', icon: '💎', type: 'streak', target: 90, xpReward: 1000 },
  { id: 'streak_365', name: 'Year of Dedication', description: 'Complete a 365-day streak', icon: '🏆', type: 'streak', target: 365, xpReward: 5000 },

  // Weight loss achievements (in lbs)
  { id: 'weight_5', name: '5lbs Lost', description: 'Lose 5 pounds', icon: '⚡', type: 'weight', target: 5, xpReward: 200 },
  { id: 'weight_10', name: '10lbs Lost', description: 'Lose 10 pounds', icon: '💪', type: 'weight', target: 10, xpReward: 400 },
  { id: 'weight_20', name: '20lbs Lost', description: 'Lose 20 pounds', icon: '🎯', type: 'weight', target: 20, xpReward: 800 },
  { id: 'weight_50', name: 'Transformation', description: 'Lose 50 pounds', icon: '🦋', type: 'weight', target: 50, xpReward: 2000 },

  // Injection count achievements
  { id: 'injections_10', name: 'Getting Started', description: 'Log 10 injections', icon: '💉', type: 'injection_count', target: 10, xpReward: 50 },
  { id: 'injections_50', name: 'Consistent', description: 'Log 50 injections', icon: '📊', type: 'injection_count', target: 50, xpReward: 250 },
  { id: 'injections_100', name: 'Century Club', description: 'Log 100 injections', icon: '💯', type: 'injection_count', target: 100, xpReward: 500 },
  { id: 'injections_500', name: 'Dedicated', description: 'Log 500 injections', icon: '🏅', type: 'injection_count', target: 500, xpReward: 2500 },
]

// =============================================================================
// XP & LEVEL CONFIGURATION
// =============================================================================

/**
 * XP rewards for different actions
 */
export const XP_REWARDS = {
  LOG_INJECTION: 50,
  LOG_WEIGHT: 25,
  LOG_ENERGY: 25,
  LOG_MOOD: 15,
  LOG_SLEEP: 15,
  COMPLETE_PROTOCOL: 500,
  DAILY_LOGIN: 10,
  STREAK_BONUS_MULTIPLIER: 0.1, // 10% bonus per 10 days of streak
} as const

/**
 * Level definitions with XP thresholds
 */
export const LEVELS = [
  { name: 'Newcomer', minXp: 0, maxXp: 500 },
  { name: 'Beginner', minXp: 500, maxXp: 1500 },
  { name: 'Committed', minXp: 1500, maxXp: 3000 },
  { name: 'Dedicated', minXp: 3000, maxXp: 5000 },
  { name: 'Consistent', minXp: 5000, maxXp: 8000 },
  { name: 'Expert', minXp: 8000, maxXp: 12000 },
  { name: 'Master', minXp: 12000, maxXp: 18000 },
  { name: 'Champion', minXp: 18000, maxXp: 25000 },
  { name: 'Legend', minXp: 25000, maxXp: 50000 },
  { name: 'Immortal', minXp: 50000, maxXp: Infinity },
] as const

export interface UserLevelInfo {
  name: string
  currentXp: number
  minXp: number
  maxXp: number
  progress: number
  xpToNextLevel: number
}

/**
 * Get user's current level based on XP
 */
export function getUserLevel(xp: number): UserLevelInfo {
  const level = LEVELS.find(l => xp >= l.minXp && xp < l.maxXp)
  if (!level) {
    const lastLevel = LEVELS[LEVELS.length - 1]
    return {
      name: lastLevel.name,
      currentXp: xp,
      minXp: lastLevel.minXp,
      maxXp: lastLevel.maxXp === Infinity ? xp + 1000 : lastLevel.maxXp,
      progress: 100,
      xpToNextLevel: 0,
    }
  }

  const maxXpValue = level.maxXp === Infinity ? xp + 1000 : level.maxXp
  const progress = ((xp - level.minXp) / (maxXpValue - level.minXp)) * 100
  const xpToNext = level.maxXp === Infinity ? 0 : level.maxXp - xp

  return {
    name: level.name,
    currentXp: xp,
    minXp: level.minXp,
    maxXp: maxXpValue,
    progress: Math.min(100, Math.max(0, progress)),
    xpToNextLevel: xpToNext,
  }
}

// =============================================================================
// URGENCY CONFIGURATION
// =============================================================================

/**
 * Time thresholds for injection urgency (in minutes)
 */
export const URGENCY_THRESHOLDS = {
  URGENT: 240,      // 4 hours - show urgent banner
  WARNING: 480,     // 8 hours - show warning
  UPCOMING: 1440,   // 24 hours - show reminder
} as const

/**
 * Check urgency level based on minutes until injection
 */
export function getUrgencyLevel(minutesUntil: number): 'urgent' | 'warning' | 'upcoming' | 'none' {
  if (minutesUntil <= 0) return 'none'
  if (minutesUntil <= URGENCY_THRESHOLDS.URGENT) return 'urgent'
  if (minutesUntil <= URGENCY_THRESHOLDS.WARNING) return 'warning'
  if (minutesUntil <= URGENCY_THRESHOLDS.UPCOMING) return 'upcoming'
  return 'none'
}

// =============================================================================
// MILESTONE CONFIGURATION
// =============================================================================

/**
 * Weight loss milestone percentages (of total goal)
 */
export const WEIGHT_MILESTONES = [0.25, 0.5, 0.75, 1.0] as const

/**
 * Labels for weight milestones
 */
export function getMilestoneLabel(percentage: number, totalToLose: number): string {
  if (percentage === 1) return 'Goal!'
  return `-${Math.round(totalToLose * percentage)} lbs`
}

// =============================================================================
// MOTIVATIONAL QUOTES
// =============================================================================

export const MOTIVATIONAL_QUOTES = [
  { text: "Every injection is an investment in your future self.", author: "Your Health Journey" },
  { text: "Consistency beats intensity. You're building something amazing.", author: "Wellness Wisdom" },
  { text: "Your body is responding to your commitment. Keep going!", author: "Biohacker's Creed" },
  { text: "Small daily improvements lead to stunning results.", author: "The Compound Effect" },
  { text: "The only bad workout is the one that didn't happen.", author: "Health Mindset" },
  { text: "You're not just changing your body, you're changing your life.", author: "Transformation Guide" },
  { text: "Progress, not perfection. Every step counts.", author: "Journey Philosophy" },
  { text: "Your future self will thank you for what you do today.", author: "Future You" },
] as const

/**
 * Get a random motivational quote
 */
export function getRandomQuote() {
  return MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]
}

// =============================================================================
// DAILY TIPS
// =============================================================================

export const DAILY_TIPS = [
  { tip: "Injecting in the morning can help optimize your body's natural hormone cycles. Try rotating sites: abdomen → thigh → arm.", category: "timing" },
  { tip: "Stay hydrated! Drinking plenty of water helps your body process peptides more effectively.", category: "hydration" },
  { tip: "Consistent injection timing (same time each day) can improve your results and make it easier to remember.", category: "consistency" },
  { tip: "Track your energy levels daily - small changes can reveal big patterns over time.", category: "tracking" },
  { tip: "Quality sleep amplifies the benefits of peptide therapy. Aim for 7-9 hours per night.", category: "sleep" },
  { tip: "Store your peptides properly - most should be refrigerated after reconstitution.", category: "storage" },
  { tip: "Take progress photos monthly. Visual changes often happen before scale changes.", category: "progress" },
  { tip: "Rotate injection sites to prevent tissue buildup and ensure consistent absorption.", category: "technique" },
] as const

/**
 * Get the daily tip (changes based on day of year)
 */
export function getDailyTip() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
  return DAILY_TIPS[dayOfYear % DAILY_TIPS.length]
}
