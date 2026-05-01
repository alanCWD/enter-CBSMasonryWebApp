import { Phone, MapPin, Clock, Facebook, Youtube, Linkedin, Instagram } from "lucide-react";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const services = [
  "Chimney Works",
  "WCB Scaffolding",
  "Brick Restoration",
  "Flagstone",
  "Natural Rock",
  "Culture Stone",
  "Paving Stone",
  "AquaPave",
  "Excavation",
];

const hours = [
  { day: "Mon – Fri", time: "8:00 AM – 4:00 PM", open: true },
  { day: "Saturday", time: "Closed", open: false },
  { day: "Sunday", time: "Closed", open: false },
];

const social = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

const Footer = () => (
  <footer id="footer" className="bg-[hsl(222_47%_5%)] border-t border-border">
    <div className="container mx-auto px-4 md:px-8 max-w-[1280px] py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src="https://grazia-prod.oss-ap-southeast-1.aliyuncs.com/resources/uid_100027458/9cc16a08-504a-4d.png"
              alt="CBS Masonry Ltd."
              crossOrigin="anonymous"
              className="h-12 w-auto object-contain"
            />
            <div>
              <div className="text-sm font-bold text-foreground">CBS Masonry Ltd.</div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.10em] text-primary">
                Quality is our Guarantee
              </div>
            </div>
          </div>
          <p className="text-[13px] text-muted-foreground leading-relaxed mb-5 max-w-[260px]">
            Premier bricklaying and stone masonry company serving Victoria, BC with
            175+ combined years of experience.
          </p>
          <div className="flex gap-2">
            {social.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded border border-border text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-all duration-150"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary mb-4">
            Masonry Services
          </h3>
          <ul className="space-y-2">
            {services.map((svc) => (
              <li key={svc}>
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-100 group"
                >
                  <span className="w-1 h-1 rounded-full bg-border group-hover:bg-primary transition-colors flex-shrink-0" />
                  {svc}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary mb-4">
            Office Location
          </h3>
          <div className="space-y-4">
            <div className="flex gap-2">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-0.5">Address</div>
                <div className="text-[13px] text-muted-foreground">
                  1008 Braeburn Ave<br />
                  Victoria, BC V9C 0H8
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Phone className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-0.5">Phone</div>
                <a
                  href="tel:2502949942"
                  className="text-[13px] text-muted-foreground hover:text-primary transition-colors"
                >
                  250-294-9942
                </a>
              </div>
            </div>
            <div className="flex gap-2">
              <Clock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-2">Office Hours</div>
                <div className="space-y-1">
                  {hours.map(({ day, time, open }) => (
                    <div key={day} className="flex justify-between gap-4 text-[12px]">
                      <span className="text-muted-foreground">{day}</span>
                      <span className={open ? "text-primary font-medium" : "text-muted-foreground/60"}>
                        {time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary mb-4">
            Read Our Reviews
          </h3>
          <div className="space-y-3">
            <a
              href="https://www.google.com/search?q=cbs+masonry+victoria+bc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2.5 rounded border border-border bg-card/50 text-[12px] font-semibold text-muted-foreground hover:border-primary/40 hover:text-primary transition-all duration-150"
            >
              <GoogleIcon />
              Google Reviews
              <span className="ml-auto text-yellow-400 text-xs">★★★★★</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-3 py-2.5 rounded border border-border bg-card/50 text-[12px] font-semibold text-muted-foreground hover:border-primary/40 hover:text-primary transition-all duration-150"
            >
              <Facebook className="w-4 h-4 text-[#1877F2]" />
              Facebook Reviews
              <span className="ml-auto text-yellow-400 text-xs">★★★★★</span>
            </a>
          </div>

          <div className="mt-5 p-3 rounded border border-primary/15 bg-primary/5">
            <p className="text-[11px] text-muted-foreground italic">
              "Quality is our Guarantee!"
            </p>
            <p className="text-[11px] font-semibold text-primary mt-1">
              — CBS Masonry Ltd.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-border py-4">
      <div className="container mx-auto px-4 md:px-8 max-w-[1280px] flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-muted-foreground/50">
        <span>© CBS Masonry Ltd. 2025 — All Rights Reserved.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-muted-foreground transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-muted-foreground transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
