import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { messageTemplates } from '@/data/mockData';
import { Plus, FileText, Copy, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const Templates = () => {
  const copyTemplate = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Template copied to clipboard');
  };

  return (
    <Layout 
      title="Message Templates" 
      subtitle="Save time with pre-written messages"
    >
      <div className="mb-6 flex items-center justify-between">
        <p className="text-muted-foreground">
          {messageTemplates.length} templates available
        </p>
        <Button variant="gradient">
          <Plus className="h-4 w-4" />
          Create Template
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {messageTemplates.map((template, index) => (
          <div 
            key={template.id}
            className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <span className="rounded-full bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                {template.category}
              </span>
            </div>

            <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
              {template.name}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
              {template.content}
            </p>

            <div className="mt-4 flex gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <Button 
                size="sm" 
                variant="secondary" 
                onClick={() => copyTemplate(template.content)}
              >
                <Copy className="h-4 w-4" />
                Copy
              </Button>
              <Button size="sm" variant="ghost">
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Templates;
