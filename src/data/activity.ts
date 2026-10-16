import { FolderKanban, BookOpen, Trophy, BadgeCheck, CalendarDays, type LucideIcon } from 'lucide-react'
import { projects } from './projects'
import { achievements } from './achievements'
import { certificates } from './certificates'

// Heatmap: 84 values (12 weeks x 7 days)
export const activityHeatmap = {
  isSample: false,
  levels: Array.from({ length: 84 }, (_, i) => Math.round(((Math.sin(i * 1.7) + Math.cos(i * 0.6) + 2) / 4) * 4)),
}

export type ActivityKind = 'project' | 'learning' | 'achievement' | 'certificate' | 'event'
export const activityKinds: Record<ActivityKind, { label: string; icon: LucideIcon; tone: string }> = {
  project: { label: 'Projects', icon: FolderKanban, tone: 'bg-emerald-400/15 text-emerald-300' },
  learning: { label: 'Learning', icon: BookOpen, tone: 'bg-sky-400/15 text-sky-300' },
  achievement: { label: 'Achievements', icon: Trophy, tone: 'bg-amber-300/15 text-amber-200' },
  certificate: { label: 'Certificates', icon: BadgeCheck, tone: 'bg-cyan-400/15 text-cyan-300' },
  event: { label: 'Events', icon: CalendarDays, tone: 'bg-fuchsia-400/15 text-fuchsia-300' },
}
export type ActivityGroup = 'Recent' | 'Earlier'
export const activityGroups: ActivityGroup[] = ['Recent', 'Earlier']
export interface ActivityItem { id: string; kind: ActivityKind; verb: string; title: string; detail: string; when: string; group: ActivityGroup; to: string }

const proj = (i: number, group: ActivityGroup): ActivityItem => {
  const completed = projects.filter((x) => x.status === 'completed')
  const p = completed[i] ?? completed[0]
  return { id: `act-proj-${i}`, kind: 'project', verb: 'Completed project', title: p.title, detail: p.description, when: p.year, group, to: `/projects?p=${p.id}` }
}
const ach = (i: number, group: ActivityGroup): ActivityItem => {
  const a = achievements[i] ?? achievements[0]
  return { id: `act-ach-${i}`, kind: 'achievement', verb: 'Earned', title: a.title, detail: a.issuer, when: a.date, group, to: `/achievements?focus=${a.id}` }
}
const cert = (i: number, group: ActivityGroup): ActivityItem => {
  const c = certificates[i] ?? certificates[0]
  return { id: `act-cert-${i}`, kind: 'certificate', verb: 'Earned certificate', title: c.title, detail: c.issuer, when: c.date, group, to: `/certificates?c=${c.id}` }
}

export const activityFeed: ActivityItem[] = [
  proj(0, 'Recent'),
  cert(0, 'Recent'),
  {
    id: 'act-learn-1',
    kind: 'learning',
    verb: 'Learning milestone',
    title: 'Completed learning Full stack development',
    detail: 'Learned Various frontend, backend and database frameworks along with Github , and deployment',
    when: 'Jun 2025',
    group: 'Recent',
    to: '/skills',
  },
  ach(0, 'Recent'),
  proj(1, 'Earlier'),
  {
    id: 'act-event-1',
    kind: 'event',
    verb: 'Attended',
    title: 'Techfest IIT Bombay 2025',
    detail: 'Attended workshops conducted during IITB Techfest and participated in various activities being conducted',
    when: 'Dec 2025',
    group: 'Earlier',
    to: '/experience',
  },
  cert(1, 'Earlier'),
  ach(1, 'Earlier'),
  {
    id: 'act-learn-2',
    kind: 'learning',
    verb: 'Learning milestone',
    title: 'Completed Python and it’s libraries',
    detail: 'Python , Numpy, Pandas, Matplotlib, Seaborn',
    when: 'Jan 2026',
    group: 'Earlier',
    to: '/skills',
  },
]
