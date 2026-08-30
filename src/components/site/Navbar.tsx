import { useEffect, useState, type CSSProperties } from "react";
import { useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LOGO_URL = "/crg-logo.png";

const NAV_ITEMS = [
  { label: "Home", href: "/", dot: "var(--chart-1)" },
  { label: "About Us", href: "/#about", dot: "var(--chart-2)" },
  { label: "Services", href: "/#services", dot: "var(--chart-3)" },
  { label: "Sectors", href: "/#sectors", dot: "var(--chart-4)" },
  { label: "Projects", href: "/projects", dot: "var(--chart-1)" },
  { label: "Resources", href: "/#resources", dot: "var(--chart-2)" },
  { label: "News", href: "/#news", dot: "var(--chart-3)" },
  { label: "Partners", href: "/#partners", dot: "var(--chart-4)" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Check if current page is homepage
  const isHome = location.pathname === "/" || location.pathname === "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Determine if transparent navbar state should be active (only on homepage when at top)
  const isTransparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        isTransparent
          ? "bg-transparent py-1"
          : "bg-background/95 shadow-card backdrop-blur-md border-b border-border/40 py-0.5",
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 lg:px-8">
        <a href="/#home" className="flex min-w-0 items-center transition-opacity hover:opacity-80">
          <img
            src={LOGO_URL}
            alt="CRG Research & Consulting logo"
            className={cn(
              "w-auto object-contain transition-all duration-500 drop-shadow-lg",
              isTransparent ? "h-12" : "h-10 sm:h-11",
            )}
          />
        </a>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "nav-link rounded-full px-2 text-[12px] xl:px-2.5 xl:text-[13px] whitespace-nowrap font-medium transition-colors duration-500",
                isTransparent
                  ? "text-primary-foreground hover:text-accent"
                  : "text-primary hover:text-accent",
              )}
              style={{ "--nav-dot": item.dot } as CSSProperties}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/#contact"
            className="ml-2 rounded-full bg-accent-gradient px-5 py-2.5 text-[13px] font-semibold text-accent-foreground shadow-card transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lift"
          >
            Contact Us
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "grid size-11 shrink-0 place-items-center rounded-full border transition-colors duration-500 lg:hidden",
            isTransparent
              ? "border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/20"
              : "border-border text-primary hover:bg-secondary",
          )}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background/98 backdrop-blur-md transition-[max-height,opacity] duration-500 lg:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-5 py-4">
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-primary transition-colors hover:bg-secondary"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              <span
                className="size-3 shrink-0 rounded-full"
                style={{ backgroundColor: item.dot }}
              />
              {item.label}
            </a>
          ))}
          <a
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-accent-gradient px-6 py-3 text-center text-sm font-semibold text-accent-foreground"
          >
            Contact Us
          </a>
        </nav>
      </div>
    </header>
  );
}
