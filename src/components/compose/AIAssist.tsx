import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Languages, Gauge, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Props {
  message: string;
  onMessage: (text: string) => void;
}

const LANGS = ['Spanish', 'French', 'Arabic', 'Mandarin', 'Swahili', 'Portuguese', 'Hindi', 'Tagalog'];

export function AIAssist({ message, onMessage }: Props) {
  const [topic, setTopic] = useState('');
  const [lang, setLang] = useState('Spanish');
  const [busy, setBusy] = useState<string | null>(null);
  const [tone, setTone] = useState<{ tone: string; clarity: number; issues: string[]; suggestion: string } | null>(null);

  const call = async (mode: 'draft' | 'translate' | 'tone') => {
    setBusy(mode);
    setTone(null);
    try {
      const payload =
        mode === 'draft' ? { mode, prompt: topic, audience: 'parents' }
        : mode === 'translate' ? { mode, text: message, language: lang }
        : { mode, text: message };

      const { data, error } = await supabase.functions.invoke('ai-compose', { body: payload });
      if (error) throw error;
      if ((data as any).error) throw new Error((data as any).error);

      if (mode === 'tone') {
        setTone(data as any);
      } else {
        onMessage((data as any).text);
        toast.success(mode === 'draft' ? 'Draft generated' : `Translated to ${lang}`);
      }
    } catch (e: any) {
      toast.error(e.message || 'AI request failed');
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="rounded-xl border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-5 space-y-4 animate-fade-in">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="font-display font-semibold text-foreground">AI Assistant</h3>
        <span className="ml-auto text-xs text-muted-foreground">Powered by Lovable AI</span>
      </div>

      {/* Smart compose */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Smart Compose</label>
        <div className="flex gap-2">
          <Input
            placeholder="e.g. field trip Friday to the museum, 9am, $5"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <Button onClick={() => call('draft')} disabled={busy !== null || !topic.trim()} size="sm">
            {busy === 'draft' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            Draft
          </Button>
        </div>
      </div>

      {/* Translate */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Auto-Translate</label>
        <div className="flex gap-2">
          <Select value={lang} onValueChange={setLang}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              {LANGS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button onClick={() => call('translate')} disabled={busy !== null || !message.trim()} size="sm" variant="outline" className="flex-1">
            {busy === 'translate' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Languages className="h-4 w-4" />}
            Translate current message
          </Button>
        </div>
      </div>

      {/* Tone check */}
      <div className="space-y-2">
        <Button onClick={() => call('tone')} disabled={busy !== null || !message.trim()} size="sm" variant="outline" className="w-full">
          {busy === 'tone' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Gauge className="h-4 w-4" />}
          Check tone & clarity
        </Button>
        {tone && (
          <div className="rounded-lg border bg-card p-3 text-sm space-y-2">
            <div className="flex gap-3 text-xs">
              <span className="font-medium">Tone: <span className="text-primary">{tone.tone}</span></span>
              <span className="font-medium">Clarity: {tone.clarity}/5</span>
            </div>
            {tone.issues?.length > 0 && (
              <ul className="list-disc pl-4 text-muted-foreground text-xs space-y-0.5">
                {tone.issues.map((i, k) => <li key={k}>{i}</li>)}
              </ul>
            )}
            {tone.suggestion && (
              <Button variant="ghost" size="sm" className="w-full" onClick={() => { onMessage(tone.suggestion); setTone(null); }}>
                Use suggested rewrite
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
