import { useMemo, useState } from 'react'
import { experience, experienceTypes, type ExperienceType } from '../data/experience'
import { useDeepLink } from '../hooks/useDeepLink'
import PageHeader from '../components/ui/PageHeader'
import TypeFilter from '../components/ui/TypeFilter'
import Timeline from '../components/timeline/Timeline'

export default function Experience() {
  const [type, setType] = useState('all')
  const [expand, setExpand] = useState<{ id: string; n: number } | null>(null)
  useDeepLink((id) => { setType('all'); setExpand({ id, n: Date.now() }) })
  const options = useMemo(() => [{ id: 'all', label: 'All', count: experience.length },
    ...(Object.keys(experienceTypes) as ExperienceType[]).map((id) => ({ id, label: experienceTypes[id].label, count: experience.filter((x) => x.type === id).length })).filter((o) => o.count > 0)], [])
  const entries = experience.filter((x) => type === 'all' || x.type === type)
    .map((x) => ({ id: x.id, kindId: x.type, period: x.period, title: x.title, subtitle: `${x.org} · ${x.location}`, summary: x.summary, bullets: x.bullets, tags: x.tags }))
  return (
    <>
      <PageHeader id="experience" />
      <TypeFilter label="Filter by type" options={options} value={type} onChange={setType} />
      <p role="status" aria-live="polite" className="sr-only">{entries.length} entries shown</p>
      <Timeline entries={entries} kinds={experienceTypes} expand={expand} />
    </>
  )
}
