import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, Button, Card, Input, Select } from "@/components/AppShell";

export const Route = createFileRoute("/work/clinicqueue")({
  head: () => ({ meta: [{ title: "ClinicQueue — booking demo" }] }),
  component: ClinicQueue,
});

const clinicians = [
  { id: 1, name: "Dr. Aisha Mohamed", specialty: "General", next: ["09:00", "09:30", "10:00", "11:30"] },
  { id: 2, name: "Dr. Brian Otieno", specialty: "Dental", next: ["09:15", "10:45", "13:00"] },
  { id: 3, name: "Dr. Caroline Njeri", specialty: "Paediatrics", next: ["08:30", "10:00", "11:00", "14:00"] },
];

type Booking = { id: number; patient: string; clinician: string; time: string };

function ClinicQueue() {
  const [bookings, setBookings] = useState<Booking[]>([
    { id: 1, patient: "James Mwangi", clinician: "Dr. Aisha Mohamed", time: "08:30" },
  ]);
  const [patient, setPatient] = useState("");
  const [doc, setDoc] = useState(clinicians[0].name);
  const [time, setTime] = useState(clinicians[0].next[0]);

  const slots = clinicians.find((c) => c.name === doc)?.next ?? [];

  const book = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient) return;
    setBookings([...bookings, { id: Date.now(), patient, clinician: doc, time }]);
    setPatient("");
  };

  return (
    <AppShell title="ClinicQueue" tag="Bookings" description="Patient discovery and scheduling against clinician availability — no double-bookings, no phone tag.">
      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <Card>
          <h3 className="font-serif text-2xl">Book appointment</h3>
          <form className="mt-5 space-y-3" onSubmit={book}>
            <Input placeholder="Patient name" value={patient} onChange={(e) => setPatient(e.target.value)} />
            <Select value={doc} onChange={(e) => { setDoc(e.target.value); setTime(clinicians.find(c => c.name === e.target.value)!.next[0]); }}>
              {clinicians.map((c) => <option key={c.id}>{c.name}</option>)}
            </Select>
            <Select value={time} onChange={(e) => setTime(e.target.value)}>
              {slots.map((s) => <option key={s}>{s}</option>)}
            </Select>
            <Button type="submit">CONFIRM BOOKING</Button>
          </form>
        </Card>

        <div className="grid gap-4">
          <Card>
            <h3 className="font-serif text-2xl">Today's clinicians</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {clinicians.map((c) => (
                <div key={c.id} className="rounded-xl border border-border bg-background p-4">
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.specialty}</div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {c.next.map((t) => <span key={t} className="chip">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-serif text-2xl">Confirmed queue</h3>
            <ul className="mt-4 divide-y divide-border">
              {bookings.map((b) => (
                <li key={b.id} className="flex items-center justify-between py-3 text-sm">
                  <span className="font-medium">{b.patient}</span>
                  <span className="text-muted-foreground">{b.clinician} · {b.time}</span>
                </li>
              ))}
              {!bookings.length && <p className="py-3 text-sm text-muted-foreground">No bookings yet.</p>}
            </ul>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
