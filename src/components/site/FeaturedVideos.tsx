import { Reveal } from "@/components/site/Reveal";
import { SITE_VIDEOS } from "@/lib/videos";

export function FeaturedVideos() {
  if (SITE_VIDEOS.length === 0) return null;

  const single = SITE_VIDEOS.length === 1;

  return (
    <section id="videos" className="scroll-mt-24 bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold tracking-[0.2em] text-accent">WATCH</span>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">See Our Work in Action</h2>
          <p className="mt-4 text-muted-foreground">
            Short films from the field showing how our teams turn evidence into practical impact.
          </p>
        </Reveal>

        <div
          className={
            single
              ? "mx-auto mt-12 max-w-4xl"
              : "mt-12 grid gap-6 lg:grid-cols-2"
          }
        >
          {SITE_VIDEOS.map((video, i) => (
            <Reveal key={video.src} delay={i * 100}>
              <div className="overflow-hidden rounded-2xl border-2 border-primary bg-card shadow-lift">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={video.poster}
                  aria-label={video.title}
                  className="aspect-video w-full bg-black object-cover"
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold tracking-[0.2em] text-accent">
                      {video.kicker}
                    </span>
                    <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-primary">
                      {video.durationLabel}
                    </span>
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-primary">{video.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{video.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
