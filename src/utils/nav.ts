import { navItems } from '../data/navigation'

// One definition of "which section am I in", shared by dock, status bar, tab title and palette.
// /blog/post-1 belongs to Blog; "/" only matches exactly.
export const isActivePath = (pathname: string, path: string) => (path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(`${path}/`))
export const currentNavItem = (pathname: string) => navItems.find((n) => isActivePath(pathname, n.path))
