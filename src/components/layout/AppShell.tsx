import { Suspense, useEffect, useState } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Background from './Background'
import Dock from './Dock'
import StatusBar from './StatusBar'
import PageSkeleton from '../ui/PageSkeleton'
import { site } from '../../data/site'
import { pageVariants } from '../ui/motion'
import { currentNavItem } from '../../utils/nav'
import { consumeMainFocus } from '../../utils/navFocus'
import { profile } from '../../data/profile'
import { useSpotlight } from '../../hooks/useSpotlight'

export default function AppShell() {
  const { pathname } = useLocation()
  // Capture the outlet per route: an exiting page must keep rendering the OLD page, not the new route (a bare <Outlet/> is live).
  const outlet = useOutlet()
  useSpotlight()
  const [announce, setAnnounce] = useState('')
  // Predictable SPA behaviour: tab title follows the page, and screen readers hear the route change.
  useEffect(() => {
    const item = currentNavItem(pathname)
    const label = item ? (pathname.startsWith('/blog/') ? 'Blog article' : item.label) : 'Page not found'
    document.title = `${label}${site.titleSeparator}${profile.name}`
    document.querySelector('meta[name="description"]')?.setAttribute('content', site.description.replace('{name}', profile.name))
    setAnnounce(`${label} page`)
  }, [pathname])
  // Keyboard/palette navigation: once the old page has finished leaving, focus the new <main> (unless the page took focus itself).
  const onExitComplete = () => window.setTimeout(() => { if (consumeMainFocus()) { const m = document.querySelectorAll<HTMLElement>('main#main'); m[m.length - 1]?.focus({ preventScroll: true }) } }, 80)
  // New page = start at the top (query-string changes such as an open modal keep the scroll position).
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }) }, [pathname])
  return (
    <div className="relative min-h-dvh">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-ink-900 focus:px-4 focus:py-2">Skip to content</a>
      <Background />
      <p role="status" aria-live="polite" className="sr-only">{announce}</p>
      <StatusBar />
      <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
        <motion.main id="main" tabIndex={-1} key={pathname} variants={pageVariants} initial="initial" animate="enter" exit="exit"
          className="mx-auto min-h-[72dvh] w-full max-w-6xl px-4 pb-12 pt-20 sm:px-6 sm:pt-24">
          <Suspense fallback={<PageSkeleton />}>{outlet}</Suspense>
        </motion.main>
      </AnimatePresence>
      <footer className="mx-auto max-w-6xl px-4 pb-36 text-center text-xs text-white/60 sm:px-6">
        <div className="border-t border-white/[.07] pt-6">© {new Date().getFullYear()} <span className="placeholder-tag">{profile.name}</span> · {site.footerNote} · Press <kbd className="rounded border border-white/15 px-1.5 font-mono">?</kbd> for shortcuts</div>
      </footer>
      <div aria-hidden className="pointer-events-none fixed inset-x-0 bottom-0 z-30 h-32 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent" />
      <Dock />
    </div>
  )
}
