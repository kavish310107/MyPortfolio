import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clock } from 'lucide-react'
import { readingMinutes, type Post } from '../../data/blog'
import { isSet } from '../../utils/links'

export default function PostCard({ post, index = 0, featured = false }: { post: Post; index?: number; featured?: boolean }) {
  return (
    <motion.article layout initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: (index % 3) * 0.05 }} whileHover={{ y: -3 }} className={featured ? 'md:col-span-2 lg:col-span-3' : ''}>
      <Link to={`/blog/${post.slug}`} className={`card group flex h-full flex-col ${featured ? 'md:flex-row md:items-center md:gap-8 md:p-8' : ''}`}>
        {featured && (isSet(post.cover)
          ? <img src={post.cover} alt="" loading="lazy" decoding="async" className="mb-4 h-32 shrink-0 rounded-2xl object-cover md:mb-0 md:h-44 md:w-64" />
          : <div aria-hidden className="mb-4 h-32 shrink-0 rounded-2xl bg-gradient-to-br from-accent-glow/35 via-white/5 to-aqua/20 md:mb-0 md:h-44 md:w-64" />)}
        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-3 text-xs"><span className="rounded-full bg-white/5 px-2.5 py-0.5 text-accent-soft">{post.category}</span><span className="font-mono text-white/60">{post.date}</span>{featured && <span className="text-amber-200">Featured</span>}</div>
          <h2 className={`mt-3 flex items-start justify-between gap-2 font-medium ${featured ? 'text-2xl' : 'text-lg'}`}><span className="placeholder-tag">{post.title}</span><ArrowUpRight size={18} aria-hidden className="mt-1 shrink-0 text-white/30 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" /></h2>
          <p className="mt-2 flex-1 text-sm text-[var(--muted)]">{post.excerpt}</p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2"><ul className="flex flex-wrap gap-1.5">{post.tags.map((t, i) => <li key={i} className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/55">{t}</li>)}</ul><span className="flex items-center gap-1 text-xs text-white/60"><Clock size={12} aria-hidden />{readingMinutes(post)} min read</span></div>
        </div>
      </Link>
    </motion.article>
  )
}
