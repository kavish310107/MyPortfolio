// PROJECTS for Kavish Desai
export type ProjectStatus = 'completed' | 'in-progress' | 'planned'
export const projectCategories = ['Web', 'Machine Learning', 'Data & Analytics', 'Tools & Other'] as const
export type ProjectCategory = (typeof projectCategories)[number]
export const statusMeta: Record<ProjectStatus, { label: string; dot: string }> = {
  completed: { label: 'Completed', dot: 'bg-emerald-400' },
  'in-progress': { label: 'In progress', dot: 'bg-amber-300' },
  planned: { label: 'Planned', dot: 'bg-sky-400' },
}
export interface Project {
  id: string; title: string; description: string; details: string; category: ProjectCategory; status: ProjectStatus
  tech: string[]; highlights: string[]; github: string; demo: string; image: string; year: string; role: string; featured: boolean
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'CampusConnect',
    description: 'A full stack platform that centralizes campus announcements, events, and opportunities into a single dashboard',
    details: 'Developed CampusConnect, a full stack platform that centralizes campus announcements, events, and opportunities into a single dashboard, eliminating fragmented communication across multiple channels.\n\nImplemented secure authentication, designed RBAC supporting four user roles, and 15+ RESTful APIs with JWT authentication, alongside a PostgreSQL schema with many-to-many user-club associations to enable personalized, filtered content delivery.\n\nBuilt features for real-time announcements and event scheduling along with intelligent filtering and notifications to improve student engagement and streamline campus coordination.',
    category: 'Web',
    status: 'completed',
    tech: ['React JS', 'Express JS', 'PostgreSQL', 'JS', 'Supabase'],
    highlights: [
      'Role-based access control supporting 4 user roles with JWT authentication',
      '15+ RESTful APIs with scalable PostgreSQL schema',
      'Real-time event scheduling and personalized content delivery',
    ],
    github: 'https://github.com/kavish310107/CampusConnect',
    demo: '',
    image: '/images/project-01.png',
    year: '2025',
    role: 'Created the whole project from scratch',
    featured: true,
  },
  {
    id: 'project-2',
    title: 'Code Reviewer AI',
    description: 'Engineered a multi-agent AI code review system using LLM APIs for automated source code analysis and optimization.',
    details: 'Engineered a multi-agent AI code review system using LLM APIs for automated source code analysis and optimization.\n\nEnabled file uploads and GitHub URL analysis and multi-device association to detect bugs, security vulnerabilities, and code complexity, generating actionable explanations and fixes.\n\nImplemented AI orchestration, response normalization, detailed analysis reports, and side-by-side original vs. optimized code comparison.\n\nContainerized the application using Docker for consistent deployment and development environments.',
    category: 'Machine Learning',
    status: 'completed',
    tech: ['ReactJS', 'Express', 'PostgreSQL', 'AI', 'Docker'],
    highlights: [
      'Multi-agent AI code review pipeline with LLM API orchestration',
      'GitHub repository and file upload vulnerability analysis',
      'Side-by-side original vs optimized code diff comparison',
      'Containerized with Docker for cross-platform deployment',
    ],
    github: 'https://github.com/kavish310107/AICodeReviewer',
    demo: '',
    image: '/images/project-02.png',
    year: '2026',
    role: 'AI Orchestration & Full Stack Engineering',
    featured: true,
  },
  {
    id: 'project-3',
    title: 'React JS Projects',
    description: 'I have created six React JS projects ranging from basic dynamic web pages to advanced capstone projects.',
    details: 'Six ReactJS projects ranging from basic dynamic web pages to advanced custom projects:\n\n• My Travel Journal and My Movie Book featuring interactive static web pages.\n• Chef Claude and Meme Generator built with dynamic states and API interactions.\n• Tenzies and Endgame representing full-skill capstone interactive React applications.',
    category: 'Web',
    status: 'completed',
    tech: ['React JS', 'JavaScript', 'CSS3', 'HTML5'],
    highlights: [
      'Built 6 end-to-end React applications',
      'Implemented Chef Claude & Meme Generator dynamic state flows',
      'Created Tenzies & Endgame capstone interactive apps',
    ],
    github: 'https://github.com/kavish310107/ReactJS-Projects',
    demo: '',
    image: '/images/project-03.png',
    year: '2025',
    role: 'Frontend Developer',
    featured: false,
  },
  {
    id: 'project-4',
    title: 'Mera Society',
    description: 'A comprehensive full-stack solution for managing residential societies and apartment complexes.',
    details: 'MeraSociety is a modern web application designed to streamline society management with three distinct user roles:\n\n• 👥 Residents: Access personal dashboard, submit complaints, view payments, and stay updated with announcements.\n• 👮 Security Staff: Manage visitor logs, report incidents, log patrols, and monitor alerts.\n• 👨‍💼 Society Admin: Oversee all operations, manage residents/staff, handle maintenance, and configure settings.',
    category: 'Web',
    status: 'completed',
    tech: ['React', 'Node', 'PostgreSQL', 'JWT', 'ExpressJS'],
    highlights: [
      'Comprehensive three-tier architecture (Residents, Security Staff, Society Admin)',
      'Visitor logging, incident reporting, and real-time alerts',
      'Maintenance payments and complaint management system',
    ],
    github: 'https://github.com/kavish310107/mera-society',
    demo: '',
    image: '/images/project-04.jpg',
    year: '2025',
    role: 'Created the Backend Architecture',
    featured: true,
  },
]
export { isSet } from '../utils/links'
