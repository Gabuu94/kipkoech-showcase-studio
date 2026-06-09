import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, BadgeCheck, Quote, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { Gallery, type GalleryItem } from "@/components/Gallery";

export type CaseStudyData = {
  category: string;
  scope: string;
  overview: string;
  businessValue: string;
  outcome: string;
  tags: string[];
  highlights: string[];
  visitUrl?: string;
  problem?: string;
  solution?: string;
  metrics?: { label: string; value: string; sub?: string }[];
  techStack?: { name: string; role: string }[];
  process?: { title: string; body: string }[];
  testimonial?: { quote: string; author: string; role: string };
  role?: string;
  timeline?: string;
  client?: string;
};

export function AppShell({
  title,
  tag,
  description,
  children,
  cover,
  caseStudy,
}: {
  title: string;
  tag: string;
  description: string;
  children: ReactNode;
  cover?: string;
  caseStudy?: CaseStudyData;
}) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-4 z-50 px-4">
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-border bg-card/85 px-4 py-3 shadow-sm backdrop-blur">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground font-serif text-sm font-semibold text-background">
              GK
            </span>
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="text-xs font-bold tracking-[0.18em]">GABRIEL KIPKOECH</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {tag} · Case Study
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <a
              href="#demo"
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-[11px] font-bold tracking-[0.18em] hover:border-foreground transition-colors"
            >
              LIVE DEMO
            </a>
            <Link
              to="/"
              hash="work"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-[11px] font-bold tracking-[0.18em] hover:border-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> BACK
            </Link>
          </div>
        </nav>
      </header>

      {/* Cinematic hero */}
      <section className="px-4 pt-10">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-foreground text-background">
            {cover && (
              <img
                src={cover}
                alt={title}
                loading="eager"
                width={1600}
                height={900}
                className="absolute inset-0 h-full w-full object-cover opacity-60"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/10" />
            <div className="relative grid gap-8 p-6 sm:p-10 md:p-14 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-background/30 bg-background/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] backdrop-blur">
                  <Sparkles className="h-3 w-3" /> {tag}
                </span>
                <h1 className="mt-5 font-serif text-4xl leading-[1.05] sm:text-5xl md:text-6xl">{title}</h1>
                <p className="mt-5 max-w-xl text-background/80 sm:text-lg">{description}</p>
                {caseStudy && (
                  <div className="mt-7 flex flex-wrap gap-2">
                    {caseStudy.tags.slice(0, 5).map((t) => (
                      <span key={t} className="rounded-full border border-background/30 bg-background/10 px-3 py-1.5 text-[11px] font-medium backdrop-blur">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href="#demo" className="inline-flex items-center gap-2 rounded-full bg-background px-5 py-3 text-[11px] font-bold tracking-[0.18em] text-foreground hover:bg-background/90">
                    OPEN LIVE DEMO <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  {caseStudy?.visitUrl && (
                    <a
                      href={caseStudy.visitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-background/40 bg-background/5 px-5 py-3 text-[11px] font-bold tracking-[0.18em] hover:bg-background/10"
                    >
                      VISIT PROJECT <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {caseStudy && (
                <div className="grid grid-cols-2 gap-3 self-start rounded-2xl border border-background/20 bg-background/5 p-4 backdrop-blur">
                  <Meta label="Category" value={caseStudy.category} />
                  <Meta label="Scope" value={caseStudy.scope} />
                  <Meta label="Role" value={caseStudy.role ?? "Lead Engineer"} />
                  <Meta label="Timeline" value={caseStudy.timeline ?? "2024 → 2025"} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {caseStudy && (
        <section id="case-study" className="px-4 pt-12">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
              <div className="rounded-3xl border border-border bg-card p-6 sm:p-10">
                <p className="eyebrow">Overview</p>
                <h2 className="mt-2 font-serif text-3xl sm:text-4xl">The story</h2>
                <p className="mt-5 leading-relaxed text-muted-foreground">{caseStudy.overview}</p>

                {(caseStudy.problem || caseStudy.solution) && (
                  <div className="mt-8 grid gap-5 md:grid-cols-2">
                    {caseStudy.problem && (
                      <div className="rounded-2xl border border-border bg-background p-5">
                        <p className="eyebrow !text-rose-600">Problem</p>
                        <p className="mt-2 leading-relaxed">{caseStudy.problem}</p>
                      </div>
                    )}
                    {caseStudy.solution && (
                      <div className="rounded-2xl border border-border bg-background p-5">
                        <p className="eyebrow !text-emerald-600">Solution</p>
                        <p className="mt-2 leading-relaxed">{caseStudy.solution}</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-background p-5">
                    <p className="eyebrow">Business value</p>
                    <p className="mt-2 leading-relaxed">{caseStudy.businessValue}</p>
                  </div>
                  <div className="rounded-2xl border border-accent/40 bg-accent/10 p-5">
                    <p className="eyebrow !text-accent">Outcome</p>
                    <p className="mt-2 leading-relaxed">{caseStudy.outcome}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
                  <h3 className="font-serif text-2xl">Highlights</h3>
                  <ul className="mt-4 space-y-3">
                    {caseStudy.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3">
                        <BadgeCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                        <span className="leading-relaxed text-sm">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {caseStudy.techStack && caseStudy.techStack.length > 0 && (
                  <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
                    <h3 className="font-serif text-2xl">Tech stack</h3>
                    <ul className="mt-4 space-y-3">
                      {caseStudy.techStack.map((t) => (
                        <li key={t.name} className="flex items-start justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
                          <span className="text-sm font-semibold">{t.name}</span>
                          <span className="text-right text-xs text-muted-foreground">{t.role}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {caseStudy.metrics && caseStudy.metrics.length > 0 && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {caseStudy.metrics.map((m) => (
                  <div key={m.label} className="rounded-3xl border border-border bg-card p-6">
                    <p className="eyebrow">{m.label}</p>
                    <p className="mt-3 font-serif text-4xl leading-none">{m.value}</p>
                    {m.sub && <p className="mt-2 text-xs text-muted-foreground">{m.sub}</p>}
                  </div>
                ))}
              </div>
            )}

            {caseStudy.process && caseStudy.process.length > 0 && (
              <div className="mt-6 rounded-3xl border border-border bg-card p-6 sm:p-10">
                <p className="eyebrow">How it was built</p>
                <h3 className="mt-2 font-serif text-3xl">Process</h3>
                <ol className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                  {caseStudy.process.map((p, i) => (
                    <li key={p.title} className="relative rounded-2xl border border-border bg-background p-5">
                      <span className="absolute -top-3 left-5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-foreground font-serif text-xs text-background">
                        {i + 1}
                      </span>
                      <p className="mt-2 font-semibold">{p.title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {caseStudy.testimonial && (
              <div className="mt-6 rounded-3xl border border-foreground bg-foreground p-6 text-background sm:p-10">
                <Quote className="h-8 w-8 opacity-40" />
                <p className="mt-4 font-serif text-2xl leading-snug sm:text-3xl">"{caseStudy.testimonial.quote}"</p>
                <p className="mt-5 text-xs uppercase tracking-[0.18em] text-background/70">
                  {caseStudy.testimonial.author} · {caseStudy.testimonial.role}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      <section id="demo" className="px-4 pt-16 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Live demo</p>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl">Try it now</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Real interface wired to a live database — changes you make persist for every visitor.
              </p>
            </div>
            <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Live data
            </span>
          </div>
          {children}
        </div>
      </section>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-background/60">{label}</p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-border bg-card p-6 ${className}`}>{children}</div>
  );
}

export function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="eyebrow">{label}</p>
      <p className="mt-2 font-serif text-3xl">{value}</p>
      {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
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
