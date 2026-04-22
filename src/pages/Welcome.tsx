import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, Users, Send, CalendarDays, DollarSign, ScrollText,
  BookOpen, UserCheck, Bell, Trophy, Bus
} from 'lucide-react';

const teacherLinks = [
  { to: '/teacher', icon: GraduationCap, label: 'Teacher Dashboard', desc: 'View all students' },
  { to: '/compose', icon: Send, label: 'Compose Message', desc: 'Send announcements' },
  { to: '/students', icon: BookOpen, label: 'All Students', desc: 'Academic records' },
  { to: '/events', icon: CalendarDays, label: 'Events', desc: 'School & church events' },
  { to: '/finance', icon: DollarSign, label: 'Finance', desc: 'Fee management' },
  { to: '/trips', icon: Bus, label: 'School Trips', desc: 'Plan & manage trips' },
  { to: '/teacher-directory', icon: Users, label: 'Staff Directory', desc: 'All teachers' },
  { to: '/cocurricular', icon: Trophy, label: 'Co-curricular', desc: 'Activities & clubs' },
];

const parentLinks = [
  { to: '/parent', icon: UserCheck, label: "Child's Dashboard", desc: 'View performance' },
  { to: '/transcript', icon: ScrollText, label: 'Transcripts', desc: 'Academic records' },
  { to: '/finance', icon: DollarSign, label: 'Finance', desc: 'Fee balance' },
  { to: '/events', icon: CalendarDays, label: 'Events', desc: 'Upcoming events' },
  { to: '/trips', icon: Bus, label: 'School Trips', desc: 'Trip details & costs' },
  { to: '/teacher-directory', icon: Users, label: 'Contact Teachers', desc: 'Staff contacts' },
  { to: '/cocurricular', icon: Trophy, label: 'Co-curricular', desc: 'Activities for your child' },
];

const studentLinks = [
  { to: '/student-portal', icon: BookOpen, label: 'My Results', desc: 'View your grades' },
  { to: '/transcript', icon: ScrollText, label: 'Transcript', desc: 'Academic records' },
  { to: '/finance', icon: DollarSign, label: 'Fee Balance', desc: 'Check payments' },
  { to: '/events', icon: CalendarDays, label: 'Events', desc: 'Upcoming events' },
  { to: '/trips', icon: Bus, label: 'School Trips', desc: 'Trip info' },
  { to: '/cocurricular', icon: Trophy, label: 'Co-curricular', desc: 'Join activities' },
];

export default function Welcome() {
  const { user } = useAuth();
  if (!user) return null;

  const links = user.role === 'teacher' ? teacherLinks : user.role === 'parent' ? parentLinks : studentLinks;
  const greeting = new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <Layout title={`${greeting}, ${user.name}!`} subtitle={`Logged in as ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}`}>
      <div className="space-y-6">
        {/* Welcome banner */}
        <div className="rounded-2xl gradient-primary p-6 text-primary-foreground">
          <h2 className="font-display text-2xl font-bold">Welcome to SchoolLink</h2>
          <p className="mt-1 text-primary-foreground/80">
            {user.role === 'teacher' && 'You have full access to manage students, messages, events, and more.'}
            {user.role === 'parent' && "Track your child's academic progress, fees, and school activities."}
            {user.role === 'student' && 'View your grades, upcoming events, and school activities.'}
          </p>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {links.map(link => (
            <Link key={link.to} to={link.to}>
              <Card className="p-4 hover:shadow-md transition-all hover:border-primary/30 cursor-pointer h-full">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <link.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{link.label}</p>
                    <p className="text-xs text-muted-foreground">{link.desc}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Notifications preview */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5 text-primary" />
            <h3 className="font-display font-semibold text-foreground">Recent Notifications</h3>
          </div>
          <div className="space-y-3">
            {[
              { msg: 'Mid-term exams start on April 28th', time: '2 hours ago', type: 'info' },
              { msg: 'New results published for Term 4', time: '1 day ago', type: 'success' },
              { msg: 'School trip to National Park - Registration open', time: '2 days ago', type: 'warning' },
            ].map((n, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg bg-secondary p-3">
                <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${
                  n.type === 'success' ? 'bg-success' : n.type === 'warning' ? 'bg-warning' : 'bg-accent'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-foreground">{n.msg}</p>
                  <p className="text-xs text-muted-foreground">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/notifications">
            <Button variant="ghost" size="sm" className="mt-3 w-full">View all notifications</Button>
          </Link>
        </Card>
      </div>
    </Layout>
  );
}
