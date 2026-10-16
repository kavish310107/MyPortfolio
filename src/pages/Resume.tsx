import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Download, ExternalLink, FileText, Link2, ListChecks } from 'lucide-react'
import { profile } from '../data/profile'
import { resumeMeta, resumeSections } from '../data/resume'
import { profileLinks } from '../data/socials'
import { isSet } from '../utils/links'
import { stagger } from '../components/ui/motion'
import PageHeader from '../components/ui/PageHeader'
import Widget from '../components/ui/Widget'
import Placeholder from '../components/ui/Placeholder'
import SocialLinkCard from '../components/social/SocialLinkCard'

function Preview({ ready }: { ready: boolean }) {
  return (
    <div className="mx-auto aspect-[1/1.414] w-full max-w-md overflow-hidden rounded-2xl border border-white/15 bg-white/[.04] shadow-glass">
      {ready ? (
        <object data={`${profile.resumeUrl}#view=FitH`} type="application/pdf" aria-label="Resume preview" className="h-full w-full">
          <p className="p-6 text-sm">Preview not supported here. <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-accent-soft underline">Open the PDF</a>.</p>
        </object>
      ) : (
        <div className="relative flex h-full flex-col p-6 sm:p-8" role="img" aria-label="Resume preview placeholder">
          <div className="space-y-2" aria-hidden><div className="h-4 w-1/2 rounded bg-white/15" /><div className="h-2 w-1/3 rounded bg-white/10" /></div>
          {[0, 1, 2, 3].map((i) => <div key={i} className="mt-6 space-y-2" aria-hidden><div className="h-2.5 w-1/4 rounded bg-accent/40" /><div className="h-2 w-full rounded bg-white/[.07]" /><div className="h-2 w-5/6 rounded bg-white/[.07]" /><div className="h-2 w-2/3 rounded bg-white/[.07]" /></div>)}
          <div className="absolute inset-0 flex items-center justify-center bg-ink-950/50 backdrop-blur-[2px]"><span className="rounded-lg border border-dashed border-amber-300/50 bg-ink-900/80 px-3 py-2 font-mono text-sm text-amber-200">{profile.resumeUrl}</span></div>
        </div>
      )}
    </div>
  )
}

export default function Resume() {
  const ready = isSet(profile.resumeUrl)
  return (
    <>
      <PageHeader id="resume" />
      <div className="grid gap-4 lg:grid-cols-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card lg:col-span-7"><Preview ready={ready} /></motion.div>
        <motion.div variants={stagger} initial="hidden" animate="show" className="grid content-start gap-4 lg:col-span-5">
          <Widget title="Resume file" icon={FileText}>
            <dl className="mb-4 grid grid-cols-2 gap-3 text-sm"><div><dt className="text-xs text-[var(--muted)]">Last updated</dt><dd className="mt-1"><Placeholder>{resumeMeta.lastUpdated}</Placeholder></dd></div><div><dt className="text-xs text-[var(--muted)]">Pages</dt><dd className="mt-1"><Placeholder>{resumeMeta.pages}</Placeholder></dd></div></dl>
            {ready ? (
              <div className="flex flex-wrap gap-3"><a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-primary"><ExternalLink size={16} aria-hidden />Open resume</a><a href={profile.resumeUrl} download className="btn-ghost"><Download size={16} aria-hidden />Download</a></div>
            ) : (
              <>
                <div className="flex flex-wrap gap-3"><span aria-disabled="true" role="link" className="btn cursor-not-allowed border border-dashed border-amber-300/30 text-amber-200/60"><ExternalLink size={16} aria-hidden />Open resume<span className="sr-only"> (not added yet)</span></span><span aria-disabled="true" role="link" className="btn cursor-not-allowed border border-dashed border-amber-300/30 text-amber-200/60"><Download size={16} aria-hidden />Download<span className="sr-only"> (not added yet)</span></span></div>
                <p role="note" className="mt-4 rounded-xl border border-dashed border-amber-300/30 bg-amber-300/5 px-3 py-2 text-xs text-amber-200/80">Put your PDF in <code className="font-mono">public/</code> (for example <code className="font-mono">public/resume.pdf</code>) and set <code className="font-mono">resumeUrl: '/resume.pdf'</code> in <code className="font-mono">src/data/profile.ts</code>.</p>
              </>
            )}
          </Widget>
          <Widget title="What's inside" icon={ListChecks}>
            <p className="mb-3 text-sm text-[var(--muted)]"><Placeholder>{resumeMeta.headline}</Placeholder></p>
            <ul className="space-y-1">{resumeSections.map((s) => (
              <li key={s.id}><Link to={s.to} className="group flex min-h-[52px] items-center gap-3 rounded-2xl px-2 py-2 transition hover:bg-white/5"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-accent-soft"><s.icon size={16} aria-hidden /></span><span className="min-w-0 flex-1 text-sm">{s.label}<span className="block truncate font-mono text-[11px] text-white/60">{s.summary}</span></span><ChevronRight size={16} aria-hidden className="text-white/30 transition group-hover:translate-x-0.5 group-hover:text-white" /></Link></li>
            ))}</ul>
          </Widget>
          <section aria-label="Quick links"><h2 className="eyebrow mb-3 flex items-center gap-2"><Link2 size={14} aria-hidden />Quick links</h2><ul className="grid gap-3">{profileLinks.slice(0, 2).map((l) => <li key={l.id}><SocialLinkCard link={l} /></li>)}</ul></section>
        </motion.div>
      </div>
    </>
  )
}
