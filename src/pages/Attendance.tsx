import { useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { attendanceRecords, classRoster, AttendanceStatus } from '@/data/attendanceData';
import { CheckCircle2, XCircle, Clock, FileText, Calendar as CalIcon } from 'lucide-react';
import { toast } from 'sonner';

const statusMeta: Record<AttendanceStatus, { label: string; icon: any; cls: string }> = {
  present: { label: 'Present', icon: CheckCircle2, cls: 'bg-success/10 text-success border-success/20' },
  absent: { label: 'Absent', icon: XCircle, cls: 'bg-destructive/10 text-destructive border-destructive/20' },
  late: { label: 'Late', icon: Clock, cls: 'bg-warning/10 text-warning border-warning/20' },
  excused: { label: 'Excused', icon: FileText, cls: 'bg-primary/10 text-primary border-primary/20' },
};

export default function Attendance() {
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher';
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [draft, setDraft] = useState<Record<string, AttendanceStatus>>({});

  const myRecords = useMemo(() => {
    if (isTeacher) return attendanceRecords;
    const sid = user?.studentId || user?.childrenIds?.[0];
    return attendanceRecords.filter(r => r.studentId === sid);
  }, [isTeacher, user]);

  const stats = useMemo(() => {
    const total = myRecords.length || 1;
    const present = myRecords.filter(r => r.status === 'present').length;
    const absent = myRecords.filter(r => r.status === 'absent').length;
    const late = myRecords.filter(r => r.status === 'late').length;
    return { rate: Math.round((present / total) * 100), present, absent, late };
  }, [myRecords]);

  const submit = () => {
    toast.success(`Attendance saved for ${Object.keys(draft).length} students`);
    setDraft({});
  };

  return (
    <Layout title="Attendance" subtitle="Daily attendance tracking and history">
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Attendance Rate</p><p className="text-3xl font-bold text-success">{stats.rate}%</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Present</p><p className="text-3xl font-bold">{stats.present}</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Absent</p><p className="text-3xl font-bold text-destructive">{stats.absent}</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Late</p><p className="text-3xl font-bold text-warning">{stats.late}</p></CardContent></Card>
      </div>

      <Tabs defaultValue={isTeacher ? 'mark' : 'history'}>
        <TabsList>
          {isTeacher && <TabsTrigger value="mark">Mark Attendance</TabsTrigger>}
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {isTeacher && (
          <TabsContent value="mark">
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Form 3A — {date}</CardTitle>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-48" />
              </CardHeader>
              <CardContent className="space-y-2">
                {classRoster.map(s => (
                  <div key={s.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">{s.name.charAt(0)}</div>
                      <p className="font-medium">{s.name}</p>
                    </div>
                    <Select value={draft[s.id] || ''} onValueChange={(v) => setDraft({ ...draft, [s.id]: v as AttendanceStatus })}>
                      <SelectTrigger className="w-40"><SelectValue placeholder="Mark..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="present">Present</SelectItem>
                        <SelectItem value="absent">Absent</SelectItem>
                        <SelectItem value="late">Late</SelectItem>
                        <SelectItem value="excused">Excused</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
                <Button onClick={submit} className="w-full mt-4" disabled={!Object.keys(draft).length}>Save Attendance</Button>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="history">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><CalIcon className="h-5 w-5" />Attendance Records</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {myRecords.map(r => {
                const m = statusMeta[r.status];
                const Icon = m.icon;
                return (
                  <div key={r.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div>
                      <p className="font-medium">{r.studentName}</p>
                      <p className="text-xs text-muted-foreground">{r.date} · {r.className}{r.reason && ` · ${r.reason}`}</p>
                    </div>
                    <Badge variant="outline" className={m.cls}><Icon className="h-3 w-3 mr-1" />{m.label}</Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
