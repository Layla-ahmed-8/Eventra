import { UserRole } from '../../types';

export const roleHomePath: Record<UserRole, string> = {
  attendee: '/discover',
  organizer: '/organizer',
  admin: '/admin',
};

export function getRoleHomePath(role?: UserRole | null): string {
  if (!role) {
    return '/login';
  }

  return roleHomePath[role];
}
