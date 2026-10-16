import type { SearchEntry } from '../data/searchIndex'

export const norm = (s: string) => s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ')
export const tokensOf = (q: string) => norm(q).split(/\s+/).filter(Boolean)
export interface Scored { entry: SearchEntry; score: number }

// In-order letters whose first letter starts a word: "prj" finds "project", but random scatter does not.
const fuzzy = (needle: string, words: string[]) => {
  if (needle.length < 4 || !words.some((w) => w[0] === needle[0])) return false
  const hay = words.join(''); let i = 0
  for (const c of hay) if (c === needle[i]) i++
  return i === needle.length
}

// Every token must match somewhere. Title prefix > word prefix > title substring > keyword > subtitle/group > fuzzy.
export function scoreEntries(entries: SearchEntry[], query: string): Scored[] {
  const tokens = tokensOf(query)
  if (!tokens.length) return entries.map((entry) => ({ entry, score: 0 }))
  const out: Scored[] = []
  for (const entry of entries) {
    const title = norm(entry.title), words = title.split(/\s+/).filter(Boolean)
    const sub = norm(entry.subtitle ?? ''), group = norm(entry.group), kw = (entry.keywords ?? []).map(norm)
    let total = 0
    for (const t of tokens) {
      const s = title.startsWith(t) ? 6 : words.some((w) => w.startsWith(t)) ? 5 : title.includes(t) ? 4
        : kw.some((k) => k.split(/\s+/).some((w) => w.startsWith(t))) ? 3 : sub.includes(t) || group.includes(t) ? 2 : fuzzy(t, words) ? 1 : 0
      if (!s) { total = 0; break }
      total += s
    }
    if (total) out.push({ entry, score: total + (title.trim() === tokens.join(' ') ? 4 : 0) })
  }
  return out.sort((a, b) => b.score - a.score)
}
