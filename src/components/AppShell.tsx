import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export function AppShell({
  title,
  tag,
  description,
  children,
}: {
  title: string;
  tag: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-4 z-50 px-4">
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-border bg-card/80 px-4 py-3 shadow-sm backdrop-blur">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground font-serif text-sm font-semibold text-background">
              GK
            </span>
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="text-xs font-bold tracking-[0.18em]">GABRIEL KIPKOECH</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {tag} Demo
              </span>
            </span>
          </Link>
          <Link
            to="/"
            hash="work"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-[11px] font-bold tracking-[0.18em] hover:border-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> BACK TO WORK
          </Link>
        </nav>
      </header>

      <section className="px-4 pt-12 pb-8">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">{tag}</p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">{description}</p>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-6xl">{children}</div>
      </section>
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border bg-card p-6 ${className}`}>{children}</div>
  );
}

export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="eyebrow">{label}</p>
      <p className="mt-2 font-serif text-3xl">{value}</p>
    </div>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground ${props.className ?? ""}`}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-foreground ${props.className ?? ""}`}
    />
  );
}

export function Button({
  children,
  variant = "primary",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold tracking-[0.18em] transition-colors disabled:opacity-50";
  const styles =
    variant === "primary"
      ? "bg-foreground text-background hover:bg-accent"
      : "border border-border bg-card hover:border-foreground";
  return (
    <button {...rest} className={`${base} ${styles} ${rest.className ?? ""}`}>
      {children}
    </button>
  );
}
