import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { BadgeCheck, ExternalLink, FileText } from 'lucide-react'
import { certificates, certCategories } from '../data/certificates'
import PageHeader from '../components/ui/PageHeader'
import TypeFilter from '../components/ui/TypeFilter'
import Modal from '../components/ui/Modal'
import CertificatePreview from '../components/certificates/CertificatePreview'
import ExternalLinkButton from '../components/projects/ExternalLinkButton'

export default function Certificates() {
  const [params, setParams] = useSearchParams()
  const [cat, setCat] = useState('all')
  const options = useMemo(() => [{ id: 'all', label: 'All', count: certificates.length }, ...certCategories.map((c) => ({ id: c, label: c, count: certificates.filter((x) => x.category === c).length })).filter((o) => o.count)], [])
  const list = certificates.filter((c) => cat === 'all' || c.category === cat)
  const sel = certificates.find((c) => c.id === params.get('c'))
  return (
    <>
      <PageHeader id="certificates" />
      <TypeFilter label="Filter by category" options={options} value={cat} onChange={setCat} />
      <p role="status" aria-live="polite" className="sr-only">{list.length} certificates shown</p>
      <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((c, i) => (
            <motion.article key={c.id} layout initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: (i % 3) * 0.05 }} whileHover={{ y: -3 }} className="card group relative flex flex-col !p-3">
              <CertificatePreview cert={c} className="h-40 transition group-hover:border-accent/40" />
              <div className="p-3">
                <p className="eyebrow !text-[10px]">{c.category}</p>
                <h2 className="mt-1 text-base font-medium"><button type="button" onClick={() => setParams({ c: c.id })} aria-describedby={`${c.id}-meta`} aria-haspopup="dialog" className="placeholder-tag text-left after:absolute after:inset-0 after:z-0 after:rounded-3xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-accent">{c.title}</button></h2>
                <p id={`${c.id}-meta`} className="mt-1 text-sm text-[var(--muted)]">{c.issuer} · <span className="font-mono text-xs">{c.date}</span></p>
              </div>
              <div className="relative z-10 mt-auto flex items-center justify-between border-t border-white/5 px-3 pt-2">
                <span className="text-xs text-white/60">Preview →</span>
                <ExternalLinkButton compact href={c.credentialUrl} label={`Verify ${c.title}`} icon={<ExternalLink size={16} aria-hidden />} />
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {sel && (
          <Modal key="cert" labelledBy="cert-title" closeLabel="Close certificate preview" onClose={() => setParams({})}>
            <div className="space-y-5 p-5 pt-16 sm:p-8 sm:pt-14">
              <CertificatePreview cert={sel} className="aspect-[4/3] w-full" />
              <div>
                <p className="eyebrow">{sel.category}</p>
                <h2 id="cert-title" className="mt-2 text-2xl font-semibold"><span className="placeholder-tag">{sel.title}</span></h2>
                <p className="mt-2 text-[var(--muted)]">{sel.issuer} · <span className="font-mono text-sm">{sel.date}</span></p>
                <p className="mt-3 text-sm text-white/70">{sel.description}</p>
              </div>
              <dl className="grid gap-3 rounded-2xl border border-white/10 bg-white/[.03] p-4 text-sm sm:grid-cols-2">
                <div><dt className="text-xs text-[var(--muted)]">Credential ID</dt><dd className="mt-1 font-mono">{sel.credentialId}</dd></div>
                <div><dt className="text-xs text-[var(--muted)]">Skills</dt><dd className="mt-1 flex flex-wrap gap-1.5">{sel.skills.map((s, i) => <span key={i} className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[11px]">{s}</span>)}</dd></div>
              </dl>
              <div className="flex flex-wrap gap-2">
                <ExternalLinkButton href={sel.credentialUrl} label="Verify credential" icon={<BadgeCheck size={16} aria-hidden />} />
                <ExternalLinkButton href={sel.file} label={sel.fileType === 'pdf' ? 'Open PDF' : 'Open image'} icon={<FileText size={16} aria-hidden />} />
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}
