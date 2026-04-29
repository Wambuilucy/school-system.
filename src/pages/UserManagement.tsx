import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import { useAuth, type UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { ShieldCheck, Loader2 } from 'lucide-react';

type Row = {
  id: string;
  display_name: string | null;
  email: string | null;
  roles: UserRole[];
};

const ASSIGNABLE: Exclude<UserRole, 'admin'>[] = ['teacher', 'parent', 'student'];

export default function UserManagement() {
  const { user } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [busy, setBusy] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const [{ data: profiles, error: pErr }, { data: roles, error: rErr }] = await Promise.all([
      supabase.from('profiles').select('id, display_name, email').order('display_name'),
      supabase.from('user_roles').select('user_id, role'),
    ]);
    if (pErr || rErr) {
      toast.error('Failed to load users');
      setLoading(false);
      return;
    }
    const byUser = new Map<string, UserRole[]>();
    (roles ?? []).forEach((r: any) => {
      const arr = byUser.get(r.user_id) ?? [];
      arr.push(r.role);
      byUser.set(r.user_id, arr);
    });
    setRows(
      (profiles ?? []).map((p: any) => ({
        id: p.id,
        display_name: p.display_name,
        email: p.email,
        roles: byUser.get(p.id) ?? [],
      }))
    );
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const toggleRole = async (userId: string, role: UserRole, hasRole: boolean) => {
    if (userId === user?.id && role === 'admin') {
      toast.error("You can't change your own admin role");
      return;
    }
    setBusy(`${userId}:${role}`);
    if (hasRole) {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', role);
      if (error) toast.error(error.message);
      else toast.success(`Revoked ${role}`);
    } else {
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role });
      if (error) toast.error(error.message);
      else toast.success(`Granted ${role}`);
    }
    setBusy(null);
    await load();
  };

  const q = search.trim().toLowerCase();
  const filtered = rows.filter(r =>
    !q ||
    r.display_name?.toLowerCase().includes(q) ||
    r.email?.toLowerCase().includes(q) ||
    r.id.toLowerCase().includes(q)
  );

  return (
    <Layout title="User Management">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary shadow-glow">
            <ShieldCheck className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold">User Management</h1>
            <p className="text-sm text-muted-foreground">Assign or revoke roles. Admin-only.</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All users</CardTitle>
            <Input
              placeholder="Search by name, email, or id…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm mt-2"
            />
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading…
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-muted-foreground border-b border-border">
                      <th className="py-2 pr-4">User</th>
                      <th className="py-2 pr-4">Current roles</th>
                      {ASSIGNABLE.map(r => (
                        <th key={r} className="py-2 pr-4 capitalize">{r}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(row => (
                      <tr key={row.id} className="border-b border-border/50">
                        <td className="py-3 pr-4">
                          <div className="font-medium">{row.display_name ?? '—'}</div>
                          <div className="text-xs text-muted-foreground">{row.email ?? '—'}</div>
                          <div className="text-xs text-muted-foreground font-mono">{row.id.slice(0, 8)}…</div>
                        </td>
                        <td className="py-3 pr-4">
                          <div className="flex flex-wrap gap-1">
                            {row.roles.length === 0 && <span className="text-muted-foreground">none</span>}
                            {row.roles.map(r => (
                              <Badge key={r} variant={r === 'admin' ? 'default' : 'secondary'} className="capitalize">
                                {r}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        {ASSIGNABLE.map(r => {
                          const has = row.roles.includes(r);
                          const key = `${row.id}:${r}`;
                          return (
                            <td key={r} className="py-3 pr-4">
                              <Checkbox
                                checked={has}
                                disabled={busy === key}
                                onCheckedChange={() => toggleRole(row.id, r, has)}
                              />
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr><td colSpan={2 + ASSIGNABLE.length} className="py-6 text-center text-muted-foreground">No users found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-4">
              Admin role can only be granted via the database for safety. All changes are enforced server-side.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
