/**
 * Streak Calculation Service
 *
 * This service handles all streak-related calculations.
 * Currently uses mock data, but is designed to work with a real database.
 *
 * To integrate with a database:
 * 1. Replace the mock functions with actual database queries
 * 2. The injection log should have: { userId, peptideId, timestamp, ... }
 * 3. Streaks are calculated based on consecutive days with at least one injection
 */

// =============================================================================
// TYPES
// =============================================================================

export interface InjectionLog {
  id: string
  userId: string
  peptideId: string
  peptideName: string
  dosage: string
  site: string
  timestamp: Date
  notes?: string
}

export interface StreakData {
  currentStreak: number
  longestStreak: number
  totalInjections: number
  lastInjectionDate: Date | null
  streakStartDate: Date | null
  isActiveToday: boolean
}

export interface DailyStats {
  date: Date
  injectionCount: number
  hasInjection: boolean
}

// =============================================================================
// STREAK CALCULATION LOGIC
// =============================================================================

/**
 * Calculate streak data from a list of injection logs
 * This is the core algorithm that can work with any data source
 */
export function calculateStreakFromLogs(logs: InjectionLog[]): StreakData {
  if (logs.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      totalInjections: 0,
      lastInjectionDate: null,
      streakStartDate: null,
      isActiveToday: false,
    }
  }

  // Sort logs by timestamp descending (most recent first)
  const sortedLogs = [...logs].sort((a, b) =>
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  // Get unique days with injections
  const daysWithInjections = new Set<string>()
  sortedLogs.forEach(log => {
    const dateStr = new Date(log.timestamp).toISOString().split('T')[0]
    daysWithInjections.add(dateStr)
  })

  // Convert to sorted array (most recent first)
  const sortedDays = Array.from(daysWithInjections).sort().reverse()

  // Check if user has injection today
  const today = new Date().toISOString().split('T')[0]
  const isActiveToday = sortedDays[0] === today

  // Calculate current streak
  let currentStreak = 0
  let streakStartDate: Date | null = null
  const startCheckDate = new Date()

  // If no injection today, start checking from yesterday
  if (!isActiveToday) {
    startCheckDate.setDate(startCheckDate.getDate() - 1)
  }

  // Count consecutive days backwards
  const checkDate = new Date(startCheckDate)
  while (true) {
    const dateStr = checkDate.toISOString().split('T')[0]
    if (daysWithInjections.has(dateStr)) {
      currentStreak++
      streakStartDate = new Date(checkDate)
      checkDate.setDate(checkDate.getDate() - 1)
    } else {
      break
    }
  }

  // Calculate longest streak
  let longestStreak = 0
  let tempStreak = 0

  // Iterate through all days from earliest to latest
  const allDays = Array.from(daysWithInjections).sort()
  let prevDate: Date | null = null

  for (const dayStr of allDays) {
    const currentDate = new Date(dayStr)

    if (prevDate) {
      const diffDays = Math.round(
        (currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
      )

      if (diffDays === 1) {
        // Consecutive day
        tempStreak++
      } else {
        // Gap in days, reset streak
        longestStreak = Math.max(longestStreak, tempStreak)
        tempStreak = 1
      }
    } else {
      tempStreak = 1
    }

    prevDate = currentDate
  }

  // Final check for longest streak
  longestStreak = Math.max(longestStreak, tempStreak, currentStreak)

  return {
    currentStreak,
    longestStreak,
    totalInjections: logs.length,
    lastInjectionDate: sortedLogs[0] ? new Date(sortedLogs[0].timestamp) : null,
    streakStartDate,
    isActiveToday,
  }
}

/**
 * Get daily statistics for a date range
 */
export function getDailyStats(
  logs: InjectionLog[],
  startDate: Date,
  endDate: Date
): DailyStats[] {
  const stats: DailyStats[] = []
  const currentDate = new Date(startDate)

  // Create a map of date -> injection count
  const injectionsByDate = new Map<string, number>()
  logs.forEach(log => {
    const dateStr = new Date(log.timestamp).toISOString().split('T')[0]
    injectionsByDate.set(dateStr, (injectionsByDate.get(dateStr) || 0) + 1)
  })

  // Generate stats for each day in range
  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split('T')[0]
    const count = injectionsByDate.get(dateStr) || 0

    stats.push({
      date: new Date(currentDate),
      injectionCount: count,
      hasInjection: count > 0,
    })

    currentDate.setDate(currentDate.getDate() + 1)
  }

  return stats
}

/**
 * Calculate streak bonus XP multiplier
 * Gives bonus XP for maintaining streaks
 */
export function getStreakBonusMultiplier(currentStreak: number): number {
  // 10% bonus per 10 days, max 100% bonus
  const bonus = Math.floor(currentStreak / 10) * 0.1
  return Math.min(1 + bonus, 2) // Max 2x multiplier
}

/**
 * Check if streak is at risk (no injection today and time is running out)
 */
export function isStreakAtRisk(lastInjectionDate: Date | null): {
  atRisk: boolean
  hoursRemaining: number
} {
  if (!lastInjectionDate) {
    return { atRisk: false, hoursRemaining: 24 }
  }

  const now = new Date()
  const lastDate = new Date(lastInjectionDate)

  // Check if last injection was today
  if (lastDate.toISOString().split('T')[0] === now.toISOString().split('T')[0]) {
    return { atRisk: false, hoursRemaining: 24 }
  }

  // Calculate hours until end of day
  const endOfDay = new Date(now)
  endOfDay.setHours(23, 59, 59, 999)
  const hoursRemaining = (endOfDay.getTime() - now.getTime()) / (1000 * 60 * 60)

  // At risk if less than 4 hours remaining and no injection today
  return {
    atRisk: hoursRemaining < 4,
    hoursRemaining: Math.max(0, hoursRemaining),
  }
}

// =============================================================================
// DATABASE INTEGRATION HELPERS
// =============================================================================

/**
 * Example: Fetch injection logs from database
 * Replace this with your actual database query
 */
export async function fetchInjectionLogs(userId: string): Promise<InjectionLog[]> {
  // TODO: Replace with actual database query
  // Example with Prisma:
  // return prisma.injectionLog.findMany({
  //   where: { userId },
  //   orderBy: { timestamp: 'desc' },
  // })

  // Mock data for now
  console.warn('Using mock injection logs - replace with database query')
  return generateMockLogs(userId)
}

/**
 * Example: Get user's streak data
 * This would be called from the dashboard
 */
export async function getUserStreakData(userId: string): Promise<StreakData> {
  const logs = await fetchInjectionLogs(userId)
  return calculateStreakFromLogs(logs)
}

// =============================================================================
// MOCK DATA GENERATOR (for development)
// =============================================================================

/**
 * Generate mock injection logs for testing
 * This simulates a user with a 12-day streak
 */
function generateMockLogs(userId: string): InjectionLog[] {
  const logs: InjectionLog[] = []
  const now = new Date()

  // Generate logs for the past 12 days (simulating current streak of 12)
  for (let i = 0; i < 12; i++) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    date.setHours(9, 0, 0, 0) // 9 AM each day

    logs.push({
      id: `log-${i}`,
      userId,
      peptideId: i % 2 === 0 ? 'semaglutide' : 'bpc157',
      peptideName: i % 2 === 0 ? 'Semaglutide' : 'BPC-157',
      dosage: i % 2 === 0 ? '0.5mg' : '250mcg',
      site: ['Abdomen - Left', 'Abdomen - Right', 'Thigh - Left', 'Thigh - Right'][i % 4],
      timestamp: date,
    })
  }

  // Add some historical logs with gaps (for longest streak calculation)
  const historicalDates = [20, 21, 22, 23, 24, 25, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41]
  historicalDates.forEach((daysAgo, i) => {
    const date = new Date(now)
    date.setDate(date.getDate() - daysAgo)
    date.setHours(9, 0, 0, 0)

    logs.push({
      id: `historical-${i}`,
      userId,
      peptideId: 'bpc157',
      peptideName: 'BPC-157',
      dosage: '250mcg',
      site: 'Abdomen - Left',
      timestamp: date,
    })
  })

  return logs
}

// =============================================================================
// EXPORTS FOR TESTING
// =============================================================================

export const __test__ = {
  generateMockLogs,
}
