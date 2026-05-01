import { Phone, ArrowRight } from "lucide-react";

interface CTABannerProps {
  onGetQuote: () => void;
}

const CTABanner = ({ onGetQuote }: CTABannerProps) => (
  <section
    id="cta-banner"
    className="relative py-16 overflow-hidden border-y border-border"
    style={{
      background: "linear-gradient(135deg, hsl(222 47% 8%) 0%, hsl(220 40% 11%) 50%, hsl(222 47% 6%) 100%)",
    }}
  >
    {/* Grid texture */}
    <div
      className="absolute inset-0 pointer-events-none stone-texture opacity-60"
      aria-hidden="true"
    />
    {/* Radial glow */}
    <div
      className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
      style={{
        background: "radial-gradient(circle, hsl(199 89% 48% / 0.07) 0%, transparent 65%)",
      }}
      aria-hidden="true"
    />

    <div className="container mx-auto px-4 md:px-8 max-w-[1280px] relative z-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Text */}
        <div>
          <h2 className="text-[clamp(22px,3vw,34px)] font-extrabold text-foreground tracking-[-0.02em] mb-2">
            Let's Get{" "}
            <span className="text-primary">Started</span>
          </h2>
          <p className="text-muted-foreground text-base">
            Call us or learn more about our residential and commercial masonry services.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
          <a
            href="tel:2502949942"
            className="inline-flex items-center gap-2 text-lg font-bold text-foreground hover:text-primary transition-colors"
          >
            <Phone className="w-5 h-5 text-primary" />
            250-294-9942
          </a>
          <button
            onClick={onGetQuote}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-[0.06em] rounded border-2 border-primary hover:bg-transparent hover:text-primary transition-all duration-150 hover:shadow-glow active:scale-[0.97]"
          >
            Get your FREE estimate today
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default CTABanner;
