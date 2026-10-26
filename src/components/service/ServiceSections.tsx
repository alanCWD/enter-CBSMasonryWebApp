import { ArrowUpRight, Check } from "lucide-react";
import type { ServiceSection } from "@/lib/servicePages";

/** The detailed service blocks below the opening summary. */
const ServiceSections = ({ sections }: { sections: ServiceSection[] }) => (
  <section className="py-16 bg-card">
    <div className="mx-auto px-6 md:px-10 max-w-[1280px]">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
          Service details
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
        {sections.map((section) => (
          <article
            key={section.heading}
            className={`bg-background border border-border rounded p-6 transition-all duration-200 hover:shadow-card ${
              section.wide ? "md:col-span-2" : ""
            }`}
          >
            <h3 className="text-[17px] font-semibold text-foreground">{section.heading}</h3>
            <div className="w-6 h-[2px] rounded-full bg-primary my-4" />

            <div className="space-y-3 text-[14px] text-muted-foreground leading-relaxed">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            {section.bullets && (
              <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-[13px] text-muted-foreground">
                    <Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}

            {section.link && (
              <a
                href={section.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-5 text-[13px] font-semibold text-primary hover:underline"
              >
                {section.link.label}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ServiceSections;
