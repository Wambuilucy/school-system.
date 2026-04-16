import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { PerformanceChart } from '@/components/students/PerformanceChart';
import { students, studentScores, getStudentAverage, getGradeColor } from '@/data/studentData';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export default function StudentPortal() {
  const { user } = useAuth();
  const studentId = user?.studentId || 's1';
  const student = students.find(s => s.id === studentId);
  const scores = studentScores[studentId] || [];
  const avg = getStudentAverage(studentId);

  if (!student) return <Layout title="Student Portal"><p>Student not found.</p></Layout>;

  return (
    <Layout title="My Academic Results" subtitle={`${student.name} — ${student.grade}`}>
      <div className="space-y-6">
        {/* Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-border bg-card p-5 text-center">
            <p className="text-4xl mb-1">{student.avatar}</p>
            <p className="font-display font-bold text-foreground">{student.name}</p>
            <p className="text-sm text-muted-foreground">{student.grade}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 text-center">
            <p className="text-sm text-muted-foreground">Overall Average</p>
            <p className={cn("text-3xl font-bold font-display", getGradeColor(avg))}>{avg}%</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 text-center">
            <p className="text-sm text-muted-foreground">Subjects</p>
            <p className="text-3xl font-bold font-display text-foreground">{scores.length}</p>
          </div>
        </div>

        {/* Subject breakdown */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Subject Scores</h3>
          <div className="space-y-3">
            {scores.map(s => (
              <div key={s.subject} className="flex items-center gap-4">
                <span className="w-20 text-sm text-muted-foreground">{s.subject}</span>
                <Progress value={s.score} className="flex-1 h-3" />
                <Badge variant="secondary">{s.grade}</Badge>
                <span className={cn("w-12 text-right text-sm font-bold", getGradeColor(s.score))}>{s.score}%</span>
              </div>
            ))}
          </div>
        </div>

        <PerformanceChart studentId={studentId} studentName={student.name} />
      </div>
    </Layout>
  );
}
