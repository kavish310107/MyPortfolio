import { projects } from './projects'
import { achievements as allAchievements } from './achievements'
import { certificates } from './certificates'
import { academics } from './academics'

// HOME dashboard content. Nothing personal is typed here: stats are counted from the data files,
// featured items come from their `featured` flags, and identity/focus come from profile.ts.
export interface Stat { id: string; label: string; value: number; suffix?: string; decimals?: number; hint?: string; sample?: boolean }
export interface ProjectPreview { id: string; title: string; description: string; tags: string[]; link: string }
export interface AchievementPreview { id: string; title: string; issuer: string; year: string }

export const stats: Stat[] = [
  { id: 'projects', label: 'Projects', value: projects.length },
  { id: 'certs', label: 'Certificates', value: certificates.length },
  { id: 'achievements', label: 'Achievements', value: allAchievements.length },
  { id: 'gpa', label: 'CGPA', value: academics.cgpa.value, decimals: 1, suffix: `/${academics.cgpa.max}`, hint: academics.cgpa.label, sample: academics.isSample },
]

// Derived from the single projects data source (no duplicated project info).
export const featuredProjects: ProjectPreview[] = projects.filter((p) => p.featured).slice(0, 3)
  .map((p) => ({ id: p.id, title: p.title, description: p.description, tags: p.tech.slice(0, 3), link: `/projects?p=${p.id}` }))

export const achievements: AchievementPreview[] = allAchievements.filter((a) => a.featured).slice(0, 3).map((a) => ({ id: a.id, title: a.title, issuer: a.issuer, year: a.date }))


