import { Layout } from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { timetable, days, timeSlots } from '@/data/timetableData';
import { cn } from '@/lib/utils';

const colorMap: Record<string, string> = {
  primary: 'bg-primary/10 border-primary/30 text-primary',
  accent: 'bg-accent/10 border-accent/30 text-accent-foreground',
  success: 'bg-success/10 border-success/30 text-success',
  warning: 'bg-warning/10 border-warning/30 text-warning',
  muted: 'bg-muted border-border text-muted-foreground',
};

export default function Timetable() {
  return (
    <Layout title="Timetable" subtitle="Weekly class schedule">
      <Card>
        <CardContent className="p-4 overflow-x-auto">
          <div className="grid gap-2 min-w-[900px]" style={{ gridTemplateColumns: '80px repeat(5, 1fr)' }}>
            <div></div>
            {days.map(d => <div key={d} className="text-center font-semibold text-sm py-2">{d}</div>)}
            {timeSlots.flatMap(time => [
              <div key={`t-${time}`} className="text-xs font-medium text-muted-foreground self-center text-right pr-2">{time}</div>,
              ...days.map(day => {
                const slot = timetable.find(s => s.day === day && s.time === time);
                if (!slot) return <div key={`${day}-${time}`} className="rounded border border-dashed border-border" />;
                return (
                  <div key={`${day}-${time}`} className={cn('rounded-lg border p-2 transition-all hover:scale-[1.02]', colorMap[slot.color])}>
                    <p className="font-semibold text-sm leading-tight">{slot.subject}</p>
                    {slot.teacher && <p className="text-xs opacity-80 mt-0.5">{slot.teacher}</p>}
                    {slot.room && <p className="text-xs opacity-70">{slot.room}</p>}
                  </div>
                );
              })
            ])}
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}
