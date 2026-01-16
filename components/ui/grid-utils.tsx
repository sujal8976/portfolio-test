import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export function GridSeperator({ className }: { className?: string }) {
  return (
    <div
      className={cn("absolute left-0 right-0 h-[1px] bg-borders", className)}
    />
  );
}

export function GridLines() {
  return (
    <div
      className={cn(
        "absolute inset-0 z-grid-layer pointer-events-none px-spacer",
        "flex justify-between",
        "[&>div]:w-[1px] [&>div]:bg-borders",
      )}
    >
      <div></div>
      <div></div>
      <div className="hidden md:block"></div>
      <div className="hidden lg:block"></div>
      <div className="hidden xl:block"></div>
    </div>
  );
}

interface GridWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GridWrapper = forwardRef<HTMLDivElement, GridWrapperProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "w-full px-spacer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);

GridWrapper.displayName = "GridWrapper";
