import { cn } from "@/lib/utils";
import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn("inline-flex items-center justify-center rounded-md bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-800", className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
