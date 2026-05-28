import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap select-none",
    "rounded-md text-sm font-medium tracking-tight",
    "transition-[transform,background-color,border-color,color,box-shadow] duration-150",
    "focus-visible:outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-primary text-primary-foreground",
          "border border-primary",
          "shadow-[0_1px_0_0_hsl(var(--foreground)/0.18),inset_0_1px_0_0_hsl(0_0%_100%/0.12)]",
          "hover:bg-primary/95 hover:translate-y-[-0.5px]",
          "active:translate-y-[1px] active:shadow-none",
        ].join(" "),
        destructive: [
          "bg-destructive text-destructive-foreground",
          "border border-destructive",
          "shadow-[0_1px_0_0_hsl(0_0%_0%/0.12),inset_0_1px_0_0_hsl(0_0%_100%/0.15)]",
          "hover:bg-destructive/95 hover:translate-y-[-0.5px]",
          "active:translate-y-[1px] active:shadow-none",
        ].join(" "),
        outline: [
          "kbd-surface text-foreground",
          "hover:bg-accent hover:text-accent-foreground",
        ].join(" "),
        secondary: [
          "kbd-surface bg-secondary text-secondary-foreground",
          "hover:bg-accent",
        ].join(" "),
        ghost: [
          "border border-transparent",
          "hover:bg-accent hover:text-accent-foreground",
        ].join(" "),
        link: [
          "text-foreground underline-offset-4 hover:underline",
          "decoration-foreground/30 hover:decoration-foreground",
        ].join(" "),
      },
      size: {
        default: "h-9 px-4",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-6",
        icon: "h-9 w-9",
        "icon-sm": "h-8 w-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
