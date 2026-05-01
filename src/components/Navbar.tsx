import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";

interface NavbarProps {
  onGetQuote: () => void;
}

const Navbar = ({ onGetQuote }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 ${
          scrolled
            ? "bg-[hsl(222_47%_7%/0.98)] shadow-[0_4px_24px_hsl(222_47%_7%/0.6)]"
            : "bg-[hsl(222_47%_7%/0.88)] backdrop-blur-md"
        } border-b border-border`}
      >
        <div className="container mx-auto h-full flex items-center justify-between gap-6 px-4 md:px-8 max-w-[1280px]">
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
              className="h-12 w-auto object-contain"
            />
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-[15px] font-bold text-foreground tracking-tight">CBS Masonry Ltd.</span>
              <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-primary mt-0.5">
                Quality is our Guarantee
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNav(link.href)}
                  className="px-4 py-2 text-sm font-semibold tracking-wide text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-md transition-all duration-150"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:2502949942"
              className="flex items-center gap-1.5 text-sm font-bold text-foreground hover:text-primary transition-colors duration-150"
            >
              <Phone className="w-4 h-4 text-primary" />
              250-294-9942
            </a>
            <button
              onClick={onGetQuote}
              className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-bold tracking-wide uppercase rounded hover:bg-transparent hover:text-primary border-2 border-primary transition-all duration-150 hover:shadow-glow"
            >
              Get a Quote
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-all"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[hsl(222_47%_5%/0.98)] backdrop-blur-xl flex flex-col items-center justify-center gap-6 transition-all duration-300 ${
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
          className="mt-4 px-10 py-4 bg-primary text-primary-foreground text-lg font-bold uppercase rounded tracking-wide"
        >
          Get a Quote
        </button>
        <a
          href="tel:2502949942"
          className="flex items-center gap-2 text-lg font-bold text-primary mt-2"
        >
          <Phone className="w-5 h-5" />
          250-294-9942
        </a>
      </div>
    </>
  );
};

export default Navbar;
