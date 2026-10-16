import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { rise } from './motion'

// Shared dashboard widget: consistent header, spotlight hover glow, entrance animation.
export default function Widget({ title, icon: Icon, badge, className = '', children }: { title: string; icon?: LucideIcon; badge?: string; className?: string; children: ReactNode }) {
  return (
    <motion.section variants={rise} aria-label={title} whileHover={{ y: -3 }}
      className={`card group relative flex h-full flex-col overflow-hidden ${className}`}>
      <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-48 w-3/4 -translate-x-1/2 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(closest-side, rgba(91,108,255,.28), transparent)' }} />
      <header className="relative mb-4 flex items-center justify-between">
        <h2 className="eyebrow flex items-center gap-2">{Icon && <Icon size={14} aria-hidden />}{title}</h2>
        {badge && <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10px] text-white/60">{badge}</span>}
      </header>
      <div className="relative flex-1">{children}</div>
    </motion.section>
  )
}
