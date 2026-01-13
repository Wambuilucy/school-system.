import { Contact, ContactGroupInfo, Message, MessageTemplate } from '@/types';

export const contactGroups: ContactGroupInfo[] = [
  {
    id: 'congregation',
    name: 'Congregation',
    description: 'Church members and attendees',
    memberCount: 156,
    icon: '⛪',
    color: 'primary',
  },
  {
    id: 'school-parents',
    name: 'School Parents',
    description: 'Parents of students',
    memberCount: 89,
    icon: '🏫',
    color: 'accent',
  },
  {
    id: 'youth-group',
    name: 'Youth Group',
    description: 'Young members ages 13-25',
    memberCount: 34,
    icon: '🎯',
    color: 'success',
  },
  {
    id: 'volunteers',
    name: 'Volunteers',
    description: 'Active volunteer members',
    memberCount: 42,
    icon: '🤝',
    color: 'warning',
  },
];

export const sampleContacts: Contact[] = [
  { id: '1', name: 'John Smith', phone: '+1234567890', email: 'john@email.com', group: 'congregation' },
  { id: '2', name: 'Mary Johnson', phone: '+1234567891', email: 'mary@email.com', group: 'congregation' },
  { id: '3', name: 'David Wilson', phone: '+1234567892', email: 'david@email.com', group: 'school-parents' },
  { id: '4', name: 'Sarah Brown', phone: '+1234567893', email: 'sarah@email.com', group: 'school-parents' },
  { id: '5', name: 'Michael Davis', phone: '+1234567894', email: 'michael@email.com', group: 'congregation' },
];

export const messageTemplates: MessageTemplate[] = [
  {
    id: '1',
    name: 'Sunday Service Reminder',
    content: 'Reminder: Sunday service starts at 10 AM. We look forward to seeing you!',
    category: 'congregation',
  },
  {
    id: '2',
    name: 'School Event Notification',
    content: 'Dear Parents, please note that [EVENT] is scheduled for [DATE]. Your child\'s participation is important.',
    category: 'school',
  },
  {
    id: '3',
    name: 'Emergency Alert',
    content: 'URGENT: [MESSAGE]. Please check your email for more details.',
    category: 'general',
  },
  {
    id: '4',
    name: 'Meeting Cancellation',
    content: 'Notice: The scheduled [MEETING] for [DATE] has been cancelled. We apologize for any inconvenience.',
    category: 'general',
  },
];

export const recentMessages: Message[] = [
  {
    id: '1',
    content: 'Sunday service will be held at 10 AM this week. All are welcome!',
    recipients: ['congregation'],
    groupId: 'congregation',
    sentAt: new Date(Date.now() - 86400000),
    status: 'sent',
  },
  {
    id: '2',
    content: 'Parent-teacher conference scheduled for next Friday at 3 PM.',
    recipients: ['school-parents'],
    groupId: 'school-parents',
    sentAt: new Date(Date.now() - 172800000),
    status: 'sent',
  },
  {
    id: '3',
    content: 'Youth group meeting moved to Saturday 5 PM.',
    recipients: ['youth-group'],
    groupId: 'youth-group',
    sentAt: new Date(Date.now() - 259200000),
    status: 'sent',
  },
];
