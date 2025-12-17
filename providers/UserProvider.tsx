"use client";

import type { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createClient } from "@/lib/supabase/client"; // your Supabase client

interface UserContextValue {
  user: User | null;
  loading: boolean;
  lang: string;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

interface UserProviderProps {
  children: ReactNode;
  initialUser?: User | null; // Accept server-provided user
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({
  children,
  initialUser = null,
}: UserProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [loading, setLoading] = useState(!initialUser);
  const [lang, setLang] = useState<string>("en"); // default to "en"

  const supabase = createClient();

  const fetchUser = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.getUser();
    if (!error && data.user) {
      setUser(data.user);
      // Read language from user metadata if exists
      setLang((data.user.user_metadata?.lang as string) || "en");
    } else {
      setUser(null);
      setLang("en");
    }
    setLoading(false);
  }, [supabase.auth]);

  const logout = useCallback(
    async (redirectLang: string = lang) => {
      setLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      setLoading(false);
      redirect(`/${redirectLang}/login`);
    },
    [supabase.auth, lang],
  );

  useEffect(() => {
    if (!initialUser) fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchUser();
    });

    return () => listener.subscription.unsubscribe();
  }, [fetchUser, supabase, initialUser]);

  return (
    <UserContext.Provider
      value={{ user, loading, lang, refreshUser: fetchUser, logout }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Updated hook
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
