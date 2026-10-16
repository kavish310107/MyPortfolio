// Link values that are empty or still start with "[" are placeholders and must never be rendered as real links.
export const isSet = (url?: string | null) => Boolean(url && !url.startsWith('['))

const q = (v: string) => encodeURIComponent(v)
// Email helpers: no backend, the user's own mail client / Gmail does the sending.
export const mailtoHref = (email: string, subject = '', body = '') => `mailto:${email}?subject=${q(subject)}&body=${q(body)}`
export const gmailHref = (email: string, subject = '', body = '') => `https://mail.google.com/mail/?view=cm&fs=1&to=${q(email)}&su=${q(subject)}&body=${q(body)}`
