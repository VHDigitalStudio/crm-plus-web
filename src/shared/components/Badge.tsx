import type { ReactNode } from "react";

type BadgeVariant = "neutral" | "accent" | "success" | "warning" | "danger";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  neutral: "border-border bg-surface-elevated text-text-muted",
  accent: "border-accent/30 bg-accent/15 text-accent",
  success: "border-success/30 bg-success/15 text-success",
  warning: "border-warning/30 bg-warning/15 text-warning",
  danger: "border-danger/30 bg-danger/15 text-danger",
};

export function Badge({ variant = "neutral", children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${VARIANT_CLASSES[variant]}`}
    >
      {children}
    </span>
  );
}
