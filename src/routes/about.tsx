import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, UserRound, Users } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";

const TITLE = "About Us | CRG Research & Consulting";
const DESCRIPTION =
  "Meet the board, staff, and consultants behind CRG Research & Consulting.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: AboutPage,
});

type Person = {
  name: string;
  role: string;
  image?: string;
  bio?: string;
};

const BOARD: Person[] = [
  {
    name: "Dr Jennilee-Kohima",
    role: "Director",
    image: "/images/dr-jennilee-kohima.jpeg",
  },
  {
    name: "Amin Issa",
    role: "Director",
    image: "/images/amin-issa.png",
  },
  {
    name: "Aune Shikongo",
    role: "Managing Director",
    image: "/images/aune-shikongo.jpeg",
  },
];

const STAFF: Person[] = [
  {
    name: "Aune Shikongo",
    role: "Managing Director",
    image: "/images/aune-shikongo.jpeg",
  },
  {
    name: "Loide Shikongo",
    role: "Junior Researcher",
    image: "/images/loide-shikongo.png",
  },
  {
    name: "Watanavi Shannon Kaposambo",
    role: "Research Intern",
    image: "/images/watanavi-kaposambo.png",
  },
];

const CONSULTANTS: Person[] = [];

function PersonCard({ person }: { person: Person }) {
  return (
    <div className="hover-lift group h-full overflow-hidden rounded-2xl border-2 border-primary bg-card shadow-card">
      <div className="aspect-[4/5] w-full overflow-hidden bg-secondary">
        {person.image ? (
          <img
            src={person.image}
            alt={person.name}
            loading="lazy"
            decoding="async"
            className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid size-full place-items-center text-muted-foreground">
            <UserRound className="size-12" />
          </div>
        )}
      </div>
      <div className="p-5 text-center">
        <h3 className="text-base font-bold text-primary sm:text-lg">{person.name}</h3>
        <p className="mt-1 text-xs font-semibold tracking-wide text-accent uppercase">
          {person.role}
        </p>
        {person.bio && (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{person.bio}</p>
        )}
      </div>
    </div>
  );
}

function PeopleSection({
  id,
  label,
  title,
  description,
  people,
  icon: Icon,
  surface = false,
}: {
  id: string;
  label: string;
  title: string;
  description: string;
  people: Person[];
  icon: typeof Users;
  surface?: boolean;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 py-20 lg:py-28 ${surface ? "bg-surface" : "bg-background"}`}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold tracking-[0.2em] text-accent">{label}</span>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h2>
          <p className="mt-4 text-muted-foreground">{description}</p>
        </Reveal>

        {people.length === 0 ? (
          <Reveal className="mt-12">
            <div className="mx-auto max-w-md rounded-xl border-2 border-dashed border-border bg-card p-10 text-center shadow-card">
              <Icon className="mx-auto size-8 text-accent" />
              <p className="mt-3 text-sm font-semibold text-primary">Profiles coming soon</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Individual profiles for this group will be published here.
              </p>
            </div>
          </Reveal>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {people.map((person, i) => (
              <Reveal key={person.name} delay={i * 80}>
                <PersonCard person={person} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-24">
        <section className="bg-primary py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-5 text-center lg:px-8">
            <Reveal className="mx-auto max-w-3xl">
              <h1 className="text-3xl font-extrabold text-primary-foreground sm:text-4xl lg:text-5xl">
                About Us
              </h1>
              <p className="mt-4 text-sm text-primary-foreground/85 sm:text-base">
                The people driving our research, strategy, and impact.
              </p>
            </Reveal>
          </div>
        </section>

        <PeopleSection
          id="board"
          label="LEADERSHIP"
          title="The Board"
          description="The leadership team guiding CRG's strategy, governance, and ethical standards."
          people={BOARD}
          icon={Briefcase}
        />

        <PeopleSection
          id="staff"
          label="OUR TEAM"
          title="Staff"
          description="The researchers, analysts, and specialists delivering our work every day."
          people={STAFF}
          icon={Users}
          surface
        />

        <PeopleSection
          id="consultants"
          label="OUR NETWORK"
          title="Consultants"
          description="A network of subject-matter experts supporting our assignments across sectors."
          people={CONSULTANTS}
          icon={UserRound}
        />
      </main>

      <Footer />
    </div>
  );
}
