import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Bell, MessageSquare, GraduationCap, CalendarDays, DollarSign } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'message' | 'result' | 'event' | 'finance';
  forRoles: ('teacher' | 'parent' | 'student')[];
}

const notifications: Notification[] = [
  { id: 'n1', title: 'New Message from Admin', message: 'Mid-term exams start on April 28th. Please ensure all students are prepared.', time: '2 hours ago', read: false, type: 'message', forRoles: ['teacher', 'parent', 'student'] },
  { id: 'n2', title: 'Results Published', message: 'Term 4 results have been published. Check the results dashboard.', time: '1 day ago', read: false, type: 'result', forRoles: ['teacher', 'parent', 'student'] },
  { id: 'n3', title: 'School Trip Registration', message: 'National Park trip registration is now open. Fee: $45. Deadline: May 5th.', time: '2 days ago', read: false, type: 'event', forRoles: ['teacher', 'parent', 'student'] },
  { id: 'n4', title: 'Fee Reminder', message: 'Term 2 fees are due by April 30th. Outstanding balance will attract penalties.', time: '3 days ago', read: true, type: 'finance', forRoles: ['parent', 'student'] },
  { id: 'n5', title: 'Parent-Teacher Conference', message: 'Quarterly parent-teacher meeting on April 22nd at 2:00 PM.', time: '4 days ago', read: true, type: 'event', forRoles: ['teacher', 'parent'] },
  { id: 'n6', title: 'Sports Day Announcement', message: 'Annual inter-house athletics on May 15th. All students to participate.', time: '5 days ago', read: true, type: 'event', forRoles: ['teacher', 'parent', 'student'] },
  { id: 'n7', title: 'New Student Enrolled', message: 'Grace Wanjiku has been enrolled in Grade 8.', time: '6 days ago', read: true, type: 'message', forRoles: ['teacher'] },
  { id: 'n8', title: 'Music Festival Tryouts', message: 'Music festival tryouts on April 25th. Register at the music room.', time: '1 week ago', read: true, type: 'event', forRoles: ['teacher', 'parent', 'student'] },
];

const iconMap = {
  message: MessageSquare,
  result: GraduationCap,
  event: CalendarDays,
  finance: DollarSign,
};

const colorMap = {
  message: 'bg-accent/10 text-accent',
  result: 'bg-success/10 text-success',
  event: 'bg-warning/10 text-warning',
  finance: 'bg-destructive/10 text-destructive',
};

export default function Notifications() {
  const { user } = useAuth();
  const role: 'teacher' | 'parent' | 'student' =
    user?.role === 'teacher' || user?.role === 'parent' || user?.role === 'student' ? user.role : 'student';
  const filtered = notifications.filter(n => n.forRoles.includes(role));

  return (
    <Layout title="Notifications" subtitle="Messages, results, and updates">
      <div className="space-y-3 max-w-2xl">
        {filtered.map(n => {
          const Icon = iconMap[n.type];
          return (
            <div key={n.id} className={`flex items-start gap-4 rounded-xl border p-4 transition-all ${
              n.read ? 'border-border bg-card' : 'border-primary/20 bg-primary/5'
            }`}>
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${colorMap[n.type]}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm text-foreground">{n.title}</p>
                  {!n.read && <Badge variant="default" className="text-[10px] px-1.5 py-0">New</Badge>}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{n.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
