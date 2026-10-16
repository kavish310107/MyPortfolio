import { motion } from 'framer-motion'
import { navItems } from '../../data/navigation'
import { pageCopy } from '../../data/pages'
import { dur, ease } from './motion'

// Title and description come from data/pages.ts; the icon from navigation.ts. Pages only pass their id.
export default function PageHeader({ id }: { id: string }) {
  const copy = pageCopy[id], Icon = navItems.find((n) => n.id === id)?.icon
  const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: dur.base, ease } } }
  return (
    <motion.div className="mb-8" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}>
      <motion.p variants={item} className="eyebrow mb-3 flex items-center gap-2">{Icon && <Icon size={14} aria-hidden />}Module / {id}</motion.p>
      <motion.h1 variants={item} className="text-balance bg-gradient-to-b from-white to-white/60 bg-clip-text text-[2rem] font-semibold leading-[1.1] tracking-tight text-transparent sm:text-5xl">{copy.title}</motion.h1>
      <motion.p variants={item} className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">{copy.description}</motion.p>
    </motion.div>
  )
}
