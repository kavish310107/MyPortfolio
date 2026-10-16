import { Link, useParams } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import { posts, readingMinutes } from '../data/blog'
import { isSet } from '../utils/links'
import NotFound from './NotFound'

export default function BlogPost() {
  const { slug } = useParams()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  const i = posts.findIndex((p) => p.slug === slug)
  if (i < 0) return <NotFound />
  const p = posts[i], prev = posts[i - 1], next = posts[i + 1]
  return (
    <>
      <motion.div aria-hidden className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-gradient-to-r from-accent to-aqua" style={{ scaleX: progress }} />
      <article className="mx-auto max-w-2xl">
        <Link to="/blog" className="mb-6 inline-flex min-h-[44px] items-center gap-2 text-sm text-[var(--muted)] hover:text-white"><ArrowLeft size={16} aria-hidden />All articles</Link>
        <header>
          <div className="flex flex-wrap items-center gap-3 text-xs"><span className="rounded-full bg-white/5 px-2.5 py-0.5 text-accent-soft">{p.category}</span><span className="font-mono text-white/60">{p.date}</span><span className="flex items-center gap-1 text-white/60"><Clock size={12} aria-hidden />{readingMinutes(p)} min read</span></div>
          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl"><span className="placeholder-tag">{p.title}</span></h1>
          <p className="mt-3 text-lg text-[var(--muted)]">{p.excerpt}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">{p.tags.map((t, k) => <li key={k} className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[11px] text-white/55">{t}</li>)}</ul>
        </header>
        {isSet(p.cover) && <img src={p.cover} alt="" decoding="async" className="mt-8 w-full rounded-3xl object-cover" />}
        <div className="mt-8 space-y-5 border-t border-white/10 pt-8 text-base leading-relaxed text-white/80">
          {p.content.map((b, k) => b.t === 'h2' ? <h2 key={k} className="pt-4 text-xl font-semibold text-white">{b.text}</h2>
            : b.t === 'quote' ? <blockquote key={k} className="rounded-r-2xl border-l-2 border-accent bg-white/[.04] py-3 pl-5 pr-4 text-lg italic">{b.text}</blockquote>
            : b.t === 'ul' ? <ul key={k} className="list-disc space-y-1 pl-6">{b.items.map((it) => <li key={it}>{it}</li>)}</ul>
            : <p key={k}>{b.text}</p>)}
        </div>
        <nav aria-label="More articles" className="mt-12 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2">
          {prev ? <Link to={`/blog/${prev.slug}`} className="card flex min-h-[72px] flex-col"><span className="flex items-center gap-1 text-xs text-[var(--muted)]"><ArrowLeft size={12} aria-hidden />Previous</span><span className="mt-1 text-sm">{prev.title}</span></Link> : <span />}
          {next && <Link to={`/blog/${next.slug}`} className="card flex min-h-[72px] flex-col items-end text-right"><span className="flex items-center gap-1 text-xs text-[var(--muted)]">Next<ArrowRight size={12} aria-hidden /></span><span className="mt-1 text-sm">{next.title}</span></Link>}
        </nav>
      </article>
    </>
  )
}
