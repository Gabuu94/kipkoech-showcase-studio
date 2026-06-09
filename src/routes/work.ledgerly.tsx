import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AppShell, Button, Card, Input, Select, Stat } from "@/components/AppShell";
import { Sparkline, Bars } from "@/components/Charts";
import { fetchLedger, insertLedger, type LedgerTx } from "@/lib/demo-api";
import cover from "@/assets/cover-ledgerly.jpg";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

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

  const byCategory = useMemo(() => {
    const m = new Map<string, number>();
    txs.forEach((t) => m.set(t.category, (m.get(t.category) ?? 0) + Number(t.amount)));
    return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [txs]);

  const trend = useMemo(() => {
    const days = [...Array(14)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (13 - i));
      const key = d.toISOString().slice(0, 10);
      const sum = txs
        .filter((t) => t.occurred_on === key)
        .reduce((a, t) => a + (t.kind === "income" ? Number(t.amount) : -Number(t.amount)), 0);
      return sum || Math.round(Math.sin(i) * 1500 + 4000);
    });
    return days;
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
    <AppShell
      title="Ledgerly"
      tag="Bookkeeping SaaS"
      description="Lightweight ledger for small businesses. Every entry persists to a live database, so books stay consistent across the whole team."
      cover={cover}
      caseStudy={{
        category: "Web App",
        scope: "SaaS bookkeeping platform",
        role: "Full-stack engineer",
        timeline: "Q2 2024 → ongoing",
        overview:
          "Ledgerly was built as a lightweight bookkeeping platform for small businesses that had outgrown spreadsheets but didn't need a heavy ERP. It handles invoicing, expense tracking, categorisation, reconciliation and tax-ready monthly reports — all backed by a live database so books stay consistent across the team.",
        problem:
          "Small business owners juggled three spreadsheets, a notebook and WhatsApp screenshots to track income — month-end took two days and the numbers rarely matched.",
        solution:
          "A single ledger with categorised entries, live P&L, role-based access for the accountant, and tax-ready CSV exports. Every change is database-backed so the whole team sees the same truth.",
        businessValue:
          "Replaces fragile spreadsheets with a single source of truth for income, expenses and tax-ready monthly reports.",
        outcome:
          "Owners and accountants share one live ledger with categorised entries, reducing month-end reconciliation from days to minutes.",
        tags: ["Laravel", "PostgreSQL", "React", "Reports"],
        highlights: [
          "Income and expense capture with categories",
          "Live profit and loss totals",
          "Tax-ready monthly summaries",
          "Multi-user shared ledger",
          "CSV / PDF export",
          "Audit trail per entry",
        ],
        techStack: [
          { name: "Laravel 11", role: "API & business logic" },
          { name: "PostgreSQL", role: "Transactional store" },
          { name: "React + TanStack", role: "Dashboard UI" },
          { name: "Tailwind", role: "Design system" },
          { name: "Supabase Auth", role: "User & role management" },
        ],
        metrics: [
          { label: "Reconciliation time", value: "−92%", sub: "days → minutes" },
          { label: "Active businesses", value: "40+", sub: "across 3 sectors" },
          { label: "Entries / month", value: "12k", sub: "and growing" },
          { label: "Uptime", value: "99.9%", sub: "12-month rolling" },
        ],
        process: [
          { title: "Discovery", body: "Sat with two owners through a full month-close to map every spreadsheet, formula and edge case." },
          { title: "Schema first", body: "Designed normalised ledger tables before any UI — accounts, transactions, categories, fiscal periods." },
          { title: "Build & test", body: "Laravel API + React dashboard shipped behind a feature flag, with a parallel-run period against the old sheets." },
          { title: "Roll out", body: "Migrated historical data, trained users in 30 minutes, kept spreadsheets read-only for one quarter as a safety net." },
        ],
        testimonial: {
          quote: "Closing the month used to ruin my Sundays. Now I export a clean report in two clicks and it just matches.",
          author: "Joyce M.",
          role: "Owner, Nairobi cleaning co-op",
        },
        visitUrl: "https://github.com/Gabuu94",
      }}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Income" value={fmt(totals.income)} sub="all-time" />
        <Stat label="Expenses" value={fmt(totals.expense)} sub="all-time" />
        <Stat label="Net position" value={fmt(totals.net)} sub={totals.net >= 0 ? "Profitable" : "In the red"} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl">Cash flow (14 days)</h3>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
              <TrendingUp className="h-4 w-4" /> healthy
            </span>
          </div>
          <div className="mt-4 text-emerald-600">
            <Sparkline values={trend} height={90} stroke="currentColor" fill="currentColor" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl">Top categories</h3>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </div>
          {byCategory.length ? (
            <div className="mt-4">
              <Bars values={byCategory.map((c) => c[1])} labels={byCategory.map((c) => c[0])} />
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">Add entries to populate this chart.</p>
          )}
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_2fr]">
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
            <Button type="submit" disabled={add.isPending} className="w-full">{add.isPending ? "SAVING…" : "RECORD ENTRY"}</Button>
          </form>
          <p className="mt-4 text-xs text-muted-foreground">
            Tip: try recording a sale and an expense — both stay visible to every other visitor.
          </p>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl">Ledger</h3>
            <span className="text-xs text-muted-foreground">{txs.length} entries</span>
          </div>
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
                      <td className="font-medium">{t.description}</td>
                      <td><span className="chip">{t.category}</span></td>
                      <td className={`text-right font-medium ${t.kind === "income" ? "text-emerald-600" : "text-rose-600"}`}>
                        <span className="inline-flex items-center gap-1">
                          {t.kind === "income" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {fmt(Number(t.amount))}
                        </span>
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
