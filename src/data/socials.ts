import { Code, Users, AtSign, BarChart3, Globe, Mail, type LucideIcon } from 'lucide-react'
import { profile } from './profile'

// Derived entirely from profile.ts (urls AND handles). Only the icon per network lives here.
export interface SocialLink { id: string; label: string; handle: string; url: string; icon: LucideIcon; kind: 'email' | 'profile' }
const icons: Record<string, LucideIcon> = { github: Code, linkedin: Users, x: AtSign, kaggle: BarChart3, other: Globe }
export const emailLink: SocialLink = { id: 'email', label: 'Email', handle: profile.email, url: profile.email, icon: Mail, kind: 'email' }
export const profileLinks: SocialLink[] = profile.socials.map((s) => ({ ...s, icon: icons[s.id] ?? Globe, kind: 'profile' as const }))
export const socialLinks: SocialLink[] = [emailLink, ...profileLinks]
