'use client'

import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  ArrowLeft,
  Clock,
  BookOpen,
  Play,
  CheckCircle,
  Lock,
  ChevronRight,
} from 'lucide-react'
import {
  courses,
  levelColors,
  getChaptersWithLockStatus,
  calculateCourseProgress,
} from '@/data/courses'

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.id as string

  const course = courses[courseId]

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <h1 className="text-2xl font-bold text-white">Course Not Found</h1>
        <p className="text-slate-400">The course you're looking for doesn't exist.</p>
        <Button onClick={() => router.push('/dashboard/learn')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Learn
        </Button>
      </div>
    )
  }

  // Get chapters with dynamically calculated lock status
  const chaptersWithLockStatus = getChaptersWithLockStatus(course.chapters)
  const completedLessons = course.chapters.filter(c => c.completed).length
  const progress = calculateCourseProgress(course.chapters)

  // Find the next incomplete lesson (for Continue button)
  const nextLessonIndex = chaptersWithLockStatus.findIndex(c => !c.completed && !c.locked)
  const startLessonIndex = nextLessonIndex >= 0 ? nextLessonIndex : 0

  const handleChapterClick = (index: number) => {
    const chapter = chaptersWithLockStatus[index]
    if (!chapter.locked) {
      router.push(`/dashboard/learn/course/${courseId}/lesson/${index}`)
    }
  }

  const handleStartContinue = () => {
    router.push(`/dashboard/learn/course/${courseId}/lesson/${startLessonIndex}`)
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => router.push('/dashboard/learn')} className="text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Learn
      </Button>

      {/* Course Header */}
      <div className="relative h-64 rounded-xl overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Badge className={levelColors[course.level]}>{course.level}</Badge>
          <h1 className="text-3xl font-bold text-white mt-2">{course.title}</h1>
          <p className="text-slate-300 mt-2">{course.description}</p>
        </div>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Duration</p>
              <p className="font-semibold text-white">{course.duration}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary-500/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-secondary-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Lessons</p>
              <p className="font-semibold text-white">{course.lessons} chapters</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Completed</p>
              <p className="font-semibold text-white">{completedLessons}/{course.lessons}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardContent className="p-4">
            <p className="text-sm text-slate-400 mb-1">Progress</p>
            <p className="font-semibold text-white mb-2">{progress}%</p>
            <Progress value={progress} className="h-1" />
          </CardContent>
        </Card>
      </div>

      {/* Instructor */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardContent className="p-4">
          <p className="text-sm text-slate-400">Instructor</p>
          <p className="font-semibold text-white">{course.instructor}</p>
        </CardContent>
      </Card>

      {/* Chapter List */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Course Content</h2>
        <div className="space-y-2">
          {chaptersWithLockStatus.map((chapter, index) => (
            <Card
              key={index}
              onClick={() => handleChapterClick(index)}
              className={`border-slate-700/50 transition-all ${
                chapter.locked
                  ? 'bg-slate-800/30 opacity-60 cursor-not-allowed'
                  : 'cursor-pointer hover:border-primary-500/50'
              } ${
                chapter.completed
                  ? 'bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40'
                  : chapter.locked
                    ? ''
                    : 'bg-slate-800/50'
              }`}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    chapter.completed
                      ? 'bg-emerald-500/20'
                      : chapter.locked
                        ? 'bg-slate-700/50'
                        : 'bg-primary-500/20'
                  }`}>
                    {chapter.completed ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    ) : chapter.locked ? (
                      <Lock className="w-5 h-5 text-slate-500" />
                    ) : (
                      <Play className="w-5 h-5 text-primary-400" />
                    )}
                  </div>
                  <div>
                    <p className={`font-medium ${chapter.locked ? 'text-slate-500' : 'text-white'}`}>
                      {index + 1}. {chapter.title}
                    </p>
                    <p className="text-sm text-slate-400">{chapter.duration}</p>
                  </div>
                </div>
                {!chapter.locked && (
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-center pt-4">
        <Button
          size="lg"
          className="bg-primary-500 hover:bg-primary-600"
          onClick={handleStartContinue}
        >
          <Play className="w-5 h-5 mr-2" />
          {progress > 0 ? 'Continue Course' : 'Start Course'}
        </Button>
      </div>
    </div>
  )
}
