import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import { Users, DollarSign, GraduationCap, TrendingUp } from 'lucide-react';

const attendanceTrend = [
  { week: 'W1', rate: 94 }, { week: 'W2', rate: 96 }, { week: 'W3', rate: 92 },
  { week: 'W4', rate: 95 }, { week: 'W5', rate: 97 }, { week: 'W6', rate: 93 },
];
const feeStatus = [
  { name: 'Paid', value: 412, color: 'hsl(var(--success))' },
  { name: 'Partial', value: 87, color: 'hsl(var(--warning))' },
  { name: 'Unpaid', value: 34, color: 'hsl(var(--destructive))' },
];
const performance = [
  { subject: 'Math', avg: 72 }, { subject: 'English', avg: 78 },
  { subject: 'Biology', avg: 75 }, { subject: 'Physics', avg: 68 },
  { subject: 'Chemistry', avg: 71 }, { subject: 'History', avg: 80 },
];

export default function Analytics() {
  return (
    <Layout title="Admin Analytics" subtitle="School-wide insights & reports">
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card><CardContent className="p-5 flex items-center gap-3"><div className="rounded-lg bg-primary/10 p-2"><Users className="h-5 w-5 text-primary" /></div><div><p className="text-xs text-muted-foreground">Total Students</p><p className="text-2xl font-bold">533</p></div></CardContent></Card>
        <Card><CardContent className="p-5 flex items-center gap-3"><div className="rounded-lg bg-success/10 p-2"><TrendingUp className="h-5 w-5 text-success" /></div><div><p className="text-xs text-muted-foreground">Avg Attendance</p><p className="text-2xl font-bold">94.5%</p></div></CardContent></Card>
        <Card><CardContent className="p-5 flex items-center gap-3"><div className="rounded-lg bg-warning/10 p-2"><DollarSign className="h-5 w-5 text-warning" /></div><div><p className="text-xs text-muted-foreground">Fee Collection</p><p className="text-2xl font-bold">82%</p></div></CardContent></Card>
        <Card><CardContent className="p-5 flex items-center gap-3"><div className="rounded-lg bg-accent/10 p-2"><GraduationCap className="h-5 w-5 text-accent-foreground" /></div><div><p className="text-xs text-muted-foreground">Avg GPA</p><p className="text-2xl font-bold">3.4</p></div></CardContent></Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Attendance Trend (6 weeks)</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" domain={[85, 100]} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                <Line type="monotone" dataKey="rate" stroke="hsl(var(--primary))" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Fee Payment Status</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={feeStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {feeStatus.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader><CardTitle>Average Performance by Subject</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={performance}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="subject" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                <Bar dataKey="avg" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
