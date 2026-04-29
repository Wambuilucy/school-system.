import type { UserRole } from '@/contexts/AuthContext';

/**
 * Centralized role-based access control for SchoolLink.
 * - `routes`: which roles can visit a given path
 * - `can(action, role)`: whether a role may perform an action
 */

export const routePermissions: Record<string, UserRole[]> = {
  // Shared
  '/welcome': ['teacher', 'parent', 'student'],
  '/notifications': ['teacher', 'parent', 'student'],
  '/events': ['teacher', 'parent', 'student'],
  '/finance': ['teacher', 'parent', 'student'],
  '/transcript': ['teacher', 'parent', 'student'],
  '/trips': ['teacher', 'parent', 'student'],
  '/cocurricular': ['teacher', 'parent', 'student'],
  '/suggestions': ['teacher', 'parent', 'student'],
  '/learning': ['teacher', 'parent', 'student'],
  '/attendance': ['teacher', 'parent', 'student'],
  '/assignments': ['teacher', 'parent', 'student'],
  '/timetable': ['teacher', 'parent', 'student'],
  '/chat': ['teacher', 'parent', 'student'],
  '/exams': ['teacher', 'parent', 'student'],
  '/library': ['teacher', 'parent', 'student'],
  '/behavior': ['teacher', 'parent', 'student'],
  '/health': ['teacher', 'parent', 'student'],

  // Teacher-only
  '/': ['teacher'],
  '/teacher': ['teacher'],
  '/students': ['teacher'],
  '/compose': ['teacher'],
  '/groups': ['teacher'],
  '/templates': ['teacher'],
  '/history': ['teacher'],
  '/settings': ['teacher'],
  '/analytics': ['teacher'],
  '/admin/users': ['admin'],

  // Teacher + Parent
  '/teacher-directory': ['teacher', 'parent'],

  // Parent-only
  '/parent': ['parent'],

  // Student-only
  '/student-portal': ['student'],
};

export type Action =
  // Learning Hub
  | 'learning.editContent'
  | 'learning.markProgress'
  // Assignments
  | 'assignments.create'
  | 'assignments.grade'
  | 'assignments.submit'
  // Attendance
  | 'attendance.mark'
  | 'attendance.view'
  // Exams
  | 'exams.create'
  | 'exams.publishResults'
  // Behavior
  | 'behavior.addRecord'
  // Health
  | 'health.editRecord'
  // Library
  | 'library.manageBooks'
  | 'library.borrow'
  // Messaging / Comms
  | 'messaging.broadcast'
  | 'messaging.manageGroups'
  | 'messaging.manageTemplates'
  | 'messaging.viewHistory'
  // Admin
  | 'admin.viewAnalytics'
  | 'admin.editSettings'
  | 'admin.viewAllStudents'
  // Suggestions
  | 'suggestions.respond'
  | 'suggestions.submit'
  // Chat
  | 'chat.contactStaff'
  | 'chat.contactParents';

const policy: Record<Action, UserRole[]> = {
  'learning.editContent': ['teacher'],
  'learning.markProgress': ['teacher', 'student'],

  'assignments.create': ['teacher'],
  'assignments.grade': ['teacher'],
  'assignments.submit': ['student'],

  'attendance.mark': ['teacher'],
  'attendance.view': ['teacher', 'parent', 'student'],

  'exams.create': ['teacher'],
  'exams.publishResults': ['teacher'],

  'behavior.addRecord': ['teacher'],
  'health.editRecord': ['teacher'],

  'library.manageBooks': ['teacher'],
  'library.borrow': ['teacher', 'student'],

  'messaging.broadcast': ['teacher'],
  'messaging.manageGroups': ['teacher'],
  'messaging.manageTemplates': ['teacher'],
  'messaging.viewHistory': ['teacher'],

  'admin.viewAnalytics': ['teacher'],
  'admin.editSettings': ['teacher'],
  'admin.viewAllStudents': ['teacher'],

  'suggestions.respond': ['teacher'],
  'suggestions.submit': ['parent', 'student', 'teacher'],

  'chat.contactStaff': ['parent', 'student', 'teacher'],
  'chat.contactParents': ['teacher'],
};

export function can(action: Action, role: UserRole | undefined | null): boolean {
  if (!role) return false;
  return policy[action]?.includes(role) ?? false;
}

export function canAccessRoute(path: string, role: UserRole | undefined | null): boolean {
  if (!role) return false;
  const allowed = routePermissions[path];
  if (!allowed) return true; // unknown routes fall through to NotFound
  return allowed.includes(role);
}

/**
 * Default landing path for a role (used for redirects after login or
 * when a user lands on a route they can't access).
 */
export function defaultPathFor(role: UserRole | undefined | null): string {
  switch (role) {
    case 'admin': return '/admin/users';
    case 'teacher': return '/';
    case 'parent': return '/parent';
    case 'student': return '/student-portal';
    default: return '/login';
  }
}
