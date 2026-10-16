import { useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { skillCategories, skillsMeta, levelLabels, type Skill } from '../data/skills'
import { useDeepLink } from '../hooks/useDeepLink'
import PageHeader from '../components/ui/PageHeader'
import Placeholder from '../components/ui/Placeholder'
import { LevelDots } from '../components/ui/Meters'

function SkillCard({ skill, open, onToggle }: { skill: Skill; open: boolean; onToggle: () => void }) {
  return (
    <motion.li layout data-focus-id={skill.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-[background-color,border-color,box-shadow] hover:border-accent/40 hover:bg-white/[0.06]">
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex min-h-[56px] w-full items-center justify-between gap-3 px-4 py-3 text-left">
        <span className="min-w-0"><span data-title className="block truncate text-sm font-medium"><Placeholder>{skill.name}</Placeholder></span><span className="mt-2 flex items-center gap-2"><LevelDots level={skill.level} /><span className="text-[11px] text-white/60">{levelLabels[skill.level - 1]}</span></span></span>
        <ChevronDown size={16} aria-hidden className={`shrink-0 text-white/60 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
            <p className="border-t border-white/5 px-4 py-3 text-xs text-[var(--muted)]">{skill.note}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}

export default function Skills() {
  const [filter, setFilter] = useState('all')
  const [openId, setOpenId] = useState<string | null>(null)
  useDeepLink((id) => { setFilter('all'); setOpenId(id) })
  const visible = skillCategories.filter((c) => filter === 'all' || c.id === filter)
  return (
    <>
      <PageHeader id="skills" />
      <div role="tablist" aria-label="Filter skills by category" className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {[{ id: 'all', label: 'All' }, ...skillCategories].map((c) => (
          <button key={c.id} role="tab" aria-selected={filter === c.id} onClick={() => { setFilter(c.id); setOpenId(null) }}
            className={`relative min-h-[44px] shrink-0 rounded-2xl border border-white/10 px-4 text-sm transition ${filter === c.id ? 'border-transparent text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}>
            {filter === c.id && <motion.span layoutId="skill-tab" className="absolute inset-0 rounded-2xl border border-accent/60 bg-accent-glow/20" transition={{ type: 'spring', stiffness: 500, damping: 36 }} />}
            <span className="relative">{c.label}</span>
          </button>
        ))}
      </div>
      {skillsMeta.isSample && <p className="mb-4 text-xs text-[var(--muted)]"><span className="placeholder-tag">SAMPLE LEVELS</span> Proficiency indicators are sample values until you set your own in <code className="font-mono">src/data/skills.ts</code>.</p>}
      <LayoutGroup>
        <motion.div layout className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((cat) => (
              <motion.section key={cat.id} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} aria-label={cat.label} className="card self-start">
                <h2 className="mb-4 flex items-center gap-3 text-base font-medium"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-glow/20 text-accent-soft"><cat.icon size={18} aria-hidden /></span>{cat.label}<span className="ml-auto font-mono text-xs text-white/60">{cat.skills.length}</span></h2>
                <ul className="space-y-2">{cat.skills.map((s) => <SkillCard key={s.id} skill={s} open={openId === s.id} onToggle={() => setOpenId(openId === s.id ? null : s.id)} />)}</ul>
              </motion.section>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </>
  )
}
