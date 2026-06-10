import { cva } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center border-transparent font-medium",
  {
    variants: {
      variant: {
        yellow: "rounded-sm bg-yellow-muted px-1 py-px text-white",
        label:
          "rounded-none bg-transparent px-0 py-0 font-mono text-[10px] tracking-widest text-white uppercase",
        note: "gap-1.5 rounded-none bg-transparent px-0 py-0 font-mono text-[11px] tracking-wider text-white uppercase",
        outline: "rounded-sm border-white text-white",
      },
    },
    defaultVariants: {
      variant: "yellow",
    },
  },
);

function Badge({ className, variant, asChild = false, ...props }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
