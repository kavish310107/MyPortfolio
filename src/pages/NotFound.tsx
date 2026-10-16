import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center py-20 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-accent-soft"><Compass size={26} aria-hidden /></span>
      <p className="eyebrow mt-6">Error 404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Page not found</h1>
      <p className="mt-2 max-w-sm text-[var(--muted)]">That module doesn't exist. Use the dock, or press <kbd className="rounded border border-white/15 px-1.5 font-mono text-xs">/</kbd> to search.</p>
      <Link to="/" className="btn-primary mt-8">Back to Home</Link>
    </div>
  )
}
