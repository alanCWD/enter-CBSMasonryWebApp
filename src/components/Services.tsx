import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SERVICE_PAGES, slotKeysForPage } from "@/lib/servicePages";
import { useMediaSlots } from "@/hooks/useMediaSlots";
import { usePublicMedia } from "@/hooks/usePublicMedia";

/** The six service pages, each card opening the full page. */
const Services = () => {
  const { slots } = useMediaSlots();
  const { photosByFolder } = usePublicMedia();

  return (
    <section id="services" className="py-20 bg-background">
      <div className="mx-auto px-6 md:px-10 max-w-[1280px]">
        <div className="mb-12">
          <h2 className="text-[clamp(22px,3vw,32px)] font-bold text-foreground mb-3">
            Our Services
          </h2>
          <div className="w-10 h-[3px] rounded-full bg-primary mb-4" />
          <p className="text-muted-foreground text-base max-w-lg">
            From custom residential stonework to large-scale commercial projects,
            CBS Masonry delivers craftsmanship at every scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_PAGES.map((page) => {
            const Icon = page.icon;
            const image =
              slots[slotKeysForPage(page).hero] ?? photosByFolder[page.folder]?.[0]?.cdnUrl;

            return (
              <Link
                key={page.slug}
                to={page.path}
                className="group bg-background border border-border rounded overflow-hidden flex flex-col transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5"
              >
                {/* Image, or a branded backdrop until the service has photos */}
                <div className="relative h-52 overflow-hidden">
                  {image ? (
                    <>
                      <img
                        src={image}
                        alt={`${page.navLabel} — CBS Masonry Ltd.`}
                        crossOrigin="anonymous"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </>
                  ) : (
                    <>
                      <div
                        className="absolute inset-0"
                        style={{ background: "var(--gradient-brand)" }}
                        aria-hidden="true"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="w-9 h-9 text-white/35" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                    </>
                  )}
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="inline-block max-w-full truncate px-3 py-1 rounded-sm bg-primary text-primary-foreground text-[11px] font-bold tracking-[0.08em] uppercase">
                      {page.navLabel}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2.5 mb-3">
                    <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <h3 className="text-[17px] font-semibold text-foreground">
                      {page.navLabel}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {page.card.blurb}
                  </p>
                  <span className="inline-flex items-center gap-1.5 mt-5 text-[12px] font-bold uppercase tracking-[0.08em] text-primary">
                    View service
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
