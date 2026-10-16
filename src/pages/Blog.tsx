import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, SearchX } from 'lucide-react'
import { posts, blogCategories } from '../data/blog'
import PageHeader from '../components/ui/PageHeader'
import EmptyState from '../components/ui/EmptyState'
import TypeFilter from '../components/ui/TypeFilter'
import PostCard from '../components/blog/PostCard'

export default function Blog() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const options = useMemo(() => [{ id: 'all', label: 'All', count: posts.length }, ...blogCategories.map((c) => ({ id: c, label: c, count: posts.filter((p) => p.category === c).length })).filter((o) => o.count)], [])
  const list = posts.filter((p) => (cat === 'all' || p.category === cat) && (!q.trim() || q.toLowerCase().split(/\s+/).every((t) => [p.title, p.excerpt, p.category, ...p.tags].join(' ').toLowerCase().includes(t))))
  const lead = list.find((p) => p.featured && cat === 'all' && !q)
  return (
    <>
      <PageHeader id="blog" />
      <div className="relative mb-4"><Search size={16} aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/60" /><input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles…" aria-label="Search articles" className="input !pl-11" /></div>
      <TypeFilter label="Filter by category" options={options} value={cat} onChange={setCat} />
      <p role="status" aria-live="polite" className="sr-only">{list.length} articles shown</p>
      <motion.div layout className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">{list.map((p, i) => <PostCard key={p.slug} post={p} index={i} featured={p === lead} />)}</AnimatePresence>
      </motion.div>
      {!list.length && <EmptyState icon={SearchX} title="No articles match" hint="Try a different search or category." actionLabel="Clear filters" onAction={() => { setQ(''); setCat('all') }} />}
    </>
  )
}
