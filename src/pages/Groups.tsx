import { Layout } from '@/components/layout/Layout';
import { GroupCard } from '@/components/dashboard/GroupCard';
import { Button } from '@/components/ui/button';
import { contactGroups } from '@/data/mockData';
import { Plus } from 'lucide-react';

const Groups = () => {
  return (
    <Layout 
      title="Contact Groups" 
      subtitle="Manage your recipient groups"
    >
      <div className="mb-6 flex items-center justify-between">
        <p className="text-muted-foreground">
          {contactGroups.length} groups with {contactGroups.reduce((acc, g) => acc + g.memberCount, 0)} total contacts
        </p>
        <Button variant="gradient">
          <Plus className="h-4 w-4" />
          Create Group
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {contactGroups.map((group, index) => (
          <div 
            key={group.id} 
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <GroupCard group={group} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Groups;
