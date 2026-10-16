import { Home, User, GraduationCap, Cpu, FolderKanban, Briefcase, Trophy, History, PenLine, FileText, Mail, BadgeCheck, Activity, type LucideIcon } from 'lucide-react'

export interface NavItem { id: string; label: string; path: string; icon: LucideIcon; summary: string; primary: boolean }

// `primary` items sit in the dock; the rest live in the "More" menu (Hick-Hyman: fewer visible choices).
export const navItems: NavItem[] = [
  { id: 'home', label: 'Home', path: '/', icon: Home, summary: 'Profile overview and dashboard', primary: true },
  { id: 'about', label: 'About', path: '/about', icon: User, summary: 'Who I am', primary: true },
  { id: 'projects', label: 'Projects', path: '/projects', icon: FolderKanban, summary: 'Selected work', primary: true },
  { id: 'skills', label: 'Skills', path: '/skills', icon: Cpu, summary: 'Tools and capabilities', primary: true },
  { id: 'contact', label: 'Contact', path: '/contact', icon: Mail, summary: 'Get in touch', primary: true },
  { id: 'academics', label: 'Academics', path: '/academics', icon: GraduationCap, summary: 'Education and coursework', primary: false },
  { id: 'experience', label: 'Experience', path: '/experience', icon: Briefcase, summary: 'Experience and activities', primary: false },
  { id: 'achievements', label: 'Achievements', path: '/achievements', icon: Trophy, summary: 'Awards and certificates', primary: false },
  { id: 'certificates', label: 'Certificates', path: '/certificates', icon: BadgeCheck, summary: 'Credentials and training', primary: false },
  { id: 'activity', label: 'Activity', path: '/activity', icon: Activity, summary: 'Recent activity feed', primary: false },
  { id: 'timeline', label: 'Timeline', path: '/timeline', icon: History, summary: 'Career journey', primary: false },
  { id: 'blog', label: 'Blog', path: '/blog', icon: PenLine, summary: 'Writing and notes', primary: false },
  { id: 'resume', label: 'Resume', path: '/resume', icon: FileText, summary: 'Download resume', primary: false },
]

// Two-step "G then key" shortcuts (e.g. G P → Projects). Shown in the palette for recognition over recall.
export const navKeys: Record<string, string> = { home: 'h', about: 'a', projects: 'p', skills: 's', contact: 'c', academics: 'e', experience: 'x', achievements: 'v', timeline: 't', blog: 'b', resume: 'r', certificates: 'f', activity: 'y' }
