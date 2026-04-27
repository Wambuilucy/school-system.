export interface HealthProfile {
  studentId: string;
  studentName: string;
  bloodGroup: string;
  allergies: string[];
  conditions: string[];
  medications: string[];
  emergencyContact: string;
  emergencyPhone: string;
}

export interface ClinicVisit {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  reason: string;
  treatment: string;
  nurse: string;
}

export const healthProfiles: HealthProfile[] = [
  { studentId: 's1', studentName: 'Emma Thompson', bloodGroup: 'O+', allergies: ['Peanuts'], conditions: ['Mild asthma'], medications: ['Inhaler (as needed)'], emergencyContact: 'Sarah Thompson', emergencyPhone: '+254 712 345 678' },
  { studentId: 's2', studentName: 'James Wilson', bloodGroup: 'A+', allergies: [], conditions: [], medications: [], emergencyContact: 'David Wilson', emergencyPhone: '+254 723 456 789' },
];

export const clinicVisits: ClinicVisit[] = [
  { id: 'v1', studentId: 's1', studentName: 'Emma Thompson', date: '2026-04-20', reason: 'Headache', treatment: 'Rest and water; observed for 30 mins', nurse: 'Nurse Akinyi' },
  { id: 'v2', studentId: 's2', studentName: 'James Wilson', date: '2026-04-15', reason: 'Sprained ankle (P.E.)', treatment: 'Ice pack, bandage, advised to rest', nurse: 'Nurse Akinyi' },
  { id: 'v3', studentId: 's1', studentName: 'Emma Thompson', date: '2026-03-28', reason: 'Mild asthma episode', treatment: 'Inhaler administered, monitored', nurse: 'Nurse Akinyi' },
];
