import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, LayoutDashboard, Plus, RotateCcw } from 'lucide-react'
import { widgetById } from './registry'

interface Props { editing: boolean; onToggle: () => void; hidden: string[]; onShow: (id: string) => void; onReset: () => void; canReset: boolean }

export default function DashboardToolbar({ editing, onToggle, hidden, onShow, onReset, canReset }: Props) {
  const [armed, setArmed] = useState(false)
  useEffect(() => { if (!armed) return; const t = setTimeout(() => setArmed(false), 3500); return () => clearTimeout(t) }, [armed])
  useEffect(() => { if (!canReset || !editing) setArmed(false) }, [canReset, editing])
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="eyebrow flex items-center gap-2"><LayoutDashboard size={14} aria-hidden />Dashboard</h2>
        <button type="button" onClick={onToggle} aria-pressed={editing} className={`btn min-h-[44px] border text-sm ${editing ? 'border-accent/60 bg-accent-glow/25 text-white' : 'glass hover:bg-white/10'}`}>
          {editing ? <><Check size={16} aria-hidden />Done</> : <><LayoutDashboard size={16} aria-hidden />Customize</>}
        </button>
      </div>
      <AnimatePresence initial={false}>{editing && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden"><div className="glass mt-3 space-y-3 rounded-2xl p-4 text-sm">
          <p className="text-[var(--muted)]">Drag the grip on a widget to reorder it, or focus the grip, press <kbd className="rounded border border-white/15 px-1 font-mono text-xs">Space</kbd>, move with the arrow keys and press <kbd className="rounded border border-white/15 px-1 font-mono text-xs">Space</kbd> again. Your layout is saved in this browser.</p>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => { if (armed) { setArmed(false); onReset() } else setArmed(true) }} disabled={!canReset} className={`btn-ghost min-h-[44px] disabled:cursor-not-allowed disabled:opacity-40 ${armed ? '!border-red-300/50 !bg-red-400/15' : ''}`}><RotateCcw size={14} aria-hidden />{armed ? 'Click again to confirm reset' : 'Reset layout'}</button>
            {hidden.map((id) => <button key={id} type="button" onClick={() => onShow(id)} className="btn-ghost min-h-[44px] border-dashed"><Plus size={14} aria-hidden />{widgetById(id)?.title}</button>)}
            {!hidden.length && <span className="text-xs text-white/60">All widgets are visible.</span>}
          </div>
        </div></motion.div>
      )}</AnimatePresence>
    </div>
  )
}
