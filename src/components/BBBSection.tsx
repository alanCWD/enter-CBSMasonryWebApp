import { ExternalLink } from "lucide-react";

const BBBSection = () => (
  <section className="py-20 bg-[hsl(210,20%,95%)] border-y border-border">
    <div className="mx-auto px-6 md:px-10 max-w-[1280px]">
      <div className="flex flex-col lg:flex-row items-start gap-16">

        {/* BBB Badge Image */}
        <div className="flex-shrink-0 flex items-start justify-center pt-1 px-6">
          <img
            src="https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100027458/b13c2a26-f2f6-49.png"
            alt="BBB Torch Awards for Ethics – 2023, 2022, 2015 & 2013 Winner"
            crossOrigin="anonymous"
            className="w-[360px] h-auto object-contain"
          />
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
