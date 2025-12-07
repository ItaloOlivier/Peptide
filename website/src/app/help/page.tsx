'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  HelpCircle,
  Search,
  Book,
  MessageCircle,
  Mail,
  Phone,
  ChevronDown,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'

const faqs = [
  {
    category: 'Getting Started',
    questions: [
      {
        question: 'How do I log my first injection?',
        answer: 'Click the "+ Log Injection" button on your dashboard or use the Quick Actions menu. Fill in the peptide name, dosage, injection site, and date/time. You can also add optional notes about how you\'re feeling.',
      },
      {
        question: 'What are protocols and how do I create one?',
        answer: 'Protocols are structured treatment plans that combine multiple peptides with specific dosing schedules. Navigate to the Protocols page and click "Create Protocol" to set up your first protocol with guidance from our system.',
      },
      {
        question: 'How do I track my progress?',
        answer: 'The dashboard provides an overview of your progress including weight changes, energy levels, and injection compliance. Use the Health Tracking page for detailed charts and trends over time.',
      },
    ],
  },
  {
    category: 'Injections & Safety',
    questions: [
      {
        question: 'What injection sites should I use?',
        answer: 'Common injection sites include the abdomen, thighs, upper arms, and buttocks. It\'s important to rotate injection sites to prevent tissue damage. The app tracks your injection sites to help with rotation.',
      },
      {
        question: 'How should I store my peptides?',
        answer: 'Most peptides should be stored in the refrigerator at 2-8°C (36-46°F). Avoid freezing and keep away from direct light. Always check the specific storage requirements for your peptide.',
      },
      {
        question: 'What if I miss a dose?',
        answer: 'If you miss a dose, take it as soon as you remember unless it\'s almost time for your next dose. Never double up doses. The app will help you track missed doses and adjust your schedule.',
      },
    ],
  },
  {
    category: 'Account & Settings',
    questions: [
      {
        question: 'How do I change my notification preferences?',
        answer: 'Go to Settings > Notification Preferences. You can customize email notifications, injection reminders, weekly reports, and protocol updates.',
      },
      {
        question: 'Can I export my data?',
        answer: 'Yes! You can export your health data and injection logs from the Health Tracking page. We support CSV and PDF formats for your records or to share with your healthcare provider.',
      },
      {
        question: 'How do I update my profile information?',
        answer: 'Navigate to Settings > Profile Information to update your name, contact details, and health metrics like weight and height.',
      },
    ],
  },
  {
    category: 'Peptides & Products',
    questions: [
      {
        question: 'Where can I purchase peptides?',
        answer: 'Visit our Shop page to browse verified peptide suppliers and products. We only list suppliers that meet our quality standards and provide third-party testing.',
      },
      {
        question: 'How do I learn about different peptides?',
        answer: 'The Learn section contains comprehensive guides about different peptides, their benefits, dosing protocols, and potential side effects. Each peptide has a detailed information page.',
      },
      {
        question: 'Are the peptides on your platform safe?',
        answer: 'We only work with verified suppliers who provide third-party testing certificates. However, always consult with a healthcare provider before starting any peptide protocol.',
      },
    ],
  },
]

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Get help via email within 24 hours',
    action: 'support@peptide.com',
    link: 'mailto:support@peptide.com',
  },
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Chat with our support team',
    action: 'Start Chat',
    link: '#',
  },
  {
    icon: Phone,
    title: 'Phone Support',
    description: 'Mon-Fri, 9am-5pm EST',
    action: '+1 (555) 123-4567',
    link: 'tel:+15551234567',
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set())

  const toggleQuestion = (questionId: string) => {
    const newExpanded = new Set(expandedQuestions)
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId)
    } else {
      newExpanded.add(questionId)
    }
    setExpandedQuestions(newExpanded)
  }

  const filteredFaqs = faqs.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <HelpCircle className="w-16 h-16 text-white mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">How can we help you?</h1>
          <p className="text-xl text-primary-100 mb-8">
            Search our knowledge base or get in touch with support
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-base bg-white border-0"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800 transition-colors">
            <CardContent className="p-6">
              <Link href="/dashboard/learn" className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Book className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Learn Center</h3>
                  <p className="text-sm text-slate-400">
                    Comprehensive guides about peptides and protocols
                  </p>
                </div>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800 transition-colors">
            <CardContent className="p-6">
              <Link href="/dashboard" className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-secondary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="w-6 h-6 text-secondary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Quick Start Guide</h3>
                  <p className="text-sm text-slate-400">
                    New to the platform? Start here for a walkthrough
                  </p>
                </div>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800 transition-colors">
            <CardContent className="p-6">
              <a href="#contact" className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-accent-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Contact Support</h3>
                  <p className="text-sm text-slate-400">
                    Get help from our support team
                  </p>
                </div>
              </a>
            </CardContent>
          </Card>
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((category, categoryIndex) => (
                <Card key={categoryIndex} className="bg-slate-800/50 border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-xl">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.questions.map((faq, faqIndex) => {
                        const questionId = `${categoryIndex}-${faqIndex}`
                        const isExpanded = expandedQuestions.has(questionId)

                        return (
                          <div
                            key={faqIndex}
                            className="border border-slate-700/50 rounded-lg overflow-hidden"
                          >
                            <button
                              onClick={() => toggleQuestion(questionId)}
                              className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-700/30 transition-colors"
                            >
                              <span className="text-white font-medium pr-4">{faq.question}</span>
                              {isExpanded ? (
                                <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                              ) : (
                                <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                              )}
                            </button>
                            {isExpanded && (
                              <div className="px-4 pb-4 text-slate-300 text-sm leading-relaxed">
                                {faq.answer}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-12 text-center">
                  <Search className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                  <p className="text-slate-400">
                    No results found for &quot;{searchQuery}&quot;
                  </p>
                  <p className="text-slate-500 text-sm mt-2">
                    Try a different search term or contact support
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Contact Support */}
        <div id="contact">
          <h2 className="text-2xl font-bold text-white mb-6">Contact Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <method.icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{method.title}</h3>
                  <p className="text-sm text-slate-400 mb-4">{method.description}</p>
                  <a
                    href={method.link}
                    className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    {method.action}
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <Card className="bg-slate-800/50 border-slate-700/50 mt-12">
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/dashboard/learn"
                className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                <span className="text-white">Peptide Encyclopedia</span>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </Link>
              <Link
                href="/dashboard/protocols"
                className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                <span className="text-white">Protocol Templates</span>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </Link>
              <Link
                href="/dashboard/shop"
                className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                <span className="text-white">Verified Suppliers</span>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </Link>
              <Link
                href="/dashboard/tracking"
                className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
              >
                <span className="text-white">Health Tracking Guide</span>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
