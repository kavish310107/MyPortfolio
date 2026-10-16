export type CertCategory = 'Course' | 'Professional' | 'Workshop'
export const certCategories: CertCategory[] = ['Course', 'Professional', 'Workshop']
export interface Certificate {
  id: string; title: string; issuer: string; date: string; category: CertCategory
  credentialId: string; credentialUrl: string; file: string; fileType: 'pdf' | 'image'; skills: string[]; description: string
}

export const certificates: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Data Science Workshop',
    issuer: 'IIT Bombay',
    date: 'Dec 2025',
    category: 'Workshop',
    credentialId: 'eb752cf0',
    credentialUrl: '',
    file: '/certificate-1.pdf',
    fileType: 'pdf',
    skills: ['Data Science', 'Machine Learning', 'Python'],
    description: 'Participated in the Data Science workshop conducted by Techfest, IIT Bombay.',
  },
  {
    id: 'cert-2',
    title: 'Ethical Hacking',
    issuer: 'IIT Bombay',
    date: 'Dec 2025',
    category: 'Workshop',
    credentialId: '',
    credentialUrl: '',
    file: '/certificate-2.pdf',
    fileType: 'pdf',
    skills: ['Ethical Hacking', 'Cyber Security', 'Network Security'],
    description: 'Successfully attended the Workshop on Ethical Hacking held at Techfest, IIT Bombay in association with Craw Cyber Security.',
  },
  {
    id: 'cert-3',
    title: 'Power BI 7-Hours Course',
    issuer: 'Skill Course',
    date: 'Oct 2026',
    category: 'Course',
    credentialId: 'SQ21T01',
    credentialUrl: 'https://skillcourse.in',
    file: '/certificate-3.pdf',
    fileType: 'pdf',
    skills: ['Power BI', 'Data Visualization', 'Business Intelligence', 'Analytics'],
    description: 'Successfully completed the E-Learning Course of Power BI 7-Hours Course by Learn More Pro.',
  },
  {
    id: 'cert-4',
    title: 'Exploratory Data Analysis',
    issuer: 'Coursera',
    date: '2026',
    category: 'Professional',
    credentialId: 'SBQVTED9SNG7',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/SBQVTED9SNG7?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course',
    file: '',
    fileType: 'pdf',
    skills: ['Exploratory Data Analysis', 'Machine Learning', 'Data Cleaning', 'Statistics'],
    description: 'Completed the Exploratory Data Analysis Course for Machine Learning on Coursera.',
  },
]
