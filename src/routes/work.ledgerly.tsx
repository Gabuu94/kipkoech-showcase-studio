import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell, Button, Card, Input, Select, Stat } from "@/components/AppShell";

export const Route = createFileRoute("/work/ledgerly")({
  head: () => ({ meta: [{ title: "Ledgerly — Bookkeeping demo" }] }),
  component: Ledgerly,
});

type Tx = { id: number; date: string; desc: string; category: string; type: "income" | "expense"; amount: number };

const seed: Tx[] = [
  { id: 1, date: "2026-06-01", desc: "Client retainer — Kazana", category: "Sales", type: "income", amount: 180000 },
  { id: 2, date: "2026-06-02", desc: "AWS hosting", category: "Infra", type: "expense", amount: 12400 },
  { id: 3, date: "2026-06-03", desc: "Invoice #INV-204", category: "Sales", type: "income", amount: 64500 },
  { id: 4, date: "2026-06-04", desc: "Office rent", category: "Admin", type: "expense", amount: 35000 },
  { id: 5, date: "2026-06-05", desc: "Stripe payout fees", category: "Fees", type: "expense", amount: 2150 },
];

function Ledgerly() {
  const [txs, setTxs] = useState(seed);
  const [form, setForm] = useState({ desc: "", category: "Sales", type: "income" as Tx["type"], amount: "" });

  const totals = useMemo(() => {
    const income = txs.filter((t) => t.type === "income").reduce((a, t) => a + t.amount, 0);
    const expense = txs.filter((t) => t.type === "expense").reduce((a, t) => a + t.amount, 0);
    return { income, expense, net: income - expense };
  }, [txs]);

  const fmt = (n: number) => "KES " + n.toLocaleString();

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(form.amount);
    if (!form.desc || !amt) return;
    setTxs([
      { id: Date.now(), date: new Date().toISOString().slice(0, 10), desc: form.desc, category: form.category, type: form.type, amount: amt },
      ...txs,
    ]);
    setForm({ desc: "", category: "Sales", type: "income", amount: "" });
  };

  return (
    <AppShell title="Ledgerly" tag="Bookkeeping" description="Lightweight ledger for SMEs — record income & expenses and read a live P&L.">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Income" value={fmt(totals.income)} />
        <Stat label="Expenses" value={fmt(totals.expense)} />
        <Stat label="Net" value={fmt(totals.net)} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_2fr]">
        <Card>
          <h3 className="font-serif text-2xl">New entry</h3>
          <form className="mt-5 space-y-3" onSubmit={add}>
            <Input placeholder="Description" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as Tx["type"] })}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </Select>
              <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {["Sales", "Infra", "Admin", "Fees", "Travel", "Other"].map((c) => <option key={c}>{c}</option>)}
              </Select>
            </div>
            <Input type="number" placeholder="Amount (KES)" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
            <Button type="submit">RECORD</Button>
          </form>
        </Card>

        <Card>
          <h3 className="font-serif text-2xl">Ledger</h3>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr><th className="py-2">Date</th><th>Description</th><th>Category</th><th className="text-right">Amount</th></tr>
              </thead>
              <tbody>
                {txs.map((t) => (
                  <tr key={t.id} className="border-t border-border">
                    <td className="py-3">{t.date}</td>
                    <td>{t.desc}</td>
                    <td><span className="chip">{t.category}</span></td>
                    <td className={`text-right font-medium ${t.type === "income" ? "text-emerald-600" : "text-rose-600"}`}>
                      {t.type === "income" ? "+" : "−"}{fmt(t.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
