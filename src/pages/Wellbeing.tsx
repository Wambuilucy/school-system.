import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { HeartPulse, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const MOODS = ['😢', '😕', '😐', '🙂', '😄'];
const ENERGY = ['🪫', '🔋', '🔋🔋', '🔋🔋🔋', '⚡'];

export default function Wellbeing() {
  const { user } = useAuth();
  const isStaff = user?.role === 'teacher' || user?.role === 'parent';
  const [mood, setMood] = useState<number | null>(null);
  const [energy, setEnergy] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [recent, setRecent] = useState<any[]>([]);

  const load = async () => {
    const { data } = await supabase
      .from('wellbeing_checkins')
      .select('id, mood, energy, note, created_at, user_id')
      .order('created_at', { ascending: false })
      .limit(50);
    setRecent(data || []);
  };

  useEffect(() => { load(); }, []);

  const submit = async () => {
    if (mood === null || energy === null) return toast.error('Pick a mood and energy');
    setBusy(true);
    const { error } = await supabase.from('wellbeing_checkins').insert({
      user_id: user!.id, mood: mood + 1, energy: energy + 1, note: note || null,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success('Check-in saved 💙');
    setMood(null); setEnergy(null); setNote('');
    load();
  };

  const avg = recent.length
    ? (recent.reduce((s, r) => s + r.mood, 0) / recent.length).toFixed(1)
    : '—';

  return (
    <Layout title="Wellbeing Pulse" subtitle="Daily check-ins to track how everyone is feeling">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border bg-card p-6 shadow-sm animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <HeartPulse className="h-5 w-5 text-primary" />
              <h2 className="font-display text-lg font-semibold">How are you today?</h2>
            </div>

            <p className="text-sm text-muted-foreground mb-2">Mood</p>
            <div className="flex gap-2 mb-5">
              {MOODS.map((m, i) => (
                <button key={i} onClick={() => setMood(i)}
                  className={cn(
                    'flex-1 rounded-lg border-2 p-4 text-3xl transition-all',
                    mood === i ? 'border-primary bg-primary/10 scale-105' : 'border-border hover:border-primary/50'
                  )}>
                  {m}
                </button>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mb-2">Energy</p>
            <div className="flex gap-2 mb-5">
              {ENERGY.map((e, i) => (
                <button key={i} onClick={() => setEnergy(i)}
                  className={cn(
                    'flex-1 rounded-lg border-2 p-3 text-xl transition-all',
                    energy === i ? 'border-primary bg-primary/10 scale-105' : 'border-border hover:border-primary/50'
                  )}>
                  {e}
                </button>
              ))}
            </div>

            <Textarea
              placeholder="Anything you'd like to share? (optional, private)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mb-4"
            />

            <Button onClick={submit} disabled={busy} variant="gradient" size="lg" className="w-full">
              {busy ? 'Saving…' : 'Submit check-in'}
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-display font-semibold">{isStaff ? 'Class pulse' : 'Your trend'}</h3>
            </div>
            <p className="text-3xl font-display font-bold">{avg}<span className="text-base text-muted-foreground">/5</span></p>
            <p className="text-sm text-muted-foreground">Avg mood ({recent.length} check-ins)</p>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="font-display font-semibold mb-3">Recent</h3>
            <div className="space-y-2 max-h-80 overflow-auto">
              {recent.slice(0, 10).map(r => (
                <div key={r.id} className="flex items-center gap-3 text-sm border-b pb-2 last:border-0">
                  <span className="text-2xl">{MOODS[r.mood - 1]}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</p>
                    {r.note && <p className="truncate">{r.note}</p>}
                  </div>
                </div>
              ))}
              {recent.length === 0 && <p className="text-sm text-muted-foreground">No check-ins yet.</p>}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
