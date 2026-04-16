export interface CocurricularActivity {
  id: string;
  name: string;
  category: 'sports' | 'music' | 'clubs' | 'arts';
  description: string;
  schedule: string;
  time: string;
  venue: string;
  coach: string;
  requirements: string[];
  maxMembers: number;
  currentMembers: number;
  icon: string;
}

export const activities: CocurricularActivity[] = [
  // Sports
  { id: 'a1', name: 'Football', category: 'sports', description: 'Inter-school football team for boys and girls. Weekly training and league matches.',
    schedule: 'Tuesday & Thursday', time: '3:30 PM - 5:00 PM', venue: 'Main Football Field',
    coach: 'Mr. Peter Njoroge', requirements: ['Football boots', 'Shin guards', 'School PE kit', 'Medical clearance form'],
    maxMembers: 30, currentMembers: 24, icon: '⚽' },
  { id: 'a2', name: 'Basketball', category: 'sports', description: 'Basketball training and tournaments. Open to all grades.',
    schedule: 'Monday & Wednesday', time: '3:30 PM - 5:00 PM', venue: 'Indoor Court',
    coach: 'Mr. Peter Njoroge', requirements: ['Sports shoes (non-marking)', 'School PE kit', 'Water bottle'],
    maxMembers: 20, currentMembers: 16, icon: '🏀' },
  { id: 'a3', name: 'Swimming', category: 'sports', description: 'Swimming lessons and competitive swim team.',
    schedule: 'Wednesday & Friday', time: '3:00 PM - 4:30 PM', venue: 'School Pool',
    coach: 'Ms. Faith Mwangi', requirements: ['Swimsuit', 'Swimming goggles', 'Swim cap', 'Towel', 'Medical clearance'],
    maxMembers: 25, currentMembers: 18, icon: '🏊' },
  { id: 'a4', name: 'Athletics', category: 'sports', description: 'Track and field events. Training for inter-school championships.',
    schedule: 'Monday, Wednesday, Friday', time: '6:00 AM - 7:00 AM', venue: 'Running Track',
    coach: 'Mr. Peter Njoroge', requirements: ['Running shoes', 'School PE kit', 'Water bottle'],
    maxMembers: 40, currentMembers: 32, icon: '🏃' },

  // Music
  { id: 'a5', name: 'School Choir', category: 'music', description: 'Mixed choir performing at school events, church services, and music festivals.',
    schedule: 'Tuesday & Thursday', time: '4:00 PM - 5:30 PM', venue: 'Music Room',
    coach: 'Ms. Esther Wambui', requirements: ['No prior experience needed', 'Commitment to attend rehearsals', 'Choir uniform (provided)'],
    maxMembers: 50, currentMembers: 38, icon: '🎶' },
  { id: 'a6', name: 'School Band', category: 'music', description: 'Instrumental band. Brass, woodwind, and percussion sections.',
    schedule: 'Monday & Wednesday', time: '4:00 PM - 5:30 PM', venue: 'Music Room',
    coach: 'Ms. Esther Wambui', requirements: ['Own instrument (or school-provided)', 'Basic music reading skills', 'Regular practice commitment'],
    maxMembers: 30, currentMembers: 22, icon: '🎺' },
  { id: 'a7', name: 'African Drums & Dance', category: 'music', description: 'Traditional African drumming and dance ensemble.',
    schedule: 'Friday', time: '3:30 PM - 5:00 PM', venue: 'Assembly Hall',
    coach: 'Ms. Esther Wambui', requirements: ['Comfortable clothing', 'Enthusiasm', 'No prior experience needed'],
    maxMembers: 25, currentMembers: 20, icon: '🥁' },

  // Clubs
  { id: 'a8', name: 'Science Club', category: 'clubs', description: 'Experiments, science fair preparation, and STEM activities.',
    schedule: 'Thursday', time: '3:30 PM - 5:00 PM', venue: 'Science Lab',
    coach: 'Mr. James Kamau', requirements: ['Lab coat', 'Notebook', 'Curiosity!'],
    maxMembers: 25, currentMembers: 20, icon: '🔬' },
  { id: 'a9', name: 'Debate Club', category: 'clubs', description: 'Public speaking, debate competitions, and critical thinking.',
    schedule: 'Wednesday', time: '3:30 PM - 5:00 PM', venue: 'Library',
    coach: 'Ms. Amina Hassan', requirements: ['Interest in current affairs', 'Notebook'],
    maxMembers: 20, currentMembers: 14, icon: '🎙️' },
  { id: 'a10', name: 'Coding Club', category: 'clubs', description: 'Learn programming, build apps, and participate in hackathons.',
    schedule: 'Tuesday', time: '3:30 PM - 5:00 PM', venue: 'Computer Lab',
    coach: 'Mr. Daniel Kipchoge', requirements: ['Interest in technology', 'No prior experience needed'],
    maxMembers: 20, currentMembers: 18, icon: '💻' },

  // Arts
  { id: 'a11', name: 'Art & Painting', category: 'arts', description: 'Visual arts: painting, drawing, and sculpture.',
    schedule: 'Monday', time: '3:30 PM - 5:00 PM', venue: 'Art Studio',
    coach: 'Ms. Grace Akinyi', requirements: ['Art apron', 'Sketchbook (provided)', 'Enthusiasm'],
    maxMembers: 20, currentMembers: 15, icon: '🎨' },
  { id: 'a12', name: 'Drama Club', category: 'arts', description: 'Theatre production, acting workshops, and school plays.',
    schedule: 'Friday', time: '3:30 PM - 5:00 PM', venue: 'Assembly Hall',
    coach: 'Ms. Grace Akinyi', requirements: ['Comfortable clothing', 'Creativity', 'Commitment to rehearsals'],
    maxMembers: 30, currentMembers: 22, icon: '🎭' },
];
