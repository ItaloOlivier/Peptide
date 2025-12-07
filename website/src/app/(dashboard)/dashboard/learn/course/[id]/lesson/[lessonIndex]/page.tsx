'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  BookOpen,
  CheckCircle,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Lock,
} from 'lucide-react'
import { courses } from '@/data/courses'
import { useCourseProgress } from '@/hooks/useCourseProgress'

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.id as string
  const lessonIndex = parseInt(params.lessonIndex as string)

  const [currentSection, setCurrentSection] = useState(0)

  const course = courses[courseId]
  const chapter = course?.chapters[lessonIndex]

  const {
    isLoaded,
    markChapterComplete,
    isChapterLocked,
    isChapterCompleted,
  } = useCourseProgress(courseId)

  if (!course || !chapter) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <h1 className="text-2xl font-bold text-white">Lesson Not Found</h1>
        <p className="text-slate-400">The lesson you're looking for doesn't exist.</p>
        <Button onClick={() => router.push(`/dashboard/learn/course/${courseId}`)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Course
        </Button>
      </div>
    )
  }

  // Show loading state until localStorage is read
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-slate-400">Loading lesson...</div>
      </div>
    )
  }

  // Check if this lesson is locked using the progress hook
  const isLocked = isChapterLocked(lessonIndex)

  if (isLocked) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <Lock className="w-16 h-16 text-slate-500" />
        <h1 className="text-2xl font-bold text-white">Lesson Locked</h1>
        <p className="text-slate-400">Complete the previous lessons to unlock this content.</p>
        <Button onClick={() => router.push(`/dashboard/learn/course/${courseId}`)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Course
        </Button>
      </div>
    )
  }

  const totalSections = chapter.content.length
  const progress = ((currentSection + 1) / totalSections) * 100
  const isLastSection = currentSection === totalSections - 1
  const isFirstSection = currentSection === 0

  // Check if next lesson exists and would be unlocked after completing this one
  const hasNextLesson = lessonIndex < course.chapters.length - 1
  const hasPrevLesson = lessonIndex > 0

  const handleNext = () => {
    if (currentSection < totalSections - 1) {
      setCurrentSection(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1)
    }
  }

  const handleComplete = () => {
    // Mark this chapter as complete in localStorage
    markChapterComplete(lessonIndex)

    // Navigate to next lesson or back to course
    if (hasNextLesson) {
      router.push(`/dashboard/learn/course/${courseId}/lesson/${lessonIndex + 1}`)
    } else {
      router.push(`/dashboard/learn/course/${courseId}`)
    }
  }

  const currentContent = chapter.content[currentSection]

  // Check if next lesson is accessible (will be unlocked after this one completes)
  const nextLessonAccessible = hasNextLesson && !isChapterLocked(lessonIndex + 1)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => router.push(`/dashboard/learn/course/${courseId}`)}
          className="text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Course
        </Button>
        <Badge className="bg-primary-500/10 text-primary-400 border-primary-500/20">
          Lesson {lessonIndex + 1} of {course.chapters.length}
        </Badge>
      </div>

      {/* Lesson Title */}
      <div>
        <p className="text-sm text-primary-400 mb-1">{course.title}</p>
        <h1 className="text-2xl font-bold text-white">{chapter.title}</h1>
        <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {chapter.duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            {totalSections} sections
          </span>
          {isChapterCompleted(lessonIndex) && (
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
              <CheckCircle className="w-3 h-3 mr-1" />
              Completed
            </Badge>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
          <span>Section {currentSection + 1} of {totalSections}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Content Area */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardContent className="p-8">
          {currentContent.type === 'text' && (
            <div className="prose prose-invert max-w-none">
              <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-line">
                {currentContent.data as string}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={isFirstSection}
          className="border-slate-700 text-slate-400 hover:text-white disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="flex gap-2">
          {chapter.content.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSection(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentSection
                  ? 'bg-primary-500 scale-125'
                  : idx < currentSection
                    ? 'bg-emerald-500'
                    : 'bg-slate-600 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

        {isLastSection ? (
          <Button
            onClick={handleComplete}
            className="bg-emerald-500 hover:bg-emerald-600"
          >
            {hasNextLesson ? (
              <>
                Complete & Next Lesson
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Complete Course
              </>
            )}
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="bg-primary-500 hover:bg-primary-600"
          >
            Next
            <ChevronRightIcon className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>

      {/* Lesson Navigation */}
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              {hasPrevLesson && (
                <button
                  onClick={() => router.push(`/dashboard/learn/course/${courseId}/lesson/${lessonIndex - 1}`)}
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  ← Previous: {course.chapters[lessonIndex - 1].title}
                </button>
              )}
            </div>
            <div>
              {hasNextLesson && nextLessonAccessible && (
                <button
                  onClick={() => router.push(`/dashboard/learn/course/${courseId}/lesson/${lessonIndex + 1}`)}
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Next: {course.chapters[lessonIndex + 1].title} →
                </button>
              )}
              {hasNextLesson && !nextLessonAccessible && (
                <span className="text-sm text-slate-500 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Next: {course.chapters[lessonIndex + 1].title}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
