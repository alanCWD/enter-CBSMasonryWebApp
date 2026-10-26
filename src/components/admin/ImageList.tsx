import { Check, CheckCircle, FolderInput, Star } from "lucide-react";
import { pagesForFile } from "@/lib/media";
import type { MediaInventoryProps } from "./inventoryProps";

const PageBadges = ({ pages, compact = false }: { pages: string[]; compact?: boolean }) => (
  <div className="flex flex-wrap gap-1">
    {pages.length === 0 ? (
      <span
        className={`rounded-sm bg-muted font-medium text-muted-foreground ${
          compact ? "px-1 py-0.5 text-[9px]" : "px-1.5 py-0.5 text-[9px]"
        }`}
      >
        No page yet
      </span>
    ) : (
      pages.map((page) => (
        <span
          key={page}
          className="px-1.5 py-0.5 rounded-sm bg-primary/10 text-[9px] font-semibold text-primary whitespace-nowrap"
        >
          {page}
        </span>
      ))
    )}
  </div>
);

/** One line per photo: compact rows for scanning the whole library quickly. */
const ImageList = ({
  files,
  categories,
  slotSelected,
  selected,
  saving,
  onCardClick,
  onToggleSelected,
  onToggleFeatured,
  onMove,
}: MediaInventoryProps) => {
  const labelFor = (folder: string) =>
    categories.find((c) => c.value === folder)?.label ?? (folder || "Uncategorised");

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-background">
      <table className="w-full table-fixed text-left">
        <thead className="bg-card/60 border-b border-border">
          <tr>
            <th className="w-9 px-3 py-2" />
            <th className="px-2 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Photo
            </th>
            <th className="hidden md:table-cell md:w-32 px-2 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Category
            </th>
            <th className="hidden sm:table-cell sm:w-36 px-2 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Shown on
            </th>
            <th className="w-12 px-2 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground text-center">
              Home
            </th>
            <th className="w-11 px-2 py-2" />
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {files.map((file) => {
            const pages = pagesForFile(file.folder, file.featuredHome);
            const isSelected = selected.has(file.cdnUrl);
            const isSaving = saving.has(file.cdnUrl);

            return (
              <tr
                key={file.cdnUrl}
                onClick={() => onCardClick(file)}
                className={`group cursor-pointer transition-colors ${
                  isSelected ? "bg-primary/5" : ""
                } ${slotSelected ? "hover:bg-primary/10" : "hover:bg-muted/50"}`}
              >
                <td className="px-3 py-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSelected(file.cdnUrl);
                    }}
                    title={isSelected ? "Deselect photo" : "Select photo"}
                    className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                      isSelected ? "bg-primary border-primary" : "border-border hover:border-primary"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                  </button>
                </td>

                <td className="px-2 py-2">
                  <div className="flex items-start gap-3">
                    <div className="relative w-11 h-11 rounded overflow-hidden border border-border flex-shrink-0">
                      <img
                        src={file.cdnUrl}
                        alt={file.fileName}
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                        loading="lazy"
                        decoding="async"
                      />
                      {slotSelected && (
                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/25 transition-all flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p
                        className="text-[11px] font-medium text-foreground truncate"
                        title={file.fileName}
                      >
                        {file.fileName}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate md:hidden">
                        {labelFor(file.folder)}
                      </p>
                      <div className="mt-1 sm:hidden">
                        <PageBadges pages={pages} compact />
                      </div>
                    </div>
                  </div>
                </td>

                <td className="hidden md:table-cell px-2 py-2 text-[11px] text-muted-foreground truncate">
                  {labelFor(file.folder)}
                </td>

                <td className="hidden sm:table-cell px-2 py-2">
                  <PageBadges pages={pages} />
                </td>

                <td className="px-2 py-2">
                  <div className="flex justify-center">
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
                      className={`w-6 h-6 rounded flex items-center justify-center transition-colors disabled:opacity-60 ${
                        file.featuredHome
                          ? "bg-primary text-primary-foreground"
                          : "border border-border text-muted-foreground hover:text-primary"
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${file.featuredHome ? "fill-current" : ""}`} />
                    </button>
                  </div>
                </td>

                <td className="px-2 py-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMove(file);
                    }}
                    title="Move to another category"
                    className="w-6 h-6 rounded border border-border text-muted-foreground hover:text-primary flex items-center justify-center transition-colors"
                  >
                    <FolderInput className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ImageList;
