export interface TimetableSlot {
  day: string;
  time: string;
  subject: string;
  teacher: string;
  room: string;
  color: string;
}

export const timeSlots = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'];
export const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const timetable: TimetableSlot[] = [
  { day: 'Monday', time: '8:00', subject: 'Mathematics', teacher: 'Mr. Ochieng', room: 'Room 12', color: 'primary' },
  { day: 'Monday', time: '9:00', subject: 'English', teacher: 'Ms. Achieng', room: 'Room 8', color: 'accent' },
  { day: 'Monday', time: '10:00', subject: 'Biology', teacher: 'Mr. Kamau', room: 'Lab 2', color: 'success' },
  { day: 'Monday', time: '11:00', subject: 'Break', teacher: '', room: '', color: 'muted' },
  { day: 'Monday', time: '12:00', subject: 'History', teacher: 'Mrs. Wanjiku', room: 'Room 5', color: 'warning' },
  { day: 'Monday', time: '13:00', subject: 'Lunch', teacher: '', room: '', color: 'muted' },
  { day: 'Monday', time: '14:00', subject: 'Physics', teacher: 'Mr. Otieno', room: 'Lab 1', color: 'primary' },
  { day: 'Monday', time: '15:00', subject: 'P.E.', teacher: 'Coach Mwangi', room: 'Field', color: 'success' },

  { day: 'Tuesday', time: '8:00', subject: 'Chemistry', teacher: 'Ms. Njeri', room: 'Lab 3', color: 'accent' },
  { day: 'Tuesday', time: '9:00', subject: 'Mathematics', teacher: 'Mr. Ochieng', room: 'Room 12', color: 'primary' },
  { day: 'Tuesday', time: '10:00', subject: 'Geography', teacher: 'Mr. Kiprop', room: 'Room 7', color: 'warning' },
  { day: 'Tuesday', time: '11:00', subject: 'Break', teacher: '', room: '', color: 'muted' },
  { day: 'Tuesday', time: '12:00', subject: 'English', teacher: 'Ms. Achieng', room: 'Room 8', color: 'accent' },
  { day: 'Tuesday', time: '13:00', subject: 'Lunch', teacher: '', room: '', color: 'muted' },
  { day: 'Tuesday', time: '14:00', subject: 'Art', teacher: 'Ms. Mutua', room: 'Studio', color: 'success' },
  { day: 'Tuesday', time: '15:00', subject: 'Music', teacher: 'Mr. Owino', room: 'Music Room', color: 'primary' },

  { day: 'Wednesday', time: '8:00', subject: 'English', teacher: 'Ms. Achieng', room: 'Room 8', color: 'accent' },
  { day: 'Wednesday', time: '9:00', subject: 'Biology', teacher: 'Mr. Kamau', room: 'Lab 2', color: 'success' },
  { day: 'Wednesday', time: '10:00', subject: 'Mathematics', teacher: 'Mr. Ochieng', room: 'Room 12', color: 'primary' },
  { day: 'Wednesday', time: '11:00', subject: 'Break', teacher: '', room: '', color: 'muted' },
  { day: 'Wednesday', time: '12:00', subject: 'Physics', teacher: 'Mr. Otieno', room: 'Lab 1', color: 'primary' },
  { day: 'Wednesday', time: '13:00', subject: 'Lunch', teacher: '', room: '', color: 'muted' },
  { day: 'Wednesday', time: '14:00', subject: 'History', teacher: 'Mrs. Wanjiku', room: 'Room 5', color: 'warning' },
  { day: 'Wednesday', time: '15:00', subject: 'Library', teacher: 'Ms. Wairimu', room: 'Library', color: 'accent' },

  { day: 'Thursday', time: '8:00', subject: 'Chemistry', teacher: 'Ms. Njeri', room: 'Lab 3', color: 'accent' },
  { day: 'Thursday', time: '9:00', subject: 'Geography', teacher: 'Mr. Kiprop', room: 'Room 7', color: 'warning' },
  { day: 'Thursday', time: '10:00', subject: 'English', teacher: 'Ms. Achieng', room: 'Room 8', color: 'accent' },
  { day: 'Thursday', time: '11:00', subject: 'Break', teacher: '', room: '', color: 'muted' },
  { day: 'Thursday', time: '12:00', subject: 'Mathematics', teacher: 'Mr. Ochieng', room: 'Room 12', color: 'primary' },
  { day: 'Thursday', time: '13:00', subject: 'Lunch', teacher: '', room: '', color: 'muted' },
  { day: 'Thursday', time: '14:00', subject: 'Biology', teacher: 'Mr. Kamau', room: 'Lab 2', color: 'success' },
  { day: 'Thursday', time: '15:00', subject: 'Computer Studies', teacher: 'Mr. Mwende', room: 'IT Lab', color: 'primary' },

  { day: 'Friday', time: '8:00', subject: 'Mathematics', teacher: 'Mr. Ochieng', room: 'Room 12', color: 'primary' },
  { day: 'Friday', time: '9:00', subject: 'Physics', teacher: 'Mr. Otieno', room: 'Lab 1', color: 'primary' },
  { day: 'Friday', time: '10:00', subject: 'History', teacher: 'Mrs. Wanjiku', room: 'Room 5', color: 'warning' },
  { day: 'Friday', time: '11:00', subject: 'Break', teacher: '', room: '', color: 'muted' },
  { day: 'Friday', time: '12:00', subject: 'English', teacher: 'Ms. Achieng', room: 'Room 8', color: 'accent' },
  { day: 'Friday', time: '13:00', subject: 'Lunch', teacher: '', room: '', color: 'muted' },
  { day: 'Friday', time: '14:00', subject: 'Assembly', teacher: 'All Staff', room: 'Hall', color: 'accent' },
  { day: 'Friday', time: '15:00', subject: 'Co-curricular', teacher: 'Various', room: 'Various', color: 'success' },
];
