export type ExamStatus = 'upcoming' | 'ongoing' | 'completed';

export interface Exam {
  id: string;
  title: string;
  subject: string;
  date: string;
  duration: string;
  room: string;
  status: ExamStatus;
  totalMarks: number;
}

export interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  marks: number;
  grade: string;
  remarks: string;
}

export const exams: Exam[] = [
  { id: 'e1', title: 'Mid-Term Mathematics', subject: 'Mathematics', date: '2026-05-12', duration: '2h', room: 'Hall A', status: 'upcoming', totalMarks: 100 },
  { id: 'e2', title: 'Mid-Term English', subject: 'English', date: '2026-05-14', duration: '2h', room: 'Hall A', status: 'upcoming', totalMarks: 100 },
  { id: 'e3', title: 'Mid-Term Biology', subject: 'Biology', date: '2026-05-16', duration: '2h', room: 'Hall B', status: 'upcoming', totalMarks: 100 },
  { id: 'e4', title: 'CAT 1 Mathematics', subject: 'Mathematics', date: '2026-04-15', duration: '1h', room: 'Room 12', status: 'completed', totalMarks: 50 },
  { id: 'e5', title: 'CAT 1 English', subject: 'English', date: '2026-04-17', duration: '1h', room: 'Room 8', status: 'completed', totalMarks: 50 },
];

export const examResults: ExamResult[] = [
  { id: 'r1', examId: 'e4', studentId: 's1', studentName: 'Emma Thompson', marks: 44, grade: 'A-', remarks: 'Excellent work' },
  { id: 'r2', examId: 'e4', studentId: 's2', studentName: 'James Wilson', marks: 38, grade: 'B+', remarks: 'Good effort' },
  { id: 'r3', examId: 'e5', studentId: 's1', studentName: 'Emma Thompson', marks: 41, grade: 'A-', remarks: 'Strong essay' },
  { id: 'r4', examId: 'e5', studentId: 's2', studentName: 'James Wilson', marks: 35, grade: 'B', remarks: 'Improve grammar' },
];
