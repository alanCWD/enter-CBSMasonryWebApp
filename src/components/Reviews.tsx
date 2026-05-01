import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, ExternalLink } from "lucide-react";

const reviews = [
  {
    name: "Jennifer M.",
    initials: "JM",
    date: "March 2024",
    rating: 5,
    text: "CBS Masonry did an incredible job on our stone retaining wall. Charlie and the crew were professional, on time, and the quality of work is outstanding. Our neighbours keep asking who did the work. Highly recommend!",
  },
  {
    name: "Robert T.",
    initials: "RT",
    date: "February 2024",
    rating: 5,
    text: "We hired CBS Masonry to rebuild our chimney and add a natural stone patio. Exceptional craftsmanship from start to finish. They were honest about costs upfront and finished on schedule. Absolutely thrilled.",
  },
  {
    name: "Sandra L.",
    initials: "SL",
    date: "January 2024",
    rating: 5,
    text: "Best masonry company in Victoria! Our flagstone pathway and garden walls look absolutely beautiful. The team was respectful of our property and cleaned up perfectly each day.",
  },
  {
    name: "David K.",
    initials: "DK",
    date: "December 2023",
    rating: 5,
    text: "CBS Masonry completed a full brick restoration on our commercial building. Excellent workmanship, great communication throughout the project, and the final result exceeded our expectations.",
  },
  {
    name: "Patricia H.",
    initials: "PH",
    date: "November 2023",
    rating: 5,
    text: "I've used CBS Masonry twice now — once for a paving stone driveway and recently for an outdoor fireplace. Both times the work was flawless. You can tell this company takes real pride in their craft.",
  },
  {
    name: "Michael B.",
    initials: "MB",
    date: "October 2023",
    rating: 5,
    text: "Called CBS Masonry for an urgent chimney repair before winter. They fit us in quickly, assessed the damage thoroughly, and completed the repair to a very high standard. Very fair pricing.",
  },
];

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const CARDS_PER_PAGE = 3;

const Reviews = () => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(reviews.length / CARDS_PER_PAGE);
  const visible = reviews.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE);

  return (
    <section id="reviews" className="py-20 bg-card">
      <div className="mx-auto px-6 md:px-10 max-w-[1280px]">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h2 className="text-[clamp(22px,3vw,32px)] font-bold text-foreground mb-3">
              What Our Clients Say
            </h2>
            <div className="w-10 h-[3px] rounded-full bg-primary mb-4" />
            <p className="text-muted-foreground text-sm">
              Trusted by homeowners and businesses throughout Victoria, BC.
            </p>
          </div>

          {/* Score */}
          <div className="flex items-center gap-4 px-5 py-4 rounded border border-border bg-background flex-shrink-0">
            <div className="text-4xl font-extrabold text-foreground leading-none">5.0</div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">Google Rating</span>
              <a
                href="https://www.google.com/search?q=cbs+masonry+victoria+bc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                <GoogleIcon />
                View on Google
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {visible.map((review) => (
            <div
              key={review.name}
              className="bg-background border border-border rounded p-5 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground flex-shrink-0">
                    {review.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{review.name}</div>
                    <div className="text-[11px] text-muted-foreground">{review.date}</div>
                  </div>
                </div>
                <div className="opacity-50 mt-0.5">
                  <GoogleIcon />
                </div>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-[13px] leading-relaxed text-muted-foreground flex-1">
                "{review.text}"
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="w-9 h-9 rounded-full border border-border bg-background text-muted-foreground flex items-center justify-center hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`h-1.5 rounded-full transition-all duration-200 border-none ${
                  i === page ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="w-9 h-9 rounded-full border border-border bg-background text-muted-foreground flex items-center justify-center hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-6 text-center">
          <a
            href="https://www.google.com/search?q=cbs+masonry+victoria+bc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <GoogleIcon />
            Read all reviews or leave your own
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
