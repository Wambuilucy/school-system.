import { cn } from '@/lib/utils';
import { Student, getStudentAverage, getGradeColor } from '@/data/studentData';
import { Progress } from '@/components/ui/progress';

interface StudentCardProps {
  student: Student;
  onClick: () => void;
  isSelected?: boolean;
}

export function StudentCard({ student, onClick, isSelected }: StudentCardProps) {
  const average = getStudentAverage(student.id);

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full rounded-xl border p-4 text-left transition-all duration-200 hover:shadow-md",
        isSelected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border bg-card hover:border-primary/30"
      )}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{student.avatar}</span>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-foreground truncate">{student.name}</p>
          <p className="text-xs text-muted-foreground">{student.grade}</p>
        </div>
        <span className={cn("text-lg font-bold font-display", getGradeColor(average))}>
          {average}%
        </span>
      </div>
      <Progress value={average} className="mt-3 h-2" />
    </button>
  );
}
