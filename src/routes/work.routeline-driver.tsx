import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Button, Card, Input, Select } from "@/components/AppShell";
import { Fuel, MapPin, Receipt, Wifi, WifiOff } from "lucide-react";

export const Route = createFileRoute("/work/routeline-driver")({
  head: () => ({ meta: [{ title: "Routeline Driver — companion" }] }),
  component: Driver,
});

type Log = { id: number; kind: string; amount: number; note: string; time: string };

function Driver() {
  const [logs, setLogs] = useState<Log[]>([
    { id: 1, kind: "Fuel", amount: 5400, note: "Shell, Naivasha", time: "08:14" },
    { id: 2, kind: "Toll", amount: 320, note: "Mai Mahiu", time: "09:32" },
  ]);
  const [kind, setKind] = useState("Fuel");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [online, setOnline] = useState(true);
  const total = logs.reduce((a, l) => a + l.amount, 0);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setLogs([{ id: Date.now(), kind, amount: Number(amount), note, time }, ...logs]);
    setAmount(""); setNote("");
  };

  return (
    <AppShell
      title="Routeline Driver"
      tag="Mobile · Flutter"
      description="The driver-side companion to the Routeline fleet dashboard. Log trip expenses in seconds — fully offline, sync when back on network."
      caseStudy={{
        category: "Mobile App",
        scope: "Driver companion app",
        role: "Mobile engineer",
        timeline: "6 weeks · 2024",
        overview:
          "Routeline Driver is the driver-side companion to the Routeline fleet dashboard. Drivers log fuel, tolls and trip notes on the go and the back office reconciles entries later — no more pile of receipts to digitise at month-end.",
        problem:
          "Drivers carried weeks of paper receipts before reaching the depot. Half were lost, fraud was hard to prove, and finance hated month-end.",
        solution:
          "A driver-first app: 3 taps to log an expense, photo of the receipt, GPS-stamped, queued offline until the next signal.",
        businessValue:
          "Captures fuel and trip spend at the source so reconciliation isn't a month-end scramble.",
        outcome:
          "Receipt loss dropped to zero. Finance now reconciles weekly in 90 minutes instead of a 2-day month-end.",
        tags: ["Flutter", "Offline", "GPS", "Logistics"],
        highlights: [
          "Quick expense capture (3 taps)",
          "Photo receipt with OCR",
          "Per-trip notes and GPS stamps",
          "Offline-first with auto-sync",
          "Pushes directly to fleet backend",
          "Driver-friendly UI in Swahili / English",
        ],
        techStack: [
          { name: "Flutter 3", role: "Cross-platform UI" },
          { name: "Hive / SQLite", role: "Offline queue" },
          { name: "Geolocator", role: "GPS stamping" },
          { name: "Routeline API", role: "Sync target" },
        ],
        metrics: [
          { label: "Receipt loss", value: "0%", sub: "from ~18%" },
          { label: "Reconciliation", value: "90 min", sub: "from 2 days" },
          { label: "Drivers using", value: "24", sub: "across 3 depots" },
          { label: "Offline reliability", value: "100%", sub: "zero data loss" },
        ],
        process: [
          { title: "Ride along", body: "Spent two days riding with drivers to understand pump-side reality." },
          { title: "Design", body: "Big-tap UI tested with gloves on, in sun glare, with one thumb." },
          { title: "Offline", body: "Built sync engine first — feature work came after the queue was bulletproof." },
          { title: "Ship", body: "Side-loaded to 6 drivers for 2 weeks, refined, then rolled out to the fleet." },
        ],
        visitUrl: "https://github.com/Gabuu94",
      }}
    >
      <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-start">
        <div className="mx-auto w-full max-w-sm">
          <div className="relative rounded-[2.5rem] border-[10px] border-foreground bg-background p-5 shadow-2xl">
            <div className="absolute left-1/2 top-1 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-foreground" />
            <div className="mt-4 flex items-center justify-between px-2 text-[10px]">
              <span className="text-muted-foreground">9:41 · Naivasha</span>
              <button
                onClick={() => setOnline((v) => !v)}
                className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${online ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
              >
                {online ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
                {online ? "SYNCED" : "OFFLINE · QUEUED"}
              </button>
            </div>

            <div className="mt-3 rounded-2xl bg-gradient-to-br from-foreground to-foreground/80 p-5 text-background">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-background/60">
                <MapPin className="h-3 w-3" /> Trip · NBO → KSM
              </div>
              <p className="mt-2 font-serif text-4xl">KES {total.toLocaleString()}</p>
              <p className="text-xs text-background/60">{logs.length} entries this trip</p>
            </div>

            <form className="mt-4 space-y-2" onSubmit={add}>
              <Select value={kind} onChange={(e) => setKind(e.target.value)}>
                {["Fuel", "Toll", "Repair", "Meals", "Other"].map((k) => <option key={k}>{k}</option>)}
              </Select>
              <Input type="number" placeholder="Amount (KES)" value={amount} onChange={(e) => setAmount(e.target.value)} />
              <Input placeholder="Note (optional)" value={note} onChange={(e) => setNote(e.target.value)} />
              <Button type="submit" className="w-full">
                <Receipt className="h-3.5 w-3.5" /> LOG EXPENSE
              </Button>
            </form>

            <ul className="mt-4 space-y-2 max-h-56 overflow-y-auto">
              {logs.map((l) => (
                <li key={l.id} className="flex items-center justify-between gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-sm">
                  <span className="chip flex-shrink-0">{l.kind}</span>
                  <span className="flex-1 text-xs text-muted-foreground truncate">{l.note || "—"}</span>
                  <span className="text-xs text-muted-foreground">{l.time}</span>
                  <span className="font-semibold">KES {l.amount.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <div className="flex items-center gap-2">
              <Fuel className="h-5 w-5 text-accent" />
              <h3 className="font-serif text-2xl">Try it</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Tap the wifi pill to toggle offline mode. Entries queue locally and would sync when back on network — fleet dashboard updates the moment they arrive.
            </p>
          </Card>
          <Card>
            <h3 className="font-serif text-xl">Driver-first design</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>· Big tap targets — works with gloves at the pump</li>
              <li>· Defaults to last category for one-tap repeat logs</li>
              <li>· Photo of the receipt attached automatically</li>
              <li>· Trip totals visible without leaving the entry screen</li>
            </ul>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
