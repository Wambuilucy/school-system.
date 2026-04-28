import { useAuth } from '@/contexts/AuthContext';
import { can as canDo, type Action } from '@/lib/permissions';

export function usePermissions() {
  const { user } = useAuth();
  const role = user?.role;
  return {
    role,
    can: (action: Action) => canDo(action, role),
    isTeacher: role === 'teacher',
    isParent: role === 'parent',
    isStudent: role === 'student',
  };
}
