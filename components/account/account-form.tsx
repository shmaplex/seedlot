"use client";

import type { User } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import {
  getProfile,
  updatePassword,
  updateProfile as updateProfileAction,
} from "@/app/actions/auth";
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
  const [newPassword, setNewPassword] = useState("");

  const refreshProfile = useCallback(async () => {
    if (!user) return;
    const data = await getProfile(user.id);
    if (data) {
      setFullName(data.fullName);
      setUsername(data.username);
      setAvatarUrl(data.avatarUrl);
    }
  }, [user]);

  useEffect(() => {
    if (!profile) refreshProfile();
  }, [profile, refreshProfile]);

  async function handleUpdateProfile() {
    if (!user) return;
    setLoading(true);
    const result = await updateProfileAction({
      id: user.id,
      fullName,
      username,
      avatarUrl,
    });
    setLoading(false);

    if (!result) {
      alert(t("updateError"));
    } else {
      alert(t("updateSuccess"));
    }
  }

  async function handleChangePassword() {
    if (!newPassword) return;
    setLoading(true);
    const result = await updatePassword(newPassword);
    setLoading(false);

    if (result.success) {
      alert(t("passwordUpdateSuccess"));
      setNewPassword("");
    } else {
      alert(`${t("passwordUpdateError")}: ${result.error}`);
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-foreground">
            {t("title")}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {t("description")}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <Avatar
              uid={user?.id ?? null}
              url={avatarUrl}
              size={150}
              onUpload={(url) => {
                setAvatarUrl(url);
                handleUpdateProfile();
              }}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">{t("email")}</Label>
            <Input
              value={user?.email ?? ""}
              disabled
              className="bg-input border border-border text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-foreground">
              {t("fullName")}
            </Label>
            <Input
              id="fullName"
              value={fullName ?? ""}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-input border border-border text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username" className="text-foreground">
              {t("username")}
            </Label>
            <Input
              id="username"
              value={username ?? ""}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-input border border-border text-foreground"
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button onClick={handleUpdateProfile} disabled={loading}>
              {loading ? t("saving") : t("update")}
            </Button>
            {/* <form action="/auth/signout" method="post">
              <Button variant="destructive" type="submit">
                {t("signOut")}
              </Button>
            </form> */}
          </div>
        </CardContent>
      </Card>

      {/* Password Change Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-foreground">
            {t("changePassword")}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {t("newPasswordPlaceholder")}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await handleChangePassword();
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                {t("newPassword")}
              </Label>
              <Input
                id="password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={t("newPasswordPlaceholder")}
                className="bg-input border border-border text-foreground"
              />
            </div>
            <div className="w-full justify-end flex">
              <Button type="submit" disabled={loading || !newPassword}>
                {loading ? t("saving") : t("changePassword")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
