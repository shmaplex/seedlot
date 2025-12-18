"use client";

import type { User } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
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
import type { ProfileBase, ProfileUpdate } from "@/schemas/profile.schema";
import Avatar from "./avatar";

type AccountFormProps = {
  user: User | null;
  profile: ProfileBase | null;
};

export default function AccountForm({ user, profile }: AccountFormProps) {
  const t = useTranslations("account");

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProfileUpdate>({
    fullName: profile?.fullName ?? null,
    username: profile?.username ?? null,
    avatarUrl: profile?.avatarUrl ?? null,
    preferredLang: profile?.preferredLang ?? null,
    timezone: profile?.timezone ?? null,
    settings: profile?.settings ?? null,
  });
  const [newPassword, setNewPassword] = useState("");

  const refreshProfile = useCallback(async () => {
    if (!user) return;
    const data = await getProfile(user.id);
    if (data) {
      setFormData({
        fullName: data.fullName,
        username: data.username,
        avatarUrl: data.avatarUrl,
        preferredLang: data.preferredLang,
        timezone: data.timezone,
        settings: data.settings,
      });
    }
  }, [user]);

  useEffect(() => {
    if (!profile) refreshProfile();
  }, [profile, refreshProfile]);

  const handleUpdateProfile = async () => {
    if (!user) return;
    setLoading(true);

    try {
      // Validate using Zod before sending
      const parsedData = z
        .object({
          fullName: z.string().nullable().optional(),
          username: z.string().nullable().optional(),
          avatarUrl: z.string().url().nullable().optional(),
          preferredLang: z.string().nullable().optional(),
          timezone: z.string().nullable().optional(),
          settings: z.record(z.string(), z.unknown()).nullable().optional(),
        })
        .parse(formData);

      const result = await updateProfileAction({
        id: user.id,
        ...parsedData,
      });

      if (!result) {
        alert(t("updateError"));
      } else {
        alert(t("updateSuccess"));
      }
    } catch (err: any) {
      console.error(err);
      alert(t("updateError"));
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword) return;
    setLoading(true);

    try {
      const result = await updatePassword(newPassword);

      if (result.success) {
        alert(t("passwordUpdateSuccess"));
        setNewPassword("");
      } else {
        alert(`${t("passwordUpdateError")}: ${result.error}`);
      }
    } finally {
      setLoading(false);
    }
  };

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
              url={formData.avatarUrl ?? null}
              size={150}
              onUpload={(url) => {
                setFormData((prev) => ({ ...prev, avatarUrl: url }));
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
              value={formData.fullName ?? ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, fullName: e.target.value }))
              }
              className="bg-input border border-border text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username" className="text-foreground">
              {t("username")}
            </Label>
            <Input
              id="username"
              value={formData.username ?? ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, username: e.target.value }))
              }
              className="bg-input border border-border text-foreground"
            />
          </div>

          <div className="flex gap-3 justify-end">
            <Button onClick={handleUpdateProfile} disabled={loading}>
              {loading ? t("saving") : t("update")}
            </Button>
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
