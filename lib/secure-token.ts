// lib/secure-token.ts

import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth.token.v1';
let cache: string | null = null;

export async function getToken(): Promise<string | null> {
  if (cache !== null) return cache;
  const t = await SecureStore.getItemAsync(TOKEN_KEY);
  cache = t ?? null;
  return cache;
}
export async function setToken(token: string | null): Promise<void> {
  cache = token;
  if (token) await SecureStore.setItemAsync(TOKEN_KEY, token);
  else await SecureStore.deleteItemAsync(TOKEN_KEY);
}
export async function clearToken(): Promise<void> {
  cache = null;
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}
