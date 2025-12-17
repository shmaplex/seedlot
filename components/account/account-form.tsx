"use client";

import type { User } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import Avatar from "./avatar";

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select("full_name, username, website, avatar_url")
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    fullname: string | null;
    username: string | null;
    website: string | null;
    avatar_url: string | null;
  }) {
    if (!user) return;

    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      alert("Profile updated!");
    } catch {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Manage your profile information</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <Avatar
          uid={user?.id ?? null}
          url={avatar_url}
          size={150}
          onUpload={(url) => {
            setAvatarUrl(url);
            updateProfile({ fullname, username, website, avatar_url: url });
          }}
        />

        <div className="space-y-2">
          <Label>Email</Label>
          <Input value={user?.email ?? ""} disabled />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            value={fullname ?? ""}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={username ?? ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            type="url"
            value={website ?? ""}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() =>
              updateProfile({ fullname, username, website, avatar_url })
            }
            disabled={loading}
          >
            {loading ? "Saving…" : "Update profile"}
          </Button>

          <form action="/auth/signout" method="post">
            <Button variant="outline" type="submit">
              Sign out
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
