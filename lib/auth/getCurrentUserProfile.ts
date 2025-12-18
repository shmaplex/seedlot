// lib/auth/getCurrentUserProfile.ts
import { createClient } from "@/lib/supabase/server";
import { ProfileBaseSchema } from "@/schemas/profile.schema";

export async function getCurrentUserProfile() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("Profile")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error || !data) return null;

  return ProfileBaseSchema.parse(data);
}
