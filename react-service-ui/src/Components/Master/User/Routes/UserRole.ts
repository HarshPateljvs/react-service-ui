export const UserRole = {
  Admin: "Admin",
  Teacher: "Teacher",
  Student: "Student",
} as const;

export type UserRole = keyof typeof UserRole;