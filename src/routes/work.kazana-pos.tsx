import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Button, Card } from "@/components/AppShell";

export const Route = createFileRoute("/work/kazana-pos")({
  head: () => ({ meta: [{ title: "Kazana POS — mobile checkout" }] }),
  component: Pos,
});

const catalog = [
  { id: 1, name: "Maize flour 2kg", price: 220 },
  { id: 2, name: "Sugar 1kg", price: 180 },
  { id: 3, name: "Rice 2kg", price: 380 },
  { id: 4, name: "Cooking oil 1L", price: 320 },
  { id: 5, name: "Bread loaf", price: 65 },
  { id: 6, name: "Milk 500ml", price: 55 },
];

function Pos() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const total = Object.entries(cart).reduce((a, [id, qty]) => a + catalog.find((c) => c.id === Number(id))!.price * qty, 0);
  const items = Object.values(cart).reduce((a, b) => a + b, 0);

  const add = (id: number) => setCart({ ...cart, [id]: (cart[id] ?? 0) + 1 });
  const remove = (id: number) => {
    const next = { ...cart };
    if (!next[id]) return;
    next[id]--;
    if (!next[id]) delete next[id];
    setCart(next);
  };

  return (
    <AppShell title="Kazana POS" tag="Mobile" description="Flutter-style checkout on the floor. Tap to add, swipe to total, M-Pesa or cash on the way out.">
      <div className="mx-auto grid max-w-md gap-4">
        <div className="rounded-[2.2rem] border-4 border-foreground bg-background p-4 shadow-xl">
          <div className="mx-auto h-1.5 w-16 rounded-full bg-muted" />
          <div className="mt-4 rounded-2xl bg-foreground p-5 text-background">
            <p className="text-[10px] uppercase tracking-[0.2em] text-background/60">Cart</p>
            <p className="mt-2 font-serif text-4xl">KES {total.toLocaleString()}</p>
            <p className="text-xs text-background/60">{items} item{items !== 1 ? "s" : ""}</p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {catalog.map((p) => (
              <button key={p.id} onClick={() => add(p.id)} className="rounded-xl border border-border bg-card p-3 text-left text-xs hover:border-foreground">
                <div className="font-medium">{p.name}</div>
                <div className="mt-1 text-muted-foreground">KES {p.price}</div>
                {cart[p.id] && (
                  <div className="mt-2 flex items-center justify-between">
                    <span className="chip">×{cart[p.id]}</span>
                    <span className="text-muted-foreground" onClick={(e) => { e.stopPropagation(); remove(p.id); }}>−</span>
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button variant="ghost" onClick={() => setCart({})}>CLEAR</Button>
            <Button disabled={!total} onClick={() => { alert(`Charged KES ${total.toLocaleString()} via M-Pesa`); setCart({}); }}>
              CHARGE
            </Button>
          </div>
        </div>

        <Card>
          <p className="text-xs text-muted-foreground">Tap any tile to add to cart. Cart updates in real time and routes to M-Pesa or cash at checkout.</p>
        </Card>
      </div>
    </AppShell>
  );
}
