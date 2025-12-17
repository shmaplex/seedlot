"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const avatarVariants = cva(
  "inline-flex items-center justify-center bg-muted text-muted-foreground overflow-hidden select-none bg-cover bg-center",
  {
    variants: {
      size: {
        sm: "w-8 h-8 text-sm",
        md: "w-10 h-10 text-md",
        lg: "w-14 h-14 text-lg",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      border: {
        true: "border border-border",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      rounded: "full",
      border: false,
    },
  },
);

export interface AvatarProps
  extends VariantProps<typeof avatarVariants>,
    React.HTMLAttributes<HTMLDivElement> {
  fallback?: string; // initials or name
  userId?: string | number; // use for Dicebear fallback
  src?: string; // optional image url
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    { className, size, rounded, border, src, fallback, userId, ...props },
    ref,
  ) => {
    const [imgError, setImgError] = React.useState(false);

    const initialsFallback =
      fallback || (userId ? userId.toString().slice(0, 2).toUpperCase() : "?");

    // Dicebear API fallback
    const dicebearUrl =
      userId && !src
        ? `https://api.dicebear.com/6.x/pixel-art/svg?seed=${userId}`
        : undefined;

    const backgroundImage =
      !imgError && (src || dicebearUrl)
        ? `url(${src || dicebearUrl})`
        : undefined;

    return (
      <div
        ref={ref}
        className={avatarVariants({ size, rounded, border, className })}
        style={{
          backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        {...props}
        onError={() => setImgError(true)}
      >
        {!backgroundImage && (
          <span className="font-medium text-center">{initialsFallback}</span>
        )}
      </div>
    );
  },
);

Avatar.displayName = "Avatar";
