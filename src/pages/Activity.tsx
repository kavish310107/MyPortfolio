import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { activityFeed, activityGroups, activityKinds, type ActivityKind } from '../data/activity'
import { stagger } from '../components/ui/motion'
import PageHeader from '../components/ui/PageHeader'
import TypeFilter from '../components/ui/TypeFilter'
import { FocusStatus, ActivityOverview } from '../components/home/StatsAndFocus'

export default function Activity() {
  const [kind, setKind] = useState('all')
  const options = useMemo(() => [{ id: 'all', label: 'All', count: activityFeed.length }, ...(Object.keys(activityKinds) as ActivityKind[]).map((k) => ({ id: k, label: activityKinds[k].label, count: activityFeed.filter((a) => a.kind === k).length })).filter((o) => o.count)], [])
  const items = activityFeed.filter((a) => kind === 'all' || a.kind === kind)
  return (
    <>
      <PageHeader id="activity" />
      <motion.div variants={stagger} initial="hidden" animate="show" className="mb-8 grid gap-4 lg:grid-cols-12"><div className="lg:col-span-4"><FocusStatus /></div><div className="lg:col-span-8"><ActivityOverview /></div></motion.div>
      <TypeFilter label="Filter activity by type" options={options} value={kind} onChange={setKind} />
      <p role="status" aria-live="polite" className="sr-only">{items.length} activity items shown</p>
      <div className="space-y-8">
        {activityGroups.map((g) => {
          const rows = items.filter((a) => a.group === g)
          if (!rows.length) return null
          return (
            <section key={g} aria-label={`${g} activity`}>
              <h2 className="eyebrow mb-3 flex items-center gap-2">{g}</h2>
              <ul className="space-y-2">
                <AnimatePresence mode="popLayout">
                  {rows.map((a, i) => {
                    const k = activityKinds[a.kind], Icon = k.icon
                    return (
                      <motion.li key={a.id} layout initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} viewport={{ once: true, margin: '-20px' }} transition={{ duration: 0.3, delay: i * 0.04 }}>
                        <Link to={a.to} className="card group flex min-h-[72px] items-center gap-4 !p-4">
                          <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${k.tone}`}><Icon size={18} aria-hidden /></span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-xs text-[var(--muted)]">{a.verb}</span>
                            <span data-title className="block truncate text-sm font-medium"><span className="placeholder-tag">{a.title}</span></span>
                            <span className="block truncate text-xs text-white/60">{a.detail}</span>
                          </span>
                          <span className="hidden font-mono text-xs text-white/60 sm:block">{a.when}</span>
                          <ChevronRight size={16} aria-hidden className="shrink-0 text-white/30 transition group-hover:translate-x-0.5 group-hover:text-white" />
                        </Link>
                      </motion.li>
                    )
                  })}
                </AnimatePresence>
              </ul>
            </section>
          )
        })}
      </div>
    </>
  )
}
