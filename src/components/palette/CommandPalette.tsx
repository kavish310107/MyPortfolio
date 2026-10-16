import { useCallback, useEffect, useId, useMemo, useRef, useState, type ReactElement } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Clock, CornerDownLeft, Search, SearchX, X } from 'lucide-react'
import { buildSearchIndex, groupOrder, type SearchEntry } from '../../data/searchIndex'
import { navKeys } from '../../data/navigation'
import { scoreEntries, tokensOf } from '../../utils/search'
import { currentNavItem } from '../../utils/nav'
import { requestMainFocus } from '../../utils/navFocus'
import { loadRecent, pushRecent } from '../../utils/recent'
import { actionEntries, runAction } from './actions'
import { usePalette } from './PaletteProvider'
import { scrim, spring } from '../ui/motion'

const allEntries: SearchEntry[] = [...buildSearchIndex(), ...actionEntries]
const byId = new Map(allEntries.map((e) => [e.id, e]))
const pages = allEntries.filter((e) => e.group === 'Pages')
const PER_GROUP = 6, MAX_ROWS = 30
interface Row { key: string; entry: SearchEntry; group: string }
const shortcutFor = (e: SearchEntry) => { const id = e.id.startsWith('page:') ? e.id.slice(5) : ''; return e.shortcut ?? (navKeys[id] ? `G ${navKeys[id].toUpperCase()}` : undefined) }

// Highlights the matched parts of a label so users can see why a result appeared (recognition over recall).
function Hl({ text, terms }: { text: string; terms: string[] }) {
  if (!terms.length) return <>{text}</>
  const low = text.toLowerCase(), marks = new Array<boolean>(text.length).fill(false)
  for (const t of terms) { let i = low.indexOf(t); while (i >= 0) { for (let k = i; k < i + t.length; k++) marks[k] = true; i = low.indexOf(t, i + t.length) } }
  const out: ReactElement[] = []; let start = 0
  for (let i = 1; i <= text.length; i++) if (i === text.length || marks[i] !== marks[start]) { const part = text.slice(start, i); out.push(marks[start] ? <mark key={start} className="rounded-sm bg-transparent font-semibold text-accent-soft underline decoration-accent/60 underline-offset-2">{part}</mark> : <span key={start}>{part}</span>); start = i }
  return <>{out}</>
}

export default function CommandPalette() {
  const { open, closePalette, toast, returnFocus, openShortcuts } = usePalette()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [recent, setRecent] = useState<string[]>([])
  const input = useRef<HTMLInputElement | null>(null)
  const list = useRef<HTMLUListElement>(null)
  const uid = useId()
  // Stable identity: React calls a ref callback again on every render if it changes, which would re-focus this input
  // while the palette is animating out and steal focus from the page the user just navigated to.
  const setInput = useCallback((el: HTMLInputElement | null) => { input.current = el; el?.focus() }, [])

  const q = query.trim(), cmdMode = q.startsWith('>'), term = cmdMode ? q.slice(1).trim() : q
  const terms = useMemo(() => tokensOf(term), [term])

  const { rows, noMatch } = useMemo(() => {
    const mk = (e: SearchEntry, group: string): Row => ({ key: `${group}:${e.id}`, entry: e, group })
    if (!q) { // Empty: recent first, then pages and commands (a short, familiar menu).
      const rec = recent.map((id) => byId.get(id)).filter((e): e is SearchEntry => !!e).slice(0, 4)
      const seen = new Set(rec.map((e) => e.id))
      return { rows: [...rec.map((e) => mk(e, 'Recent')), ...allEntries.filter((e) => (e.group === 'Pages' || e.group === 'Actions') && !seen.has(e.id)).map((e) => mk(e, e.group))], noMatch: false }
    }
    const scored = scoreEntries(cmdMode ? actionEntries : allEntries, term)
    const groups = new Map<string, { score: number; items: SearchEntry[] }>()
    for (const { entry, score } of scored) { const g = groups.get(entry.group) ?? { score, items: [] }; if (g.items.length < (entry.group === 'Pages' ? 8 : PER_GROUP)) g.items.push(entry); groups.set(entry.group, g) }
    const ordered = [...groups.entries()].sort((a, b) => b[1].score - a[1].score || groupOrder.indexOf(a[0] as never) - groupOrder.indexOf(b[0] as never))
    const found = ordered.flatMap(([g, v]) => v.items.map((e) => mk(e, g))).slice(0, MAX_ROWS)
    if (found.length) return { rows: found, noMatch: false }
    return { rows: (cmdMode ? actionEntries : pages).map((e) => mk(e, cmdMode ? 'Available commands' : 'Browse pages')), noMatch: true }
  }, [q, cmdMode, term, recent])

  useEffect(() => { if (open) { setQuery(''); setActive(0); setRecent(loadRecent()) } else returnFocus.current?.focus?.() }, [open, returnFocus])
  useEffect(() => setActive(0), [query])
  useEffect(() => { list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' }) }, [active, rows])

  const choose = async (e?: SearchEntry) => {
    if (!e) return
    if (!e.actionId) pushRecent(e.id)
    if (e.actionId === 'shortcuts') { openShortcuts(); return }
    if (e.to) {
      // Navigation: focus belongs to the destination, not the old opener.
      returnFocus.current = null
      if (e.to.split('?')[0] !== pathname) requestMainFocus()
      closePalette(); navigate(e.to); return
    }
    closePalette()
    if (e.actionId) { const m = await runAction(e.actionId); if (m) toast(m) }
  }

  const onKeyDown = (ev: React.KeyboardEvent) => {
    const n = rows.length
    if (ev.nativeEvent.isComposing) return
    if (ev.key === 'Escape') { ev.preventDefault(); closePalette() }
    else if (ev.key === 'ArrowDown') { ev.preventDefault(); setActive((i) => (n ? (i + 1) % n : 0)) }
    else if (ev.key === 'ArrowUp') { ev.preventDefault(); setActive((i) => (n ? (i - 1 + n) % n : 0)) }
    else if (ev.key === 'Home' && ev.ctrlKey) { ev.preventDefault(); setActive(0) }
    else if (ev.key === 'End' && ev.ctrlKey) { ev.preventDefault(); setActive(Math.max(n - 1, 0)) }
    else if (ev.key === 'PageDown') { ev.preventDefault(); setActive((i) => Math.min(i + 5, n - 1)) }
    else if (ev.key === 'PageUp') { ev.preventDefault(); setActive((i) => Math.max(i - 5, 0)) }
    else if (ev.key === 'Enter') { ev.preventDefault(); void choose(rows[active]?.entry) }
    else if (ev.key === 'Tab') ev.preventDefault() // focus stays in the dialog; arrows move through results
  }

  const current = currentNavItem(pathname)?.id
  const status = noMatch ? `No results for ${q}. Showing ${rows.length} ${cmdMode ? 'commands' : 'pages'} instead.` : `${rows.length} result${rows.length === 1 ? '' : 's'}`
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center px-3 pt-[calc(env(safe-area-inset-top)+0.75rem)] sm:pt-[12vh]" onKeyDown={onKeyDown}>
          <motion.div aria-hidden className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm" {...scrim} onClick={closePalette} />
          <motion.div role="dialog" aria-modal="true" aria-label="Search and commands" initial={{ opacity: 0, y: -14, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.985, transition: { duration: 0.14 } }} transition={spring.soft}
            className="glass-strong relative w-full max-w-xl overflow-hidden rounded-3xl shadow-[0_30px_80px_-20px_rgba(0,0,0,.8)]">
            <div className="flex items-center gap-3 border-b border-white/10 px-4 transition-colors focus-within:border-accent/70 focus-within:bg-white/[.03]">
              <Search size={18} className="shrink-0 text-white/60" aria-hidden />
              {cmdMode && <span className="shrink-0 rounded-md bg-accent-glow/25 px-2 py-0.5 text-[11px] text-accent-soft">Commands</span>}
              <input ref={setInput} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the site… (type > for commands)" autoComplete="off" autoCapitalize="off" spellCheck={false} enterKeyHint="go"
                role="combobox" aria-expanded="true" aria-controls={`${uid}-list`} aria-autocomplete="list" aria-activedescendant={rows[active] ? `${uid}-${active}` : undefined} aria-label="Search the site"
                className="h-14 w-full bg-transparent text-base outline-none placeholder:text-white/55 focus-visible:outline-none" />
              {query && <button type="button" onClick={() => { setQuery(''); input.current?.focus() }} aria-label="Clear search" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white/60 hover:bg-white/10 hover:text-white"><X size={16} aria-hidden /></button>}
              <kbd className="hidden rounded-md border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white/60 sm:block">Esc</kbd>
              <button type="button" onClick={closePalette} aria-label="Done, close search" className="-mr-2 flex h-11 min-w-[3.25rem] shrink-0 items-center justify-center rounded-xl text-white/60 hover:bg-white/10 hover:text-white sm:hidden"><span className="text-sm">Done</span></button>
            </div>
            {noMatch && <p className="flex items-start gap-3 px-5 pt-5 text-sm"><SearchX size={18} className="mt-0.5 shrink-0 text-white/60" aria-hidden /><span>No results for “{term}”.<span className="block text-xs text-[var(--muted)]">Try a page, project, skill or article name — or pick one below.</span></span></p>}
            <motion.ul layoutScroll ref={list} id={`${uid}-list`} role="listbox" aria-label="Results" className="max-h-[min(50dvh,26rem)] overflow-y-auto overscroll-contain p-2">
              {rows.map((r, i) => {
                const e = r.entry, sc = shortcutFor(e), header = i === 0 || rows[i - 1].group !== r.group
                return (
                  <li key={r.key} role="presentation">
                    {header && <p className="flex items-center gap-1.5 px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-widest text-white/60">{r.group === 'Recent' && <Clock size={10} aria-hidden />}{r.group}</p>}
                    <div id={`${uid}-${i}`} role="option" aria-selected={i === active} onMouseMove={() => i !== active && setActive(i)} onClick={() => void choose(e)} className="relative flex min-h-[48px] cursor-pointer items-center gap-3 rounded-2xl px-3 py-2">
                      {i === active && <motion.span layoutId="palette-active" transition={spring.pill} className="absolute inset-0 rounded-2xl bg-accent-glow/25" />}
                      <span className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${i === active ? 'bg-white/15' : 'bg-white/5'}`}><e.icon size={16} aria-hidden /></span>
                      <span className="relative min-w-0 flex-1"><span className="block truncate text-sm"><Hl text={e.title} terms={terms} /></span>{e.subtitle && <span className="block truncate text-xs text-[var(--muted)]"><Hl text={e.subtitle} terms={terms} /></span>}</span>
                      {e.id === `page:${current}` && <span className="relative rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] text-emerald-300">Current</span>}
                      {e.meta && <span className="relative hidden max-w-[7rem] truncate rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-white/60 sm:block">{e.meta}</span>}
                      {sc && <kbd className="relative hidden font-mono text-[10px] text-white/60 sm:block">{sc}</kbd>}
                    </div>
                  </li>
                )
              })}
            </motion.ul>
            <div className="hidden items-center justify-between gap-4 border-t border-white/10 px-4 py-2 text-[11px] text-white/60 sm:flex">
              <span className="flex items-center gap-3"><span>↑↓ move</span><span className="flex items-center gap-1"><CornerDownLeft size={11} aria-hidden /> open</span><span>esc close</span></span>
              <span><kbd className="font-mono">&gt;</kbd> commands · <kbd className="font-mono">?</kbd> shortcuts</span>
            </div>
            <p role="status" className="sr-only">{status}</p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
