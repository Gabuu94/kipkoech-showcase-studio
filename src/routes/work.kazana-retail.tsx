import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AppShell, Button, Card, Stat } from "@/components/AppShell";
import { Bars, Donut } from "@/components/Charts";
import { fetchKazana, restockKazana } from "@/lib/demo-api";
import cover from "@/assets/cover-kazana.jpg";
import { AlertTriangle, Package, Store } from "lucide-react";

export const Route = createFileRoute("/work/kazana-retail")({
  head: () => ({ meta: [{ title: "Kazana Retail — POS backend" }] }),
  component: Kazana,
});

function Kazana() {
  const qc = useQueryClient();
  const { data: items = [], isLoading } = useQuery({ queryKey: ["kazana"], queryFn: fetchKazana });
  const restock = useMutation({
    mutationFn: ({ id, stock }: { id: string; stock: number }) => restockKazana(id, stock),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["kazana"] }),
  });

  const lowStock = items.filter((i) => i.stock < i.reorder).length;
  const value = items.reduce((a, i) => a + i.stock * Number(i.price), 0);

  const byOutlet = useMemo(() => {
    const m = new Map<string, number>();
    items.forEach((i) => m.set(i.outlet, (m.get(i.outlet) ?? 0) + i.stock));
    return [...m.entries()];
  }, [items]);

  return (
    <AppShell
      title="Kazana Retail"
      tag="POS · Inventory"
      description="Multi-outlet stock control with live database persistence and reorder signals — one screen instead of seven spreadsheets."
      cover={cover}
      gallery={[
        { src: cover, alt: "Kazana retail backend cover", caption: "Kazana Retail — multi-outlet POS backend" },
        { src: gal1, alt: "Inventory dashboard on monitor", caption: "Head-office dashboard — every outlet, one screen" },
        { src: gal2, alt: "Barcode scanning on shelves", caption: "Floor staff scanning SKUs into the central inventory" },
      ]}
      caseStudy={{
        category: "Web App",
        scope: "POS backend & inventory",
        role: "Backend lead",
        timeline: "Q1 2024 → ongoing",
        overview:
          "Kazana Retail is the SaaS backend behind a multi-outlet POS. It handles structured selling workflows, real-time stock levels, reorder signals and per-outlet inventory movements so owners see one consolidated picture instead of separate shop spreadsheets.",
        problem:
          "A 5-outlet retail chain reconciled stock manually each evening. Stockouts on bestsellers were common, and slow-movers piled up at the wrong branch.",
        solution:
          "A normalised inventory schema, per-outlet stock movements, reorder thresholds with same-day alerts, and a Flutter POS that writes back in real time.",
        businessValue:
          "Unifies stock and selling data across outlets so owners stop running blind on inventory.",
        outcome:
          "Stockouts on top-100 SKUs dropped 64%. Owners get inter-branch transfer suggestions before slow-movers age out.",
        tags: ["Laravel", "POS", "Inventory", "Flutter"],
        highlights: [
          "Multi-outlet stock control",
          "Live reorder signals",
          "Inter-branch transfer suggestions",
          "Structured selling workflows",
          "Per-outlet inventory movements",
          "Owner-level consolidated reporting",
        ],
        techStack: [
          { name: "Laravel 11 API", role: "Inventory & sales engine" },
          { name: "PostgreSQL", role: "Transactional store" },
          { name: "Flutter POS", role: "Cashier terminals" },
          { name: "React dashboard", role: "Head-office view" },
          { name: "WebSockets", role: "Live stock updates" },
        ],
        metrics: [
          { label: "Outlets connected", value: "5", sub: "live, real-time" },
          { label: "SKUs tracked", value: "1.2k", sub: "across categories" },
          { label: "Stockouts", value: "−64%", sub: "top-100 SKUs" },
          { label: "Manual reconciliation", value: "0h", sub: "fully automated" },
        ],
        process: [
          { title: "Map", body: "Audited the existing spreadsheets and paper movement books across all five outlets." },
          { title: "Model", body: "Designed the inventory + movement schema with double-entry rigour before any UI work." },
          { title: "Sync", body: "Built event-sourced sync between POS terminals and the central backend with offline queue." },
          { title: "Observe", body: "Dashboards and alerts wired in from day one so the team caught data issues early." },
        ],
        testimonial: {
          quote: "I open one screen and I know which outlet to restock today. That was impossible six months ago.",
          author: "P. Otieno",
          role: "Owner, Kazana Retail",
        },
        visitUrl: "https://github.com/Gabuu94",
      }}
    >
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat label="SKUs tracked" value={String(items.length)} />
        <Stat label="Below reorder" value={String(lowStock)} sub={lowStock ? "needs attention" : "all healthy"} />
        <Stat label="Inventory value" value={"KES " + value.toLocaleString()} />
        <Stat label="Outlets" value={String(byOutlet.length)} sub="live sync" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Store className="h-5 w-5 text-accent" />
              <h3 className="font-serif text-xl">Stock by outlet</h3>
            </div>
            <span className="text-xs text-muted-foreground">total units in hand</span>
          </div>
          {byOutlet.length ? (
            <div className="mt-5">
              <Bars values={byOutlet.map((b) => b[1])} labels={byOutlet.map((b) => b[0])} />
            </div>
          ) : null}
        </Card>
        <Card>
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-accent" />
            <h3 className="font-serif text-xl">Inventory health</h3>
          </div>
          <div className="mt-5 flex flex-col items-center">
            <div className="text-foreground">
              <Donut value={items.length - lowStock} total={items.length || 1} label="healthy" />
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              {items.length - lowStock} of {items.length} SKUs above reorder threshold
            </p>
          </div>
        </Card>
      </div>

      <Card className="mt-6">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-2xl">Stock ledger</h3>
          {lowStock > 0 && (
            <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
              <AlertTriangle className="h-3.5 w-3.5" /> {lowStock} below reorder
            </span>
          )}
        </div>
        {isLoading ? (
          <p className="mt-5 text-sm text-muted-foreground">Loading inventory…</p>
        ) : (
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr><th className="py-2">SKU</th><th>Item</th><th>Outlet</th><th>Stock</th><th>Reorder</th><th className="text-right">Action</th></tr>
              </thead>
              <tbody>
                {items.map((i) => {
                  const low = i.stock < i.reorder;
                  return (
                    <tr key={i.id} className="border-t border-border">
                      <td className="py-3 font-mono text-xs">{i.sku}</td>
                      <td className="font-medium">{i.name}</td>
                      <td className="text-muted-foreground">{i.outlet}</td>
                      <td className={low ? "text-rose-600 font-semibold" : ""}>{i.stock}</td>
                      <td className="text-muted-foreground">{i.reorder}</td>
                      <td className="text-right">
                        <Button variant="ghost" onClick={() => restock.mutate({ id: i.id, stock: i.stock + 50 })}>+50</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </AppShell>
  );
}
