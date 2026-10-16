import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { consumeMainFocus } from '../utils/navFocus'

// ?focus=<id> targets a specific entry on a page (used by search results). The page prepares its state in `prepare`
// (reset filters, expand the entry); then the element with data-focus-id is scrolled into view, focused and briefly
// highlighted, and the param is removed so the URL stays clean and Back behaves.
export function useDeepLink(prepare?: (id: string) => void) {
  const [params, setParams] = useSearchParams()
  const target = params.get('focus')
  useEffect(() => {
    if (!target) return
    prepare?.(target)
    let tries = 0, raf = 0
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const find = () => {
      const el = document.querySelector<HTMLElement>(`[data-focus-id="${CSS.escape(target)}"]`)
      if (!el) { if (tries++ < 60) raf = requestAnimationFrame(find); return }
      window.setTimeout(() => {
        el.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' })
        const focusable = el.querySelector<HTMLElement>('button, a[href]')
        if (!focusable) el.tabIndex = -1
        ;(focusable ?? el).focus({ preventScroll: true })
        consumeMainFocus()
        const glow = el.querySelector<HTMLElement>('.card') ?? el
        glow.classList.add('deeplink-flash'); window.setTimeout(() => glow.classList.remove('deeplink-flash'), 1800)
      }, 140)
      setParams((p) => { const n = new URLSearchParams(p); n.delete('focus'); return n }, { replace: true })
    }
    raf = requestAnimationFrame(find)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])
}
