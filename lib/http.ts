// lib/http.ts

import { ok, err, type ApiResult } from '@/types/api';
import { getToken } from '@/lib/secure-token';

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL!;
export const USE_MOCK = process.env.EXPO_PUBLIC_USE_MOCK === 'true';

type Method = 'GET' | 'POST' | 'PUT';
type RequestOpts = {
  headers?: Record<string, string>;
  timeoutMs?: number;
};

async function authHeader(): Promise<Record<string, string>> {
  const t = await getToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
}
function buildUrl(path: string): string {
  return `${BASE_URL?.replace(/\/+$/, '') ?? ''}${path.startsWith('/') ? '' : '/'}${path}`;
}
async function parseJsonSafe<T>(res: Response): Promise<T | null> {
  const ctype = res.headers.get('content-type') || '';
  if (res.status === 204 || !ctype.toLowerCase().includes('application/json')) return null;
  try {
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function request<T>(
  path: string,
  method: Method,
  body?: unknown,
  opts?: RequestOpts
): Promise<ApiResult<T>> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), opts?.timeoutMs ?? 20000);
  try {
    const res = await fetch(buildUrl(path), {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(await authHeader()),
        ...(opts?.headers ?? {}),
      },
      body: body != null ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
    if (!res.ok) return err(`HTTP ${res.status}`, res.status);
    const data = await parseJsonSafe<T>(res);
    return ok((data as T) ?? ({} as T));
  } catch (e) {
    const msg = (e as Error)?.name === 'AbortError' ? 'Request timeout' : (e as Error).message;
    return err(msg);
  } finally {
    clearTimeout(timer);
  }
}

async function requestForm<T>(
  path: string,
  form: FormData,
  method: Exclude<Method, 'GET'> = 'POST',
  opts?: RequestOpts
): Promise<ApiResult<T>> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), opts?.timeoutMs ?? 30000);
  try {
    const res = await fetch(buildUrl(path), {
      method,
      headers: {
        ...(await authHeader()), // อย่ากำหนด Content-Type เอง
        ...(opts?.headers ?? {}),
      },
      body: form,
      signal: controller.signal,
    });
    if (!res.ok) return err(`HTTP ${res.status}`, res.status);
    const data = await parseJsonSafe<T>(res);
    return ok((data as T) ?? ({} as T));
  } catch (e) {
    const msg = (e as Error)?.name === 'AbortError' ? 'Request timeout' : (e as Error).message;
    return err(msg);
  } finally {
    clearTimeout(timer);
  }
}

export const http = {
  get: request,
  post: request,
  put: request,
  postForm: requestForm,
  USE_MOCK,
};
