import { useEffect, useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

interface HeroProps {
  onGetQuote: () => void;
}

const Hero = ({ onGetQuote }: HeroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source
          src="https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100027458/fc0c6fb7-e03e-49.mp4"
          type="video/mp4"
        />
      </video>

      {/* Lightened overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.20) 60%, rgba(0,0,0,0.38) 100%)" }}
        aria-hidden="true"
      />

      {/* Content — centred */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto" style={{ paddingTop: "96px" }}>
        <h1 className="text-[clamp(36px,5.5vw,64px)] font-extrabold leading-[1.08] tracking-[-0.02em] text-white mb-5 animate-fade-in-up">
          Welcome to CBS Masonry
        </h1>

        <p className="text-[clamp(15px,1.8vw,19px)] leading-relaxed text-white/80 mb-10 max-w-xl mx-auto animate-fade-in-up-delay-1">
          With more than 175 combined years of experience, CBS Masonry LTD is the premier
          bricklaying and stone masonry company in Victoria, BC.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up-delay-2">
          <button
            onClick={onGetQuote}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-[0.08em] rounded-sm border-2 border-primary hover:bg-transparent hover:text-white transition-all duration-200 active:scale-[0.97]"
          >
            Get a Quote
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border-2 border-white/60 text-white text-sm font-bold uppercase tracking-[0.08em] rounded-sm hover:bg-white/10 hover:border-white transition-all duration-200"
          >
            Our Services
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 flex flex-col items-center gap-1.5 opacity-50 z-10"
        style={{ animation: "scroll-bounce 2.4s ease-in-out infinite" }}
        aria-hidden="true"
      >
        <ChevronDown className="w-6 h-6 text-white" />
      </div>
    </section>
  );
};

export default Hero;
