import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell, Button, Card, Stat } from "@/components/AppShell";

export const Route = createFileRoute("/work/shiftboard")({
  head: () => ({ meta: [{ title: "Shiftboard HRMS — demo" }] }),
  component: Shiftboard,
});

type Employee = { id: number; name: string; role: string; branch: string; status: "in" | "out"; lastIn?: string };

const seed: Employee[] = [
  { id: 1, name: "Achieng' Otieno", role: "Cashier", branch: "Westlands", status: "in", lastIn: "08:02" },
  { id: 2, name: "Brian Kemboi", role: "Supervisor", branch: "Westlands", status: "in", lastIn: "07:54" },
  { id: 3, name: "Cynthia Wanjiku", role: "Stock", branch: "Kilimani", status: "out" },
  { id: 4, name: "David Mwangi", role: "Driver", branch: "CBD", status: "in", lastIn: "08:11" },
  { id: 5, name: "Esther Chebet", role: "Cashier", branch: "Kilimani", status: "out" },
  { id: 6, name: "Felix Otieno", role: "Supervisor", branch: "CBD", status: "in", lastIn: "07:48" },
];

function Shiftboard() {
  const [staff, setStaff] = useState(seed);
  const [filter, setFilter] = useState<"all" | "in" | "out">("all");

  const toggle = (id: number) =>
    setStaff((s) =>
      s.map((e) =>
        e.id === id
          ? { ...e, status: e.status === "in" ? "out" : "in", lastIn: e.status === "out" ? new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : e.lastIn }
          : e,
      ),
    );

  const inCount = useMemo(() => staff.filter((s) => s.status === "in").length, [staff]);
  const filtered = filter === "all" ? staff : staff.filter((s) => s.status === filter);

  return (
    <AppShell title="Shiftboard HRMS" tag="HR & Attendance" description="Live attendance roster across branches with one-tap clock in/out and payroll signals.">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Headcount" value={String(staff.length)} />
        <Stat label="Clocked in" value={`${inCount} / ${staff.length}`} />
        <Stat label="Branches" value={String(new Set(staff.map((s) => s.branch)).size)} />
      </div>

      <Card className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-serif text-2xl">Roster</h3>
          <div className="flex gap-2">
            {(["all", "in", "out"] as const).map((f) => (
              <Button key={f} variant={filter === f ? "primary" : "ghost"} onClick={() => setFilter(f)}>
                {f.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {filtered.map((e) => (
            <div key={e.id} className="flex items-center justify-between rounded-xl border border-border bg-background p-4">
              <div>
                <div className="font-medium">{e.name}</div>
                <div className="text-xs text-muted-foreground">
                  {e.role} · {e.branch} {e.lastIn && e.status === "in" ? `· in @ ${e.lastIn}` : ""}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`h-2.5 w-2.5 rounded-full ${e.status === "in" ? "bg-emerald-500" : "bg-muted-foreground/40"}`} />
                <Button variant="ghost" onClick={() => toggle(e.id)}>
                  {e.status === "in" ? "CLOCK OUT" : "CLOCK IN"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}
