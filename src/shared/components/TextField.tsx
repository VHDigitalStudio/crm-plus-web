import { useId, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { EyeIcon, EyeOffIcon } from "./icons";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: ReactNode;
}

export function TextField({ label, error, icon, id, type = "text", className, ...rest }: TextFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-text-muted">
        {label}
      </label>
      <div className="relative flex items-center">
        {icon && <span className="pointer-events-none absolute left-3 text-text-muted">{icon}</span>}
        <input
          id={fieldId}
          type={resolvedType}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          className={[
            "w-full rounded-lg border bg-surface-elevated px-3 py-2.5 text-text placeholder:text-text-muted/60 outline-none transition",
            "focus:ring-2",
            error ? "border-danger focus:border-danger focus:ring-danger/30" : "border-border focus:border-accent focus:ring-accent/30",
            icon ? "pl-10" : "",
            isPassword ? "pr-10" : "",
            className ?? "",
          ].join(" ")}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 text-text-muted transition hover:text-text"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
      {error && (
        <p id={`${fieldId}-error`} role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
