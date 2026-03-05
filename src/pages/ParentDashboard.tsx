import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { PerformanceChart } from '@/components/students/PerformanceChart';
import { students, studentScores, getStudentAverage, getGradeColor } from '@/data/studentData';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Mock: parent sees their children (using parentId 'p1' for demo)
const PARENT_ID = 'p1';

export default function ParentDashboard() {
  const myChildren = students.filter(s => s.parentId === PARENT_ID);
  const [selectedId, setSelectedId] = useState<string>(myChildren[0]?.id || '');
  const selected = myChildren.find(s => s.id === selectedId);

  // If parent has no children, show all as demo
  const displayChildren = myChildren.length > 0 ? myChildren : students.slice(0, 2);

  return (
    <Layout title="Parent's Dashboard" subtitle="Track your child's academic performance">
      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-3">Your Children</p>
        <div className="flex gap-3 flex-wrap">
          {displayChildren.map(child => {
            const avg = getStudentAverage(child.id);
            return (
              <button
                key={child.id}
                onClick={() => setSelectedId(child.id)}
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-4 transition-all min-w-[200px]",
                  selectedId === child.id
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border bg-card hover:border-primary/30"
                )}
              >
                <span className="text-2xl">{child.avatar}</span>
                <div>
                  <p className="font-medium text-foreground">{child.name}</p>
                  <p className="text-xs text-muted-foreground">{child.grade}</p>
                  <p className={cn("text-sm font-bold", getGradeColor(avg))}>{avg}% Average</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selected && (
        <div className="space-y-6">
          {/* Subject breakdown */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">Subject Breakdown</h3>
            <div className="space-y-3">
              {studentScores[selected.id]?.map(s => (
                <div key={s.subject} className="flex items-center gap-4">
                  <span className="w-20 text-sm text-muted-foreground">{s.subject}</span>
                  <Progress value={s.score} className="flex-1 h-3" />
                  <Badge variant="secondary">{s.grade}</Badge>
                  <span className={cn("w-12 text-right text-sm font-bold", getGradeColor(s.score))}>
                    {s.score}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <PerformanceChart studentId={selected.id} studentName={selected.name} />
        </div>
      )}
    </Layout>
  );
}
