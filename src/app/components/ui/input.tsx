import * as React from "react";

import { cn } from "./utils";

interface InputProps extends React.ComponentProps<"input"> {
  error?: boolean;
}

function Input({ className, type, error, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        "flex h-11 w-full min-w-0 rounded-ds-md border bg-background px-3 py-2 text-body transition-colors",
        "placeholder:text-neutral-500",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-body-small file:font-medium",

        // Focus styles
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",

        // Error styles
        error && "border-error-500 focus-visible:ring-error-500",

        // Disabled styles
        "disabled:pointer-events-none disabled:opacity-50",

        // Dark mode adjustments
        "dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-100",
        "dark:placeholder:text-neutral-400 dark:focus-visible:ring-primary-400",

        className,
      )}
      {...props}
    />
  );
}

export { Input };
