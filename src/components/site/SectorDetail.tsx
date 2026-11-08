import type { LucideIcon } from "lucide-react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";

export type SectorDetailConfig = {
  slug: string;
  title: string;
  intro: string;
  overviewKicker: string;
  overviewHeading: string;
  overview: string[];
  highlights: { icon: LucideIcon; label: string }[];
  services: string[];
  capabilities: { icon: LucideIcon; title: string; text: string; points: string[] }[];
  whyCrg: { step: string; title: string; text: string }[];
  clientsLabel: string;
  clientsHeading: string;
  clientsText: string;
  clients: string[];
  ctaHeading: string;
  ctaText: string;
};

export function SectorDetail({
  config,
  related,
}: {
  config: SectorDetailConfig;
  related: { title: string; href: string }[];
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-24">
        {/* Hero */}
        <section className="bg-primary py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal className="max-w-3xl">
              <Link
                to="/"
                hash="sectors"
                className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-accent uppercase transition-opacity hover:opacity-80"
              >
                <ArrowLeft className="size-3.5" />
                Our Expertise
              </Link>
              <h1 className="mt-4 text-3xl leading-tight font-extrabold text-primary-foreground sm:text-4xl lg:text-5xl">
                {config.title}
              </h1>
              <p className="mt-5 text-base text-primary-foreground/85 sm:text-lg">{config.intro}</p>
            </Reveal>
          </div>
        </section>

        {/* Overview */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
            <Reveal>
              <span className="text-xs font-bold tracking-[0.2em] text-accent">
                {config.overviewKicker}
              </span>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{config.overviewHeading}</h2>
              {config.overview.map((paragraph) => (
                <p key={paragraph} className="mt-5 text-muted-foreground">
                  {paragraph}
                </p>
              ))}
              <div className="mt-8 grid grid-cols-3 gap-4">
                {config.highlights.map((item) => (
                  <div key={item.label} className="rounded-xl border-2 border-primary bg-card p-4">
                    <item.icon className="size-5 text-accent" />
                    <p className="mt-2 text-xs font-semibold text-primary">{item.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-2xl border-2 border-primary bg-card p-8 shadow-lift">
                <h3 className="text-lg font-bold text-primary">What we deliver</h3>
                <ul className="mt-5 space-y-3">
                  {config.services.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Capabilities */}
        <section className="bg-surface py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold tracking-[0.2em] text-accent">
                OUR SECTOR EXPERTISE
              </span>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">What we bring to this sector</h2>
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {config.capabilities.map((capability, i) => (
                <Reveal key={capability.title} delay={i * 100}>
                  <div className="flex h-full flex-col rounded-xl border-2 border-primary bg-card p-7 shadow-card">
                    <span className="grid size-12 place-items-center rounded-lg bg-accent-gradient text-accent-foreground shadow-sm">
                      <capability.icon className="size-6" />
                    </span>
                    <h3 className="mt-5 text-lg font-bold text-primary">{capability.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{capability.text}</p>
                    <ul className="mt-5 space-y-3">
                      {capability.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-3 text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Why CRG */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold tracking-[0.2em] text-accent">WHY CRG</span>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
                How we turn sector knowledge into results
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {config.whyCrg.map((phase, i) => (
                <Reveal key={phase.step} delay={i * 90}>
                  <div className="h-full rounded-xl border-2 border-primary bg-card p-6 shadow-card">
                    <span className="text-2xl font-extrabold text-accent">{phase.step}</span>
                    <h3 className="mt-3 text-base font-bold text-primary">{phase.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{phase.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Clients */}
        <section className="bg-surface py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <Reveal>
                <span className="text-xs font-bold tracking-[0.2em] text-accent">
                  {config.clientsLabel}
                </span>
                <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{config.clientsHeading}</h2>
                <p className="mt-4 text-muted-foreground">{config.clientsText}</p>
              </Reveal>

              <Reveal delay={100}>
                <div className="grid gap-3 sm:grid-cols-2">
                  {config.clients.map((client) => (
                    <div
                      key={client}
                      className="rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-primary shadow-sm"
                    >
                      {client}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Related expertise */}
        {related.length > 0 && (
          <section className="py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <Reveal className="mx-auto max-w-2xl text-center">
                <span className="text-xs font-bold tracking-[0.2em] text-accent">
                  EXPLORE MORE
                </span>
                <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Other areas of expertise</h2>
              </Reveal>

              <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="group flex items-center justify-between gap-3 rounded-xl border-2 border-primary bg-card px-5 py-4 text-sm font-semibold text-primary shadow-card transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    {item.title}
                    <ArrowRight className="size-4 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-surface py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-5 lg:px-8">
            <Reveal>
              <div className="rounded-2xl border-2 border-primary bg-card p-10 text-center shadow-lift">
                <h2 className="text-2xl font-bold sm:text-3xl">{config.ctaHeading}</h2>
                <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{config.ctaText}</p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="/#contact"
                    className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-7 py-3 text-sm font-semibold text-accent-foreground shadow-lift transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    Start a conversation
                    <ArrowRight className="size-4" />
                  </a>
                  <Link
                    to="/"
                    hash="sectors"
                    className="btn-glass inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-primary"
                  >
                    Back to expertise
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
