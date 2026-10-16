import { FolderKanban, History, BadgeCheck, PenLine, type LucideIcon } from 'lucide-react'
import { navItems } from './navigation'
import { skillCategories } from './skills'
import { projects as allProjects, statusMeta } from './projects'
import { journey, journeyKinds } from './timeline'
import { achievements, achievementTypes } from './achievements'
import { experience, experienceTypes } from './experience'
import { certificates } from './certificates'
import { posts } from './blog'

export type SearchGroup = 'Pages' | 'Actions' | 'Projects' | 'Achievements' | 'Timeline' | 'Skills' | 'Experience' | 'Certificates' | 'Blog'
export interface SearchEntry { id: string; group: SearchGroup; title: string; subtitle?: string; keywords?: string[]; meta?: string; icon: LucideIcon; to?: string; actionId?: string; shortcut?: string }

// Each content source maps its own data into SearchEntry[]. To make a new data set searchable
// (skills, blog posts, ...) add one function to `contentSources`.
type Source = () => SearchEntry[]

const pages: Source = () => navItems.map((n) => ({ id: `page:${n.id}`, group: 'Pages', title: n.label, subtitle: n.summary, icon: n.icon, to: n.path, keywords: [n.id] }))
const projects: Source = () => allProjects.map((p) => ({ id: `project:${p.id}`, group: 'Projects', title: p.title, subtitle: `${p.category} · ${p.description}`, icon: FolderKanban, meta: statusMeta[p.status].label, to: `/projects?p=${p.id}`, keywords: [...p.tech, p.status, p.category] }))
const achievementSrc: Source = () => achievements.map((a) => ({ id: `ach:${a.id}`, group: 'Achievements', title: a.title, subtitle: `${a.issuer} · ${a.date}`, icon: achievementTypes[a.type].icon, meta: achievementTypes[a.type].label, to: `/achievements?focus=${a.id}`, keywords: [a.type] }))
const experienceSrc: Source = () => experience.map((x) => ({ id: `exp:${x.id}`, group: 'Experience' as const, title: x.title, subtitle: `${experienceTypes[x.type].label} · ${x.org}`, icon: experienceTypes[x.type].icon, meta: experienceTypes[x.type].label, to: `/experience?focus=${x.id}`, keywords: [x.type, ...x.tags] }))
const timeline: Source = () => journey.map((t) => ({ id: `tl:${t.id}`, group: 'Timeline' as const, title: t.title, subtitle: `${journeyKinds[t.kind].label} · ${t.subtitle}`, icon: History, meta: journeyKinds[t.kind].label, to: `/timeline?focus=${t.id}`, keywords: ['journey', t.kind] }))

const skills: Source = () => skillCategories.flatMap((c) => c.skills.map((k) => ({ id: `skill:${k.id}`, group: 'Skills' as const, title: k.name, subtitle: c.label, icon: c.icon, meta: c.label, to: `/skills?focus=${k.id}`, keywords: ['skill'] })))

const certSrc: Source = () => certificates.map((c) => ({ id: `cert:${c.id}`, group: 'Certificates' as const, title: c.title, subtitle: `${c.issuer} · ${c.date}`, icon: BadgeCheck, meta: c.category, to: `/certificates?c=${c.id}`, keywords: [c.category, ...c.skills] }))
const blogSrc: Source = () => posts.map((p) => ({ id: `blog:${p.slug}`, group: 'Blog' as const, title: p.title, subtitle: `${p.category} · ${p.excerpt}`, icon: PenLine, meta: p.category, to: `/blog/${p.slug}`, keywords: p.tags }))

export const contentSources: Source[] = [pages, projects, skills, experienceSrc, achievementSrc, certSrc, blogSrc, timeline]
export const buildSearchIndex = (): SearchEntry[] => contentSources.flatMap((s) => s())
export const groupOrder: SearchGroup[] = ['Pages', 'Actions', 'Projects', 'Skills', 'Experience', 'Certificates', 'Achievements', 'Timeline', 'Blog']
