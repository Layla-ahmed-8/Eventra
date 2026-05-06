import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-body-small font-medium transition-all duration-ds-normal disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:opacity-90 active:scale-98",
  {
    variants: {
      variant: {
        default: "bg-primary-600 text-white hover:bg-primary-700 shadow-ds-sm",
        /** Spec: purple → primary light, lift + glow on hover */
        gradient:
          "btn-brand-gradient border-0 text-base font-medium shadow-[var(--shadow-card)] hover:!opacity-100",
        destructive:
          "bg-error-500 text-white hover:bg-error-600 focus-visible:ring-error-500/20 dark:focus-visible:ring-error-500/40",
        outline:
          "border-2 border-primary-600 bg-white text-primary-600 hover:bg-primary-50 dark:bg-transparent dark:hover:bg-primary-950",
        secondary:
          "bg-secondary-500 text-white hover:bg-secondary-600 shadow-ds-sm",
        ghost:
          "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800",
        link: "text-primary-600 underline-offset-4 hover:underline p-0 h-auto",
        success: "bg-success-500 text-white hover:bg-success-600 shadow-ds-sm",
      },
      size: {
        default: "h-11 px-4 py-2 rounded-ds-md",
        sm: "h-9 px-3 py-1.5 rounded-ds-sm text-caption",
        lg: "h-12 px-6 py-3 rounded-ds-lg text-body",
        /** Spec primary CTA: 56px height, 24px horizontal padding */
        xl: "min-h-14 h-14 px-6 text-base font-medium rounded-[var(--radius-sm)]",
        icon: "size-11 rounded-ds-md",
      },
      loading: {
        true: "cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      loading: false,
    },
  },
);

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  const content = loading ? (
    <span className="inline-flex items-center justify-center gap-2">
      <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {children}
    </span>
  ) : (
    children
  );

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, loading, className }))}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </Comp>
  );
}

export { Button, buttonVariants };
