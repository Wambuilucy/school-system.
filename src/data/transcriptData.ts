export interface TranscriptEntry {
  term: string;
  year: string;
  subjects: {
    name: string;
    score: number;
    grade: string;
    credits: number;
    teacher: string;
  }[];
  gpa: number;
  remarks: string;
}

export const transcripts: Record<string, TranscriptEntry[]> = {
  s1: [
    {
      term: 'Term 1', year: '2025',
      subjects: [
        { name: 'Mathematics', score: 80, grade: 'B', credits: 4, teacher: 'Mr. Adams' },
        { name: 'English', score: 85, grade: 'B', credits: 3, teacher: 'Ms. Clark' },
        { name: 'Science', score: 88, grade: 'B+', credits: 4, teacher: 'Dr. Patel' },
        { name: 'History', score: 70, grade: 'C', credits: 3, teacher: 'Mrs. Reed' },
        { name: 'Art', score: 87, grade: 'B+', credits: 2, teacher: 'Ms. Luna' },
      ],
      gpa: 3.2, remarks: 'Good progress, needs improvement in History.',
    },
    {
      term: 'Term 2', year: '2025',
      subjects: [
        { name: 'Mathematics', score: 85, grade: 'B', credits: 4, teacher: 'Mr. Adams' },
        { name: 'English', score: 86, grade: 'B+', credits: 3, teacher: 'Ms. Clark' },
        { name: 'Science', score: 90, grade: 'A-', credits: 4, teacher: 'Dr. Patel' },
        { name: 'History', score: 74, grade: 'C', credits: 3, teacher: 'Mrs. Reed' },
        { name: 'Art', score: 88, grade: 'B+', credits: 2, teacher: 'Ms. Luna' },
      ],
      gpa: 3.4, remarks: 'Steady improvement across subjects.',
    },
    {
      term: 'Term 3', year: '2025',
      subjects: [
        { name: 'Mathematics', score: 88, grade: 'B+', credits: 4, teacher: 'Mr. Adams' },
        { name: 'English', score: 87, grade: 'B+', credits: 3, teacher: 'Ms. Clark' },
        { name: 'Science', score: 92, grade: 'A-', credits: 4, teacher: 'Dr. Patel' },
        { name: 'History', score: 76, grade: 'C+', credits: 3, teacher: 'Mrs. Reed' },
        { name: 'Art', score: 84, grade: 'B', credits: 2, teacher: 'Ms. Luna' },
      ],
      gpa: 3.5, remarks: 'Excellent work in Science. Keep it up!',
    },
    {
      term: 'Term 4', year: '2025',
      subjects: [
        { name: 'Mathematics', score: 92, grade: 'A-', credits: 4, teacher: 'Mr. Adams' },
        { name: 'English', score: 88, grade: 'B+', credits: 3, teacher: 'Ms. Clark' },
        { name: 'Science', score: 95, grade: 'A', credits: 4, teacher: 'Dr. Patel' },
        { name: 'History', score: 78, grade: 'C+', credits: 3, teacher: 'Mrs. Reed' },
        { name: 'Art', score: 85, grade: 'B', credits: 2, teacher: 'Ms. Luna' },
      ],
      gpa: 3.6, remarks: 'Outstanding performance this term.',
    },
  ],
  s2: [
    {
      term: 'Term 1', year: '2025',
      subjects: [
        { name: 'Mathematics', score: 70, grade: 'C', credits: 4, teacher: 'Mr. Adams' },
        { name: 'English', score: 80, grade: 'B', credits: 3, teacher: 'Ms. Clark' },
        { name: 'Science', score: 65, grade: 'D+', credits: 4, teacher: 'Dr. Patel' },
        { name: 'History', score: 85, grade: 'B', credits: 3, teacher: 'Mrs. Reed' },
        { name: 'Art', score: 90, grade: 'A-', credits: 2, teacher: 'Ms. Luna' },
      ],
      gpa: 2.9, remarks: 'Strong in Arts and History. Science needs attention.',
    },
    {
      term: 'Term 2', year: '2025',
      subjects: [
        { name: 'Mathematics', score: 72, grade: 'C', credits: 4, teacher: 'Mr. Adams' },
        { name: 'English', score: 81, grade: 'B-', credits: 3, teacher: 'Ms. Clark' },
        { name: 'Science', score: 66, grade: 'D+', credits: 4, teacher: 'Dr. Patel' },
        { name: 'History', score: 88, grade: 'B+', credits: 3, teacher: 'Mrs. Reed' },
        { name: 'Art', score: 92, grade: 'A-', credits: 2, teacher: 'Ms. Luna' },
      ],
      gpa: 3.0, remarks: 'Consistent performance. Encourage more Science study.',
    },
    {
      term: 'Term 3', year: '2025',
      subjects: [
        { name: 'Mathematics', score: 74, grade: 'C', credits: 4, teacher: 'Mr. Adams' },
        { name: 'English', score: 82, grade: 'B', credits: 3, teacher: 'Ms. Clark' },
        { name: 'Science', score: 67, grade: 'D+', credits: 4, teacher: 'Dr. Patel' },
        { name: 'History', score: 89, grade: 'B+', credits: 3, teacher: 'Mrs. Reed' },
        { name: 'Art', score: 93, grade: 'A', credits: 2, teacher: 'Ms. Luna' },
      ],
      gpa: 3.1, remarks: 'Improving steadily.',
    },
    {
      term: 'Term 4', year: '2025',
      subjects: [
        { name: 'Mathematics', score: 75, grade: 'C', credits: 4, teacher: 'Mr. Adams' },
        { name: 'English', score: 82, grade: 'B', credits: 3, teacher: 'Ms. Clark' },
        { name: 'Science', score: 68, grade: 'D+', credits: 4, teacher: 'Dr. Patel' },
        { name: 'History', score: 90, grade: 'A-', credits: 3, teacher: 'Mrs. Reed' },
        { name: 'Art', score: 94, grade: 'A', credits: 2, teacher: 'Ms. Luna' },
      ],
      gpa: 3.1, remarks: 'Talented in creative subjects.',
    },
  ],
};

// Generate simple transcripts for other students
['s3','s4','s5','s6','s7','s8'].forEach(id => {
  if (!transcripts[id]) {
    transcripts[id] = [
      {
        term: 'Term 1', year: '2025',
        subjects: [
          { name: 'Mathematics', score: 75 + Math.floor(Math.random()*20), grade: 'B', credits: 4, teacher: 'Mr. Adams' },
          { name: 'English', score: 70 + Math.floor(Math.random()*25), grade: 'B', credits: 3, teacher: 'Ms. Clark' },
          { name: 'Science', score: 68 + Math.floor(Math.random()*25), grade: 'B-', credits: 4, teacher: 'Dr. Patel' },
          { name: 'History', score: 65 + Math.floor(Math.random()*30), grade: 'C+', credits: 3, teacher: 'Mrs. Reed' },
          { name: 'Art', score: 72 + Math.floor(Math.random()*25), grade: 'B', credits: 2, teacher: 'Ms. Luna' },
        ],
        gpa: 3.0 + Math.random()*0.8, remarks: 'Satisfactory performance.',
      },
    ];
  }
});
