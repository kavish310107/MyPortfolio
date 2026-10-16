import { ExternalLink } from 'lucide-react'
import type { ReactNode } from 'react'
import { isSet } from '../../data/projects'

// Opens externally when set; otherwise a clearly disabled control (error prevention, no dead links).
export default function ExternalLinkButton({ href, label, icon, compact }: { href: string; label: string; icon: ReactNode; compact?: boolean }) {
  const base = compact ? 'h-11 w-11 justify-center rounded-xl' : 'btn px-4'
  if (!isSet(href)) return <span role="link" aria-disabled="true" title={`${label} not added yet`} className={`inline-flex items-center gap-2 border border-dashed border-amber-300/30 text-amber-200/60 ${base} ${compact ? '' : 'rounded-2xl text-sm'}`}>{icon}{!compact && label}<span className="sr-only">{label} (not added yet)</span></span>
  return <a href={href} target="_blank" rel="noopener noreferrer" aria-label={compact ? `${label} (opens in new tab)` : undefined} className={`inline-flex items-center gap-2 border border-white/10 bg-white/5 transition hover:bg-white/15 ${base} ${compact ? '' : 'rounded-2xl text-sm'}`}>{icon}{!compact && <>{label}<ExternalLink size={12} aria-hidden /></>}</a>
}
