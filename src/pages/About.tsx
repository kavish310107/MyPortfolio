import { motion } from 'framer-motion'
import { Compass, Crosshair, Heart, Sparkles, User, Info } from 'lucide-react'
import { about } from '../data/about'
import { profile } from '../data/profile'
import { stagger } from '../components/ui/motion'
import PageHeader from '../components/ui/PageHeader'
import Widget from '../components/ui/Widget'
import Placeholder from '../components/ui/Placeholder'
import ProfilePhoto from '../components/ui/ProfilePhoto'

export default function About() {
  return (
    <>
      <PageHeader id="about" />
      <motion.div variants={stagger} initial="hidden" animate="show" className="grid gap-4 lg:grid-cols-12">
        <Widget title="Profile" icon={User} className="lg:col-span-8">
          <div className="flex flex-col gap-6 sm:flex-row">
            <ProfilePhoto className="h-36 w-36 shrink-0 rounded-3xl" />
            <div>
              <p className="text-2xl font-semibold"><Placeholder>{profile.name}</Placeholder></p>
              <p className="mt-1 text-[var(--muted)]"><Placeholder>{profile.title}</Placeholder></p>
              <div className="mt-4 space-y-3 text-[var(--muted)]">{about.bio.map((p) => <p key={p}><Placeholder>{p}</Placeholder></p>)}</div>
            </div>
          </div>
        </Widget>

        <Widget title="Quick facts" icon={Info} className="lg:col-span-4">
          <dl className="space-y-3">{about.facts.map(([k, v]) => <div key={k} className="flex justify-between gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0"><dt className="text-sm text-[var(--muted)]">{k}</dt><dd><Placeholder>{v}</Placeholder></dd></div>)}</dl>
        </Widget>

        <Widget title="Interests" icon={Heart} className="lg:col-span-4">
          <ul className="flex flex-wrap gap-2">{about.interests.map((i) => <motion.li key={i} whileHover={{ y: -2, scale: 1.04 }} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm"><Placeholder>{i}</Placeholder></motion.li>)}</ul>
        </Widget>

        <Widget title="Career direction" icon={Compass} className="lg:col-span-4">
          <p className="text-lg font-medium"><Placeholder>{about.careerDirection.goal}</Placeholder></p>
          <p className="mt-2 text-sm text-[var(--muted)]"><Placeholder>{about.careerDirection.summary}</Placeholder></p>
          <p className="mt-4 flex flex-wrap gap-2">{about.careerDirection.roles.map((r) => <Placeholder key={r}>{r}</Placeholder>)}</p>
        </Widget>

        <Widget title="Current focus" icon={Crosshair} className="lg:col-span-4">
          <ol className="space-y-3">{about.currentFocus.map((f, i) => <li key={f} className="flex items-center gap-3"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-glow/20 font-mono text-xs text-accent-soft">{i + 1}</span><Placeholder>{f}</Placeholder></li>)}</ol>
        </Widget>

        <Widget title="Personal highlights" icon={Sparkles} className="lg:col-span-12">
          <ul className="grid gap-3 sm:grid-cols-3">
            {about.highlights.map((h) => (
              <motion.li key={h.id} whileHover={{ y: -3 }} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-accent/40">
                <p className="text-sm font-medium"><Placeholder>{h.title}</Placeholder></p><p className="mt-2 text-xs text-[var(--muted)]">{h.text}</p>
              </motion.li>
            ))}
          </ul>
        </Widget>
      </motion.div>
    </>
  )
}
