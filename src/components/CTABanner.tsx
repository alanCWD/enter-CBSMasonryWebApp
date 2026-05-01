import { Phone, ArrowRight } from "lucide-react";

interface CTABannerProps {
  onGetQuote: () => void;
}

const CTABanner = ({ onGetQuote }: CTABannerProps) => (
  <section
    id="cta-banner"
    className="py-14 bg-primary"
  >
    <div className="mx-auto px-6 md:px-10 max-w-[1280px]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-[clamp(20px,2.8vw,30px)] font-bold text-primary-foreground mb-1">
            Let's Get Started
          </h2>
          <p className="text-primary-foreground/80 text-[15px]">
            Call us or get a free estimate for your residential or commercial masonry project.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
          <a
            href="tel:2502949942"
            className="inline-flex items-center gap-2 text-base font-bold text-primary-foreground hover:text-primary-foreground/80 transition-colors"
          >
            <Phone className="w-4 h-4" />
            250-294-9942
          </a>
          <button
            onClick={onGetQuote}
            className="inline-flex items-center gap-2 px-7 py-3 bg-primary-foreground text-primary text-sm font-bold uppercase tracking-[0.06em] rounded-sm hover:bg-primary-foreground/90 transition-all duration-150 active:scale-[0.97]"
          >
            Get a Free Estimate
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default CTABanner;
