import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Button, Card, Stat } from "@/components/AppShell";

export const Route = createFileRoute("/work/kazana-retail")({
  head: () => ({ meta: [{ title: "Kazana Retail — POS backend" }] }),
  component: Kazana,
});

type Item = { id: number; sku: string; name: string; outlet: string; stock: number; reorder: number; price: number };

const seed: Item[] = [
  { id: 1, sku: "MZ-001", name: "Maize flour 2kg", outlet: "Westlands", stock: 142, reorder: 50, price: 220 },
  { id: 2, sku: "SG-014", name: "Sugar 1kg", outlet: "Westlands", stock: 28, reorder: 40, price: 180 },
  { id: 3, sku: "MZ-001", name: "Maize flour 2kg", outlet: "Kilimani", stock: 75, reorder: 50, price: 220 },
  { id: 4, sku: "RC-007", name: "Rice 2kg", outlet: "Kilimani", stock: 12, reorder: 30, price: 380 },
  { id: 5, sku: "OL-022", name: "Cooking oil 1L", outlet: "CBD", stock: 65, reorder: 25, price: 320 },
];

function Kazana() {
  const [items, setItems] = useState(seed);
  const lowStock = items.filter((i) => i.stock < i.reorder).length;
  const value = items.reduce((a, i) => a + i.stock * i.price, 0);

  const restock = (id: number) => setItems((s) => s.map((i) => (i.id === id ? { ...i, stock: i.stock + 50 } : i)));

  return (
    <AppShell title="Kazana Retail" tag="POS / Inventory" description="Multi-outlet stock control with reorder signals. The backend keeping the tills honest.">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="SKUs tracked" value={String(items.length)} />
        <Stat label="Below reorder" value={String(lowStock)} />
        <Stat label="Inventory value" value={"KES " + value.toLocaleString()} />
      </div>

      <Card className="mt-8">
        <h3 className="font-serif text-2xl">Stock by outlet</h3>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="py-2">SKU</th><th>Item</th><th>Outlet</th><th>Stock</th><th>Reorder</th><th className="text-right">Action</th></tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id} className="border-t border-border">
                  <td className="py-3 font-mono text-xs">{i.sku}</td>
                  <td>{i.name}</td>
                  <td>{i.outlet}</td>
                  <td className={i.stock < i.reorder ? "text-rose-600 font-medium" : ""}>{i.stock}</td>
                  <td className="text-muted-foreground">{i.reorder}</td>
                  <td className="text-right">
                    <Button variant="ghost" onClick={() => restock(i.id)}>+50</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  );
}
