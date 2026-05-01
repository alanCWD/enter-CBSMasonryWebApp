import { ZoomIn } from "lucide-react";
import { useState } from "react";

// Placeholder gallery items — replace src with Bunny CDN URLs when ready
const galleryItems = [
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    alt: "Stone retaining wall construction",
    label: "Retaining Wall",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1509660933844-6910e12765a0?w=600&q=80",
    alt: "Brick chimney restoration",
    label: "Chimney Restoration",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80",
    alt: "Natural stone patio installation",
    label: "Stone Patio",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    alt: "Residential stone facade",
    label: "Stone Facade",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    alt: "Flagstone pathway",
    label: "Flagstone Path",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1574591374979-5a7c69d8b06c?w=600&q=80",
    alt: "Commercial brick work",
    label: "Commercial Brick",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    alt: "Outdoor fireplace build",
    label: "Outdoor Fireplace",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80",
    alt: "Garden stone wall",
    label: "Garden Wall",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1599619585752-c3edb42a414c?w=600&q=80",
    alt: "Paving stone driveway",
    label: "Paving Stone",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=600&q=80",
    alt: "Stone steps construction",
    label: "Stone Steps",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=600&q=80",
    alt: "Brick restoration project",
    label: "Brick Restoration",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=600&q=80",
    alt: "Natural rock feature wall",
    label: "Rock Feature Wall",
    tall: false,
  },
];

const Gallery = () => {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-[1280px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary mb-2">
              Our Work
            </p>
            <h2 className="text-[clamp(24px,3vw,34px)] font-bold text-foreground mb-3">
              Masonry Gallery
            </h2>
            <div className="w-12 h-[3px] rounded-full bg-gradient-to-r from-primary to-[hsl(var(--color-primary-900))] mb-4" />
            <p className="text-muted-foreground text-sm max-w-md">
              A selection of completed masonry projects across Victoria, BC — from residential
              stone patios to commercial brick facades.
              <span className="text-primary/80 text-xs block mt-1">
                * Full high-resolution gallery coming soon
              </span>
            </p>
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="masonry-grid">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className="masonry-item group relative rounded overflow-hidden border border-border cursor-pointer transition-all duration-200 hover:border-primary/60"
              onClick={() => setLightbox(item.src)}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full block object-cover transition-transform duration-300 group-hover:scale-105"
                style={{ aspectRatio: item.tall ? "3/4" : "4/3" }}
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-[hsl(201_97%_32%/0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white" />
              </div>
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-background/90 to-transparent">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder note */}
        <div className="mt-10 p-5 rounded-lg border border-primary/20 bg-primary/5 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Gallery Update Coming Soon</span> — 
            Placeholder images shown above. Final high-resolution project photos will be
            uploaded via Bunny.net CDN.
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="Gallery preview"
            className="max-w-full max-h-[90vh] rounded-lg border border-border shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded border border-border bg-card text-muted-foreground flex items-center justify-center hover:text-foreground transition-colors"
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
