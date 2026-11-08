import { useRef, useState } from "react";
import { VolumeX } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SITE_VIDEOS, type SiteVideo } from "@/lib/videos";

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
            <FeaturedVideoCard key={video.src} video={video} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedVideoCard({ video, index }: { video: SiteVideo; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);

  const unmute = () => {
    const el = videoRef.current;
    setMuted(false);
    if (!el) return;
    el.muted = false;
    el.volume = 1;
    if (el.paused) void el.play().catch(() => {});
  };

  return (
    <Reveal delay={index * 100}>
      <div className="overflow-hidden rounded-2xl border-2 border-primary bg-card shadow-lift">
        <div className="relative">
          <video
            ref={videoRef}
            controls
            playsInline
            preload="metadata"
            poster={video.poster}
            muted={muted}
            onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
            onLoadedMetadata={(e) => {
              // Always start this player with sound.
              e.currentTarget.volume = 1;
              e.currentTarget.muted = false;
            }}
            aria-label={video.title}
            className="aspect-video w-full bg-black object-contain"
          >
            <source src={video.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {muted && (
            <button
              type="button"
              onClick={unmute}
              className="absolute top-3 right-3 inline-flex items-center gap-2 rounded-full bg-black/75 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-black/90"
            >
              <VolumeX className="size-4" />
              Unmute
            </button>
          )}
        </div>
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
  );
}
