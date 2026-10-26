interface BeforeAfterProps {
  before?: string;
  after?: string;
  label?: string;
}

/**
 * Side-by-side comparison of a project's two photos. Hidden entirely until at least one of
 * the pair is chosen in the media library, so pages never show an empty frame.
 */
const BeforeAfter = ({ before, after, label = "Before & After" }: BeforeAfterProps) => {
  if (!before && !after) return null;

  const panes = [
    { tag: "Before", src: before, alt: "Before the work" },
    { tag: "After", src: after, alt: "After the work" },
  ].filter((pane) => Boolean(pane.src));

  return (
    <section className="py-16 bg-background">
      <div className="mx-auto px-6 md:px-10 max-w-[1280px]">
        <div className="text-center mb-10">
          <h2 className="text-[clamp(20px,2.5vw,28px)] font-bold text-foreground mb-3">{label}</h2>
          <div className="w-8 h-[3px] rounded-full bg-primary mx-auto mb-4" />
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            A look at what our crews start with and what the finished work looks like.
          </p>
        </div>

        <div className={`grid gap-4 ${panes.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
          {panes.map((pane) => (
            <figure
              key={pane.tag}
              className="group relative rounded overflow-hidden border border-border bg-muted aspect-[4/3]"
            >
              <img
                src={pane.src}
                alt={pane.alt}
                crossOrigin="anonymous"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <figcaption className="absolute top-3 left-3 px-3 py-1 rounded-sm bg-background/90 text-[10px] font-bold uppercase tracking-[0.12em] text-foreground">
                {pane.tag}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
