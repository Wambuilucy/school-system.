import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Languages, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'ar', label: 'Arabic' },
  { code: 'zh', label: 'Mandarin' },
  { code: 'sw', label: 'Swahili' },
  { code: 'pt', label: 'Portuguese' },
  { code: 'hi', label: 'Hindi' },
  { code: 'tl', label: 'Tagalog' },
];

export default function Preferences() {
  const { user } = useAuth();
  const [lang, setLang] = useState('en');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('profiles').select('preferred_language').eq('id', user!.id).maybeSingle();
      if (data?.preferred_language) setLang(data.preferred_language);
    })();
  }, [user]);

  const save = async () => {
    setBusy(true);
    const { error } = await supabase.from('profiles').update({ preferred_language: lang }).eq('id', user!.id);
    setBusy(false);
    if (error) toast.error(error.message);
    else toast.success('Language preference saved');
  };

  return (
    <Layout title="Preferences" subtitle="Choose how you receive messages">
      <div className="max-w-xl rounded-xl border bg-card p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Languages className="h-5 w-5 text-primary" />
          <h2 className="font-display text-lg font-semibold">Preferred language</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Broadcast messages will be auto-translated into this language for you.
        </p>
        <div>
          <Label>Language</Label>
          <Select value={lang} onValueChange={setLang}>
            <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
            <SelectContent>
              {LANGS.map(l => <SelectItem key={l.code} value={l.code}>{l.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={save} disabled={busy} variant="gradient">
          <Save className="h-4 w-4" />{busy ? 'Saving…' : 'Save'}
        </Button>
      </div>
    </Layout>
  );
}
