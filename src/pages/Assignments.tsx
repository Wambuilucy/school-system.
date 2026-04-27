import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { assignments as initialA, submissions as initialS, AssignmentStatus } from '@/data/assignmentsData';
import { BookOpen, Plus, Calendar, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const statusCls: Record<AssignmentStatus, string> = {
  pending: 'bg-warning/10 text-warning',
  submitted: 'bg-primary/10 text-primary',
  graded: 'bg-success/10 text-success',
  overdue: 'bg-destructive/10 text-destructive',
};

export default function Assignments() {
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher';
  const [assignments, setAssignments] = useState(initialA);
  const [submissions, setSubmissions] = useState(initialS);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', subject: '', description: '', dueDate: '' });

  const studentId = user?.studentId || user?.childrenIds?.[0] || 's1';
  const mySubmissions = submissions.filter(s => s.studentId === studentId);

  const create = () => {
    if (!form.title || !form.subject || !form.dueDate) { toast.error('Fill all fields'); return; }
    setAssignments([{ id: `as${Date.now()}`, ...form, assignedBy: user?.name || 'Teacher', classGroup: 'Form 3A' }, ...assignments]);
    setForm({ title: '', subject: '', description: '', dueDate: '' });
    setOpen(false);
    toast.success('Assignment posted');
  };

  const submit = (assignmentId: string) => {
    setSubmissions(subs => {
      const existing = subs.find(s => s.assignmentId === assignmentId && s.studentId === studentId);
      if (existing) {
        return subs.map(s => s.id === existing.id ? { ...s, status: 'submitted' as const, submittedAt: new Date().toISOString().slice(0, 10) } : s);
      }
      return [...subs, { id: `sb${Date.now()}`, assignmentId, studentId, studentName: user?.name || 'Student', status: 'submitted' as const, submittedAt: new Date().toISOString().slice(0, 10) }];
    });
    toast.success('Submission uploaded');
  };

  const getStatus = (aid: string): AssignmentStatus => {
    const s = mySubmissions.find(x => x.assignmentId === aid);
    if (s) return s.status;
    const a = assignments.find(x => x.id === aid);
    return a && new Date(a.dueDate) < new Date() ? 'overdue' : 'pending';
  };

  return (
    <Layout title="Assignments" subtitle="Homework, projects, and submissions">
      <div className="flex justify-between items-center mb-6">
        <div className="grid gap-3 grid-cols-3 flex-1 mr-4">
          <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Total</p><p className="text-2xl font-bold">{assignments.length}</p></CardContent></Card>
          <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Pending</p><p className="text-2xl font-bold text-warning">{assignments.filter(a => getStatus(a.id) === 'pending').length}</p></CardContent></Card>
          <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Completed</p><p className="text-2xl font-bold text-success">{mySubmissions.filter(s => s.status === 'graded' || s.status === 'submitted').length}</p></CardContent></Card>
        </div>
        {isTeacher && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" />New Assignment</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Create Assignment</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div><Label>Title</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
                <div><Label>Subject</Label><Input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} /></div>
                <div><Label>Description</Label><Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
                <div><Label>Due Date</Label><Input type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} /></div>
                <Button onClick={create} className="w-full">Post Assignment</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Assignments</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-3">
          {assignments.map(a => {
            const status = getStatus(a.id);
            return (
              <Card key={a.id}>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <h3 className="font-semibold">{a.title}</h3>
                        <Badge variant="secondary">{a.subject}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{a.description}</p>
                    </div>
                    <Badge className={statusCls[status]}>{status}</Badge>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />Due {a.dueDate}</span>
                      <span>{a.assignedBy}</span>
                    </div>
                    {!isTeacher && status !== 'graded' && status !== 'submitted' && (
                      <Button size="sm" onClick={() => submit(a.id)}><Upload className="h-3 w-3 mr-1" />Submit</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
        <TabsContent value="submissions" className="space-y-2">
          {(isTeacher ? submissions : mySubmissions).map(s => {
            const a = assignments.find(x => x.id === s.assignmentId);
            return (
              <Card key={s.id}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{a?.title}</p>
                    <p className="text-xs text-muted-foreground">{s.studentName} {s.submittedAt && `· ${s.submittedAt}`}</p>
                    {s.feedback && <p className="text-xs mt-1 italic">"{s.feedback}"</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    {s.grade && <Badge variant="outline" className="bg-success/10 text-success">{s.grade}</Badge>}
                    <Badge className={statusCls[s.status]}>{s.status === 'graded' ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}{s.status}</Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
