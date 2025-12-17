// components/account/account-form.tsx
"use client";

import type { User } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";
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
import type { UserProfile } from "@/schemas/profile.schema";
import Avatar from "./avatar";

export default function AccountForm({
  user,
  profile,
}: {
  user: User | null;
  profile: UserProfile | null;
}) {
  const t = useTranslations("account");
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState<string | null>(
    profile?.fullName ?? null,
  );
  const [username, setUsername] = useState<string | null>(
    profile?.username ?? null,
  );
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    profile?.avatarUrl ?? null,
  );

  const refreshProfile = useCallback(async () => {
    if (!user) return;

    const { data } = await supabase
      .from("Profile")
      .select("fullName, username, avatarUrl")
      .eq("id", user.id)
      .single();

    if (data) {
      setFullName(data.fullName);
      setUsername(data.username);
      setAvatarUrl(data.avatarUrl);
    }
  }, [user, supabase]);

  useEffect(() => {
    if (!profile) {
      refreshProfile();
    }
  }, [profile, refreshProfile]);

  async function updateProfile() {
    if (!user) return;

    setLoading(true);

    const { error } = await supabase.from("Profile").update({
      fullName,
      username,
      avatarUrl,
      updatedAt: new Date().toISOString(),
    });

    setLoading(false);

    if (error) {
      alert(t("updateError"));
    } else {
      alert(t("updateSuccess"));
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <Avatar
          uid={user?.id ?? null}
          url={avatarUrl}
          size={150}
          onUpload={(url) => {
            setAvatarUrl(url);
            updateProfile();
          }}
        />

        <div className="space-y-2">
          <Label>{t("email")}</Label>
          <Input value={user?.email ?? ""} disabled />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullName">{t("fullName")}</Label>
          <Input
            id="fullName"
            value={fullName ?? ""}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">{t("username")}</Label>
          <Input
            id="username"
            value={username ?? ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <Button onClick={updateProfile} disabled={loading}>
            {loading ? t("saving") : t("update")}
          </Button>

          <form action="/auth/signout" method="post">
            <Button variant="outline" type="submit">
              {t("signOut")}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
