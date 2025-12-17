"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 dark:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90 dark:hover:bg-secondary/80",
        outline:
          "border border-border text-foreground hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:hover:bg-destructive/80",
        ghost:
          "bg-transparent text-foreground hover:bg-muted/5 dark:hover:bg-muted/10 focus:ring-0 focus:ring-offset-0",
        link: "text-primary underline-offset-4 hover:underline dark:text-primary",
        accent:
          "bg-accent text-accent-foreground hover:bg-accent/90 dark:hover:bg-accent/80",
      },
      size: {
        sm: "px-2 py-1 text-sm",
        md: "px-3 py-2 text-md",
        lg: "px-4 py-3 text-lg",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "md",
    },
  }
);

export interface ButtonProps
  extends VariantProps<typeof buttonVariants>,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement | HTMLElement, ButtonProps>(
  ({ className, variant, size, rounded, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={buttonVariants({ variant, size, rounded, className })}
        ref={ref as any}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
