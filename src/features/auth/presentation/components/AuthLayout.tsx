import type { ReactNode } from "react";
import { BrandMark } from "../../../../shared/components/BrandMark";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="relative hidden w-1/2 flex-col justify-between overflow-hidden p-10 lg:flex">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              color: "var(--color-text)",
            }}
          />
        </div>

        <div className="relative flex items-center gap-2 text-text">
          <BrandMark />
          <span className="text-lg font-semibold tracking-wide">CRM Jurídico</span>
        </div>

        <div className="relative border-l-2 border-accent pl-4">
          <h2 className="text-3xl font-semibold text-text">{title}</h2>
          <p className="mt-2 max-w-sm text-sm text-text-muted">{subtitle}</p>
        </div>
      </aside>

      <main className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md rounded-xl border border-border bg-surface-card p-8 shadow-xl shadow-black/30">
          {children}
        </div>
      </main>
    </div>
  );
}
