export type AssignmentStatus = 'pending' | 'submitted' | 'graded' | 'overdue';

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  description: string;
  dueDate: string;
  assignedBy: string;
  classGroup: string;
  attachments?: string[];
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  status: AssignmentStatus;
  submittedAt?: string;
  grade?: string;
  feedback?: string;
}

export const assignments: Assignment[] = [
  { id: 'as1', title: 'Algebra Practice Set 4', subject: 'Mathematics', description: 'Complete questions 1-20 on quadratic equations.', dueDate: '2026-05-02', assignedBy: 'Mr. Robert Ochieng', classGroup: 'Form 3A' },
  { id: 'as2', title: 'Essay: Climate Change', subject: 'English', description: 'Write a 500-word essay on the impacts of climate change.', dueDate: '2026-05-05', assignedBy: 'Ms. Achieng', classGroup: 'Form 3A' },
  { id: 'as3', title: 'Lab Report: Photosynthesis', subject: 'Biology', description: 'Document your photosynthesis experiment with results.', dueDate: '2026-04-30', assignedBy: 'Mr. Kamau', classGroup: 'Form 3A' },
  { id: 'as4', title: 'History Timeline Project', subject: 'History', description: 'Create a visual timeline of WWII events.', dueDate: '2026-05-10', assignedBy: 'Mrs. Wanjiku', classGroup: 'Form 3A' },
];

export const submissions: Submission[] = [
  { id: 'sb1', assignmentId: 'as1', studentId: 's1', studentName: 'Emma Thompson', status: 'submitted', submittedAt: '2026-04-26' },
  { id: 'sb2', assignmentId: 'as1', studentId: 's2', studentName: 'James Wilson', status: 'pending' },
  { id: 'sb3', assignmentId: 'as3', studentId: 's1', studentName: 'Emma Thompson', status: 'graded', submittedAt: '2026-04-25', grade: 'A-', feedback: 'Excellent analysis!' },
  { id: 'sb4', assignmentId: 'as3', studentId: 's2', studentName: 'James Wilson', status: 'overdue' },
  { id: 'sb5', assignmentId: 'as2', studentId: 's1', studentName: 'Emma Thompson', status: 'pending' },
];
