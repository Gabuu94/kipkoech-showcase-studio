import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AppShell, Button, Card, Stat } from "@/components/AppShell";
import { Donut, Bars } from "@/components/Charts";
import { fetchStaff, toggleStaff, type Staff } from "@/lib/demo-api";
import cover from "@/assets/cover-shiftboard.jpg";
import { Users, Building2, Clock } from "lucide-react";

export const Route = createFileRoute("/work/shiftboard")({
  head: () => ({ meta: [{ title: "Shiftboard HRMS — demo" }] }),
  component: Shiftboard,
});

function Shiftboard() {
  const qc = useQueryClient();
  const { data: staff = [], isLoading } = useQuery({ queryKey: ["staff"], queryFn: fetchStaff });
  const toggle = useMutation({
    mutationFn: toggleStaff,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["staff"] }),
  });
  const [filter, setFilter] = useState<"all" | "in" | "out">("all");

  const inCount = useMemo(() => staff.filter((s) => s.clocked_in).length, [staff]);
  const branches = useMemo(() => {
    const m = new Map<string, { total: number; in: number }>();
    staff.forEach((s) => {
      const b = m.get(s.branch) ?? { total: 0, in: 0 };
      b.total++;
      if (s.clocked_in) b.in++;
      m.set(s.branch, b);
    });
    return [...m.entries()];
  }, [staff]);

  const filtered = filter === "all" ? staff : staff.filter((s) => (filter === "in" ? s.clocked_in : !s.clocked_in));

  return (
    <AppShell
      title="Shiftboard HRMS"
      tag="HR · Attendance"
      description="Live roster persisted to a database. Clock-in toggles update across every browser, on every branch, in real time."
      cover={cover}
      caseStudy={{
        category: "Web App",
        scope: "HR & attendance platform",
        role: "Full-stack lead",
        timeline: "Q3 2024 · 4 months",
        overview:
          "Shiftboard is a Laravel-backed HR system used to coordinate attendance, payroll workflows and reporting for distributed teams across multiple branches. The web dashboard pairs with a Flutter field app so supervisors get live status, while HR handles approvals, leave and payroll runs from one console.",
        problem:
          "Payroll for 180 staff across 6 branches took a full day every fortnight — spreadsheets, WhatsApp screenshots and biometric exports that never agreed.",
        solution:
          "One source of truth: web HR dashboard + Flutter clock-in app + shared-device kiosk, all writing to one Postgres ledger with audit trail.",
        businessValue:
          "Gives HR a single console for attendance, leave and payroll across multiple branches.",
        outcome:
          "Branch managers see live clock-in status. HR closes payroll cycles in 2 hours instead of a full day of spreadsheet wrangling.",
        tags: ["Laravel", "Flutter", "HRMS", "Payroll"],
        highlights: [
          "Live staff roster with clock-in toggles",
          "Branch-level attendance reporting",
          "Leave and approval workflows",
          "Payroll-ready CSV exports",
          "Mobile field app integration",
          "Kiosk fallback for shared sites",
        ],
        techStack: [
          { name: "Laravel 11", role: "API & business logic" },
          { name: "PostgreSQL", role: "Attendance ledger" },
          { name: "Flutter", role: "Field clock-in app" },
          { name: "React", role: "HR dashboard" },
          { name: "Pusher / Echo", role: "Realtime roster" },
        ],
        metrics: [
          { label: "Payroll close time", value: "−87%", sub: "1 day → 2 hours" },
          { label: "Staff managed", value: "180+", sub: "across 6 branches" },
          { label: "Attendance accuracy", value: "99.2%", sub: "from ~88%" },
          { label: "Branches live", value: "6", sub: "rolled out in 8 weeks" },
        ],
        process: [
          { title: "Inventory", body: "Catalogued every existing attendance source — biometric, sheet, WhatsApp." },
          { title: "Reconcile", body: "Built a one-time importer to seed the ledger from historical sources." },
          { title: "Ship", body: "Web HR + Flutter field app launched together so no branch was left behind." },
          { title: "Iterate", body: "Weekly review with HR for 6 weeks to tune the approval and exception flows." },
        ],
        testimonial: {
          quote: "I used to dread the 15th and the 30th. Now payroll is just a button.",
          author: "M. Achieng'",
          role: "HR Manager",
        },
        visitUrl: "https://github.com/Gabuu94",
      }}
    >
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat label="Headcount" value={String(staff.length)} />
        <Stat label="Clocked in" value={`${inCount} / ${staff.length}`} sub="now" />
        <Stat label="Branches" value={String(branches.length)} />
        <Stat label="Attendance" value={`${staff.length ? Math.round((inCount / staff.length) * 100) : 0}%`} sub="today" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-accent" />
            <h3 className="font-serif text-xl">Live presence</h3>
          </div>
          <div className="mt-5 flex flex-col items-center">
            <div className="text-foreground">
              <Donut value={inCount} total={staff.length || 1} label="on-site" />
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              {inCount} on-site / {staff.length} total
            </p>
          </div>
        </Card>
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-accent" />
            <h3 className="font-serif text-xl">By branch</h3>
          </div>
          <div className="mt-5">
            <Bars
              values={branches.map((b) => b[1].in)}
              labels={branches.map((b) => b[0])}
            />
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {branches.map(([name, b]) => (
              <div key={name} className="rounded-lg border border-border bg-background p-3 text-xs">
                <p className="font-semibold">{name}</p>
                <p className="text-muted-foreground">{b.in} / {b.total} on-site</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-accent" />
            <h3 className="font-serif text-2xl">Roster</h3>
          </div>
          <div className="flex gap-2">
            {(["all", "in", "out"] as const).map((f) => (
              <Button key={f} variant={filter === f ? "primary" : "ghost"} onClick={() => setFilter(f)}>
                {f.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>
        {isLoading ? (
          <p className="mt-5 text-sm text-muted-foreground">Loading roster…</p>
        ) : (
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {filtered.map((e: Staff) => (
              <div key={e.id} className="flex items-center justify-between rounded-xl border border-border bg-background p-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-foreground font-serif text-xs text-background">
                    {e.full_name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div>
                    <div className="font-medium">{e.full_name}</div>
                    <div className="text-xs text-muted-foreground">
                      {e.role} · {e.branch}{e.last_in && e.clocked_in ? ` · in @ ${e.last_in}` : ""}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 rounded-full ${e.clocked_in ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground/40"}`} />
                  <Button variant="ghost" onClick={() => toggle.mutate(e)} disabled={toggle.isPending}>
                    {e.clocked_in ? "CLOCK OUT" : "CLOCK IN"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </AppShell>
  );
}
