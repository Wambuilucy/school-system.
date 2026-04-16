import { Layout } from '@/components/layout/Layout';
import { teachers } from '@/data/teacherDirectoryData';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone } from 'lucide-react';

export default function TeacherDirectory() {
  const departments = [...new Set(teachers.map(t => t.department))];

  return (
    <Layout title="Staff Directory" subtitle="Contact information for all teachers">
      <div className="space-y-8">
        {departments.map(dept => (
          <div key={dept}>
            <h3 className="font-display text-lg font-semibold text-foreground mb-3">{dept}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {teachers.filter(t => t.department === dept).map(teacher => (
                <div key={teacher.id} className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{teacher.avatar}</span>
                    <div>
                      <p className="font-medium text-foreground">{teacher.name}</p>
                      <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-3.5 w-3.5" />
                      <a href={`mailto:${teacher.email}`} className="hover:text-primary">{teacher.email}</a>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-3.5 w-3.5" />
                      <span>{teacher.phone}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    <Badge variant="secondary">{teacher.qualification}</Badge>
                    {teacher.classTeacher && <Badge variant="outline">{teacher.classTeacher}</Badge>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
