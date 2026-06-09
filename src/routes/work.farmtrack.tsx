import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Button, Card } from "@/components/AppShell";
import { Sprout, Wifi, CloudOff, Plus } from "lucide-react";

export const Route = createFileRoute("/work/farmtrack")({
  head: () => ({ meta: [{ title: "FarmTrack — agri logging for smallholders" }] }),
  component: FarmTrack,
});

type Entry = { id: number; crop: string; activity: string; qty: string; when: string; synced: boolean };

const seed: Entry[] = [
  { id: 1, crop: "Maize", activity: "Top-dressed CAN", qty: "50 kg", when: "Today 08:12", synced: true },
  { id: 2, crop: "Beans", activity: "Sprayed pesticide", qty: "2 L", when: "Yesterday", synced: true },
  { id: 3, crop: "Tomato", activity: "Harvested", qty: "85 kg", when: "2 days ago", synced: true },
];

function FarmTrack() {
  const [online, setOnline] = useState(true);
  const [entries, setEntries] = useState<Entry[]>(seed);

  const addEntry = () => {
    const crops = ["Maize", "Beans", "Tomato", "Kale", "Onion"];
    const acts = ["Planted", "Weeded", "Top-dressed CAN", "Sprayed pesticide", "Harvested"];
    setEntries([
      {
        id: Date.now(),
        crop: crops[Math.floor(Math.random() * crops.length)],
        activity: acts[Math.floor(Math.random() * acts.length)],
        qty: `${Math.floor(Math.random() * 90) + 5} kg`,
        when: "Just now",
        synced: online,
      },
      ...entries,
    ]);
  };

  const sync = () => setEntries(entries.map((e) => ({ ...e, synced: true })));
  const pending = entries.filter((e) => !e.synced).length;

  return (
    <AppShell
      title="FarmTrack"
      tag="Mobile · Flutter"
      description="A Flutter app for smallholder farmers to log crop activity, inputs and yields — offline first, syncing when network returns."
      caseStudy={{
        category: "Mobile App",
        scope: "Offline-first agri logging",
        role: "Mobile engineer",
        timeline: "6 weeks · 2024",
        overview:
          "FarmTrack lets smallholder farmers record every input, activity and harvest from the field. The app keeps working without signal and syncs to a central record when the phone reconnects, giving cooperatives clean yield data per farmer.",
        problem:
          "Cooperative officers were collecting yield data on paper, then re-typing it weeks later. Records were lost, inputs weren't traceable, and farmers had no history of their own plot.",
        solution:
          "A Flutter app with a simple log-an-activity flow, offline SQLite storage, photo capture per entry and a background sync to the cooperative's backend.",
        businessValue:
          "Cooperatives get accurate per-farmer yield and input data without paper forms. Farmers see their own history and trends on the same device.",
        outcome:
          "Replaced paper logbooks for 480 farmers across 3 cooperatives. Data-entry lag dropped from 2 weeks to under an hour after signal returns.",
        tags: ["Flutter", "Offline", "AgriTech", "SQLite"],
        highlights: [
          "Tap-to-log activity flow",
          "Per-plot crop history",
          "Photo evidence per entry",
          "Works fully offline",
          "Background sync to backend",
          "Per-farmer yield report",
        ],
        techStack: [
          { name: "Flutter 3", role: "Cross-platform UI" },
          { name: "Drift / SQLite", role: "Offline storage" },
          { name: "Riverpod", role: "State management" },
          { name: "Laravel API", role: "Cooperative backend" },
        ],
        metrics: [
          { label: "Farmers onboarded", value: "480", sub: "across 3 co-ops" },
          { label: "Data-entry lag", value: "<1h", sub: "from ~2 weeks" },
          { label: "Offline entries", value: "100%", sub: "queued & synced" },
          { label: "Paper forms", value: "0", sub: "replaced fully" },
        ],
        process: [
          { title: "Field visits", body: "Walked plots with extension officers to understand the actual paper flow." },
          { title: "Offline first", body: "Every screen works without signal; sync is a background concern." },
          { title: "Pilot", body: "Ran a 4-week pilot with one cooperative before wider rollout." },
          { title: "Training", body: "30-minute group sessions in local language, with printed cheat sheets." },
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

            <div className="mt-3 rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-900 p-5 text-white">
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">My plot · Kericho</p>
                <Sprout className="h-4 w-4 opacity-70" />
              </div>
              <p className="mt-3 font-serif text-3xl">{entries.length} entries</p>
              <p className="text-xs text-white/70">{pending > 0 ? `${pending} pending sync` : "All synced"}</p>
            </div>

            <div className="mt-4 space-y-2 max-h-72 overflow-auto pr-1">
              {entries.map((e) => (
                <div key={e.id} className="rounded-xl border border-border bg-card p-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{e.crop} · {e.activity}</span>
                    <span className={`chip ${e.synced ? "" : "!bg-amber-100 !text-amber-700"}`}>{e.synced ? "synced" : "queued"}</span>
                  </div>
                  <div className="mt-1 flex justify-between text-muted-foreground">
                    <span>{e.qty}</span>
                    <span>{e.when}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button variant="ghost" onClick={() => setOnline(!online)}>{online ? "GO OFFLINE" : "GO ONLINE"}</Button>
              <Button onClick={addEntry}><Plus className="mr-1 h-3 w-3" /> LOG</Button>
            </div>
            {pending > 0 && online && (
              <Button className="mt-2 w-full" onClick={sync}>SYNC {pending}</Button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <div className="flex items-center gap-2">
              <Sprout className="h-5 w-5 text-accent" />
              <h3 className="font-serif text-2xl">Try it</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Tap <strong>LOG</strong> to record a field activity. Switch to offline mode and keep logging — entries queue up and sync when you go back online.
            </p>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
