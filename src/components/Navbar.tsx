import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { SERVICE_PAGES } from "@/lib/servicePages";

interface NavbarProps {
  onGetQuote: () => void;
  isInnerPage?: boolean;
}

const Navbar = ({ onGetQuote, isInnerPage = false }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Gallery", href: "#gallery" },
    { label: "References", href: "#reviews" },
  ];

  const handleNav = (href: string) => {
    setMobileOpen(false);
    if (isInnerPage) {
      window.location.href = "/" + href;
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isLight = scrolled || mobileOpen;

  const linkClass = (open = false) =>
    `flex items-center gap-1 px-4 py-2 text-sm font-medium tracking-wide rounded transition-all duration-150 ${
      isLight
        ? open
          ? "text-foreground bg-muted"
          : "text-foreground/70 hover:text-foreground hover:bg-muted"
        : open
        ? "text-white bg-white/10"
        : "text-white/90 hover:text-white hover:bg-white/10"
    }`;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          mobileOpen
            ? "bg-white h-[80px]"
            : scrolled
            ? "bg-white shadow-sm border-b border-border h-[100px]"
            : "bg-white/20 backdrop-blur-sm h-[176px]"
        }`}
      >
        <div className="mx-auto h-full flex items-center justify-between gap-6 px-6 md:px-10 max-w-[1280px]">

          {/* Logo only — no text beside it */}
          <Link
            to="/"
            className="flex items-center flex-shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src="https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100027458/9cc16a08-504a-4d.png"
              alt="CBS Masonry Ltd."
              crossOrigin="anonymous"
              className={`w-auto object-contain transition-all duration-300 ${
                scrolled ? "h-[84px]" : "h-[152px]"
              }`}
            />
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-1">
            <li>
              <button onClick={() => handleNav("#about")} className={linkClass()}>
                About
              </button>
            </li>

            {/* Services: every service page is one click away */}
            <li
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                onClick={() => setServicesOpen((open) => !open)}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                className={linkClass(servicesOpen)}
              >
                Services
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-0 pt-2 w-[330px]">
                  <div className="rounded-lg border border-border bg-background shadow-elevated p-2">
                    {SERVICE_PAGES.map((page) => {
                      const Icon = page.icon;
                      return (
                        <Link
                          key={page.slug}
                          to={page.path}
                          onClick={() => setServicesOpen(false)}
                          className="flex items-start gap-3 rounded px-3 py-2.5 transition-colors hover:bg-muted"
                        >
                          <Icon className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="min-w-0">
                            <span className="block text-[13px] font-semibold text-foreground">
                              {page.navLabel}
                            </span>
                            <span className="block text-[11px] text-muted-foreground truncate">
                              {page.subtitle}
                            </span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </li>

            {navLinks.slice(1).map((link) => (
              <li key={link.href}>
                <button onClick={() => handleNav(link.href)} className={linkClass()}>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="tel:2502949942"
              className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                isLight ? "text-foreground hover:text-primary" : "text-white hover:text-primary"
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-primary" />
              250-294-9942
            </a>
            <button
              onClick={onGetQuote}
              className={`px-5 py-2 text-sm font-bold tracking-wide uppercase rounded-sm border-2 border-primary transition-all duration-150 ${
                isLight
                  ? "bg-primary text-primary-foreground hover:bg-transparent hover:text-primary"
                  : "bg-primary text-primary-foreground hover:bg-transparent hover:text-white"
              }`}
            >
              Get a Quote
            </button>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden flex items-center justify-center w-9 h-9 rounded transition-all ${
              isLight
                ? "text-foreground border border-border hover:bg-muted"
                : "text-white border border-white/40 hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-6 px-6 transition-all duration-300 ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ top: "72px" }}
      >
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => handleNav(link.href)}
            className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
          >
            {link.label}
          </button>
        ))}

        <div className="w-full max-w-sm">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground mb-3 text-center">
            Services
          </p>
          <div className="grid gap-1.5 max-h-[38vh] overflow-y-auto">
            {SERVICE_PAGES.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.slug}
                  to={page.path}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded border border-border bg-background hover:border-primary transition-colors"
                >
                  <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-[13px] font-medium text-foreground truncate">
                    {page.navLabel}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => { setMobileOpen(false); onGetQuote(); }}
          className="px-10 py-3.5 bg-primary text-primary-foreground text-base font-bold uppercase tracking-wide rounded-sm"
        >
          Get a Quote
        </button>
        <a
          href="tel:2502949942"
          className="flex items-center gap-2 text-base font-semibold text-primary"
        >
          <Phone className="w-4 h-4" />
          250-294-9942
        </a>
      </div>
    </>
  );
};

export default Navbar;
