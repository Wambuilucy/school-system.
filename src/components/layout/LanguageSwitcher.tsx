import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { useI18n, languages } from '@/contexts/I18nContext';

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  const current = languages.find(l => l.code === lang)!;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span>{current.flag} {current.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map(l => (
          <DropdownMenuItem key={l.code} onClick={() => setLang(l.code)} className={lang === l.code ? 'bg-secondary' : ''}>
            <span className="mr-2">{l.flag}</span>{l.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
