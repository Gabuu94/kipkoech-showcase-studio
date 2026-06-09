import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AppShell, Button, Card, Stat } from "@/components/AppShell";
import { fetchKazana, restockKazana } from "@/lib/demo-api";
import cover from "@/assets/cover-kazana.jpg";

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

  return (
    <AppShell title="Kazana Retail" tag="POS / Inventory" description="Multi-outlet stock control with live database persistence and reorder signals." cover={cover}>
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="SKUs tracked" value={String(items.length)} />
        <Stat label="Below reorder" value={String(lowStock)} />
        <Stat label="Inventory value" value={"KES " + value.toLocaleString()} />
      </div>

      <Card className="mt-8">
        <h3 className="font-serif text-2xl">Stock by outlet</h3>
        {isLoading ? (
          <p className="mt-5 text-sm text-muted-foreground">Loading inventory…</p>
        ) : (
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
                      <Button variant="ghost" onClick={() => restock.mutate({ id: i.id, stock: i.stock + 50 })}>+50</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </AppShell>
  );
}
