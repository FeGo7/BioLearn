import * as React from "react";
import { cn } from "../../lib/utils";

const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: number;
    max: number;
    variant?: "default" | "success" | "warning" | "danger";
  }
>(({ className, value, max, variant = "default", ...props }, ref) => {
  const percentage = Math.round((value / max) * 100);
  
  return (
    <div
      ref={ref}
      className={cn("w-full", className)}
      {...props}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-muted-foreground">
          {props.children}
        </span>
        <span className="text-xs font-medium text-muted-foreground">
          {percentage}%
        </span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2.5">
        <div
          className={cn(
            "h-2.5 rounded-full",
            {
              "bg-primary": variant === "default",
              "bg-green-500": variant === "success",
              "bg-amber-500": variant === "warning",
              "bg-red-500": variant === "danger",
            }
          )}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
});
Progress.displayName = "Progress";

export { Progress };
