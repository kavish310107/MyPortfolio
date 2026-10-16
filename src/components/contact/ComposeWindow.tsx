import { useState } from 'react'
import { Copy, ExternalLink, Mail } from 'lucide-react'
import { profile } from '../../data/profile'
import { contactConfig } from '../../data/contact'
import { gmailHref, isSet, mailtoHref } from '../../utils/links'
import { usePalette } from '../palette/PaletteProvider'


// OS-style "Mail" window. It only builds a draft: nothing is sent or stored by this site.
export default function ComposeWindow() {
  const { toast } = usePalette()
  const [subject, setSubject] = useState(contactConfig.subjects[0])
  const [message, setMessage] = useState('')
  const ready = isSet(profile.email)
  const guard = (fn: () => void) => () => (ready ? fn() : toast('Add your email in src/data/profile.ts'))
  const copy = guard(async () => { try { await navigator.clipboard.writeText(profile.email); toast('Email address copied') } catch { toast('Copy not available in this browser') } })

  return (
    <section aria-label="Compose email" className="glass-strong overflow-hidden rounded-3xl">
      <header className="flex items-center gap-2 border-b border-white/10 px-4 py-3" aria-hidden>
        <span className="h-3 w-3 rounded-full bg-red-400/80" /><span className="h-3 w-3 rounded-full bg-amber-300/80" /><span className="h-3 w-3 rounded-full bg-emerald-400/80" />
        <span className="ml-3 font-mono text-xs text-white/60">Mail — New message</span>
      </header>
      <div className="space-y-4 p-5 sm:p-6">
        <div className="flex items-center gap-3 border-b border-white/5 pb-3 text-sm"><span className="w-14 text-[var(--muted)]">To</span><span className="placeholder-tag">{profile.email}</span></div>
        <div>
          <p id="subj-label" className="mb-2 text-sm text-[var(--muted)]">Subject</p>
          <div role="group" aria-labelledby="subj-label" className="flex flex-wrap gap-2">
            {contactConfig.subjects.map((s) => <button key={s} type="button" aria-pressed={subject === s} onClick={() => setSubject(s)} className={`min-h-[44px] rounded-2xl border px-4 text-sm transition ${subject === s ? 'border-accent/60 bg-accent-glow/20 text-white' : 'border-white/10 text-white/60 hover:bg-white/5'}`}>{s}</button>)}
          </div>
        </div>
        <div>
          <label htmlFor="msg" className="mb-2 block text-sm text-[var(--muted)]">Message <span className="text-white/60">(optional)</span></label>
          <textarea id="msg" value={message} onChange={(e) => setMessage(e.target.value)} rows={5} maxLength={1500} placeholder={contactConfig.messagePlaceholder} className="input !min-h-[120px] resize-y py-3" />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={guard(() => { window.location.href = mailtoHref(profile.email, subject, message) })} className="btn-primary"><Mail size={16} aria-hidden />Open in email app</button>
          <button type="button" onClick={guard(() => window.open(gmailHref(profile.email, subject, message), '_blank', 'noopener,noreferrer'))} className="btn-ghost"><ExternalLink size={16} aria-hidden />Open in Gmail</button>
          <button type="button" onClick={copy} className="btn-ghost"><Copy size={16} aria-hidden />Copy address</button>
        </div>
        <p className="text-xs text-white/60">{contactConfig.privacyNote}</p>
        {!ready && <p role="note" className="rounded-xl border border-dashed border-amber-300/30 bg-amber-300/5 px-3 py-2 text-xs text-amber-200/80">Email isn't set yet. Add it in <code className="font-mono">src/data/profile.ts</code> and these buttons go live.</p>}
      </div>
    </section>
  )
}
