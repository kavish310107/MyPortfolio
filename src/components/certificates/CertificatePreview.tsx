import { FileText, Image as ImageIcon } from 'lucide-react'
import type { Certificate } from '../../data/certificates'
import { isSet } from '../../utils/links'

// Shows the real certificate once `file` is set: an <img> for images, a PDF badge for PDFs (opened via the "Open PDF" button).
// Until then it renders a clearly marked placeholder.
export default function CertificatePreview({ cert, className = '' }: { cert: Certificate; className?: string }) {
  const ready = isSet(cert.file), Icon = cert.fileType === 'pdf' ? FileText : ImageIcon
  return (
    <div className={`relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[.06] to-white/[.02] ${className}`}>
      {ready && cert.fileType === 'image'
        ? <img src={cert.file} alt={`${cert.title} certificate`} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-contain" />
        : <>
            <div aria-hidden className="absolute inset-3 rounded-xl border border-dashed border-white/15" />
            <Icon size={28} className="relative text-white/60" aria-hidden />
            {ready ? <span className="relative text-xs text-white/70">PDF document</span> : <span className="relative rounded-md border border-dashed border-amber-300/40 bg-amber-300/10 px-2 py-0.5 font-mono text-[11px] text-amber-200">{cert.file}</span>}
          </>}
      <span className="absolute right-3 top-3 rounded-md bg-ink-900/70 px-1.5 py-0.5 font-mono text-[10px] uppercase text-white/60">{cert.fileType}</span>
    </div>
  )
}
