import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { Search, SearchX, X } from 'lucide-react'
import { projects, projectCategories, statusMeta, type ProjectStatus } from '../data/projects'
import PageHeader from '../components/ui/PageHeader'
import EmptyState from '../components/ui/EmptyState'
import ProjectCard from '../components/projects/ProjectCard'
import ProjectModal from '../components/projects/ProjectModal'

const norm = (s: string) => s.toLowerCase()
const chip = (on: boolean) => `relative min-h-[44px] shrink-0 rounded-2xl border px-4 text-sm transition ${on ? 'border-accent/60 bg-accent-glow/20 text-white' : 'border-white/10 text-white/60 hover:bg-white/5 hover:text-white'}`

export default function Projects() {
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string>('All')
  const [status, setStatus] = useState<ProjectStatus | 'all'>('all')

  const list = useMemo(() => projects.filter((p) =>
    (category === 'All' || p.category === category) && (status === 'all' || p.status === status) &&
    (!query.trim() || query.toLowerCase().split(/\s+/).every((t) => norm([p.title, p.description, p.category, ...p.tech].join(' ')).includes(t)))), [query, category, status])

  // The open project lives in the URL (?p=id): deep-linkable, Back closes the modal, palette can target it.
  const selId = params.get('p')
  const selected = projects.find((p) => p.id === selId)
  const open = (id: string) => setParams({ p: id })
  const close = () => setParams({}, { replace: false })
  const step = (dir: 1 | -1) => { const pool = list.length ? list : projects; const i = pool.findIndex((p) => p.id === selId); setParams({ p: pool[(i + dir + pool.length) % pool.length].id }, { replace: true }) }
  const reset = () => { setQuery(''); setCategory('All'); setStatus('all') }
  const filtered = query || category !== 'All' || status !== 'all'
  const pool = list.some((p) => p.id === selId) ? list : projects
  const position = `${pool.findIndex((p) => p.id === selId) + 1} / ${pool.length}`

  return (
    <>
      <PageHeader id="projects" />
      <div className="glass mb-6 space-y-4 rounded-3xl p-4">
        <div className="relative">
          <Search size={16} aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects…" aria-label="Search projects" className="input !pl-11 !pr-11" />
          {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-xl text-white/60 hover:text-white"><X size={16} /></button>}
        </div>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Filter by category">
          {['All', ...projectCategories].map((c) => <button key={c} type="button" aria-pressed={category === c} onClick={() => setCategory(c)} className={chip(category === c)}>{c}</button>)}
        </div>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Filter by status">
          {(['all', ...Object.keys(statusMeta)] as const).map((s) => <button key={s} type="button" aria-pressed={status === s} onClick={() => setStatus(s as ProjectStatus | 'all')} className={chip(status === s)}>{s === 'all' ? 'Any status' : statusMeta[s as ProjectStatus].label}</button>)}
        </div>
      </div>

      <p role="status" aria-live="polite" className="mb-4 flex items-center gap-3 text-xs text-[var(--muted)]">
        Showing {list.length} of {projects.length} projects {filtered && <button type="button" onClick={reset} className="min-h-[32px] text-accent-soft hover:text-white">Reset filters</button>}
      </p>

      <LayoutGroup>
        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">{list.map((p) => <ProjectCard key={p.id} p={p} onOpen={open} />)}</AnimatePresence>
        </motion.div>
        {!list.length && <EmptyState icon={SearchX} title="No projects match these filters" hint="Try a different search or category." actionLabel="Clear filters" onAction={reset} />}
        <AnimatePresence>{selected && <ProjectModal key="modal" project={selected} onClose={close} onStep={step} position={position} />}</AnimatePresence>
      </LayoutGroup>
    </>
  )
}
