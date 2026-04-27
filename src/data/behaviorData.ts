export type BehaviorType = 'merit' | 'demerit' | 'award';

export interface BehaviorRecord {
  id: string;
  studentId: string;
  studentName: string;
  type: BehaviorType;
  category: string;
  description: string;
  points: number;
  date: string;
  recordedBy: string;
}

export const behaviorRecords: BehaviorRecord[] = [
  { id: 'bh1', studentId: 's1', studentName: 'Emma Thompson', type: 'merit', category: 'Leadership', description: 'Led peer study group', points: 10, date: '2026-04-25', recordedBy: 'Mr. Ochieng' },
  { id: 'bh2', studentId: 's1', studentName: 'Emma Thompson', type: 'award', category: 'Academic Excellence', description: 'Top scorer in Math CAT', points: 25, date: '2026-04-20', recordedBy: 'Mr. Ochieng' },
  { id: 'bh3', studentId: 's2', studentName: 'James Wilson', type: 'merit', category: 'Helpfulness', description: 'Helped new student settle in', points: 5, date: '2026-04-22', recordedBy: 'Ms. Achieng' },
  { id: 'bh4', studentId: 's2', studentName: 'James Wilson', type: 'demerit', category: 'Punctuality', description: 'Late to class twice this week', points: -5, date: '2026-04-23', recordedBy: 'Mr. Ochieng' },
  { id: 'bh5', studentId: 's3', studentName: 'Olivia Brown', type: 'merit', category: 'Sportsmanship', description: 'Excellent team play', points: 8, date: '2026-04-18', recordedBy: 'Coach Mwangi' },
  { id: 'bh6', studentId: 's1', studentName: 'Emma Thompson', type: 'merit', category: 'Creativity', description: 'Outstanding art project', points: 7, date: '2026-04-15', recordedBy: 'Ms. Mutua' },
];
