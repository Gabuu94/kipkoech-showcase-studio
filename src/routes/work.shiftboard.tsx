import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AppShell, Button, Card, Stat } from "@/components/AppShell";
import { fetchStaff, toggleStaff, type Staff } from "@/lib/demo-api";
import cover from "@/assets/cover-shiftboard.jpg";

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
  const filtered = filter === "all" ? staff : staff.filter((s) => (filter === "in" ? s.clocked_in : !s.clocked_in));

  return (
    <AppShell title="Shiftboard HRMS" tag="HR & Attendance" description="Live roster persisted to a database. Clock-in toggles update across every browser." cover={cover}>
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Headcount" value={String(staff.length)} />
        <Stat label="Clocked in" value={`${inCount} / ${staff.length}`} />
        <Stat label="Branches" value={String(new Set(staff.map((s) => s.branch)).size || 0)} />
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
        {isLoading ? (
          <p className="mt-5 text-sm text-muted-foreground">Loading roster…</p>
        ) : (
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {filtered.map((e: Staff) => (
              <div key={e.id} className="flex items-center justify-between rounded-xl border border-border bg-background p-4">
                <div>
                  <div className="font-medium">{e.full_name}</div>
                  <div className="text-xs text-muted-foreground">
                    {e.role} · {e.branch}{e.last_in && e.clocked_in ? ` · in @ ${e.last_in}` : ""}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 rounded-full ${e.clocked_in ? "bg-emerald-500" : "bg-muted-foreground/40"}`} />
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
