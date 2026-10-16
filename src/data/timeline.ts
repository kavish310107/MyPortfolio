import { GraduationCap, Briefcase, Users, FolderKanban, Trophy, type LucideIcon } from 'lucide-react'
import { academics } from './academics'
import { experience } from './experience'
import { projects } from './projects'
import { achievements } from './achievements'

export type JourneyKind = 'education' | 'work' | 'activity' | 'project' | 'achievement'
export const journeyKinds: Record<JourneyKind, { label: string; icon: LucideIcon }> = {
  education: { label: 'Education', icon: GraduationCap },
  work: { label: 'Work', icon: Briefcase },
  activity: { label: 'Activity', icon: Users },
  project: { label: 'Project', icon: FolderKanban },
  achievement: { label: 'Achievement', icon: Trophy },
}
export interface JourneyEntry {
  id: string
  kind: JourneyKind
  period: string
  title: string
  subtitle: string
  summary: string
  to: string
  bullets?: string[]
  tags?: string[]
  sortKey?: number
}

const MONTHS: Record<string, number> = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
  jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
}

/**
 * Parses dates such as "Jan 2026", "2024", "Oct 2025 – Feb 2026", "2025 – 2026"
 * into a comparable numeric sort key in ascending chronological order (YYYYMM).
 */
export function parseDateToSortKey(str?: string): number {
  if (!str) return 0
  const clean = str.trim()
  // Match "Mon YYYY" or "YYYY" at the start
  const m = clean.match(/^([A-Za-z]{3})?\s*(\d{4})/)
  if (m) {
    const monthStr = m[1]?.toLowerCase()
    const month = monthStr && MONTHS[monthStr] ? MONTHS[monthStr] : 1
    const year = parseInt(m[2], 10)
    return year * 100 + month
  }
  // Fallback: look for any 4 digit year
  const y = clean.match(/\d{4}/)
  if (y) {
    return parseInt(y[0], 10) * 100 + 1
  }
  return 0
}

const education: JourneyEntry[] = academics.timeline.map((a) => ({
  id: `jr-${a.id}`,
  kind: 'education',
  period: a.period,
  title: a.title,
  subtitle: academics.university,
  summary: a.note,
  to: '/academics',
  sortKey: parseDateToSortKey(a.period),
}))

const roles: JourneyEntry[] = experience.map((x) => ({
  id: `jr-${x.id}`,
  kind: x.type === 'internship' || x.type === 'work' ? 'work' : 'activity',
  period: x.period,
  title: x.title,
  subtitle: `${x.org} · ${x.location}`,
  summary: x.summary,
  to: `/experience?focus=${x.id}`,
  bullets: x.bullets,
  tags: x.tags,
  sortKey: parseDateToSortKey(x.period),
}))

const built: JourneyEntry[] = projects
  .filter((p) => p.status !== 'planned')
  .map((p) => ({
    id: `jr-${p.id}`,
    kind: 'project',
    period: p.year,
    title: p.title,
    subtitle: `${p.category} · ${p.role}`,
    summary: p.description,
    to: `/projects?p=${p.id}`,
    tags: p.tech,
    sortKey: parseDateToSortKey(p.year),
  }))

const won: JourneyEntry[] = achievements
  .filter((a) => a.featured)
  .map((a) => ({
    id: `jr-${a.id}`,
    kind: 'achievement',
    period: a.date,
    title: a.title,
    subtitle: a.issuer,
    summary: a.description,
    to: `/achievements?focus=${a.id}`,
    sortKey: parseDateToSortKey(a.date),
  }))

const allEntries = [...education, ...roles, ...built, ...won]

export const journey: JourneyEntry[] = allEntries.sort((a, b) => (a.sortKey ?? 0) - (b.sortKey ?? 0))
