// ═══════════════════════════════════════════════════════════════════════════
// PROFILE: who you are. The single source for identity, contact details and links.
// ═══════════════════════════════════════════════════════════════════════════
export interface SocialProfile { id: 'github' | 'linkedin' | 'x' | 'kaggle' | 'other'; label: string; url: string; handle: string }
export interface Profile {
  name: string; title: string; intro: string
  photo: string; location: string; availability: string
  focus: { current: string; learning: string; building: string }
  email: string; resumeUrl: string
  socials: SocialProfile[]
}

export const profile: Profile = {
  name: 'Kavish Desai',
  title: 'B.Tech Computer Engineering Student at VJTI | Upcoming Intern at Bank of America',
  intro: 'Hi, I am Kavish Desai. I am a B.Tech Computer Science Engineering student at VJTI. My interests lie in the field of statistics, data science, and machine learning. Apart from my academic interests I am interested in sports like swimming, badminton, and chess. Welcome To My Portfolio',
  photo: '/images/profile_photo.jpg',
  location: 'Mumbai, Maharashtra, India',
  availability: 'Open to opportunities',
  focus: { current: 'Data Science', learning: 'Machine Learning', building: 'Machine Learning Projects' },
  email: 'kavishdesai07@gmail.com',
  resumeUrl: '/resume.pdf',
  socials: [
    { id: 'github', label: 'GitHub', url: 'https://github.com/kavish310107', handle: '@kavish310107' },
    { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/kavish-desai/', handle: '@KavishDesai' },
    { id: 'other', label: 'Leetcode', url: 'https://leetcode.com/u/KaDe3101/', handle: '@KaDe3101' },
  ],
}
