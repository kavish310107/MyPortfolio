import { useEffect, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ChevronDown, type LucideIcon } from 'lucide-react'

export interface TimelineEntry { id: string; kindId: string; period: string; title: string; subtitle: string; summary: string; bullets?: string[]; tags?: string[]; to?: string }
export interface KindMeta { label: string; icon: LucideIcon }

// Generic vertical timeline: data in, animated rail out. Entries reveal on scroll; details expand on demand.
export default function Timeline({ entries, kinds, expand }: { entries: TimelineEntry[]; kinds: Record<string, KindMeta>; expand?: { id: string; n: number } | null }) {
  const [open, setOpen] = useState<string | null>(null)
  useEffect(() => { if (expand) setOpen(expand.id) }, [expand])
  return (
    <LayoutGroup>
      <ol className="relative ml-3 space-y-5 sm:ml-5">
        <motion.span aria-hidden className="absolute -left-px top-2 bottom-2 w-px origin-top bg-gradient-to-b from-accent/70 via-white/15 to-transparent" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: 'easeOut' }} />
        <AnimatePresence mode="popLayout">
          {entries.map((t) => {
            const k = kinds[t.kindId], Icon = k.icon, isOpen = open === t.id
            return (
              <motion.li key={t.id} data-focus-id={t.id} layout initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.4 }} className="relative pl-8 sm:pl-10">
                <motion.span aria-hidden initial={{ scale: 0.6, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.35, delay: 0.1 }} className="absolute -left-4 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-ink-900 text-accent-soft"><Icon size={15} /></motion.span>
                <div className="card !p-0 overflow-hidden">
                  <button type="button" onClick={() => setOpen(isOpen ? null : t.id)} aria-expanded={isOpen} className="flex w-full items-start justify-between gap-4 p-5 text-left">
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-x-3 gap-y-1"><span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] text-accent-soft">{k.label}</span><span className="font-mono text-xs text-white/60">{t.period}</span></span>
                      <span data-title className="mt-2 block text-base font-medium"><span className="placeholder-tag">{t.title}</span></span>
                      <span className="mt-1 block text-sm text-[var(--muted)]">{t.subtitle}</span>
                      <span className="mt-2 block text-sm text-white/70">{t.summary}</span>
                    </span>
                    <ChevronDown size={18} aria-hidden className={`mt-1 shrink-0 text-white/60 transition ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                        <div className="space-y-4 border-t border-white/5 p-5 pt-4">
                          {t.bullets && <ul className="space-y-2 text-sm text-[var(--muted)]">{t.bullets.map((b) => <li key={b} className="flex gap-2"><span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />{b}</li>)}</ul>}
                          {t.to && <Link to={t.to} className="inline-flex min-h-[44px] items-center gap-1 text-sm text-accent-soft transition hover:text-white">View details<ArrowUpRight size={14} aria-hidden /></Link>}
                          {t.tags && <ul className="flex flex-wrap gap-1.5">{t.tags.map((g, i) => <li key={i} className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/55">{g}</li>)}</ul>}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </ol>
    </LayoutGroup>
  )
}
