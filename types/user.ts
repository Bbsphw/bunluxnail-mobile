// types/user.ts

export type Gender = 'male' | 'female';
export type Role = 'user' | 'owner' | 'customer' | 'technician' | 'admin';

export type UserRow = {
  id: number;
  username: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  gender?: Gender | null;
  role?: Role | null;
  birthday?: string | null;
  picture_base64?: string | null;
  created_at?: string | null;
};

export type PersonalDetailsDto = {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  gender: Gender;
  role: Extract<Role, 'user' | 'owner'>;
};

export type AuthTokenPayload = { id: number; exp: number };

// helpers
export function mapDobToBirthday(dob: string | null | undefined): string | null {
  if (!dob) return null;
  return dob; // หรือปรับเป็น ISO เต็มตาม backend
}
export function isOwner(role: Role | null | undefined): role is 'owner' {
  return role === 'owner';
}
export function isAdmin(role: Role | null | undefined): role is 'admin' {
  return role === 'admin';
}
