import { motion } from 'framer-motion'
import { ArrowUpRight, Code, Sparkles } from 'lucide-react'
import { statusMeta, type Project } from '../../data/projects'
import ExternalLinkButton from './ExternalLinkButton'
import { isSet } from '../../utils/links'

// Thumbnails stay within one calm blue-violet family so a grid of placeholders reads as a set, not a rainbow.
const HUES = [226, 246, 204, 264]
export const hueOf = (id: string) => HUES[id.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % HUES.length]

export function StatusBadge({ status }: { status: Project['status'] }) {
  const m = statusMeta[status]
  return <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-ink-900/60 px-2.5 py-1 text-[11px]"><span className={`h-1.5 w-1.5 rounded-full ${m.dot}`} />{m.label}</span>
}

export function ProjectImage({ p, className = '' }: { p: Project; className?: string }) {
  const h = hueOf(p.id)
  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`} style={{ background: `linear-gradient(135deg, hsl(${h} 50% 36% / .42), hsl(${h + 24} 46% 26% / .2))` }}>
      <div aria-hidden className="absolute inset-0 opacity-[.08]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '24px 24px' }} />
      {isSet(p.image)
        ? <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        : <span className="relative rounded-md border border-dashed border-amber-300/40 bg-ink-900/60 px-2 py-1 font-mono text-[11px] text-amber-200">{p.image}</span>}
    </div>
  )
}

// Stretched-button pattern: only the title is the <button> (its name equals its visible text), and its ::after
// covers the whole card so the entire card stays clickable. Links in the footer sit above it (z-10).
export default function ProjectCard({ p, onOpen }: { p: Project; onOpen: (id: string) => void }) {
  return (
    <motion.article layout initial={{ opacity: 0, y: 16, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} whileHover={{ y: -4 }} transition={{ duration: 0.3 }}
      className="card group relative flex flex-col overflow-hidden !p-0">
      <div className="relative p-2 pb-0">
        <ProjectImage p={p} className="h-40 rounded-2xl" />
        <div className="absolute left-5 top-5"><StatusBadge status={p.status} /></div>
        {p.featured && <span className="absolute right-5 top-5 flex items-center gap-1 rounded-full border border-white/10 bg-ink-900/60 px-2.5 py-1 text-[11px] text-accent-soft"><Sparkles size={11} aria-hidden />Featured</span>}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow !text-[10px]">{p.category}</p>
        <h2 className="mt-1.5 flex items-start justify-between gap-2 text-base font-medium">
          <button type="button" onClick={() => onOpen(p.id)} aria-describedby={`${p.id}-desc`} aria-haspopup="dialog" className="placeholder-tag text-left after:absolute after:inset-0 after:z-0 after:rounded-3xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-accent">{p.title}</button>
          <ArrowUpRight size={18} aria-hidden className="shrink-0 text-white/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
        </h2>
        <p id={`${p.id}-desc`} className="mt-2 text-sm text-[var(--muted)]">{p.description}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">{p.tech.map((t) => <li key={t} className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/60">{t}</li>)}</ul>
      </div>
      <div className="relative z-10 flex items-center justify-between border-t border-white/5 px-4 py-2">
        <span className="text-xs text-[var(--muted)]">{p.highlights.length} highlights</span>
        <span className="flex gap-1"><ExternalLinkButton compact href={p.github} label={`${p.title} on GitHub`} icon={<Code size={16} aria-hidden />} />
        </span>
      </div>
    </motion.article>
  )
}
