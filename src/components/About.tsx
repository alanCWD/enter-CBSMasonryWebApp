import { Trophy, Shield } from "lucide-react";

const About = () => (
  <section id="about" className="py-20 bg-card">
    <div className="mx-auto px-6 md:px-10 max-w-[1280px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* Image */}
        <div className="relative hidden lg:block">
          <div className="rounded overflow-hidden border border-border aspect-[4/3] shadow-card">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
              alt="CBS Masonry craftsmen at work"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Years badge */}
          <div className="absolute -bottom-5 -right-5 w-28 h-28 rounded-full bg-primary flex flex-col items-center justify-center shadow-elevated z-10">
            <span className="text-2xl font-extrabold text-primary-foreground leading-none">175+</span>
            <span className="text-[9px] font-semibold uppercase tracking-wider text-primary-foreground/80 text-center leading-tight mt-1">
              Combined<br />Years
            </span>
          </div>
        </div>

        {/* Content */}
        <div>
          <h2 className="text-[clamp(22px,3vw,32px)] font-bold text-foreground mb-3">
            Victoria's Residential &amp; Commercial Masonry Specialists
          </h2>
          <div className="w-10 h-[3px] rounded-full bg-primary mb-6" />

          <div className="space-y-4 text-muted-foreground text-[15px] leading-relaxed mb-8">
            <p>
              With more than 175 combined years of experience, CBS Masonry is a premier
              bricklaying and stone masonry company. Family owned and headquartered in
              Victoria, BC, CBS offers a full array of masonry products and services,
              along with the design and consultation skills to guarantee work meets and
              exceeds the high standards of both residential and commercial customers
              throughout the Victoria area.
            </p>
            <p>
              From chimney repair and restoration to natural stone patios, sidewalks
              and pathways, our team has the expertise to get the job done right —
              whether your project is large or small.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex gap-3 p-4 rounded border border-border bg-background">
              <Trophy className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-[13px] font-semibold text-foreground mb-0.5">BBB Torch Award</div>
                <div className="text-[12px] text-muted-foreground">Winner 2023, 2022, 2016, 2015 &amp; 2013</div>
              </div>
            </div>
            <div className="flex gap-3 p-4 rounded border border-border bg-background">
              <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-[13px] font-semibold text-foreground mb-0.5">BBB A+ Rating</div>
                <div className="text-[12px] text-muted-foreground">Accredited by the BBB of Victoria</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
