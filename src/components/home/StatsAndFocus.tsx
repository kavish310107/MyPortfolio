import { motion } from 'framer-motion'
import { Activity, Crosshair } from 'lucide-react'
import { stats } from '../../data/home'
import { profile } from '../../data/profile'
import { activityHeatmap } from '../../data/activity'
import Widget from '../ui/Widget'
import AnimatedNumber from '../ui/AnimatedNumber'
import Placeholder from '../ui/Placeholder'
import { rise } from '../ui/motion'

export function StatsGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      {stats.map((s) => (
        <motion.div key={s.id} variants={rise} whileHover={{ y: -3 }} className="card flex flex-col justify-between !p-4">
          <div className="flex items-center justify-between gap-2"><p className="eyebrow !text-[10px]">{s.label}</p>{s.sample && <span className="rounded-full border border-white/10 px-1.5 py-px font-mono text-[9px] text-white/60">SAMPLE</span>}</div>
          <p className="mt-3 text-4xl font-semibold tabular-nums"><AnimatedNumber value={s.value} decimals={s.decimals} />{s.suffix}</p>
          {s.hint && <p className="mt-1"><Placeholder>{s.hint}</Placeholder></p>}
        </motion.div>
      ))}
    </div>
  )
}

export function FocusStatus() {
  const rows = [['Focus', profile.focus.current], ['Learning', profile.focus.learning], ['Building', profile.focus.building]]
  return (
    <Widget title="Current focus" icon={Crosshair}>
      <dl className="flex h-full flex-col justify-between gap-3">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0">
            <dt className="text-sm text-[var(--muted)]">{k}</dt><dd><Placeholder>{v}</Placeholder></dd>
          </div>
        ))}
      </dl>
    </Widget>
  )
}

const level = ['bg-white/5', 'bg-accent-glow/20', 'bg-accent-glow/40', 'bg-accent-glow/70', 'bg-accent']
export function ActivityOverview() {
  return (
    <Widget title="Activity overview" icon={Activity} badge={activityHeatmap.isSample ? 'SAMPLE DATA' : undefined}>
      <div role="img" aria-label={`${activityHeatmap.isSample ? 'Sample activity' : 'Activity'} heatmap, 12 weeks`} className="grid grid-flow-col grid-rows-7 gap-1.5">
        {activityHeatmap.levels.map((l, i) => (
          <motion.span key={i} initial={{ opacity: 0, scale: 0.4 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: (i % 12) * 0.03 + Math.floor(i / 7) * 0.015 }}
            whileHover={{ scale: 1.35 }} className={`h-6 rounded-[5px] sm:h-5 ${level[l]}`} />
        ))}
      </div>
      {activityHeatmap.isSample && <p className="mt-4 text-xs text-[var(--muted)]">Sample pattern. Replace with real study, coding or project activity in src/data/activity.ts.</p>}
    </Widget>
  )
}
