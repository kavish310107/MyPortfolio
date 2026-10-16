import { motion } from 'framer-motion'

export function ProgressRing({ value, max, size = 140, label }: { value: number; max: number; size?: number; label: string }) {
  const r = size / 2 - 10, c = 2 * Math.PI * r
  return (
    <div className="relative" style={{ width: size, height: size }} role="img" aria-label={label}>
      <svg width={size} height={size} className="-rotate-90">
        <defs><linearGradient id="ring" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7c8cff" /><stop offset="1" stopColor="#5eead4" /></linearGradient></defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="10" />
        <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="url(#ring)" strokeWidth="10" strokeLinecap="round" strokeDasharray={c}
          initial={{ strokeDashoffset: c }} whileInView={{ strokeDashoffset: c * (1 - value / max) }} viewport={{ once: true }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-3xl font-semibold tabular-nums">{value}</span><span className="text-xs text-white/60">/ {max}</span></div>
    </div>
  )
}

export function Bar({ pct, label }: { pct: number; label: string }) {
  return (
    <div role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100} aria-label={label} className="h-2.5 overflow-hidden rounded-full bg-white/[.07]">
      <motion.div className="h-full rounded-full bg-gradient-to-r from-accent-glow to-aqua" initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} />
    </div>
  )
}

export function LevelDots({ level, max = 5 }: { level: number; max?: number }) {
  return (
    <span className="flex gap-1" aria-hidden>
      {Array.from({ length: max }, (_, i) => <span key={i} className={`h-1.5 w-5 rounded-full transition-colors ${i < level ? 'bg-accent shadow-[0_0_8px_rgba(124,140,255,.7)]' : 'bg-white/10'}`} />)}
    </span>
  )
}
