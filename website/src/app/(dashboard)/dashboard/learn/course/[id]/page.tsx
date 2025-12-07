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

// Course data (in production, fetch from API)
const courses: Record<string, {
  id: string
  title: string
  description: string
  image: string
  level: string
  duration: string
  lessons: number
  progress: number
  category: string
  instructor: string
  chapters: { title: string; duration: string; completed: boolean; locked: boolean }[]
}> = {
  '1': {
    id: '1',
    title: 'Introduction to Peptides',
    description: 'Learn the fundamentals of peptides, how they work, and their potential benefits for health optimization. This comprehensive course covers everything from basic chemistry to practical applications.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=400&fit=crop',
    level: 'Beginner',
    duration: '45 min',
    lessons: 8,
    progress: 60,
    category: 'basics',
    instructor: 'Dr. Sarah Chen',
    chapters: [
      { title: 'What are Peptides?', duration: '5 min', completed: true, locked: false },
      { title: 'How Peptides Work in the Body', duration: '7 min', completed: true, locked: false },
      { title: 'Types of Peptides', duration: '6 min', completed: true, locked: false },
      { title: 'Benefits and Applications', duration: '8 min', completed: true, locked: false },
      { title: 'Safety Considerations', duration: '5 min', completed: false, locked: false },
      { title: 'Choosing the Right Peptide', duration: '6 min', completed: false, locked: false },
      { title: 'Storage and Handling', duration: '4 min', completed: false, locked: true },
      { title: 'Getting Started Safely', duration: '4 min', completed: false, locked: true },
    ],
  },
  '2': {
    id: '2',
    title: 'Subcutaneous Injection Technique',
    description: 'Master proper injection technique with step-by-step guidance for safe and effective administration. Learn best practices from medical professionals.',
    image: 'https://images.unsplash.com/photo-1583912086096-8c60d75a53f9?w=800&h=400&fit=crop',
    level: 'Beginner',
    duration: '30 min',
    lessons: 5,
    progress: 100,
    category: 'guides',
    instructor: 'Nurse practitioner James Miller',
    chapters: [
      { title: 'Preparation and Supplies', duration: '5 min', completed: true, locked: false },
      { title: 'Choosing Injection Sites', duration: '6 min', completed: true, locked: false },
      { title: 'Step-by-Step Injection Process', duration: '8 min', completed: true, locked: false },
      { title: 'Post-Injection Care', duration: '5 min', completed: true, locked: false },
      { title: 'Common Mistakes to Avoid', duration: '6 min', completed: true, locked: false },
    ],
  },
  '3': {
    id: '3',
    title: 'Peptide Safety Protocols',
    description: 'Essential safety guidelines, storage requirements, and best practices for peptide handling. Critical knowledge for responsible use.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=400&fit=crop',
    level: 'Beginner',
    duration: '25 min',
    lessons: 6,
    progress: 0,
    category: 'safety',
    instructor: 'Dr. Michael Torres',
    chapters: [
      { title: 'Understanding Peptide Purity', duration: '4 min', completed: false, locked: false },
      { title: 'Storage Requirements', duration: '5 min', completed: false, locked: false },
      { title: 'Reconstitution Safety', duration: '5 min', completed: false, locked: true },
      { title: 'Dosing Guidelines', duration: '4 min', completed: false, locked: true },
      { title: 'Side Effects and Warning Signs', duration: '4 min', completed: false, locked: true },
      { title: 'When to Seek Medical Help', duration: '3 min', completed: false, locked: true },
    ],
  },
}

const levelColors: Record<string, string> = {
  'Beginner': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Intermediate': 'bg-secondary-500/10 text-secondary-400 border-secondary-500/20',
  'Advanced': 'bg-accent-500/10 text-accent-400 border-accent-500/20',
}

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

  const completedLessons = course.chapters.filter(c => c.completed).length

  // Find the next incomplete lesson (for Continue button)
  const nextLessonIndex = course.chapters.findIndex(c => !c.completed && !c.locked)
  const startLessonIndex = nextLessonIndex >= 0 ? nextLessonIndex : 0

  const handleChapterClick = (index: number) => {
    const chapter = course.chapters[index]
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
            <p className="font-semibold text-white mb-2">{course.progress}%</p>
            <Progress value={course.progress} className="h-1" />
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
          {course.chapters.map((chapter, index) => (
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
          {course.progress > 0 ? 'Continue Course' : 'Start Course'}
        </Button>
      </div>
    </div>
  )
}
