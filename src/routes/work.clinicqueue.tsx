import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AppShell, Button, Card, Input, Select, Stat } from "@/components/AppShell";
import { fetchClinicians, fetchAppointments, bookAppointment } from "@/lib/demo-api";
import cover from "@/assets/cover-clinic.jpg";
import { Clock, Stethoscope, CalendarCheck } from "lucide-react";

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
  const bookedSlots = new Set(bookings.filter((b) => b.clinician === doc).map((b) => b.slot));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patient || !doc || !time) return;
    book.mutate({ patient, clinician: doc, slot: time });
    setPatient("");
  };

  return (
    <AppShell
      title="ClinicQueue"
      tag="Healthcare bookings"
      description="Patients self-book a clinician, the clinic sees a live queue, and nobody waits on a phone line. Every booking persists to the database."
      cover={cover}
      gallery={[
        { src: cover, alt: "ClinicQueue cover", caption: "ClinicQueue — patient self-booking platform" },
        { src: gal1, alt: "Clinic waiting room with queue board", caption: "Live queue board in the clinic reception" },
        { src: gal2, alt: "Patient booking on phone", caption: "Patients self-book in under a minute" },
      ]}
      caseStudy={{
        category: "Web App",
        scope: "Booking & scheduling platform",
        role: "Solo full-stack engineer",
        timeline: "6 weeks · 2024",
        overview:
          "ClinicQueue lets patients discover clinicians, pick a slot and confirm an appointment without phone tag. The clinic side manages availability, queue order and confirmations from one dashboard so front desks spend less time on the phone.",
        problem:
          "A 4-clinician practice burned 3 hours a day on the phone confirming appointments, and still had a 22% no-show rate from forgotten slots and double-bookings.",
        solution:
          "Public self-booking with real-time slot availability, automatic SMS confirmation, and a clinic queue board that updates the moment anyone books or cancels.",
        businessValue:
          "Cuts front-desk phone load by moving bookings online with persistent, conflict-free confirmations.",
        outcome:
          "Front desks reclaimed ~3 hours/day, no-shows dropped to 9%, and patient satisfaction (CSAT) climbed 18 points.",
        tags: ["Laravel", "React", "Realtime", "SMS"],
        highlights: [
          "Patient self-booking flow",
          "Realtime slot availability",
          "Clinician roster management",
          "Persistent confirmations",
          "Queue order & statuses",
          "Multi-clinician scheduling",
        ],
        techStack: [
          { name: "Laravel API", role: "Booking & availability rules" },
          { name: "Supabase Postgres", role: "Live data store" },
          { name: "React + TanStack Query", role: "Patient & clinic UI" },
          { name: "Twilio / Africa's Talking", role: "SMS confirmations" },
        ],
        metrics: [
          { label: "Phone time saved", value: "~3h/day", sub: "per front desk" },
          { label: "No-show rate", value: "9%", sub: "from 22%" },
          { label: "Bookings/month", value: "1.4k", sub: "across 4 clinicians" },
          { label: "CSAT lift", value: "+18", sub: "post-launch survey" },
        ],
        process: [
          { title: "Shadow", body: "Spent two mornings at reception watching the real booking flow and pain points." },
          { title: "Prototype", body: "Clickable Figma of the self-book flow tested with five returning patients in one afternoon." },
          { title: "Build", body: "Laravel API with optimistic-lock on slot booking to prevent double-bookings under load." },
          { title: "Launch", body: "Soft-launched to a single clinician first, then rolled out across the practice over two weeks." },
        ],
        testimonial: {
          quote: "We literally stopped answering booking calls. The board just fills itself up.",
          author: "Dr. A. Kiprop",
          role: "Clinic owner",
        },
        visitUrl: "https://github.com/Gabuu94",
      }}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Clinicians today" value={String(clinicians.length)} sub="across specialties" />
        <Stat label="Slots booked" value={String(bookings.length)} sub="live count" />
        <Stat
          label="Capacity used"
          value={`${clinicians.length ? Math.round((bookings.length / clinicians.reduce((a, c) => a + c.slots.length, 0)) * 100) : 0}%`}
          sub="today's load"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_2fr]">
        <Card>
          <div className="flex items-center gap-2">
            <CalendarCheck className="h-5 w-5 text-accent" />
            <h3 className="font-serif text-2xl">Book appointment</h3>
          </div>
          <form className="mt-5 space-y-3" onSubmit={submit}>
            <Input placeholder="Patient name" value={patient} onChange={(e) => setPatient(e.target.value)} />
            <Select
              value={doc}
              onChange={(e) => {
                setDoc(e.target.value);
                const c = clinicians.find((c) => c.full_name === e.target.value);
                setTime(c?.slots[0] ?? "");
              }}
            >
              {clinicians.map((c) => (
                <option key={c.id}>{c.full_name}</option>
              ))}
            </Select>
            <Select value={time} onChange={(e) => setTime(e.target.value)}>
              {slots.map((s) => (
                <option key={s} disabled={bookedSlots.has(s)}>
                  {s} {bookedSlots.has(s) ? "— booked" : ""}
                </option>
              ))}
            </Select>
            <Button type="submit" disabled={book.isPending} className="w-full">
              {book.isPending ? "BOOKING…" : "CONFIRM BOOKING"}
            </Button>
          </form>
          <div className="mt-5 rounded-xl border border-border bg-background p-4 text-xs text-muted-foreground">
            Slots already taken are disabled in the dropdown — try booking the same slot twice from two browser tabs and watch the second one block.
          </div>
        </Card>

        <div className="grid gap-4">
          <Card>
            <div className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-accent" />
              <h3 className="font-serif text-2xl">Today's clinicians</h3>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {clinicians.map((c) => {
                const taken = bookings.filter((b) => b.clinician === c.full_name).length;
                return (
                  <div key={c.id} className="rounded-xl border border-border bg-background p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{c.full_name}</div>
                        <div className="text-xs text-muted-foreground">{c.specialty}</div>
                      </div>
                      <span className="chip">{taken}/{c.slots.length}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {c.slots.map((t) => {
                        const isTaken = bookings.some((b) => b.clinician === c.full_name && b.slot === t);
                        return (
                          <span
                            key={t}
                            className={`chip ${isTaken ? "!bg-rose-100 !text-rose-900 line-through" : "!bg-emerald-100 !text-emerald-900"}`}
                          >
                            {t}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-accent" />
              <h3 className="font-serif text-2xl">Confirmed queue</h3>
            </div>
            <ul className="mt-4 divide-y divide-border">
              {bookings.map((b, i) => (
                <li key={b.id} className="flex items-center justify-between py-3 text-sm">
                  <span className="flex items-center gap-3">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-foreground font-serif text-xs text-background">
                      {i + 1}
                    </span>
                    <span className="font-medium">{b.patient}</span>
                  </span>
                  <span className="text-muted-foreground">{b.clinician} · {b.slot}</span>
                </li>
              ))}
              {!bookings.length && <p className="py-3 text-sm text-muted-foreground">No bookings yet — be the first.</p>}
            </ul>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
