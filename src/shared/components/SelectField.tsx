import { useId, type ReactNode, type SelectHTMLAttributes } from "react";
import { ChevronDownIcon } from "./icons";

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  children: ReactNode;
}

export function SelectField({ label, error, id, className, children, ...rest }: SelectFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-text-muted">
        {label}
      </label>
      <div className="relative flex items-center">
        <select
          id={fieldId}
          aria-invalid={Boolean(error)}
          className={[
            "w-full appearance-none rounded-lg border bg-surface-elevated px-4 py-3 pr-11 text-base text-text outline-none transition",
            "focus:ring-2",
            error ? "border-danger/70 focus:border-danger focus:ring-danger/30" : "border-border/50 focus:border-accent focus:ring-accent/30",
            className ?? "",
          ].join(" ")}
          {...rest}
        >
          {children}
        </select>
        <ChevronDownIcon width={18} height={18} className="pointer-events-none absolute right-3.5 text-text-muted" />
      </div>
      {error && (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
