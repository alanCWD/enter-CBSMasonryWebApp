import { ImageIcon, X } from "lucide-react";
import { SINGLE_IMAGE_SLOTS } from "@/lib/media";

interface PageImageSlotsProps {
  slots: Record<string, string>;
  selectedSlot: string | null;
  onSelect: (key: string) => void;
  onClear: (key: string) => void;
}

/**
 * The handful of spots that hold one specific picture rather than a whole category of work.
 */
const PageImageSlots = ({ slots, selectedSlot, onSelect, onClear }: PageImageSlotsProps) => (
  <div className="flex flex-col overflow-hidden">
    <div className="px-4 py-2.5 border-b border-border bg-card/60 flex items-center justify-between">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        Page Images
      </span>
      {selectedSlot && (
        <span className="text-[10px] text-primary font-medium animate-pulse">
          Pick a photo →
        </span>
      )}
    </div>

    <div className="flex-1 overflow-y-auto p-3 space-y-3">
      {SINGLE_IMAGE_SLOTS.map((slot) => {
        const assigned = slots[slot.key];
        const isSelected = selectedSlot === slot.key;

        return (
          <div
            key={slot.key}
            onClick={() => onSelect(slot.key)}
            className={`rounded-lg border bg-background overflow-hidden cursor-pointer transition-all ${
              isSelected
                ? "border-primary ring-2 ring-primary/25 shadow-md"
                : "border-border hover:border-primary/60"
            }`}
          >
            <div className="relative" style={{ aspectRatio: "16/10" }}>
              {assigned ? (
                <img
                  src={assigned}
                  alt={slot.label}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="w-full h-full bg-muted/50 flex flex-col items-center justify-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-muted-foreground/70" />
                  <span className="text-[10px] text-muted-foreground">Empty</span>
                </div>
              )}

              {assigned && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClear(slot.key);
                  }}
                  title="Remove this image"
                  className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center hover:bg-destructive transition-colors"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              )}
            </div>

            <div className="px-2.5 py-2 border-t border-border">
              <p className="text-[11px] font-semibold text-foreground">{slot.label}</p>
              <p className="text-[10px] text-muted-foreground leading-snug mt-0.5">{slot.hint}</p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default PageImageSlots;
