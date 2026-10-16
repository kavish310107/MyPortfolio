import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, CornerDownRight } from 'lucide-react'
import { navItems, navKeys } from '../../data/navigation'
import { requestMainFocus } from '../../utils/navFocus'
import CommandPalette from './CommandPalette'
import ShortcutsDialog from './ShortcutsDialog'

interface PaletteCtx { returnFocus: { current: HTMLElement | null }; open: boolean; openPalette: () => void; closePalette: () => void; openShortcuts: () => void; toast: (msg: string) => void }
const Ctx = createContext<PaletteCtx | null>(null)
export const usePalette = () => { const c = useContext(Ctx); if (!c) throw new Error('usePalette outside provider'); return c }

const isTyping = (el: EventTarget | null) => el instanceof HTMLElement && (el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName))

export default function PaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [shortcutsOpen, setShortcutsOpen] = useState(false)
  const [goMode, setGoMode] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const goTimer = useRef<number | undefined>(undefined)
  const toastTimer = useRef<number | undefined>(undefined)
  const returnFocus = useRef<HTMLElement | null>(null)

  const toast = useCallback((m: string) => { setMsg(m); window.clearTimeout(toastTimer.current); toastTimer.current = window.setTimeout(() => setMsg(null), 2200) }, [])
  const openPalette = useCallback(() => { returnFocus.current = document.activeElement as HTMLElement; setShortcutsOpen(false); setOpen(true) }, [])
  const closePalette = useCallback(() => setOpen(false), [])
  const openShortcuts = useCallback(() => { setOpen(false); setShortcutsOpen(true) }, [])
  useEffect(() => { setOpen(false); setShortcutsOpen(false) }, [pathname])

  useEffect(() => {
    const endGo = () => { window.clearTimeout(goTimer.current); goTimer.current = undefined; setGoMode(false) }
    const onKey = (e: KeyboardEvent) => {
      if (e.isComposing) return // IME in progress: never hijack
      // Ctrl/⌘+K toggles. Matches the physical K key too so non-Latin layouts still work. Key repeat is ignored (no flicker).
      if ((e.ctrlKey || e.metaKey) && !e.altKey && (e.key.toLowerCase() === 'k' || e.code === 'KeyK')) {
        e.preventDefault(); endGo()
        if (e.repeat) return
        if (open) setOpen(false); else openPalette()
        return
      }
      if (open || shortcutsOpen || isTyping(e.target) || e.ctrlKey || e.metaKey || e.altKey) return
      if (document.querySelector('[role="dialog"]')) return // a project/certificate dialog is open: don't hijack keys behind it
      const k = e.key.toLowerCase()
      if (goTimer.current !== undefined) { // second key of a "G then …" sequence
        endGo()
        const id = Object.entries(navKeys).find(([, v]) => v === k)?.[0]
        const item = navItems.find((n) => n.id === id)
        if (item) { e.preventDefault(); if (item.path !== pathname) requestMainFocus(); navigate(item.path) }
        return
      }
      if (e.key === '/') { e.preventDefault(); openPalette() }
      else if (e.key === '?') { e.preventDefault(); returnFocus.current = document.activeElement as HTMLElement; setShortcutsOpen(true) }
      else if (k === 'g' && !e.repeat) { setGoMode(true); goTimer.current = window.setTimeout(endGo, 1200) }
    }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); window.clearTimeout(goTimer.current) }
  }, [open, shortcutsOpen, navigate, openPalette, pathname])

  const value = useMemo(() => ({ returnFocus, open, openPalette, closePalette, openShortcuts, toast }), [open, openPalette, closePalette, openShortcuts, toast])
  return (
    <Ctx.Provider value={value}>
      {children}
      <CommandPalette />
      <AnimatePresence>{shortcutsOpen && <ShortcutsDialog key="shortcuts" onClose={() => setShortcutsOpen(false)} />}</AnimatePresence>
      <div aria-live="polite" role="status" className="pointer-events-none fixed inset-x-0 top-20 z-[70] flex justify-center">
        <AnimatePresence mode="wait">
          {msg ? <motion.div key="toast" initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6 }} className="glass-strong flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm"><Check size={14} className="text-emerald-400" aria-hidden />{msg}</motion.div>
            : goMode ? <motion.div key="go" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass-strong flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm"><CornerDownRight size={14} className="text-accent-soft" aria-hidden />Go to… press a page key <span className="text-white/60">(? lists them)</span></motion.div> : null}
        </AnimatePresence>
      </div>
    </Ctx.Provider>
  )
}
