import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { AppShell, Card, Stat } from "@/components/AppShell";

export const Route = createFileRoute("/work/routeline")({
  head: () => ({ meta: [{ title: "Routeline — Fleet dashboard" }] }),
  component: Routeline,
});

const trucks = [
  { id: "KDA 221A", driver: "John Kiprono", fuelKm: 6.8, trips: 14, spend: 48200, status: "Active" },
  { id: "KCB 980Z", driver: "Mary Atieno", fuelKm: 7.4, trips: 11, spend: 41100, status: "Active" },
  { id: "KDH 552B", driver: "Peter Mutua", fuelKm: 5.9, trips: 9, spend: 36200, status: "Service" },
  { id: "KDK 117C", driver: "Lilian Chebet", fuelKm: 8.1, trips: 17, spend: 52400, status: "Active" },
];

function Routeline() {
  const totals = useMemo(() => ({
    spend: trucks.reduce((a, t) => a + t.spend, 0),
    trips: trucks.reduce((a, t) => a + t.trips, 0),
    avg: (trucks.reduce((a, t) => a + t.fuelKm, 0) / trucks.length).toFixed(1),
  }), []);

  return (
    <AppShell title="Routeline" tag="Logistics" description="Fleet, fuel and driver performance at a glance. Built for ops teams who need to act on the numbers, not export them.">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Fleet spend (wk)" value={"KES " + totals.spend.toLocaleString()} />
        <Stat label="Completed trips" value={String(totals.trips)} />
        <Stat label="Avg km / litre" value={totals.avg} />
      </div>

      <Card className="mt-8">
        <h3 className="font-serif text-2xl">Active fleet</h3>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr><th className="py-2">Plate</th><th>Driver</th><th>Km/L</th><th>Trips</th><th className="text-right">Spend</th><th className="text-right">Status</th></tr>
            </thead>
            <tbody>
              {trucks.map((t) => (
                <tr key={t.id} className="border-t border-border">
                  <td className="py-3 font-medium">{t.id}</td>
                  <td>{t.driver}</td>
                  <td>{t.fuelKm}</td>
                  <td>{t.trips}</td>
                  <td className="text-right">KES {t.spend.toLocaleString()}</td>
                  <td className="text-right">
                    <span className={`chip ${t.status === "Active" ? "" : "!bg-amber-100 !text-amber-900"}`}>{t.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card>
          <h3 className="font-serif text-xl">Fuel trend (last 7 days)</h3>
          <div className="mt-4 flex h-32 items-end gap-2">
            {[42, 58, 47, 64, 51, 70, 55].map((v, i) => (
              <div key={i} className="flex-1 rounded-t bg-foreground/80" style={{ height: `${v}%` }} />
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="font-serif text-xl">Alerts</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-rose-500" /> KDH 552B — service overdue by 320km</li>
            <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-amber-500" /> KCB 980Z — fuel efficiency dropped 6%</li>
            <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" /> KDA 221A — on schedule</li>
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
