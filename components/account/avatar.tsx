"use client";

import Image from "next/image";
import type React from "react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface AvatarProps {
  uid: string | null;
  url: string | null;
  size: number;
  onUpload: (url: string) => void;
}

export default function Avatar({ uid, url, size, onUpload }: AvatarProps) {
  const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url);
  const [uploading, setUploading] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Dicebear fallback URL
  const dicebearUrl = uid
    ? `https://api.dicebear.com/7.x/pixel-art/svg?seed=${uid}`
    : null;

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(path);
        if (error) throw error;

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
        setAvatarUrl(null);
      }
    }

    if (url) downloadImage(url);
  }, [url, supabase]);

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event,
  ) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      onUpload(filePath);
      setAvatarUrl(null); // force re-download
    } catch (error) {
      alert("Error uploading avatar!");
    } finally {
      setUploading(false);
    }
  };

  // Decide what to show: uploaded avatar > Dicebear > initials
  const showUrl = !imgError && (avatarUrl || dicebearUrl);

  return (
    <div className="flex flex-col items-center gap-2">
      {showUrl ? (
        <Image
          width={size}
          height={size}
          src={avatarUrl || dicebearUrl!}
          alt="Avatar"
          className="rounded-full border border-border object-cover"
          style={{ height: size, width: size }}
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          className="rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium"
          style={{ width: size, height: size }}
        >
          {uid ? uid.toString().slice(0, 2).toUpperCase() : "?"}
        </div>
      )}

      <label
        htmlFor="avatar-upload"
        className="button primary block text-sm w-full text-center cursor-pointer"
      >
        {uploading ? "Uploading…" : "Upload"}
      </label>
      <input
        id="avatar-upload"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={uploadAvatar}
        disabled={uploading}
      />
    </div>
  );
}
