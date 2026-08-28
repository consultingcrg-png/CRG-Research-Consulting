import { useEffect, useState, type CSSProperties } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/CRG_LOGO_1.png.asset.json";

const NAV_ITEMS = [
  { label: "Home", href: "#home", dot: "var(--chart-1)" },
  { label: "About Us", href: "#about", dot: "var(--chart-2)" },
  { label: "Sectors", href: "#sectors", dot: "var(--chart-3)" },
  { label: "Recent Work", href: "#work", dot: "var(--chart-4)" },
  { label: "Projects", href: "#projects", dot: "var(--chart-5)" },
  { label: "Resource Center", href: "#resources", dot: "var(--chart-1)" },
  { label: "News", href: "#news", dot: "var(--chart-3)" },
  { label: "Partners", href: "#global", dot: "var(--chart-2)" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/95 shadow-card backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 lg:px-8">
        <a href="#home" className="flex min-w-0 items-center transition-opacity hover:opacity-80">
          <img
            src={logo.url}
            alt="CRG Research & Consulting logo"
            className={cn(
              "w-auto object-contain transition-all duration-500 drop-shadow-lg",
              scrolled ? "h-10" : "h-12",
            )}
          />
        </a>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "nav-link rounded-full px-2.5 text-[13px] whitespace-nowrap transition-colors duration-500",
                scrolled ? "text-primary" : "text-primary-foreground",
              )}
              style={{ "--nav-dot": item.dot } as CSSProperties}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
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
            scrolled
              ? "border-border text-primary hover:bg-secondary"
              : "border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/20",
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
            href="#contact"
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
