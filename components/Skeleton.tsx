import clsx from "clsx";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  width?: string;
  height?: string;
  rounded?: string;
  className?: string;
  variant?: "pulse" | "shimmer";
  children?: React.ReactNode;
}

export default function Skeleton({
  color = "bg-gray-600",
  width = "w-full",
  height = "h-4",
  rounded = "rounded",
  className = "",
  variant = "shimmer",
  children = "",
  ...props 
}: SkeletonProps ) {
  return (
    <div
      className={clsx(
        color,
        width,
        height,
        rounded,
        variant === "pulse" && "animate-pulse",
        variant === "shimmer" && "skeleton-shimmer",
        className
      )}
      {...props}
    >{children}</div>
  )
}