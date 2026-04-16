export interface TeacherInfo {
  id: string;
  name: string;
  subject: string;
  email: string;
  phone: string;
  avatar: string;
  department: string;
  qualification: string;
  yearsExperience: number;
  classTeacher?: string;
}

export const teachers: TeacherInfo[] = [
  { id: 't1', name: 'Mr. Robert Ochieng', subject: 'Mathematics', email: 'r.ochieng@school.com', phone: '+254 712 345 001', avatar: '👨‍🏫', department: 'Sciences', qualification: 'B.Ed Mathematics', yearsExperience: 12, classTeacher: 'Grade 8A' },
  { id: 't2', name: 'Ms. Faith Mwangi', subject: 'English', email: 'f.mwangi@school.com', phone: '+254 712 345 002', avatar: '👩‍🏫', department: 'Languages', qualification: 'M.A English Literature', yearsExperience: 8, classTeacher: 'Grade 7A' },
  { id: 't3', name: 'Mr. James Kamau', subject: 'Science', email: 'j.kamau@school.com', phone: '+254 712 345 003', avatar: '👨‍🔬', department: 'Sciences', qualification: 'B.Sc Chemistry', yearsExperience: 10 },
  { id: 't4', name: 'Ms. Amina Hassan', subject: 'History', email: 'a.hassan@school.com', phone: '+254 712 345 004', avatar: '👩‍🏫', department: 'Humanities', qualification: 'B.A History', yearsExperience: 6, classTeacher: 'Grade 9A' },
  { id: 't5', name: 'Mr. Peter Njoroge', subject: 'Physical Education', email: 'p.njoroge@school.com', phone: '+254 712 345 005', avatar: '🏃‍♂️', department: 'Sports', qualification: 'B.Ed Physical Education', yearsExperience: 15 },
  { id: 't6', name: 'Ms. Grace Akinyi', subject: 'Art & Design', email: 'g.akinyi@school.com', phone: '+254 712 345 006', avatar: '👩‍🎨', department: 'Creative Arts', qualification: 'B.A Fine Art', yearsExperience: 5, classTeacher: 'Grade 7B' },
  { id: 't7', name: 'Mr. Daniel Kipchoge', subject: 'Computer Science', email: 'd.kipchoge@school.com', phone: '+254 712 345 007', avatar: '👨‍💻', department: 'Technology', qualification: 'B.Sc Computer Science', yearsExperience: 4, classTeacher: 'Grade 8B' },
  { id: 't8', name: 'Ms. Esther Wambui', subject: 'Music', email: 'e.wambui@school.com', phone: '+254 712 345 008', avatar: '🎵', department: 'Creative Arts', qualification: 'B.Mus Education', yearsExperience: 9 },
];
