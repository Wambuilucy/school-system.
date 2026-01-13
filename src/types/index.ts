export interface Contact {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  group: ContactGroup;
}

export type ContactGroup = 'congregation' | 'school-parents' | 'custom';

export interface ContactGroupInfo {
  id: ContactGroup | string;
  name: string;
  description: string;
  memberCount: number;
  icon: string;
  color: string;
}

export interface Message {
  id: string;
  content: string;
  recipients: string[];
  groupId: string;
  sentAt: Date;
  status: 'sent' | 'pending' | 'failed';
}

export interface MessageTemplate {
  id: string;
  name: string;
  content: string;
  category: string;
}
