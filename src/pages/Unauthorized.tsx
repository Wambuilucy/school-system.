import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { defaultPathFor } from '@/lib/permissions';

export default function Unauthorized() {
  const { user } = useAuth();
  const home = defaultPathFor(user?.role);

  return (
    <Layout title="Access restricted">
      <div className="flex flex-col items-center justify-center text-center py-20">
        <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
          <ShieldAlert className="h-8 w-8 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Access restricted</h1>
        <p className="text-muted-foreground mb-6 max-w-md">
          Your {user?.role ?? 'current'} account doesn't have permission to view this page.
        </p>
        <Button asChild>
          <Link to={home}>Go to your dashboard</Link>
        </Button>
      </div>
    </Layout>
  );
}
