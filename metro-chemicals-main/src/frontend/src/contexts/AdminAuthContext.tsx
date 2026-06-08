import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const STORAGE_KEY = "metro-admin-token";

interface AdminAuthContextValue {
  isAuthenticated: boolean;
  token: string | null;
  login: (
    username: string,
    password: string,
  ) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(
  undefined,
);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const { actor } = useActor(createActor);
  const [token, setToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Validate stored token on mount
  useEffect(() => {
    if (!actor || !token) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    actor
      .isAdminAuthenticated(token)
      .then((valid) => {
        if (valid) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setToken(null);
          try {
            localStorage.removeItem(STORAGE_KEY);
          } catch {
            /* ignore */
          }
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
      })
      .finally(() => setIsLoading(false));
  }, [actor, token]);

  const login = useCallback(
    async (
      username: string,
      password: string,
    ): Promise<{ ok: boolean; error?: string }> => {
      if (!actor)
        return { ok: false, error: "Service unavailable. Please try again." };
      try {
        const result = await actor.adminLogin({ username, password });
        if (result.__kind__ === "ok") {
          const newToken = result.ok;
          setToken(newToken);
          setIsAuthenticated(true);
          try {
            localStorage.setItem(STORAGE_KEY, newToken);
          } catch {
            /* ignore */
          }
          return { ok: true };
        }
        return { ok: false, error: result.err || "Invalid credentials." };
      } catch {
        return { ok: false, error: "Login failed. Please try again." };
      }
    },
    [actor],
  );

  const logout = useCallback(async () => {
    if (actor && token) {
      try {
        await actor.adminLogout(token);
      } catch {
        /* ignore */
      }
    }
    setToken(null);
    setIsAuthenticated(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, [actor, token]);

  return (
    <AdminAuthContext.Provider
      value={{ isAuthenticated, token, login, logout, isLoading }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth(): AdminAuthContextValue {
  const ctx = useContext(AdminAuthContext);
  if (!ctx)
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
