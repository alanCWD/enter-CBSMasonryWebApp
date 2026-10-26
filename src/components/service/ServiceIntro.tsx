import { CheckCircle } from "lucide-react";

interface ServiceIntroProps {
  heading: string;
  lead: string[];
  highlights: string[];
  media?: {
    videoId?: string;
    videoCaption?: string;
    aside?: { src: string; caption: string };
  };
  /** Page's own photo, used beside the text when the page has no video. */
  supportingImage?: string;
  supportingAlt: string;
}

/**
 * Opening block of a service page: what the service is, what it covers, and the page's
 * video or photo alongside. Without media the text simply takes the full width.
 */
const ServiceIntro = ({
  heading,
  lead,
  highlights,
  media,
  supportingImage,
  supportingAlt,
}: ServiceIntroProps) => {
  const hasMediaColumn = Boolean(media?.videoId || media?.aside || supportingImage);

  return (
    <section className="py-16 bg-background">
      <div className="mx-auto px-6 md:px-10 max-w-[1280px]">
        <div className={hasMediaColumn ? "grid grid-cols-1 lg:grid-cols-2 gap-12 items-start" : ""}>
          <div className={hasMediaColumn ? "" : "max-w-3xl"}>
            <h2 className="text-[clamp(20px,2.5vw,28px)] font-bold text-foreground mb-3">
              {heading}
            </h2>
            <div className="w-8 h-[3px] rounded-full bg-primary mb-6" />

            <div className="space-y-4 text-[15px] text-muted-foreground leading-relaxed mb-8">
              {lead.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary mb-4">
              What this service includes
            </h3>
            <ul className={hasMediaColumn ? "space-y-2.5" : "grid sm:grid-cols-2 gap-2.5"}>
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[14px] text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {hasMediaColumn && (
            <div className="flex flex-col gap-6">
              {media?.videoId && (
                <>
                  <div className="rounded overflow-hidden border border-border shadow-card aspect-video bg-muted">
                    <iframe
                      src={`https://www.youtube.com/embed/${media.videoId}`}
                      title={media.videoCaption ?? heading}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  {media.videoCaption && (
                    <div className="text-[12px] text-muted-foreground text-center -mt-3">
                      {media.videoCaption}
                    </div>
                  )}
                </>
              )}

              {media?.aside ? (
                <div className="rounded overflow-hidden border border-border shadow-card">
                  <img
                    src={media.aside.src}
                    alt={media.aside.caption}
                    crossOrigin="anonymous"
                    className="w-full h-auto object-cover"
                  />
                  <div className="px-4 py-3 bg-card border-t border-border text-[12px] text-muted-foreground text-center">
                    {media.aside.caption}
                  </div>
                </div>
              ) : (
                !media?.videoId &&
                supportingImage && (
                  <div className="rounded overflow-hidden border border-border shadow-card aspect-[4/3]">
                    <img
                      src={supportingImage}
                      alt={supportingAlt}
                      crossOrigin="anonymous"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceIntro;
