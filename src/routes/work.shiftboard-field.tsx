import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Button, Card } from "@/components/AppShell";

export const Route = createFileRoute("/work/shiftboard-field")({
  head: () => ({ meta: [{ title: "Shiftboard Field — mobile attendance" }] }),
  component: Field,
});

function Field() {
  const [punches, setPunches] = useState<{ id: number; type: "in" | "out"; time: string; loc: string }[]>([
    { id: 1, type: "in", time: "07:54", loc: "Westlands HQ" },
  ]);
  const last = punches[punches.length - 1];
  const next: "in" | "out" = last?.type === "in" ? "out" : "in";

  const punch = () => setPunches([...punches, { id: Date.now(), type: next, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), loc: "Westlands HQ · ±12m" }]);

  return (
    <AppShell title="Shiftboard Field" tag="Mobile" description="Field-team companion for clocking in, logging location and syncing back to the HR backend.">
      <div className="mx-auto grid max-w-md gap-4">
        <div className="rounded-[2.2rem] border-4 border-foreground bg-background p-5 shadow-xl">
          <div className="mx-auto h-1.5 w-16 rounded-full bg-muted" />
          <div className="mt-5 text-center">
            <p className="eyebrow">Good morning, Brian</p>
            <p className="mt-2 font-serif text-3xl">Westlands HQ</p>
            <p className="text-xs text-muted-foreground">Geofenced · within 12m</p>
          </div>
          <button
            onClick={punch}
            className={`mt-6 grid h-44 w-44 mx-auto place-items-center rounded-full font-serif text-2xl text-background shadow-lg transition-transform active:scale-95 ${next === "in" ? "bg-emerald-600" : "bg-rose-600"}`}
          >
            CLOCK {next.toUpperCase()}
          </button>

          <div className="mt-6">
            <p className="eyebrow">Today</p>
            <ul className="mt-3 space-y-2">
              {punches.map((p) => (
                <li key={p.id} className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-2.5 text-sm">
                  <span className={`chip ${p.type === "in" ? "" : "!bg-rose-100 !text-rose-900"}`}>{p.type.toUpperCase()}</span>
                  <span className="font-medium">{p.time}</span>
                  <span className="text-xs text-muted-foreground">{p.loc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Card>
          <p className="text-xs text-muted-foreground">Offline punches are queued and synced when connectivity returns. Geofence rules per branch.</p>
        </Card>
      </div>
    </AppShell>
  );
}
