import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { contactGroups, messageTemplates } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Send, FileText, Users, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ComposeFormProps {
  initialGroupId?: string;
}

export function ComposeForm({ initialGroupId }: ComposeFormProps) {
  const [message, setMessage] = useState('');
  const [selectedGroups, setSelectedGroups] = useState<string[]>(
    initialGroupId ? [initialGroupId] : []
  );
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const totalRecipients = contactGroups
    .filter(g => selectedGroups.includes(g.id))
    .reduce((acc, g) => acc + g.memberCount, 0);

  const toggleGroup = (groupId: string) => {
    setSelectedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const applyTemplate = (content: string) => {
    setMessage(content);
    toast.success('Template applied');
  };

  const handleSend = async () => {
    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }
    if (selectedGroups.length === 0) {
      toast.error('Please select at least one group');
      return;
    }

    setIsSending(true);
    
    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSending(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      setMessage('');
      setSelectedGroups([]);
    }, 3000);
    
    toast.success(`Message sent to ${totalRecipients} recipients!`);
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-scale-in">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
          <CheckCircle className="h-10 w-10 text-success" />
        </div>
        <h2 className="mt-6 font-display text-2xl font-bold text-foreground">
          Message Sent Successfully!
        </h2>
        <p className="mt-2 text-muted-foreground">
          Your message was delivered to {totalRecipients} recipients.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Main Form */}
      <div className="lg:col-span-2 space-y-6">
        {/* Group Selection */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="font-display text-lg font-semibold text-foreground">Select Recipients</h2>
          </div>
          
          <div className="grid gap-3 sm:grid-cols-2">
            {contactGroups.map((group) => (
              <label
                key={group.id}
                className={cn(
                  "flex cursor-pointer items-center gap-4 rounded-lg border-2 p-4 transition-all duration-200",
                  selectedGroups.includes(group.id)
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
              >
                <Checkbox
                  checked={selectedGroups.includes(group.id)}
                  onCheckedChange={() => toggleGroup(group.id)}
                />
                <span className="text-2xl">{group.icon}</span>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{group.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {group.memberCount} members
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Message Composer */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm animate-fade-in" style={{ animationDelay: '100ms' }}>
          <Label htmlFor="message" className="text-base font-semibold">
            Your Message
          </Label>
          <Textarea
            id="message"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-3 min-h-[200px] resize-none text-base"
          />
          <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
            <span>{message.length} characters</span>
            <span>{message.split(/\s+/).filter(Boolean).length} words</span>
          </div>
        </div>

        {/* Send Button */}
        <Button
          size="xl"
          variant="gradient"
          className="w-full"
          onClick={handleSend}
          disabled={isSending}
        >
          {isSending ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Sending to {totalRecipients} recipients...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Send Message to {totalRecipients} Recipients
            </>
          )}
        </Button>
      </div>

      {/* Templates Sidebar */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm h-fit animate-slide-in-right">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-primary" />
          <h2 className="font-display text-lg font-semibold text-foreground">Quick Templates</h2>
        </div>
        
        <div className="space-y-3">
          {messageTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => applyTemplate(template.content)}
              className="w-full rounded-lg border border-border p-3 text-left transition-all duration-200 hover:border-primary/50 hover:bg-secondary/50"
            >
              <p className="font-medium text-foreground">{template.name}</p>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {template.content}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
