"use server";

import { createClient } from "@/lib/supabase/server";
import type { UserProfile } from "@/schemas/profile.schema";

/**
 * Fetch a user's profile by ID
 */
export async function getProfile(userId: string): Promise<UserProfile | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Profile")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Failed to fetch profile:", error);
    return null;
  }

  return data as UserProfile;
}
