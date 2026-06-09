import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Button, Card } from "@/components/AppShell";
import { Smartphone, Wifi, BadgeCheck, ShoppingBasket } from "lucide-react";

export const Route = createFileRoute("/work/kazana-pos")({
  head: () => ({ meta: [{ title: "Kazana POS — mobile checkout" }] }),
  component: Pos,
});

const catalog = [
  { id: 1, name: "Maize flour 2kg", price: 220, emoji: "🌽" },
  { id: 2, name: "Sugar 1kg", price: 180, emoji: "🍬" },
  { id: 3, name: "Rice 2kg", price: 380, emoji: "🍚" },
  { id: 4, name: "Cooking oil 1L", price: 320, emoji: "🫒" },
  { id: 5, name: "Bread loaf", price: 65, emoji: "🍞" },
  { id: 6, name: "Milk 500ml", price: 55, emoji: "🥛" },
];

function Pos() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [paying, setPaying] = useState(false);
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

  const charge = () => {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setCart({});
      alert(`Charged KES ${total.toLocaleString()} via M-Pesa`);
    }, 1200);
  };

  return (
    <AppShell
      title="Kazana POS"
      tag="Mobile · Flutter"
      description="Flutter checkout on the shop floor. Tap to add, swipe to total, M-Pesa or cash on the way out — every sale syncs to inventory in real time."
      caseStudy={{
        category: "Mobile App",
        scope: "Flutter POS terminal",
        role: "Mobile + integration engineer",
        timeline: "8 weeks · 2024",
        overview:
          "Kazana POS is the Flutter companion to the Kazana retail backend. Cashiers tap items into a cart, see live totals and check out with M-Pesa or cash on the floor — without juggling paper receipts or a separate calculator.",
        problem:
          "Counter staff were toggling between a calculator, paper receipt pad and an M-Pesa phone. Average checkout was 90 seconds and stock never matched at close of day.",
        solution:
          "One Flutter app with offline-first cart, embedded M-Pesa STK push, and a background sync to the central Kazana inventory.",
        businessValue:
          "Speeds up checkout on the floor and keeps every sale tied back to the central inventory.",
        outcome:
          "Average checkout dropped to 28 seconds. End-of-day stock variance fell from ~8% to under 1%.",
        tags: ["Flutter", "M-Pesa", "Offline", "POS"],
        highlights: [
          "Tap-to-add cart flow",
          "Live total and tax handling",
          "M-Pesa STK push & cash checkout",
          "Offline queue with auto-sync",
          "Backend stock sync",
          "Receipt print + SMS",
        ],
        techStack: [
          { name: "Flutter 3", role: "Cross-platform UI" },
          { name: "Riverpod", role: "Cart & sync state" },
          { name: "SQLite", role: "Offline cart queue" },
          { name: "Daraja M-Pesa API", role: "STK push payments" },
          { name: "Laravel backend", role: "Inventory sync" },
        ],
        metrics: [
          { label: "Checkout time", value: "28s", sub: "from ~90s" },
          { label: "Stock variance", value: "<1%", sub: "from ~8%" },
          { label: "Terminals deployed", value: "12", sub: "across 5 outlets" },
          { label: "Offline transactions", value: "100%", sub: "queued & synced" },
        ],
        process: [
          { title: "Floor test", body: "Stood at the till for a full Saturday measuring every tap and pause." },
          { title: "Offline first", body: "Designed the cart to work without internet — sync is a background concern." },
          { title: "Payments", body: "Integrated Daraja STK push with timeout handling and SMS receipt fallback." },
          { title: "Roll out", body: "Trained 12 cashiers in 30-minute sessions; no till downtime during the switch." },
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
              <span className="flex items-center gap-1"><Wifi className="h-3 w-3" /> 100%</span>
            </div>

            <div className="mt-3 rounded-2xl bg-gradient-to-br from-foreground to-foreground/80 p-5 text-background">
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.2em] text-background/60">Current cart</p>
                <ShoppingBasket className="h-4 w-4 opacity-60" />
              </div>
              <p className="mt-3 font-serif text-4xl">KES {total.toLocaleString()}</p>
              <p className="text-xs text-background/60">{items} item{items !== 1 ? "s" : ""}</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {catalog.map((p) => (
                <button
                  key={p.id}
                  onClick={() => add(p.id)}
                  className="relative rounded-xl border border-border bg-card p-3 text-left text-xs hover:border-foreground active:scale-95 transition-transform"
                >
                  <div className="text-2xl">{p.emoji}</div>
                  <div className="mt-1 font-medium">{p.name}</div>
                  <div className="text-muted-foreground">KES {p.price}</div>
                  {cart[p.id] && (
                    <div className="mt-2 flex items-center justify-between">
                      <span className="chip">×{cart[p.id]}</span>
                      <span
                        className="text-muted-foreground hover:text-rose-600"
                        onClick={(e) => { e.stopPropagation(); remove(p.id); }}
                      >
                        −
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button variant="ghost" onClick={() => setCart({})}>CLEAR</Button>
              <Button disabled={!total || paying} onClick={charge}>
                {paying ? "PROCESSING…" : "CHARGE"}
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <div className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-accent" />
              <h3 className="font-serif text-2xl">Try it</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Tap any product tile to drop it in the cart. Watch the total update instantly, then hit <strong>CHARGE</strong> to simulate an M-Pesa STK push.
            </p>
          </Card>
          <Card>
            <h3 className="font-serif text-xl">Why it's fast</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3"><BadgeCheck className="mt-0.5 h-4 w-4 text-accent" /> Cart state stays local — zero network on tap.</li>
              <li className="flex items-start gap-3"><BadgeCheck className="mt-0.5 h-4 w-4 text-accent" /> Background sync to inventory; never blocks the cashier.</li>
              <li className="flex items-start gap-3"><BadgeCheck className="mt-0.5 h-4 w-4 text-accent" /> M-Pesa STK push with timeout fallback to cash.</li>
              <li className="flex items-start gap-3"><BadgeCheck className="mt-0.5 h-4 w-4 text-accent" /> Receipt printed locally + SMS to customer.</li>
            </ul>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
