import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon: Icon,
  iconColor = 'primary'
}: StatsCardProps) {
  return (
    <div className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 font-display text-3xl font-bold text-foreground">{value}</p>
          {change && (
            <p className={cn(
              "mt-1 text-sm font-medium",
              changeType === 'positive' && "text-success",
              changeType === 'negative' && "text-destructive",
              changeType === 'neutral' && "text-muted-foreground"
            )}>
              {change}
            </p>
          )}
        </div>
        <div className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110",
          iconColor === 'primary' && "bg-primary/10 text-primary",
          iconColor === 'accent' && "bg-accent/10 text-accent",
          iconColor === 'success' && "bg-success/10 text-success",
          iconColor === 'warning' && "bg-warning/10 text-warning"
        )}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
