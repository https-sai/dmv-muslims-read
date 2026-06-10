import { cva } from "class-variance-authority";
import { motion } from "motion/react";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 self-start rounded-sm border font-mono text-[11px] font-medium tracking-wider whitespace-nowrap uppercase no-underline outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "border-white bg-transparent text-white",
        yellow:
          "border-yellow/50 bg-yellow-muted text-white hover:border-yellow/70 hover:bg-yellow-muted",
        outline:
          "border-white bg-transparent text-white hover:border-blue/30 hover:bg-blue/5",
        ghost: "border-transparent bg-transparent text-white",
        link: "h-auto border-transparent p-0 text-blue underline-offset-4 hover:underline",
      },
      size: {
        default: "px-3 py-1",
        sm: "h-7 px-2.5 text-[10px]",
        lg: "h-9 px-4",
        icon: "size-8 p-0",
      },
    },
    defaultVariants: {
      variant: "yellow",
      size: "default",
    },
  },
);

function Button({ className, variant, size, asChild = false, ...props }) {
  if (asChild) {
    return (
      <Slot.Root
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }

  return (
    <motion.button
      data-slot="button"
      type="button"
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.99 }}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
