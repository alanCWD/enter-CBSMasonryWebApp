import { ExternalLink, Award } from "lucide-react";

const BBBSection = () => (
  <section className="py-20 bg-[hsl(210,20%,95%)] border-y border-border">
    <div className="mx-auto px-6 md:px-10 max-w-[1280px]">
      <div className="flex flex-col lg:flex-row items-center gap-12">

        {/* BBB Badge */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <div className="w-72 rounded border border-border bg-white shadow-card p-8 flex flex-col items-center text-center gap-3">
            <div className="w-14 h-14 rounded-full bg-[hsl(210,85%,32%)] flex items-center justify-center mb-1">
              <Award className="w-7 h-7 text-white" />
            </div>
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[hsl(210,85%,32%)]">
              BBB Torch Awards
            </div>
            <div className="text-2xl font-extrabold text-foreground leading-tight">
              for Ethics
            </div>
            <div className="w-10 h-[2px] bg-[hsl(210,85%,32%)] rounded" />
            <div className="text-sm font-semibold text-foreground">
              2023 &amp; 2022 Winner
            </div>
            <div className="text-sm font-semibold text-foreground">
              2015 &amp; 2013 Winner
            </div>
            <div className="text-[10px] text-muted-foreground mt-1 leading-relaxed">
              Trademark(s) of the International Association of<br />
              Better Business Bureaus used under license.
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-[clamp(22px,3vw,34px)] font-bold text-foreground mb-4 leading-tight">
            Help Nominate CBS Masonry Ltd. for this year's BBB Torch Awards!
          </h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
            CBS Masonry Ltd. is a proud TOP SPONSOR of the BBB Annual Torch Awards Gala
            and Awards Ceremony, recognized for its commitment to excellence and customer
            service throughout Victoria, BC.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <a
              href="https://www.bbb.org/ca/bc/victoria/profile/masonry-contractors/cbs-masonry-ltd-0037-87477"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 bg-[hsl(210,85%,32%)] text-white text-sm font-bold uppercase tracking-[0.07em] rounded-sm hover:bg-[hsl(210,85%,26%)] transition-all duration-150 active:scale-[0.97]"
            >
              Nominate CBS Masonry
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://www.bbb.org/ca/bc/victoria/profile/masonry-contractors/cbs-masonry-ltd-0037-87477"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 border-2 border-[hsl(210,85%,32%)] text-[hsl(210,85%,32%)] text-sm font-bold uppercase tracking-[0.07em] rounded-sm hover:bg-[hsl(210,85%,32%)] hover:text-white transition-all duration-150"
            >
              View BBB Profile
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default BBBSection;
