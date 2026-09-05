import type { ButtonHTMLAttributes } from "react";
import { Spinner } from "./icons";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  loading?: boolean;
}

const VARIANT_CLASSES: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-gradient-to-r from-accent-strong to-accent text-accent-foreground hover:brightness-105 focus-visible:ring-2 focus-visible:ring-accent/50",
  ghost: "bg-transparent text-text-muted hover:bg-surface-elevated hover:text-text",
};

export function Button({ variant = "primary", loading, disabled, className, children, ...rest }: ButtonProps) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition",
        "disabled:cursor-not-allowed disabled:opacity-60",
        VARIANT_CLASSES[variant],
        className ?? "",
      ].join(" ")}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}
