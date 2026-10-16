import { profile } from '../../data/profile'
import { isSet } from '../../utils/links'

// Renders the real photo once profile.photo is a path/URL; otherwise a clearly marked placeholder tile.
// Size and radius come from the caller (className) so every place that shows the photo stays consistent.
export default function ProfilePhoto({ className = '' }: { className?: string }) {
  if (isSet(profile.photo)) return <img src={profile.photo} alt={`Portrait of ${profile.name}`} decoding="async" className={`object-cover ${className}`} />
  return <div role="img" aria-label="Profile photo placeholder" className={`flex items-center justify-center border border-dashed border-amber-300/40 bg-ink-900/70 text-center font-mono text-[11px] text-amber-200 ${className}`}>{profile.photo}</div>
}
