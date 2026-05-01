import { ZoomIn, X } from "lucide-react";
import { useState } from "react";

const galleryItems = [
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", alt: "Stone retaining wall", label: "Retaining Wall", tall: true },
  { src: "https://images.unsplash.com/photo-1509660933844-6910e12765a0?w=600&q=80", alt: "Brick chimney", label: "Chimney Restoration", tall: false },
  { src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80", alt: "Stone patio", label: "Stone Patio", tall: false },
  { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80", alt: "Stone facade", label: "Stone Facade", tall: true },
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", alt: "Flagstone pathway", label: "Flagstone Path", tall: false },
  { src: "https://images.unsplash.com/photo-1574591374979-5a7c69d8b06c?w=600&q=80", alt: "Commercial brick work", label: "Commercial Brick", tall: false },
  { src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80", alt: "Outdoor fireplace", label: "Outdoor Fireplace", tall: true },
  { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80", alt: "Garden stone wall", label: "Garden Wall", tall: false },
  { src: "https://images.unsplash.com/photo-1599619585752-c3edb42a414c?w=600&q=80", alt: "Paving stone", label: "Paving Stone", tall: false },
  { src: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=600&q=80", alt: "Stone steps", label: "Stone Steps", tall: true },
  { src: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=600&q=80", alt: "Brick restoration", label: "Brick Restoration", tall: false },
  { src: "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=600&q=80", alt: "Rock feature wall", label: "Rock Feature", tall: false },
];

const Gallery = () => {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="mx-auto px-6 md:px-10 max-w-[1280px]">

        <div className="mb-10">
          <h2 className="text-[clamp(22px,3vw,32px)] font-bold text-foreground mb-3">
            Our Work
          </h2>
          <div className="w-10 h-[3px] rounded-full bg-primary mb-4" />
          <p className="text-muted-foreground text-sm max-w-md">
            A selection of completed projects across Victoria, BC.{" "}
            <span className="text-primary/70">Full gallery coming soon.</span>
          </p>
        </div>

        <div className="masonry-grid">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className="masonry-item group relative rounded overflow-hidden border border-border cursor-pointer transition-all duration-200 hover:shadow-elevated hover:border-primary/40"
              onClick={() => setLightbox(item.src)}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full block object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                style={{ aspectRatio: item.tall ? "3/4" : "4/3" }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-200 flex items-center justify-center">
                <ZoomIn className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/60 to-transparent">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/80">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="Project detail"
            className="max-w-full max-h-[88vh] rounded shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-9 h-9 rounded bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
