import { useCallback, useEffect, useState } from 'react'
import { defaultHidden, defaultLayout } from '../components/widgets/registry'

const KEY = 'portfolio-os:dashboard-layout:v1'
interface Layout { order: string[]; hidden: string[] }

// Reads a saved layout defensively: unknown ids are dropped, newly added widgets are appended.
function load(): Layout {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? 'null') as Partial<Layout> | null
    const known = new Set(defaultLayout)
    const order = (raw?.order ?? []).filter((id) => known.has(id))
    for (const id of defaultLayout) if (!order.includes(id)) order.push(id)
    return { order, hidden: raw?.hidden ? raw.hidden.filter((id) => known.has(id)) : defaultHidden }
  } catch { return { order: defaultLayout, hidden: defaultHidden } }
}

export function useDashboardLayout() {
  const [layout, setLayout] = useState<Layout>(load)
  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(layout)) } catch { /* storage unavailable: layout lasts for this session only */ } }, [layout])
  const setOrder = useCallback((order: string[]) => setLayout((l) => ({ ...l, order })), [])
  const hide = useCallback((id: string) => setLayout((l) => ({ ...l, hidden: [...l.hidden, id] })), [])
  const show = useCallback((id: string) => setLayout((l) => ({ ...l, hidden: l.hidden.filter((h) => h !== id) })), [])
  const reset = useCallback(() => setLayout({ order: defaultLayout, hidden: defaultHidden }), [])
  const isDefault = layout.hidden.length === defaultHidden.length && layout.hidden.every((id) => defaultHidden.includes(id)) && layout.order.every((id, i) => id === defaultLayout[i])
  return { ...layout, visible: layout.order.filter((id) => !layout.hidden.includes(id)), setOrder, hide, show, reset, isDefault }
}
