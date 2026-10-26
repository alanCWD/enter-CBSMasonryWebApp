import { useCallback, useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ImageIcon, Phone, X, ZoomIn } from "lucide-react";
import { SERVICE_GALLERY_BATCH } from "@/lib/media";

export interface GalleryPhoto {
  src: string;
  alt: string;
}

interface ProjectGalleryProps {
  photos: GalleryPhoto[];
  loading?: boolean;
}

const PLACEHOLDER_TILES = 8;

/**
 * Project gallery for a service page. Photos arrive from the page's upload category and are
 * revealed a batch at a time so a category with dozens of photos still opens quickly.
 * The first photo gets a wide feature tile; the rest are square, in a tidy responsive grid.
 */
const ProjectGallery = ({ photos, loading = false }: ProjectGalleryProps) => {
  const [visibleCount, setVisibleCount] = useState(SERVICE_GALLERY_BATCH);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    setVisibleCount(SERVICE_GALLERY_BATCH);
  }, [photos]);

  const close = useCallback(() => setActiveIndex(null), []);

  const step = useCallback(
    (direction: number) => {
      setActiveIndex((current) => {
        if (current === null || !photos.length) return current;
        return (current + direction + photos.length) % photos.length;
      });
    },
    [photos.length]
  );

  useEffect(() => {
    if (activeIndex === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close, step]);

  const visible = photos.slice(0, visibleCount);
  const remaining = photos.length - visible.length;
  const active = activeIndex === null ? null : photos[activeIndex];
  /** Small sets read better as a plain grid; larger sets get a wide lead photo. */
  const hasFeatureTile = photos.length >= 5;

  return (
    <section className="py-16 bg-card">
      <div className="mx-auto px-6 md:px-10 max-w-[1280px]">
        <div className="text-center mb-10">
          <h2 className="text-[clamp(20px,2.5vw,28px)] font-bold text-foreground mb-3">
            Inspiration Gallery
          </h2>
          <div className="w-8 h-[3px] rounded-full bg-primary mx-auto mb-4" />
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            View some of our completed projects below. If you would like us to work on your next
            project, please do not hesitate to call or send us a message.
          </p>
          {!loading && photos.length > 0 && (
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
              {photos.length} project photo{photos.length === 1 ? "" : "s"}
            </p>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.from({ length: PLACEHOLDER_TILES }).map((_, index) => (
              <div
                key={index}
                className={`rounded overflow-hidden border border-border bg-muted animate-pulse aspect-square ${
                  index === 0 ? "col-span-2 aspect-[2/1]" : ""
                }`}
              />
            ))}
          </div>
        ) : photos.length === 0 ? (
          <div className="rounded border border-dashed border-border bg-background px-6 py-14 text-center">
            <ImageIcon className="w-7 h-7 text-muted-foreground/70 mx-auto mb-4" />
            <p className="text-[15px] font-semibold text-foreground mb-2">
              Project photos are on their way
            </p>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              We are adding photos from this service to the site. In the meantime, call{" "}
              <a
                href="tel:2502949942"
                className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
              >
                <Phone className="w-3.5 h-3.5" />
                250-294-9942
              </a>{" "}
              or request a free estimate and we will send examples of recent work.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {visible.map((photo, index) => (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View photo ${index + 1} of ${photos.length}`}
                  className={`group relative rounded overflow-hidden border border-border cursor-zoom-in transition-all duration-200 hover:shadow-elevated hover:border-primary/40 ${
                    index === 0 && hasFeatureTile ? "col-span-2 aspect-[2/1]" : "aspect-square"
                  }`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    crossOrigin="anonymous"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <span className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center gap-3">
              {remaining > 0 ? (
                <>
                  <button
                    onClick={() => setVisibleCount((count) => count + SERVICE_GALLERY_BATCH)}
                    className="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary text-[13px] font-bold uppercase tracking-[0.08em] rounded-sm hover:bg-primary hover:text-primary-foreground transition-all duration-150"
                  >
                    <ChevronDown className="w-4 h-4" />
                    Show {Math.min(remaining, SERVICE_GALLERY_BATCH)} more
                  </button>
                  <span className="text-[12px] text-muted-foreground">
                    Showing {visible.length} of {photos.length} photos
                  </span>
                </>
              ) : (
                photos.length > SERVICE_GALLERY_BATCH && (
                  <span className="text-[12px] text-muted-foreground">
                    That is all {photos.length} photos — get in touch to talk about yours.
                  </span>
                )
              )}
            </div>
          </>
        )}
      </div>

      {active && activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={close}
            aria-label="Close gallery"
            className="absolute top-4 right-4 w-9 h-9 rounded bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <button
            onClick={(event) => {
              event.stopPropagation();
              step(-1);
            }}
            aria-label="Previous photo"
            className="absolute left-3 md:left-6 w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <img
            src={active.src}
            alt={active.alt}
            className="max-w-full max-h-[84vh] rounded shadow-2xl object-contain"
            onClick={(event) => event.stopPropagation()}
          />

          <button
            onClick={(event) => {
              event.stopPropagation();
              step(1);
            }}
            aria-label="Next photo"
            className="absolute right-3 md:right-6 w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-semibold text-white/90">
            {activeIndex + 1} / {photos.length}
          </span>
        </div>
      )}
    </section>
  );
};

export default ProjectGallery;
