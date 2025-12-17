"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

// CVA definition
const inputVariants = cva(
  "block w-full rounded-md border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none transition-colors px-3 py-2",
  {
    variants: {
      variant: {
        default:
          "border-border bg-card focus:ring-primary/70 dark:border-border dark:bg-card dark:focus:ring-primary/50",
        destructive:
          "border-destructive text-destructive placeholder:text-destructive/70 focus:ring-destructive/70 dark:text-destructive dark:placeholder:text-destructive/50 dark:focus:ring-destructive/50",
        outline:
          "border-border bg-background focus:ring-accent/70 dark:border-border dark:bg-background dark:focus:ring-accent/50",
      },
      size: {
        sm: "text-sm py-1 px-2",
        md: "text-md py-2 px-3",
        lg: "text-lg py-3 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// Omit 'size' from the HTML input attributes to avoid conflict with CVA
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  asChild?: boolean;
}

const Input = React.forwardRef<HTMLInputElement | HTMLElement, InputProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "input";
    return (
      <Comp
        className={inputVariants({ variant, size, className })}
        ref={ref as any}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };
