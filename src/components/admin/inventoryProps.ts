import type { Category } from "@/hooks/useCategories";
import type { MediaFileRecord } from "@/lib/media";

/** Shared contract for the two ways the photo inventory can be displayed. */
export interface MediaInventoryProps {
  files: MediaFileRecord[];
  categories: Category[];
  /** True while a one-off page image (hero/diagram) is waiting for a photo to be picked. */
  slotSelected: boolean;
  selected: Set<string>;
  saving: Set<string>;
  onCardClick: (file: MediaFileRecord) => void;
  onToggleSelected: (cdnUrl: string) => void;
  onToggleFeatured: (file: MediaFileRecord) => void;
  onMove: (file: MediaFileRecord) => void;
}
