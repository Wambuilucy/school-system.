import { Layout } from '@/components/layout/Layout';
import { recentMessages, contactGroups } from '@/data/mockData';
import { CheckCircle, Clock, XCircle, RefreshCw } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const History = () => {
  const getGroupName = (groupId: string) => {
    return contactGroups.find(g => g.id === groupId)?.name || groupId;
  };

  const getGroupIcon = (groupId: string) => {
    return contactGroups.find(g => g.id === groupId)?.icon || '📩';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-warning animate-pulse-soft" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return null;
    }
  };

  // Extended messages for demo
  const allMessages = [
    ...recentMessages,
    {
      id: '4',
      content: 'Monthly newsletter has been published. Check your inbox!',
      recipients: ['congregation'],
      groupId: 'congregation',
      sentAt: new Date(Date.now() - 345600000),
      status: 'sent' as const,
    },
    {
      id: '5',
      content: 'Reminder: School fees due by end of month.',
      recipients: ['school-parents'],
      groupId: 'school-parents',
      sentAt: new Date(Date.now() - 432000000),
      status: 'sent' as const,
    },
  ];

  return (
    <Layout 
      title="Message History" 
      subtitle="View all sent messages"
    >
      <div className="mb-6 flex items-center justify-between">
        <p className="text-muted-foreground">
          {allMessages.length} messages sent
        </p>
        <Button variant="outline">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="divide-y divide-border">
          {allMessages.map((message, index) => (
            <div 
              key={message.id}
              className="flex items-start gap-4 p-6 transition-colors hover:bg-secondary/30 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="text-3xl">{getGroupIcon(message.groupId)}</span>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-foreground">
                    {getGroupName(message.groupId)}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    {getStatusIcon(message.status)}
                    <span className={cn(
                      "text-sm font-medium capitalize",
                      message.status === 'sent' && "text-success",
                      message.status === 'pending' && "text-warning",
                      message.status === 'failed' && "text-destructive"
                    )}>
                      {message.status}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-foreground">
                  {message.content}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {format(message.sentAt, 'PPP')} • {formatDistanceToNow(message.sentAt, { addSuffix: true })}
                </p>
              </div>

              <Button variant="ghost" size="sm">
                Resend
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default History;
