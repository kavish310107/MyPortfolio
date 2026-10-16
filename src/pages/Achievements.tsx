import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { achievements, achievementTypes, type AchievementType } from '../data/achievements'
import { useDeepLink } from '../hooks/useDeepLink'
import PageHeader from '../components/ui/PageHeader'
import TypeFilter from '../components/ui/TypeFilter'
import AchievementCard from '../components/achievements/AchievementCard'

export default function Achievements() {
  const [type, setType] = useState('all')
  useDeepLink(() => setType('all'))
  const options = useMemo(() => [{ id: 'all', label: 'All', count: achievements.length },
    ...(Object.keys(achievementTypes) as AchievementType[]).map((id) => ({ id, label: achievementTypes[id].label, count: achievements.filter((x) => x.type === id).length })).filter((o) => o.count > 0)], [])
  const list = achievements.filter((a) => type === 'all' || a.type === type).sort((a, b) => Number(b.featured) - Number(a.featured))
  return (
    <>
      <PageHeader id="achievements" />
      <TypeFilter label="Filter by type" options={options} value={type} onChange={setType} />
      <p role="status" aria-live="polite" className="sr-only">{list.length} achievements shown</p>
      <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><AnimatePresence mode="popLayout">{list.map((a, i) => <AchievementCard key={a.id} a={a} index={i} large={a.featured} />)}</AnimatePresence></motion.div>
    </>
  )
}
