import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";

interface NavbarProps {
  onGetQuote: () => void;
}

const Navbar = ({ onGetQuote }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "References", href: "#reviews" },
  ];

  const handleNav = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const isLight = scrolled || mobileOpen;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 ${
          isLight
            ? "bg-white shadow-sm border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto h-full flex items-center justify-between gap-6 px-6 md:px-10 max-w-[1280px]">

          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 flex-shrink-0"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            <img
              src="https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100027458/9cc16a08-504a-4d.png"
              alt="CBS Masonry Ltd."
              crossOrigin="anonymous"
              className="h-11 w-auto object-contain"
            />
            <div className="hidden sm:flex flex-col leading-none">
              <span className={`text-[14px] font-bold tracking-tight transition-colors ${isLight ? "text-foreground" : "text-white"}`}>
                CBS Masonry Ltd.
              </span>
              <span className="text-[9px] font-semibold tracking-[0.14em] uppercase text-primary mt-0.5">
                Quality is our Guarantee
              </span>
            </div>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNav(link.href)}
                  className={`px-4 py-2 text-sm font-medium tracking-wide rounded transition-all duration-150 ${
                    isLight
                      ? "text-foreground/70 hover:text-foreground hover:bg-muted"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
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
              className="px-5 py-2 bg-primary text-primary-foreground text-sm font-bold tracking-wide uppercase rounded-sm border-2 border-primary hover:bg-transparent hover:text-primary transition-all duration-150"
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
                : "text-white border border-white/30 hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-7 transition-all duration-300 ${
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
        <button
          onClick={() => { setMobileOpen(false); onGetQuote(); }}
          className="mt-2 px-10 py-3.5 bg-primary text-primary-foreground text-base font-bold uppercase tracking-wide rounded-sm"
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
