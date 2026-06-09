import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppShell, Card, Stat } from "@/components/AppShell";
import { Bars, Sparkline, MapMock } from "@/components/Charts";
import { fetchTrucks } from "@/lib/demo-api";
import cover from "@/assets/cover-routeline.jpg";
import { Fuel, Truck, AlertCircle, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/work/routeline")({
  head: () => ({ meta: [{ title: "Routeline — Fleet dashboard" }] }),
  component: Routeline,
});

function Routeline() {
  const { data: trucks = [], isLoading } = useQuery({ queryKey: ["trucks"], queryFn: fetchTrucks });

  const totals = useMemo(() => ({
    spend: trucks.reduce((a, t) => a + Number(t.spend), 0),
    trips: trucks.reduce((a, t) => a + t.trips, 0),
    avg: trucks.length ? (trucks.reduce((a, t) => a + Number(t.fuel_km), 0) / trucks.length).toFixed(1) : "—",
    active: trucks.filter((t) => t.status === "Active").length,
  }), [trucks]);

  const fuelTrend = [42, 58, 47, 64, 51, 70, 55, 61, 49, 73, 58, 66, 71, 64];

  return (
    <AppShell
      title="Routeline"
      tag="Logistics ops"
      description="Fleet, fuel and driver performance backed by Postgres. Real rows, real totals, real anomaly detection — not a polished mock."
      cover={cover}
      gallery={[
        { src: cover, alt: "Routeline cover", caption: "Routeline — fleet operations dashboard" },
        { src: gal1, alt: "Fleet ops dashboard on widescreen", caption: "Live fleet view with map and KPI tiles" },
        { src: gal2, alt: "Logistics truck on highway", caption: "One of 24 rigs tracked through the system" },
      ]}
      caseStudy={{
        category: "Web App",
        scope: "Fleet operations dashboard",
        role: "Backend + dashboard engineer",
        timeline: "5 months · 2024",
        overview:
          "Routeline is a logistics operations dashboard that tracks fleet expenses, fuel consumption and driver performance. It consolidates trip logs, fuel receipts and maintenance entries into one place so operations leads can compare trucks, spot anomalies and budget routes with real numbers.",
        problem:
          "Fuel fraud was suspected on long-haul routes. Receipts came in on paper weeks later and there was no way to compare drivers, routes or trucks fairly.",
        solution:
          "Driver companion app captures expenses at source. Backend computes per-truck km/L, flags anomalies vs that truck's own baseline, and surfaces the worst offenders weekly.",
        businessValue:
          "Turns scattered fuel and trip slips into structured operational data fleet managers can act on within the same day.",
        outcome:
          "Identified a 14% monthly fuel leak in the first month, recovered KES 380k/quarter, and gave drivers a fair, transparent scoring system.",
        tags: ["Node", "PostgreSQL", "Dashboards", "Flutter"],
        highlights: [
          "Per-truck expense breakdown",
          "Fuel consumption tracking",
          "Anomaly detection (baseline vs current)",
          "Driver performance metrics",
          "Live totals and KPIs",
          "Database-backed trip log",
        ],
        techStack: [
          { name: "Node + Express", role: "API & analytics" },
          { name: "PostgreSQL + TimescaleDB", role: "Trip & fuel time-series" },
          { name: "React + TanStack Query", role: "Ops dashboard" },
          { name: "Flutter", role: "Driver companion app" },
        ],
        metrics: [
          { label: "Fuel leak caught", value: "14%", sub: "month one" },
          { label: "Quarterly savings", value: "KES 380k", sub: "first 90 days" },
          { label: "Trucks tracked", value: "24", sub: "across 3 depots" },
          { label: "Anomaly latency", value: "<24h", sub: "from receipt to alert" },
        ],
        process: [
          { title: "Audit", body: "Sampled 3 months of paper receipts to model the real noise floor in fuel consumption." },
          { title: "Baseline", body: "Computed per-truck rolling km/L baselines so alerts are fair to old vs new trucks." },
          { title: "Capture", body: "Shipped a Flutter app for drivers so receipts get photographed at the pump, not weeks later." },
          { title: "Act", body: "Weekly digest emailed to ops lead with the top 3 anomalies and suggested next actions." },
        ],
        testimonial: {
          quote: "We stopped arguing about fuel. The dashboard just shows it.",
          author: "S. Wanjiru",
          role: "Operations Manager",
        },
        visitUrl: "https://github.com/Gabuu94",
      }}
    >
      <div className="grid gap-4 sm:grid-cols-4">
        <Stat label="Fleet spend (wk)" value={"KES " + totals.spend.toLocaleString()} sub="this week" />
        <Stat label="Completed trips" value={String(totals.trips)} sub="across fleet" />
        <Stat label="Avg km / litre" value={String(totals.avg)} sub="fleet-wide" />
        <Stat label="Active rigs" value={`${totals.active} / ${trucks.length}`} sub="now on road" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Fuel className="h-5 w-5 text-accent" />
              <h3 className="font-serif text-xl">Fuel burn (14 days)</h3>
            </div>
            <span className="text-xs text-muted-foreground">litres / day</span>
          </div>
          <div className="mt-4 text-foreground">
            <Sparkline values={fuelTrend} height={100} stroke="currentColor" fill="currentColor" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
            <div className="rounded-lg border border-border bg-background p-3">
              <p className="text-muted-foreground">Peak</p>
              <p className="mt-1 font-semibold">73 L</p>
            </div>
            <div className="rounded-lg border border-border bg-background p-3">
              <p className="text-muted-foreground">Avg</p>
              <p className="mt-1 font-semibold">59 L</p>
            </div>
            <div className="rounded-lg border border-border bg-background p-3">
              <p className="text-muted-foreground">Trend</p>
              <p className="mt-1 font-semibold text-amber-600">+8% w/w</p>
            </div>
          </div>
        </Card>
        <Card>
          <h3 className="font-serif text-xl">Live route map</h3>
          <div className="mt-4">
            <MapMock pins={Math.min(trucks.length, 6)} />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            {trucks.length} rigs streaming GPS via the driver companion app.
          </p>
        </Card>
      </div>

      <Card className="mt-6">
        <div className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-accent" />
          <h3 className="font-serif text-2xl">Active fleet</h3>
        </div>
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
                    <td className="py-3 font-mono font-medium">{t.plate}</td>
                    <td>{t.driver}</td>
                    <td>{t.fuel_km}</td>
                    <td>{t.trips}</td>
                    <td className="text-right">KES {Number(t.spend).toLocaleString()}</td>
                    <td className="text-right">
                      <span className={`chip ${t.status === "Active" ? "!bg-emerald-100 !text-emerald-900" : "!bg-amber-100 !text-amber-900"}`}>{t.status}</span>
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
          <h3 className="font-serif text-xl">Spend by truck</h3>
          <div className="mt-4">
            <Bars values={trucks.map((t) => Number(t.spend))} labels={trucks.map((t) => t.plate)} />
          </div>
        </Card>
        <Card>
          <h3 className="font-serif text-xl">Alerts</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {trucks.filter((t) => t.status !== "Active").map((t) => (
              <li key={t.id} className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-rose-900">
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span><strong>{t.plate}</strong> — {t.status.toLowerCase()} required</span>
              </li>
            ))}
            <li className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-900">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>All other trucks on schedule</span>
            </li>
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
