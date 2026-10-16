import { academics } from './academics'
import { User, GraduationCap, Briefcase, FolderKanban, Cpu, BadgeCheck, type LucideIcon } from 'lucide-react'

export interface ResumeSection { id: string; label: string; icon: LucideIcon; to: string; summary: string }
export const resumeMeta = {
  lastUpdated: 'Oct 2026',
  pages: '1',
  headline: 'B.Tech Computer Engineering student at VJTI with expertise in Full Stack Development, Data Science, and Machine Learning.',
}

export const resumeSections: ResumeSection[] = [
  { id: 'summary', label: 'Summary', icon: User, to: '/about', summary: 'Passionate student, swimmer, and explorer focused on statistics, ML, and scalable software.' },
  { id: 'education', label: 'Education', icon: GraduationCap, to: '/academics', summary: `${academics.degree} · ${academics.university}` },
  { id: 'experience', label: 'Experience', icon: Briefcase, to: '/experience', summary: 'Technovanza PR Manager & Inheritance Mentee at VJTI; Upcoming Intern at Bank of America.' },
  { id: 'projects', label: 'Projects', icon: FolderKanban, to: '/projects', summary: 'Projects and Dashboards created' },
  { id: 'skills', label: 'Skills', icon: Cpu, to: '/skills', summary: 'C/C++, Python, React, Node.js, Express, PostgreSQL, Power BI, Docker.' },
  { id: 'certs', label: 'Certifications', icon: BadgeCheck, to: '/certificates', summary: 'Certifications in Data Science, Ethical Hacking, Power BI, and Exploratory Data Analysis.' },
]
