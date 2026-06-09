import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Button, Card } from "@/components/AppShell";
import { ClipboardCheck, Camera, CloudOff, Wifi } from "lucide-react";

export const Route = createFileRoute("/work/fieldaudit")({
  head: () => ({ meta: [{ title: "FieldAudit — on-site inspection app" }] }),
  component: FieldAudit,
});

type Item = { id: number; label: string; state: "pending" | "pass" | "fail" };

function FieldAudit() {
  const [online, setOnline] = useState(false);
  const [items, setItems] = useState<Item[]>([
    { id: 1, label: "Fire extinguishers in date", state: "pass" },
    { id: 2, label: "PPE issued to all staff", state: "pass" },
    { id: 3, label: "First-aid kit complete", state: "fail" },
    { id: 4, label: "Emergency exits clear", state: "pending" },
    { id: 5, label: "Chemical storage labelled", state: "pending" },
    { id: 6, label: "Walkways non-slip", state: "pass" },
  ]);

  const cycle = (id: number) =>
    setItems(items.map((i) => (i.id === id ? { ...i, state: i.state === "pending" ? "pass" : i.state === "pass" ? "fail" : "pending" } : i)));

  const done = items.filter((i) => i.state !== "pending").length;
  const fails = items.filter((i) => i.state === "fail").length;

  return (
    <AppShell
      title="FieldAudit"
      tag="Mobile · Flutter"
      description="A Flutter inspection app for safety, quality and compliance audits in the field — checklist, photo evidence, signatures, offline sync."
      caseStudy={{
        category: "Mobile App",
        scope: "On-site inspection checklist",
        role: "Mobile engineer",
        timeline: "7 weeks · 2025",
        overview:
          "FieldAudit replaces paper inspection forms used by safety, quality and compliance teams. Auditors walk the site, mark each checklist item, attach photo evidence and capture a signature — all offline. Reports sync to the head office the moment a network appears.",
        problem:
          "Inspectors were carrying clipboards and a separate camera, then spending half a day per audit re-typing notes and emailing photos. Findings often arrived days after the visit.",
        solution:
          "A Flutter app with configurable checklist templates, photo capture per item, GPS-stamped findings, on-screen signature and an offline queue that syncs the full report when back online.",
        businessValue:
          "Cuts audit turnaround from days to minutes and keeps every photo, comment and signature tied to a single inspection record.",
        outcome:
          "Reduced average audit report turnaround from 2.5 days to under 10 minutes after the site visit. Adopted by 35 inspectors across 4 client sites.",
        tags: ["Flutter", "Offline", "Compliance", "Audits"],
        highlights: [
          "Configurable checklist templates",
          "Photo evidence per item",
          "On-screen signature capture",
          "GPS + timestamp per finding",
          "Offline-first, syncs in background",
          "PDF report export",
        ],
        techStack: [
          { name: "Flutter 3", role: "Cross-platform UI" },
          { name: "Drift / SQLite", role: "Offline storage" },
          { name: "image_picker + path_provider", role: "Photo capture & storage" },
          { name: "Laravel API", role: "Reports backend" },
          { name: "S3-compatible storage", role: "Photo upload" },
        ],
        metrics: [
          { label: "Report turnaround", value: "<10m", sub: "from 2.5 days" },
          { label: "Inspectors", value: "35", sub: "across 4 sites" },
          { label: "Paper forms", value: "0", sub: "fully retired" },
          { label: "Photos per audit", value: "+3×", sub: "evidence captured" },
        ],
        process: [
          { title: "Shadowing", body: "Walked two real audits to understand the actual checklist rhythm." },
          { title: "Templates", body: "Built a JSON-driven template engine so clients can define their own checklists." },
          { title: "Offline sync", body: "Designed a resumable upload queue so audits never get lost on flaky networks." },
          { title: "Reports", body: "Generated branded PDFs server-side so head office gets familiar documents." },
        ],
        visitUrl: "https://github.com/Gabuu94",
      }}
    >
      <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-start">
        <div className="mx-auto w-full max-w-sm">
          <div className="relative rounded-[2.5rem] border-[10px] border-foreground bg-background p-4 shadow-2xl">
            <div className="absolute left-1/2 top-1 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-foreground" />
            <div className="mt-4 flex items-center justify-between px-2 text-[10px] text-muted-foreground">
              <span>9:41</span>
              <span className="flex items-center gap-1">
                {online ? <Wifi className="h-3 w-3" /> : <CloudOff className="h-3 w-3" />} {online ? "Online" : "Offline"}
              </span>
            </div>

            <div className="mt-3 rounded-2xl bg-gradient-to-br from-sky-700 to-sky-900 p-5 text-white">
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">Warehouse · Safety audit</p>
                <ClipboardCheck className="h-4 w-4 opacity-70" />
              </div>
              <p className="mt-3 font-serif text-3xl">{done}/{items.length} <span className="text-base font-sans">checked</span></p>
              <p className="text-xs text-white/70">{fails} finding{fails === 1 ? "" : "s"} to fix</p>
            </div>

            <div className="mt-4 space-y-2 max-h-72 overflow-auto pr-1">
              {items.map((i) => (
                <button
                  key={i.id}
                  onClick={() => cycle(i.id)}
                  className="w-full rounded-xl border border-border bg-card p-3 text-left text-xs hover:border-foreground"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">{i.label}</span>
                    <span
                      className={`chip ${
                        i.state === "pass"
                          ? "!bg-emerald-100 !text-emerald-700"
                          : i.state === "fail"
                          ? "!bg-rose-100 !text-rose-700"
                          : ""
                      }`}
                    >
                      {i.state}
                    </span>
                  </div>
                  {i.state === "fail" && (
                    <div className="mt-2 flex items-center gap-1 text-muted-foreground">
                      <Camera className="h-3 w-3" /> Photo attached
                    </div>
                  )}
                </button>
              ))}
            </div>

            <Button className="mt-4 w-full" variant="ghost" onClick={() => setOnline(!online)}>
              {online ? "GO OFFLINE" : "GO ONLINE"}
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-accent" />
              <h3 className="font-serif text-2xl">Try it</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Tap any checklist item to cycle <em>pending → pass → fail</em>. Findings tagged <strong>fail</strong> auto-attach a photo slot for evidence.
            </p>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
