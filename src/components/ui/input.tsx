import * as React from "react";

import { cn } from "@/utilities/ui";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full border-b border-[hsla(0,_0%,_100%,_0.6)] bg-transparent p-3 pt-1 text-xl transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-[hsla(0,_0%,_100%,_0.15)] focus-visible:outline-none focus-visible:border-[hsla(0,_0%,_100%,_0.8)] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
