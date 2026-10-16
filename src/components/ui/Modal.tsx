import { useEffect, useRef, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { consumeMainFocus } from '../../utils/navFocus'
import { scrim, sheet, spring } from './motion'

// Generic accessible dialog: focus moves in, is trapped, Esc closes, scroll locked, focus restored on close.
export default function Modal({ labelledBy, onClose, closeLabel, children, maxWidth = 'max-w-3xl' }: { labelledBy: string; onClose: () => void; closeLabel: string; children: ReactNode; maxWidth?: string }) {
  const panel = useRef<HTMLDivElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    closeBtn.current?.focus(); consumeMainFocus()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = overflow; (prev && prev.isConnected && prev !== document.body ? prev : document.getElementById('main'))?.focus?.() }
  }, [])
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { e.stopPropagation(); onClose() }
    else if (e.key === 'Tab') {
      const f = panel.current?.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]'); if (!f?.length) return
      const first = f[0], last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
  }
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" onKeyDown={onKey}>
      <motion.div aria-hidden className="absolute inset-0 bg-ink-950/70 backdrop-blur-md" {...scrim} onClick={onClose} />
      <motion.div ref={panel} role="dialog" aria-modal="true" aria-labelledby={labelledBy} {...sheet} transition={spring.soft}
        className={`glass-strong relative max-h-[92dvh] w-full ${maxWidth} overflow-y-auto overscroll-contain rounded-t-[2rem] pb-[env(safe-area-inset-bottom)] sm:rounded-[2rem] sm:pb-0`}>
        <button ref={closeBtn} type="button" onClick={onClose} aria-label={closeLabel} className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-2xl bg-ink-900/80 backdrop-blur transition hover:bg-white/20"><X size={18} /></button>
        {children}
      </motion.div>
    </div>
  )
}
