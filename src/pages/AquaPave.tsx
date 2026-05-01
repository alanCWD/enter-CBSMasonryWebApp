import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ZoomIn, X, ArrowLeft, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import CTABanner from "@/components/CTABanner";
import BBBSection from "@/components/BBBSection";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";

/* ── Gallery images (placeholder — replace with Bunny.net CDN) ── */
const galleryImages = [
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", alt: "AquaPave driveway installation" },
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", alt: "Permeable paving stones" },
  { src: "https://images.unsplash.com/photo-1599619585752-c3edb42a414c?w=600&q=80", alt: "AquaPave pathway" },
  { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80", alt: "Stone paving close-up" },
  { src: "https://images.unsplash.com/photo-1574591374979-5a7c69d8b06c?w=600&q=80", alt: "Commercial paving project" },
  { src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80", alt: "Residential driveway" },
  { src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80", alt: "Paved courtyard" },
  { src: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?w=600&q=80", alt: "Stone paving detail" },
];

const features = [
  "Self-permeable — water drains freely with no sand",
  "8 cm concrete pavers over 8 inches of three-quarter clear crushed rock",
  "SC1000 Embitex cloth layer with living microfibres to clean draining water",
  "Geotextile fabric base layer for structural integrity",
  "Concrete edging with three-quarter drain rock perimeter",
  "Suitable for driveways, walkways, courtyards and commercial lots",
];

const AquaPave = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar onGetQuote={() => setQuoteOpen(true)} isInnerPage />

      {/* ── Hero ── */}
      <section
        className="relative flex items-end min-h-[420px] md:min-h-[500px] overflow-hidden"
        style={{ paddingTop: "96px" }}
      >
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85"
          alt="AquaPave installation"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.60) 100%)" }}
        />
        <div className="relative z-10 w-full mx-auto px-6 md:px-10 max-w-[1280px] pb-12">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <h1 className="text-[clamp(32px,5vw,58px)] font-extrabold text-white leading-tight tracking-tight">
            AquaPave® System
          </h1>
          <p className="text-white/75 text-[clamp(14px,1.6vw,18px)] mt-3 max-w-xl">
            CBS Masonry Ltd. provides AquaPave® permeable paving solutions in Victoria, BC
          </p>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="py-16 bg-background">
        <div className="mx-auto px-6 md:px-10 max-w-[1280px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Left — text */}
            <div>
              <h2 className="text-[clamp(20px,2.5vw,28px)] font-bold text-foreground mb-3">
                AquaPave® Installation
              </h2>
              <div className="w-8 h-[3px] rounded-full bg-primary mb-6" />
              <div className="space-y-4 text-[15px] text-muted-foreground leading-relaxed mb-8">
                <p>
                  CBS Masonry Ltd. recently completed a 15,000 square foot driveway AquaPave®
                  System installation in Central Saanich. The AquaPave® system uses permeable
                  concrete pavers that are eight centimetres in thickness.
                </p>
                <p>
                  Beneath the pavers we install eight inches of three-quarter clear crushed rock
                  with a top layer of bird's eye gravel. The excavation begins approximately
                  12 to 14 inches below grade, followed by a Geotextile fabric cloth base layer
                  for structural support.
                </p>
                <p>
                  On top of the gravel we apply the SC1000 with an Embitex layer of cloth,
                  which contains living microfibres that clean the water as it drains through
                  the system — making it a truly sustainable, self-permeable solution.
                </p>
              </div>

              <h3 className="text-[clamp(17px,2vw,22px)] font-semibold text-foreground mb-4">
                How AquaPave® Works
              </h3>
              <ul className="space-y-2.5 mb-8">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[14px] text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — video embed */}
            <div className="flex flex-col gap-6">
              <div className="rounded overflow-hidden border border-border shadow-card aspect-video bg-muted">
                <iframe
                  src="https://www.youtube.com/embed/videoseries?list=PLAquaPaveCBS"
                  title="AquaPave® System — CBS Masonry"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="text-[12px] text-muted-foreground text-center">
                AquaPave® System — CBS Masonry Ltd.
              </div>

              {/* How it works diagram placeholder */}
              <div className="rounded overflow-hidden border border-border shadow-card">
                <img
                  src="https://images.unsplash.com/photo-1574591374979-5a7c69d8b06c?w=700&q=80"
                  alt="AquaPave system cross-section diagram"
                  className="w-full h-auto object-cover"
                />
                <div className="px-4 py-3 bg-card border-t border-border text-[12px] text-muted-foreground text-center">
                  Cross-section of AquaPave® permeable paving system layers
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Inspiration Gallery ── */}
      <section className="py-16 bg-card">
        <div className="mx-auto px-6 md:px-10 max-w-[1280px]">
          <div className="text-center mb-10">
            <h2 className="text-[clamp(20px,2.5vw,28px)] font-bold text-foreground mb-3">
              Inspiration Gallery
            </h2>
            <div className="w-8 h-[3px] rounded-full bg-primary mx-auto mb-4" />
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              View some of our completed AquaPave® projects below. If you would like us to work
              on your next project, please do not hesitate to call or send us a message.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="group relative rounded overflow-hidden border border-border cursor-pointer aspect-square hover:shadow-elevated transition-all duration-200"
                onClick={() => setLightbox(img.src)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all flex items-center justify-center">
                  <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
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

      <CTABanner onGetQuote={() => setQuoteOpen(true)} />
      <BBBSection />
      <Footer />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
};

export default AquaPave;
