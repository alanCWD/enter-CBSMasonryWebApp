import { useState } from "react";
import { FolderInput } from "lucide-react";
import type { MediaFileRecord } from "@/lib/media";
import type { Category } from "@/hooks/useCategories";

interface MoveImageDialogProps {
  file: MediaFileRecord;
  categories: Category[];
  onClose: () => void;
  onMove: (targetFolder: string) => Promise<string | null>;
}

const MoveImageDialog = ({ file, categories, onClose, onMove }: MoveImageDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleMove = async (targetFolder: string) => {
    setLoading(true);
    setError("");
    const message = await onMove(targetFolder);
    if (message) {
      setError(message);
      setLoading(false);
      return;
    }
    setLoading(false);
    onClose();
  };

  const targets = categories.filter((c) => c.value !== file.folder);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={() => !loading && onClose()}
    >
      <div
        className="bg-background border border-border rounded-xl shadow-2xl p-6 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3 mb-4">
          <div className="w-14 h-14 rounded overflow-hidden border border-border flex-shrink-0">
            <img
              src={file.cdnUrl}
              alt={file.fileName}
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-foreground">Move to another category</h3>
            <p className="text-xs text-muted-foreground mt-0.5 truncate">{file.fileName}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Currently in:{" "}
              <span className="font-medium text-foreground">
                {categories.find((c) => c.value === file.folder)?.label ?? (file.folder || "root")}
              </span>
            </p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mb-3">
          Moving a photo to AquaPave puts it on that page; moving it out takes it off.
        </p>

        <div className="grid grid-cols-2 gap-1.5 max-h-52 overflow-y-auto">
          {targets.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleMove(cat.value)}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg border border-border hover:border-primary hover:bg-primary/5 hover:text-primary transition-colors text-left disabled:opacity-50"
            >
              <FolderInput className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{cat.label}</span>
            </button>
          ))}
        </div>

        {error && <p className="text-xs text-destructive mt-3">{error}</p>}

        <div className="flex justify-between items-center mt-4">
          {loading && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              Moving photo...
            </div>
          )}
          <div className="flex-1" />
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-xs border border-border rounded-lg hover:bg-muted transition-colors text-muted-foreground disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoveImageDialog;
