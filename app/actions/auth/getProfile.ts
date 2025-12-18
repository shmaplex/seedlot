"use server";

import { createClient } from "@/lib/supabase/server";
import {
  type ProfileDetailed,
  ProfileDetailedSchema,
} from "@/schemas/profile.schema";

/**
 * Fetch a user's profile by ID and validate with Zod
 */
export async function getProfile(
  userId: string,
): Promise<ProfileDetailed | null> {
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

  // Validate the returned data against the Zod schema
  const parseResult = ProfileDetailedSchema.safeParse(data);
  if (!parseResult.success) {
    console.error("Profile validation failed:", parseResult.error.format());
    return null;
  }

  return parseResult.data;
}
