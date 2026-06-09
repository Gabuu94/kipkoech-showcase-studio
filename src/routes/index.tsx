import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Rocket, Mail, ArrowUpRight, Github, Linkedin, Twitter, Phone, MessageCircle, Menu, X } from "lucide-react";
import heroImg from "@/assets/hero.png";
import coverLedgerly from "@/assets/cover-ledgerly.jpg";
import coverShiftboard from "@/assets/cover-shiftboard.jpg";
import coverRouteline from "@/assets/cover-routeline.jpg";
import coverKazana from "@/assets/cover-kazana.jpg";
import coverClinic from "@/assets/cover-clinic.jpg";
import coverSoma from "@/assets/cover-soma.jpg";
import logoMpesa from "@/assets/logos/mpesa.png";
import logoKcb from "@/assets/logos/kcb.png";
import logoStripe from "@/assets/logos/stripe.png";
import logoPaystack from "@/assets/logos/paystack.png";
import logoEtims from "@/assets/logos/etims.png";
import logoMongoDB from "@/assets/logos/mongodb.png";
import logoExpress from "@/assets/logos/express.png";
import logoReact from "@/assets/logos/react.png";
import logoNodeJS from "@/assets/logos/nodejs.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gabriel Kipkoech — Software Engineer" },
      { name: "description", content: "Full-stack engineer crafting web platforms, Flutter apps, dashboards and integrations across SaaS, HR, POS and logistics." },
      { property: "og:title", content: "Gabriel Kipkoech — Software Engineer" },
      { property: "og:description", content: "Full-stack engineer crafting web platforms, Flutter apps, dashboards and integrations." },
    ],
  }),
  component: Index,
});

const navLinks = [
  { label: "Approach", href: "#approach" },
  { label: "Services", href: "#services" },
  { label: "Proof", href: "#proof" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const stats = [
  { value: "3 years", label: "Delivery depth", body: "Hands-on shipping across internal tools, business platforms, and long-lived operational systems." },
  { value: "20+", label: "Live builds", body: "Projects spanning HR, retail, logistics, education, attendance and SaaS workflows." },
  { value: "Laravel / Node", label: "Backend strength", body: "Comfortable with business rules, APIs, reporting, permissions and system structure." },
  { value: "Flutter / Web", label: "Cross-surface execution", body: "Connecting backend systems to mobile and web interfaces that teams can actually use." },
];

const approach = [
  { title: "Systems", body: "I map the workflow first, then shape the product around permissions, data flow, integrations and reporting." },
  { title: "Usability", body: "The interface should reduce hesitation and make the next action obvious for the people using it daily." },
  { title: "Ownership", body: "I move from product framing into implementation without losing the business objective along the way." },
];

const services = [
  { title: "Product builds", body: "New SaaS products, internal systems, MVPs and business platforms shaped from requirements through launch." },
  { title: "Operational software", body: "HR, POS, logistics, dashboards, workflows, approvals and reporting-heavy systems for day-to-day use." },
  { title: "Payments & integrations", body: "M-Pesa, Stripe, Paystack and third-party APIs with sync workflows and reconciliation logic." },
  { title: "Automation", body: "Reducing manual work through APIs, process improvements, connected systems and product-side automation." },
];

const projects = [
  { tag: "Bookkeeping SaaS", name: "Ledgerly", slug: "/work/ledgerly", cover: coverLedgerly, body: "Invoicing, reconciliation and tax-ready reports for small businesses — built around real bookkeeping workflows.", tags: ["Laravel", "PostgreSQL", "M-Pesa", "eTIMS"] },
  { tag: "HR Platform", name: "Shiftboard HRMS", slug: "/work/shiftboard", cover: coverShiftboard, body: "Attendance, payroll workflows and reporting for distributed teams across multiple branches and shifts.", tags: ["Laravel", "Vue", "Payroll", "Reporting"] },
  { tag: "Logistics Dashboard", name: "Routeline", slug: "/work/routeline", cover: coverRouteline, body: "Fleet expense tracking, fuel monitoring and driver performance — turning trip data into operating insight.", tags: ["Node", "Charts", "Fleet", "Geo"] },
  { tag: "Retail POS Backend", name: "Kazana Retail", slug: "/work/kazana-retail", cover: coverKazana, body: "SaaS POS backend handling stock, multi-outlet inventory and structured selling across retail floors.", tags: ["Laravel", "POS", "Inventory", "Multi-tenant"] },
  { tag: "Healthcare Booking", name: "ClinicQueue", slug: "/work/clinicqueue", cover: coverClinic, body: "Patient discovery, scheduling and clinician availability — built to cut queueing and no-shows.", tags: ["React", "Bookings", "SMS", "Calendar"] },
  { tag: "Learning Platform", name: "Soma Bridge", slug: "/work/soma-bridge", cover: coverSoma, body: "Structured content, assessments and integrations for skills training across distributed learner cohorts.", tags: ["Laravel", "LMS", "Assessments", "API"] },
] as const;


const capabilities = [
  { title: "Backend", body: "Application logic, APIs, reporting, data modeling and operational workflows.", tags: ["PHP", "Laravel", "Node", "PostgreSQL", "REST APIs", "Reports"] },
  { title: "Frontend & Mobile", body: "Web interfaces and Flutter apps built around clarity, speed and real use.", tags: ["React", "Vue", "Flutter", "Tailwind", "Blade", "UI Systems"] },
  { title: "Business Domains", body: "Products shaped by operations, transactions and day-to-day business processes.", tags: ["SaaS", "POS", "HR", "Bookings", "Fleet", "AgriTech"] },
  { title: "Delivery", body: "The supporting practices that make releases steadier and systems easier to maintain.", tags: ["Git", "Docker", "Vercel", "Debugging", "Integrations", "Automation"] },
];

const integrations = [
  { name: "M-Pesa Daraja", logo: logoMpesa },
  { name: "KCB Buni", logo: logoKcb },
  { name: "Stripe", logo: logoStripe },
  { name: "Paystack", logo: logoPaystack },
  { name: "eTIMS", logo: logoEtims },
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen">
      {/* NAV */}
      <header className="sticky top-4 z-50 px-4">
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-border bg-card/80 px-3 py-2.5 sm:px-4 sm:py-3 shadow-sm backdrop-blur">
          <a href="#" className="flex items-center gap-3 min-w-0">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-foreground font-serif text-sm font-semibold text-background">GK</span>
            <span className="flex flex-col leading-tight min-w-0">
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] truncate">GABRIEL KIPKOECH</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground truncate">Software Engineer</span>
            </span>
          </a>
          <ul className="hidden md:flex items-center gap-6 text-xs font-semibold tracking-[0.18em]">
            {navLinks.map((l) => (
              <li key={l.href}><a href={l.href} className="hover:text-accent transition-colors">{l.label.toUpperCase()}</a></li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a href="tel:254797585941" className="hidden md:inline-flex rounded-full bg-foreground px-4 py-2.5 text-[11px] font-bold tracking-[0.18em] text-background hover:bg-accent transition-colors">
              BOOK A CALL
            </a>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background hover:border-foreground transition-colors"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="md:hidden mx-auto mt-3 max-w-6xl rounded-3xl border border-border bg-card/95 p-3 shadow-lg backdrop-blur">
            <ul className="flex flex-col gap-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between rounded-2xl border border-border bg-background px-5 py-4 text-xs font-bold tracking-[0.18em] hover:border-foreground transition-colors"
                  >
                    {l.label.toUpperCase()}
                    <ArrowUpRight className="h-4 w-4 text-accent" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="tel:254797585941"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-foreground px-5 py-4 text-xs font-bold tracking-[0.18em] text-background hover:bg-accent transition-colors"
                >
                  <Phone className="h-4 w-4" /> BOOK A CALL
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="px-4 pt-16 pb-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Software Engineer</p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              I build software that helps teams ship with less friction.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              Full-stack engineer with 3 years building Laravel and Node platforms,
              Flutter apps, dashboards and integrations across HR, retail, logistics
              and SaaS products.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#work" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-xs font-bold tracking-[0.18em] text-background hover:bg-accent transition-colors">
                <Rocket className="h-4 w-4" /> VIEW WORK
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-xs font-bold tracking-[0.18em] hover:border-foreground transition-colors">
                <Mail className="h-4 w-4" /> CONTACT ME
              </a>
            </div>
          </div>
          <div className="relative">
            <img src={heroImg} alt="Gabriel Kipkoech at work" width={1024} height={1024} className="w-full max-w-[560px] mx-auto" />
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section id="proof" className="border-t border-border px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">Proof</p>
          <h2 className="mt-4 max-w-3xl text-4xl sm:text-5xl">
            Built around working software, not portfolio filler.
          </h2>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            The through-line in my work is operational clarity: software that helps teams
            record, track, reconcile, sell, manage and report with less friction.
          </p>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-serif text-3xl">{s.value}</div>
                <p className="eyebrow mt-3 !text-foreground/70">{s.label}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section id="approach" className="border-t border-border px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">Approach</p>
          <h2 className="mt-4 max-w-3xl text-4xl sm:text-5xl">
            I work best where engineering has to translate business mess into usable structure.
          </h2>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            That usually means unclear workflows, spreadsheet-heavy processes, manual
            follow-up, and teams who know what hurts but don't yet have the software
            shape right. My job is to make that shape clear.
          </p>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {approach.map((a) => (
              <div key={a.title} className="rounded-2xl border border-border bg-card p-7">
                <h3 className="font-serif text-2xl">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="border-t border-border px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">Services</p>
          <h2 className="mt-4 max-w-3xl text-4xl sm:text-5xl">
            Engineering support for products that need depth, not just delivery.
          </h2>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            I'm most useful when the work spans logic, interface, workflow design,
            integrations and the decisions that make the product hold together.
          </p>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
            {services.map((s) => (
              <div key={s.title} className="bg-card p-8">
                <h3 className="font-serif text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="border-t border-border px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">Selected Work</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">Web and platform apps</h2>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
              <div key={p.name} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg">
                <Link to={p.slug} className="relative block">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.cover} alt={p.name} loading="lazy" width={1280} height={768} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground backdrop-blur">
                    {p.tag}
                  </span>
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <Link to={p.slug} className="font-serif text-2xl hover:text-accent transition-colors">{p.name}</Link>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-semibold tracking-wide text-muted-foreground">{t}</span>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link to={p.slug} hash="case-study" className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-[11px] font-bold tracking-[0.18em] text-background hover:bg-accent transition-colors">
                      CASE STUDY
                    </Link>
                    <Link to={p.slug} className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-[11px] font-bold tracking-[0.18em] hover:border-foreground transition-colors">
                      OPEN DEMO <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="border-t border-border px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow">Capabilities</p>
          <h2 className="mt-4 max-w-3xl text-4xl sm:text-5xl">
            A practical stack shaped by shipping products, not collecting logos.
          </h2>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            The tools here reflect where I spend real time: backend systems, APIs,
            frontend delivery, Flutter mobile work and payment integrations that
            support dependable releases.
          </p>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {capabilities.map((c) => (
              <div key={c.title} className="rounded-2xl border border-border bg-card p-7">
                <h3 className="font-serif text-2xl">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {c.tags.map((t) => <span key={t} className="chip">{t}</span>)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 rounded-3xl border border-border bg-card p-8 sm:p-12">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {integrations.map((i) => (
                <div key={i.name} className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-background p-5 transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="flex h-16 w-full items-center justify-center">
                    <img src={i.logo} alt={`${i.name} logo`} loading="lazy" width={200} height={80} className="max-h-14 w-auto object-contain" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{i.name}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 max-w-3xl">
              <p className="eyebrow">Payments & Tax Integrations</p>
              <h3 className="mt-3 font-serif text-3xl">
                One capability across checkout, collections and compliance workflows.
              </h3>
              <p className="mt-4 text-muted-foreground">
                I integrate M-Pesa Daraja, KCB Buni, Stripe, Paystack and eTIMS into
                products that need payment collection, reconciliation, invoicing or
                tax-linked reporting flows.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#contact" className="rounded-full bg-foreground px-5 py-2.5 text-xs font-bold tracking-[0.18em] text-background hover:bg-accent transition-colors">DISCUSS AN INTEGRATION</a>
                <a href="#work" className="rounded-full border border-border px-5 py-2.5 text-xs font-bold tracking-[0.18em] hover:border-foreground transition-colors">VIEW RELATED WORK</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-border px-4 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow">Contact</p>
          <h2 className="mt-4 text-5xl sm:text-6xl">Contact me.</h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Email is the best place to start if you want to talk about a build,
            contract work, product support or integrations.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="mailto:kipkoechgabriel01@gmail.com" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-xs font-bold tracking-[0.18em] text-background hover:bg-accent transition-colors">
              <Mail className="h-4 w-4" /> EMAIL ME
            </a>
            <a href="#work" className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-xs font-bold tracking-[0.18em] hover:border-foreground transition-colors">
              VIEW WORK
            </a>
          </div>

          <div className="mx-auto mt-14 max-w-2xl text-left">
            <p className="eyebrow">Find me</p>
            <div className="mt-5 space-y-3">
              {[
                { Icon: Mail, label: "EMAIL", value: "kipkoechgabriel01@gmail.com", href: "mailto:kipkoechgabriel01@gmail.com" },
                { Icon: Phone, label: "CALL", value: "+254 797 585 941", href: "tel:+254797585941" },
                { Icon: MessageCircle, label: "WHATSAPP", value: "+254 797 585 941", href: "https://wa.me/254797585941" },
                { Icon: Linkedin, label: "LINKEDIN", value: "LinkedIn", href: "#" },
                { Icon: Github, label: "GITHUB", value: "@Gabuu94", href: "https://github.com/Gabuu94" },
                { Icon: Twitter, label: "TWITTER", value: "@Eng_gabu", href: "https://twitter.com/Eng_gabu" },
              ].map(({ Icon, label, value, href }, i) => (
                <a key={i} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card px-5 py-4 hover:border-foreground transition-colors">
                  <div className="flex items-center gap-4">
                    <Icon className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground">{label}</p>
                      <p className="text-base font-semibold">{value}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-accent opacity-70 group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>

      <footer className="border-t border-border px-4 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Gabriel Kipkoech. All rights reserved.</span>
          <span className="tracking-[0.18em]">SOFTWARE ENGINEER · NAIROBI</span>
        </div>
      </footer>
    </div>
  );
}
