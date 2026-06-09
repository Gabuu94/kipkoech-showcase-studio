import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AppShell, Button, Card, Input, Select, Stat } from "@/components/AppShell";
import { fetchLedger, insertLedger, type LedgerTx } from "@/lib/demo-api";
import cover from "@/assets/cover-ledgerly.jpg";

export const Route = createFileRoute("/work/ledgerly")({
  head: () => ({ meta: [{ title: "Ledgerly — Bookkeeping demo" }] }),
  component: Ledgerly,
});

function Ledgerly() {
  const qc = useQueryClient();
  const { data: txs = [], isLoading } = useQuery({ queryKey: ["ledger"], queryFn: fetchLedger });
  const add = useMutation({
    mutationFn: insertLedger,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["ledger"] }),
  });
  const [form, setForm] = useState({ description: "", category: "Sales", kind: "income" as LedgerTx["kind"], amount: "" });

  const totals = useMemo(() => {
    const income = txs.filter((t) => t.kind === "income").reduce((a, t) => a + Number(t.amount), 0);
    const expense = txs.filter((t) => t.kind === "expense").reduce((a, t) => a + Number(t.amount), 0);
    return { income, expense, net: income - expense };
  }, [txs]);

  const fmt = (n: number) => "KES " + n.toLocaleString();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(form.amount);
    if (!form.description || !amt) return;
    add.mutate({ description: form.description, category: form.category, kind: form.kind, amount: amt });
    setForm({ description: "", category: "Sales", kind: "income", amount: "" });
  };

  return (
    <AppShell title="Ledgerly" tag="Bookkeeping" description="Lightweight ledger backed by a live database. Every entry persists and is read by every visitor." cover={cover}>
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Income" value={fmt(totals.income)} />
        <Stat label="Expenses" value={fmt(totals.expense)} />
        <Stat label="Net" value={fmt(totals.net)} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_2fr]">
        <Card>
          <h3 className="font-serif text-2xl">New entry</h3>
          <form className="mt-5 space-y-3" onSubmit={submit}>
            <Input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <Select value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value as LedgerTx["kind"] })}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </Select>
              <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {["Sales", "Infra", "Admin", "Fees", "Travel", "Other"].map((c) => <option key={c}>{c}</option>)}
              </Select>
            </div>
            <Input type="number" placeholder="Amount (KES)" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
            <Button type="submit" disabled={add.isPending}>{add.isPending ? "SAVING…" : "RECORD"}</Button>
          </form>
        </Card>

        <Card>
          <h3 className="font-serif text-2xl">Ledger</h3>
          {isLoading ? (
            <p className="mt-5 text-sm text-muted-foreground">Loading from database…</p>
          ) : (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr><th className="py-2">Date</th><th>Description</th><th>Category</th><th className="text-right">Amount</th></tr>
                </thead>
                <tbody>
                  {txs.map((t) => (
                    <tr key={t.id} className="border-t border-border">
                      <td className="py-3">{t.occurred_on}</td>
                      <td>{t.description}</td>
                      <td><span className="chip">{t.category}</span></td>
                      <td className={`text-right font-medium ${t.kind === "income" ? "text-emerald-600" : "text-rose-600"}`}>
                        {t.kind === "income" ? "+" : "−"}{fmt(Number(t.amount))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </AppShell>
  );
}
