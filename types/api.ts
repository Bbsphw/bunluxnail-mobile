// types/api.ts

export type ApiOk<T> = { ok: true; data: T };
export type ApiErr = { ok: false; error: { message: string; status?: number } };
export type ApiResult<T> = ApiOk<T> | ApiErr;

export function ok<T>(data: T): ApiOk<T> {
  return { ok: true, data };
}
export function err(message: string, status?: number): ApiErr {
  return { ok: false, error: { message, status } };
}

export function isOk<T>(r: ApiResult<T>): r is ApiOk<T> {
  return r.ok;
}
export function isErr<T>(r: ApiResult<T>): r is ApiErr {
  return !r.ok;
}
export function unwrap<T>(r: ApiResult<T>): T {
  if (!r.ok) throw new Error(r.error.message);
  return r.data;
}
