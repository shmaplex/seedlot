"use server";

import { createClient } from "@/lib/supabase/server";
import type { UserProfile } from "@/schemas/profile.schema";

/**
 * Update a user's profile fields: fullName, username, avatarUrl
 */
export async function updateProfile(profile: {
  id: string;
  fullName?: string | null;
  username?: string | null;
  avatarUrl?: string | null;
}): Promise<UserProfile | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Profile")
    .update({
      fullName: profile.fullName ?? null,
      username: profile.username ?? null,
      avatarUrl: profile.avatarUrl ?? null,
      updatedAt: new Date().toISOString(),
    })
    .eq("id", profile.id)
    .select()
    .single();

  if (error) {
    console.error("Profile update failed:", error);
    return null;
  }

  return data as UserProfile;
}
