import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Card } from "@/components/AppShell";
import { MapPin, Wifi } from "lucide-react";

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

  const punch = () =>
    setPunches([
      ...punches,
      {
        id: Date.now(),
        type: next,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        loc: "Westlands HQ · ±12m",
      },
    ]);

  const minutesWorked = punches.reduce((acc, p, i) => {
    if (p.type === "out" && punches[i - 1]?.type === "in") {
      const [hO, mO] = p.time.split(":").map(Number);
      const [hI, mI] = punches[i - 1].time.split(":").map(Number);
      return acc + (hO * 60 + mO - (hI * 60 + mI));
    }
    return acc;
  }, 0);

  return (
    <AppShell
      title="Shiftboard Field"
      tag="Mobile · Flutter"
      description="Field-team companion for clocking in, logging location and syncing back to the HR backend. Geofenced, offline-friendly, supervisor-aware."
      gallery={[
        { src: gal1, alt: "Site worker clocking in on phone", caption: "Geofenced clock-in at a construction site" },
        { src: gal2, alt: "Supervisor viewing live attendance map", caption: "Supervisor's live attendance map across active sites" },
      ]}
      caseStudy={{
        category: "Mobile App",
        scope: "Field attendance companion",
        role: "Mobile engineer",
        timeline: "4 weeks · 2024",
        overview:
          "Shiftboard Field is the staff-facing mobile app paired with the Shiftboard HR backend. Field teams clock in with a geofence check, log location and sync events back to HR — so supervisors see who is on-site without phone calls.",
        problem:
          "Field staff at construction and security sites were 'clocking in' via WhatsApp screenshots, often from home. Supervisors had no real on-site view.",
        solution:
          "Geofenced clock-in: app only registers an IN punch within the branch's geofence radius. Every event is GPS-stamped and visible to supervisors in real time.",
        businessValue:
          "Replaces paper attendance and phone check-ins with verified, location-aware clock-in events.",
        outcome:
          "Buddy-punching dropped to near zero. Supervisors stopped calling for status — the live board answers it.",
        tags: ["Flutter", "Geofence", "Attendance", "HRMS"],
        highlights: [
          "Geofenced clock-in (radius per branch)",
          "GPS-stamped events",
          "Offline-friendly capture",
          "Sync to Shiftboard HR backend",
          "Supervisor live view",
          "Leave & shift swap requests",
        ],
        techStack: [
          { name: "Flutter 3", role: "Cross-platform UI" },
          { name: "Geolocator + Geofence", role: "Location validation" },
          { name: "Hive", role: "Offline event queue" },
          { name: "Shiftboard API", role: "HR backend sync" },
        ],
        metrics: [
          { label: "Buddy-punching", value: "~0%", sub: "from frequent" },
          { label: "Field staff using", value: "120", sub: "across 6 branches" },
          { label: "GPS accuracy", value: "<15m", sub: "median" },
          { label: "Sync reliability", value: "100%", sub: "zero event loss" },
        ],
        process: [
          { title: "Site visits", body: "Visited 3 sites to understand connectivity, glare and one-thumb realities." },
          { title: "Geofence", body: "Per-branch geofence radius tuned for urban vs rural GPS variance." },
          { title: "Offline", body: "Punches queue locally and replay on next sync — never blocks the worker." },
          { title: "Supervisor loop", body: "Live board on the web side validated the on-site view supervisors actually wanted." },
        ],
        visitUrl: "https://github.com/Gabuu94",
      }}
    >
      <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-start">
        <div className="mx-auto w-full max-w-sm">
          <div className="relative rounded-[2.5rem] border-[10px] border-foreground bg-background p-5 shadow-2xl">
            <div className="absolute left-1/2 top-1 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-foreground" />
            <div className="mt-4 flex items-center justify-between px-2 text-[10px] text-muted-foreground">
              <span>9:41</span>
              <span className="flex items-center gap-1"><Wifi className="h-3 w-3" /> Synced</span>
            </div>

            <div className="mt-5 text-center">
              <p className="eyebrow">Good morning, Brian</p>
              <p className="mt-2 flex items-center justify-center gap-1.5 font-serif text-3xl">
                <MapPin className="h-5 w-5 text-emerald-600" /> Westlands HQ
              </p>
              <p className="text-xs text-muted-foreground">Inside geofence · ±12m</p>
            </div>

            <button
              onClick={punch}
              className={`mt-6 grid h-44 w-44 mx-auto place-items-center rounded-full font-serif text-2xl text-background shadow-lg transition-all active:scale-95 ${
                next === "in"
                  ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-300"
                  : "bg-rose-600 hover:bg-rose-700 shadow-rose-300"
              }`}
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl">CLOCK</span>
                <span className="text-xl">{next.toUpperCase()}</span>
              </div>
            </button>

            <p className="mt-3 text-center text-[10px] text-muted-foreground">
              {Math.floor(minutesWorked / 60)}h {minutesWorked % 60}m worked today
            </p>

            <div className="mt-6">
              <p className="eyebrow">Today's punches</p>
              <ul className="mt-3 space-y-2 max-h-40 overflow-y-auto">
                {punches.map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-sm">
                    <span className={`chip ${p.type === "in" ? "!bg-emerald-100 !text-emerald-900" : "!bg-rose-100 !text-rose-900"}`}>
                      {p.type.toUpperCase()}
                    </span>
                    <span className="font-semibold">{p.time}</span>
                    <span className="text-[10px] text-muted-foreground">{p.loc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <h3 className="font-serif text-2xl">Try it</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Tap the big circle to clock in and out. In the real app, this only succeeds when the device is inside the branch's geofence — supervisors see the punch on their live board within seconds.
            </p>
          </Card>
          <Card>
            <h3 className="font-serif text-xl">Built for the field</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>· One-thumb operable, glove-friendly tap target</li>
              <li>· Works fully offline — punches queue and sync</li>
              <li>· GPS accuracy tuned per branch (urban vs rural)</li>
              <li>· Optional selfie attached for high-security sites</li>
            </ul>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
