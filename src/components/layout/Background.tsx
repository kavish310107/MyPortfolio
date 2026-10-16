import { motion, useReducedMotion } from 'framer-motion'

const orbs = [
  { cls: 'left-[-10%] top-[-10%] h-[45vmax] w-[45vmax]', c: '91,108,255,.28', x: 60, y: 40, d: 26 },
  { cls: 'right-[-15%] top-[30%] h-[40vmax] w-[40vmax]', c: '94,234,212,.12', x: -50, y: 60, d: 32 },
  { cls: 'bottom-[-20%] left-[25%] h-[35vmax] w-[35vmax]', c: '217,70,239,.12', x: 40, y: -50, d: 38 },
]

export default function Background() {
  const reduce = useReducedMotion()
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950">
      {orbs.map((o, i) => (
        <motion.div key={i} className={`absolute rounded-full will-change-transform ${o.cls}`} style={{ background: `radial-gradient(circle, rgba(${o.c}) 0%, transparent 68%)` }}
          animate={reduce ? undefined : { x: [0, o.x, 0], y: [0, o.y, 0] }}
          transition={{ duration: o.d, repeat: Infinity, ease: 'easeInOut' }} />
      ))}
      <div className="absolute inset-0 opacity-[.07]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '56px 56px', maskImage: 'radial-gradient(ellipse at center,#000 30%,transparent 75%)' }} />
    </div>
  )
}
