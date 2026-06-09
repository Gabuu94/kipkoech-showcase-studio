import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppShell, Button, Card, Stat } from "@/components/AppShell";
import { fetchCourses } from "@/lib/demo-api";
import cover from "@/assets/cover-soma.jpg";

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

  const answer = (i: number) => {
    if (i === quiz[step].correct) setScore((s) => s + 1);
    if (step + 1 < quiz.length) setStep(step + 1);
    else setDone(true);
  };

  const totalLearners = courses.reduce((a, c) => a + c.learners, 0);
  const avgCompletion = courses.length
    ? Math.round((courses.reduce((a, c) => a + (c.done / c.modules), 0) / courses.length) * 100)
    : 0;

  return (
    <AppShell title="Soma Bridge" tag="Learning" description="Structured courses with live database-backed progress and quick competence checks." cover={cover} caseStudy={{
      category: "Web App",
      scope: "Learning platform",
      overview: "Soma Bridge is a learning platform combining structured course content, assessments and reporting for skills training. Learners move through modules, take quick competence checks and have their progress persisted, while admins manage the catalogue and track results.",
      businessValue: "Gives training teams a single platform to publish courses and track learner progress with real data.",
      outcome: "Trainers track competence per learner in real time and replace ad-hoc PDFs with structured, assessable modules.",
      tags: ["Laravel", "LMS", "Quizzes", "API"],
      highlights: [
        "Structured course modules",
        "Inline competence quizzes",
        "Persistent learner progress",
        "Admin course management",
        "Database-backed results",
      ],
      visitUrl: "https://github.com/Gabuu94",
    }}>
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Active learners" value={String(totalLearners)} />
        <Stat label="Courses live" value={String(courses.length)} />
        <Stat label="Avg completion" value={`${avgCompletion}%`} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="font-serif text-2xl">Course progress</h3>
          <div className="mt-5 space-y-4">
            {courses.map((c) => (
              <div key={c.id}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{c.title}</span>
                  <span className="text-muted-foreground">{c.done}/{c.modules}</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-foreground" style={{ width: `${(c.done / c.modules) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-serif text-2xl">Quick assessment</h3>
          {!done ? (
            <div className="mt-5">
              <p className="eyebrow">Question {step + 1} / {quiz.length}</p>
              <p className="mt-3 text-lg">{quiz[step].q}</p>
              <div className="mt-5 space-y-2">
                {quiz[step].a.map((a, i) => (
                  <button key={i} onClick={() => answer(i)} className="block w-full rounded-xl border border-border bg-background px-4 py-3 text-left text-sm hover:border-foreground">
                    {a}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-5">
              <p className="eyebrow">Result</p>
              <p className="mt-3 font-serif text-4xl">{score} / {quiz.length}</p>
              <p className="mt-2 text-sm text-muted-foreground">{score === quiz.length ? "Perfect score — certificate issued." : "Review the module and retry."}</p>
              <Button className="mt-5" onClick={() => { setStep(0); setScore(0); setDone(false); }}>RETAKE</Button>
            </div>
          )}
        </Card>
      </div>
    </AppShell>
  );
}
