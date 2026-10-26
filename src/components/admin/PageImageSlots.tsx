import { useMemo, useState } from "react";
import { ChevronDown, ImageIcon, X } from "lucide-react";
import { SINGLE_IMAGE_SLOTS, type SingleImageSlot } from "@/lib/media";

interface PageImageSlotsProps {
  slots: Record<string, string>;
  selectedSlot: string | null;
  onSelect: (key: string) => void;
  onClear: (key: string) => void;
}

interface SlotGroup {
  slug: string;
  label: string;
  slots: SingleImageSlot[];
}

/**
 * The handful of spots that hold one specific picture rather than a whole category of work.
 * Spots are grouped per service page, so the panel stays short: every page is one row that
 * opens to its hero, Before and After photos.
 */
const PageImageSlots = ({ slots, selectedSlot, onSelect, onClear }: PageImageSlotsProps) => {
  const groups = useMemo<SlotGroup[]>(() => {
    const map = new Map<string, SlotGroup>();
    for (const slot of SINGLE_IMAGE_SLOTS) {
      const group = map.get(slot.group) ?? { slug: slot.group, label: slot.groupLabel, slots: [] };
      group.slots.push(slot);
      map.set(slot.group, group);
    }
    return [...map.values()];
  }, []);

  const slotGroup = SINGLE_IMAGE_SLOTS.find((slot) => slot.key === selectedSlot)?.group;
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(groups.length ? [groups[0].slug] : [])
  );

  const toggle = (slug: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="px-4 py-2.5 border-b border-border bg-card/60 flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Page Images
        </span>
        {selectedSlot && (
          <span className="text-[10px] text-primary font-medium animate-pulse whitespace-nowrap">
            Pick a photo →
          </span>
        )}
      </div>

      <div className="lg:flex-1 lg:overflow-y-auto p-2 space-y-1">
        {groups.map((group) => {
          const filled = group.slots.filter((slot) => slots[slot.key]).length;
          const isOpen = expanded.has(group.slug) || slotGroup === group.slug;

          return (
            <div key={group.slug} className="rounded-lg border border-border bg-background overflow-hidden">
              <button
                onClick={() => toggle(group.slug)}
                aria-expanded={isOpen}
                className="w-full flex items-center gap-2 px-3 py-2.5 text-left hover:bg-muted/60 transition-colors"
              >
                <ChevronDown
                  className={`w-3.5 h-3.5 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${
                    isOpen ? "" : "-rotate-90"
                  }`}
                />
                <span className="flex-1 min-w-0 text-[12px] font-semibold text-foreground truncate">
                  {group.label}
                </span>
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-sm whitespace-nowrap ${
                    filled === group.slots.length
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {filled}/{group.slots.length}
                </span>
              </button>

              {isOpen && (
                <div className="px-2.5 pb-2.5 grid grid-cols-2 gap-2.5">
                  {group.slots.map((slot) => {
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
                            <div className="w-full h-full bg-muted/50 flex flex-col items-center justify-center gap-1">
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
                          <p className="text-[11px] font-semibold text-foreground truncate">
                            {slot.label}
                          </p>
                          <p className="text-[10px] text-muted-foreground leading-snug mt-0.5">
                            {slot.hint}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PageImageSlots;
