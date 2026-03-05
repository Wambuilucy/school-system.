import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import { termPerformance, studentScores } from '@/data/studentData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PerformanceChartProps {
  studentId: string;
  studentName: string;
}

export function PerformanceChart({ studentId, studentName }: PerformanceChartProps) {
  const terms = termPerformance[studentId] || [];
  const scores = studentScores[studentId] || [];

  const radarData = scores.map(s => ({
    subject: s.subject,
    score: s.score,
    fullMark: 100,
  }));

  return (
    <div className="space-y-4">
      <h3 className="font-display text-lg font-semibold text-foreground">
        {studentName}'s Performance
      </h3>
      <Tabs defaultValue="trend" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trend">Trend Over Time</TabsTrigger>
          <TabsTrigger value="subjects">Subject Scores</TabsTrigger>
          <TabsTrigger value="radar">Radar View</TabsTrigger>
        </TabsList>

        <TabsContent value="trend" className="mt-4">
          <div className="h-[320px] w-full rounded-xl border border-border bg-card p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={terms}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="term" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="average" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 5 }} name="Average" />
                <Line type="monotone" dataKey="math" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ r: 3 }} name="Math" />
                <Line type="monotone" dataKey="english" stroke="hsl(var(--success))" strokeWidth={2} dot={{ r: 3 }} name="English" />
                <Line type="monotone" dataKey="science" stroke="hsl(var(--warning))" strokeWidth={2} dot={{ r: 3 }} name="Science" />
                <Line type="monotone" dataKey="history" stroke="hsl(var(--destructive))" strokeWidth={2} dot={{ r: 3 }} name="History" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="mt-4">
          <div className="h-[320px] w-full rounded-xl border border-border bg-card p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scores}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="subject" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="score" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} name="Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="radar" className="mt-4">
          <div className="h-[320px] w-full rounded-xl border border-border bg-card p-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="subject" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <PolarRadiusAxis domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <Radar name="Score" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
