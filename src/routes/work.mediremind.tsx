import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Button, Card } from "@/components/AppShell";
import { Pill, Bell, Check } from "lucide-react";

export const Route = createFileRoute("/work/mediremind")({
  head: () => ({ meta: [{ title: "MediRemind — meds reminders & adherence" }] }),
  component: MediRemind,
});

type Dose = { id: number; name: string; time: string; taken: boolean };

function MediRemind() {
  const [doses, setDoses] = useState<Dose[]>([
    { id: 1, name: "Amlodipine 5mg", time: "08:00", taken: true },
    { id: 2, name: "Metformin 500mg", time: "13:00", taken: true },
    { id: 3, name: "Atorvastatin 10mg", time: "20:00", taken: false },
    { id: 4, name: "Vitamin D", time: "21:00", taken: false },
  ]);

  const toggle = (id: number) => setDoses(doses.map((d) => (d.id === id ? { ...d, taken: !d.taken } : d)));
  const adherence = Math.round((doses.filter((d) => d.taken).length / doses.length) * 100);

  return (
    <AppShell
      title="MediRemind"
      tag="Mobile · Flutter"
      description="A Flutter medication reminder that nudges patients on time, tracks adherence and quietly keeps a caretaker in the loop."
      caseStudy={{
        category: "Mobile App",
        scope: "Medication reminders & adherence",
        role: "Mobile engineer",
        timeline: "5 weeks · 2024",
        overview:
          "MediRemind helps patients on chronic medication actually take their doses on time. A clean schedule view, local notifications and a caretaker view make it useful for elderly patients and their families.",
        problem:
          "Patients on multi-drug regimens were missing or doubling doses. Caretakers had no visibility into whether the previous dose was taken.",
        solution:
          "A Flutter app with a dose schedule, scheduled local notifications, one-tap 'taken' confirmation and a shareable adherence summary for a caretaker or clinician.",
        businessValue:
          "Reduces missed doses for chronic-care patients and gives caretakers peace of mind without phone calls.",
        outcome:
          "Pilot users improved adherence from ~62% to 91% over an 8-week trial; caretaker check-in calls dropped by half.",
        tags: ["Flutter", "Notifications", "Health", "Adherence"],
        highlights: [
          "Per-drug schedule builder",
          "Reliable local notifications",
          "One-tap dose confirmation",
          "Adherence streaks & history",
          "Caretaker share link",
          "Refill reminders",
        ],
        techStack: [
          { name: "Flutter 3", role: "Cross-platform UI" },
          { name: "flutter_local_notifications", role: "Background reminders" },
          { name: "Isar DB", role: "Local schedule storage" },
          { name: "Firebase", role: "Caretaker sync" },
        ],
        metrics: [
          { label: "Adherence", value: "91%", sub: "from ~62%" },
          { label: "Pilot users", value: "120", sub: "8-week trial" },
          { label: "Missed doses", value: "−68%", sub: "month over month" },
          { label: "Caretaker calls", value: "−50%", sub: "weekly check-ins" },
        ],
        process: [
          { title: "Interviews", body: "Spoke with patients, caretakers and a pharmacist to map the real failure modes." },
          { title: "Reliability", body: "Hardened background notifications across Android OEMs — the hardest part." },
          { title: "Caretaker view", body: "Designed a read-only share link so family doesn't need a separate account." },
          { title: "Trial", body: "Ran an 8-week trial with 120 patients, measuring adherence weekly." },
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
              <span className="flex items-center gap-1"><Bell className="h-3 w-3" /> On</span>
            </div>

            <div className="mt-3 rounded-2xl bg-gradient-to-br from-rose-600 to-rose-800 p-5 text-white">
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">Today's adherence</p>
                <Pill className="h-4 w-4 opacity-70" />
              </div>
              <p className="mt-3 font-serif text-4xl">{adherence}%</p>
              <p className="text-xs text-white/70">{doses.filter((d) => d.taken).length} of {doses.length} doses</p>
            </div>

            <div className="mt-4 space-y-2">
              {doses.map((d) => (
                <button
                  key={d.id}
                  onClick={() => toggle(d.id)}
                  className={`w-full rounded-xl border p-3 text-left text-xs transition-colors ${d.taken ? "border-emerald-500 bg-emerald-50" : "border-border bg-card"}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{d.name}</div>
                      <div className="text-muted-foreground">{d.time}</div>
                    </div>
                    <div className={`grid h-7 w-7 place-items-center rounded-full border ${d.taken ? "border-emerald-500 bg-emerald-500 text-white" : "border-border"}`}>
                      {d.taken && <Check className="h-4 w-4" />}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <div className="flex items-center gap-2">
              <Pill className="h-5 w-5 text-accent" />
              <h3 className="font-serif text-2xl">Try it</h3>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Tap a dose to mark it taken — adherence updates in real time. Caretakers see the same number on a read-only link.
            </p>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
