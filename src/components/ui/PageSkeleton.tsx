// Shown only while a page's code is still loading (slow networks). Mirrors the real page rhythm: header, then cards.
export default function PageSkeleton() {
  return (
    <div role="status" aria-label="Loading page" aria-live="polite">
      <div className="mb-8 space-y-3"><div className="skeleton h-3 w-28" /><div className="skeleton h-10 w-2/3 max-w-md" /><div className="skeleton h-4 w-1/2 max-w-sm" /></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[0, 1, 2].map((i) => <div key={i} className="glass h-48 rounded-3xl p-6"><div className="skeleton h-3 w-1/3" /><div className="skeleton mt-6 h-3 w-full" /><div className="skeleton mt-3 h-3 w-4/5" /></div>)}</div>
      <span className="sr-only">Loading…</span>
    </div>
  )
}
