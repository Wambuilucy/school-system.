import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Languages, Mail, Loader2, Siren } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Broadcast {
  id: string;
  body: string;
  language: string | null;
  is_emergency: boolean;
  created_at: string;
  sender_id: string;
}

export default function Inbox() {
  const { user } = useAuth();
  const [items, setItems] = useState<Broadcast[]>([]);
  const [translated, setTranslated] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [pref, setPref] = useState<string>('en');

  useEffect(() => {
    (async () => {
      const { data: prof } = await supabase
        .from('profiles')
        .select('preferred_language')
        .eq('id', user!.id)
        .maybeSingle();
      const lang = prof?.preferred_language || 'en';
      setPref(lang);

      const { data } = await supabase
        .from('broadcasts')
        .select('id, body, language, is_emergency, created_at, sender_id')
        .order('created_at', { ascending: false })
        .limit(50);
      const list = (data || []) as Broadcast[];
      setItems(list);

      // Auto-translate everything not already in user's language
      list.forEach(b => {
        const src = b.language || 'en';
        if (src.toLowerCase() !== lang.toLowerCase()) translate(b.id, lang);
      });

      // Mark as read
      list.forEach(async b => {
        await supabase.from('broadcast_receipts').upsert(
          { broadcast_id: b.id, user_id: user!.id },
          { onConflict: 'broadcast_id,user_id', ignoreDuplicates: true }
        );
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const translate = async (id: string, language: string) => {
    setLoading(s => ({ ...s, [id]: true }));
    try {
      const { data, error } = await supabase.functions.invoke('translate-broadcast', {
        body: { broadcast_id: id, language },
      });
      if (!error && (data as any)?.body) {
        setTranslated(t => ({ ...t, [id]: (data as any).body }));
      }
    } finally {
      setLoading(s => ({ ...s, [id]: false }));
    }
  };

  return (
    <Layout title="Inbox" subtitle={`Messages auto-translated to ${pref.toUpperCase()}`}>
      <div className="max-w-3xl space-y-4">
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground">No messages yet.</p>
        )}
        {items.map(b => {
          const showTranslated = translated[b.id] && (b.language || 'en') !== pref;
          return (
            <div key={b.id} className={cn(
              "rounded-xl border bg-card p-5 shadow-sm animate-fade-in",
              b.is_emergency && "border-destructive/50 bg-destructive/5"
            )}>
              <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                {b.is_emergency ? <Siren className="h-4 w-4 text-destructive animate-pulse" /> : <Mail className="h-4 w-4" />}
                <span>{new Date(b.created_at).toLocaleString()}</span>
                <span className="ml-auto uppercase">{b.language || 'en'} → {pref}</span>
              </div>
              <p className="whitespace-pre-wrap text-foreground">
                {loading[b.id] ? <Loader2 className="h-4 w-4 animate-spin inline" /> : (showTranslated ? translated[b.id] : b.body)}
              </p>
              {showTranslated && (
                <details className="mt-3 text-xs text-muted-foreground">
                  <summary className="cursor-pointer">View original</summary>
                  <p className="mt-2 whitespace-pre-wrap">{b.body}</p>
                </details>
              )}
              {!showTranslated && (b.language || 'en') !== pref && (
                <Button size="sm" variant="ghost" className="mt-2" onClick={() => translate(b.id, pref)}>
                  <Languages className="h-4 w-4" /> Translate
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
