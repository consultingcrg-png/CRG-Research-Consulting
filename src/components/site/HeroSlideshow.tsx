import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import slide1 from "@/assets/image-8.jpeg.asset.json";
import slide2 from "@/assets/image-5.jpeg.asset.json";
import slide3 from "@/assets/image-3.jpeg.asset.json";
import slide4 from "@/assets/image-4.jpeg.asset.json";

const SLIDES = [
  {
    url: slide1.url,
    alt: "CRG delegates at the International Federation of Surveyors sustainable development goals exhibition",
    kicker: "GLOBAL ENGAGEMENT",
    title: "Transformative Research & Strategic Consulting",
    text: "Evidence-based solutions across global industries, unlocking sustainable growth and measurable impact.",
  },
  {
    url: slide2.url,
    alt: "CRG team meeting with UN-Habitat representatives",
    kicker: "PARTNERSHIPS",
    title: "Working With Global Development Partners",
    text: "Collaborating with UN agencies, governments and institutions to shape inclusive urban and land policy.",
  },
  {
    url: slide3.url,
    alt: "CRG researchers attending an international conference",
    kicker: "OUR PEOPLE",
    title: "Researchers, Analysts & Sector Specialists",
    text: "A multidisciplinary team turning rigorous field evidence into strategy leaders can act on.",
  },
  {
    url: slide4.url,
    alt: "CRG field research team with community stakeholders",
    kicker: "FIELDWORK",
    title: "Grounded in Communities We Serve",
    text: "Primary data collection and stakeholder engagement across Namibia, Kenya, Nigeria and beyond.",
  },
];

const DURATION = 8000;

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number) => {
    setIndex((next + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(index + 1), DURATION);
    return () => clearTimeout(t);
  }, [index, paused, go]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(index + 1);
      if (e.key === "ArrowLeft") go(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  const active = SLIDES[index] ?? SLIDES[0]!;

  return (
    <section
      id="home"
      aria-roledescription="carousel"
      aria-label="CRG Research & Consulting highlights"
      className="relative isolate min-h-[100svh] w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.url}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1200ms] ease-out",
            i === index ? "opacity-100" : "opacity-0",
          )}
        >
          <img
            src={slide.url}
            alt={slide.alt}
            loading={i === 0 ? "eager" : "lazy"}
            className={cn(
              "size-full object-cover object-center",
              i === index && "animate-slow-zoom",
            )}
          />
          <div className="absolute inset-0 bg-hero-gradient" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pt-28 pb-28 lg:px-8">
        <div key={index} className="max-w-3xl">
          <span
            className="animate-fade-up block text-xs font-bold tracking-[0.25em] text-accent"
            style={{ animationDelay: "80ms" }}
          >
            {active.kicker}
          </span>
          <h1
            className="animate-fade-up mt-4 text-4xl leading-tight font-extrabold text-primary-foreground sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "180ms" }}
          >
            {active.title}
          </h1>
          <p
            className="animate-fade-up mt-5 max-w-2xl text-base text-primary-foreground/85 sm:text-lg"
            style={{ animationDelay: "300ms" }}
          >
            {active.text}
          </p>
          <div
            className="animate-fade-up mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: "420ms" }}
          >
            <a
              href="#sectors"
              className="rounded-full bg-accent-gradient px-7 py-3 text-sm font-semibold text-accent-foreground shadow-lift transition-transform duration-300 hover:-translate-y-0.5"
            >
              Our Expertise
            </a>
            <a
              href="#about"
              className="rounded-full border-2 border-primary-foreground/70 px-7 py-3 text-sm font-semibold text-primary-foreground transition-colors duration-300 hover:bg-primary-foreground hover:text-primary"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Controls */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(index - 1)}
        className="absolute top-1/2 left-3 z-20 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-primary-foreground/40 text-primary-foreground backdrop-blur-sm transition-colors hover:bg-primary-foreground/20 sm:grid lg:left-6"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(index + 1)}
        className="absolute top-1/2 right-3 z-20 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-primary-foreground/40 text-primary-foreground backdrop-blur-sm transition-colors hover:bg-primary-foreground/20 sm:grid lg:right-6"
      >
        <ChevronRight className="size-5" />
      </button>

      {/* Progress indicators */}
      <div className="absolute bottom-8 left-1/2 z-20 flex w-[min(90%,26rem)] -translate-x-1/2 gap-3">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.url}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => go(i)}
            className="group h-1.5 flex-1 overflow-hidden rounded-full bg-primary-foreground/30"
          >
            <span
              className={cn(
                "block h-full origin-left rounded-full bg-accent",
                i === index && !paused && "animate-bar",
                i === index && paused && "scale-x-100",
                i !== index && "scale-x-0",
              )}
              style={{ animationDuration: `${DURATION}ms` }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
