import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import {
  BarChart3,
  Bolt,
  Briefcase,
  CheckCircle2,
  Compass,
  Earth,
  Fuel,
  Gem,
  GraduationCap,
  HandshakeIcon,
  HeartPulse,
  Layers,
  Lightbulb,
  MapPin,
  Microscope,
  Phone,
  Plane,
  SearchCheck,
  ShieldHalf,
  TreePine,
} from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/site/Navbar";
import { HeroSlideshow } from "@/components/site/HeroSlideshow";
import { RecentWork } from "@/components/site/RecentWork";
import { RecentResources } from "@/components/site/RecentResources";
import { RecentNews } from "@/components/site/RecentNews";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import LocationsMap from "@/components/site/LocationsMap";
import {
  SITE_NAME,
  DEFAULT_TITLE,
  HOME_DESCRIPTION,
  KEYWORDS,
  OG_IMAGE,
  SITE_CONTACT,
  SOCIAL_LINKEDIN,
  absolutize,
  seo,
  siteUrl,
} from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => {
    const { meta, links } = seo({
      title: DEFAULT_TITLE,
      description: HOME_DESCRIPTION,
      keywords: KEYWORDS,
    });
    const url = siteUrl() || undefined;
    const orgJsonLd = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": url ? `${url}#organization` : undefined,
      name: SITE_NAME,
      url: url,
      logo: absolutize("/crg-logo.png"),
      foundingDate: "2021",
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE_CONTACT.streetAddress,
        addressLocality: SITE_CONTACT.addressLocality,
        addressRegion: SITE_CONTACT.addressRegion,
        addressCountry: SITE_CONTACT.addressCountry,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: SITE_CONTACT.geo.latitude,
        longitude: SITE_CONTACT.geo.longitude,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: SITE_CONTACT.telephone,
        contactType: "customer service",
        areaServed: "NA",
        availableLanguage: ["English"],
      },
      sameAs: [SOCIAL_LINKEDIN],
    };
    const serviceJsonLd = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: SITE_NAME,
      description: HOME_DESCRIPTION,
      url: url,
      image: absolutize(OG_IMAGE),
      telephone: SITE_CONTACT.telephone,
      areaServed: [
        { "@type": "Country", name: "Namibia" },
        { "@type": "Country", name: "Kenya" },
        { "@type": "Country", name: "Nigeria" },
      ],
      foundingDate: "2021",
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE_CONTACT.streetAddress,
        addressLocality: SITE_CONTACT.addressLocality,
        addressRegion: SITE_CONTACT.addressRegion,
        addressCountry: SITE_CONTACT.addressCountry,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: SITE_CONTACT.geo.latitude,
        longitude: SITE_CONTACT.geo.longitude,
      },
      sameAs: [SOCIAL_LINKEDIN],
    };

    return {
      meta: [
        ...meta,
        { name: "geo.region", content: "NA-KH" },
        { name: "geo.placename", content: "Windhoek, Namibia" },
        { name: "geo.position", content: "-22.5609;17.0898" },
        { name: "ICBM", content: "-22.5609,17.0898" },
      ],
      links,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify([orgJsonLd, serviceJsonLd]),
        },
      ],
    };
  },
  component: Index,
});

const STATS = [
  { value: "2021", label: "Founded as a Research Group" },
  { value: "2025", label: "Evolved into a Global Consultancy" },
  { value: "3", label: "(Namibia, Kenya and Nigeria)" },
  { value: "11-50", label: "Expert Consultants & Researchers" },
];

const SERVICES = [
  {
    icon: Compass,
    title: "Strategic & Policy Advisory",
    description:
      "Evidence-based policy formulation, institutional reform strategies, and governance advisory for governments, international development partners, and private institutions.",
  },
  {
    icon: SearchCheck,
    title: "Fieldwork & Primary Research",
    description:
      "Comprehensive quantitative and qualitative field research, household surveys, community consultations, and baseline assessments across Africa.",
  },
  {
    icon: BarChart3,
    title: "Sector & Feasibility Studies",
    description:
      "Techno-economic evaluations, market entry analyses, regulatory reviews, and socio-economic impact assessments across emerging sectors.",
  },
  {
    icon: CheckCircle2,
    title: "Monitoring, Evaluation & Learning (MEL)",
    description:
      "Robust M&E frameworks, outcome tracking, mid-term and end-line evaluations, and learning agendas to maximize programme accountability.",
  },
  {
    icon: GraduationCap,
    title: "Capacity Building & Training",
    description:
      "Tailored executive workshops, policy toolkits, institutional development programmes, and skills transfer to empower local teams.",
  },
  {
    icon: Layers,
    title: "Data Analytics & Geospatial Intelligence",
    description:
      "Advanced GIS mapping, spatial modeling, survey data analytics, and actionable dashboards turning complex field data into strategic decisions.",
  },
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
  { title: "Namibia" },
  { title: "Kenya" },
  { title: "Nigeria" },
];

const SECTOR_OPTIONS = SECTORS.map((s) => s.title);

const MAP_QUERY = "6 Luther Street";

function Index() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const sector = String(data.get("sector") ?? "");
    const message = String(data.get("message") ?? "").trim();

    if (!name || name.length > 100) {
      toast.error("Please enter a valid name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const SERVICE_ID = (import.meta.env["VITE_EMAILJS_SERVICE_ID"] as string) || "service_xy02h98";
    const TEMPLATE_ID = (import.meta.env["VITE_EMAILJS_TEMPLATE_ID"] as string) || "template_crg_contact";
    const PUBLIC_KEY = (import.meta.env["VITE_EMAILJS_PUBLIC_KEY"] as string) || "KDbRoxF7KPYV8fNU8";

    setSubmitting(true);
    try {
      if (PUBLIC_KEY) {
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            name: name,
            from_name: name,
            email: email,
            from_email: email,
            sector: sector,
            message: message,
            reply_to: email,
            to_domain: "crg-research.com",
            submitted_at: new Date().toLocaleString("en-GB"),
          },
          PUBLIC_KEY
        );
      }
      form.reset();
      toast.success(`Thank you, ${name}!`, {
        description: `Your ${sector} inquiry has been received. Our team will contact you at ${email}.`,
      });
    } catch (err) {
      console.error("EmailJS submission error:", err);
      toast.error("Could not send your inquiry. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
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

        {/* Services */}
        <section id="services" className="scroll-mt-24 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold tracking-[0.2em] text-accent">
                WHAT WE DO
              </span>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Our Services</h2>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((service, i) => (
                <Reveal key={service.title} delay={i * 80}>
                  <div className="hover-lift group flex h-full flex-col justify-between rounded-xl border-2 border-primary bg-card p-7 shadow-card">
                    <div>
                      <span className="grid size-12 place-items-center rounded-lg bg-accent-gradient text-accent-foreground shadow-sm transition-transform duration-300 group-hover:scale-105">
                        <service.icon className="size-6" />
                      </span>
                      <h3 className="mt-5 text-lg font-bold text-primary">{service.title}</h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Sectors */}
        <section id="sectors" className="scroll-mt-24 bg-surface py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold tracking-[0.2em] text-accent">
                OUR SPECIALTIES
              </span>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Key Operating Sectors</h2>
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

        <RecentResources />

        <RecentNews />

        {/* Partners */}
        <section id="partners" className="scroll-mt-24 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 text-center lg:px-8">
            <Reveal className="mx-auto max-w-2xl">
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Partners</h2>
            </Reveal>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {HUBS.map((hub, i) => (
                <Reveal key={hub.title} delay={i * 120}>
                  <div className="hover-lift rounded-xl border-2 border-primary bg-card p-8 shadow-card">
                    <span className="animate-float mx-auto grid size-12 place-items-center rounded-full bg-secondary text-accent">
                      <MapPin className="size-6" />
                    </span>
                    <h3 className="mt-4 text-xl font-bold">{hub.title}</h3>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Interactive Locations Map */}
            <Reveal className="mt-14">
              <LocationsMap />
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
                <h3 className="text-xl font-bold">Send a Message</h3>
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
