const ua = typeof navigator === 'undefined' ? '' : `${navigator.platform} ${navigator.userAgent}`
export const isMac = /Mac|iPhone|iPad|iPod/i.test(ua)
export const modKey = isMac ? '⌘' : 'Ctrl'
