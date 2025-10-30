// lib/utils.ts

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
export function assertNever(x: never, msg = 'Unexpected variant'): never {
  throw new Error(`${msg}: ${JSON.stringify(x)}`);
}
export function nonEmpty(v: string | null | undefined): v is string {
  return !!v && v.trim().length > 0;
}
