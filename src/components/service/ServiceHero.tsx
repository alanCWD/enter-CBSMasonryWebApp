import { ArrowLeft, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  /** The page's hero photo; until one is chosen the page opens on a branded backdrop. */
  imageSrc?: string;
  icon?: LucideIcon;
}

/** Photo banner at the top of every service page. */
const ServiceHero = ({ title, subtitle, imageSrc, icon: Icon }: ServiceHeroProps) => (
  <section
    className="relative flex items-end min-h-[420px] md:min-h-[500px] overflow-hidden"
    style={{ paddingTop: "96px" }}
  >
    {imageSrc ? (
      <img
        src={imageSrc}
        alt={title}
        crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
      />
    ) : (
      <>
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-brand)" }}
          aria-hidden="true"
        />
        {Icon && (
          <Icon
            className="absolute -right-10 -bottom-12 w-64 h-64 text-white/[0.07]"
            aria-hidden="true"
          />
        )}
      </>
    )}
    <div
      className="absolute inset-0"
      style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.62) 100%)" }}
    />

    <div className="relative z-10 w-full mx-auto px-6 md:px-10 max-w-[1280px] pb-12">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>
      <h1 className="text-[clamp(32px,5vw,58px)] font-extrabold text-white leading-tight tracking-tight max-w-3xl">
        {title}
      </h1>
      <p className="text-white/75 text-[clamp(14px,1.6vw,18px)] mt-3 max-w-2xl">{subtitle}</p>
    </div>
  </section>
);

export default ServiceHero;
