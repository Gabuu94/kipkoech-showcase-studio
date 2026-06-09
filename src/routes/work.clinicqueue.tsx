import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AppShell, Button, Card, Input, Select } from "@/components/AppShell";
import { fetchClinicians, fetchAppointments, bookAppointment } from "@/lib/demo-api";
import cover from "@/assets/cover-clinic.jpg";

export const Route = createFileRoute("/work/clinicqueue")({
  head: () => ({ meta: [{ title: "ClinicQueue — booking demo" }] }),
  component: ClinicQueue,
});

function ClinicQueue() {
  const qc = useQueryClient();
  const { data: clinicians = [] } = useQuery({ queryKey: ["clinicians"], queryFn: fetchClinicians });
  const { data: bookings = [] } = useQuery({ queryKey: ["appointments"], queryFn: fetchAppointments });
  const book = useMutation({
    mutationFn: bookAppointment,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["appointments"] }),
  });

  const [patient, setPatient] = useState("");
  const [doc, setDoc] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (clinicians.length && !doc) {
      setDoc(clinicians[0].full_name);
      setTime(clinicians[0].slots[0] ?? "");
    }
  }, [clinicians, doc]);

  const slots = clinicians.find((c) => c.full_name === doc)?.slots ?? [];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient || !doc || !time) return;
    book.mutate({ patient, clinician: doc, slot: time });
    setPatient("");
  };

  return (
    <AppShell title="ClinicQueue" tag="Bookings" description="Patient bookings stored in a live database. Confirmations persist across every visitor's screen." cover={cover}>
      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <Card>
          <h3 className="font-serif text-2xl">Book appointment</h3>
          <form className="mt-5 space-y-3" onSubmit={submit}>
            <Input placeholder="Patient name" value={patient} onChange={(e) => setPatient(e.target.value)} />
            <Select value={doc} onChange={(e) => { setDoc(e.target.value); const c = clinicians.find(c => c.full_name === e.target.value); setTime(c?.slots[0] ?? ""); }}>
              {clinicians.map((c) => <option key={c.id}>{c.full_name}</option>)}
            </Select>
            <Select value={time} onChange={(e) => setTime(e.target.value)}>
              {slots.map((s) => <option key={s}>{s}</option>)}
            </Select>
            <Button type="submit" disabled={book.isPending}>{book.isPending ? "BOOKING…" : "CONFIRM BOOKING"}</Button>
          </form>
        </Card>

        <div className="grid gap-4">
          <Card>
            <h3 className="font-serif text-2xl">Today's clinicians</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {clinicians.map((c) => (
                <div key={c.id} className="rounded-xl border border-border bg-background p-4">
                  <div className="font-medium">{c.full_name}</div>
                  <div className="text-xs text-muted-foreground">{c.specialty}</div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {c.slots.map((t) => <span key={t} className="chip">{t}</span>)}
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
                  <span className="text-muted-foreground">{b.clinician} · {b.slot}</span>
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
