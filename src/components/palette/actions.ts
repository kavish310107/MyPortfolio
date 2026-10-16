import { Mail, Code, Users, Link2, ArrowUp, FileText, Keyboard } from 'lucide-react'
import { profile } from '../../data/profile'
import type { SearchEntry } from '../../data/searchIndex'

export const actionEntries: SearchEntry[] = [
  { id: 'act:email', group: 'Actions', title: 'Send email', subtitle: 'Opens your email client', icon: Mail, actionId: 'email', keywords: ['mail', 'contact'] },
  { id: 'act:github', group: 'Actions', title: 'Open GitHub', subtitle: 'External link', icon: Code, actionId: 'github', keywords: ['code', 'repo'] },
  { id: 'act:linkedin', group: 'Actions', title: 'Open LinkedIn', subtitle: 'External link', icon: Users, actionId: 'linkedin' },
  { id: 'act:resume', group: 'Actions', title: 'Open resume (PDF)', subtitle: 'External file', icon: FileText, actionId: 'resume', keywords: ['cv'] },
  { id: 'act:copy', group: 'Actions', title: 'Copy page link', subtitle: 'Copies the current URL', icon: Link2, actionId: 'copy', keywords: ['share', 'url'] },
  { id: 'act:shortcuts', group: 'Actions', title: 'Keyboard shortcuts', subtitle: 'See every shortcut', icon: Keyboard, actionId: 'shortcuts', shortcut: '?', keywords: ['keys', 'help', 'hotkeys'] },
  { id: 'act:top', group: 'Actions', title: 'Scroll to top', icon: ArrowUp, actionId: 'top' },
]

const isPlaceholder = (v: string) => v.startsWith('[')

// Returns a status message for the toast. Placeholder values are blocked (error prevention).
export async function runAction(id: string): Promise<string> {
  const social = (key: string, label: string) => {
    const url = profile.socials.find((s) => s.id === key)?.url ?? ''
    if (isPlaceholder(url)) return `Add your ${label} URL in src/data/profile.ts`
    window.open(url, '_blank', 'noopener,noreferrer'); return `Opening ${label}…`
  }
  switch (id) {
    case 'email':
      if (isPlaceholder(profile.email)) return 'Add your email in src/data/profile.ts'
      window.location.href = `mailto:${profile.email}`; return 'Opening email client…'
    case 'resume':
      if (isPlaceholder(profile.resumeUrl)) return 'Add your resume PDF (see Resume page)'
      window.open(profile.resumeUrl, '_blank', 'noopener,noreferrer'); return 'Opening resume…'
    case 'github': return social('github', 'GitHub')
    case 'linkedin': return social('linkedin', 'LinkedIn')
    case 'copy':
      try { await navigator.clipboard.writeText(window.location.href); return 'Link copied' } catch { return 'Copy not available in this browser' }
    case 'top': window.scrollTo({ top: 0, behavior: 'smooth' }); return 'Back at the top'
    default: return ''
  }
}
