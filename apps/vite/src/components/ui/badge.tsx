import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1 rounded-md border px-2 py-0.5",
    "text-[11px] font-medium leading-none tracking-tight",
    "transition-colors duration-150",
    "focus:outline-none",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "border-foreground/15 bg-foreground text-background",
        secondary:
          "border-border bg-muted text-muted-foreground",
        destructive:
          "border-destructive/30 bg-destructive/10 text-destructive dark:bg-destructive/15",
        outline:
          "border-border bg-transparent text-foreground",
        kbd: [
          "kbd-surface text-foreground font-mono uppercase tracking-tightest",
          "py-1 px-1.5 text-[10px]",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
