"use client";

import type { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createClient } from "@/lib/supabase/client";
import type { UserProfile } from "@/schemas/profile.schema";

/** ---- Types ---- */

interface UserContextValue {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  lang: string;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

interface UserProviderProps {
  children: ReactNode;
  initialUser?: User | null;
  initialProfile?: UserProfile | null;
}

/** ---- Context ---- */

const UserContext = createContext<UserContextValue | undefined>(undefined);

/** ---- Provider ---- */

export function UserProvider({
  children,
  initialUser = null,
  initialProfile = null,
}: UserProviderProps) {
  const supabase = useMemo(() => createClient(), []);

  const [user, setUser] = useState<User | null>(initialUser);
  const [profile, setProfile] = useState<UserProfile | null>(initialProfile);
  const [loading, setLoading] = useState(!initialUser);
  const [lang, setLang] = useState<string>(
    initialProfile?.preferredLang ||
      (initialUser?.user_metadata?.preferred_lang as string) ||
      "en",
  );

  /** ---- Load profile from DB ---- */
  const fetchProfile = useCallback(
    async (userId: string) => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (!error && data) {
        setProfile(data as UserProfile);
        setLang(data.lang || "en");
      } else {
        setProfile(null);
      }
    },
    [supabase],
  );

  /** ---- Load auth user + profile ---- */
  const fetchUser = useCallback(async () => {
    setLoading(true);

    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      setUser(null);
      setProfile(null);
      setLang("en");
      setLoading(false);
      return;
    }

    setUser(data.user);

    // Prefer profile lang, fallback to metadata
    setLang(
      (data.user.user_metadata?.preferred_lang as string | undefined) || "en",
    );

    await fetchProfile(data.user.id);

    setLoading(false);
  }, [supabase, fetchProfile]);

  /** ---- Logout ---- */
  const logout = useCallback(async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setLoading(false);
    redirect(`/${lang}/login`);
  }, [supabase, lang]);

  /** ---- Effects ---- */
  useEffect(() => {
    if (!initialUser) {
      fetchUser();
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        fetchProfile(session.user.id);
      } else {
        setUser(null);
        setProfile(null);
        setLang("en");
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase, fetchUser, fetchProfile, initialUser]);

  /** ---- Context value ---- */
  const value = useMemo<UserContextValue>(
    () => ({
      user,
      profile,
      loading,
      lang,
      refreshUser: fetchUser,
      logout,
    }),
    [user, profile, loading, lang, fetchUser, logout],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

/** ---- Hook ---- */

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
