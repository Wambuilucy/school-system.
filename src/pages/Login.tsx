import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Zap,
  GraduationCap,
  UserCheck,
  BookOpen,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Sparkles,
  MessageSquare,
  CalendarDays,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type SignupRole = 'teacher' | 'parent' | 'student';

const roles: {
  value: SignupRole;
  label: string;
  icon: typeof GraduationCap;
  desc: string;
  ring: string;
  iconBg: string;
}[] = [
  {
    value: 'teacher',
    label: 'Teacher',
    icon: GraduationCap,
    desc: 'Manage classes & broadcasts',
    ring: 'ring-primary border-primary bg-primary/5',
    iconBg: 'bg-primary/10 text-primary',
  },
  {
    value: 'parent',
    label: 'Parent',
    icon: UserCheck,
    desc: "Follow your child's journey",
    ring: 'ring-accent border-accent bg-accent/5',
    iconBg: 'bg-accent/10 text-accent',
  },
  {
    value: 'student',
    label: 'Student',
    icon: BookOpen,
    desc: 'Track your progress',
    ring: 'ring-warning border-warning bg-warning/5',
    iconBg: 'bg-warning/10 text-warning',
  },
];

const highlights = [
  { icon: MessageSquare, title: 'Instant broadcasts', desc: 'Reach every parent in one tap.' },
  { icon: CalendarDays, title: 'Stay in sync', desc: 'Events, exams & trips in one place.' },
  { icon: ShieldCheck, title: 'Private & secure', desc: 'Role-based access for every user.' },
];

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState<SignupRole>('teacher');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const result = isSignup
      ? await signup(name, email, password, role)
      : await login(email, password);
    setBusy(false);
    if (result.ok) {
      toast.success(isSignup ? 'Account created — welcome aboard!' : 'Welcome back!');
      navigate('/welcome');
    } else {
      toast.error(result.error ?? 'Authentication failed');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-warning/10 blur-3xl" />
      </div>

      <div className="mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 items-center gap-10 px-4 py-8 lg:grid-cols-2 lg:gap-16 lg:py-12">
        {/* Left — Brand storytelling */}
        <div className="hidden flex-col justify-center space-y-8 lg:flex animate-fade-in">
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-card/60 px-3 py-1.5 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-foreground">School communication, simplified</span>
          </div>
          <div>
            <h1 className="font-display text-5xl font-bold tracking-tight text-foreground">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                SchoolLink
              </span>
            </h1>
            <p className="mt-4 max-w-md text-base text-muted-foreground">
              The friendly hub that connects teachers, parents and students — broadcasts,
              attendance, grades and more, all in one place.
            </p>
          </div>

          <ul className="space-y-4">
            {highlights.map((h) => (
              <li key={h.title} className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card shadow-sm border border-border">
                  <h.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{h.title}</p>
                  <p className="text-sm text-muted-foreground">{h.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — Auth card */}
        <div className="mx-auto w-full max-w-md animate-scale-in">
          {/* Mobile logo */}
          <div className="mb-6 flex flex-col items-center gap-3 lg:hidden">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary shadow-glow">
              <Zap className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">SchoolLink</h1>
          </div>

          <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-xl backdrop-blur sm:p-8">
            {/* Tab switcher */}
            <div className="mb-6 grid grid-cols-2 gap-1 rounded-xl bg-secondary p-1">
              <button
                type="button"
                onClick={() => setIsSignup(false)}
                className={cn(
                  'rounded-lg py-2 text-sm font-semibold transition-all',
                  !isSignup
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => setIsSignup(true)}
                className={cn(
                  'rounded-lg py-2 text-sm font-semibold transition-all',
                  isSignup
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Create account
              </button>
            </div>

            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold text-foreground">
                {isSignup ? 'Join SchoolLink 👋' : 'Welcome back 👋'}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {isSignup
                  ? 'Pick your role and create your account in seconds.'
                  : 'Enter your details to access your dashboard.'}
              </p>
            </div>

            {isSignup && (
              <div className="mb-5">
                <Label className="mb-2 block text-sm font-medium">I am a…</Label>
                <div className="grid grid-cols-3 gap-2">
                  {roles.map((r) => {
                    const active = role === r.value;
                    return (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => setRole(r.value)}
                        className={cn(
                          'group flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 text-center transition-all duration-200',
                          active
                            ? `${r.ring} ring-2 ring-offset-2 ring-offset-card`
                            : 'border-border bg-background hover:border-muted-foreground/40 hover:-translate-y-0.5'
                        )}
                      >
                        <span
                          className={cn(
                            'flex h-9 w-9 items-center justify-center rounded-lg transition-colors',
                            active ? r.iconBg : 'bg-secondary text-muted-foreground'
                          )}
                        >
                          <r.icon className="h-4 w-4" />
                        </span>
                        <span className="text-xs font-semibold text-foreground">{r.label}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  {roles.find((r) => r.value === role)?.desc}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignup && (
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full name</Label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="pl-9"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@school.com"
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {!isSignup && (
                    <button
                      type="button"
                      onClick={() => toast.info('Ask your admin to reset your password.')}
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="px-9"
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="w-full"
                disabled={busy}
              >
                {busy ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Please wait…
                  </>
                ) : isSignup ? (
                  'Create my account'
                ) : (
                  'Sign in'
                )}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              {isSignup ? 'Already have an account? ' : "New to SchoolLink? "}
              <button
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                className="font-semibold text-primary hover:underline"
              >
                {isSignup ? 'Sign in instead' : 'Create one free'}
              </button>
            </p>
          </div>

          {isSignup && (
            <p className="mt-4 text-center text-xs text-muted-foreground">
              🔒 Admin accounts are assigned by an existing admin and can't be created here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
