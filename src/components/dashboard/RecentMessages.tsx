import { Message } from '@/types';
import { contactGroups } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface RecentMessagesProps {
  messages: Message[];
}

export function RecentMessages({ messages }: RecentMessagesProps) {
  const getGroupName = (groupId: string) => {
    return contactGroups.find(g => g.id === groupId)?.name || groupId;
  };

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sent':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-warning animate-pulse-soft" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-destructive" />;
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <div className="border-b border-border px-6 py-4">
        <h2 className="font-display text-lg font-semibold text-foreground">Recent Messages</h2>
        <p className="text-sm text-muted-foreground">Your latest sent messages</p>
      </div>
      
      <div className="divide-y divide-border">
        {messages.map((message, index) => (
          <div 
            key={message.id} 
            className="flex items-start gap-4 p-4 transition-colors hover:bg-secondary/50 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">
                  {getGroupName(message.groupId)}
                </span>
                {getStatusIcon(message.status)}
              </div>
              <p className="mt-1 truncate text-sm text-muted-foreground">
                {message.content}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {formatDistanceToNow(message.sentAt, { addSuffix: true })}
              </p>
            </div>
            <div className={cn(
              "rounded-full px-2 py-1 text-xs font-medium",
              message.status === 'sent' && "bg-success/10 text-success",
              message.status === 'pending' && "bg-warning/10 text-warning",
              message.status === 'failed' && "bg-destructive/10 text-destructive"
            )}>
              {message.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
