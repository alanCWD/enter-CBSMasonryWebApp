import { ArrowRight, ChevronDown } from "lucide-react";

interface HeroProps {
  onGetQuote: () => void;
}

const Hero = ({ onGetQuote }: HeroProps) => {
  const stats = [
    { number: "175+", label: "Combined Years" },
    { number: "500+", label: "Projects Completed" },
    { number: "5.0★", label: "Google Rating" },
    { number: "BBB A+", label: "Accredited" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: "72px" }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark">
        {/* Stone grid texture */}
        <div
          className="absolute inset-0 opacity-100 stone-texture"
          aria-hidden="true"
        />
        {/* Radial glows */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 55% at 65% 50%, hsl(201 97% 32% / 0.18) 0%, transparent 70%),
                         radial-gradient(ellipse 45% 45% at 10% 85%, hsl(199 89% 48% / 0.08) 0%, transparent 60%)`,
          }}
          aria-hidden="true"
        />
      </div>

      {/* Brick texture pattern - right side */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/2 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent 0px, transparent 58px, hsl(199 89% 48%) 58px, hsl(199 89% 48%) 60px),
            repeating-linear-gradient(90deg, transparent 0px, transparent 118px, hsl(199 89% 48%) 118px, hsl(199 89% 48%) 120px)
          `,
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 md:px-8 max-w-[1280px] relative z-10 py-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/10 mb-6 animate-fade-in-up">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-[pulse-dot_2s_infinite]" />
            <span className="text-xs font-bold tracking-[0.12em] uppercase text-primary">
              Premier Masonry — Victoria, British Columbia
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[clamp(36px,5.5vw,64px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-foreground mb-5 animate-fade-in-up-delay-1">
            Welcome to{" "}
            <span className="bg-gradient-to-br from-primary to-[hsl(199_89%_70%)] bg-clip-text text-transparent">
              CBS Masonry
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-[clamp(15px,1.8vw,18px)] leading-relaxed text-muted-foreground mb-8 max-w-[580px] animate-fade-in-up-delay-2">
            With more than{" "}
            <strong className="text-foreground font-semibold">175 combined years of experience</strong>,
            CBS Masonry LTD is the premier bricklaying and stone masonry company —
            delivering craftsmanship you can see and trust for generations.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-12 animate-fade-in-up-delay-3">
            <button
              onClick={onGetQuote}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-[0.06em] rounded border-2 border-primary hover:bg-transparent hover:text-primary transition-all duration-150 hover:shadow-glow active:scale-[0.97]"
            >
              Get a Free Quote
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/5 border-2 border-border text-foreground text-sm font-bold uppercase tracking-[0.06em] rounded hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all duration-150"
            >
              Our Services
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 pt-6 border-t border-border animate-fade-in-up-delay-3">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-extrabold text-foreground leading-none tracking-[-0.02em]">
                  {stat.number}
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 flex flex-col items-center gap-1 opacity-40 z-10"
        style={{ animation: "scroll-bounce 2.4s ease-in-out infinite" }}
        aria-hidden="true"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 text-muted-foreground" />
      </div>
    </section>
  );
};

export default Hero;
