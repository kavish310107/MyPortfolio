import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

export default function AnimatedNumber({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  useEffect(() => {
    if (!inView || !ref.current) return
    const el = ref.current
    if (reduce) { el.textContent = value.toFixed(decimals); return }
    const c = animate(0, value, { duration: 1.2, ease: 'easeOut', onUpdate: (v) => { el.textContent = v.toFixed(decimals) } })
    return () => c.stop()
  }, [inView, value, decimals, reduce])
  return <span ref={ref}>{(0).toFixed(decimals)}</span>
}
