import { motion } from "motion/react";

import { cn } from "@/lib/utils";

function Table({ className, ...props }) {
  return (
    <div
      data-slot="table-container"
      className="mb-5 overflow-hidden rounded border border-white"
      style={{ boxShadow: "var(--shadow-card-glow)" }}
    >
      <table
        data-slot="table"
        className={cn("w-full border-collapse font-body text-[13px]", className)}
        {...props}
      />
    </div>
  );
}

function TableBody({ className, ...props }) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child_td]:border-b-0", className)}
      {...props}
    />
  );
}

function TableRow({ className, index = 0, ...props }) {
  return (
    <motion.tr
      data-slot="table-row"
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
      className={cn(className)}
      {...props}
    />
  );
}

function TableCell({ className, ...props }) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "border-b border-white px-3.5 py-2.5 align-middle text-white",
        className,
      )}
      {...props}
    />
  );
}

export { Table, TableBody, TableRow, TableCell };
