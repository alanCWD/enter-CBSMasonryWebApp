import { Check, CheckCircle, FolderInput, Star } from "lucide-react";
import { pagesForFile, type MediaFileRecord } from "@/lib/media";
import type { Category } from "@/hooks/useCategories";

interface ImageGridProps {
  files: MediaFileRecord[];
  categories: Category[];
  slotSelected: boolean;
  selected: Set<string>;
  saving: Set<string>;
  onCardClick: (file: MediaFileRecord) => void;
  onToggleSelected: (cdnUrl: string) => void;
  onToggleFeatured: (file: MediaFileRecord) => void;
  onMove: (file: MediaFileRecord) => void;
}

const ImageGrid = ({
  files,
  categories,
  slotSelected,
  selected,
  saving,
  onCardClick,
  onToggleSelected,
  onToggleFeatured,
  onMove,
}: ImageGridProps) => {
  const labelFor = (folder: string) =>
    categories.find((c) => c.value === folder)?.label ?? (folder || "Uncategorised");

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
      {files.map((file) => {
        const pages = pagesForFile(file.folder, file.featuredHome);
        const isSelected = selected.has(file.cdnUrl);
        const isSaving = saving.has(file.cdnUrl);

        return (
          <div
            key={file.cdnUrl}
            className={`group rounded-lg border bg-background overflow-hidden transition-all [content-visibility:auto] [contain-intrinsic-size:180px_240px] ${
              isSelected
                ? "border-primary ring-2 ring-primary/25"
                : "border-border"
            } ${slotSelected ? "hover:border-primary hover:shadow-lg cursor-pointer" : ""}`}
          >
            <div
              className="relative"
              style={{ aspectRatio: "1" }}
              onClick={() => onCardClick(file)}
            >
              <img
                src={file.cdnUrl}
                alt={file.fileName}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
                loading="lazy"
                decoding="async"
              />

              {/* Multi-select */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSelected(file.cdnUrl);
                }}
                title={isSelected ? "Deselect photo" : "Select photo"}
                className={`absolute top-1.5 left-1.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                  isSelected
                    ? "bg-primary border-primary"
                    : "bg-background/85 border-border opacity-0 group-hover:opacity-100"
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
              </button>

              {/* Home page gallery placement */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFeatured(file);
                }}
                disabled={isSaving}
                title={
                  file.featuredHome
                    ? "Remove from the home page gallery"
                    : "Show in the home page gallery"
                }
                className={`absolute top-1.5 right-1.5 w-6 h-6 rounded flex items-center justify-center transition-colors disabled:opacity-60 ${
                  file.featuredHome
                    ? "bg-primary text-primary-foreground"
                    : "bg-background/85 border border-border text-muted-foreground hover:text-primary"
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${file.featuredHome ? "fill-current" : ""}`} />
              </button>

              {/* Assign to the selected page image slot */}
              {slotSelected && (
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-4 h-4 text-primary-foreground" />
                  </div>
                </div>
              )}

              {/* Move to another category */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMove(file);
                }}
                title="Move to another category"
                className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded bg-background/85 border border-border text-muted-foreground hover:text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FolderInput className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="px-2.5 py-2 border-t border-border">
              <p className="text-[10px] font-medium text-foreground truncate" title={file.fileName}>
                {file.fileName}
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                {labelFor(file.folder)}
              </p>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {pages.length === 0 ? (
                  <span className="px-1.5 py-0.5 rounded-sm bg-muted text-[9px] font-medium text-muted-foreground">
                    No page yet
                  </span>
                ) : (
                  pages.map((page) => (
                    <span
                      key={page}
                      className="px-1.5 py-0.5 rounded-sm bg-primary/10 text-[9px] font-semibold text-primary"
                    >
                      {page}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImageGrid;
