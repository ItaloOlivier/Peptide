'use client'

import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  Clock,
  BookOpen,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react'

// Guide data (in production, fetch from API)
const guides: Record<string, {
  id: string
  title: string
  description: string
  readTime: string
  category: string
  content: { heading: string; text: string }[]
  relatedGuides: { id: string; title: string }[]
}> = {
  'reconstitution': {
    id: 'reconstitution',
    title: 'How to Reconstitute Peptides',
    description: 'Step-by-step guide for safely preparing your peptides for injection.',
    readTime: '5 min read',
    category: 'guides',
    content: [
      {
        heading: 'What You\'ll Need',
        text: 'Before starting, gather your supplies: peptide vial, bacteriostatic water (BAC water), alcohol swabs, insulin syringe (for drawing water), and a clean work surface. Never use regular water - bacteriostatic water contains a preservative that prevents bacterial growth.',
      },
      {
        heading: 'Step 1: Clean Everything',
        text: 'Wipe the rubber stopper of both your peptide vial and BAC water vial with an alcohol swab. Allow them to air dry for a few seconds. This prevents contamination.',
      },
      {
        heading: 'Step 2: Draw the Bacteriostatic Water',
        text: 'Using a fresh syringe, draw your desired amount of BAC water. A common ratio is 2ml of water per 5mg of peptide, which makes dosing calculations easier. However, any amount works - just calculate your concentration accordingly.',
      },
      {
        heading: 'Step 3: Add Water to Peptide Vial',
        text: 'Insert the needle into the peptide vial at an angle, aiming at the glass wall. Let the water trickle down the side gently - never spray directly onto the peptide powder as this can damage it. Add water slowly.',
      },
      {
        heading: 'Step 4: Let It Dissolve',
        text: 'Do NOT shake the vial. Instead, gently swirl or simply let it sit. Most peptides dissolve within a few minutes. Some may take up to 30 minutes. The solution should become clear.',
      },
      {
        heading: 'Step 5: Store Properly',
        text: 'Once reconstituted, store your peptide in the refrigerator (not the freezer). Most reconstituted peptides remain stable for 2-4 weeks when properly stored. Label your vial with the date and concentration.',
      },
    ],
    relatedGuides: [
      { id: 'injection-sites', title: 'Best Injection Sites' },
      { id: 'storage', title: 'Proper Peptide Storage' },
    ],
  },
  'injection-sites': {
    id: 'injection-sites',
    title: 'Best Injection Sites',
    description: 'Learn the optimal injection sites and rotation techniques.',
    readTime: '4 min read',
    category: 'guides',
    content: [
      {
        heading: 'Why Site Rotation Matters',
        text: 'Rotating injection sites prevents lipodystrophy (changes in fat tissue), reduces the risk of scar tissue buildup, and ensures consistent absorption. Develop a rotation schedule and stick to it.',
      },
      {
        heading: 'Abdominal Area (Most Common)',
        text: 'The area around your belly button is the most popular subcutaneous injection site. Stay at least 2 inches away from your navel. Pinch the skin, insert at a 45-90 degree angle (depending on needle length), and inject slowly.',
      },
      {
        heading: 'Thigh (Front/Outer)',
        text: 'The front and outer thigh provides a large area for rotation. Avoid the inner thigh and areas close to the knee. This site is easy to access and generally less sensitive than the abdomen.',
      },
      {
        heading: 'Upper Arm (Back)',
        text: 'The fatty area on the back of your upper arm can be used, though it may require assistance or a mirror. Pinch the skin if you don\'t have much subcutaneous fat in this area.',
      },
      {
        heading: 'Rotation Schedule Example',
        text: 'Day 1: Left abdomen, Day 2: Right abdomen, Day 3: Left thigh, Day 4: Right thigh - then repeat. Keep a log to track your sites and avoid using the same spot within a 7-day period.',
      },
    ],
    relatedGuides: [
      { id: 'reconstitution', title: 'How to Reconstitute Peptides' },
      { id: 'dosing-basics', title: 'Understanding Dosing' },
    ],
  },
  'storage': {
    id: 'storage',
    title: 'Proper Peptide Storage',
    description: 'Essential guidelines for maintaining peptide potency and safety.',
    readTime: '3 min read',
    category: 'safety',
    content: [
      {
        heading: 'Unreconstituted (Powder) Storage',
        text: 'Lyophilized (freeze-dried) peptides are relatively stable. Store them in a cool, dark place. For long-term storage (months), keep them in the freezer. Avoid temperature fluctuations.',
      },
      {
        heading: 'Reconstituted (Mixed) Storage',
        text: 'Once mixed with bacteriostatic water, peptides MUST be refrigerated at 36-46°F (2-8°C). Never freeze reconstituted peptides as this can damage the protein structure.',
      },
      {
        heading: 'Shelf Life',
        text: 'Most reconstituted peptides remain stable for 2-4 weeks when properly refrigerated. Some (like BPC-157) may last slightly longer. When in doubt, prepare a fresh batch.',
      },
      {
        heading: 'Signs of Degradation',
        text: 'Discard any peptide that shows: cloudiness, particles floating in the solution, unusual color changes, or a bad smell. Clear solution is essential for safety.',
      },
      {
        heading: 'Travel Considerations',
        text: 'Use an insulated cooler bag with ice packs for transport. Never leave peptides in a hot car. For air travel, keep them in your carry-on with your medical supplies.',
      },
    ],
    relatedGuides: [
      { id: 'reconstitution', title: 'How to Reconstitute Peptides' },
    ],
  },
  'dosing-basics': {
    id: 'dosing-basics',
    title: 'Understanding Dosing',
    description: 'Master the basics of peptide dosing calculations and units.',
    readTime: '6 min read',
    category: 'basics',
    content: [
      {
        heading: 'Units of Measurement',
        text: 'Peptides are typically measured in micrograms (mcg) or milligrams (mg). 1mg = 1000mcg. Insulin syringes measure in "units" where 100 units = 1ml. Understanding these conversions is essential.',
      },
      {
        heading: 'Calculating Concentration',
        text: 'If you add 2ml of water to a 5mg peptide vial: 5mg ÷ 2ml = 2.5mg/ml (or 2500mcg/ml). To get a 250mcg dose: 250mcg ÷ 2500mcg/ml = 0.1ml = 10 units on an insulin syringe.',
      },
      {
        heading: 'Starting Low',
        text: 'Always start with a lower dose than recommended to assess tolerance. You can gradually increase over days or weeks. This approach helps identify any sensitivities early.',
      },
      {
        heading: 'Timing Considerations',
        text: 'Some peptides work better at specific times. For example, growth hormone secretagogues are often taken on an empty stomach before bed. Follow peptide-specific guidelines.',
      },
      {
        heading: 'Using a Calculator',
        text: 'Our built-in calculator can help you determine exact dosing. Input your vial size, water volume, and desired dose to get the precise number of units to draw.',
      },
    ],
    relatedGuides: [
      { id: 'reconstitution', title: 'How to Reconstitute Peptides' },
      { id: 'injection-sites', title: 'Best Injection Sites' },
    ],
  },
}

export default function GuideDetailPage() {
  const params = useParams()
  const router = useRouter()
  const guideId = params.id as string

  const guide = guides[guideId]

  if (!guide) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <h1 className="text-2xl font-bold text-white">Guide Not Found</h1>
        <p className="text-slate-400">The guide you're looking for doesn't exist.</p>
        <Button onClick={() => router.push('/dashboard/learn')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Learn
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => router.push('/dashboard/learn')} className="text-slate-400 hover:text-white">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Learn
      </Button>

      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <Badge className="bg-primary-500/10 text-primary-400 border-primary-500/20">
            <BookOpen className="w-3 h-3 mr-1" />
            Guide
          </Badge>
          <span className="text-sm text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {guide.readTime}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">{guide.title}</h1>
        <p className="text-lg text-slate-300">{guide.description}</p>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {guide.content.map((section, index) => (
          <Card key={index} className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-white mb-3">{section.heading}</h2>
              <p className="text-slate-300 leading-relaxed">{section.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Related Guides */}
      {guide.relatedGuides.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Related Guides</h3>
          <div className="space-y-2">
            {guide.relatedGuides.map((related) => (
              <Card
                key={related.id}
                className="bg-slate-800/50 border-slate-700/50 hover:border-primary-500/50 transition-all cursor-pointer"
                onClick={() => router.push(`/dashboard/learn/guide/${related.id}`)}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <span className="text-white">{related.title}</span>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-400">
              This guide is for educational purposes only. Always consult with a qualified healthcare professional before starting any peptide protocol.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 pt-4">
        <Button variant="outline" onClick={() => router.push('/dashboard/calculator')}>
          Use Calculator
        </Button>
        <Button className="bg-primary-500 hover:bg-primary-600" onClick={() => router.push('/dashboard/learn')}>
          More Guides
        </Button>
      </div>
    </div>
  )
}
