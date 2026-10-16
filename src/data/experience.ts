import { Briefcase, GraduationCap, Users, Trophy, Flag, HeartHandshake, Sparkles, Building2, type LucideIcon } from 'lucide-react'

export type ExperienceType = 'internship' | 'work' | 'college' | 'club' | 'competition' | 'leadership' | 'volunteering' | 'other'
export const experienceTypes: Record<ExperienceType, { label: string; icon: LucideIcon }> = {
  internship: { label: 'Internship', icon: Building2 },
  work: { label: 'Work', icon: Briefcase },
  college: { label: 'College activity', icon: GraduationCap },
  club: { label: 'Club', icon: Users },
  competition: { label: 'Competition', icon: Trophy },
  leadership: { label: 'Leadership', icon: Flag },
  volunteering: { label: 'Volunteering', icon: HeartHandshake },
  other: { label: 'Other', icon: Sparkles },
}
export interface ExperienceEntry {
  id: string; type: ExperienceType; period: string; title: string; org: string; location: string; summary: string; bullets: string[]; tags: string[]
}

export const experience: ExperienceEntry[] = [
  {
    id: 'exp-1',
    type: 'club',
    period: 'Jan 2026 – Present',
    title: 'Public Relations Manager',
    org: 'Technovanza, VJTI',
    location: 'Mumbai, India',
    summary: "Assisted in coordinating and bringing industry professionals and speakers for guest lectures during VJTI's annual Techfest having footfall of over 4000 people.",
    bullets: [
      "Assisted in coordinating and bringing industry professionals and speakers for guest lectures during VJTI's annual Techfest having footfall of over 4000 people.",
      "Contributed to brand outreach and publicity efforts, strengthening the fest's professional presence.",
    ],
    tags: ['Public Relations', 'Event Management', 'Outreach', 'Communication'],
  },
  {
    id: 'exp-2',
    type: 'college',
    period: 'Oct 2025 – Feb 2026',
    title: 'Mentee',
    org: 'Inheritance, VJTI',
    location: 'Mumbai, India',
    summary: 'Collaborated in a mentorship program to design and develop a FullStack group project (CampusConnect).',
    bullets: [
      'Collaborated in a mentorship program to design and develop a FullStack group project (CampusConnect).',
      'Applied agile teamwork and Git version control practices in a collaborative engineering sprint.',
    ],
    tags: ['Agile', 'Teamwork', 'Git', 'Full Stack', 'Mentorship'],
  },
]
