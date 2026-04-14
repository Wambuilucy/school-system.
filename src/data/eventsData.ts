export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: 'church' | 'school';
  type: string;
  color: string;
}

export const events: EventItem[] = [
  // Church events
  {
    id: 'e1', title: 'Sunday Worship Service', description: 'Weekly worship service with sermon, praise and worship.',
    date: '2026-04-19', time: '09:00 AM', location: 'Main Sanctuary', category: 'church', type: 'Worship', color: 'bg-violet-500',
  },
  {
    id: 'e2', title: 'Bible Study Fellowship', description: 'Mid-week Bible study and prayer meeting for all members.',
    date: '2026-04-16', time: '06:30 PM', location: 'Fellowship Hall', category: 'church', type: 'Study', color: 'bg-blue-500',
  },
  {
    id: 'e3', title: 'Youth Revival Conference', description: 'Three-day youth conference with guest speakers and workshops.',
    date: '2026-05-01', time: '10:00 AM', location: 'Main Sanctuary', category: 'church', type: 'Conference', color: 'bg-amber-500',
  },
  {
    id: 'e4', title: 'Community Outreach Day', description: 'Serving the local community through food drives and volunteering.',
    date: '2026-04-26', time: '08:00 AM', location: 'Church Grounds', category: 'church', type: 'Outreach', color: 'bg-emerald-500',
  },
  {
    id: 'e5', title: 'Easter Celebration Service', description: 'Special Easter service with choir performances and fellowship lunch.',
    date: '2026-04-20', time: '09:00 AM', location: 'Main Sanctuary', category: 'church', type: 'Holiday', color: 'bg-rose-500',
  },
  {
    id: 'e6', title: 'Choir Practice', description: 'Weekly choir rehearsal for Sunday service.',
    date: '2026-04-18', time: '05:00 PM', location: 'Music Room', category: 'church', type: 'Practice', color: 'bg-indigo-500',
  },

  // School events
  {
    id: 'e7', title: 'Parent-Teacher Conference', description: 'Quarterly parent-teacher meetings to discuss student progress.',
    date: '2026-04-22', time: '02:00 PM', location: 'School Hall', category: 'school', type: 'Meeting', color: 'bg-sky-500',
  },
  {
    id: 'e8', title: 'Science Fair 2026', description: 'Annual science fair showcasing student projects and experiments.',
    date: '2026-05-10', time: '09:00 AM', location: 'School Gymnasium', category: 'school', type: 'Academic', color: 'bg-teal-500',
  },
  {
    id: 'e9', title: 'Sports Day', description: 'Annual inter-house athletics and sports competition.',
    date: '2026-05-15', time: '08:00 AM', location: 'Sports Field', category: 'school', type: 'Sports', color: 'bg-orange-500',
  },
  {
    id: 'e10', title: 'Mid-Term Exams Begin', description: 'Mid-term examinations for all grades.',
    date: '2026-04-28', time: '08:30 AM', location: 'Exam Halls', category: 'school', type: 'Exam', color: 'bg-red-500',
  },
  {
    id: 'e11', title: 'Art Exhibition', description: 'Student art showcase featuring paintings, sculptures and digital art.',
    date: '2026-05-20', time: '10:00 AM', location: 'Art Studio', category: 'school', type: 'Exhibition', color: 'bg-pink-500',
  },
  {
    id: 'e12', title: 'End of Term Assembly', description: 'Awards ceremony and closing assembly for Term 2.',
    date: '2026-06-15', time: '10:00 AM', location: 'School Hall', category: 'school', type: 'Assembly', color: 'bg-cyan-500',
  },
];
