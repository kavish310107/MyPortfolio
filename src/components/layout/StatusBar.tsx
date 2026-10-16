import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { currentNavItem } from '../../utils/nav'
import { modKey } from '../../utils/platform'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { site } from '../../data/site'
import { profile } from '../../data/profile'
import { useClock } from '../../hooks/useClock'
import { usePalette } from '../palette/PaletteProvider'

// Menu-bar style strip: communicates system identity and status (visibility of system status).
export default function StatusBar() {
  const time = useClock()
  const { openPalette } = usePalette()
  const { pathname } = useLocation()
  const label = currentNavItem(pathname)?.label ?? 'Not found'
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 12))
  return (
    <header className={`fixed inset-x-3 top-[max(0.75rem,env(safe-area-inset-top))] z-30 mx-auto flex max-w-6xl items-center justify-between rounded-2xl glass-strong px-4 py-2 text-xs transition-[background-color,box-shadow] duration-300 ${scrolled ? '!bg-ink-950/90 shadow-[0_10px_30px_-10px_rgba(0,0,0,.8)]' : ''}`}>
      <div className="flex items-center gap-2 font-medium">
        <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60 motion-reduce:animate-none" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
        <span className="placeholder-tag max-w-[9rem] truncate sm:max-w-none">{profile.name}</span>
        <span className="hidden text-white/60 sm:inline">/ {site.brand}</span><span aria-hidden className="text-white/30">/</span><span aria-current="page" className="font-medium text-white/85">{label}</span>
      </div>
      <div className="flex items-center gap-3 font-mono text-white/55">
        <button type="button" onClick={openPalette} className="hidden min-h-[32px] items-center gap-2 rounded-lg border border-white/10 px-2.5 transition hover:bg-white/10 hover:text-white sm:flex [@media(pointer:coarse)]:min-h-[44px]">Search <kbd>{modKey} K</kbd></button>
        <time>{time}</time>
      </div>
    </header>
  )
}
