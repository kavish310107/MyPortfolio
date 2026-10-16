import { useMemo, useState } from 'react'
import { journey, journeyKinds, type JourneyKind } from '../data/timeline'
import { useDeepLink } from '../hooks/useDeepLink'
import PageHeader from '../components/ui/PageHeader'
import TypeFilter from '../components/ui/TypeFilter'
import Timeline from '../components/timeline/Timeline'

export default function TimelinePage() {
  const [kind, setKind] = useState('all')
  const [expand, setExpand] = useState<{ id: string; n: number } | null>(null)
  useDeepLink((id) => { setKind('all'); setExpand({ id, n: Date.now() }) })
  const options = useMemo(() => [{ id: 'all', label: 'All', count: journey.length },
    ...(Object.keys(journeyKinds) as JourneyKind[]).map((id) => ({ id, label: journeyKinds[id].label, count: journey.filter((e) => e.kind === id).length })).filter((o) => o.count > 0)], [])
  const entries = journey.filter((e) => kind === 'all' || e.kind === kind).map((e) => ({ id: e.id, kindId: e.kind, period: e.period, title: e.title, subtitle: e.subtitle, summary: e.summary, bullets: e.bullets, tags: e.tags, to: e.to }))
  return (
    <>
      <PageHeader id="timeline" />
      <TypeFilter label="Filter the journey by type" options={options} value={kind} onChange={setKind} />
      <p role="status" aria-live="polite" className="sr-only">{entries.length} entries shown</p>
      <Timeline entries={entries} kinds={journeyKinds} expand={expand} />
    </>
  )
}
