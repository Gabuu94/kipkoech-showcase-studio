import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Button, Card, Input, Select } from "@/components/AppShell";

export const Route = createFileRoute("/work/routeline-driver")({
  head: () => ({ meta: [{ title: "Routeline Driver — companion" }] }),
  component: Driver,
});

type Log = { id: number; kind: string; amount: number; note: string };

function Driver() {
  const [logs, setLogs] = useState<Log[]>([
    { id: 1, kind: "Fuel", amount: 5400, note: "Shell, Naivasha" },
    { id: 2, kind: "Toll", amount: 320, note: "Mai Mahiu" },
  ]);
  const [kind, setKind] = useState("Fuel");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const total = logs.reduce((a, l) => a + l.amount, 0);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    setLogs([{ id: Date.now(), kind, amount: Number(amount), note }, ...logs]);
    setAmount(""); setNote("");
  };

  return (
    <AppShell title="Routeline Driver" tag="Mobile" description="The driver-side companion. Log trip expenses fast and let the back office reconcile later.">
      <div className="mx-auto grid max-w-md gap-4">
        <div className="rounded-[2.2rem] border-4 border-foreground bg-background p-5 shadow-xl">
          <div className="mx-auto h-1.5 w-16 rounded-full bg-muted" />
          <div className="mt-5 rounded-2xl bg-foreground p-5 text-background">
            <p className="text-[10px] uppercase tracking-[0.2em] text-background/60">Trip · NBO → KSM</p>
            <p className="mt-2 font-serif text-4xl">KES {total.toLocaleString()}</p>
            <p className="text-xs text-background/60">{logs.length} entries this trip</p>
          </div>

          <form className="mt-4 space-y-2" onSubmit={add}>
            <Select value={kind} onChange={(e) => setKind(e.target.value)}>
              {["Fuel", "Toll", "Repair", "Meals", "Other"].map((k) => <option key={k}>{k}</option>)}
            </Select>
            <Input type="number" placeholder="Amount (KES)" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <Input placeholder="Note (optional)" value={note} onChange={(e) => setNote(e.target.value)} />
            <Button type="submit" className="w-full">LOG EXPENSE</Button>
          </form>

          <ul className="mt-4 space-y-2">
            {logs.map((l) => (
              <li key={l.id} className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-2.5 text-sm">
                <span className="chip">{l.kind}</span>
                <span className="text-xs text-muted-foreground truncate">{l.note}</span>
                <span className="font-medium">KES {l.amount.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
        <Card>
          <p className="text-xs text-muted-foreground">Works offline; entries sync to Routeline dashboard for reconciliation when back on network.</p>
        </Card>
      </div>
    </AppShell>
  );
}
