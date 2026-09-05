import { useId, type TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function Textarea({ label, error, id, className, rows = 4, ...rest }: TextareaProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-text-muted">
        {label}
      </label>
      <textarea
        id={fieldId}
        rows={rows}
        aria-invalid={Boolean(error)}
        className={[
          "w-full resize-y rounded-lg border bg-surface-elevated px-4 py-3 text-base text-text placeholder:text-text-muted/60 outline-none transition",
          "focus:ring-2",
          error ? "border-danger/70 focus:border-danger focus:ring-danger/30" : "border-border/50 focus:border-accent focus:ring-accent/30",
          className ?? "",
        ].join(" ")}
        {...rest}
      />
      {error && (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
