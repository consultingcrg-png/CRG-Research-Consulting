import { useQuery } from "@tanstack/react-query";
import { CalendarDays } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Reveal } from "./Reveal";

export type WorkUpdate = {
  id: string;
  title: string;
  description: string;
  image_urls: string[];
  work_date: string;
  status: string;
};

async function fetchPublishedWork(): Promise<WorkUpdate[]> {
  const { data, error } = await supabase
    .from("work_updates")
    .select("id,title,description,image_urls,work_date,status")
    .eq("status", "published")
    .order("work_date", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    ...row,
    image_urls: Array.isArray(row.image_urls) ? (row.image_urls as string[]) : [],
  }));
}

export function RecentWork() {
  const { data, isLoading } = useQuery({
    queryKey: ["work_updates", "published"],
    queryFn: fetchPublishedWork,
  });

  const items = data ?? [];

  return (
    <section id="work" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold tracking-[0.2em] text-accent">RECENT WORK</span>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Project Updates</h2>
          <p className="mt-3 text-muted-foreground">
            A look at recently completed assignments, field research and advisory engagements.
          </p>
        </Reveal>

        {isLoading ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-72 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <Reveal className="mt-12 rounded-xl border-2 border-dashed border-primary bg-card p-12 text-center">
            <p className="text-muted-foreground">
              New project updates will be published here soon.
            </p>
          </Reveal>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <Reveal key={item.id} delay={i * 90} as="article">
                <article className="hover-lift flex h-full flex-col overflow-hidden rounded-xl border-2 border-primary bg-card shadow-card">
                  {item.image_urls[0] ? (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={item.image_urls[0]}
                        alt={item.title}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex items-center gap-2 text-xs font-semibold text-accent">
                      <CalendarDays className="size-4" />
                      {new Date(item.work_date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <h3 className="mt-2 text-lg font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm whitespace-pre-line text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
