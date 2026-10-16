import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { SocialLink } from '../../data/socials'
import { isSet, mailtoHref } from '../../utils/links'

// External profiles open in a new tab; email opens the mail client. Unset links render as disabled (no dead links).
export default function SocialLinkCard({ link, compact = false }: { link: SocialLink; compact?: boolean }) {
  const set = isSet(link.url), Icon = link.icon
  const body = (
    <>
      <span className={`flex ${compact ? 'h-9 w-9 rounded-xl' : 'h-11 w-11 rounded-2xl'} shrink-0 items-center justify-center ${set ? 'bg-accent-glow/20 text-accent-soft' : 'bg-white/5 text-white/60'}`}><Icon size={20} aria-hidden /></span>
      <span className="min-w-0 flex-1"><span className="block text-sm font-medium">{link.label}</span><span className="block truncate font-mono text-xs"><span className="placeholder-tag">{link.handle}</span></span></span>
      {set ? <ArrowUpRight size={16} aria-hidden className="shrink-0 text-white/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" /> : <span className="shrink-0 rounded-full border border-dashed border-amber-300/30 px-2 py-0.5 text-[10px] text-amber-200/70">Not added</span>}
    </>
  )
  const cls = compact ? 'group flex min-h-[52px] items-center gap-3 rounded-2xl px-2 py-2 transition hover:bg-white/5' : 'card group flex min-h-[72px] items-center gap-4 !p-4'
  if (!set) return <div role="link" aria-disabled="true" title={`Add your ${link.label} link in src/data/profile.ts`} className={`${cls} opacity-70 hover:!bg-white/[.04]`}>{body}<span className="sr-only">{link.label} link not added yet</span></div>
  const ext = link.kind === 'profile'
  return <motion.a whileHover={{ y: -2 }} href={ext ? link.url : mailtoHref(link.url)} {...(ext ? { target: '_blank', rel: 'noopener noreferrer', 'aria-label': `${link.label} (opens in new tab)` } : {})} className={cls}>{body}</motion.a>
}
