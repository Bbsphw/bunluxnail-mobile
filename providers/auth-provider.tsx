// providers/auth-provider.tsx

import * as React from 'react';
import { authApi } from '@/services/authApi';
import { getToken, setToken, clearToken } from '@/lib/secure-token';
import type { UserRow } from '@/types/user';

type AuthState = {
  user: UserRow | null;
  token: string | null;
  loading: boolean;
};

type AuthContextValue = AuthState & {
  isAuthenticated: boolean;
  login: (account: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<boolean>;
  setUser: (user: UserRow | null) => void;
};

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<AuthState>({ user: null, token: null, loading: true });
  const mountedRef = React.useRef(true);

  React.useEffect(() => {
    mountedRef.current = true;
    (async () => {
      try {
        const token = await getToken();
        if (!token) {
          if (mountedRef.current) setState({ user: null, token: null, loading: false });
          return;
        }
        const verify = await authApi.verifyToken(token);
        if (!verify.ok || !verify.data.valid || !verify.data.id) {
          await clearToken();
          if (mountedRef.current) setState({ user: null, token: null, loading: false });
          return;
        }
        const prof = await authApi.profile(verify.data.id);
        if (mountedRef.current) {
          setState({ user: prof.ok ? (prof.data as UserRow) : null, token, loading: false });
        }
      } catch {
        await clearToken();
        if (mountedRef.current) setState({ user: null, token: null, loading: false });
      }
    })();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const login = React.useCallback(async (account: string, password: string) => {
    try {
      const isEmail = /\S+@\S+\.\S+/.test(account);
      const res = await authApi.login(
        isEmail ? { email: account, password } : { username: account, password }
      );
      if (!res.ok || !res.data.status || !res.data.token) return false;

      const newToken = res.data.token as string;
      await setToken(newToken);

      const verify = await authApi.verifyToken(newToken);
      let nextUser: UserRow | null = null;
      if (verify.ok && verify.data.valid && verify.data.id) {
        const prof = await authApi.profile(verify.data.id);
        nextUser = prof.ok ? (prof.data as UserRow) : null;
      }
      if (mountedRef.current) setState({ user: nextUser, token: newToken, loading: false });
      return true;
    } catch {
      return false;
    }
  }, []);

  const logout = React.useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      await clearToken();
      if (mountedRef.current) setState({ user: null, token: null, loading: false });
    }
  }, []);

  const refreshProfile = React.useCallback(async () => {
    if (!state.token || !state.user?.id) return false;
    try {
      const res = await authApi.profile(state.user.id);
      if (res.ok && mountedRef.current) {
        setState((s) => ({ ...s, user: res.data as UserRow }));
        return true;
      }
    } catch {
      /* noop */
    }
    return false;
  }, [state.token, state.user?.id]);

  const setUser = React.useCallback((user: UserRow | null) => {
    setState((s) => ({ ...s, user }));
  }, []);

  const value = React.useMemo<AuthContextValue>(
    () => ({
      ...state,
      isAuthenticated: !!state.token && !!state.user,
      login,
      logout,
      refreshProfile,
      setUser,
    }),
    [state, login, logout, refreshProfile, setUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
