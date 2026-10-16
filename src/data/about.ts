import { profile } from './profile'

// About content. Name, title, photo, location and current focus come from profile.ts; only About-specific text lives here.
export const about = {
  bio: [
    'I am a student by profession, A swimmer by heart and a Traveller by soul',
    'The urge to learn something new every day, to travel, be fit and to have the freedom to do whatever I want is what drives me every day to chase my goals',
  ],
  interests: ['Swimming', 'Badminton', 'Chess', 'Travelling', 'Exploring'],
  careerDirection: {
    goal: 'Aspire to be a Data scientist',
    roles: ['Data Scientist', 'Machine Learning Engineer', 'Software Development Engineer'],
    summary: 'Dedicated to solving high-impact problems using data-driven intelligence, statistical rigor, and scalable full-stack software architecture.',
  },
  currentFocus: [profile.focus.current, profile.focus.learning, profile.focus.building],
  highlights: [
    {
      id: 'h1',
      title: 'Cracked Internship At BOFA',
      text: 'After 5 rounds of Interviews and competing with 200 other students, I got selected for a 2 month Summer Internship at Bank Of America',
    },
    {
      id: 'h2',
      title: 'Did My 1st Himalayan Trek',
      text: 'In July 2026, did my 1st ever Himalayan Trek – Hampta Pass spanning over 7 days. Trekked from the lush Kullu Valley to the vast and unforgiving land of Lahaul-n-Spiti Valley',
    },
    {
      id: 'h3',
      title: 'Solved 400+ problems on LeetCode',
      text: 'Demonstrated strong algorithmic problem-solving skills across data structures, algorithms, and system design.',
    },
  ],
  facts: [
    ['Location', profile.location],
    ['Languages', 'English, Hindi, Gujarati, Marathi, German'],
    ['Currently', 'Student at VJTI'],
    ['Open to', 'Summer Internships, Research & Full-time Roles'],
  ] as [string, string][],
}
