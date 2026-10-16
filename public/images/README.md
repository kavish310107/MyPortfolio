# Images

Put your photos and screenshots here, then reference them from the data files by path:

| Where | Field | Example |
|---|---|---|
| `src/data/profile.ts` | `photo` | `'/images/me.jpg'` |
| `src/data/projects.ts` | `image` | `'/images/project-1.png'` |
| `src/data/certificates.ts` | `file` (image certificates) | `'/images/cert-1.png'` |
| `src/data/blog.ts` | `cover` | `'/images/post-1.jpg'` |

Files in `public/` are served from the site root. Keep images reasonably small (under ~300 KB each) for fast loading.
