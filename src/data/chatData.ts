export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  online: boolean;
  messages: ChatMessage[];
}

export const conversations: Conversation[] = [
  {
    id: 'c1', name: 'Mr. Robert Ochieng', role: 'Math Teacher', avatar: 'RO',
    lastMessage: "Emma is doing great in algebra!", lastTime: '10:30 AM', unread: 2, online: true,
    messages: [
      { id: 'm1', senderId: 't1', senderName: 'Mr. Ochieng', text: 'Hello Mrs. Thompson, hope you are well.', timestamp: '10:15 AM' },
      { id: 'm2', senderId: 'p1', senderName: 'You', text: 'Hi Mr. Ochieng, all good. How is Emma?', timestamp: '10:22 AM' },
      { id: 'm3', senderId: 't1', senderName: 'Mr. Ochieng', text: 'Emma is doing great in algebra!', timestamp: '10:30 AM' },
    ],
  },
  {
    id: 'c2', name: 'Ms. Achieng', role: 'English Teacher', avatar: 'MA',
    lastMessage: 'Please review the essay rubric.', lastTime: 'Yesterday', unread: 0, online: false,
    messages: [
      { id: 'm4', senderId: 't2', senderName: 'Ms. Achieng', text: 'Please review the essay rubric.', timestamp: 'Yesterday' },
    ],
  },
  {
    id: 'c3', name: 'Form 3A Parents Group', role: 'Group · 24 members', avatar: 'F3',
    lastMessage: 'Sarah: Thanks for the update!', lastTime: '2 days ago', unread: 5, online: false,
    messages: [
      { id: 'm5', senderId: 'p2', senderName: 'David Wilson', text: 'When is the parent meeting?', timestamp: '2 days ago' },
      { id: 'm6', senderId: 'p1', senderName: 'Sarah', text: 'Thanks for the update!', timestamp: '2 days ago' },
    ],
  },
  {
    id: 'c4', name: 'Mr. Kamau', role: 'Biology Teacher', avatar: 'MK',
    lastMessage: 'Lab report received, well done.', lastTime: '3 days ago', unread: 0, online: true,
    messages: [
      { id: 'm7', senderId: 't3', senderName: 'Mr. Kamau', text: 'Lab report received, well done.', timestamp: '3 days ago' },
    ],
  },
];
