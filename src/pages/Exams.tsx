import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { exams, examResults } from '@/data/examsData';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, MapPin, Clock, Award, TrendingUp } from 'lucide-react';

const statusCls = {
  upcoming: 'bg-primary/10 text-primary',
  ongoing: 'bg-warning/10 text-warning',
  completed: 'bg-success/10 text-success',
};

export default function Exams() {
  const { user } = useAuth();
  const studentId = user?.studentId || user?.childrenIds?.[0] || 's1';
  const myResults = user?.role === 'teacher' ? examResults : examResults.filter(r => r.studentId === studentId);

  return (
    <Layout title="Exams & Assessments" subtitle="Schedule, results, and performance">
      <Tabs defaultValue="schedule">
        <TabsList>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="grid gap-3 md:grid-cols-2">
          {exams.map(e => (
            <Card key={e.id}>
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{e.title}</h3>
                    <p className="text-sm text-muted-foreground">{e.subject}</p>
                  </div>
                  <Badge className={statusCls[e.status]}>{e.status}</Badge>
                </div>
                <div className="space-y-1.5 text-sm">
                  <p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" />{e.date}</p>
                  <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground" />{e.duration}</p>
                  <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" />{e.room}</p>
                  <p className="flex items-center gap-2"><Award className="h-4 w-4 text-muted-foreground" />Total: {e.totalMarks} marks</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="results" className="space-y-3">
          {myResults.map(r => {
            const exam = exams.find(e => e.id === r.examId);
            const pct = exam ? Math.round((r.marks / exam.totalMarks) * 100) : 0;
            return (
              <Card key={r.id}>
                <CardContent className="p-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{exam?.title}</h3>
                      <p className="text-xs text-muted-foreground">{r.studentName} · {exam?.date}</p>
                      <p className="text-sm mt-2 italic text-muted-foreground">"{r.remarks}"</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="bg-success/10 text-success text-lg px-3 py-1">{r.grade}</Badge>
                      <p className="text-2xl font-bold mt-2">{r.marks}<span className="text-sm text-muted-foreground">/{exam?.totalMarks}</span></p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end mt-1"><TrendingUp className="h-3 w-3" />{pct}%</p>
                    </div>
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
