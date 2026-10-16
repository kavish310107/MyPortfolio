import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { consumeMainFocus } from '../../utils/navFocus'
import { scrim, sheet, spring } from '../ui/motion'
import { CheckCircle2, ChevronLeft, ChevronRight, Code, X } from 'lucide-react'
import type { Project } from '../../data/projects'
import { ProjectImage, StatusBadge } from './ProjectCard'
import ExternalLinkButton from './ExternalLinkButton'

interface Props { project: Project; onClose: () => void; onStep: (dir: 1 | -1) => void; position: string }

export default function ProjectModal({ project: p, onClose, onStep, position }: Props) {
  const panel = useRef<HTMLDivElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    closeBtn.current?.focus(); consumeMainFocus()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = overflow; (prev && prev.isConnected && prev !== document.body ? prev : document.getElementById('main'))?.focus?.() }
  }, [])

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { e.stopPropagation(); onClose() }
    else if (e.key === 'ArrowRight' && !(e.target instanceof HTMLInputElement)) onStep(1)
    else if (e.key === 'ArrowLeft') onStep(-1)
    else if (e.key === 'Tab') { // focus trap
      const f = panel.current?.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]'); if (!f?.length) return
      const first = f[0], last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" onKeyDown={onKey}>
      <motion.div aria-hidden className="absolute inset-0 bg-ink-950/70 backdrop-blur-md" {...scrim} onClick={onClose} />
      <motion.div ref={panel} role="dialog" aria-modal="true" aria-labelledby="proj-title" {...sheet} transition={spring.soft}
        className="glass-strong relative max-h-[92dvh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-t-[2rem] pb-[env(safe-area-inset-bottom)] sm:rounded-[2rem] sm:pb-0">
        <div className="relative p-2">
          <ProjectImage p={p} className="h-48 rounded-3xl sm:h-64" />
          <button ref={closeBtn} type="button" onClick={onClose} aria-label="Close project details" className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-ink-900/80 backdrop-blur transition hover:bg-white/20"><X size={18} /></button>
        </div>
        <div className="space-y-6 p-5 pt-3 sm:p-8 sm:pt-4">
          <div>
            <div className="flex flex-wrap items-center gap-3"><StatusBadge status={p.status} /><span className="eyebrow">{p.category}</span><span className="font-mono text-xs text-white/60">{p.year} · {p.role}</span></div>
            <h2 id="proj-title" className="mt-3 text-2xl font-semibold sm:text-3xl"><span className="placeholder-tag">{p.title}</span></h2>
            <p className="mt-3 text-[var(--muted)]">{p.details}</p>
          </div>
          <section aria-label="Key highlights"><h3 className="eyebrow mb-3">Key highlights</h3>
            <ul className="space-y-2">{p.highlights.map((h) => <li key={h} className="flex items-start gap-2 text-sm"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-aqua" aria-hidden />{h}</li>)}</ul></section>
          <section aria-label="Technology stack"><h3 className="eyebrow mb-3">Tech stack</h3>
            <ul className="flex flex-wrap gap-2">{p.tech.map((t) => <li key={t} className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs">{t}</li>)}</ul></section>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
            <div className="flex flex-wrap gap-2"><ExternalLinkButton href={p.github} label="GitHub" icon={<Code size={16} aria-hidden />} /></div>
            <div className="flex items-center gap-1 text-xs text-white/60"><button type="button" onClick={() => onStep(-1)} aria-label="Previous project" className="flex h-11 w-11 items-center justify-center rounded-xl hover:bg-white/10"><ChevronLeft size={18} /></button><span className="font-mono" aria-live="polite">{position}</span><button type="button" onClick={() => onStep(1)} aria-label="Next project" className="flex h-11 w-11 items-center justify-center rounded-xl hover:bg-white/10"><ChevronRight size={18} /></button></div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
