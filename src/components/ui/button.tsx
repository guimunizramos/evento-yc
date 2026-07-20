import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Hero CTA - Primary orange with glow animation
        hero: "bg-primary text-primary-foreground hover:bg-primary-hover animate-pulse-glow font-bold tracking-wide",
        // Outline orange for secondary CTAs
        "hero-outline": "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground font-semibold",
        // CTA verde preenchido (LP de incorporação) — degradê com brilho pulsante
        "cta-green":
          "bg-[linear-gradient(135deg,hsl(150_85%_26%)_0%,hsl(145_75%_36%)_50%,hsl(140_70%_45%)_100%)] text-white hover:brightness-110 animate-pulse-glow-green font-bold tracking-wide",
        // Variante secundária do CTA verde, sem pulso, para ações de apoio
        "cta-green-soft":
          "bg-[linear-gradient(135deg,hsl(150_85%_22%)_0%,hsl(145_60%_30%)_100%)] text-white hover:brightness-125 font-semibold",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-8 text-base",
        xl: "h-14 rounded-lg px-10 text-lg",
        icon: "h-10 w-10",
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
