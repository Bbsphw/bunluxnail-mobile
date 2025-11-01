// services/authApi.ts

import { http } from '@/lib/http';
import { setToken, clearToken } from '@/lib/secure-token';
import { ok, type ApiResult } from '@/types/api';
import type { UserRow, PersonalDetailsDto } from '@/types/user';

export type SignUpDto = { username: string; email: string; password: string };
export type LoginDto =
  | { username: string; password: string; email?: '' }
  | { email: string; password: string; username?: '' };

type AuthToken = { status: boolean; token: string };
type AuthLogin = { status: boolean; token?: string; message?: string };
type SimpleMsg = { message: string };
type SimpleStatus = { message: string; status: boolean };
type VerifyTokenRes = { valid: boolean; id: number; exp: number };

type RNFile = { uri: string; name: string; type: string };

export const authApi = {
  async signUp(body: SignUpDto): Promise<ApiResult<AuthToken>> {
    if (http.USE_MOCK) {
      await setToken('mock');
      return ok({ status: true, token: 'mock' });
    }
    const res = await http.post<AuthToken>('/signup', 'POST', body);
    if (res.ok) await setToken(res.data.token);
    return res;
  },

  async login(body: LoginDto): Promise<ApiResult<AuthLogin>> {
    const res = await http.post<AuthLogin>('/login', 'POST', body);
    if (res.ok && res.data.token) await setToken(res.data.token);
    return res;
  },

  async verifyToken(token?: string): Promise<ApiResult<VerifyTokenRes>> {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    return http.get<VerifyTokenRes>('/verify-token', 'GET', undefined, { headers });
  },

  async sendOtp(email: string): Promise<ApiResult<SimpleStatus>> {
    return http.post<SimpleStatus>('/send-otp', 'POST', { email });
  },

  async verifyOtp(email: string, otp: string): Promise<ApiResult<SimpleMsg>> {
    return http.post<SimpleMsg>('/verify-otp', 'POST', { email, otp });
  },

  async resetPasswordWithOtp(id: number, new_password: string): Promise<ApiResult<SimpleStatus>> {
    return http.put<SimpleStatus>('/reset-password/otp', 'PUT', { id, new_password });
  },

  async resetPasswordWithOld(
    id: number,
    old_password: string,
    new_password: string
  ): Promise<ApiResult<SimpleStatus>> {
    return http.put<SimpleStatus>('/reset-password', 'PUT', { id, old_password, new_password });
  },

  async profile(id: number): Promise<ApiResult<UserRow>> {
    return http.get<UserRow>(`/profile?id=${id}`, 'GET');
  },

  async updateUser(
    data: PersonalDetailsDto & { picture?: RNFile }
  ): Promise<ApiResult<SimpleMsg | { id: number; message: string }>> {
    const fd = new FormData();
    fd.append('id', String(data.id));
    fd.append('first_name', data.first_name);
    fd.append('last_name', data.last_name);
    fd.append('phone', data.phone);
    fd.append('gender', data.gender);
    fd.append('role', data.role);
    if (data.picture) {
      fd.append('picture', data.picture as unknown as Blob);
    }
    return http.postForm('/update_user', fd, 'POST');
  },

  async logout(): Promise<void> {
    await clearToken();
  },
};
