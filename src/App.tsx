import { lazy, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import Home from './pages/Home'

// Pages other than Home are code-split. After first paint the browser prefetches them while idle,
// so navigation feels instant and the skeleton only appears on genuinely slow connections.
const loaders = {
  about: () => import('./pages/About'), academics: () => import('./pages/Academics'), skills: () => import('./pages/Skills'), projects: () => import('./pages/Projects'),
  experience: () => import('./pages/Experience'), achievements: () => import('./pages/Achievements'), certificates: () => import('./pages/Certificates'), activity: () => import('./pages/Activity'),
  timeline: () => import('./pages/Timeline'), blog: () => import('./pages/Blog'), post: () => import('./pages/BlogPost'), resume: () => import('./pages/Resume'), contact: () => import('./pages/Contact'), notFound: () => import('./pages/NotFound'),
}
const P = {
  about: lazy(loaders.about), academics: lazy(loaders.academics), skills: lazy(loaders.skills), projects: lazy(loaders.projects), experience: lazy(loaders.experience),
  achievements: lazy(loaders.achievements), certificates: lazy(loaders.certificates), activity: lazy(loaders.activity), timeline: lazy(loaders.timeline),
  blog: lazy(loaders.blog), post: lazy(loaders.post), resume: lazy(loaders.resume), contact: lazy(loaders.contact), notFound: lazy(loaders.notFound),
}

export default function App() {
  useEffect(() => {
    const run = () => Object.values(loaders).forEach((l) => void l())
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number }
    if (w.requestIdleCallback) w.requestIdleCallback(run); else setTimeout(run, 1500)
  }, [])
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<P.about />} />
        <Route path="/academics" element={<P.academics />} />
        <Route path="/skills" element={<P.skills />} />
        <Route path="/projects" element={<P.projects />} />
        <Route path="/experience" element={<P.experience />} />
        <Route path="/achievements" element={<P.achievements />} />
        <Route path="/certificates" element={<P.certificates />} />
        <Route path="/activity" element={<P.activity />} />
        <Route path="/timeline" element={<P.timeline />} />
        <Route path="/blog" element={<P.blog />} />
        <Route path="/blog/:slug" element={<P.post />} />
        <Route path="/resume" element={<P.resume />} />
        <Route path="/contact" element={<P.contact />} />
        <Route path="*" element={<P.notFound />} />
      </Route>
    </Routes>
  )
}
