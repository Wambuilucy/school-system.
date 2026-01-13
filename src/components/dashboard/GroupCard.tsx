import { ContactGroupInfo } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Send, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GroupCardProps {
  group: ContactGroupInfo;
}

export function GroupCard({ group }: GroupCardProps) {
  const navigate = useNavigate();

  const handleSendMessage = () => {
    navigate('/compose', { state: { selectedGroup: group.id } });
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30 animate-fade-in">
      {/* Background decoration */}
      <div className={cn(
        "absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-10 transition-transform duration-300 group-hover:scale-150",
        group.color === 'primary' && "bg-primary",
        group.color === 'accent' && "bg-accent",
        group.color === 'success' && "bg-success",
        group.color === 'warning' && "bg-warning"
      )} />

      <div className="relative">
        <div className="flex items-center gap-4">
          <span className="text-4xl">{group.icon}</span>
          <div className="flex-1">
            <h3 className="font-display text-lg font-semibold text-foreground">{group.name}</h3>
            <p className="text-sm text-muted-foreground">{group.description}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium">{group.memberCount} members</span>
          </div>
          <Button 
            size="sm" 
            variant="gradient" 
            onClick={handleSendMessage}
            className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          >
            <Send className="h-4 w-4" />
            Send Message
          </Button>
        </div>
      </div>
    </div>
  );
}
