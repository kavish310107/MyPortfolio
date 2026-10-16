const KEY = 'portfolio-os:recent:v1'
export const loadRecent = (): string[] => { try { const v = JSON.parse(localStorage.getItem(KEY) ?? '[]'); return Array.isArray(v) ? v.filter((x) => typeof x === 'string').slice(0, 8) : [] } catch { return [] } }
export const pushRecent = (id: string) => { try { localStorage.setItem(KEY, JSON.stringify([id, ...loadRecent().filter((x) => x !== id)].slice(0, 8))) } catch { /* storage unavailable: recents just won't persist */ } }
