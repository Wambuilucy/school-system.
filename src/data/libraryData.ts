export type BookStatus = 'available' | 'borrowed' | 'reserved';

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  copies: number;
  available: number;
  cover: string; // emoji
}

export interface BorrowRecord {
  id: string;
  bookId: string;
  bookTitle: string;
  studentId: string;
  studentName: string;
  borrowedAt: string;
  dueDate: string;
  returned: boolean;
}

export const books: Book[] = [
  { id: 'b1', title: 'Things Fall Apart', author: 'Chinua Achebe', category: 'Fiction', isbn: '978-0385474542', copies: 5, available: 2, cover: '📕' },
  { id: 'b2', title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', isbn: '978-0553380163', copies: 3, available: 3, cover: '🌌' },
  { id: 'b3', title: 'The River Between', author: 'Ngũgĩ wa Thiong\'o', category: 'Fiction', isbn: '978-0435905484', copies: 4, available: 1, cover: '📗' },
  { id: 'b4', title: 'Algebra & Trigonometry', author: 'Robert Blitzer', category: 'Mathematics', isbn: '978-0134463216', copies: 8, available: 5, cover: '📐' },
  { id: 'b5', title: 'Sapiens', author: 'Yuval Noah Harari', category: 'History', isbn: '978-0062316097', copies: 6, available: 0, cover: '📜' },
  { id: 'b6', title: 'The Selfish Gene', author: 'Richard Dawkins', category: 'Biology', isbn: '978-0198788607', copies: 3, available: 2, cover: '🧬' },
];

export const borrowRecords: BorrowRecord[] = [
  { id: 'br1', bookId: 'b1', bookTitle: 'Things Fall Apart', studentId: 's1', studentName: 'Emma Thompson', borrowedAt: '2026-04-15', dueDate: '2026-04-29', returned: false },
  { id: 'br2', bookId: 'b3', bookTitle: 'The River Between', studentId: 's2', studentName: 'James Wilson', borrowedAt: '2026-04-10', dueDate: '2026-04-24', returned: false },
  { id: 'br3', bookId: 'b5', bookTitle: 'Sapiens', studentId: 's1', studentName: 'Emma Thompson', borrowedAt: '2026-04-05', dueDate: '2026-04-19', returned: false },
];
