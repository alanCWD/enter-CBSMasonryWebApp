import { Home, Building2, Sparkles } from "lucide-react";

const services = [
  {
    icon: Home,
    badge: "Residential",
    title: "Residential",
    description:
      "CBS Masonry works with home builders and contractors to complete any residential masonry project in a timely and professional manner.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    imageAlt: "Residential masonry work",
  },
  {
    icon: Building2,
    badge: "Commercial",
    title: "Commercial",
    description:
      "We are here to help provide an artist's eye to your masonry project needs. If you can dream it, we can make it happen.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
    imageAlt: "Commercial masonry project",
  },
  {
    icon: Sparkles,
    badge: "Specialty",
    title: "Specialty",
    description:
      "CBS Masonry provides the trained eye a canvas to convert masonry projects and dreams into concrete reality.",
    image: "https://images.unsplash.com/photo-1574591374979-5a7c69d8b06c?w=600&q=80",
    imageAlt: "Specialty masonry work",
  },
];

const Services = () => (
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((svc) => (
          <article
            key={svc.title}
            className="group bg-background border border-border rounded overflow-hidden flex flex-col transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5"
          >
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
              <img
                src={svc.image}
                alt={svc.imageAlt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="px-3 py-1 rounded-sm bg-primary text-primary-foreground text-[11px] font-bold tracking-[0.08em] uppercase">
                  {svc.badge}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-2.5 mb-3">
                <svc.icon className="w-4 h-4 text-primary flex-shrink-0" />
                <h3 className="text-[17px] font-semibold text-foreground">
                  {svc.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {svc.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
