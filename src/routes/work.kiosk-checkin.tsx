import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Button, Card } from "@/components/AppShell";

export const Route = createFileRoute("/work/kiosk-checkin")({
  head: () => ({ meta: [{ title: "Kiosk Check-In — shared device" }] }),
  component: Kiosk,
});

const staff = [
  { id: "1042", name: "Achieng' Otieno" },
  { id: "1108", name: "Brian Kemboi" },
  { id: "1199", name: "Cynthia Wanjiku" },
  { id: "1234", name: "David Mwangi" },
];

function Kiosk() {
  const [pin, setPin] = useState("");
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [log, setLog] = useState<{ id: number; name: string; time: string }[]>([]);

  const press = (n: string) => {
    if (n === "C") return setPin("");
    if (n === "OK") {
      const person = staff.find((s) => s.id === pin);
      if (person) {
        const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setMsg({ text: `Welcome, ${person.name}`, ok: true });
        setLog([{ id: Date.now(), name: person.name, time }, ...log].slice(0, 6));
      } else {
        setMsg({ text: "PIN not recognised", ok: false });
      }
      setPin("");
      setTimeout(() => setMsg(null), 2500);
      return;
    }
    if (pin.length < 4) setPin(pin + n);
  };

  return (
    <AppShell title="Kiosk Check-In" tag="Mobile" description="A single shared device at the entrance. Staff punch a PIN, the kiosk logs them in and pushes to HR." caseStudy={{
      category: "Mobile App",
      scope: "Shared-device kiosk",
      overview: "Kiosk Check-In runs on a shared tablet at the entrance. Staff punch a personal PIN to clock in or out and events stream straight into the HR backend — ideal for sites where individual phones aren't issued.",
      businessValue: "Brings reliable attendance to sites where issuing personal devices isn't practical.",
      outcome: "Sites without staff phones still capture clean attendance data flowing directly into payroll.",
      tags: ["Flutter", "Kiosk", "Attendance", "HRMS"],
      highlights: [
        "PIN-based identification",
        "Shared-device flow",
        "Direct push to HR backend",
        "Entrance-friendly UI",
        "Multi-user support",
      ],
      visitUrl: "https://github.com/Gabuu94",
    }}>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-8">
          <div className="rounded-2xl bg-foreground p-6 text-center text-background">
            <p className="text-[10px] uppercase tracking-[0.2em] text-background/60">Enter staff PIN</p>
            <p className="mt-3 font-serif text-5xl tracking-widest">{pin.padEnd(4, "•")}</p>
            {msg && (
              <p className={`mt-3 text-sm ${msg.ok ? "text-emerald-300" : "text-rose-300"}`}>{msg.text}</p>
            )}
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "OK"].map((k) => (
              <button
                key={k}
                onClick={() => press(k)}
                className={`rounded-2xl border border-border py-5 font-serif text-2xl transition-colors ${k === "OK" ? "bg-foreground text-background hover:bg-accent" : "bg-background hover:border-foreground"}`}
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        <Card>
          <h3 className="font-serif text-2xl">Recent check-ins</h3>
          <ul className="mt-5 divide-y divide-border">
            {log.map((l) => (
              <li key={l.id} className="flex items-center justify-between py-3 text-sm">
                <span className="font-medium">{l.name}</span>
                <span className="text-muted-foreground">{l.time}</span>
              </li>
            ))}
            {!log.length && <p className="py-3 text-sm text-muted-foreground">Try PIN 1042, 1108, 1199 or 1234.</p>}
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
