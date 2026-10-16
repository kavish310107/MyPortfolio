import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, FileText, MapPin, Mail } from 'lucide-react'
import { profile } from '../../data/profile'
import { academics } from '../../data/academics'
import Placeholder from '../ui/Placeholder'
import ProfilePhoto from '../ui/ProfilePhoto'
import { rise } from '../ui/motion'

export default function ProfileHero() {
  return (
    <motion.section variants={rise} aria-label="Profile" className="card relative h-full overflow-hidden lg:p-8">
      <div aria-hidden className="absolute -right-24 -top-24 h-80 w-80 rounded-full" style={{ background: 'radial-gradient(closest-side, rgba(91,108,255,.35), transparent)' }} />
      <div aria-hidden className="absolute -bottom-32 left-10 h-72 w-72 rounded-full" style={{ background: 'radial-gradient(closest-side, rgba(94,234,212,.14), transparent)' }} />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="relative shrink-0">
          <motion.div aria-hidden className="absolute -inset-1.5 rounded-[2rem] bg-gradient-to-br from-accent/80 to-aqua/60 opacity-30 blur-md" animate={{ opacity: [0.22, 0.4, 0.22] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
          <ProfilePhoto className="relative h-32 w-32 rounded-[1.75rem] sm:h-40 sm:w-40" />
        </div>
        <div className="min-w-0">
          <p className="eyebrow flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> <Placeholder>{profile.availability}</Placeholder></p>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-5xl"><Placeholder>{profile.name}</Placeholder></h2>
          <p className="mt-2 text-lg text-white/80"><Placeholder>{profile.title}</Placeholder></p>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--muted)]">
            <span className="flex items-center gap-1"><MapPin size={14} aria-hidden /><Placeholder>{profile.location}</Placeholder></span>
            <Placeholder>{academics.university}</Placeholder>
          </p>
        </div>
      </div>
      <p className="relative mt-6 max-w-2xl text-[var(--muted)]"><Placeholder>{profile.intro}</Placeholder></p>
      <div className="relative mt-6 flex flex-wrap gap-3">
        <Link to="/projects" className="btn-primary">Explore projects <ArrowRight size={16} aria-hidden /></Link>
        <Link to="/resume" className="btn-ghost"><FileText size={16} aria-hidden /> Resume</Link>
        <Link to="/contact" className="btn-ghost"><Mail size={16} aria-hidden /> Contact</Link>
      </div>
    </motion.section>
  )
}
