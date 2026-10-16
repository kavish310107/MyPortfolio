import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronRight, Cpu, GraduationCap, LayoutGrid, Link2, Radio } from 'lucide-react'
import { skillCategories, skillsMeta } from '../../data/skills'
import { academics } from '../../data/academics'
import { activityFeed, activityKinds } from '../../data/activity'
import { profileLinks, emailLink } from '../../data/socials'
import { navItems } from '../../data/navigation'
import Widget from '../ui/Widget'
import Placeholder from '../ui/Placeholder'
import { Bar, LevelDots, ProgressRing } from '../ui/Meters'
import SocialLinkCard from '../social/SocialLinkCard'

const more = (to: string, label: string) => <Link to={to} className="mt-4 inline-flex min-h-[44px] items-center gap-1 text-sm text-accent-soft hover:text-white">{label}<ArrowUpRight size={14} aria-hidden /></Link>

export function SkillsSnapshot() {
  return (
    <Widget title="Skills snapshot" icon={Cpu} badge={skillsMeta.isSample ? 'SAMPLE LEVELS' : undefined}>
      <ul className="space-y-1">{skillCategories.slice(0, 5).map((c) => {
        const avg = Math.round(c.skills.reduce((n, s) => n + s.level, 0) / c.skills.length)
        return <li key={c.id}><Link to="/skills" className="flex min-h-[44px] items-center gap-3 rounded-xl px-1 transition hover:bg-white/5"><c.icon size={16} className="shrink-0 text-accent-soft" aria-hidden /><span className="flex-1 truncate text-sm">{c.label}</span><span role="img" aria-label={`${skillsMeta.isSample ? 'Sample level' : 'Level'} ${avg} of 5`}><LevelDots level={avg} /></span></Link></li>
      })}</ul>
      {more('/skills', 'All skills')}
    </Widget>
  )
}

export function AcademicSnapshot() {
  const a = academics
  return (
    <Widget title="Academic snapshot" icon={GraduationCap} badge={academics.isSample ? 'SAMPLE DATA' : undefined}>
      <div className="flex items-center gap-4"><ProgressRing size={96} value={a.cgpa.value} max={a.cgpa.max} label={`${a.isSample ? 'Sample ' : ''}CGPA ${a.cgpa.value} of ${a.cgpa.max}`} /><div className="min-w-0 text-sm"><p className="truncate"><Placeholder>{a.degree}</Placeholder></p><p className="mt-1 truncate text-xs text-[var(--muted)]">{a.university}</p></div></div>
      <div className="mt-4"><div className="mb-1.5 flex justify-between text-xs text-[var(--muted)]"><span>Degree progress</span><span className="font-mono">{a.credits.done}/{a.credits.total}</span></div><Bar pct={(a.credits.done / a.credits.total) * 100} label={`Degree progress${a.isSample ? ' (sample)' : ''}`} /></div>
      {more('/academics', 'Academic dashboard')}
    </Widget>
  )
}

export function LinksWidget() {
  return (
    <Widget title="Profiles & links" icon={Link2}>
      <ul>{[emailLink, ...profileLinks.slice(0, 3)].map((l) => <li key={l.id}><SocialLinkCard link={l} compact /></li>)}</ul>
      {more('/contact', 'All contact options')}
    </Widget>
  )
}

export function ActivitySnapshot() {
  return (
    <Widget title="Activity feed" icon={Radio}>
      <ul className="space-y-1">{activityFeed.slice(0, 4).map((a) => { const k = activityKinds[a.kind]; return (
        <li key={a.id}><Link to={a.to} className="group flex min-h-[52px] items-center gap-3 rounded-xl px-1 transition hover:bg-white/5"><span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${k.tone}`}><k.icon size={15} aria-hidden /></span><span className="min-w-0 flex-1 text-sm"><span className="block truncate text-[11px] text-[var(--muted)]">{a.verb}</span><span className="block truncate">{a.title}</span></span><ChevronRight size={14} aria-hidden className="text-white/30 group-hover:text-white" /></Link></li>) })}</ul>
      {more('/activity', 'Full feed')}
    </Widget>
  )
}

export function QuickLaunch() {
  return (
    <Widget title="Quick launch" icon={LayoutGrid}>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">{navItems.filter((n) => n.id !== 'home').map((m) => (
        <li key={m.id}><Link to={m.path} className="flex min-h-[64px] flex-col justify-between rounded-2xl border border-white/10 bg-white/[.03] p-3 transition hover:border-accent/40 hover:bg-white/[.07]"><m.icon size={18} className="text-accent-soft" aria-hidden /><span className="text-sm">{m.label}</span></Link></li>
      ))}</ul>
    </Widget>
  )
}
