export interface SchoolTrip {
  id: string;
  title: string;
  description: string;
  destination: string;
  date: string;
  returnDate: string;
  price: number;
  currency: string;
  grades: string[];
  maxStudents: number;
  enrolled: number;
  requirements: string[];
  includes: string[];
  contactPerson: string;
  status: 'open' | 'full' | 'closed';
}

export const schoolTrips: SchoolTrip[] = [
  {
    id: 'tr1', title: 'National Park Safari', description: 'Educational safari to learn about wildlife conservation and ecosystems.',
    destination: 'Nairobi National Park', date: '2026-05-20', returnDate: '2026-05-22',
    price: 4500, currency: 'KES', grades: ['Grade 7', 'Grade 8', 'Grade 9'],
    maxStudents: 40, enrolled: 28,
    requirements: ['Signed parent consent form', 'Comfortable walking shoes', 'Sunscreen & hat', 'Water bottle', 'Packed lunch for Day 1'],
    includes: ['Transport (bus)', 'Park entry fees', 'Guided tour', 'Accommodation (2 nights)', 'Meals (Day 2 & 3)'],
    contactPerson: 'Mr. Robert Ochieng', status: 'open',
  },
  {
    id: 'tr2', title: 'Science Museum Visit', description: 'Hands-on science exhibits and planetarium show.',
    destination: 'National Science Museum', date: '2026-06-05', returnDate: '2026-06-05',
    price: 1200, currency: 'KES', grades: ['Grade 7', 'Grade 8'],
    maxStudents: 50, enrolled: 50,
    requirements: ['School uniform', 'Notebook & pen', 'Packed lunch'],
    includes: ['Transport', 'Museum entry', 'Planetarium ticket', 'Guided tour'],
    contactPerson: 'Ms. Faith Mwangi', status: 'full',
  },
  {
    id: 'tr3', title: 'Beach Cleanup & Marine Biology', description: 'Learn about marine conservation while cleaning the beach.',
    destination: 'Diani Beach', date: '2026-07-10', returnDate: '2026-07-12',
    price: 6000, currency: 'KES', grades: ['Grade 8', 'Grade 9'],
    maxStudents: 35, enrolled: 12,
    requirements: ['Signed consent form', 'Swimming gear', 'Sunscreen', 'Gloves for cleanup', 'Comfortable shoes'],
    includes: ['Transport', 'Accommodation (2 nights)', 'All meals', 'Marine biology workshop', 'Snorkeling gear'],
    contactPerson: 'Mr. James Kamau', status: 'open',
  },
  {
    id: 'tr4', title: 'Historical Sites Tour', description: 'Visit Fort Jesus and Old Town for a history immersion.',
    destination: 'Mombasa Old Town', date: '2026-08-01', returnDate: '2026-08-03',
    price: 5500, currency: 'KES', grades: ['Grade 7', 'Grade 8', 'Grade 9'],
    maxStudents: 45, enrolled: 8,
    requirements: ['Signed consent form', 'Camera (optional)', 'Notebook', 'Comfortable walking shoes', 'Light clothing'],
    includes: ['Transport', 'Accommodation (2 nights)', 'All meals', 'Entry fees', 'Professional guide'],
    contactPerson: 'Ms. Amina Hassan', status: 'open',
  },
];
