import { useEffect } from "react";
import { X, CheckCircle } from "lucide-react";
import { useState } from "react";

interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
}

const serviceTypes = [
  "Chimney Repair / Rebuild",
  "Brick Restoration",
  "Retaining Wall",
  "Natural Stone Patio",
  "Flagstone Pathway",
  "Culture Stone / Veneer",
  "Paving Stone",
  "Commercial Project",
  "Other",
];

const QuoteModal = ({ open, onClose }: QuoteModalProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Reset form after close animation
      const t = setTimeout(() => setSubmitted(false), 300);
      return () => clearTimeout(t);
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${
        open ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      style={{ background: "hsl(222 47% 5% / 0.90)" }}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-[540px] max-h-[90vh] overflow-y-auto bg-card border border-border rounded-xl shadow-2xl transition-all duration-300 ${
          open ? "translate-y-0 scale-100" : "translate-y-4 scale-[0.97]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded border border-border text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-8">
          {!submitted ? (
            <>
              <h2 className="text-xl font-bold text-foreground mb-1">
                Get a Free Estimate
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Fill in your details and we'll get back to you shortly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-primary mb-1.5">
                      First Name
                    </label>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                      placeholder="Charlie"
                      className="w-full px-4 py-3 rounded bg-background/60 border border-border text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-primary mb-1.5">
                      Last Name
                    </label>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Smith"
                      className="w-full px-4 py-3 rounded bg-background/60 border border-border text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-primary mb-1.5">
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    type="tel"
                    required
                    placeholder="250-555-1234"
                    className="w-full px-4 py-3 rounded bg-background/60 border border-border text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-primary mb-1.5">
                    Email Address
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    required
                    placeholder="you@email.com"
                    className="w-full px-4 py-3 rounded bg-background/60 border border-border text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all"
                  />
                </div>

                {/* Service type */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-primary mb-1.5">
                    Service Type
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded bg-background/60 border border-border text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                      paddingRight: "36px",
                    }}
                  >
                    <option value="" disabled>Select a service...</option>
                    {serviceTypes.map((s) => (
                      <option key={s} value={s} className="bg-card">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.08em] text-primary mb-1.5">
                    Project Details
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your project, location, and timeline..."
                    className="w-full px-4 py-3 rounded bg-background/60 border border-border text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all resize-y min-h-[96px]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-[0.06em] rounded border-2 border-primary hover:bg-transparent hover:text-primary transition-all duration-150 hover:shadow-glow mt-2"
                >
                  Send My Free Estimate Request
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Request Received!
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Thank you for reaching out. The CBS Masonry team will contact you
                within one business day to discuss your project.
              </p>
              <button
                onClick={onClose}
                className="px-8 py-3 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wide rounded border-2 border-primary hover:bg-transparent hover:text-primary transition-all"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;
