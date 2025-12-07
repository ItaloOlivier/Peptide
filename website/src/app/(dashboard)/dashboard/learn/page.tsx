'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Search,
  BookOpen,
  Play,
  FileText,
  Shield,
  Beaker,
  Clock,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  Syringe,
  Heart,
  Brain,
  Dumbbell,
  Sparkles,
  Bell,
} from 'lucide-react'

// Educational images from Unsplash
const images = {
  peptideBasics: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=400&fit=crop',
  injectionGuide: 'https://images.unsplash.com/photo-1583912086096-8c60d75a53f9?w=800&h=400&fit=crop',
  safety: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=400&fit=crop',
  research: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=800&h=400&fit=crop',
  storage: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop',
  dosing: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=300&fit=crop',
}

const categories = [
  { id: 'all', name: 'All Topics', icon: BookOpen },
  { id: 'basics', name: 'Peptide Basics', icon: Beaker },
  { id: 'guides', name: 'How-To Guides', icon: FileText },
  { id: 'safety', name: 'Safety & Storage', icon: Shield },
  { id: 'research', name: 'Research', icon: Brain },
]

const featuredCourses = [
  {
    id: '1',
    title: 'Introduction to Peptides',
    description: 'Learn the fundamentals of peptides, how they work, and their potential benefits for health optimization.',
    image: images.peptideBasics,
    duration: '45 min',
    lessons: 8,
    level: 'Beginner',
    progress: 60,
    category: 'basics',
  },
  {
    id: '2',
    title: 'Subcutaneous Injection Technique',
    description: 'Master proper injection technique with step-by-step guidance for safe and effective administration.',
    image: images.injectionGuide,
    duration: '30 min',
    lessons: 5,
    level: 'Beginner',
    progress: 100,
    category: 'guides',
  },
  {
    id: '3',
    title: 'Peptide Safety Protocols',
    description: 'Essential safety guidelines, storage requirements, and best practices for peptide handling.',
    image: images.safety,
    duration: '25 min',
    lessons: 6,
    level: 'Beginner',
    progress: 0,
    category: 'safety',
  },
]

const peptideGuides = [
  {
    id: 'bpc157',
    name: 'BPC-157',
    category: 'Healing & Recovery',
    icon: Heart,
    description: 'Body Protection Compound - studied for tissue repair and gut health support.',
    topics: ['Mechanism of Action', 'Dosing Guidelines', 'Reconstitution', 'Storage'],
    difficulty: 'Intermediate',
  },
  {
    id: 'semaglutide',
    name: 'Semaglutide',
    category: 'Metabolic Health',
    icon: Sparkles,
    description: 'GLP-1 receptor agonist researched for metabolic and weight management.',
    topics: ['How It Works', 'Titration Protocol', 'Side Effects', 'Monitoring'],
    difficulty: 'Advanced',
  },
  {
    id: 'tb500',
    name: 'TB-500',
    category: 'Healing & Recovery',
    icon: Dumbbell,
    description: 'Thymosin Beta-4 fragment studied for muscle and tissue recovery.',
    topics: ['Overview', 'Dosing', 'Cycling', 'Stacking'],
    difficulty: 'Intermediate',
  },
  {
    id: 'ghkcu',
    name: 'GHK-Cu',
    category: 'Skin & Anti-Aging',
    icon: Sparkles,
    description: 'Copper peptide researched for skin health and collagen synthesis.',
    topics: ['Benefits', 'Application Methods', 'Dosing', 'Combinations'],
    difficulty: 'Beginner',
  },
]

const quickGuides = [
  {
    id: '1',
    title: 'How to Reconstitute Peptides',
    description: 'Step-by-step guide for properly mixing lyophilized peptides with bacteriostatic water.',
    readTime: '5 min read',
    category: 'guides',
  },
  {
    id: '2',
    title: 'Proper Storage Guidelines',
    description: 'Temperature requirements, light exposure, and shelf life for different peptide types.',
    readTime: '4 min read',
    category: 'safety',
  },
  {
    id: '3',
    title: 'Calculating Peptide Dosages',
    description: 'Learn how to calculate accurate dosages based on peptide concentration and desired dose.',
    readTime: '6 min read',
    category: 'guides',
  },
  {
    id: '4',
    title: 'Injection Site Rotation',
    description: 'Best practices for rotating injection sites to prevent tissue irritation and ensure absorption.',
    readTime: '3 min read',
    category: 'guides',
  },
  {
    id: '5',
    title: 'Understanding Peptide Purity',
    description: 'How to read lab test results and what purity levels mean for safety and efficacy.',
    readTime: '5 min read',
    category: 'safety',
  },
  {
    id: '6',
    title: 'Common Side Effects',
    description: 'What to expect, when to be concerned, and how to manage common peptide side effects.',
    readTime: '7 min read',
    category: 'safety',
  },
]

const safetyTips = [
  {
    icon: Shield,
    title: 'Always Verify Sources',
    description: 'Only purchase peptides from reputable suppliers with third-party lab testing.',
  },
  {
    icon: AlertTriangle,
    title: 'Start Low, Go Slow',
    description: 'Begin with lower doses to assess tolerance before increasing.',
  },
  {
    icon: Syringe,
    title: 'Use Sterile Technique',
    description: 'Always sanitize vials, use clean syringes, and wash hands before handling.',
  },
  {
    icon: Clock,
    title: 'Track Your Progress',
    description: 'Keep detailed logs of doses, timing, and any effects you notice.',
  },
]

const levelColors: Record<string, string> = {
  'Beginner': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Intermediate': 'bg-secondary-500/10 text-secondary-400 border-secondary-500/20',
  'Advanced': 'bg-accent-500/10 text-accent-400 border-accent-500/20',
}

export default function LearnPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [notificationRequested, setNotificationRequested] = useState(false)

  // Filter function that checks if content matches search and category
  const matchesFilters = (item: { title?: string; name?: string; description: string; category: string }) => {
    const title = item.title || item.name || ''
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch = searchQuery === '' ||
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  }

  // Filter all content sections
  const filteredCourses = featuredCourses.filter(matchesFilters)
  const filteredPeptides = peptideGuides.filter(guide => {
    const matchesCategory = selectedCategory === 'all' ||
      (selectedCategory === 'basics' && guide.difficulty === 'Beginner') ||
      (selectedCategory === 'research' && guide.difficulty === 'Advanced')
    const matchesSearch = searchQuery === '' ||
      guide.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })
  const filteredGuides = quickGuides.filter(matchesFilters)

  // Navigation handlers
  const handleCourseClick = (courseId: string) => {
    router.push(`/dashboard/learn/course/${courseId}`)
  }

  const handlePeptideClick = (peptideId: string) => {
    router.push(`/dashboard/learn/peptide/${peptideId}`)
  }

  const handleGuideClick = (guideId: string) => {
    router.push(`/dashboard/learn/guide/${guideId}`)
  }

  const handleNotifyClick = () => {
    setNotificationRequested(true)
    // In production, this would save to database/send to API
    setTimeout(() => setNotificationRequested(false), 3000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Learn</h1>
        <p className="text-slate-400">Educational resources for safe and effective peptide use</p>
      </div>

      {/* Search */}
      <div className="relative max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
        <input
          type="text"
          placeholder="Search guides, articles, videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              selectedCategory === category.id
                ? 'bg-primary-500/20 text-primary-400 border border-primary-500/50'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-primary-500/30'
            }`}
          >
            <category.icon className="w-4 h-4" />
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Featured Courses */}
      {filteredCourses.length > 0 && (
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Featured Courses</h2>
          <Button variant="ghost" size="sm" className="text-primary-400" onClick={() => router.push('/dashboard/learn/courses')}>
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="bg-slate-800/50 border-slate-700/50 hover:border-primary-500/50 transition-all overflow-hidden group cursor-pointer" onClick={() => handleCourseClick(course.id)}>
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
                  <div className="flex items-center space-x-2 text-white/80 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                {course.progress === 100 && (
                  <div className="absolute top-3 right-3">
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">{course.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">{course.lessons} lessons</span>
                    <span className="text-primary-400">{course.progress}% complete</span>
                  </div>
                  <Progress value={course.progress} className="h-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      )}

      {/* Peptide Encyclopedia */}
      {filteredPeptides.length > 0 && (
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Peptide Encyclopedia</h2>
          <Button variant="ghost" size="sm" className="text-primary-400" onClick={() => router.push('/dashboard/learn/peptides')}>
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPeptides.map((peptide) => (
            <Card key={peptide.id} className="bg-slate-800/50 border-slate-700/50 hover:border-primary-500/50 transition-all cursor-pointer" onClick={() => handlePeptideClick(peptide.id)}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                    <peptide.icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-white">{peptide.name}</h3>
                      <Badge className={levelColors[peptide.difficulty]}>{peptide.difficulty}</Badge>
                    </div>
                    <p className="text-xs text-primary-400 mb-2">{peptide.category}</p>
                    <p className="text-sm text-slate-400 mb-3">{peptide.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {peptide.topics.map((topic) => (
                        <button
                          key={topic}
                          onClick={(e) => {
                            e.stopPropagation()
                            setSearchQuery(topic)
                          }}
                          className="text-xs px-2 py-1 bg-slate-700/50 text-slate-400 rounded hover:bg-slate-600/50 hover:text-white transition-colors"
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      )}

      {/* Safety Tips */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-4">Safety Guidelines</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {safetyTips.map((tip, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-accent-500/10 flex items-center justify-center mx-auto mb-3">
                  <tip.icon className="w-6 h-6 text-accent-400" />
                </div>
                <h3 className="font-medium text-white mb-2">{tip.title}</h3>
                <p className="text-sm text-slate-400">{tip.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Guides */}
      {filteredGuides.length > 0 && (
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Quick Guides</h2>
          <span className="text-sm text-slate-400">{filteredGuides.length} articles</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGuides.map((guide) => (
            <Card key={guide.id} className="bg-slate-800/50 border-slate-700/50 hover:border-primary-500/50 transition-all cursor-pointer group" onClick={() => handleGuideClick(guide.id)}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500/10 transition-colors">
                    <FileText className="w-5 h-5 text-slate-400 group-hover:text-primary-400 transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white mb-1 group-hover:text-primary-400 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-slate-400 mb-2 line-clamp-2">{guide.description}</p>
                    <span className="text-xs text-slate-500">{guide.readTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      )}

      {/* Video Section Teaser */}
      <section>
        <Card className="bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border-primary-500/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-full bg-primary-500/20 flex items-center justify-center">
                  <Play className="w-7 h-7 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Video Tutorials Coming Soon</h3>
                  <p className="text-slate-400">Watch step-by-step guides from experts</p>
                </div>
              </div>
              <Button
                variant="outline"
                className={`border-primary-500/50 text-primary-400 hover:bg-primary-500/10 ${notificationRequested ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : ''}`}
                onClick={handleNotifyClick}
                disabled={notificationRequested}
              >
                {notificationRequested ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    <Bell className="w-4 h-4 mr-2" />
                    Get Notified
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Disclaimer */}
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-secondary-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-white mb-1">Educational Disclaimer</h4>
              <p className="text-sm text-slate-400">
                The information provided here is for educational purposes only and is not intended as medical advice.
                Peptides are research chemicals and should only be used under proper supervision.
                Always consult with a qualified healthcare professional before starting any peptide protocol.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
