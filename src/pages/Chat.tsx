import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { conversations as initial } from '@/data/chatData';
import { Send, Search, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Chat() {
  const [convos, setConvos] = useState(initial);
  const [activeId, setActiveId] = useState(convos[0].id);
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');

  const active = convos.find(c => c.id === activeId)!;
  const filtered = convos.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const send = () => {
    if (!text.trim()) return;
    const newMsg = { id: `m${Date.now()}`, senderId: 'me', senderName: 'You', text: text.trim(), timestamp: 'Just now' };
    setConvos(convos.map(c => c.id === activeId ? { ...c, messages: [...c.messages, newMsg], lastMessage: newMsg.text, lastTime: 'Just now' } : c));
    setText('');
  };

  return (
    <Layout title="Messages" subtitle="Direct conversations with teachers and parents">
      <div className="grid grid-cols-12 gap-4 h-[calc(100vh-200px)]">
        <Card className="col-span-4 flex flex-col overflow-hidden">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search conversations..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filtered.map(c => (
              <button key={c.id} onClick={() => setActiveId(c.id)}
                className={cn('w-full text-left p-3 border-b border-border hover:bg-secondary transition-colors flex gap-3',
                  activeId === c.id && 'bg-secondary')}>
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">{c.avatar}</div>
                  {c.online && <Circle className="absolute -bottom-0.5 -right-0.5 h-3 w-3 fill-success text-success" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <p className="font-medium text-sm truncate">{c.name}</p>
                    <span className="text-xs text-muted-foreground shrink-0 ml-2">{c.lastTime}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{c.lastMessage}</p>
                </div>
                {c.unread > 0 && <Badge className="h-5 min-w-5 px-1.5 text-xs">{c.unread}</Badge>}
              </button>
            ))}
          </div>
        </Card>

        <Card className="col-span-8 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">{active.avatar}</div>
            <div>
              <p className="font-semibold">{active.name}</p>
              <p className="text-xs text-muted-foreground">{active.role}{active.online && ' · Online'}</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {active.messages.map(m => {
              const isMe = m.senderId === 'me' || m.senderName === 'You';
              return (
                <div key={m.id} className={cn('flex', isMe ? 'justify-end' : 'justify-start')}>
                  <div className={cn('max-w-[70%] rounded-2xl px-4 py-2',
                    isMe ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground')}>
                    {!isMe && <p className="text-xs font-semibold mb-0.5 opacity-80">{m.senderName}</p>}
                    <p className="text-sm">{m.text}</p>
                    <p className={cn('text-xs mt-1', isMe ? 'opacity-70' : 'text-muted-foreground')}>{m.timestamp}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="p-3 border-t border-border flex gap-2">
            <Input placeholder="Type a message..." value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} />
            <Button onClick={send} size="icon"><Send className="h-4 w-4" /></Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
