import type { Transition, Variants } from 'framer-motion'

// Shared motion language. Short, damped, no bounce: motion explains a change, it never decorates.
export const ease = [0.22, 1, 0.36, 1] as const
export const dur = { instant: 0.12, fast: 0.18, base: 0.3, slow: 0.5 } as const
export const spring: Record<'snappy' | 'soft' | 'pill', Transition> = {
  snappy: { type: 'spring', stiffness: 520, damping: 40 }, // dock, pills, small controls
  soft: { type: 'spring', stiffness: 380, damping: 34 }, // sheets, menus
  pill: { type: 'spring', stiffness: 700, damping: 48 }, // list highlights
}
export const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } } }
export const rise: Variants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: dur.slow, ease } } }
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.24, ease } },
  exit: { opacity: 0, transition: { duration: 0.08 } },
}
// Overlays: the scrim fades, the panel rises a short distance. Exit is faster than entry so closing feels instant.
export const scrim = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0, transition: { duration: dur.fast } } }
export const sheet = { initial: { opacity: 0, y: 28, scale: 0.98 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 16, scale: 0.99, transition: { duration: dur.fast, ease } } }
