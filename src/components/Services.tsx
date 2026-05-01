import { Home, Building2, Sparkles, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Home,
    badge: "Residential",
    title: "Residential Masonry",
    description:
      "CBS Masonry works with home builders and contractors to complete any residential masonry project in a timely and professional manner.",
    items: [
      "Brick & Stone Fireplaces",
      "Retaining Walls",
      "Natural Stone Patios",
      "Chimney Repair & Rebuild",
      "Flagstone Pathways",
    ],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    imageAlt: "Residential masonry work",
  },
  {
    icon: Building2,
    badge: "Commercial",
    title: "Commercial Masonry",
    description:
      "We are here to help provide an artist's eye to your masonry project needs. If you can dream it, we can make it happen — on time and on budget.",
    items: [
      "Commercial Brick Facades",
      "WCB Scaffolding",
      "Culture Stone Cladding",
      "AquaPave Systems",
      "Brick Restoration",
    ],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
    imageAlt: "Commercial masonry project",
  },
  {
    icon: Sparkles,
    badge: "Specialty",
    title: "Specialty Work",
    description:
      "CBS Masonry provides the trained eye a canvas to convert masonry projects and dreams into concrete reality with unmatched artistry.",
    items: [
      "Natural Rock Features",
      "Excavation Services",
      "Paving Stone Installation",
      "Custom Stonework",
      "Restoration Projects",
    ],
    image: "https://images.unsplash.com/photo-1574591374979-5a7c69d8b06c?w=600&q=80",
    imageAlt: "Specialty masonry work",
  },
];

const Services = () => (
  <section id="services" className="py-24 bg-background">
    <div className="container mx-auto px-4 md:px-8 max-w-[1280px]">
      {/* Header */}
      <div className="mb-16">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary mb-2">
          What We Do
        </p>
        <h2 className="text-[clamp(26px,3.5vw,36px)] font-bold text-foreground mb-3">
          Expert Masonry Services
        </h2>
        <div className="w-12 h-[3px] rounded-full bg-gradient-to-r from-primary to-[hsl(var(--color-primary-900))] mb-5" />
        <p className="text-muted-foreground text-base leading-relaxed max-w-xl">
          From custom residential stonework to large-scale commercial projects,
          CBS Masonry delivers precision craftsmanship at every scale.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((svc) => (
          <article
            key={svc.title}
            className="group bg-card border border-border/60 rounded-lg overflow-hidden flex flex-col transition-all duration-200 hover:border-primary/60 hover:-translate-y-1 hover:shadow-elevated"
          >
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
              <img
                src={svc.image}
                alt={svc.imageAlt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-card" />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-background/70 border border-primary/30 text-[11px] font-bold tracking-[0.08em] uppercase text-primary backdrop-blur-sm">
                {svc.badge}
              </span>
            </div>

            {/* Body */}
            <div className="p-6 flex flex-col flex-1">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center mb-4">
                <svc.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-[18px] font-semibold text-foreground mb-2">
                {svc.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                {svc.description}
              </p>
              <ul className="space-y-1.5 mb-5">
                {svc.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[13px] text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-[hsl(var(--color-primary-100))] transition-colors duration-150 group/link">
                Learn More
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover/link:translate-x-0.5" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
