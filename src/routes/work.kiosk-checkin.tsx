import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Card } from "@/components/AppShell";
import { Fingerprint, ShieldCheck } from "lucide-react";

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
        setMsg({ text: `Welcome, ${person.name.split(" ")[0]} — checked in ${time}`, ok: true });
        setLog([{ id: Date.now(), name: person.name, time }, ...log].slice(0, 8));
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
    <AppShell
      title="Kiosk Check-In"
      tag="Mobile · Shared device"
      description="A single tablet at the entrance. Staff punch a PIN, the kiosk logs them in, events stream straight into the HR backend."
      caseStudy={{
        category: "Mobile App",
        scope: "Shared-device kiosk",
        role: "Mobile + integration engineer",
        timeline: "3 weeks · 2024",
        overview:
          "Kiosk Check-In runs on a shared tablet at the entrance. Staff punch a personal PIN to clock in or out and events stream straight into the HR backend — ideal for sites where individual phones aren't issued.",
        problem:
          "A factory of 240 staff didn't issue personal phones, and the old biometric box was breaking down. Attendance was missed for hours when the box was offline.",
        solution:
          "A Flutter kiosk running on a wall-mounted tablet. PIN-based identification, instant feedback, offline queue, push to HR backend the second connectivity returns.",
        businessValue:
          "Brings reliable attendance to sites where issuing personal devices isn't practical.",
        outcome:
          "Sites without staff phones still capture clean attendance data flowing directly into payroll. Zero missed shifts in the first quarter.",
        tags: ["Flutter", "Kiosk", "Attendance", "Offline"],
        highlights: [
          "PIN-based identification",
          "Shared-device flow",
          "Direct push to HR backend",
          "Offline queue with auto-sync",
          "Entrance-friendly large UI",
          "Auto-logout after each punch",
        ],
        techStack: [
          { name: "Flutter 3", role: "Tablet UI" },
          { name: "Hive", role: "Offline punch queue" },
          { name: "Shiftboard API", role: "HR backend sync" },
          { name: "Android lock task mode", role: "Kiosk lockdown" },
        ],
        metrics: [
          { label: "Missed shifts", value: "0", sub: "Q1 post-launch" },
          { label: "Punch latency", value: "<1s", sub: "tap to confirmation" },
          { label: "Staff served", value: "240", sub: "single shared tablet" },
          { label: "Offline window", value: "8h+", sub: "queues uninterrupted" },
        ],
        process: [
          { title: "Constraints", body: "Locked-down tablet, no personal phones, mixed literacy — UI had to be obvious." },
          { title: "PIN flow", body: "4-digit PIN with big buttons and immediate audio + visual feedback." },
          { title: "Offline", body: "Local queue with timestamp; sync happens silently when wifi returns." },
          { title: "Kiosk mode", body: "Android lock-task pinning prevents any other app from being opened on the device." },
        ],
        visitUrl: "https://github.com/Gabuu94",
      }}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-8">
          <div className="rounded-2xl bg-gradient-to-br from-foreground to-foreground/80 p-6 text-center text-background">
            <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-background/60">
              <Fingerprint className="h-3 w-3" /> Enter staff PIN
            </div>
            <p className="mt-3 font-serif text-5xl tracking-[0.4em]">{pin.padEnd(4, "•")}</p>
            {msg && (
              <p className={`mt-4 rounded-lg px-3 py-2 text-sm ${msg.ok ? "bg-emerald-500/20 text-emerald-200" : "bg-rose-500/20 text-rose-200"}`}>
                {msg.text}
              </p>
            )}
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "OK"].map((k) => (
              <button
                key={k}
                onClick={() => press(k)}
                className={`rounded-2xl border border-border py-6 font-serif text-2xl transition-all active:scale-95 ${
                  k === "OK"
                    ? "bg-foreground text-background hover:bg-accent"
                    : k === "C"
                    ? "bg-rose-50 text-rose-700 border-rose-200 hover:border-rose-400"
                    : "bg-background hover:border-foreground"
                }`}
              >
                {k}
              </button>
            ))}
          </div>
          <p className="mt-4 text-center text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Try PIN: 1042 · 1108 · 1199 · 1234
          </p>
        </div>

        <div className="space-y-4">
          <Card>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-accent" />
              <h3 className="font-serif text-2xl">Recent check-ins</h3>
            </div>
            <ul className="mt-5 divide-y divide-border">
              {log.map((l) => (
                <li key={l.id} className="flex items-center justify-between py-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-emerald-100 font-serif text-xs text-emerald-700">
                      {l.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </div>
                    <span className="font-medium">{l.name}</span>
                  </div>
                  <span className="text-muted-foreground">{l.time}</span>
                </li>
              ))}
              {!log.length && <p className="py-3 text-sm text-muted-foreground">No check-ins yet — try a PIN above.</p>}
            </ul>
          </Card>
          <Card>
            <h3 className="font-serif text-xl">Why a kiosk</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>· Works when staff don't have personal phones</li>
              <li>· One-handed punch with audio + visual confirmation</li>
              <li>· Locked-down tablet — no other apps accessible</li>
              <li>· Offline queue, syncs the moment wifi returns</li>
            </ul>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
