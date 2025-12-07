'use client'

import { useState, useEffect, useCallback } from 'react'
import { courses, CourseChapter } from '@/data/courses'

// Storage key for localStorage
const STORAGE_KEY = 'peptide_course_progress'

// Type for stored progress
interface CourseProgress {
  [courseId: string]: {
    [chapterIndex: number]: boolean
  }
}

// Get initial progress from localStorage or use defaults from course data
function getInitialProgress(): CourseProgress {
  if (typeof window === 'undefined') {
    // Server-side: return defaults from course data
    const defaults: CourseProgress = {}
    Object.entries(courses).forEach(([courseId, course]) => {
      defaults[courseId] = {}
      course.chapters.forEach((chapter, index) => {
        defaults[courseId][index] = chapter.completed
      })
    })
    return defaults
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.error('Error reading course progress from localStorage:', e)
  }

  // Initialize from course data defaults
  const defaults: CourseProgress = {}
  Object.entries(courses).forEach(([courseId, course]) => {
    defaults[courseId] = {}
    course.chapters.forEach((chapter, index) => {
      defaults[courseId][index] = chapter.completed
    })
  })
  return defaults
}

// Save progress to localStorage
function saveProgress(progress: CourseProgress) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch (e) {
    console.error('Error saving course progress to localStorage:', e)
  }
}

// Hook for managing course progress
export function useCourseProgress(courseId: string) {
  const [progress, setProgress] = useState<CourseProgress>(getInitialProgress)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    setProgress(getInitialProgress())
    setIsLoaded(true)
  }, [])

  // Get chapters with completion status from state
  const getChaptersWithProgress = useCallback((): (CourseChapter & { completed: boolean; locked: boolean })[] => {
    const course = courses[courseId]
    if (!course) return []

    const courseProgress = progress[courseId] || {}

    return course.chapters.map((chapter, index) => {
      const completed = courseProgress[index] ?? chapter.completed

      // A chapter is locked if ANY previous chapter is not completed
      let locked = false
      if (index > 0) {
        for (let i = 0; i < index; i++) {
          const prevCompleted = courseProgress[i] ?? course.chapters[i].completed
          if (!prevCompleted) {
            locked = true
            break
          }
        }
      }

      return {
        ...chapter,
        completed,
        locked,
      }
    })
  }, [courseId, progress])

  // Mark a chapter as complete
  const markChapterComplete = useCallback((chapterIndex: number) => {
    setProgress((prev) => {
      const newProgress = {
        ...prev,
        [courseId]: {
          ...prev[courseId],
          [chapterIndex]: true,
        },
      }
      saveProgress(newProgress)
      return newProgress
    })
  }, [courseId])

  // Check if a specific chapter is completed
  const isChapterCompleted = useCallback((chapterIndex: number): boolean => {
    const courseProgress = progress[courseId] || {}
    const course = courses[courseId]
    if (!course) return false
    return courseProgress[chapterIndex] ?? course.chapters[chapterIndex]?.completed ?? false
  }, [courseId, progress])

  // Check if a specific chapter is locked
  const isChapterLocked = useCallback((chapterIndex: number): boolean => {
    if (chapterIndex === 0) return false
    const course = courses[courseId]
    if (!course) return true
    const courseProgress = progress[courseId] || {}

    for (let i = 0; i < chapterIndex; i++) {
      const prevCompleted = courseProgress[i] ?? course.chapters[i].completed
      if (!prevCompleted) {
        return true
      }
    }
    return false
  }, [courseId, progress])

  // Calculate overall course progress percentage
  const calculateProgress = useCallback((): number => {
    const course = courses[courseId]
    if (!course) return 0
    const courseProgress = progress[courseId] || {}

    let completedCount = 0
    course.chapters.forEach((chapter, index) => {
      const completed = courseProgress[index] ?? chapter.completed
      if (completed) completedCount++
    })

    return Math.round((completedCount / course.chapters.length) * 100)
  }, [courseId, progress])

  // Get count of completed chapters
  const getCompletedCount = useCallback((): number => {
    const course = courses[courseId]
    if (!course) return 0
    const courseProgress = progress[courseId] || {}

    let count = 0
    course.chapters.forEach((chapter, index) => {
      const completed = courseProgress[index] ?? chapter.completed
      if (completed) count++
    })
    return count
  }, [courseId, progress])

  // Reset progress for a course (for testing)
  const resetProgress = useCallback(() => {
    setProgress((prev) => {
      const newProgress = { ...prev }
      delete newProgress[courseId]
      saveProgress(newProgress)
      return newProgress
    })
  }, [courseId])

  return {
    isLoaded,
    getChaptersWithProgress,
    markChapterComplete,
    isChapterCompleted,
    isChapterLocked,
    calculateProgress,
    getCompletedCount,
    resetProgress,
  }
}
