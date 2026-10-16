import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { LayoutGrid, Search, X } from 'lucide-react'
import { navItems } from '../../data/navigation'
import { dur, ease, spring } from '../ui/motion'
import { usePalette } from '../palette/PaletteProvider'
import { isActivePath } from '../../utils/nav'

// Floating dock. Large targets on a screen edge (Fitts); 5 primary destinations + one "More" menu (Hick-Hyman);
// search/command entry always one tap away (recognition over recall).
export default function Dock() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { openPalette } = usePalette()
  const menu = useRef<HTMLDivElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const primary = navItems.filter((n) => n.primary)
  const secondary = navItems.filter((n) => !n.primary)
  const moreActive = secondary.some((n) => isActivePath(pathname, n.path))

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    menu.current?.querySelector<HTMLElement>('a')?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); toggle.current?.focus() } }
    const onDown = (e: PointerEvent) => { const t = e.target as Node; if (!menu.current?.contains(t) && !toggle.current?.contains(t)) setOpen(false) }
    window.addEventListener('keydown', onKey); window.addEventListener('pointerdown', onDown)
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('pointerdown', onDown) }
  }, [open])

  const btn = 'group relative flex h-12 w-12 items-center justify-center rounded-2xl sm:h-14 sm:w-16'
  return (
    <nav aria-label="Main navigation" className="fixed inset-x-0 bottom-0 z-40 flex flex-col items-center gap-3 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <AnimatePresence>
        {open && (
          <motion.div ref={menu} id="more-menu" initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.97, transition: { duration: 0.14 } }} transition={{ ...spring.soft, staggerChildren: 0.03, delayChildren: 0.02 }}
            className="glass-strong grid w-full max-w-md grid-cols-3 gap-2 rounded-3xl p-3">
            {secondary.map((n) => (
              <NavLink key={n.id} to={n.path} className={({ isActive }) => `relative flex min-h-[68px] flex-col items-center justify-center gap-1 rounded-2xl text-xs transition ${isActive ? 'bg-accent-glow/25 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                {({ isActive }) => (<><n.icon size={20} aria-hidden />{n.label}{isActive && <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-accent" aria-hidden />}</>)}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.ul initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: dur.slow, ease, delay: 0.15 }} className="glass-strong flex items-center gap-1 rounded-[28px] p-1.5">
        {primary.map((n) => (
          <li key={n.id}>
            <NavLink to={n.path} end={n.path === '/'} aria-label={n.label} className={btn}>
              {({ isActive }) => (
                <>
                  {isActive && <motion.span layoutId="dock-active" className="absolute inset-0 rounded-2xl bg-white/10 shadow-glow" transition={spring.snappy} />}
                  <motion.span whileHover={{ y: -4, scale: 1.12 }} whileTap={{ scale: 0.92 }} className={`relative ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`}><n.icon size={22} aria-hidden /></motion.span>
                  {isActive && <span aria-hidden className="absolute bottom-1 h-1 w-1 rounded-full bg-accent" />}
                  <span aria-hidden className="pointer-events-none absolute -top-9 hidden whitespace-nowrap rounded-lg bg-ink-900/90 px-2 py-1 text-xs opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100 sm:block">{n.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
        <li>
          <button ref={toggle} type="button" aria-expanded={open} aria-controls="more-menu" aria-label={open ? 'Close more pages' : 'More pages'} onClick={() => setOpen((v) => !v)}
            className={`${btn} transition ${open || moreActive ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'}`}>
            {open ? <X size={22} /> : <LayoutGrid size={22} />}
            {moreActive && !open && <span aria-hidden className="absolute bottom-1 h-1 w-1 rounded-full bg-accent" />}
          </button>
        </li>
        <li aria-hidden className="mx-1 h-7 w-px bg-white/10" />
        <li>
          <motion.button type="button" whileTap={{ scale: 0.92 }} onClick={openPalette} aria-label="Open command palette (Ctrl K)" aria-haspopup="dialog" className={`${btn} text-white/60 hover:text-white`}>
            <Search size={22} aria-hidden />
          </motion.button>
        </li>
      </motion.ul>
    </nav>
  )
}
