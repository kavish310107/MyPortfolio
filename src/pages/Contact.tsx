import { motion } from 'framer-motion'
import { Clock, Link2, MapPin, Radio } from 'lucide-react'
import { profile } from '../data/profile'
import { contactConfig } from '../data/contact'
import { socialLinks } from '../data/socials'
import { stagger } from '../components/ui/motion'
import PageHeader from '../components/ui/PageHeader'
import Widget from '../components/ui/Widget'
import Placeholder from '../components/ui/Placeholder'
import ComposeWindow from '../components/contact/ComposeWindow'
import SocialLinkCard from '../components/social/SocialLinkCard'

export default function Contact() {
  return (
    <>
      <PageHeader id="contact" />
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7"><ComposeWindow /></div>
        <motion.div variants={stagger} initial="hidden" animate="show" className="grid gap-4 lg:col-span-5">
          <Widget title="Status" icon={Radio}>
            <p className="flex items-center gap-2 text-sm"><span className="relative flex h-2 w-2"><span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400/60 motion-reduce:animate-none" /><span className="relative h-2 w-2 rounded-full bg-emerald-400" /></span><Placeholder>{profile.availability}</Placeholder></p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-3"><dt className="flex items-center gap-2 text-[var(--muted)]"><MapPin size={14} aria-hidden />Location</dt><dd><Placeholder>{profile.location}</Placeholder></dd></div>
              <div className="flex items-center justify-between gap-3"><dt className="flex items-center gap-2 text-[var(--muted)]"><Clock size={14} aria-hidden />Typical reply</dt><dd><Placeholder>{contactConfig.responseTime}</Placeholder></dd></div>
            </dl>
          </Widget>
          <Widget title="Links" icon={Link2}>
            <ul className="-my-1">{socialLinks.map((l) => <li key={l.id}><SocialLinkCard link={l} compact /></li>)}</ul>
          </Widget>
        </motion.div>
      </div>
    </>
  )
}
