import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { StudentCard } from '@/components/students/StudentCard';
import { PerformanceChart } from '@/components/students/PerformanceChart';
import { students, studentScores, getStudentAverage, getGradeColor } from '@/data/studentData';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';

export default function StudentsDashboard() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const selected = students.find(s => s.id === selectedId);

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.grade.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout title="Students Dashboard" subtitle="Complete directory of all students and their data">
      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search students by name or grade..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table view */}
      <div className="rounded-xl border border-border bg-card mb-6 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Math</TableHead>
              <TableHead>English</TableHead>
              <TableHead>Science</TableHead>
              <TableHead>History</TableHead>
              <TableHead>Art</TableHead>
              <TableHead>Average</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(student => {
              const scores = studentScores[student.id] || [];
              const avg = getStudentAverage(student.id);
              return (
                <TableRow
                  key={student.id}
                  className={cn(
                    "cursor-pointer transition-colors",
                    selectedId === student.id && "bg-primary/5"
                  )}
                  onClick={() => setSelectedId(student.id)}
                >
                  <TableCell className="font-medium">
                    <span className="mr-2">{student.avatar}</span>
                    {student.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{student.grade}</Badge>
                  </TableCell>
                  {scores.map(s => (
                    <TableCell key={s.subject}>
                      <span className={cn("font-medium", getGradeColor(s.score))}>{s.score}</span>
                    </TableCell>
                  ))}
                  <TableCell>
                    <span className={cn("font-bold font-display", getGradeColor(avg))}>{avg}%</span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Performance chart on selection */}
      {selected && (
        <div className="rounded-xl border border-border bg-card p-5">
          <PerformanceChart studentId={selected.id} studentName={selected.name} />
        </div>
      )}
    </Layout>
  );
}
