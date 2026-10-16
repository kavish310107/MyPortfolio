#!/usr/bin/env node
/**
 * Content audit. Two modes:
 *   node scripts/content-audit.mjs report   → lists every placeholder still left in src/data (what you still need to fill in)
 *   node scripts/content-audit.mjs lint     → fails (exit 1) if a component/page hardcodes placeholder text instead of reading src/data
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'

import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const src = join(root, 'src')
// A placeholder is a bracketed, mostly-UPPERCASE token such as [YOUR NAME] or [PROJECT ${n} TITLE].
const PLACEHOLDER = /\[(?=[A-Z])(?=[^\]\n]*[A-Z]{3})(?:[A-Z0-9 \/&·—.,'\-:+()]|\$\{[^}]*\})+\]/g

const walk = (dir) => readdirSync(dir).flatMap((f) => { const p = join(dir, f); return statSync(p).isDirectory() ? walk(p) : /\.(ts|tsx)$/.test(f) ? [p] : [] })
const find = (file) => { const text = readFileSync(file, 'utf8'); return [...text.matchAll(PLACEHOLDER)].map((m) => ({ token: m[0].replace(/\$\{[^}]*\}/g, 'N'), line: text.slice(0, m.index).split('\n').length })) }
const mode = process.argv[2] ?? 'report'

if (mode === 'lint') {
  const bad = walk(src).filter((f) => !relative(src, f).startsWith('data/')).flatMap((f) => find(f).map((h) => `${relative(root, f)}:${h.line}  ${h.token}`))
  if (bad.length) { console.error('✖ Placeholder text is hardcoded outside src/data (move it into the matching data file):\n  ' + bad.join('\n  ')); process.exit(1) }
  console.log('✔ No placeholder text hardcoded in components or pages. All replaceable content lives in src/data.')
} else {
  const files = walk(join(src, 'data')).map((f) => ({ f: relative(root, f), hits: find(f) })).filter((x) => x.hits.length)
  let total = 0
  console.log('\nPlaceholders still to replace (by data file)\n' + '─'.repeat(60))
  for (const { f, hits } of files.sort((a, b) => b.hits.length - a.hits.length)) {
    const unique = [...new Set(hits.map((h) => h.token))]; total += hits.length
    console.log(`\n${f}   ${hits.length} occurrence(s), ${unique.length} distinct`)
    console.log('  ' + unique.slice(0, 8).join('  ') + (unique.length > 8 ? `  … +${unique.length - 8} more` : ''))
  }
  console.log('\n' + '─'.repeat(60) + `\nTotal: ${total} placeholder value(s) across ${files.length} data file(s).`)
  const flags = [['src/data/academics.ts', /isSample:\s*true/], ['src/data/skills.ts', /isSample:\s*true/], ['src/data/activity.ts', /isSample:\s*true/]].filter(([f, re]) => re.test(readFileSync(join(root, f), 'utf8'))).map(([f]) => f)
  if (flags.length) console.log(`Sample numbers still flagged (set isSample to false after entering real data):\n  ${flags.join('\n  ')}`)
  for (const [label, p] of [['Resume PDF', 'public/resume.pdf'], ['Profile photo folder', 'public/images']]) console.log(`${existsSync(join(root, p)) ? '✔' : '·'} ${label}: ${p}`)
  console.log('')
}
