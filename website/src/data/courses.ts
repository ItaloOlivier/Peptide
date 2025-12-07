// Course data shared between course detail and lesson pages
// In production, this would be fetched from an API/database

export interface CourseChapter {
  title: string
  duration: string
  completed: boolean
  content: {
    type: 'text' | 'video' | 'quiz'
    data: string | { question: string; options: string[]; correct: number }
  }[]
}

export interface Course {
  id: string
  title: string
  description: string
  image: string
  level: string
  duration: string
  lessons: number
  category: string
  instructor: string
  chapters: CourseChapter[]
}

// Helper function to determine if a chapter is locked
// A chapter is locked if ANY previous chapter is incomplete
export function isChapterLocked(chapters: CourseChapter[], index: number): boolean {
  if (index === 0) return false // First chapter is never locked

  // Check if all previous chapters are completed
  for (let i = 0; i < index; i++) {
    if (!chapters[i].completed) {
      return true // Lock this chapter if any previous is incomplete
    }
  }
  return false
}

// Helper function to calculate course progress
export function calculateCourseProgress(chapters: CourseChapter[]): number {
  if (chapters.length === 0) return 0
  const completed = chapters.filter(c => c.completed).length
  return Math.round((completed / chapters.length) * 100)
}

// Helper function to get chapters with dynamic locked status
export function getChaptersWithLockStatus(chapters: CourseChapter[]): (CourseChapter & { locked: boolean })[] {
  return chapters.map((chapter, index) => ({
    ...chapter,
    locked: isChapterLocked(chapters, index)
  }))
}

export const courses: Record<string, Course> = {
  '1': {
    id: '1',
    title: 'Introduction to Peptides',
    description: 'Learn the fundamentals of peptides, how they work, and their potential benefits for health optimization. This comprehensive course covers everything from basic chemistry to practical applications.',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=400&fit=crop',
    level: 'Beginner',
    duration: '45 min',
    lessons: 8,
    category: 'basics',
    instructor: 'Dr. Sarah Chen',
    chapters: [
      {
        title: 'What are Peptides?',
        duration: '5 min',
        completed: true,
        content: [
          { type: 'text', data: 'Peptides are short chains of amino acids linked by peptide bonds. They are essentially small proteins, typically containing between 2 and 50 amino acids. Unlike larger proteins, peptides are more easily absorbed by the body due to their smaller size.' },
          { type: 'text', data: 'The term "peptide" comes from the Greek word "peptós," meaning "digested." This is fitting because peptides are formed during the digestion of proteins in the body.' },
          { type: 'text', data: 'Peptides play crucial roles in many biological functions, including acting as hormones, neurotransmitters, and growth factors. Some peptides have antimicrobial properties, while others are involved in immune responses.' },
          { type: 'text', data: 'In recent years, synthetic peptides have gained attention in medicine and wellness for their potential therapeutic applications, including tissue repair, anti-aging, and metabolic health.' },
        ],
      },
      {
        title: 'How Peptides Work in the Body',
        duration: '7 min',
        completed: true,
        content: [
          { type: 'text', data: 'Peptides work by binding to specific receptors on cell surfaces, triggering various biological responses. This is similar to how a key fits into a lock - each peptide has a specific receptor it interacts with.' },
          { type: 'text', data: 'When a peptide binds to its receptor, it initiates a cascade of cellular events. This might include activating enzymes, changing gene expression, or releasing other signaling molecules.' },
          { type: 'text', data: 'The specificity of peptide-receptor interactions is what makes peptides valuable for therapeutic applications. By designing peptides that target specific receptors, scientists can create treatments that affect only the desired biological pathways.' },
          { type: 'text', data: 'Peptides are typically administered through injection because most are broken down by digestive enzymes if taken orally. Subcutaneous injection allows the peptide to enter the bloodstream directly.' },
        ],
      },
      {
        title: 'Types of Peptides',
        duration: '6 min',
        completed: true,
        content: [
          { type: 'text', data: 'There are many categories of peptides, each with different functions:\n\n• Growth Hormone Releasing Peptides (GHRPs): Stimulate the pituitary gland to release growth hormone\n• Growth Hormone Releasing Hormones (GHRHs): Work synergistically with GHRPs\n• Healing Peptides: Such as BPC-157 and TB-500, studied for tissue repair\n• Metabolic Peptides: Like Semaglutide, used for weight management' },
          { type: 'text', data: 'Some popular peptides include:\n\n• BPC-157: Body Protection Compound, researched for gut and tissue healing\n• TB-500: Thymosin Beta-4, studied for injury recovery\n• Semaglutide: GLP-1 agonist for metabolic health\n• Ipamorelin: Growth hormone secretagogue\n• CJC-1295: Growth hormone releasing hormone analog' },
        ],
      },
      {
        title: 'Benefits and Applications',
        duration: '8 min',
        completed: true,
        content: [
          { type: 'text', data: 'Research has explored peptides for numerous applications:\n\n• Tissue Repair & Recovery: Some peptides show promise in accelerating wound healing and tissue regeneration\n• Anti-Aging: Certain peptides may support collagen production and skin health\n• Metabolic Health: GLP-1 agonists like Semaglutide are FDA-approved for weight management' },
          { type: 'text', data: '• Cognitive Function: Some peptides are being studied for neuroprotective effects\n• Muscle Growth: Growth hormone secretagogues may support lean muscle development\n• Sleep Quality: Certain peptides may help regulate sleep patterns' },
          { type: 'text', data: 'Important: While research shows promise, many peptides are still being studied. Always consult with a healthcare provider before starting any peptide protocol.' },
        ],
      },
      {
        title: 'Safety Considerations',
        duration: '5 min',
        completed: false,
        content: [
          { type: 'text', data: 'Safety should always be your top priority when considering peptides:\n\n• Source Quality: Only obtain peptides from reputable suppliers with third-party testing\n• Purity: Look for certificates of analysis (COA) showing 98%+ purity\n• Sterility: Proper handling and sterile technique prevent contamination' },
          { type: 'text', data: '• Medical Supervision: Work with a healthcare provider who understands peptide therapy\n• Start Low: Always begin with the lowest effective dose\n• Monitor: Track your response and any side effects carefully\n• Storage: Follow proper storage guidelines to maintain potency' },
          { type: 'text', data: 'Common side effects can include injection site reactions, water retention, and fatigue. More serious effects require immediate medical attention. Never self-diagnose or self-treat serious conditions.' },
        ],
      },
      {
        title: 'Choosing the Right Peptide',
        duration: '6 min',
        completed: false,
        content: [
          { type: 'text', data: 'Selecting the right peptide depends on your goals:\n\n• For tissue healing: BPC-157, TB-500\n• For weight management: Semaglutide, Tirzepatide (with prescription)\n• For anti-aging/skin: GHK-Cu\n• For growth hormone support: Ipamorelin, CJC-1295' },
          { type: 'text', data: 'Consider these factors:\n\n• Your specific health goals\n• Any contraindications or health conditions\n• Your experience level with peptides\n• Budget and availability\n• Whether you need a prescription (some peptides require it)' },
          { type: 'text', data: 'Always research thoroughly and consult with a healthcare provider before starting any peptide protocol. What works for one person may not be appropriate for another.' },
        ],
      },
      {
        title: 'Storage and Handling',
        duration: '4 min',
        completed: false,
        content: [
          { type: 'text', data: 'Proper storage is critical for maintaining peptide potency:\n\n• Unreconstituted (powder): Store in freezer for long-term, refrigerator for short-term\n• Reconstituted (mixed): Always refrigerate at 36-46°F (2-8°C)\n• Never freeze reconstituted peptides\n• Keep away from light and heat' },
          { type: 'text', data: 'Handling best practices:\n\n• Use bacteriostatic water for reconstitution\n• Clean vial tops with alcohol before piercing\n• Use sterile syringes\n• Never share needles or vials\n• Dispose of sharps properly' },
        ],
      },
      {
        title: 'Getting Started Safely',
        duration: '4 min',
        completed: false,
        content: [
          { type: 'text', data: 'Ready to start? Follow this checklist:\n\n✓ Consult with a healthcare provider\n✓ Research your chosen peptide thoroughly\n✓ Source from a reputable supplier\n✓ Gather all supplies: syringes, alcohol swabs, BAC water\n✓ Learn proper injection technique' },
          { type: 'text', data: '✓ Start with a low dose\n✓ Keep a log of doses and effects\n✓ Monitor for side effects\n✓ Schedule follow-up with your provider\n✓ Join a community for support and information sharing' },
          { type: 'text', data: 'Congratulations on completing Introduction to Peptides! You now have a foundation for understanding peptide therapy. Continue your learning journey with our other courses on injection technique and safety protocols.' },
        ],
      },
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
    category: 'guides',
    instructor: 'Nurse practitioner James Miller',
    chapters: [
      {
        title: 'Preparation and Supplies',
        duration: '5 min',
        completed: true,
        content: [
          { type: 'text', data: 'Before your first injection, gather these essential supplies:\n\n• Insulin syringes (typically 29-31 gauge, 1/2" needle)\n• Alcohol swabs\n• Bacteriostatic water (for reconstitution)\n• Your peptide vial\n• Sharps container for disposal' },
          { type: 'text', data: 'Preparation steps:\n\n1. Wash your hands thoroughly\n2. Clean your workspace\n3. Check peptide expiration date\n4. Verify your calculated dose\n5. Let refrigerated peptide reach room temperature (5-10 min)' },
        ],
      },
      {
        title: 'Choosing Injection Sites',
        duration: '6 min',
        completed: true,
        content: [
          { type: 'text', data: 'Common subcutaneous injection sites include:\n\n• Abdomen: Most popular, avoid 2" around navel\n• Thigh: Front and outer areas\n• Upper arm: Back of arm, may need assistance\n• Lower back: Fat pad area above buttocks' },
          { type: 'text', data: 'Site rotation is important:\n\n• Prevents lipodystrophy (fat tissue changes)\n• Ensures consistent absorption\n• Reduces injection site reactions\n• Create a rotation schedule and stick to it' },
        ],
      },
      {
        title: 'Step-by-Step Injection Process',
        duration: '8 min',
        completed: true,
        content: [
          { type: 'text', data: 'Follow these steps for a safe injection:\n\n1. Draw your calculated dose into the syringe\n2. Remove air bubbles by flicking the syringe\n3. Clean injection site with alcohol swab\n4. Let alcohol dry completely (30 seconds)' },
          { type: 'text', data: '5. Pinch the skin to create a fold\n6. Insert needle at 45-90° angle (depending on body fat)\n7. Release the skin pinch\n8. Inject slowly and steadily\n9. Wait 5 seconds before withdrawing\n10. Apply light pressure if needed (no rubbing)' },
        ],
      },
      {
        title: 'Post-Injection Care',
        duration: '5 min',
        completed: true,
        content: [
          { type: 'text', data: 'After your injection:\n\n• Apply gentle pressure if there\'s bleeding\n• Do not rub the injection site\n• Dispose of syringe in sharps container\n• Record the injection in your log\n• Store peptide properly' },
          { type: 'text', data: 'Watch for these normal reactions:\n\n• Slight redness at injection site\n• Minor bruising\n• Temporary itching\n\nThese usually resolve within 24-48 hours.' },
        ],
      },
      {
        title: 'Common Mistakes to Avoid',
        duration: '6 min',
        completed: true,
        content: [
          { type: 'text', data: 'Avoid these common errors:\n\n• Not letting alcohol dry before injecting\n• Injecting too quickly\n• Reusing syringes\n• Injecting into the same spot repeatedly\n• Not checking for air bubbles' },
          { type: 'text', data: '• Storing reconstituted peptide incorrectly\n• Using tap water instead of BAC water\n• Injecting cold peptide (let it warm up)\n• Panicking if you see blood (normal occasionally)\n• Skipping hand washing' },
        ],
      },
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
    category: 'safety',
    instructor: 'Dr. Michael Torres',
    chapters: [
      {
        title: 'Understanding Peptide Purity',
        duration: '4 min',
        completed: false,
        content: [
          { type: 'text', data: 'Peptide purity is measured as a percentage and indicates how much of the product is the actual peptide vs. impurities. Look for:\n\n• Minimum 98% purity for research peptides\n• 99%+ purity preferred\n• Third-party testing verification\n• Certificate of Analysis (COA) from supplier' },
        ],
      },
      {
        title: 'Storage Requirements',
        duration: '5 min',
        completed: false,
        content: [
          { type: 'text', data: 'Proper storage maintains potency:\n\n• Unreconstituted: Freezer (-20°C) for long-term, fridge for weeks\n• Reconstituted: Always refrigerate (2-8°C)\n• Protect from light\n• Keep away from heat sources\n• Use within 2-4 weeks of reconstitution' },
        ],
      },
      {
        title: 'Reconstitution Safety',
        duration: '5 min',
        completed: false,
        content: [
          { type: 'text', data: 'Safe reconstitution practices:\n\n• Use bacteriostatic water only\n• Add water slowly down vial wall\n• Never shake - gently swirl\n• Ensure complete dissolution\n• Calculate concentration accurately' },
        ],
      },
      {
        title: 'Dosing Guidelines',
        duration: '4 min',
        completed: false,
        content: [
          { type: 'text', data: 'Safe dosing principles:\n\n• Start low, go slow\n• Follow established protocols\n• Use our calculator for accuracy\n• Track all doses\n• Adjust based on response' },
        ],
      },
      {
        title: 'Side Effects and Warning Signs',
        duration: '4 min',
        completed: false,
        content: [
          { type: 'text', data: 'Know what to watch for:\n\nCommon (usually mild):\n• Injection site reactions\n• Temporary fatigue\n• Water retention\n\nSeek medical attention for:\n• Severe allergic reactions\n• Difficulty breathing\n• Chest pain\n• Severe headaches' },
        ],
      },
      {
        title: 'When to Seek Medical Help',
        duration: '3 min',
        completed: false,
        content: [
          { type: 'text', data: 'Get immediate help for:\n\n• Signs of allergic reaction (hives, swelling, difficulty breathing)\n• Chest pain or pressure\n• Severe headache\n• Vision changes\n• Signs of infection at injection site\n\nAlways err on the side of caution.' },
        ],
      },
    ],
  },
}

export const levelColors: Record<string, string> = {
  'Beginner': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Intermediate': 'bg-secondary-500/10 text-secondary-400 border-secondary-500/20',
  'Advanced': 'bg-accent-500/10 text-accent-400 border-accent-500/20',
}
