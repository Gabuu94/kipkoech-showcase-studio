import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppShell, Button, Card, Stat } from "@/components/AppShell";
import { Donut } from "@/components/Charts";
import { fetchCourses } from "@/lib/demo-api";
import cover from "@/assets/cover-soma.jpg";
import gal1 from "@/assets/gallery/soma-1.jpg";
import gal2 from "@/assets/gallery/soma-2.jpg";
import { BookOpen, GraduationCap, Award } from "lucide-react";

export const Route = createFileRoute("/work/soma-bridge")({
  head: () => ({ meta: [{ title: "Soma Bridge — learning demo" }] }),
  component: Soma,
});

const quiz = [
  { q: "What is double-entry bookkeeping?", a: ["Two ledgers", "Every transaction recorded twice", "Two accountants"], correct: 1 },
  { q: "Best way to handle a complaint?", a: ["Ignore it", "Listen, acknowledge, resolve", "Argue back"], correct: 1 },
  { q: "PPE stands for?", a: ["Personal Protective Equipment", "Public Project Eval", "Process Performance Estimate"], correct: 0 },
];

function Soma() {
  const { data: courses = [] } = useQuery({ queryKey: ["courses"], queryFn: fetchCourses });
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);

  const answer = (i: number) => {
    setPicked(i);
    setTimeout(() => {
      if (i === quiz[step].correct) setScore((s) => s + 1);
      if (step + 1 < quiz.length) setStep(step + 1);
      else setDone(true);
      setPicked(null);
    }, 500);
  };

  const totalLearners = courses.reduce((a, c) => a + c.learners, 0);
  const avgCompletion = courses.length
    ? Math.round((courses.reduce((a, c) => a + c.done / c.modules, 0) / courses.length) * 100)
    : 0;

  return (
    <AppShell
      title="Soma Bridge"
      tag="Learning platform"
      description="Structured courses with live database-backed progress and quick competence checks. Built for SACCOs, NGOs and corporate skills programs."
      cover={cover}
      gallery={[
        { src: cover, alt: "Soma Bridge cover", caption: "Soma Bridge — learning platform" },
        { src: gal1, alt: "Learning module on laptop", caption: "Course module with video and progress tracking" },
        { src: gal2, alt: "Learner with certificate", caption: "Auto-issued certificate on cohort completion" },
      ]}
      caseStudy={{
        category: "Web App",
        scope: "Learning management platform",
        role: "Full-stack engineer",
        timeline: "Q4 2024 · 3 months",
        overview:
          "Soma Bridge is a learning platform combining structured course content, assessments and reporting for skills training. Learners move through modules, take quick competence checks and have their progress persisted, while admins manage the catalogue and track results.",
        problem:
          "Skills trainers were emailing PDFs and Excel quizzes to 400+ learners. There was no way to track who actually finished, no way to assess competence, no way to issue certificates.",
        solution:
          "Modular courses with inline quizzes, persistent learner state, admin authoring tools, and auto-generated certificates on pass.",
        businessValue:
          "Gives training teams a single platform to publish courses, assess competence and prove outcomes — with real data.",
        outcome:
          "Course completion jumped from 31% (PDFs) to 78%. Trainers issued 240 verified certificates in the first quarter.",
        tags: ["Laravel", "LMS", "Quizzes", "Certificates"],
        highlights: [
          "Structured course modules",
          "Inline competence quizzes",
          "Persistent learner progress",
          "Admin course management",
          "Auto-generated certificates",
          "Cohort & branch reporting",
        ],
        techStack: [
          { name: "Laravel 11", role: "API & content engine" },
          { name: "PostgreSQL", role: "Progress & assessment store" },
          { name: "React", role: "Learner & admin UI" },
          { name: "PDF generation", role: "Certificate issuing" },
        ],
        metrics: [
          { label: "Completion rate", value: "78%", sub: "from 31% on PDFs" },
          { label: "Active learners", value: "420+", sub: "across 3 cohorts" },
          { label: "Certificates issued", value: "240", sub: "in 90 days" },
          { label: "Avg assessment", value: "82%", sub: "first-attempt pass" },
        ],
        process: [
          { title: "Interview", body: "Talked to 6 trainers about why PDFs failed — finishing was invisible, quizzes were a hassle." },
          { title: "Author", body: "Built a content authoring tool first; trainers tested it on real material before the learner UI existed." },
          { title: "Assess", body: "Inline quizzes that block module progression until passed, with retry logic and explanations." },
          { title: "Reward", body: "Auto-generated, verifiable certificates on cohort completion to drive finishing motivation." },
        ],
        testimonial: {
          quote: "I can finally prove our training works. Every learner has a record and the numbers don't lie.",
          author: "Eng. C. Mwangi",
          role: "Training lead, technical SACCO",
        },
        visitUrl: "https://github.com/Gabuu94",
      }}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Active learners" value={String(totalLearners)} sub="across cohorts" />
        <Stat label="Courses live" value={String(courses.length)} sub="published catalogue" />
        <Stat label="Avg completion" value={`${avgCompletion}%`} sub="across courses" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-accent" />
            <h3 className="font-serif text-2xl">Course progress</h3>
          </div>
          <div className="mt-5 space-y-5">
            {courses.map((c) => {
              const pct = Math.round((c.done / c.modules) * 100);
              return (
                <div key={c.id}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{c.title}</span>
                    <span className="text-muted-foreground">{c.done}/{c.modules} modules · {c.learners} learners</span>
                  </div>
                  <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full transition-all ${pct >= 80 ? "bg-emerald-500" : pct >= 50 ? "bg-foreground" : "bg-amber-500"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-accent" />
            <h3 className="font-serif text-xl">Cohort progress</h3>
          </div>
          <div className="mt-5 flex flex-col items-center">
            <div className="text-foreground">
              <Donut value={avgCompletion} total={100} label="completed" />
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Average across {courses.length} active courses
            </p>
          </div>
        </Card>
      </div>

      <Card className="mt-6">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-accent" />
          <h3 className="font-serif text-2xl">Quick assessment</h3>
        </div>
        {!done ? (
          <div className="mt-5">
            <div className="flex items-center justify-between">
              <p className="eyebrow">Question {step + 1} / {quiz.length}</p>
              <div className="h-1.5 w-32 overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-foreground transition-all" style={{ width: `${((step + 1) / quiz.length) * 100}%` }} />
              </div>
            </div>
            <p className="mt-4 font-serif text-2xl">{quiz[step].q}</p>
            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              {quiz[step].a.map((a, i) => {
                const isCorrect = picked !== null && i === quiz[step].correct;
                const isWrong = picked === i && i !== quiz[step].correct;
                return (
                  <button
                    key={i}
                    onClick={() => picked === null && answer(i)}
                    className={`rounded-xl border px-4 py-4 text-left text-sm transition-all ${
                      isCorrect
                        ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                        : isWrong
                        ? "border-rose-500 bg-rose-50 text-rose-900"
                        : "border-border bg-background hover:border-foreground"
                    }`}
                  >
                    <span className="font-mono text-xs text-muted-foreground">{String.fromCharCode(65 + i)}</span>
                    <p className="mt-1 font-medium">{a}</p>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-border bg-background p-6 text-center">
            <p className="eyebrow">Result</p>
            <p className="mt-3 font-serif text-6xl">{score} / {quiz.length}</p>
            <p className="mt-3 text-sm text-muted-foreground">
              {score === quiz.length ? "Perfect score — certificate issued." : "Review the module and retry."}
            </p>
            <Button className="mt-5" onClick={() => { setStep(0); setScore(0); setDone(false); }}>RETAKE</Button>
          </div>
        )}
      </Card>
    </AppShell>
  );
}
