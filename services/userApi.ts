// services/userApi.ts

import { http } from '@/lib/http';
import type { ApiResult } from '@/types/api';
import type { UserRow } from '@/types/user';

export type UpdateProfileDto = Partial<
  Pick<UserRow, 'first_name' | 'last_name' | 'phone' | 'gender' | 'picture_base64'>
> & { id: number };

export const userApi = {
  async list(): Promise<ApiResult<UserRow[]>> {
    return http.get<UserRow[]>('/users', 'GET');
  },
  async get(id: number): Promise<ApiResult<UserRow>> {
    return http.get<UserRow>(`/users/${id}`, 'GET');
  },
  async update(dto: UpdateProfileDto): Promise<ApiResult<{ message: string }>> {
    return http.put<{ message: string }>('/users', 'PUT', dto);
  },
};
