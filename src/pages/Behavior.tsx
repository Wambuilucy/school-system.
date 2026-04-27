import { useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { behaviorRecords, BehaviorType } from '@/data/behaviorData';
import { useAuth } from '@/contexts/AuthContext';
import { Award, ThumbsUp, AlertTriangle, Trophy } from 'lucide-react';

const typeMeta: Record<BehaviorType, { icon: any; cls: string; label: string }> = {
  merit: { icon: ThumbsUp, cls: 'bg-success/10 text-success border-success/20', label: 'Merit' },
  award: { icon: Trophy, cls: 'bg-primary/10 text-primary border-primary/20', label: 'Award' },
  demerit: { icon: AlertTriangle, cls: 'bg-destructive/10 text-destructive border-destructive/20', label: 'Demerit' },
};

export default function Behavior() {
  const { user } = useAuth();
  const studentId = user?.studentId || user?.childrenIds?.[0];
  const myRecords = user?.role === 'teacher' ? behaviorRecords : behaviorRecords.filter(r => r.studentId === studentId);

  const totals = useMemo(() => {
    const total = myRecords.reduce((a, r) => a + r.points, 0);
    const merits = myRecords.filter(r => r.type === 'merit').length;
    const awards = myRecords.filter(r => r.type === 'award').length;
    const demerits = myRecords.filter(r => r.type === 'demerit').length;
    return { total, merits, awards, demerits };
  }, [myRecords]);

  return (
    <Layout title="Behavior & Merit Points" subtitle="Conduct tracking, awards & recognition">
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Total Points</p><p className="text-3xl font-bold text-primary">{totals.total}</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Merits</p><p className="text-3xl font-bold text-success">{totals.merits}</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Awards</p><p className="text-3xl font-bold text-primary">{totals.awards}</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Demerits</p><p className="text-3xl font-bold text-destructive">{totals.demerits}</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Award className="h-5 w-5" />Recent Records</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {myRecords.map(r => {
            const m = typeMeta[r.type];
            const Icon = m.icon;
            return (
              <div key={r.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${m.cls}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{r.studentName} <span className="text-xs text-muted-foreground">· {r.category}</span></p>
                    <p className="text-sm text-muted-foreground">{r.description}</p>
                    <p className="text-xs text-muted-foreground">{r.date} · by {r.recordedBy}</p>
                  </div>
                </div>
                <Badge variant="outline" className={m.cls}>{r.points > 0 ? '+' : ''}{r.points} pts</Badge>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </Layout>
  );
}
