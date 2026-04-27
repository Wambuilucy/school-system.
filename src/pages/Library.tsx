import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { books, borrowRecords } from '@/data/libraryData';
import { Search, BookMarked, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function Library() {
  const [q, setQ] = useState('');
  const filtered = books.filter(b =>
    b.title.toLowerCase().includes(q.toLowerCase()) ||
    b.author.toLowerCase().includes(q.toLowerCase()) ||
    b.category.toLowerCase().includes(q.toLowerCase())
  );

  const overdue = borrowRecords.filter(r => !r.returned && new Date(r.dueDate) < new Date());

  return (
    <Layout title="Library" subtitle="Catalog, borrowing & due dates">
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Total Books</p><p className="text-3xl font-bold">{books.reduce((a, b) => a + b.copies, 0)}</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Currently Borrowed</p><p className="text-3xl font-bold text-primary">{borrowRecords.filter(r => !r.returned).length}</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-sm text-muted-foreground">Overdue</p><p className="text-3xl font-bold text-destructive">{overdue.length}</p></CardContent></Card>
      </div>

      <Tabs defaultValue="catalog">
        <TabsList>
          <TabsTrigger value="catalog">Catalog</TabsTrigger>
          <TabsTrigger value="borrowed">My Borrowed</TabsTrigger>
        </TabsList>

        <TabsContent value="catalog">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by title, author, category..." value={q} onChange={e => setQ(e.target.value)} className="pl-9" />
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map(b => (
              <Card key={b.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="text-5xl">{b.cover}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold leading-tight">{b.title}</h3>
                      <p className="text-xs text-muted-foreground">{b.author}</p>
                      <Badge variant="secondary" className="mt-1 text-xs">{b.category}</Badge>
                      <p className="text-xs text-muted-foreground mt-2">ISBN: {b.isbn}</p>
                      <div className="flex justify-between items-center mt-3">
                        <span className={`text-xs font-medium ${b.available > 0 ? 'text-success' : 'text-destructive'}`}>
                          {b.available > 0 ? `${b.available}/${b.copies} available` : 'All borrowed'}
                        </span>
                        <Button size="sm" variant={b.available > 0 ? 'default' : 'outline'} disabled={b.available === 0}
                          onClick={() => toast.success(`Borrowed "${b.title}"`)}>
                          {b.available > 0 ? 'Borrow' : 'Reserve'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="borrowed" className="space-y-2">
          {borrowRecords.map(r => {
            const isOverdue = !r.returned && new Date(r.dueDate) < new Date();
            return (
              <Card key={r.id}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <BookMarked className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{r.bookTitle}</p>
                      <p className="text-xs text-muted-foreground">{r.studentName} · Borrowed {r.borrowedAt}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={isOverdue ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}>
                      {isOverdue && <AlertCircle className="h-3 w-3 mr-1" />}
                      Due {r.dueDate}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
