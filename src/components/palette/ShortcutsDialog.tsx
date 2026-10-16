import { navItems, navKeys } from '../../data/navigation'
import { modKey } from '../../utils/platform'
import Modal from '../ui/Modal'

const K = ({ children }: { children: string }) => <kbd className="rounded-md border border-white/15 bg-white/5 px-1.5 py-0.5 font-mono text-xs">{children}</kbd>
const Row = ({ keys, label }: { keys: string[]; label: string }) => (
  <li className="flex min-h-[40px] items-center justify-between gap-3 text-sm"><span className="text-white/80">{label}</span><span className="flex shrink-0 items-center gap-1">{keys.map((k, i) => <K key={i}>{k}</K>)}</span></li>
)

export default function ShortcutsDialog({ onClose }: { onClose: () => void }) {
  const go = navItems.filter((n) => navKeys[n.id])
  return (
    <Modal labelledBy="shortcuts-title" closeLabel="Close keyboard shortcuts" onClose={onClose} maxWidth="max-w-2xl">
      <div className="p-5 pt-16 sm:p-8 sm:pt-14">
        <h2 id="shortcuts-title" className="text-2xl font-semibold">Keyboard shortcuts</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">Shortcuts work anywhere except while typing in a field or when a dialog is open.</p>
        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          <section aria-labelledby="sc-general"><h3 id="sc-general" className="eyebrow mb-2">General</h3>
            <ul>
              <Row keys={[modKey, 'K']} label="Open search & commands" />
              <Row keys={['/']} label="Open search & commands" />
              <Row keys={['?']} label="Show this list" />
              <Row keys={['Esc']} label="Close dialog or palette" />
            </ul>
            <h3 className="eyebrow mb-2 mt-6">In search</h3>
            <ul>
              <Row keys={['↑', '↓']} label="Move through results" />
              <Row keys={['Enter']} label="Open result" />
              <Row keys={['>']} label="Commands only" />
            </ul>
            <h3 className="eyebrow mb-2 mt-6">In project view</h3>
            <ul><Row keys={['←', '→']} label="Previous / next project" /></ul>
          </section>
          <section aria-labelledby="sc-go"><h3 id="sc-go" className="eyebrow mb-2">Go to (press G, then…)</h3>
            <ul>{go.map((n) => <Row key={n.id} keys={['G', navKeys[n.id].toUpperCase()]} label={n.label} />)}</ul>
          </section>
        </div>
      </div>
    </Modal>
  )
}
