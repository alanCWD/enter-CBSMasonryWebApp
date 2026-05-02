import { useState, useEffect } from "react";
import { Plus, RefreshCw, X, CheckCircle } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useCategories } from "@/hooks/useCategories";
import { useMediaSlots } from "@/hooks/useMediaSlots";

interface MediaFile {
  cdnUrl: string;
  fileName: string;
  folder: string;
}

const FIXED_PAGES = [
  {
    page: "home",
    label: "Home Page",
    slots: Array.from({ length: 12 }, (_, i) => ({
      key: `home-gallery-${i + 1}`,
      label: `Gallery ${i + 1}`,
    })),
  },
  {
    page: "aquapave",
    label: "AquaPave Page",
    slots: [
      { key: "aquapave-hero", label: "Hero Image" },
      { key: "aquapave-diagram", label: "System Diagram" },
      ...Array.from({ length: 8 }, (_, i) => ({
        key: `aquapave-gallery-${i + 1}`,
        label: `Gallery ${i + 1}`,
      })),
    ],
  },
];

const FIXED_PAGE_VALUES = ["aquapave"];

const MediaLibrary = () => {
  const { categories, loading: catLoading, addCategory } = useCategories();
  const { slots, assignSlot, clearSlot } = useMediaSlots();
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [filesLoading, setFilesLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(["home", "aquapave"])
  );
  const [justAssigned, setJustAssigned] = useState<string | null>(null);
  const [newCatOpen, setNewCatOpen] = useState(false);
  const [newCatLabel, setNewCatLabel] = useState("");
  const [newCatError, setNewCatError] = useState("");
  const [newCatLoading, setNewCatLoading] = useState(false);

  const loadFiles = async () => {
    setFilesLoading(true);
    const { data, error } = await supabase.functions.invoke("bunny-list");
    if (!error && data?.files) {
      setFiles(data.files);
    }
    setFilesLoading(false);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const toggleGroup = (page: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(page)) next.delete(page);
      else next.add(page);
      return next;
    });
  };

  const handleSlotClick = (key: string) => {
    setSelectedSlot((prev) => (prev === key ? null : key));
  };

  const handleImageClick = async (file: MediaFile) => {
    if (!selectedSlot) return;
    const page = selectedSlot.split("-")[0];
    await assignSlot(selectedSlot, file.cdnUrl, page);
    setJustAssigned(selectedSlot);
    setTimeout(() => setJustAssigned(null), 1500);
  };

  const handleClearSlot = async (e: React.MouseEvent, key: string) => {
    e.stopPropagation();
    await clearSlot(key);
    if (selectedSlot === key) setSelectedSlot(null);
  };

  const handleAddCategory = async () => {
    if (!newCatLabel.trim()) return;
    setNewCatLoading(true);
    setNewCatError("");
    const { error } = await addCategory(newCatLabel);
    if (error) {
      setNewCatError(error);
    } else {
      setNewCatLabel("");
      setNewCatOpen(false);
    }
    setNewCatLoading(false);
  };

  const filteredFiles =
    filterCategory === "all"
      ? files
      : files.filter((f) => f.folder === filterCategory);

  const dynamicGroups = categories
    .filter((c) => !FIXED_PAGE_VALUES.includes(c.value))
    .map((c) => ({
      page: c.value,
      label: c.label,
      slots: Array.from({ length: 12 }, (_, i) => ({
        key: `${c.value}-gallery-${i + 1}`,
        label: `Gallery ${i + 1}`,
      })),
    }));

  const allGroups = [...FIXED_PAGES, ...dynamicGroups];

  return (
    <AdminLayout>
      <div className="flex h-[calc(100vh-56px)] overflow-hidden">
        {/* ── Left panel: Page Slots ── */}
        <div className="w-72 flex-shrink-0 border-r border-border bg-background flex flex-col overflow-hidden">
          <div className="px-4 py-2.5 border-b border-border bg-card/60 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Page Slots
            </span>
            {selectedSlot && (
              <span className="text-[10px] text-primary font-medium animate-pulse">
                Pick an image →
              </span>
            )}
          </div>

          <div className="flex-1 overflow-y-auto">
            {allGroups.map((group) => (
              <div key={group.page} className="border-b border-border last:border-0">
                <button
                  onClick={() => toggleGroup(group.page)}
                  className="w-full flex items-center justify-between px-4 py-2 hover:bg-muted/50 transition-colors text-left"
                >
                  <span className="text-[11px] font-semibold text-foreground">
                    {group.label}
                  </span>
                  <span className="text-muted-foreground text-[10px]">
                    {expandedGroups.has(group.page) ? "▲" : "▼"}
                  </span>
                </button>

                {expandedGroups.has(group.page) && (
                  <div className="px-3 pb-3 grid grid-cols-3 gap-1.5">
                    {group.slots.map((slot) => {
                      const assigned = slots[slot.key];
                      const isSelected = selectedSlot === slot.key;
                      const wasJustAssigned = justAssigned === slot.key;

                      return (
                        <div
                          key={slot.key}
                          onClick={() => handleSlotClick(slot.key)}
                          className={`relative rounded overflow-hidden cursor-pointer transition-all border-2 ${
                            isSelected
                              ? "border-primary scale-[1.03] shadow-md"
                              : wasJustAssigned
                              ? "border-green-500"
                              : assigned
                              ? "border-border hover:border-primary/60"
                              : "border-dashed border-border hover:border-muted-foreground/60"
                          }`}
                          style={{ aspectRatio: "1" }}
                        >
                          {assigned ? (
                            <img
                              src={assigned}
                              alt={slot.label}
                              className="w-full h-full object-cover"
                              crossOrigin="anonymous"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted/40 flex items-center justify-center">
                              <span className="text-[8px] text-muted-foreground/70 text-center leading-tight px-0.5">
                                Empty
                              </span>
                            </div>
                          )}

                          {/* Slot label */}
                          <div className="absolute bottom-0 left-0 right-0 bg-black/55 px-1 py-0.5">
                            <span className="text-[8px] text-white/90 font-medium block truncate">
                              {slot.label}
                            </span>
                          </div>

                          {/* Clear button */}
                          {assigned && !isSelected && (
                            <button
                              onClick={(e) => handleClearSlot(e, slot.key)}
                              className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-black/50 flex items-center justify-center hover:bg-destructive transition-colors opacity-0 group-hover:opacity-100"
                              style={{ opacity: 1 }}
                            >
                              <X className="w-2.5 h-2.5 text-white" />
                            </button>
                          )}

                          {/* Just-assigned checkmark */}
                          {wasJustAssigned && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <CheckCircle className="w-6 h-6 text-green-400" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Right panel: Image Library ── */}
        <div className="flex-1 flex flex-col overflow-hidden bg-card/30">
          {/* Category filter tabs */}
          <div className="border-b border-border bg-background px-4 py-2 flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setFilterCategory("all")}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors whitespace-nowrap ${
                filterCategory === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
              }`}
            >
              All
            </button>

            {!catLoading &&
              categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setFilterCategory(cat.value)}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors whitespace-nowrap ${
                    filterCategory === cat.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat.label}
                </button>
              ))}

            <button
              onClick={() => {
                setNewCatOpen(true);
                setNewCatError("");
                setNewCatLabel("");
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium border border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors whitespace-nowrap"
            >
              <Plus className="w-3 h-3" />
              New Category
            </button>

            <div className="flex-1" />

            <button
              onClick={loadFiles}
              disabled={filesLoading}
              className="flex items-center gap-1.5 px-3 py-1 rounded text-[11px] text-muted-foreground hover:text-foreground border border-border hover:bg-muted transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${filesLoading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>

          {/* Instruction banner */}
          {selectedSlot ? (
            <div className="bg-primary/10 border-b border-primary/25 px-4 py-2 flex items-center justify-between">
              <span className="text-[11px] text-primary font-medium">
                Slot selected:{" "}
                <strong className="font-semibold">{selectedSlot}</strong> — click
                an image below to assign it (or reassign)
              </span>
              <button
                onClick={() => setSelectedSlot(null)}
                className="text-[11px] text-muted-foreground hover:text-foreground ml-4"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="bg-muted/30 border-b border-border px-4 py-2">
              <span className="text-[11px] text-muted-foreground">
                ← Select a slot on the left, then click an image here to assign it.
                Filter by category using the tabs above.
              </span>
            </div>
          )}

          {/* Image grid */}
          <div className="flex-1 overflow-y-auto p-4">
            {filesLoading ? (
              <div className="flex items-center justify-center h-40">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filteredFiles.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-center gap-2">
                <p className="text-sm text-muted-foreground">No images found.</p>
                <p className="text-xs text-muted-foreground/70">
                  Upload images via the Upload tab first.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2">
                {filteredFiles.map((file) => (
                  <div
                    key={file.cdnUrl}
                    onClick={() => handleImageClick(file)}
                    className={`group relative rounded-md overflow-hidden border transition-all ${
                      selectedSlot
                        ? "border-border cursor-pointer hover:border-primary hover:shadow-lg hover:scale-[1.03]"
                        : "border-border cursor-default"
                    }`}
                    style={{ aspectRatio: "1" }}
                  >
                    <img
                      src={file.cdnUrl}
                      alt={file.fileName}
                      className="w-full h-full object-cover"
                      crossOrigin="anonymous"
                      loading="lazy"
                    />

                    {/* Hover overlay when a slot is selected */}
                    {selectedSlot && (
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-lg">
                          <CheckCircle className="w-4 h-4 text-primary-foreground" />
                        </div>
                      </div>
                    )}

                    {/* File name on hover */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/65 px-1.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[9px] text-white/90 block truncate leading-tight">
                        {file.fileName}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Category Modal */}
      {newCatOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setNewCatOpen(false)}
        >
          <div
            className="bg-background border border-border rounded-xl shadow-2xl p-6 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-semibold text-foreground mb-1">
              Add New Category
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Creates a new upload folder and gallery slot group.
            </p>
            <input
              autoFocus
              type="text"
              value={newCatLabel}
              onChange={(e) => {
                setNewCatLabel(e.target.value);
                setNewCatError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
              placeholder="e.g. Patios, Retaining Walls"
              className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary mb-1"
            />
            {newCatError && (
              <p className="text-xs text-destructive mb-2">{newCatError}</p>
            )}
            <div className="flex gap-2 justify-end mt-4">
              <button
                onClick={() => setNewCatOpen(false)}
                className="px-4 py-2 text-xs border border-border rounded-lg hover:bg-muted transition-colors text-muted-foreground"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                disabled={!newCatLabel.trim() || newCatLoading}
                className="px-4 py-2 text-xs bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors"
              >
                {newCatLoading ? "Adding..." : "Add Category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default MediaLibrary;
