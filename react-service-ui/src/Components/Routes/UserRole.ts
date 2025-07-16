export const UserRole = {
  None: 0,
  Admin: 1,
  Teacher: 2,
  Student: 3,
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];  