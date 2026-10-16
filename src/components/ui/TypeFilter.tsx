// Reusable pill filter (toggle buttons with aria-pressed). Used by Experience and Achievements.
export default function TypeFilter({ options, value, onChange, label }: { options: { id: string; label: string; count: number }[]; value: string; onChange: (id: string) => void; label: string }) {
  return (
    <div role="group" aria-label={label} className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
      {options.map((o) => (
        <button key={o.id} type="button" aria-pressed={value === o.id} onClick={() => onChange(o.id)}
          className={`min-h-[44px] shrink-0 rounded-2xl border px-4 text-sm transition ${value === o.id ? 'border-accent/60 bg-accent-glow/20 text-white' : 'border-white/10 text-white/60 hover:bg-white/5 hover:text-white'}`}>
          {o.label} <span className="ml-1 font-mono text-[11px] text-white/60">{o.count}</span>
        </button>
      ))}
    </div>
  )
}
