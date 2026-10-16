import { useEffect, useState } from 'react'
const fmt = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
export function useClock() {
  const [t, setT] = useState(fmt)
  useEffect(() => { const id = setInterval(() => setT(fmt()), 15000); return () => clearInterval(id) }, [])
  return t
}
