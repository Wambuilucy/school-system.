import { Layout } from '@/components/layout/Layout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { GroupCard } from '@/components/dashboard/GroupCard';
import { RecentMessages } from '@/components/dashboard/RecentMessages';
import { contactGroups, recentMessages } from '@/data/mockData';
import { Send, Users, CheckCircle, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  const totalMembers = contactGroups.reduce((acc, g) => acc + g.memberCount, 0);

  return (
    <Layout title="Dashboard" subtitle="Manage your broadcast messages">
      {/* Stats Grid */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Contacts"
          value={totalMembers}
          change="+12 this week"
          changeType="positive"
          icon={Users}
          iconColor="primary"
        />
        <StatsCard
          title="Messages Sent"
          value="1,247"
          change="+8.5% vs last month"
          changeType="positive"
          icon={Send}
          iconColor="accent"
        />
        <StatsCard
          title="Delivery Rate"
          value="98.5%"
          change="Above average"
          changeType="positive"
          icon={CheckCircle}
          iconColor="success"
        />
        <StatsCard
          title="Groups"
          value={contactGroups.length}
          change="Active groups"
          changeType="neutral"
          icon={TrendingUp}
          iconColor="warning"
        />
      </div>

      {/* Quick Action */}
      <div className="mb-8 rounded-xl gradient-primary p-8 shadow-lg animate-fade-in">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold text-primary-foreground">
              Ready to send a message?
            </h2>
            <p className="mt-1 text-primary-foreground/80">
              Reach your congregation, parents, or any group in seconds.
            </p>
          </div>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigate('/compose')}
            className="shadow-md"
          >
            <Send className="h-5 w-5" />
            Compose Message
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Groups */}
        <div className="lg:col-span-2">
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">
            Contact Groups
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {contactGroups.map((group, index) => (
              <div key={group.id} style={{ animationDelay: `${index * 100}ms` }}>
                <GroupCard group={group} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div>
          <RecentMessages messages={recentMessages} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
