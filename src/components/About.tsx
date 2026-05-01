import { Award, Shield, Users, Trophy } from "lucide-react";

const awards = [
  {
    icon: Trophy,
    title: "BBB Torch Award",
    desc: "Winner 2023, 2022, 2016, 2015 & 2013 – Customer Service Excellence",
  },
  {
    icon: Shield,
    title: "BBB A+ Rating",
    desc: "Accredited by the Better Business Bureau of Victoria",
  },
  {
    icon: Award,
    title: "Top Sponsor",
    desc: "Proud TOP SPONSOR of the BBB Annual Torch Awards Gala",
  },
  {
    icon: Users,
    title: "Community First",
    desc: "Proud sponsor of Pacific FC — Canadian Premier League",
  },
];

const About = () => (
  <section id="about" className="py-24 bg-card relative overflow-hidden">
    {/* Background glow */}
    <div
      className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
      style={{
        background: "radial-gradient(circle, hsl(201 97% 32% / 0.12) 0%, transparent 70%)",
        transform: "translate(30%, -30%)",
      }}
      aria-hidden="true"
    />

    <div className="container mx-auto px-4 md:px-8 max-w-[1280px] relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Visual */}
        <div className="relative hidden lg:block">
          <div className="rounded-xl overflow-hidden border border-border aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
              alt="CBS Masonry craftsmen at work on a commercial project"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>
          {/* Badge */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-gradient-to-br from-[hsl(var(--color-primary-900))] to-background border border-primary/25 flex flex-col items-center justify-center shadow-card z-10">
            <span className="text-3xl font-extrabold text-primary leading-none">175+</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-center leading-tight mt-1">
              Combined<br />Years
            </span>
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary mb-2">
            About Us
          </p>
          <h2 className="text-[clamp(24px,3vw,34px)] font-bold text-foreground mb-3">
            Victoria's Residential &amp; Commercial Masonry Specialists
          </h2>
          <div className="w-12 h-[3px] rounded-full bg-gradient-to-r from-primary to-[hsl(var(--color-primary-900))] mb-6" />

          <div className="space-y-4 text-muted-foreground text-base leading-relaxed mb-8">
            <p>
              With more than 175 combined years of experience, CBS Masonry is a premier
              bricklaying and stone masonry company. Family owned and headquartered in
              Victoria, BC, CBS offers a full array of masonry products and services,
              along with the design and consultation skills to guarantee work meets and
              exceeds the high standards of both residential and commercial customers
              throughout the Victoria area.
            </p>
            <p>
              From repair, rebuild, renew or replacing of chimney stacks or restoration
              works to natural stone patios, sidewalks or pathways, our professional team
              has the expertise to get the job done right. Whether your project is big or
              small, you expect the same high safety, quality and production standards.
            </p>
            <p>
              CBS Masonry is recognized by the BBB of Victoria, and was the winner of
              the 2023, 2022, 2016, 2015 &amp; 2013 Torch Award.
            </p>
          </div>

          {/* Awards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {awards.map((award) => (
              <div
                key={award.title}
                className="flex gap-3 p-4 rounded bg-primary/5 border border-primary/14"
              >
                <div className="w-9 h-9 flex-shrink-0 rounded bg-primary/12 flex items-center justify-center">
                  <award.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-foreground mb-0.5">
                    {award.title}
                  </div>
                  <div className="text-[11px] text-muted-foreground leading-snug">
                    {award.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
