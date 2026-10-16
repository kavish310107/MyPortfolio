import { Award, Medal, GraduationCap, BadgeCheck, Milestone, Star, type LucideIcon } from 'lucide-react'

export type AchievementType = 'award' | 'competition' | 'academic' | 'certification' | 'milestone' | 'other'
export const achievementTypes: Record<AchievementType, { label: string; icon: LucideIcon }> = {
  award: { label: 'Award', icon: Award },
  competition: { label: 'Competition', icon: Medal },
  academic: { label: 'Academic', icon: GraduationCap },
  certification: { label: 'Certification', icon: BadgeCheck },
  milestone: { label: 'Milestone', icon: Milestone },
  other: { label: 'Other', icon: Star },
}
export interface Achievement {
  id: string; type: AchievementType; title: string; issuer: string; date: string; description: string; link: string; featured: boolean
}

export const achievements: Achievement[] = [
  {
    id: 'ach-1',
    type: 'milestone',
    title: 'Solved 400+ problems on LeetCode',
    issuer: 'LeetCode',
    date: '2026',
    description: 'Solved over 400 algorithmic problems across Data Structures, Algorithms, Dynamic Programming, and Graph Theory.',
    link: 'https://leetcode.com/u/KaDe3101/',
    featured: true,
  },
  {
    id: 'ach-2',
    type: 'competition',
    title: 'Smart India Hackathon Participant',
    issuer: 'Ministry of Education, Govt of India',
    date: '2025 – 2026',
    description: 'SIH 2025 & SIH 2026 Participant presenting innovative tech solutions to real-world challenges.',
    link: '',
    featured: true,
  },
  {
    id: 'ach-3',
    type: 'academic',
    title: '99.97 Percentile in MHT-CET',
    issuer: 'State Common Entrance Test Cell, Maharashtra',
    date: 'Jun 2024',
    description: 'Secured top rank across the state to obtain admission into Computer Engineering at VJTI Matunga.',
    link: '',
    featured: true,
  },
  {
    id: 'ach-4',
    type: 'academic',
    title: 'HSC Examination - 90.83%',
    issuer: 'Prakash College of Commerce and Science',
    date: 'May 2024',
    description: 'Achieved 90.83% distinction in Higher Secondary Certificate (HSC) Maharashtra State Board exams.',
    link: '',
    featured: false,
  },
]
