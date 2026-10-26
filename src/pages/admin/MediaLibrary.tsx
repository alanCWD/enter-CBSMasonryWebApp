import { useEffect, useState } from "react";
import { LayoutGrid, List, Plus, RefreshCw, Star, X } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import PageImageSlots from "@/components/admin/PageImageSlots";
import ImageGrid from "@/components/admin/ImageGrid";
import ImageList from "@/components/admin/ImageList";
import MoveImageDialog from "@/components/admin/MoveImageDialog";
import NewCategoryDialog from "@/components/admin/NewCategoryDialog";
import type { MediaInventoryProps } from "@/components/admin/inventoryProps";
import { supabase } from "@/integrations/supabase/client";
import { useCategories } from "@/hooks/useCategories";
import { useMediaSlots } from "@/hooks/useMediaSlots";
import { useMediaFiles } from "@/hooks/useMediaFiles";
import { SINGLE_IMAGE_SLOTS, type MediaFileRecord } from "@/lib/media";

const FEATURED_FILTER = "featured";
const VIEW_STORAGE_KEY = "cbs-media-library-view";

type InventoryView = "grid" | "list";

const MediaLibrary = () => {
  const { categories, loading: catLoading, addCategory } = useCategories();
  const { slots, assignSlot, clearSlot, refetch: refetchSlots } = useMediaSlots();
  const { files, loading, error, reload, setFeatured, applyMove } = useMediaFiles();

  const [view, setView] = useState<InventoryView>(() =>
    localStorage.getItem(VIEW_STORAGE_KEY) === "list" ? "list" : "grid"
  );
  const [filter, setFilter] = useState<string>("all");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState<Set<string>>(new Set());
  const [bulkSaving, setBulkSaving] = useState(false);
  const [actionError, setActionError] = useState("");
  const [moveTarget, setMoveTarget] = useState<MediaFileRecord | null>(null);
  const [newCatOpen, setNewCatOpen] = useState(false);

  const featuredCount = files.filter((f) => f.featuredHome).length;

  useEffect(() => {
    localStorage.setItem(VIEW_STORAGE_KEY, view);
  }, [view]);

  const visibleFiles = files.filter((file) => {
    if (filter === "all") return true;
    if (filter === FEATURED_FILTER) return file.featuredHome;
    return file.folder === filter;
  });

  const handleSlotClick = (key: string) => {
    setSelectedSlot((prev) => (prev === key ? null : key));
    setSelectedFiles(new Set());
  };

  const handleCardClick = async (file: MediaFileRecord) => {
    if (selectedSlot) {
      const page = SINGLE_IMAGE_SLOTS.find((s) => s.key === selectedSlot)?.page ?? file.folder;
      await assignSlot(selectedSlot, file.cdnUrl, page);
      return;
    }
    setSelectedFiles((prev) => {
      const next = new Set(prev);
      if (next.has(file.cdnUrl)) next.delete(file.cdnUrl);
      else next.add(file.cdnUrl);
      return next;
    });
  };

  const handleToggleFeatured = async (file: MediaFileRecord) => {
    setActionError("");
    setSaving((prev) => new Set(prev).add(file.cdnUrl));
    const message = await setFeatured([file.cdnUrl], !file.featuredHome);
    if (message) setActionError(`Could not update the home page gallery: ${message}`);
    setSaving((prev) => {
      const next = new Set(prev);
      next.delete(file.cdnUrl);
      return next;
    });
  };

  const handleBulkFeatured = async (featured: boolean) => {
    const targets = files
      .filter((f) => selectedFiles.has(f.cdnUrl) && f.featuredHome !== featured)
      .map((f) => f.cdnUrl);
    if (!targets.length) {
      setSelectedFiles(new Set());
      return;
    }
    setBulkSaving(true);
    setActionError("");
    const message = await setFeatured(targets, featured);
    if (message) setActionError(`Could not update the home page gallery: ${message}`);
    else setSelectedFiles(new Set());
    setBulkSaving(false);
  };

  const handleMove = async (targetFolder: string): Promise<string | null> => {
    if (!moveTarget) return null;
    const { data, error: invokeError } = await supabase.functions.invoke("bunny-move", {
      body: {
        sourceCdnUrl: moveTarget.cdnUrl,
        sourceFolder: moveTarget.folder,
        fileName: moveTarget.fileName,
        targetFolder,
      },
    });
    if (invokeError || !data?.newCdnUrl) {
      return invokeError?.message || data?.error || "Move failed";
    }
    applyMove(moveTarget.cdnUrl, data.newCdnUrl, targetFolder);
    refetchSlots();
    return null;
  };

  const handleRefresh = async () => {
    setSelectedFiles(new Set());
    await Promise.all([reload(), refetchSlots()]);
  };

  const selectedOnHome = files.filter((f) => selectedFiles.has(f.cdnUrl) && f.featuredHome).length;
  const selectedOffHome = selectedFiles.size - selectedOnHome;

  const inventoryProps: MediaInventoryProps = {
    files: visibleFiles,
    categories,
    slotSelected: Boolean(selectedSlot),
    selected: selectedFiles,
    saving,
    onCardClick: handleCardClick,
    onToggleSelected: (cdnUrl: string) =>
      setSelectedFiles((prev) => {
        const next = new Set(prev);
        if (next.has(cdnUrl)) next.delete(cdnUrl);
        else next.add(cdnUrl);
        return next;
      }),
    onToggleFeatured: handleToggleFeatured,
    onMove: setMoveTarget,
  };

  return (
    <AdminLayout>
      <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-56px)] lg:overflow-hidden">
        {/* ── Left panel: one-off page images ── */}
        <div className="w-full lg:w-80 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-border bg-background flex flex-col lg:overflow-hidden">
          <PageImageSlots
            slots={slots}
            selectedSlot={selectedSlot}
            onSelect={handleSlotClick}
            onClear={(key) => {
              clearSlot(key);
              if (selectedSlot === key) setSelectedSlot(null);
            }}
          />
        </div>

        {/* ── Right panel: photo inventory ── */}
        <div className="flex-1 flex flex-col lg:overflow-hidden bg-card/30">
          {/* Filters */}
          <div className="border-b border-border bg-background px-4 py-2 flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setFilter("all")}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors whitespace-nowrap ${
                filter === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter(FEATURED_FILTER)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-colors whitespace-nowrap ${
                filter === FEATURED_FILTER
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
              }`}
            >
              <Star className={`w-3 h-3 ${filter === FEATURED_FILTER ? "fill-current" : ""}`} />
              Featured on home
            </button>

            {!catLoading &&
              categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setFilter(cat.value)}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors whitespace-nowrap ${
                    filter === cat.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat.label}
                </button>
              ))}

            <button
              onClick={() => setNewCatOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium border border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors whitespace-nowrap"
            >
              <Plus className="w-3 h-3" />
              New Category
            </button>

            <div className="flex-1" />

            <span className="text-[11px] text-muted-foreground whitespace-nowrap px-1">
              {files.length} photo{files.length !== 1 ? "s" : ""} · {featuredCount} on home
            </span>

            {/* View switch: thumbnails or one line per photo */}
            <div className="flex items-center rounded border border-border overflow-hidden">
              <button
                onClick={() => setView("grid")}
                title="Thumbnail view"
                aria-pressed={view === "grid"}
                className={`px-2 py-1.5 transition-colors ${
                  view === "grid"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setView("list")}
                title="Line item list"
                aria-pressed={view === "list"}
                className={`px-2 py-1.5 border-l border-border transition-colors ${
                  view === "list"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1 rounded text-[11px] text-muted-foreground hover:text-foreground border border-border hover:bg-muted transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>

          {/* Status / actions strip */}
          {selectedSlot ? (
            <div className="bg-primary/10 border-b border-primary/25 px-4 py-2 flex items-center justify-between">
              <span className="text-[11px] text-primary font-medium">
                Slot selected:{" "}
                <strong className="font-semibold">
                  {SINGLE_IMAGE_SLOTS.find((s) => s.key === selectedSlot)?.label ?? selectedSlot}
                </strong>{" "}
                — click a photo below to place it here.
              </span>
              <button
                onClick={() => setSelectedSlot(null)}
                className="text-[11px] text-muted-foreground hover:text-foreground ml-4"
              >
                Cancel
              </button>
            </div>
          ) : selectedFiles.size > 0 ? (
            <div className="bg-primary/10 border-b border-primary/25 px-4 py-2 flex items-center gap-2 flex-wrap">
              <span className="text-[11px] text-primary font-medium">
                {selectedFiles.size} photo{selectedFiles.size !== 1 ? "s" : ""} selected
              </span>
              <div className="flex-1" />
              {bulkSaving ? (
                <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <span className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  Saving...
                </span>
              ) : (
                <>
                  <button
                    onClick={() => handleBulkFeatured(true)}
                    disabled={!selectedOffHome}
                    className="px-3 py-1 rounded text-[11px] font-semibold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 transition-colors"
                  >
                    Show on home page
                  </button>
                  <button
                    onClick={() => handleBulkFeatured(false)}
                    disabled={!selectedOnHome}
                    className="px-3 py-1 rounded text-[11px] font-semibold border border-border bg-background text-foreground hover:bg-muted disabled:opacity-40 transition-colors"
                  >
                    Remove from home
                  </button>
                  <button
                    onClick={() => setSelectedFiles(new Set())}
                    className="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Clear
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="bg-muted/30 border-b border-border px-4 py-2 flex items-center">
              <span className="text-[11px] text-muted-foreground">
                Press the star on a photo to add or remove it from the home page gallery. Select
                several photos to feature a whole batch, or pick a page image on the left to place
                one specific photo.
              </span>
            </div>
          )}

          {actionError && (
            <div className="bg-destructive/10 border-b border-destructive/30 px-4 py-2 flex items-center justify-between">
              <span className="text-[11px] text-destructive">{actionError}</span>
              <button
                onClick={() => setActionError("")}
                className="text-destructive/70 hover:text-destructive"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Inventory */}
          <div className="p-4 lg:flex-1 lg:overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-40 text-center gap-2">
                <p className="text-sm text-destructive">{error}</p>
                <button
                  onClick={handleRefresh}
                  className="text-xs text-primary hover:underline"
                >
                  Try again
                </button>
              </div>
            ) : visibleFiles.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-center gap-2">
                <p className="text-sm text-muted-foreground">
                  {filter === FEATURED_FILTER
                    ? "No photos are featured on the home page yet."
                    : "No photos here yet."}
                </p>
                <p className="text-xs text-muted-foreground/70">
                  Upload photos from the Upload tab to add them to a category.
                </p>
              </div>
            ) : view === "list" ? (
              <ImageList {...inventoryProps} />
            ) : (
              <ImageGrid {...inventoryProps} />
            )}
          </div>
        </div>
      </div>

      {newCatOpen && (
        <NewCategoryDialog
          onClose={() => setNewCatOpen(false)}
          onSubmit={async (label) => {
            const { error: addError } = await addCategory(label);
            return addError;
          }}
        />
      )}

      {moveTarget && (
        <MoveImageDialog
          file={moveTarget}
          categories={categories}
          onClose={() => setMoveTarget(null)}
          onMove={handleMove}
        />
      )}
    </AdminLayout>
  );
};

export default MediaLibrary;
