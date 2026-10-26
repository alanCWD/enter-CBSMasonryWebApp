import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ZoomIn, X } from "lucide-react";
import { usePublicMedia } from "@/hooks/usePublicMedia";
import { HOME_GALLERY_ROTATE_MS, HOME_GALLERY_TILE_COUNT } from "@/lib/media";

interface Tile {
  id: number;
  src: string;
  alt: string;
  label: string;
  ratio: string;
}

/** Varied tile shapes give the wall its non-grid rhythm. */
const TILE_RATIOS = ["3/4", "1/1", "4/3", "3/4", "4/3", "1/1", "3/4", "4/3", "1/1", "3/4", "4/3", "3/4"];

const fallbackTiles: Tile[] = [
  { id: 0, src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", alt: "Stone retaining wall", label: "Retaining Wall", ratio: "3/4" },
  { id: 1, src: "https://images.unsplash.com/photo-1509660933844-6910e12765a0?w=600&q=80", alt: "Brick chimney", label: "Chimney Restoration", ratio: "4/3" },
  { id: 2, src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80", alt: "Stone patio", label: "Stone Patio", ratio: "4/3" },
  { id: 3, src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80", alt: "Stone facade", label: "Stone Facade", ratio: "3/4" },
  { id: 4, src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", alt: "Flagstone pathway", label: "Flagstone Path", ratio: "1/1" },
  { id: 5, src: "https://images.unsplash.com/photo-1574591374979-5a7c69d8b06c?w=600&q=80", alt: "Commercial brick work", label: "Commercial Brick", ratio: "4/3" },
  { id: 6, src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80", alt: "Outdoor fireplace", label: "Outdoor Fireplace", ratio: "3/4" },
  { id: 7, src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80", alt: "Garden stone wall", label: "Garden Wall", ratio: "4/3" },
  { id: 8, src: "https://images.unsplash.com/photo-1599619585752-c3edb42a414c?w=600&q=80", alt: "Paving stone", label: "Paving Stone", ratio: "1/1" },
  { id: 9, src: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=600&q=80", alt: "Stone steps", label: "Stone Steps", ratio: "3/4" },
  { id: 10, src: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=600&q=80", alt: "Brick restoration", label: "Brick Restoration", ratio: "4/3" },
  { id: 11, src: "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?w=600&q=80", alt: "Rock feature wall", label: "Rock Feature", ratio: "3/4" },
];

const shuffle = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const Gallery = () => {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const { featuredPhotos } = usePublicMedia();
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(query.matches);
    const onChange = () => setReduceMotion(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Featured pool, reshuffled every visit so the wall is never in the same order.
  const pool = useMemo(
    () => shuffle(featuredPhotos.map((p) => ({ src: p.cdnUrl, alt: p.fileName, label: p.categoryLabel }))),
    [featuredPhotos]
  );

  const baseTiles = useMemo<Tile[]>(() => {
    if (!pool.length) return fallbackTiles;
    return pool.slice(0, HOME_GALLERY_TILE_COUNT).map((photo, i) => ({
      id: i,
      src: photo.src,
      alt: photo.alt,
      label: photo.label,
      ratio: TILE_RATIOS[i % TILE_RATIOS.length],
    }));
  }, [pool]);

  const [tiles, setTiles] = useState<Tile[]>(baseTiles);

  useEffect(() => {
    setTiles(baseTiles);
  }, [baseTiles]);

  // Swap a single tile at a time with something from the reserve of featured photos.
  useEffect(() => {
    if (reduceMotion) return;
    if (pool.length <= tiles.length) return;

    const id = window.setInterval(() => {
      setTiles((prev) => {
        const visible = new Set(prev.map((t) => t.src));
        const reserve = pool.filter((p) => !visible.has(p.src));
        if (!reserve.length) return prev;
        const next = reserve[Math.floor(Math.random() * reserve.length)];
        const index = Math.floor(Math.random() * prev.length);
        const updated = [...prev];
        updated[index] = { ...updated[index], src: next.src, alt: next.alt, label: next.label };
        return updated;
      });
    }, HOME_GALLERY_ROTATE_MS);

    return () => window.clearInterval(id);
  }, [pool, tiles.length, reduceMotion]);

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
          {tiles.map((tile) => (
            <div
              key={tile.id}
              className="masonry-item group relative rounded overflow-hidden border border-border cursor-pointer transition-all duration-200 hover:shadow-elevated hover:border-primary/40"
              style={{ aspectRatio: tile.ratio }}
              onClick={() => setLightbox(tile.src)}
            >
              <AnimatePresence initial={false}>
                <motion.img
                  key={tile.src}
                  src={tile.src}
                  alt={tile.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeInOut" }}
                  loading="lazy"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-200 flex items-center justify-center">
                <ZoomIn className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>

              {tile.label && (
                <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-white/80">
                    {tile.label}
                  </span>
                </div>
              )}
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
