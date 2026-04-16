import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { activities } from '@/data/cocurricularData';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, MapPin, User, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  { value: 'all', label: 'All Activities' },
  { value: 'sports', label: '🏅 Sports' },
  { value: 'music', label: '🎵 Music' },
  { value: 'clubs', label: '📚 Clubs' },
  { value: 'arts', label: '🎨 Arts' },
];

export default function Cocurricular() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? activities : activities.filter(a => a.category === filter);

  return (
    <Layout title="Co-curricular Activities" subtitle="Sports, music, clubs, and how to join">
      {/* Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map(c => (
          <button key={c.value} onClick={() => setFilter(c.value)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              filter === c.value ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
            )}>
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(activity => (
          <div key={activity.id} className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{activity.icon}</span>
              <div>
                <p className="font-display font-semibold text-foreground">{activity.name}</p>
                <Badge variant="outline" className="text-[10px]">{activity.category}</Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{activity.description}</p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{activity.schedule} — {activity.time}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span>{activity.venue}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-3.5 w-3.5" />
                <span>Coach: {activity.coach}</span>
              </div>
            </div>

            <div className="mt-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>{activity.currentMembers}/{activity.maxMembers} members</span>
                <span>{activity.currentMembers >= activity.maxMembers ? 'Full' : 'Open'}</span>
              </div>
              <Progress value={(activity.currentMembers / activity.maxMembers) * 100} className="h-2" />
            </div>

            <div className="mt-3">
              <p className="text-xs font-semibold text-foreground mb-1 flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-success" /> Requirements
              </p>
              <ul className="space-y-0.5">
                {activity.requirements.map((r, i) => (
                  <li key={i} className="text-xs text-muted-foreground">• {r}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
