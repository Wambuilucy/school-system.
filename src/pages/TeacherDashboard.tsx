import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { StudentCard } from '@/components/students/StudentCard';
import { PerformanceChart } from '@/components/students/PerformanceChart';
import { students, studentScores, getStudentAverage } from '@/data/studentData';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, Award, AlertTriangle } from 'lucide-react';

export default function TeacherDashboard() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = students.find(s => s.id === selectedId);

  const classAvg = Math.round(students.reduce((sum, s) => sum + getStudentAverage(s.id), 0) / students.length);
  const topPerformers = students.filter(s => getStudentAverage(s.id) >= 90).length;
  const needsAttention = students.filter(s => getStudentAverage(s.id) < 70).length;

  return (
    <Layout title="Teacher's Dashboard" subtitle="Monitor all student performance">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 mb-6">
        {[
          { label: 'Total Students', value: students.length, icon: Users, color: 'primary' },
          { label: 'Class Average', value: `${classAvg}%`, icon: TrendingUp, color: 'accent' },
          { label: 'Top Performers', value: topPerformers, icon: Award, color: 'success' },
          { label: 'Needs Attention', value: needsAttention, icon: AlertTriangle, color: 'warning' },
        ].map(stat => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${stat.color}/10 text-${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="font-display text-xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Student list */}
        <div className="space-y-3">
          <h2 className="font-display text-lg font-semibold text-foreground">All Students</h2>
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {students.map(student => (
              <StudentCard
                key={student.id}
                student={student}
                isSelected={selectedId === student.id}
                onClick={() => setSelectedId(student.id)}
              />
            ))}
          </div>
        </div>

        {/* Performance detail */}
        <div className="lg:col-span-2">
          {selected ? (
            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{selected.avatar}</span>
                  <div>
                    <h2 className="font-display text-xl font-bold text-foreground">{selected.name}</h2>
                    <p className="text-sm text-muted-foreground">{selected.grade} • Parent: {selected.parentName}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {studentScores[selected.id]?.map(s => (
                    <Badge key={s.subject} variant="secondary" className="text-xs">
                      {s.subject}: {s.grade} ({s.score}%)
                    </Badge>
                  ))}
                </div>
              </div>
              <PerformanceChart studentId={selected.id} studentName={selected.name} />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-border bg-card/50 p-12">
              <p className="text-muted-foreground">Select a student to view their performance</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
