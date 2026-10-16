import { motion } from 'framer-motion'
import { BadgeCheck, Star } from 'lucide-react'
import { achievementTypes, type Achievement } from '../../data/achievements'
import ExternalLinkButton from '../projects/ExternalLinkButton'

export default function AchievementCard({ a, index = 0, large = false }: { a: Achievement; index?: number; large?: boolean }) {
  const t = achievementTypes[a.type], Icon = t.icon
  return (
    <motion.article layout data-focus-id={a.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.4, delay: (index % 3) * 0.06 }} whileHover={{ y: -3 }}
      className={`card group flex h-full flex-col ${large ? 'relative overflow-hidden' : ''}`}>
      {large && <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full" style={{ background: 'radial-gradient(closest-side, rgba(251,191,36,.16), transparent)' }} />}
      <div className="relative flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-300/10 text-amber-200 transition group-hover:scale-105 group-hover:bg-amber-300/20"><Icon size={22} aria-hidden /></span>
        <span className="flex items-center gap-1.5 text-[11px] text-white/60">{a.featured && <Star size={11} className="fill-amber-300 text-amber-300" aria-label="Featured" />}{t.label}</span>
      </div>
      <h2 className="relative mt-4 text-base font-medium"><span className="placeholder-tag">{a.title}</span></h2>
      <p className="mt-1 text-sm text-[var(--muted)]">{a.issuer} · <span className="font-mono text-xs">{a.date}</span></p>
      <p className="mt-3 flex-1 text-sm text-white/65">{a.description}</p>
      <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
        <span className="flex items-center gap-1 text-[11px] text-white/60"><BadgeCheck size={12} aria-hidden />Credential</span>
        <ExternalLinkButton href={a.link} label={`View credential for ${a.title}`} icon={<BadgeCheck size={16} aria-hidden />} compact />
      </div>
    </motion.article>
  )
}
