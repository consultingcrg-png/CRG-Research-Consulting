import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { SectorDetail } from "@/components/site/SectorDetail";
import { SECTOR_DETAILS, SECTOR_LINKS } from "@/lib/sector-details";

export const Route = createFileRoute("/sectors/$slug")({
  head: ({ params }) => {
    const sector = SECTOR_DETAILS[params.slug];
    const title = sector
      ? `${sector.title} | CRG Research & Consulting`
      : "Our Expertise | CRG Research & Consulting";
    const description =
      sector?.intro ??
      "Explore CRG Research & Consulting's sector expertise across land, energy, agriculture, water, climate, digital, policy and capacity development.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: SectorPage,
});

function SectorPage() {
  const { slug } = Route.useParams();
  const sector = SECTOR_DETAILS[slug];

  if (!sector) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <main className="flex-1 pt-32 pb-20">
          <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
            <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase">
              Our Expertise
            </span>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Sector not found</h1>
            <p className="mt-4 text-muted-foreground">
              The expertise page you are looking for does not exist or has moved.
            </p>
            <Link
              to="/"
              hash="sectors"
              className="btn-glass mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary"
            >
              <ArrowLeft className="size-4" />
              Back to Our Expertise
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const href = `/sectors/${slug}`;
  const related = SECTOR_LINKS.filter((item) => item.href !== href);

  return <SectorDetail config={sector} related={related} />;
}
