import { useState } from "react";
import { ExternalLink, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const LINKEDIN_URL = "https://www.linkedin.com/company/crg-research-consulting/";
const LOGO_URL = "/crg-logo.png";

const DEV_EMAIL = "mubianasaya@gmail.com";
const DEV_WEBSITE = "https://sayamubianaa.netlify.app/";

export function Footer() {
  const [devMenuOpen, setDevMenuOpen] = useState(false);

  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-3 lg:px-8">
        <div>
          <a href="#home" className="inline-block rounded-md bg-background p-3">
            <img
              src={LOGO_URL}
              alt="CRG Research & Consulting logo"
              className="h-11 w-auto object-contain"
            />
          </a>
        </div>

        <div>
          <h4 className="text-sm font-bold tracking-wide text-sidebar-foreground">Head Office</h4>
          <p className="mt-4 flex items-start gap-3 text-sm text-sidebar-foreground/80">
            <MapPin className="mt-0.5 size-4 shrink-0 text-sidebar-primary" />
            6 Luther Street
          </p>
          <p className="mt-3 flex items-center gap-3 text-sm text-sidebar-foreground/80">
            <Phone className="size-4 shrink-0 text-sidebar-primary" />
            +264 81 3288657
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold tracking-wide text-sidebar-foreground">Connect</h4>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="CRG Research & Consulting on LinkedIn"
            className="mt-4 inline-flex items-center gap-3 rounded-full border border-sidebar-border px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-sidebar-accent"
          >
            <Linkedin className="size-4 text-sidebar-primary" />
            Follow us on LinkedIn
          </a>
        </div>
      </div>

      <div className="border-t border-sidebar-border">
        <div className="mx-auto max-w-7xl px-5 py-5 text-center text-xs text-sidebar-foreground/70 lg:px-8">
          © {new Date().getFullYear()} CRG Research &amp; Consulting. All Rights Reserved.
        </div>

        <div className="mx-auto max-w-7xl border-t border-sidebar-border px-5 py-4 text-center text-xs text-sidebar-foreground/70 lg:px-8">
          Developed by{" "}
          <span className="relative inline-block">
            <button
              type="button"
              onClick={() => setDevMenuOpen((v) => !v)}
              className="font-semibold text-sidebar-foreground underline-offset-2 transition-colors hover:text-sidebar-primary hover:underline"
            >
              Saya Mubiana
            </button>

            {devMenuOpen && (
              <div className="absolute bottom-full left-1/2 z-30 mb-2 w-56 -translate-x-1/2 rounded-xl border border-sidebar-border bg-background p-2 text-left shadow-lg">
                <a
                  href={`mailto:${DEV_EMAIL}`}
                  onClick={() => setDevMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <Mail className="size-4 shrink-0 text-sidebar-primary" />
                  <span className="truncate">{DEV_EMAIL}</span>
                </a>
                <a
                  href={DEV_WEBSITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setDevMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <ExternalLink className="size-4 shrink-0 text-sidebar-primary" />
                  <span className="truncate">My Website</span>
                </a>
              </div>
            )}
          </span>
        </div>
      </div>
    </footer>
  );
}
