import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Zap, GraduationCap, UserCheck, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const roles: { value: UserRole; label: string; icon: typeof GraduationCap; desc: string; color: string }[] = [
  { value: 'teacher', label: 'Teacher', icon: GraduationCap, desc: 'Full admin access', color: 'border-primary bg-primary/5' },
  { value: 'parent', label: 'Parent', icon: UserCheck, desc: "View your child's progress", color: 'border-accent bg-accent/5' },
  { value: 'student', label: 'Student', icon: BookOpen, desc: 'View your results', color: 'border-warning bg-warning/5' },
];

const demoCredentials: Record<UserRole, { email: string; password: string }> = {
  teacher: { email: 'teacher@school.com', password: 'teacher123' },
  parent: { email: 'parent@school.com', password: 'parent123' },
  student: { email: 'student@school.com', password: 'student123' },
};

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState<UserRole>('teacher');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = isSignup ? signup(name, email, password, role) : login(email, password, role);
    if (success) {
      toast.success(`Welcome${isSignup ? '' : ' back'}!`);
      navigate('/welcome');
    } else {
      toast.error('Invalid credentials');
    }
  };

  const fillDemo = () => {
    const creds = demoCredentials[role];
    setEmail(creds.email);
    setPassword(creds.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary shadow-glow">
            <Zap className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">SchoolLink</h1>
          <p className="text-sm text-muted-foreground">{isSignup ? 'Create your account' : 'Sign in to continue'}</p>
        </div>

        {/* Role selector */}
        <div className="grid grid-cols-3 gap-3">
          {roles.map(r => (
            <button
              key={r.value}
              onClick={() => { setRole(r.value); setEmail(''); setPassword(''); }}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 transition-all",
                role === r.value ? r.color : "border-border bg-card hover:border-muted-foreground/30"
              )}
            >
              <r.icon className="h-5 w-5" />
              <span className="text-xs font-semibold">{r.label}</span>
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border bg-card p-6">
          {isSignup && (
            <div>
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <Input value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" className="mt-1" required />
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@school.com" className="mt-1" required />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Password</label>
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="mt-1" required />
          </div>
          <Button type="submit" className="w-full">{isSignup ? 'Create Account' : 'Sign In'}</Button>

          <div className="flex items-center justify-between text-xs">
            <button type="button" onClick={() => setIsSignup(!isSignup)} className="text-primary hover:underline">
              {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
            {!isSignup && (
              <button type="button" onClick={fillDemo} className="text-muted-foreground hover:text-foreground">
                Use demo credentials
              </button>
            )}
          </div>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          Demo: teacher@school.com / parent@school.com / student@school.com (any password)
        </p>
      </div>
    </div>
  );
}
