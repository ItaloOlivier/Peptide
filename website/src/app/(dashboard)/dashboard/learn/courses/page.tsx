'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  ArrowLeft,
  Clock,
  BookOpen,
  Search,
  CheckCircle,
} from 'lucide-react'

const allCourses = [
  {
    id: '1',
    title: 'Introduction to Peptides',
    description: 'Learn the fundamentals of peptides, how they work, and their potential benefits for health optimization.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=400&fit=crop',
    level: 'Beginner',
    duration: '45 min',
    lessons: 8,
    progress: 60,
    category: 'basics',
  },
  {
    id: '2',
    title: 'Subcutaneous Injection Technique',
    description: 'Master proper injection technique with step-by-step guidance for safe and effective administration.',
    image: 'https://images.unsplash.com/photo-1583912086096-8c60d75a53f9?w=800&h=400&fit=crop',
    level: 'Beginner',
    duration: '30 min',
    lessons: 5,
    progress: 100,
    category: 'guides',
  },
  {
    id: '3',
    title: 'Peptide Safety Protocols',
    description: 'Essential safety guidelines, storage requirements, and best practices for peptide handling.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=400&fit=crop',
    level: 'Beginner',
    duration: '25 min',
    lessons: 6,
    progress: 0,
    category: 'safety',
  },
  {
    id: '4',
    title: 'Advanced Peptide Stacking',
    description: 'Learn how to safely combine peptides for synergistic effects and optimal results.',
    image: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=800&h=400&fit=crop',
    level: 'Advanced',
    duration: '60 min',
    lessons: 10,
    progress: 0,
    category: 'research',
  },
  {
    id: '5',
    title: 'Understanding GLP-1 Agonists',
    description: 'Deep dive into Semaglutide, Tirzepatide, and other GLP-1 medications for metabolic health.',
    image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=800&h=400&fit=crop',
    level: 'Intermediate',
    duration: '40 min',
    lessons: 7,
    progress: 25,
    category: 'research',
  },
  {
    id: '6',
    title: 'Healing Peptides: BPC-157 & TB-500',
    description: 'Comprehensive guide to recovery peptides, their mechanisms, and proper protocols.',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=400&fit=crop',
    level: 'Intermediate',
    duration: '35 min',
    lessons: 6,
    progress: 0,
    category: 'research',
  },
]

const levelColors: Record<string, string> = {
  'Beginner': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Intermediate': 'bg-secondary-500/10 text-secondary-400 border-secondary-500/20',
  'Advanced': 'bg-accent-500/10 text-accent-400 border-accent-500/20',
}

const categories = [
  { id: 'all', name: 'All Courses' },
  { id: 'basics', name: 'Basics' },
  { id: 'guides', name: 'How-To' },
  { id: 'safety', name: 'Safety' },
  { id: 'research', name: 'Research' },
]

export default function CoursesListPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = searchQuery === '' ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => router.push('/dashboard/learn')} className="text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Learn
      </Button>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">All Courses</h1>
        <p className="text-slate-400">Comprehensive educational content for your peptide journey</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary-500"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-slate-400">{filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found</p>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card
            key={course.id}
            className="bg-slate-800/50 border-slate-700/50 hover:border-primary-500/50 transition-all overflow-hidden group cursor-pointer"
            onClick={() => router.push(`/dashboard/learn/course/${course.id}`)}
          >
            <div className="relative h-40 bg-slate-700 overflow-hidden">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <Badge className={levelColors[course.level]}>{course.level}</Badge>
                <span className="text-sm text-white/80 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {course.duration}
                </span>
              </div>
              {course.progress === 100 && (
                <div className="absolute top-3 right-3">
                  <CheckCircle className="w-6 h-6 text-emerald-400" />
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                {course.title}
              </h3>
              <p className="text-sm text-slate-400 mb-4 line-clamp-2">{course.description}</p>
              <div>
                <div className="flex items-center justify-between text-sm text-slate-400 mb-1">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    {course.lessons} lessons
                  </span>
                  <span>{course.progress}% complete</span>
                </div>
                <Progress value={course.progress} className="h-1" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No courses found</h3>
          <p className="text-slate-400">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}
