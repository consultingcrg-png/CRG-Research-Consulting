import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  Bolt,
  Briefcase,
  Earth,
  Gem,
  HandshakeIcon,
  HeartPulse,
  Lightbulb,
  MapPin,
  Microscope,
  Phone,
  Plane,
  ShieldHalf,
  Sparkles,
  TreePine,
  Fuel,
} from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/site/Navbar";
import { HeroSlideshow } from "@/components/site/HeroSlideshow";
import { RecentWork } from "@/components/site/RecentWork";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";

const TITLE = "CRG Research & Consulting | Research & Strategy, Windhoek Namibia";
const DESCRIPTION =
  "CRG Research & Consulting delivers evidence-based research and strategic advisory across land, energy, mining, health and international development in Namibia, Kenya and Nigeria.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "research consultancy Namibia, strategic consulting Windhoek, land and natural resources research, international development consulting Africa",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "CRG Research & Consulting",
          description: DESCRIPTION,
          telephone: "+264 81 3288657",
          areaServed: ["Namibia", "Kenya", "Nigeria"],
          foundingDate: "2021",
          address: {
            "@type": "PostalAddress",
            streetAddress: "6 Luther Street, The Village, Eros",
            addressLocality: "Windhoek",
            addressCountry: "NA",
          },
          sameAs: ["https://www.linkedin.com/company/crg-research-consulting/"],
        }),
      },
    ],
  }),
  component: Index,
});

const STATS = [
  { value: "2021", label: "Founded as a Research Group" },
  { value: "2025", label: "Evolved into a Global Consultancy" },
  { value: "3", label: "Corporate Partners (Namibia, Kenya, Nigeria)" },
  { value: "11-50", label: "Expert Consultants & Researchers" },
];

const PILLARS = [
  {
    icon: Microscope,
    title: "Rigorous Analysis",
    text: "High-quality research methods tailored to complex sector demands.",
  },
  {
    icon: Lightbulb,
    title: "Strategic Insights",
    text: "Translating field data into actionable governance and market policies.",
  },
  {
    icon: HandshakeIcon,
    title: "Ethical Commitment",
    text: "Promoting sustainable development and institutional transparency.",
  },
];

const SECTORS = [
  { icon: TreePine, title: "Land & Natural Resources" },
  { icon: Fuel, title: "Oil & Gas" },
  { icon: Plane, title: "Tourism & Hospitality" },
  { icon: Bolt, title: "Energy" },
  { icon: HeartPulse, title: "Health" },
  { icon: Gem, title: "Mining" },
  { icon: ShieldHalf, title: "Defence" },
  { icon: Earth, title: "International Development" },
];

const HUBS = [
  { title: "Namibia", text: "Windhoek Headquarters" },
  { title: "Kenya", text: "East Africa Hub" },
  { title: "Nigeria", text: "West Africa Hub" },
];

const SECTOR_OPTIONS = SECTORS.map((s) => s.title);

const MAP_QUERY = "6 Luther Street, The Village, Eros, Windhoek, Namibia";

function Index() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const sector = String(data.get("sector") ?? "");

    if (!name || name.length > 100) {
      toast.error("Please enter a valid name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      form.reset();
      toast.success(`Thank you, ${name}!`, {
        description: `Your ${sector} inquiry has been received. Our team will contact you at ${email}.`,
      });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSlideshow />

        {/* Stats */}
        <section className="bg-primary py-10">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 lg:grid-cols-4 lg:px-8">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 100} className="text-center">
                <p className="text-3xl font-extrabold text-accent lg:text-4xl">{stat.value}</p>
                <p className="mt-1 text-xs text-primary-foreground/80 sm:text-sm">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:items-center lg:px-8">
            <Reveal>
              <span className="text-xs font-bold tracking-[0.2em] text-accent">WHO WE ARE</span>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
                Your Partner for Evidence-Based Strategy
              </h2>
              <p className="mt-5 text-muted-foreground">
                Formed as a research group in 2021, CRG evolved into a global consultancy in 2025.
                We work closely with international development partners and government agencies to
                deliver rigorous analysis, strategic insights, and practical solutions.
              </p>
              <p className="mt-4 text-muted-foreground">
                Our commitment to innovation, rigorous analysis, and ethical practice enables our
                clients to address complex challenges and support informed decision-making.
              </p>
            </Reveal>

            <div className="grid gap-4">
              {PILLARS.map((pillar, i) => (
                <Reveal key={pillar.title} delay={120 + i * 120}>
                  <div className="hover-lift flex gap-4 rounded-xl border-2 border-primary bg-card p-6 shadow-card">
                    <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-accent-gradient text-accent-foreground">
                      <pillar.icon className="size-6" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base font-bold">{pillar.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{pillar.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Sectors */}
        <section id="sectors" className="bg-surface py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold tracking-[0.2em] text-accent">
                OUR SPECIALTIES
              </span>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Key Operating Sectors</h2>
              <p className="mt-3 text-muted-foreground">
                Cross-sector research and consulting for governments, organizations, and
                communities.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {SECTORS.map((sector, i) => (
                <Reveal key={sector.title} delay={i * 70}>
                  <div className="hover-lift group h-full rounded-xl border-2 border-primary bg-card p-6 text-center shadow-card">
                    <span className="mx-auto grid size-14 place-items-center rounded-full bg-secondary text-primary transition-colors duration-300 group-hover:bg-accent-gradient group-hover:text-accent-foreground">
                      <sector.icon className="size-6" />
                    </span>
                    <h3 className="mt-4 text-sm font-bold sm:text-base">{sector.title}</h3>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <RecentWork />

        {/* Projects / Resource Center / News */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-3 lg:px-8">
            {[
              {
                id: "projects",
                kicker: "PROJECTS",
                title: "Projects",
                text: "Detailed case studies of our commissioned assignments across land, energy, health and development.",
              },
              {
                id: "resources",
                kicker: "KNOWLEDGE",
                title: "Resource Center",
                text: "Reports, policy briefs, toolkits and datasets produced by our research teams.",
              },
              {
                id: "news",
                kicker: "UPDATES",
                title: "News",
                text: "Announcements, events and media coverage from across the CRG network.",
              },
            ].map((block, i) => (
              <Reveal key={block.id} delay={i * 110}>
                <section
                  id={block.id}
                  className="hover-lift h-full scroll-mt-24 rounded-xl border-2 border-primary bg-card p-8 shadow-card"
                >
                  <span className="text-xs font-bold tracking-[0.2em] text-accent">
                    {block.kicker}
                  </span>
                  <h2 className="mt-2 text-2xl font-bold">{block.title}</h2>
                  <p className="mt-3 text-sm text-muted-foreground">{block.text}</p>
                  <p className="mt-4 text-xs font-semibold text-accent">Content coming soon</p>
                </section>
              </Reveal>
            ))}
          </div>
        </section>



        {/* Global reach */}
        <section id="global" className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 text-center lg:px-8">
            <Reveal className="mx-auto max-w-2xl">
              <span className="text-xs font-bold tracking-[0.2em] text-accent">
                FOOTPRINT
              </span>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Regional Hubs & Network</h2>
              <p className="mt-3 text-muted-foreground">
                With strategic partner companies across key regional growth centers.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {HUBS.map((hub, i) => (
                <Reveal key={hub.title} delay={i * 120}>
                  <div className="hover-lift rounded-xl border-2 border-primary bg-card p-8 shadow-card">
                    <span className="animate-float mx-auto grid size-12 place-items-center rounded-full bg-secondary text-accent">
                      <MapPin className="size-6" />
                    </span>
                    <h3 className="mt-4 text-xl font-bold">{hub.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{hub.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Google Maps */}
            <Reveal className="mt-14">
              <div className="overflow-hidden rounded-2xl border border-border shadow-card">
                <iframe
                  title="CRG Research & Consulting office location on Google Maps"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[380px] w-full border-0 sm:h-[440px]"
                />
              </div>
              <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 text-accent" />
                {MAP_QUERY}
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-semibold text-accent underline-offset-4 hover:underline"
              >
                Get directions
              </a>
            </Reveal>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="bg-surface py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8">
            <Reveal>
              <span className="text-xs font-bold tracking-[0.2em] text-accent">GET IN TOUCH</span>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Contact Our Experts</h2>
              <p className="mt-4 text-muted-foreground">
                Connect with our research team to discuss upcoming projects, consultations, or
                partnerships.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  { icon: Phone, label: "Phone", value: "+264 81 3288657" },
                  { icon: MapPin, label: "Location", value: MAP_QUERY },
                  {
                    icon: Briefcase,
                    label: "Industry",
                    value: "Research & Strategic Consulting Services",
                  },
                ].map((item, i) => (
                  <Reveal key={item.label} delay={i * 100}>
                    <div className="flex items-start gap-4 rounded-xl border-2 border-primary bg-card p-5 shadow-card">
                      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-secondary text-accent">
                        <item.icon className="size-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-primary">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.value}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal delay={150}>
              <form
                onSubmit={onSubmit}
                className="rounded-2xl border-2 border-primary bg-card p-7 shadow-lift"
              >
                <h3 className="flex items-center gap-2 text-xl font-bold">
                  <Sparkles className="size-5 text-accent" /> Send a Message
                </h3>
                <div className="mt-6 space-y-4">
                  <input
                    name="name"
                    required
                    maxLength={100}
                    placeholder="Your Name"
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    maxLength={255}
                    placeholder="Your Email Address"
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
                  />
                  <select
                    name="sector"
                    required
                    defaultValue=""
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
                  >
                    <option value="" disabled>
                      Select Sector Interest
                    </option>
                    {SECTOR_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    maxLength={1000}
                    placeholder="Project details or inquiry..."
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-full bg-accent-gradient py-3 text-sm font-semibold text-accent-foreground shadow-card transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
                  >
                    {submitting ? "Sending..." : "Submit Inquiry"}
                  </button>
                </div>
              </form>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
