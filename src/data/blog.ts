export type Block = { t: 'h2' | 'p' | 'quote'; text: string } | { t: 'ul'; items: string[] }
export const blogCategories = ['Technical', 'Learning', 'Project notes'] as const
export type BlogCategory = (typeof blogCategories)[number]
export interface Post { slug: string; title: string; excerpt: string; date: string; category: BlogCategory; tags: string[]; featured: boolean; cover: string; content: Block[] }

export const posts: Post[] = [
  {
    slug: 'first-blog',
    title: 'First Blog',
    excerpt: 'This is my first blog',
    date: 'Oct 2026',
    category: 'Learning',
    tags: ['Learning', 'HCI', 'Portfolio'],
    featured: true,
    cover: '',
    content: [
      { t: 'p', text: 'This is my first blog.' },
      { t: 'h2', text: 'Journey into Engineering & Design' },
      { t: 'p', text: 'Documenting the process of designing, developing, and deploying high quality interactive applications at VJTI.' },
      { t: 'quote', text: 'Consistency and continuous learning are the keys to growth in computer science.' },
      { t: 'h2', text: 'Key Focus Areas' },
      { t: 'ul', items: ['Full-stack web architecture with React and Express', 'Machine learning systems and statistical data analysis', 'Intuitive and accessible user interface design'] },
      { t: 'p', text: 'Looking forward to building more impactful projects and sharing learnings along the way.' },
    ],
  },
]

export const wordCount = (p: Post) => p.content.reduce((n, b) => n + (b.t === 'ul' ? b.items.join(' ') : b.text).split(/\s+/).length, 0)
export const readingMinutes = (p: Post) => Math.max(1, Math.round(wordCount(p) / 200))
