import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Save, Bell, Mail, MessageSquare, Shield } from 'lucide-react';
import { toast } from 'sonner';

const Settings = () => {
  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <Layout 
      title="Settings" 
      subtitle="Configure your messaging preferences"
    >
      <div className="max-w-2xl space-y-8">
        {/* Notification Settings */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">Notifications</h2>
              <p className="text-sm text-muted-foreground">Manage your notification preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Email notifications</p>
                <p className="text-sm text-muted-foreground">Receive email for sent message confirmations</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Failed message alerts</p>
                <p className="text-sm text-muted-foreground">Get notified when a message fails to send</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* Messaging Settings */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <MessageSquare className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">Messaging</h2>
              <p className="text-sm text-muted-foreground">Configure message delivery options</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="sender-name">Sender Name</Label>
              <Input id="sender-name" placeholder="Your Organization" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="reply-email">Reply-to Email</Label>
              <Input id="reply-email" type="email" placeholder="reply@example.com" className="mt-1.5" />
            </div>
          </div>
        </div>

        {/* API Settings */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
              <Shield className="h-5 w-5 text-success" />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">API Integration</h2>
              <p className="text-sm text-muted-foreground">Connect messaging services</p>
            </div>
          </div>

          <div className="rounded-lg bg-secondary/50 p-4">
            <p className="text-sm text-muted-foreground">
              To enable actual SMS/Email sending, connect Lovable Cloud and configure your preferred messaging service (Twilio, Resend, etc.).
            </p>
            <Button variant="outline" className="mt-3">
              <Mail className="h-4 w-4" />
              Connect Service
            </Button>
          </div>
        </div>

        <Button size="lg" variant="gradient" onClick={handleSave}>
          <Save className="h-5 w-5" />
          Save Settings
        </Button>
      </div>
    </Layout>
  );
};

export default Settings;
