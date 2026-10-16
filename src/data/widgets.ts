// DASHBOARD WIDGETS: which widgets the Home dashboard has, their size and their DEFAULT order.
// • Reorder the list to change the default layout; set `visible: false` to hide a widget by default.
// • Visitors can still rearrange and hide widgets (saved in their browser); "Reset layout" returns to this list.
// • To add a new widget: write the component, add it to components/widgets/registry.tsx, then list it here.
export type WidgetSize = 'third' | 'twoThirds' | 'full'
export interface WidgetConfig { id: string; title: string; size: WidgetSize; visible?: boolean }

export const widgetConfig: WidgetConfig[] = [
  { id: 'profile', title: 'Profile overview', size: 'twoThirds' },
  { id: 'stats', title: 'Statistics', size: 'third' },
  { id: 'focus', title: 'Current focus', size: 'third' },
  { id: 'heatmap', title: 'Activity overview', size: 'twoThirds' },
  { id: 'projects', title: 'Featured projects', size: 'twoThirds' },
  { id: 'achievements', title: 'Selected achievements', size: 'third' },
  { id: 'skills', title: 'Skills snapshot', size: 'third' },
  { id: 'academics', title: 'Academic snapshot', size: 'third' },
  { id: 'links', title: 'Profiles & links', size: 'third' },
  { id: 'timeline', title: 'Timeline snapshot', size: 'twoThirds' },
  { id: 'feed', title: 'Activity feed', size: 'third' },
  { id: 'launch', title: 'Quick launch', size: 'full' },
]
