import type { LucideIcon } from 'lucide-react'

// One empty-state pattern for the whole site: icon, what happened, what to do next.
export default function EmptyState({ icon: Icon, title, hint, actionLabel, onAction }: { icon: LucideIcon; title: string; hint?: string; actionLabel?: string; onAction?: () => void }) {
  return (
    <div role="status" className="glass mx-auto flex max-w-md flex-col items-center gap-3 rounded-3xl px-6 py-12 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-white/60"><Icon size={22} aria-hidden /></span>
      <p className="text-base font-medium">{title}</p>
      {hint && <p className="text-sm text-[var(--muted)]">{hint}</p>}
      {actionLabel && onAction && <button type="button" onClick={onAction} className="btn-ghost mt-1">{actionLabel}</button>}
    </div>
  )
}
