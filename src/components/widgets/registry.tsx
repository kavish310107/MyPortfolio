import type { ReactNode } from 'react'
import { widgetConfig, type WidgetConfig, type WidgetSize } from '../../data/widgets'
import ProfileHero from '../home/ProfileHero'
import { StatsGrid, FocusStatus, ActivityOverview } from '../home/StatsAndFocus'
import { FeaturedProjects, SelectedAchievements, TimelinePreview } from '../home/Showcase'
import { SkillsSnapshot, AcademicSnapshot, LinksWidget, ActivitySnapshot, QuickLaunch } from './snapshots'

// Which widgets exist, their size and default order live in data/widgets.ts. This file only maps each id to its component.
const components: Record<string, () => ReactNode> = {
  profile: () => <ProfileHero />, stats: () => <StatsGrid />, focus: () => <FocusStatus />, heatmap: () => <ActivityOverview />,
  projects: () => <FeaturedProjects />, achievements: () => <SelectedAchievements />, skills: () => <SkillsSnapshot />,
  academics: () => <AcademicSnapshot />, links: () => <LinksWidget />, timeline: () => <TimelinePreview />, feed: () => <ActivitySnapshot />, launch: () => <QuickLaunch />,
}

export const sizeClass: Record<WidgetSize, string> = {
  third: 'lg:col-span-4',
  twoThirds: 'md:col-span-2 lg:col-span-8',
  full: 'md:col-span-2 lg:col-span-12',
}

export interface WidgetDef extends WidgetConfig { render: () => ReactNode }
export const widgetRegistry: WidgetDef[] = widgetConfig.map((c) => {
  const render = components[c.id]
  if (!render) throw new Error(`Widget "${c.id}" is listed in src/data/widgets.ts but has no component in components/widgets/registry.tsx`)
  return { ...c, render }
})
export const defaultLayout = widgetRegistry.map((w) => w.id)
export const defaultHidden = widgetRegistry.filter((w) => w.visible === false).map((w) => w.id)
export const widgetById = (id: string) => widgetRegistry.find((w) => w.id === id)

// On tablet (2 columns, normal flow) a 'third' widget left alone in its row would leave an empty half.
// Walk the visible order and mark those widgets so they span the full row at that breakpoint only.
export function tabletStretch(ids: string[]): Set<string> {
  const out = new Set<string>()
  let col = 0, prev: string | null = null
  for (const id of ids) {
    if (widgetById(id)?.size !== 'third') { if (col === 1 && prev) out.add(prev); col = 0; prev = null; continue }
    if (col === 0) { col = 1; prev = id } else { col = 0; prev = null }
  }
  if (col === 1 && prev) out.add(prev)
  return out
}
