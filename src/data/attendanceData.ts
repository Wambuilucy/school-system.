export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  reason?: string;
  className: string;
}

const today = new Date();
const d = (offset: number) => {
  const x = new Date(today);
  x.setDate(x.getDate() - offset);
  return x.toISOString().slice(0, 10);
};

export const attendanceRecords: AttendanceRecord[] = [
  { id: 'a1', studentId: 's1', studentName: 'Emma Thompson', date: d(0), status: 'present', className: 'Form 3A' },
  { id: 'a2', studentId: 's2', studentName: 'James Wilson', date: d(0), status: 'late', reason: 'Traffic', className: 'Form 3A' },
  { id: 'a3', studentId: 's3', studentName: 'Olivia Brown', date: d(0), status: 'absent', reason: 'Sick', className: 'Form 3A' },
  { id: 'a4', studentId: 's4', studentName: 'Noah Davis', date: d(0), status: 'present', className: 'Form 3A' },
  { id: 'a5', studentId: 's1', studentName: 'Emma Thompson', date: d(1), status: 'present', className: 'Form 3A' },
  { id: 'a6', studentId: 's2', studentName: 'James Wilson', date: d(1), status: 'present', className: 'Form 3A' },
  { id: 'a7', studentId: 's3', studentName: 'Olivia Brown', date: d(1), status: 'excused', reason: 'Family event', className: 'Form 3A' },
  { id: 'a8', studentId: 's1', studentName: 'Emma Thompson', date: d(2), status: 'present', className: 'Form 3A' },
  { id: 'a9', studentId: 's2', studentName: 'James Wilson', date: d(2), status: 'absent', reason: 'Sick', className: 'Form 3A' },
  { id: 'a10', studentId: 's1', studentName: 'Emma Thompson', date: d(3), status: 'late', reason: 'Bus delay', className: 'Form 3A' },
];

export const classRoster = [
  { id: 's1', name: 'Emma Thompson' },
  { id: 's2', name: 'James Wilson' },
  { id: 's3', name: 'Olivia Brown' },
  { id: 's4', name: 'Noah Davis' },
  { id: 's5', name: 'Sophia Martinez' },
  { id: 's6', name: 'Liam Garcia' },
];
