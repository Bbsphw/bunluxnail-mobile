// services/serviceApi.ts

import { http } from '@/lib/http';
import type { ApiResult } from '@/types/api';
import type { ServiceItem } from '@/types/service';

export const serviceApi = {
  /**
   * GET /services
   * backend: SELECT id, service_name AS title, service_detail AS subtitle, picture, price FROM services
   * ต้องผ่าน verify_jwt_token → http ควรแนบ Authorization: Bearer <token> ให้เรียบร้อย
   */
  async list(): Promise<ApiResult<ServiceItem[]>> {
    return http.get<ServiceItem[]>('/services', 'GET');
  },
};
