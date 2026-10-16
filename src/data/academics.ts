// Academics content for Kavish Desai.
export const academics = {
  isSample: false,
  university: 'Veermata Jijabai Technological Institute',
  degree: 'Bachelor of Technology',
  specialization: 'Computer Engineering',
  period: '2024 – 2028',
  cgpa: { value: 8.22, max: 10, label: 'CGPA: 8.22 / 10' },
  credits: { done: 96, total: 160 },
  semesters: [
    { id: 's1', label: 'S1', score: 8.4 },
    { id: 's2', label: 'S2', score: 7.9 },
    { id: 's3', label: 'S3', score: 8.2 },
    { id: 's4', label: 'S4', score: 8.4 },
  ],
  scale: 10,
  timeline: [
    { id: 'a1', period: '2024', title: 'Enrolled In VJTI', note: 'Secured seat in Computer Science in VJTI by scoring 99.97 percentile in MHT-CET' },
    { id: 'a2', period: '2026', title: 'Secured Internship At BOFA', note: 'After 5 rounds of Interviews and competing with 200 other students, I got selected for a 2 month Summer Internship at Bank Of America' },
  ],
  coursework: [
    {
      group: 'Fundamentals',
      items: ['Engineering Mathematics', 'Physics', 'Chemistry', 'C++ Programming', 'Digital Logic Design', 'Web development', 'Python Development', 'Engineering Mechanics and Graphics'],
    },
    {
      group: 'CS Fundamentals',
      items: ['Operating Systems', 'Computer Architecture', 'System design', 'Object Oriented Programming', 'Database Management Systems', 'Computer Networks', 'Machine Learning', 'Cyber Security'],
    },
    {
      group: 'Extracurricular Subjects',
      items: ['Business and Technical Communication', 'Environmental Science'],
    },
  ],
  highlights: [
    { id: 'ah1', title: '99.97 Percentile in MHT-CET', text: 'Top ranker achieving admission into VJTI Computer Engineering.' },
    { id: 'ah2', title: 'Academic Excellence (CGPA 8.22)', text: 'Consistent high academic performance across all completed semesters.' },
  ],
}
