import { Code2, BarChart3, BrainCircuit, Database, Globe, Wrench, Layers, type LucideIcon } from 'lucide-react'

export const skillsMeta = { isSample: false }
export const levelLabels = ['Learning', 'Familiar', 'Working', 'Proficient', 'Advanced'] as const
export interface Skill { id: string; name: string; level: 1 | 2 | 3 | 4 | 5; note: string }
export interface SkillCategory { id: string; label: string; icon: LucideIcon; skills: Skill[] }

export const skillCategories: SkillCategory[] = [
  {
    id: 'programming',
    label: 'Languages',
    icon: Code2,
    skills: [
      { id: 'prog-1', name: 'C / C++', level: 5, note: 'Core language for algorithms, coursework, and competitive problem solving.' },
      { id: 'prog-2', name: 'Python', level: 5, note: 'Primary language for Data Science, Machine Learning, and backend scripting.' },
      { id: 'prog-3', name: 'Java', level: 1, note: 'Familiar with object-oriented fundamentals and core syntax.' },
    ],
  },
  {
    id: 'data',
    label: 'Data & Analytics',
    icon: BarChart3,
    skills: [
      { id: 'data-1', name: 'Power BI', level: 4, note: 'Created dashboards and interactive reports for data visualization.' },
      { id: 'data-2', name: 'Excel', level: 4, note: 'Spreadsheet modeling, pivot tables, and analytical formulations.' },
      { id: 'data-3', name: 'Data Cleaning & Analysis', level: 5, note: 'Exploratory data analysis, handling missing values, and data preparation.' },
    ],
  },
  {
    id: 'ml',
    label: 'Machine Learning',
    icon: BrainCircuit,
    skills: [
      { id: 'ml-1', name: 'Supervised ML', level: 4, note: 'Regression, classification algorithms, and model evaluation metrics.' },
      { id: 'ml-2', name: 'Unsupervised ML', level: 4, note: 'Clustering, dimensionality reduction, and pattern recognition.' },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    icon: Database,
    skills: [
      { id: 'db-1', name: 'MySQL / OracleSQL / PostgreSQL', level: 5, note: 'Complex queries, schema design, relations, and indexing.' },
      { id: 'db-2', name: 'MongoDB', level: 3, note: 'NoSQL document modeling and aggregation pipelines.' },
      { id: 'db-3', name: 'Supabase', level: 5, note: 'Backend-as-a-service with PostgreSQL, auth, and real-time APIs.' },
    ],
  },
  {
    id: 'web',
    label: 'Web Development',
    icon: Globe,
    skills: [
      { id: 'web-1', name: 'React.js / Node.js / Express.js', level: 5, note: 'Full-stack web application development with RESTful architecture.' },
      { id: 'web-2', name: 'HTML / CSS / JavaScript', level: 5, note: 'Modern responsive layouts, UI styling, and modern ES6+ JS.' },
      { id: 'web-3', name: 'Python Development', level: 5, note: 'Backend services, APIs, and data scripting.' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Platforms',
    icon: Wrench,
    skills: [
      { id: 'tool-1', name: 'Vercel / Render', level: 5, note: 'Cloud hosting and CI/CD automated deployments.' },
      { id: 'tool-2', name: 'Docker', level: 5, note: 'Containerization of full-stack services and development setups.' },
      { id: 'tool-3', name: 'GitHub', level: 5, note: 'Version control, branching, PR reviews, and open source collaboration.' },
    ],
  },
  {
    id: 'other',
    label: 'Other Technical',
    icon: Layers,
    skills: [
      { id: 'other-1', name: 'Linux Programming', level: 4, note: 'Bash scripting, server navigation, and process management.' },
      { id: 'other-2', name: 'Power BI', level: 4, note: 'Business intelligence reporting and dashboard creation.' },
      { id: 'other-3', name: 'REST APIs', level: 5, note: 'Designing and integrating secure JWT-authenticated endpoints.' },
    ],
  },
]
