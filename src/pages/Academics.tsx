import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, GraduationCap, LineChart, Award, Milestone, Gauge } from 'lucide-react'
import { academics as a } from '../data/academics'
import { stagger } from '../components/ui/motion'
import PageHeader from '../components/ui/PageHeader'
import Widget from '../components/ui/Widget'
import Placeholder from '../components/ui/Placeholder'
import { Bar, ProgressRing } from '../components/ui/Meters'

function SemesterChart() {
  const [sel, setSel] = useState<string | null>(null)
  const pct = (v: number) => (v / a.scale) * 100
  return (
    <>
      {/* Phones: one row per semester, full-width touch targets, values always visible. */}
      <ul className="space-y-1 sm:hidden" aria-label={a.isSample ? 'Sample performance by semester' : 'Performance by semester'}>
        {a.semesters.map((s, i) => (
          <li key={s.id} className="flex min-h-[44px] items-center gap-3" aria-label={`${s.label}: ${s.score} out of ${a.scale}${a.isSample ? ' (sample)' : ''}`}>
            <span className="w-8 shrink-0 text-xs text-white/60">{s.label}</span>
            <span className="h-3 flex-1 overflow-hidden rounded-full bg-white/[.07]"><motion.span className="block h-full rounded-full bg-gradient-to-r from-accent-glow to-accent" initial={{ width: 0 }} whileInView={{ width: `${pct(s.score)}%` }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.05 }} /></span>
            <span className="w-9 shrink-0 text-right font-mono text-xs tabular-nums text-white/80">{s.score}</span>
          </li>
        ))}
      </ul>
      {/* sm and up: vertical bars; hover or focus highlights a bar. */}
      <ul className="hidden h-44 items-end gap-3 sm:flex" aria-label={a.isSample ? 'Sample performance by semester' : 'Performance by semester'}>
        {a.semesters.map((s, i) => {
          const on = sel === s.id
          return (
            <li key={s.id} className="h-full flex-1">
              <button type="button" onMouseEnter={() => setSel(s.id)} onMouseLeave={() => setSel(null)} onFocus={() => setSel(s.id)} onBlur={() => setSel(null)} className="group flex h-full w-full flex-col justify-end gap-2 rounded-xl">
                <span className="sr-only">{`${s.label}: ${s.score} out of ${a.scale}${a.isSample ? ' (sample)' : ''}`}</span>
                <span aria-hidden className={`text-center font-mono text-[11px] transition ${on ? 'text-white' : 'text-white/55'}`}>{s.score}</span>
                <motion.span initial={{ height: 0 }} whileInView={{ height: `${pct(s.score)}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }} className={`block w-full rounded-t-lg bg-gradient-to-t from-accent-glow/40 to-accent transition ${on ? 'brightness-125 shadow-glow' : ''}`} />
                <span aria-hidden className="text-center text-[11px] text-white/60">{s.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default function Academics() {
  const pct = (a.credits.done / a.credits.total) * 100
  return (
    <>
      <PageHeader id="academics" />
      <motion.div variants={stagger} initial="hidden" animate="show" className="grid gap-4 lg:grid-cols-12">
        <Widget title="Programme" icon={GraduationCap} className="lg:col-span-8">
          <p className="text-2xl font-semibold"><Placeholder>{a.university}</Placeholder></p>
          <p className="mt-2 text-lg text-white/80"><Placeholder>{a.degree}</Placeholder></p>
          <p className="mt-1 flex flex-wrap gap-2 text-sm text-[var(--muted)]"><Placeholder>{a.specialization}</Placeholder><Placeholder>{a.period}</Placeholder></p>
          <div className="mt-6">
            <div className="mb-2 flex justify-between text-xs text-[var(--muted)]"><span>Degree progress</span><span className="font-mono">{a.credits.done}/{a.credits.total} credits{a.isSample ? ' · SAMPLE' : ''}</span></div>
            <Bar pct={pct} label={`Degree progress${a.isSample ? ' (sample)' : ''}`} />
          </div>
        </Widget>

        <Widget title="Overall score" icon={Gauge} badge={a.isSample ? 'SAMPLE DATA' : undefined} className="lg:col-span-4">
          <div className="flex flex-col items-center gap-3"><ProgressRing value={a.cgpa.value} max={a.cgpa.max} label={`${a.isSample ? 'Sample ' : ''}CGPA ${a.cgpa.value} out of ${a.cgpa.max}`} /><Placeholder>{a.cgpa.label}</Placeholder></div>
        </Widget>

        <Widget title="Semester performance" icon={LineChart} badge={a.isSample ? 'SAMPLE DATA' : undefined} className="lg:col-span-7"><SemesterChart /></Widget>

        <Widget title="Academic timeline" icon={Milestone} className="lg:col-span-5">
          <ol className="relative space-y-5 border-l border-white/10 pl-6">
            {a.timeline.map((t, i) => (
              <motion.li key={t.id} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="relative">
                <span aria-hidden className="absolute -left-[29px] top-1 h-2.5 w-2.5 rounded-full bg-accent shadow-glow" />
                <p className="font-mono text-xs text-accent-soft"><Placeholder>{t.period}</Placeholder></p>
                <p className="text-sm font-medium"><Placeholder>{t.title}</Placeholder></p><p className="text-xs text-[var(--muted)]">{t.note}</p>
              </motion.li>
            ))}
          </ol>
        </Widget>

        <Widget title="Relevant coursework" icon={BookOpen} className="lg:col-span-7">
          <div className="space-y-4">{a.coursework.map((g) => (
            <div key={g.group}><p className="mb-2 text-xs text-[var(--muted)]">{g.group}</p>
              <ul className="flex flex-wrap gap-2">{g.items.map((c) => <motion.li key={c} whileHover={{ y: -2 }} className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm">{c}</motion.li>)}</ul></div>
          ))}</div>
        </Widget>

        <Widget title="Academic highlights" icon={Award} className="lg:col-span-5">
          <ul className="space-y-3">{a.highlights.map((h) => (
            <li key={h.id} className="flex gap-3 rounded-2xl p-2 transition hover:bg-white/5"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-300/10 text-amber-200"><Award size={16} aria-hidden /></span>
              <span className="text-sm"><Placeholder>{h.title}</Placeholder><span className="mt-0.5 block text-xs text-[var(--muted)]">{h.text}</span></span></li>
          ))}</ul>
        </Widget>
      </motion.div>
    </>
  )
}
