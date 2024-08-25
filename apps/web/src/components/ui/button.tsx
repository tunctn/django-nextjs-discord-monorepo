import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { LoadingDotsBouncing } from "./loading-dots-bouncing";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary/90",
        destructive:
          "dark:bg-destructive/80 bg-destructive/80 text-destructive-foreground focus:bg-destructive hover:!bg-destructive/100 ",
        destructiveGhost:
          "text-destructive-foreground focus:bg-destructive hover:bg-destructive",
        outline:
          "border border-input bg-foreground/5 hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline !px-0 focus:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3",
        lg: "h-10 rounded-md px-8",

        icon: "h-10 w-10",
        ["sm-icon"]: "h-9 w-9",
        ["xs-icon"]: "h-8 w-8",
        ["lg-icon"]: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  loadingDotsSize?: number;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      isLoading = false,
      isDisabled,
      loadingDotsSize = 5,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || isDisabled || props.disabled}
        {...props}
      >
        {isLoading ? (
          <LoadingDotsBouncing
            size={loadingDotsSize}
            className="mt-0.5"
            backgroundColor={variant === "destructive" ? "#fff" : "#a3a1a1"}
          />
        ) : (
          children
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
