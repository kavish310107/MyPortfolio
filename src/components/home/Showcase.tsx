import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, FolderKanban, Trophy, History } from 'lucide-react'
import { featuredProjects, achievements } from '../../data/home'
import { journey, journeyKinds } from '../../data/timeline'
import Widget from '../ui/Widget'
import Placeholder from '../ui/Placeholder'

export function FeaturedProjects() {
  return (
    <Widget title="Featured projects" icon={FolderKanban}>
      <ul className="grid gap-3 sm:grid-cols-3">
        {featuredProjects.map((p) => (
          <li key={p.id}>
            <Link to={p.link} className="group/p block h-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-accent/50 hover:bg-white/[0.07]">
              <div aria-hidden className="mb-3 h-20 rounded-xl bg-gradient-to-br from-accent-glow/30 via-white/5 to-aqua/20 transition group-hover/p:from-accent-glow/50" />
              <p className="flex items-center justify-between text-sm font-medium"><Placeholder>{p.title}</Placeholder><ArrowUpRight size={16} className="text-white/60 transition group-hover/p:translate-x-0.5 group-hover/p:-translate-y-0.5 group-hover/p:text-white" aria-hidden /></p>
              <p className="mt-2 text-xs text-[var(--muted)]">{p.description}</p>
              <p className="mt-3 flex flex-wrap gap-1">{p.tags.map((t, i) => <span key={i} className="rounded-md bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-white/60">{t}</span>)}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Widget>
  )
}

export function SelectedAchievements() {
  return (
    <Widget title="Selected achievements" icon={Trophy}>
      <ul className="space-y-2">
        {achievements.map((a) => (
          <li key={a.id}>
            <Link to="/achievements" className="flex min-h-[56px] items-center gap-3 rounded-2xl px-2 py-2 transition hover:bg-white/[0.06]">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-300/10 text-amber-200"><Trophy size={16} aria-hidden /></span>
              <span className="min-w-0 text-sm"><Placeholder>{a.title}</Placeholder><span className="mt-0.5 block text-xs text-[var(--muted)]">{a.issuer} · {a.year}</span></span>
            </Link>
          </li>
        ))}
      </ul>
    </Widget>
  )
}

export function TimelinePreview() {
  return (
    <Widget title="Journey so far" icon={History}>
      <ol className="relative grid gap-6 sm:grid-cols-3">
        <div aria-hidden className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-accent/60 via-white/10 to-transparent sm:block" />
        {journey.slice(0, 3).map((t, i) => {
          const Icon = journeyKinds[t.kind].icon
          return (
            <motion.li key={t.id} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="relative">
              <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-ink-900 text-accent-soft"><Icon size={16} aria-hidden /></span>
              <p className="mt-3 font-mono text-xs text-accent-soft"><Placeholder>{t.period}</Placeholder></p>
              <p className="mt-1 text-sm font-medium"><Placeholder>{t.title}</Placeholder></p>
              <p className="mt-1 text-xs text-[var(--muted)]">{t.subtitle}</p>
            </motion.li>
          )
        })}
      </ol>
      <Link to="/timeline" className="mt-6 inline-flex min-h-[44px] items-center gap-1 text-sm text-accent-soft hover:text-white">Open full timeline <ArrowUpRight size={14} aria-hidden /></Link>
    </Widget>
  )
}
