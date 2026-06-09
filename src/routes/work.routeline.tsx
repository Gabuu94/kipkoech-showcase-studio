import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppShell, Card, Stat } from "@/components/AppShell";
import { fetchTrucks } from "@/lib/demo-api";
import cover from "@/assets/cover-routeline.jpg";

export const Route = createFileRoute("/work/routeline")({
  head: () => ({ meta: [{ title: "Routeline — Fleet dashboard" }] }),
  component: Routeline,
});

function Routeline() {
  const { data: trucks = [], isLoading } = useQuery({ queryKey: ["trucks"], queryFn: fetchTrucks });

  const totals = {
    spend: trucks.reduce((a, t) => a + Number(t.spend), 0),
    trips: trucks.reduce((a, t) => a + t.trips, 0),
    avg: trucks.length ? (trucks.reduce((a, t) => a + Number(t.fuel_km), 0) / trucks.length).toFixed(1) : "—",
  };

  return (
    <AppShell title="Routeline" tag="Logistics" description="Fleet, fuel and driver performance backed by Postgres — real rows, real totals." cover={cover}>
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Fleet spend (wk)" value={"KES " + totals.spend.toLocaleString()} />
        <Stat label="Completed trips" value={String(totals.trips)} />
        <Stat label="Avg km / litre" value={String(totals.avg)} />
      </div>

      <Card className="mt-8">
        <h3 className="font-serif text-2xl">Active fleet</h3>
        {isLoading ? (
          <p className="mt-5 text-sm text-muted-foreground">Loading fleet…</p>
        ) : (
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr><th className="py-2">Plate</th><th>Driver</th><th>Km/L</th><th>Trips</th><th className="text-right">Spend</th><th className="text-right">Status</th></tr>
              </thead>
              <tbody>
                {trucks.map((t) => (
                  <tr key={t.id} className="border-t border-border">
                    <td className="py-3 font-medium">{t.plate}</td>
                    <td>{t.driver}</td>
                    <td>{t.fuel_km}</td>
                    <td>{t.trips}</td>
                    <td className="text-right">KES {Number(t.spend).toLocaleString()}</td>
                    <td className="text-right">
                      <span className={`chip ${t.status === "Active" ? "" : "!bg-amber-100 !text-amber-900"}`}>{t.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
            {trucks.filter(t => t.status !== "Active").map(t => (
              <li key={t.id} className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-rose-500" /> {t.plate} — {t.status.toLowerCase()} required</li>
            ))}
            <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" /> All other trucks on schedule</li>
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
